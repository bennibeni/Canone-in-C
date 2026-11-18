import json
import sys
from pathlib import Path

import numpy as np
import pretty_midi

N = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def nm(p):
    return f"{N[p % 12]}{p // 12 - 1}"


WHITE = [0, 2, 4, 5, 7, 9, 11]


def grid(seps):
    # bordi reali dei tasti bianchi (la prospettiva allarga i tasti a destra): pulizia dei falsi bordi
    seps = sorted(seps)
    out = [seps[0]]
    for x in seps[1:]:
        d = x - out[-1]
        if d < 21:
            continue
        while d > 40:
            out.append(out[-1] + 26)
            d = x - out[-1]
        out.append(x)
    out = np.array(out, float)
    w = np.diff(out).mean()
    # estendi di un tasto a sinistra e a destra
    out = np.concatenate([[out[0] - w], out, [out[-1] + w]])
    return out, w


def key_of(x, edges, w):
    k = int(np.searchsorted(edges, x) - 1)
    k = max(0, min(len(edges) - 2, k))
    f = (x - edges[k]) / (edges[k + 1] - edges[k])
    if f > 0.82:
        return ("b", k + 1)  # tasto nero a sinistra del separatore k+1
    if f < 0.18:
        return ("b", k)
    return ("w", k)


def to_midi(kind, k, off):
    # off = indice midi-bianco del tasto bianco k=0 : contiamo i tasti bianchi da C-1
    wi = k + off
    o, r = divmod(wi, 7)
    base = o * 12 + WHITE[r]
    if kind == "w":
        return base
    # nero a sinistra del bianco k: esiste se il bianco k non è C o F
    if r in (0, 3):
        return None
    return base - 1


vid, hlf, midf = sys.argv[1], sys.argv[2], sys.argv[3]
seps = np.load(vid + ".seps.npy")
edges, w = grid(seps)
a = edges[0]
fr = json.loads(Path(hlf).read_text(encoding="utf-8"))["frames"]
# intervalli on/off per (mano, tasto)
active = {}
notes = []
for i, f in enumerate(fr + [{"L": [], "R": []}]):
    now = set()
    for h in "LR":
        for b in f[h]:
            if b[1] - b[0] < 5:
                continue
            now.add((h,) + key_of((b[0] + b[1]) / 2, edges, w))
    for key in list(active):
        if key not in now:
            s = active.pop(key)
            if i - s >= 3:
                notes.append(
                    {"hand": key[0], "kind": key[1], "k": key[2], "f0": s, "f1": i}
                )
    for key in now:
        if key not in active:
            active[key] = i
notes.sort(key=lambda n: n["f0"])
# offset ottava dai dati audio
m = pretty_midi.PrettyMIDI(midf)
au = [
    (n.start, n.pitch) for ins in m.instruments for n in ins.notes if n.velocity >= 45
]
best = (-1, 0)
for off in range(80):
    sc = 0
    for n in notes:
        p = to_midi(n["kind"], n["k"], off)
        if p is None:
            continue
        t = n["f0"] / 30
        if any(abs(t - at) < 0.12 and ap == p for at, ap in au):
            sc += 1
    if sc > best[0]:
        best = (sc, off)
off = best[1]
print(
    vid,
    "edges",
    len(edges),
    f"w={w:.2f}",
    "offset",
    off,
    "match",
    best[0],
    "/",
    len(notes),
)
out = []
for n in notes:
    p = to_midi(n["kind"], n["k"], off)
    out.append(
        {
            "hand": n["hand"],
            "p": p,
            "t0": n["f0"] / 30,
            "t1": n["f1"] / 30,
            "x": float(
                edges[n["k"]]
                if n["kind"] == "b"
                else (edges[n["k"]] + edges[n["k"] + 1]) / 2
            ),
        }
    )
Path(vid + ".notes.json").write_text(json.dumps(out), encoding="utf-8")
for n in out[: int(sys.argv[4]) if len(sys.argv) > 4 else 0]:
    print(
        f"{n['t0']:6.2f}-{n['t1']:6.2f} {n['hand']} {nm(n['p']) if n['p'] is not None else '??'}"
    )
