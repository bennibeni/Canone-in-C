"""MusicXML (pianoforte, 2 pentagrammi, 4/4) -> battute nel formato dell'app con diteggiatura proposta.

uso: python mxl_to_measures.py brano.musicxml uscita.json
oppure da Python con build(path, move=...) per spostare note dalla destra alla sinistra (vedi prelude_c.py).
Pentagramma 1 = mano destra, 2 = mano sinistra. Le diteggiature già presenti nel file hanno la precedenza.
Ogni mano è scritta come una sola voce: una nota (o accordo) dura fino all'attacco successivo della
stessa mano, al massimo per la sua durata scritta.
"""

import json
import math
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from fingering import finger

STEP = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
ACC = {-2: "bb", -1: "b", 0: "", 1: "#", 2: "##"}


def parse(path):
    root = ET.parse(path).getroot()
    part = root.find("part")
    div, notes, t0, pickup = 4, [], 0, 0
    for mi, meas in enumerate(part.findall("measure")):
        t = last = mlen = 0
        for el in meas:
            if el.tag == "attributes" and el.find("divisions") is not None:
                div = int(el.find("divisions").text)
            elif el.tag == "backup":
                t -= int(el.find("duration").text)
            elif el.tag == "forward":
                t += int(el.find("duration").text)
            elif el.tag == "note":
                dur = (
                    int(el.find("duration").text)
                    if el.find("duration") is not None
                    else 0
                )
                if el.find("chord") is not None:
                    st = last
                else:
                    st = t
                    t += dur
                last, mlen = st, max(mlen, t)
                if el.find("rest") is not None or el.find("grace") is not None:
                    continue
                p = el.find("pitch")
                alter = (
                    int(float(p.find("alter").text))
                    if p.find("alter") is not None
                    else 0
                )
                octv = int(p.find("octave").text)
                midi = STEP[p.find("step").text] + alter + 12 * (octv + 1)
                fe = el.find(".//fingering")
                notes.append(
                    {
                        "m": mi,
                        "s": round((t0 + st) * 4 / div),
                        "d": max(1, math.ceil(dur * 4 / div - 1e-9)),
                        "raw": (t0 + st) / div,
                        "p": midi,
                        "name": f"{p.find('step').text}{ACC[alter]}{octv}",
                        "hand": "R"
                        if (el.find("staff") is None or el.find("staff").text == "1")
                        else "L",
                        "tie": [x.get("type") for x in el.findall("tie")],
                        "f": int(fe.text)
                        if fe is not None and fe.text and fe.text.strip().isdigit()
                        else None,
                    }
                )
        if mi == 0 and meas.get("implicit") == "yes":
            pickup = mlen
        t0 += mlen
    # levare: la prima battuta (incompleta) diventa una battuta intera che comincia con una pausa
    full = 16
    tm = part.find("measure/attributes/time")
    if tm is not None:
        full = int(tm.find("beats").text) * 16 // int(tm.find("beat-type").text)
    shift = full - pickup * 4 // div if pickup else 0
    for n in notes:
        n["s"] += shift

    # due note della stessa mano arrotondate allo stesso sedicesimo (biscrome, terzine):
    # si tiene quella più vicina al sedicesimo (a parità, la prima)
    def off_grid(n):
        return abs(n["raw"] * 4 - round(n["raw"] * 4))

    seen, kept = {}, []
    for n in sorted(notes, key=lambda n: (off_grid(n), n["raw"])):
        k = (n["hand"], n["s"])
        if k in seen and seen[k] != n["raw"]:
            continue
        seen[k] = n["raw"]
        kept.append(n)
    notes = kept
    out = []
    for n in sorted(notes, key=lambda n: (n["s"], n["p"])):
        if "stop" in n["tie"]:
            prev = [
                o
                for o in out
                if o["p"] == n["p"]
                and o["hand"] == n["hand"]
                and o["s"] + o["d"] == n["s"]
            ]
            if prev:
                prev[-1]["d"] += n["d"]
                continue
        out.append(n)
    return out, t0 * 4 // div + shift


def build(path, move=None, max_left_span=None, edit=None):
    """move(nota) -> durata per spostare una nota della destra alla sinistra (None = nessuna).
    max_left_span: negli accordi della sinistra più larghi di così (semitoni) le note alte vanno alla destra.
    edit(notes): correzioni a mano sulle note, prima del calcolo delle dita."""
    notes, total = parse(path)
    if max_left_span:
        # accordi troppo larghi per la sinistra: le note alte passano alla destra
        groups = {}
        for n in notes:
            if n["hand"] == "L":
                groups.setdefault(n["s"], []).append(n)
        for g in groups.values():
            low = min(n["p"] for n in g)
            for n in g:
                if n["p"] - low > max_left_span:
                    n["hand"] = "R"
    for n in notes:
        if n["hand"] == "R" and move:
            r = move(n)
            if r:
                n["hand"], n["d"] = "L", r
    if edit:
        edit(notes)
    nmeas = -(-total // 16)
    hands = {}
    for h in "RL":
        ns = [n for n in notes if n["hand"] == h]
        groups = {}
        for n in ns:
            groups.setdefault(n["s"], []).append(n)
        ev = [sorted(groups[s], key=lambda n: n["p"]) for s in sorted(groups)]
        fs = finger([[n["p"] for n in g] for g in ev], h)
        for g, f in zip(ev, fs, strict=True):
            for n, fi in zip(g, f, strict=True):
                n["fa"] = n["f"] or fi  # dita del file se presenti
        hands[h] = ev
    measures = []
    for m in range(nmeas):
        row = {}
        for h in "RL":
            ev = [g for g in hands[h] if m * 16 <= g[0]["s"] < (m + 1) * 16]
            toks, fing, t = [], [], m * 16
            for i, g in enumerate(ev):
                s = g[0]["s"]
                if s > t:
                    toks.append(f"r:{s - t}")
                nxt = ev[i + 1][0]["s"] if i + 1 < len(ev) else (m + 1) * 16
                d = min(max(n["d"] for n in g), nxt - s)
                toks.append("+".join(n["name"] for n in g) + f":{d}")
                fing.append("/".join(str(n["fa"]) for n in g))
                t = s + d
            if t < (m + 1) * 16:
                toks.append(f"r:{(m + 1) * 16 - t}")
            row[h] = (" ".join(toks) or "r:16", " ".join(fing))
        measures.append(row)
    return measures


if __name__ == "__main__":
    meas = build(sys.argv[1])
    Path(sys.argv[2]).write_text(json.dumps(meas, indent=1), encoding="utf-8")
    for i, m in enumerate(meas):
        print(i + 1, "R", m["R"][0], "|", m["R"][1])
        print("   L", m["L"][0], "|", m["L"][1])
