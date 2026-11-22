"""Preludio in Do (BWV 846): come nell'originale, la seconda nota di ogni mezza battuta è della
sinistra e resta tenuta fino a metà battuta (battuta 33: fino alla fine).

uso: python prelude_c.py the-well-tempered-clavier-...-prelude-1-in-c-major-....musicxml uscita.json
"""

import json
import sys
from collections import Counter
from pathlib import Path

from mxl_to_measures import build


def move(n):
    off = n["s"] % 16
    if n["m"] < 32 and off in (1, 9):
        return 8 - off % 8
    if n["m"] == 32 and off == 1:
        return 15
    return None


meas = build(sys.argv[1], move)
# stessa diteggiatura per tutta la battuta: la terzina di dita più frequente della destra
for m in meas[:32]:
    toks, fs = m["R"]
    f = fs.split()
    trip = Counter(tuple(f[i : i + 3]) for i in range(0, len(f), 3)).most_common(1)[0][
        0
    ]
    m["R"] = (toks, " ".join(trip * (len(f) // 3)))
Path(sys.argv[2]).write_text(json.dumps(meas, indent=1), encoding="utf-8")
for i, m in enumerate(meas):
    print(i + 1, "R", m["R"][0], "|", m["R"][1])
    print("   L", m["L"][0], "|", m["L"][1])
