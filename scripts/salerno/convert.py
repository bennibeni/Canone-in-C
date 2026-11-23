import json
import sys
from fractions import Fraction as F
from math import gcd

import pymupdf as fitz

from reader import read_page, find_staves, parse_system, split_measures, onsets
import fingering


def finger(events, hand, fixed=None):
    """diteggiatura calcolata, con le dita stampate come vincolo"""
    if not fixed:
        return fingering.finger(events, hand)
    it = iter(range(len(events)))
    orig = fingering.chord_states

    def cs(p, h):
        i = next(it)
        st = orig(p, h)
        fx = fixed[i]
        if fx and any(f is not None for f in fx):
            filt = [s for s in st if all(fx[j] is None or s[j] == fx[j] for j in range(len(s)))]
            return filt or st
        return st

    fingering.chord_states = cs
    try:
        return fingering.finger(events, hand)
    finally:
        fingering.chord_states = orig
from chords import chord_name

PDF = "/home/claude/emo.pdf"
doc = fitz.open(PDF)


def read_song(pages):
    systems = []
    tempo = None
    for pn in pages:
        page = doc[pn - 1]
        glyphs, texts, hl, vl, fills, curves = read_page(page)
        staves = find_staves(hl)
        for i in range(0, len(staves) - 1, 2):
            sysd = parse_system(glyphs, texts, vl, fills, curves, staves[i : i + 2], hl)
            systems.append(sysd)
        for t in texts:
            if t[0] == "Edwin-Bold" and t[2].isdigit() and tempo is None:
                s = "".join(x[2] for x in texts if x[0] == "Edwin-Bold" and abs(x[4] - t[4]) < 1)
                digits = "".join(ch for ch in s if ch.isdigit())
                if digits:
                    tempo = int(digits)
    time = systems[0]["staff"][0]["time"] or [4, 4]
    beats = time[0] if time[1] == 4 else time[0] * 4 // time[1]
    full = F(beats * 4)
    measures = []
    for sysd in systems:
        for m in split_measures(sysd):
            total, ok = onsets(m, full)
            measures.append({"ev": m, "total": total, "ok": ok, "key": sysd["staff"][0]["keysig"]})
    grace = sum(s["staff"][i]["grace"] for s in systems for i in (0, 1))
    return measures, full, tempo, grace, systems[0]["staff"][0]["keysig"]


def to_app(measures, full):
    """note per mano con attacco assoluto; le legature dentro la battuta allungano la nota"""
    out = {"R": [], "L": []}
    pickup = 0
    if measures and measures[0]["total"] < full and not measures[0]["ok"]:
        pickup = full - measures[0]["total"]
    problems = []
    for mi, m in enumerate(measures):
        base = mi * full + (pickup if mi == 0 else 0)
        if not m["ok"] and not (mi == 0 and pickup):
            problems.append((mi + 1, str(m["total"])))
        for si, h in ((0, "R"), (1, "L")):
            for e in m["ev"][si]:
                if e.kind == "rest":
                    continue
                for hd in e.heads:
                    out[h].append({"s": base + e.onset, "d": e.dur, "p": hd["midi"], "name": hd["name"], "f": hd.get("finger"),
                                   "tie_in": hd["midi"] in e.tie_from_prev or hd.get("tie_in"), "m": mi, "tuplet": e.tuplet})
    # legature: unisci alla nota precedente della stessa altezza se è nella stessa battuta
    for h in "RL":
        res = []
        for n in sorted(out[h], key=lambda n: (n["s"], n["p"])):
            if n["tie_in"]:
                prev = [o for o in res if o["p"] == n["p"] and o["s"] + o["d"] == n["s"] and o["m"] == n["m"] and not o["tuplet"] and not n["tuplet"]]
                if prev:
                    prev[-1]["d"] += n["d"]
                    continue
            res.append(n)
        out[h] = res
    return out, pickup, problems


def build_measures(notes, nmeas, full):
    rows = []
    hands = {}
    for h in "RL":
        groups = {}
        for n in notes[h]:
            groups.setdefault(n["s"], []).append(n)
        ev = [sorted(groups[s], key=lambda n: n["p"]) for s in sorted(groups)]
        fs = finger([[n["p"] for n in g] for g in ev], h, [[n["f"] for n in g] for g in ev]) if ev else []
        for g, f in zip(ev, fs):
            for n, fi in zip(g, f):
                n["fa"] = n["f"] or fi
        hands[h] = ev
    for m in range(nmeas):
        row = {}
        for h in "RL":
            ev = [g for g in hands[h] if m * full <= g[0]["s"] < (m + 1) * full]
            toks, t = [], m * full  # (pitches|None, dur Fraction)
            fing = []
            for i, g in enumerate(ev):
                s = g[0]["s"]
                if s > t:
                    toks.append((None, s - t))
                nxt = ev[i + 1][0]["s"] if i + 1 < len(ev) else (m + 1) * full
                d = min(max(n["d"] for n in g), nxt - s)
                toks.append(("+".join(n["name"] for n in g), d))
                fing.append("/".join(str(n["fa"]) for n in g))
                t = s + d
            if t < (m + 1) * full:
                toks.append((None, (m + 1) * full - t))
            row[h] = (render(toks), " ".join(fing))
        rows.append(row)
    return rows


def render(toks):
    """token con durate frazionarie: i gruppi irregolari diventano [..]:n"""
    out = []
    i = 0
    while i < len(toks):
        p, d = toks[i]
        if d.denominator == 1:
            out.append(f"{p or 'r'}:{d.numerator}")
            i += 1
            continue
        grp, acc = [], F(0)
        while i < len(toks):
            grp.append(toks[i])
            acc += toks[i][1]
            i += 1
            if acc.denominator == 1:
                break
        if acc.denominator != 1:
            raise ValueError(f"gruppo irregolare non chiuso: {grp}")
        den = 1
        for _, dd in grp:
            den = den * dd.denominator // gcd(den, dd.denominator)
        ws = [int(dd * den) for _, dd in grp]
        g = 0
        for w in ws:
            g = gcd(g, w)
        ws = [w // g for w in ws]
        inner = " ".join(f"{pp or 'r'}" + (f":{w}" if w != 1 else "") for (pp, _), w in zip(grp, ws))
        out.append(f"[{inner}]:{acc.numerator}")
    return " ".join(out)


def chords_for(notes, m, full, beats):
    """nome degli accordi della battuta (metà battuta in 4/4, battuta intera altrimenti)"""
    halves = 2 if beats == 4 else 1
    names = []
    for k in range(halves):
        a = m * full + k * full / halves
        b = a + full / halves
        ns = [n for h in "RL" for n in notes[h] if a <= n["s"] < b or (n["s"] < a < n["s"] + n["d"])]
        nm = chord_name([n["name"] for n in ns]) if ns else None
        names.append(nm)
    if halves == 2 and names[0] == names[1]:
        names = names[:1]
    if any(n is None for n in names):
        names = [n for n in names if n]
    return names


if __name__ == "__main__":
    pages = [int(x) for x in sys.argv[1].split(",")]
    measures, full, tempo, grace, key = read_song(pages)
    notes, pickup, problems = to_app(measures, full)
    nmeas = len(measures)
    rows = build_measures(notes, nmeas, full)
    print("tempo", tempo, "battuta", full, "levare", pickup, "acciaccature", grace, "armatura", key, "problemi", problems)
    for i, r in enumerate(rows):
        print(i + 1, chords_for(notes, i, full, int(full / 4)), "R", r["R"][0], "|", r["R"][1])
        print("   L", r["L"][0], "|", r["L"][1])
