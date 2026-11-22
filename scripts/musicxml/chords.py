"""Nome dell'accordo da un insieme di note (riconoscimento semplice, per le etichette delle battute)."""

# intervalli dalla fondamentale -> suffisso
TEMPLATES = [
    ((0, 4, 7), ""),
    ((0, 3, 7), "m"),
    ((0, 3, 6), "°"),
    ((0, 4, 8), "+"),
    ((0, 4, 7, 10), "7"),
    ((0, 4, 7, 11), "maj7"),
    ((0, 3, 7, 10), "m7"),
    ((0, 3, 6, 10), "ø7"),
    ((0, 3, 6, 9), "°7"),
    ((0, 5, 7), "sus4"),
    ((0, 3, 7, 11), "m(maj7)"),
]
STEP = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def pc_of(name):
    """'F#3' -> 6"""
    base = STEP[name[0]]
    acc = name[1:].rstrip("-0123456789")
    return (base + acc.count("#") - acc.count("b")) % 12


def spell(pc, names):
    """grafia della fondamentale: quella usata nella partitura se c'è"""
    for n in names:
        if pc_of(n) == pc:
            return n.rstrip("-0123456789")
    return SHARP[pc]


def chord_name(names):
    """names: note dell'accordo come 'E3'. Restituisce il nome migliore (o None)."""
    if not names:
        return None
    pcs = {pc_of(n) for n in names}
    bass = pc_of(min(names, key=lambda n: (int(n.lstrip("ABCDEFG#b")), STEP[n[0]])))
    best = None
    for root in range(12):
        for tpl, suf in TEMPLATES:
            chord = {(root + i) % 12 for i in tpl}
            if not pcs <= chord or root not in pcs and len(pcs) < 3:
                continue
            # meno note mancanti, fondamentale presente e al basso, triadi prima delle settime
            score = (
                (len(chord) - len(pcs)) * 2
                + (0 if root in pcs else 3)
                + (0 if root == bass else 0.6)
                + len(tpl) * 0.1
            )
            if best is None or score < best[0]:
                best = (score, spell(root, names) + suf)
    return best[1] if best else None
