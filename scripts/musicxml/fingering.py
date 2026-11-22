"""Diteggiatura automatica (proposta) per una mano, con programmazione dinamica.

Modello di costo ispirato a Parncutt et al. (1997): per ogni coppia di dita ci sono un'estensione
"rilassata", una "comoda" e una "praticabile" (in semitoni). Si penalizzano le estensioni, le
contrazioni, le dita deboli, il pollice sui tasti neri e lo stesso dito su note diverse.
La sinistra si tratta come la destra a specchio (intervalli col segno invertito).
"""

from itertools import combinations

# coppia (dito basso, dito alto): MinPrac, MinComf, MinRel, MaxRel, MaxComf, MaxPrac
SPAN = {
    (1, 2): (-5, -3, 1, 5, 8, 10),
    (1, 3): (-4, -2, 3, 7, 10, 12),
    (1, 4): (-3, -1, 5, 9, 12, 14),
    (1, 5): (-1, 1, 7, 10, 13, 15),
    (2, 3): (1, 1, 1, 2, 3, 5),
    (2, 4): (1, 1, 3, 4, 5, 7),
    (2, 5): (2, 2, 5, 6, 8, 10),
    (3, 4): (1, 1, 1, 2, 2, 4),
    (3, 5): (1, 1, 3, 4, 5, 7),
    (4, 5): (1, 1, 1, 2, 3, 5),
}
BLACK = {1, 3, 6, 8, 10}


def black(p):
    return p % 12 in BLACK


def pair_cost(f1, p1, f2, p2, hand):
    """costo di passare da (f1 su p1) a (f2 su p2); un salto oltre l'estensione costa come spostare la mano"""
    return min(
        _pair_cost(f1, p1, f2, p2, hand),
        SHIFT + 0.1 * abs(p2 - p1) + (3 if f1 == f2 and p1 != p2 else 0),
    )


SHIFT = 7.0  # spostare tutta la mano


def _pair_cost(f1, p1, f2, p2, hand):
    d = p2 - p1
    if hand == "L":
        d = -d
    if f1 == f2:
        return 0.0 if d == 0 else 6.0 + abs(d) * 0.3  # stesso dito su un'altra nota
    a, b = (f1, f2) if f1 < f2 else (f2, f1)
    if f1 > f2:
        d = -d
    mnp, mnc, mnr, mxr, mxc, mxp = SPAN[(a, b)]
    c = 0.0
    if d > mxp or d < mnp:
        c += 50 + 5 * max(d - mxp, mnp - d)
    if d > mxc:
        c += 2 * (d - mxc)
    elif d > mxr:
        c += d - mxr
    if d < mnc:
        c += 2 * (mnc - d)
    elif d < mnr:
        c += mnr - d
    # passaggio del pollice / scavalcamento
    if a == 1 and d < 0:
        c += 1.0
        if black(p1 if f1 == 1 else p2):
            c += 1.0
    if a != 1 and d < 0:
        c += 20  # incrocio tra dita lunghe: da evitare
    return c


def note_cost(f, p):
    c = 0.0
    if f == 4:
        c += 0.4
    if f == 5:
        c += 0.5
    if f == 1 and black(p):
        c += 1.5
    if f == 5 and black(p):
        c += 0.5
    return c


def chord_states(pitches, hand):
    """dita possibili per un accordo (note ordinate dal basso): crescenti a destra, decrescenti a sinistra"""
    k = len(pitches)
    out = []
    for comb in combinations(range(1, 6), k):
        fs = list(comb) if hand == "R" else list(reversed(comb))
        out.append(tuple(fs))
    return out


def chord_inner(fs, ps, hand):
    c = sum(note_cost(f, p) for f, p in zip(fs, ps, strict=True))
    for i in range(len(fs) - 1):
        c += pair_cost(fs[i], ps[i], fs[i + 1], ps[i + 1], hand)
    return c


def trans(t, prev, s, cur, hand):
    """costo di passare dall'accordo prev (dita t) all'accordo cur (dita s)"""
    pairs = {(t[0], prev[0], s[0], cur[0]), (t[-1], prev[-1], s[-1], cur[-1])}
    c = sum(pair_cost(fa, pa, fb, pb, hand) for fa, pa, fb, pb in pairs)
    return c / len(pairs)


def finger(events, hand):
    """events: lista di accordi (liste di altezze ordinate). Restituisce una tupla di dita per evento.

    Viterbi del secondo ordine: lo stato è (dita dell'evento precedente, dita dell'evento corrente),
    così si valuta anche il salto tra un evento e quello di due passi prima (posizione della mano).
    """
    if not events:
        return []
    states = [chord_states(e, hand) for e in events]
    inner = [
        {s: chord_inner(s, e, hand) for s in st}
        for st, e in zip(states, events, strict=True)
    ]
    if len(events) == 1:
        return [min(inner[0], key=inner[0].get)]
    # stato (a, b) = dita degli eventi i-1, i
    best = {}
    for a in states[0]:
        for b in states[1]:
            best[(a, b)] = (
                inner[0][a] + inner[1][b] + trans(a, events[0], b, events[1], hand)
            )
    backs = []
    for i in range(2, len(events)):
        cur, bk = {}, {}
        for (a, b), cab in best.items():
            for c in states[i]:
                cost = cab + inner[i][c] + trans(b, events[i - 1], c, events[i], hand)
                # salto su tre note: stessa mano, dito a e dito c
                if len(events[i - 2]) == 1 and len(events[i]) == 1 and a[0] != c[0]:
                    # solo un piccolo peso (la mano può essersi spostata nel frattempo)
                    cost += min(
                        1.5,
                        0.3
                        * pair_cost(a[0], events[i - 2][0], c[0], events[i][0], hand),
                    )
                key = (b, c)
                if key not in cur or cost < cur[key]:
                    cur[key], bk[key] = cost, a
        best = cur
        backs.append(bk)
    a, b = min(best, key=best.get)
    out = [b, a]
    for bk in reversed(backs):
        prev = bk[(a, b)]
        out.append(prev)
        a, b = prev, a
    return list(reversed(out))
