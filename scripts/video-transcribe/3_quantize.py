import json
import sys
from pathlib import Path

import numpy as np
import pretty_midi

N = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def nm(p):
    return f"{N[p % 12]}{p // 12 - 1}"


vid = sys.argv[1]
midf = sys.argv[2]
raw = [
    n
    for n in json.loads(Path(vid + ".notes.json").read_text(encoding="utf-8"))
    if n["t1"] - n["t0"] >= 0.13
]
au = [
    (float(n.start), float(n.end), n.pitch, n.velocity)
    for ins in pretty_midi.PrettyMIDI(midf).instruments
    for n in ins.notes
]


def reg(h, p):
    return (p < 62) if h == "L" else (p >= 55)


notes = []
for n in raw:
    if n["p"] is None:  # tasto non riconosciuto: altezza dall'audio
        c = [a for a in au if abs(a[0] - n["t0"]) < 0.12 and reg(n["hand"], a[2])]
        if not c:
            continue
        n["p"] = max(c, key=lambda a: a[3])[2]
        n["src"] = "audio"
    notes.append(n)
# note forti dell'audio che il video non ha visto (tasti neri della destra)
for a in au:
    if a[3] < 75 or a[1] - a[0] < 0.15 or a[2] < 62:
        continue  # solo melodia (la sinistra il video la vede bene)
    if any(abs(n["t0"] - a[0]) < 0.15 and (n["p"] - a[2]) % 12 == 0 for n in notes):
        continue
    if any(n["hand"] == "R" and abs(n["t0"] - a[0]) < 0.2 for n in notes):
        continue  # la destra lì c'è già
    if any(
        abs(n["t0"] - a[0]) < 0.06 and (a[2] - n["p"]) in (7, 12, 19, 24) for n in notes
    ):
        continue  # armonica
    h = "R" if a[2] >= 60 else "L"
    notes.append(
        {"hand": h, "p": a[2], "t0": a[0], "t1": a[1], "x": None, "src": "audio+"}
    )
notes.sort(key=lambda n: n["t0"])
print(
    "aggiunte dall audio:",
    [
        (round(n["t0"], 2), n["hand"], nm(n["p"]))
        for n in notes
        if n.get("src") == "audio+"
    ],
)
Lt = sorted(n["t0"] for n in notes if n["hand"] == "L")
on = []
for t in Lt:
    if on and t - on[-1] < 0.08:
        continue
    on.append(t)
on = np.array(on)
g = np.diff(on)
idx = [0]
for i, gi in enumerate(g):
    loc = np.median(g[max(0, i - 6) : i + 7])
    idx.append(idx[-1] + max(1, int(round(gi / loc))))
idx = np.array(idx, float)
per0 = np.median(g)


def t2i(t):  # tempo → indice di croma (frazionario)
    if t <= on[0]:
        return (t - on[0]) / per0
    if t >= on[-1]:
        return idx[-1] + (t - on[-1]) / per0
    return float(np.interp(t, on, idx))


q = []
for n in notes:
    a = t2i(n["t0"])
    b = t2i(n["t1"])
    st = int(round(a * 2))
    du = max(1, int(round((b - a) * 2)))
    q.append(
        {
            "hand": n["hand"],
            "p": n["p"],
            "s": st,
            "d": du,
            "x": n["x"],
            "t0": n["t0"],
            "t1": n["t1"],
            "res": round(a * 2 - st, 2),
            "src": n.get("src", "video"),
        }
    )
Path(vid + ".q.json").write_text(
    json.dumps({"on": on.tolist(), "idx": idx.tolist(), "notes": q}), encoding="utf-8"
)
print(
    vid,
    "crome della sinistra",
    int(idx[-1]) + 1,
    "mancanti inserite",
    int(idx[-1]) + 1 - len(on),
    "residuo medio destra {:.2f}".format(
        np.mean([abs(n["res"]) for n in q if n["hand"] == "R"])
    ),
)
lo = min(n["s"] for n in q) // 16
hi = max(n["s"] for n in q) // 16
for m in range(lo, hi + 1):
    for h in "RL":
        ns = sorted(
            [n for n in q if n["s"] // 16 == m and n["hand"] == h],
            key=lambda n: (n["s"], n["p"]),
        )
        print(
            f"m{m + 1:2d} {h}: "
            + " ".join(f"{nm(n['p'])}@{n['s'] % 16}:{n['d']}" for n in ns)
        )
