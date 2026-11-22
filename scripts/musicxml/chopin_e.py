"""Preludio in Mi minore op. 28 n. 4 (Chopin): battute, dita proposte e accordi della sinistra.

uso: python chopin_e.py prelude-no-4-in-e-minor-op-28-frederic-chopin.musicxml uscita.json
Gli accordi troppo larghi della sinistra (finale) cedono le note alte alla destra; terzine e biscrome
sono arrotondate ai sedicesimi (l'app lavora a sedicesimi).
"""

import json
import sys
from pathlib import Path

from chords import chord_name
from mxl_to_measures import build


def measure_chords(lh_tokens, rh_tokens):
    """nomi degli accordi della battuta (dalla sinistra), senza ripetizioni consecutive"""
    out = []
    for tok in lh_tokens.split():
        notes = tok.split(":")[0]
        if notes == "r":
            continue
        names = notes.split("+")
        if len(names) < 3:
            continue
        ch = chord_name(names)
        if ch and (not out or out[-1] != ch):
            out.append(ch)
    return out[:4]


def edit(notes):
    # battuta 16: del gruppetto di biscrome (Si-La#-Fa doppio diesis-La#) restano due sedicesimi: Si-La#
    for n in notes:
        if n["m"] == 16 and n["name"] == "G##4":
            n["name"], n["p"] = "A#4", n["p"] + 1


meas = build(sys.argv[1], max_left_span=12, edit=edit)
for m in meas:
    m["chords"] = measure_chords(m["L"][0], m["R"][0])
Path(sys.argv[2]).write_text(
    json.dumps(meas, indent=1, ensure_ascii=False), encoding="utf-8"
)
for i, m in enumerate(meas):
    print(i, " · ".join(m["chords"]))
    print("   R", m["R"][0], "|", m["R"][1])
    print("   L", m["L"][0], "|", m["L"][1])
