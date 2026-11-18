import json
from pathlib import Path

N = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def spell(p):
    n = N[p % 12].replace("#", "#")
    return f"{n}{p // 12 - 1}"


RESTS = [16, 8, 4, 2, 1]


def rests(n):
    out = []
    while n > 0:
        r = next(x for x in RESTS if x <= n)
        out.append(f"r:{r}")
        n -= r
    return out


def build(vid, fixes):
    q = json.loads(Path(vid + ".q.json").read_text(encoding="utf-8"))["notes"]
    q = [n for n in q if not (n["hand"] == "R" and n["p"] < 55)]
    for n in q:
        n["s"] += 16  # battuta 0 = levare
        if n["hand"] == "R":
            n["s"] = 2 * round(n["s"] / 2)
    for (h, p, s), f in fixes.items():  # dita dedotte dove il video non vede il tasto
        for n in q:
            if n["hand"] == h and spell(n["p"]) == p and n["s"] == s:
                n["finger"] = f
    M = max(n["s"] for n in q) // 16 + 1
    meas = []
    for m in range(M):
        out = {}
        for h in "RL":
            ns = sorted(
                [n for n in q if n["hand"] == h and n["s"] // 16 == m],
                key=lambda n: n["s"],
            )
            toks = []
            fing = []
            t = m * 16
            for i, n in enumerate(ns):
                if n["s"] > t:
                    toks += rests(n["s"] - t)
                nxt = ns[i + 1]["s"] if i + 1 < len(ns) else (m + 1) * 16
                if h == "L":
                    d = 2 if i + 1 < len(ns) else min(2, nxt - n["s"])
                    if m == M - 1 and i == len(ns) - 1:
                        d = (m + 1) * 16 - n["s"]  # ultima nota: fino a fine battuta
                else:
                    d = nxt - n["s"]  # melodia legata (pedale)
                d = max(1, min(d, (m + 1) * 16 - n["s"]))
                toks.append(f"{spell(n['p'])}:{d}")
                f = n.get("finger")
                if h == "L" and (not f or n.get("fconf", 1) < 0.75):
                    f = [5, 2, 1, 2][i % 4]
                fing.append(str(f or 0))
                t = n["s"] + d
            if t < (m + 1) * 16:
                toks += rests((m + 1) * 16 - t)
            out[h] = (" ".join(toks), " ".join(fing))
        meas.append(out)
    return meas


p1 = build("f1.mp4", {("R", "G#4", 6 * 16 + 12): 3})
p2 = build("a2.mp4", {("R", "G#4", 8): 1, ("R", "D#5", 8 * 16 + 8): 2})
Path("al_measures.json").write_text(
    json.dumps({"p1": p1, "p2": p2}, indent=1), encoding="utf-8"
)
for name, P in (("P1", p1), ("P2", p2)):
    print("==", name, len(P), "battute")
    for i, m in enumerate(P):
        print(f"{i:2d} R {m['R'][0]:<44} | {m['R'][1]}")
        print(f"   L {m['L'][0]:<44} | {m['L'][1]}")
