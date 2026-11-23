"""Genera lib/songs/salerno/*.ts dai brani del PDF di Christian Salerno."""
import json
import os
from fractions import Fraction as F

from songs import SONGS
from convert import read_song, to_app, build_measures  # aggiunge scripts/musicxml al percorso
from chords import chord_name

# i file .ts vanno direttamente in lib/songs/salerno
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "lib", "songs", "salerno")
os.makedirs(OUT, exist_ok=True)
MAJOR_SHARP = ["C", "G", "D", "A", "E", "B", "F#"]
MAJOR_FLAT = ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb"]
REL_MINOR = {"C": "A", "G": "E", "D": "B", "A": "F#", "E": "C#", "B": "G#", "F": "D", "Bb": "G", "Eb": "C", "Ab": "F", "F#": "D#", "Db": "Bb", "Gb": "Eb"}
PC = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
IT = {"C": "Do", "D": "Re", "E": "Mi", "F": "Fa", "G": "Sol", "A": "La", "B": "Si"}

# correzioni a mano (battute dove lo spartito ha due voci nello stesso rigo)
FIX = {
    "natale-dietro-a-una-finestra": {4: {"L": ("F#3+E4:4 C#4:4 B3:4 D#4:4", "5/1 2 3 1")}},
}


def pc(name):
    v = PC[name[0]]
    for ch in name[1:]:
        if ch == "#":
            v += 1
        elif ch == "b":
            v -= 1
    return v % 12


def it_key(k):
    return IT[k[0]] + k[1:].replace("#", "♯").replace("b", "♭")


def chords_of(notes, m, full, beats):
    halves = 2 if beats == 4 else 1
    names = []
    for k in range(halves):
        a = m * full + k * full / halves
        b = a + full / halves
        ns = [n for h in "RL" for n in notes[h] if a <= n["s"] < b or (n["s"] < a < n["s"] + n["d"])]
        nm = chord_name([n["name"] for n in ns]) if len({pc(n["name"]) for n in ns}) >= 2 else None
        names.append(nm)
    names = [n for n in names if n]
    if len(names) == 2 and names[0] == names[1]:
        names = names[:1]
    return names


def split_parts(n):
    if n <= 10:
        return [(0, n)]
    k = max(2, round(n / 8))
    size = -(-n // k)
    out, a = [], 0
    while a < n:
        b = min(n, a + size)
        if n - b < 3:
            b = n
        out.append((a, b))
        a = b
    return out


report = {}
index = []
for slug, title, pages in SONGS:
    measures, full, tempo, grace, (ns, nf) = read_song(pages)
    notes, pickup, problems = to_app(measures, full)
    nmeas = len(measures)
    rows = build_measures(notes, nmeas, full)
    for mi, hands in FIX.get(slug, {}).items():
        for h, v in hands.items():
            rows[mi - 1][h] = v
    beats = int(full / 4)
    major = MAJOR_SHARP[ns] if ns else MAJOR_FLAT[nf]
    # modo: dalla nota più grave dell'ultima battuta
    last = [n for n in notes["L"] + notes["R"] if n["s"] >= (nmeas - 1) * full]
    low = min(last, key=lambda n: n["p"])["name"] if last else major
    minor = pc(low) == pc(REL_MINOR[major]) and pc(low) != pc(major)
    keyname = (it_key(REL_MINOR[major]) + " minore") if minor else (it_key(major) + " maggiore")
    chords = [chords_of(notes, i, full, beats) for i in range(nmeas)]
    prog = []
    for c in chords:
        for x in c:
            if not prog or prog[-1] != x:
                prog.append(x)
            if len(prog) >= 8:
                break
        if len(prog) >= 8:
            break
    parts = split_parts(nmeas)
    var = "s_" + slug.replace("-", "_")
    lines = []
    lines.append(f"// {title} (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.")
    lines.append("// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non")
    lines.append("// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse")
    lines.append("// non sono unite" + (" e le acciaccature non sono riportate." if grace else "."))
    lines.append('import type { Song } from "../../score";')
    lines.append("")
    lines.append(f"export const {var}: Song = {{")
    lines.append(f'  slug: "{slug}",')
    lines.append(f"  title: {json.dumps(title, ensure_ascii=False)},")
    lines.append('  composer: "Christian Salerno",')
    lines.append('  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell\'autore. Note e diteggiature dallo spartito",')
    lines.append('  collection: "facili",')
    lines.append(f'  audio: "/audio/salerno/{slug}.mp3",')
    lines.append(f'  mode: "{"minor" if minor else "major"}",')
    lines.append(f'  videoKey: "{major}",')
    if major != "C":
        lines.append(f'  baseKey: "{major}",')
    if beats != 4:
        lines.append(f"  beats: {beats},")
    lines.append(f"  progression: {json.dumps(prog)},")
    lines.append('  progressionLabel: "gli accordi dell\'inizio",')
    tips = [f"Tonalità: {keyname}" + (f" ({ns} diesis in chiave)." if ns else f" ({nf} bemolle in chiave)." if nf else " (nessuna alterazione in chiave)."),
            f"Tempo indicato: semiminima = {tempo}. Comincia molto più lento e alza il tempo solo quando le dita sono sicure." if tempo else "Comincia lento.",
            "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."]
    lines.append(f"  fullTips: {json.dumps(tips, ensure_ascii=False)},")
    lines.append("  parts: [")
    for pi, (a, b) in enumerate(parts):
        lines.append("    {")
        lines.append(f"      id: {pi + 1},")
        lines.append(f'      title: "{"Parte " + str(pi + 1) if len(parts) > 1 else "Il brano"}",')
        lines.append(f'      subtitle: "Battute {a + 1}–{b}",')
        lines.append(f'      focus: "Battute {a + 1}–{b}",')
        lines.append(f"      tempo: {min(tempo or 80, 100)},")
        if a:
            lines.append(f"      firstMeasure: {a + 1},")
        lines.append('      tips: ["Prima una mano alla volta, poi insieme, lentamente."],')
        lines.append("      measures: [")
        for i in range(a, b):
            r = rows[i]
            m = {"chords": chords[i], "rh": r["R"][0]}
            if r["R"][1]:
                m["rf"] = r["R"][1]
            m["lh"] = r["L"][0]
            if r["L"][1]:
                m["lf"] = r["L"][1]
            lines.append("        { " + ", ".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in m.items()) + " },")
        lines.append("      ],")
        lines.append("    },")
    lines.append("  ],")
    lines.append("};")
    open(f"{OUT}/{slug}.ts", "w").write("\n".join(lines) + "\n")
    index.append((var, slug))
    report[slug] = {"batt": nmeas, "key": keyname, "tempo": tempo, "problemi": problems, "acc": grace, "parti": len(parts), "metro": beats}

idx = ['import type { Song } from "../../score";']
for var, slug in index:
    idx.append(f'import {{ {var} }} from "./{slug}";')
idx.append("")
idx.append("/** Brani facili: «Emozioni al Pianoforte» di Christian Salerno, in ordine di difficoltà */")
idx.append("export const SALERNO: Song[] = [" + ", ".join(v for v, _ in index) + "];")
open(f"{OUT}/index.ts", "w").write("\n".join(idx) + "\n")
for k, v in report.items():
    print(k, v)
