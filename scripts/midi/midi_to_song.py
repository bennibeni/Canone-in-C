"""MIDI -> brano dell'app (lib/songs/*.ts).

Uso: python3 midi_to_song.py file.mid --melody 4 --harmony 3,5,2 [--bars 6-72]

- Destra: la traccia della melodia (monofonica). Ogni movimento si «aggancia» alla griglia migliore,
  sedicesimi (4 per movimento) o terzine di crome (3 per movimento), quella con l'errore minore.
- Sinistra: per ogni mezza battuta si contano le classi di altezza delle tracce di armonia (pesate per durata)
  e si sceglie l'accordo che le spiega meglio; si suonano fondamentale (ottava 2) + accordo stretto (ottava 3).
- Dita: calcolate con fingering.py (scripts/musicxml).
"""

import argparse
import json
import sys
from collections import defaultdict

import mido

import os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "musicxml"))
from fingering import finger  # noqa: E402

NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
SHARP_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

QUALITIES = {
    "": (0, 4, 7),
    "m": (0, 3, 7),
    "7": (0, 4, 7, 10),
    "m7": (0, 3, 7, 10),
    "maj7": (0, 4, 7, 11),
    "°": (0, 3, 6),
    "sus4": (0, 5, 7),
}


def note_name(p, sharps=True):
    return (SHARP_NAMES if sharps else NAMES)[p % 12] + str(p // 12 - 1)


def read_track(mid, ti):
    a, on, ev = 0, {}, []
    for x in mid.tracks[ti]:
        a += x.time
        if x.type == "note_on" and x.velocity > 0:
            on[x.note] = a
        elif x.type in ("note_off", "note_on") and x.note in on:
            ev.append((on.pop(x.note), a, x.note))
    return sorted(ev)


def detect_chord(weights, bass_pc=None):
    best = None
    for root in range(12):
        for q, iv in QUALITIES.items():
            pcs = {(root + i) % 12 for i in iv}
            score = sum(w for pc, w in weights.items() if pc in pcs) - 0.6 * sum(
                w for pc, w in weights.items() if pc not in pcs
            )
            score -= 0.15 * len(iv)  # preferisci accordi semplici
            if bass_pc is not None and bass_pc == root:
                score += 0.3 * max(weights.values(), default=0)
            if best is None or score > best[0]:
                best = (score, root, q)
    return best[1], best[2]


def chord_symbol(root, q):
    return NAMES[root].replace("Eb", "Eb").replace("Ab", "Ab").replace("Bb", "Bb") + q


def lh_voicing(root, q):
    """fondamentale tra Mi2 e Re#3, sopra terza e settima (o quinta) entro l'ottava: una mano la prende"""
    iv = QUALITIES[q]
    bass = 40 + (root - 4) % 12
    keep = [i for i in iv[1:] if i != 7] if len(iv) == 4 else list(iv[1:])
    return [bass] + sorted(bass + i for i in keep)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("midi")
    ap.add_argument("--melody", type=int, required=True)
    ap.add_argument("--harmony", default="")
    ap.add_argument("--fill", default="", help="tracce da usare per la destra nelle battute in cui la melodia tace (es. un assolo)")
    ap.add_argument("--bars", default="")
    ap.add_argument("--bars-per-part", type=int, default=8)
    ap.add_argument("--flats", action="store_true", help="scrivi le alterazioni con i bemolle (tonalità con bemolle)")
    a = ap.parse_args()
    global note_name
    if a.flats:
        _nn = note_name
        note_name = lambda p, sharps=False: _nn(p, False)  # noqa: E731

    mid = mido.MidiFile(a.midi)
    tpb = mid.ticks_per_beat
    bar_t = tpb * 4
    mel = [e for e in read_track(mid, a.melody) if e[1] - e[0] > tpb * 0.06]
    bar_t0 = tpb * 4
    used = {s // bar_t0 for s, _, _ in mel}
    for t in filter(None, a.fill.split(",")):
        fill = [e for e in read_track(mid, int(t)) if e[1] - e[0] > tpb * 0.06 and e[0] // bar_t0 not in used]
        # solo la voce più acuta (la destra suona una nota alla volta)
        top = {}
        for e in fill:
            if e[0] not in top or e[2] > top[e[0]][2]:
                top[e[0]] = e
        mel += sorted(top.values())
        used |= {e[0] // bar_t0 for e in fill}
    mel.sort()
    harm = []
    for t in filter(None, a.harmony.split(",")):
        harm += read_track(mid, int(t))
    # mappa delle battute dai cambi di tempo (2/4 dentro un 4/4…): (movimento d'inizio, movimenti)
    sigs, a_t = [], 0
    for x in mid.tracks[0]:
        a_t += x.time
        if x.type == "time_signature":
            sigs.append((a_t // tpb, x.numerator * 4 // x.denominator))
    sigs = sigs or [(0, 4)]
    last_beat = max(e[1] for e in mel + harm) // tpb + 1
    bars, beat = [], 0
    while beat < last_beat:
        n = [nb for sb, nb in sigs if sb <= beat][-1] if any(sb <= beat for sb, _ in sigs) else 4
        bars.append((beat, n))
        beat += n
    last_bar = len(bars)
    b0, b1 = (1, last_bar)
    if a.bars:
        b0, b1 = map(int, a.bars.split("-"))

    # ---- quantizzazione della melodia: ogni movimento sceglie 4 o 3 suddivisioni
    onsets = defaultdict(list)  # movimento assoluto -> [(frazione, nota, fine)]
    for s, e, p in mel:
        onsets[s // tpb].append(((s % tpb) / tpb, p, e))
    grid = {}
    for beat, lst in onsets.items():
        # suddivisione più semplice possibile: crome (2), terzine (3) o sedicesimi (4)
        cost = {}
        for n, pen in ((2, 0.0), (3, 0.04), (4, 0.06)):
            cost[n] = sum(min(abs(f - k / n) for k in range(n + 1)) for f, _, _ in lst) + pen * len(lst)
        grid[beat] = min(cost, key=cost.get)
    # posizioni in dodicesimi di movimento
    q = []
    for s, e, p in mel:
        beat = s // tpb
        f = (s % tpb) / tpb
        n = grid.get(beat, 4)
        k = round(f * n)
        pos = beat * 12 + k * (12 // n)
        endq = round(e / tpb * 4) * 3  # fine arrotondata ai sedicesimi
        q.append([pos, endq, p])
    q.sort()
    dedup = []
    for ev in q:
        if dedup and dedup[-1][0] == ev[0]:
            continue
        dedup.append(ev)
    for i, ev in enumerate(dedup):
        nxt = dedup[i + 1][0] if i + 1 < len(dedup) else ev[0] + 48
        ev[1] = max(ev[0] + 3, min(ev[1], nxt))
        if nxt - ev[1] <= 12:  # legato: si chiudono i buchi fino a un movimento (il canto è staccato nel MIDI)
            ev[1] = nxt

    measures = []
    for b in range(b0 - 1, b1):
        bstart, nbeats = bars[b]
        start, end = bstart * 12, (bstart + nbeats) * 12
        evs = [list(e) for e in dedup if start <= e[0] < end]
        # ---- serializza la destra battito per battito
        tokens, fingers_src = [], []
        cur = start
        i = 0
        while cur < end:
            beat = cur // 12
            n = grid.get(beat, 4)
            bend = (beat + 1) * 12
            if n == 3:
                # gruppo di terzina: tutto ciò che sta nel movimento
                parts = []
                t = cur
                while t < bend:
                    if i < len(evs) and evs[i][0] == t:
                        stop = min(evs[i][1], bend)
                        parts.append((note_name(evs[i][2]), (stop - t) // 4 or 1))
                        fingers_src.append(evs[i][2])
                        t = t + max(4, (stop - t) // 4 * 4)
                        i += 1
                    else:
                        nx = evs[i][0] if i < len(evs) and evs[i][0] < bend else bend
                        w = max(1, (nx - t) // 4)
                        parts.append(("r", w))
                        t += w * 4
                if all(x[0] == "r" for x in parts):
                    tokens.append("r:4")
                elif len(parts) == 1:
                    tokens.append(f"{parts[0][0]}:4")
                else:
                    tokens.append("[" + " ".join(f"{nm}:{w}" if w != 1 else nm for nm, w in parts) + "]:4")
                cur = bend
                continue
            if i < len(evs) and evs[i][0] == cur:
                stop = evs[i][1]
                # non entrare in un movimento a terzine
                t = cur + 3
                while t < min(stop, end):
                    if t % 12 == 0 and grid.get(t // 12, 4) == 3:
                        break
                    t += 3
                stop = min(t, stop, end)
                stop = cur + max(3, (stop - cur) // 3 * 3)
                tokens.append(f"{note_name(evs[i][2])}:{(stop - cur) // 3}")
                fingers_src.append(evs[i][2])
                cur = stop
                i += 1
                while i < len(evs) and evs[i][0] < cur:
                    i += 1
            else:
                nx = evs[i][0] if i < len(evs) else end
                t = cur + 3
                while t < nx and not (t % 12 == 0 and grid.get(t // 12, 4) == 3):
                    t += 3
                t = min(t, nx, end)
                tokens.append(f"r:{max(1, (t - cur) // 3)}")
                cur = cur + max(3, (t - cur) // 3 * 3)
        if nbeats < 4:  # battuta corta (es. 2/4): si completa con una pausa, l'accordo resta tenuto
            tokens.append(f"r:{(4 - nbeats) * 4}")
        # ---- sinistra: accordo per mezza battuta
        chords, lh, lh_events = [], [], []
        for h in range(2):
            if nbeats < 4 and h == 1:
                lh.append(lh[-1] if lh and lh[-1] != "r:8" else "r:8")
                if lh_events and lh[-1] != "r:8":
                    lh_events.append(lh_events[-1])
                continue
            hs = bstart * tpb + h * nbeats * tpb // 2
            he = bstart * tpb + (h + 1) * nbeats * tpb // 2 if nbeats >= 4 else (bstart + nbeats) * tpb
            w = defaultdict(float)
            low = None
            for s, e, p in harm:
                ov = min(e, he) - max(s, hs)
                if ov > 0:
                    w[p % 12] += ov
                    if low is None or p < low[0]:
                        low = (p, ov)
            if not w:
                lh.append("r:8")
                continue
            root, qu = detect_chord(w, low[0] % 12 if low else None)
            sym = chord_symbol(root, qu)
            if not chords or chords[-1] != sym or h == 0:
                chords.append(sym)
            v = lh_voicing(root, qu)
            lh.append("+".join(note_name(p) for p in v) + ":8")
            lh_events.append(v)
        if len(chords) == 2 and chords[0] == chords[1]:
            chords = chords[:1]
        if len(lh) == 2 and lh[0] == lh[1] and lh[0] != "r:8":
            lh = [lh[0].replace(":8", ":16")]
            lh_events = lh_events[:1]
        measures.append({
            "chords": chords,
            "rh": " ".join(tokens),
            "short": nbeats < 4,
            "lh": " ".join(lh),
            "_rh_notes": fingers_src,
            "_lh_chords": lh_events,
        })

    # ---- dita
    rh_all = [p for m in measures for p in m["_rh_notes"]]
    rf_all = [f[0] for f in finger([[p] for p in rh_all], "R")] if rh_all else []
    lh_all = [c for m in measures for c in m["_lh_chords"]]
    lf_all = finger([sorted(c) for c in lh_all], "L") if lh_all else []
    ri = li = 0
    for m in measures:
        n = len(m.pop("_rh_notes"))
        m["rf"] = " ".join(str(x) for x in rf_all[ri:ri + n])
        ri += n
        k = len(m.pop("_lh_chords"))
        m["lf"] = " ".join("/".join(str(d) for d in f) for f in lf_all[li:li + k])
        li += k
    json.dump({"first": b0, "measures": measures}, sys.stdout, indent=1)


if __name__ == "__main__":
    main()
