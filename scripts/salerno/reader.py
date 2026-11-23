"""Lettore delle partiture esportate da MuseScore (PDF vettoriale, font Leland/Edwin).

Legge dal PDF i simboli musicali (teste, alterazioni, chiavi, punti, pause, code), le linee (righi, gambi,
stanghette), le travature (poligoni pieni), le legature (curve) e le diteggiature (testo Edwin-Roman), e
ricostruisce per ogni battuta gli eventi delle due mani con altezza, attacco e durata (in sedicesimi, Fraction).
"""
from fractions import Fraction as F
import pymupdf as fitz

LET = "CDEFGAB"
HEAD = {0xE0A4: "black", 0xE0A3: "half", 0xE0A2: "whole"}
ACCG = {0xE262: 1, 0xE260: -1, 0xE261: 0, 0xE263: 2, 0xE264: -2}
RESTG = {0xE4E3: 16, 0xE4E4: 8, 0xE4E5: 4, 0xE4E6: 2, 0xE4E7: 1}
FLAGS = {0xE240: 1, 0xE241: 1, 0xE242: 2, 0xE243: 2}
TIMESIG = {0xE080 + i: i for i in range(10)}
SHARP_ORDER = "FCGDAEB"
FLAT_ORDER = "BEADGCF"
NORMAL = 22.0  # dimensione del font delle note normali (le acciaccature sono più piccole)


class Glyph:
    def __init__(self, code, x0, x1, y, size):
        self.code, self.x0, self.x1, self.y, self.size = code, x0, x1, y, size

    @property
    def xc(self):
        return (self.x0 + self.x1) / 2


def poly_span(points, x):
    """intervallo verticale del poligono (lista di punti) alla coordinata x"""
    ys = []
    n = len(points)
    for i in range(n):
        a, b = points[i], points[(i + 1) % n]
        if (a[0] - x) * (b[0] - x) <= 0 and a[0] != b[0]:
            t = (x - a[0]) / (b[0] - a[0])
            ys.append(a[1] + t * (b[1] - a[1]))
    return (min(ys), max(ys)) if ys else None


def read_page(page):
    glyphs, texts = [], []
    for b in page.get_text("rawdict")["blocks"]:
        for l in b.get("lines", []):
            for s in l["spans"]:
                for ch in s["chars"]:
                    bb = ch["bbox"]
                    if s["font"] == "Leland":
                        glyphs.append(Glyph(ord(ch["c"]), bb[0], bb[2], ch["origin"][1], s["size"]))
                    else:
                        texts.append((s["font"], s["size"], ch["c"], (bb[0] + bb[2]) / 2, ch["origin"][1], bb[1], bb[3]))
    hl, vl, fills, curves = [], [], [], []
    for dr in page.get_drawings():
        if dr["type"] == "s":
            for it in dr["items"]:
                if it[0] != "l":
                    continue
                a, b = it[1], it[2]
                if abs(a.y - b.y) < 0.3:
                    hl.append((a.y, min(a.x, b.x), max(a.x, b.x)))
                elif abs(a.x - b.x) < 0.3:
                    vl.append((a.x, min(a.y, b.y), max(a.y, b.y), dr["width"] or 0))
        elif dr["type"] == "f":
            pts = []
            for it in dr["items"]:
                if it[0] == "l":
                    pts.append((it[1].x, it[1].y))
                    pts.append((it[2].x, it[2].y))
                elif it[0] == "re":
                    r = it[1]
                    pts += [(r.x0, r.y0), (r.x1, r.y0), (r.x1, r.y1), (r.x0, r.y1)]
            # togli i duplicati consecutivi
            q = []
            for p in pts:
                if not q or abs(q[-1][0] - p[0]) > 0.01 or abs(q[-1][1] - p[1]) > 0.01:
                    q.append(p)
            fills.append((dr["rect"], q))
        elif dr["type"] == "fs":
            curves.append(dr["rect"])
    return glyphs, texts, hl, vl, fills, curves


def find_staves(hl):
    # i righi sono spezzati in segmenti (uno per battuta): si uniscono i segmenti contigui alla stessa altezza
    byy = {}
    for y, x0, x1 in hl:
        byy.setdefault(round(y, 1), []).append((x0, x1))
    long = []
    for y, segs in byy.items():
        segs.sort()
        cur = None
        for a, b in segs:
            if cur and a <= cur[1] + 1.5:
                cur[1] = max(cur[1], b)
            else:
                if cur:
                    long.append((y, cur[0], cur[1]))
                cur = [a, b]
        long.append((y, cur[0], cur[1]))
    long = sorted((y, round(a), round(b)) for y, a, b in long if b - a > 100)
    staves, used = [], set()
    for i, (y, x0, x1) in enumerate(long):
        if i in used:
            continue
        grp = [(i, y)]
        for j in range(i + 1, len(long)):
            y2, a, b = long[j]
            if j in used:
                continue
            if abs(a - x0) < 3 and abs(b - x1) < 3 and 3 < y2 - grp[-1][1] < 9:
                grp.append((j, y2))
            if len(grp) == 5:
                break
        if len(grp) == 5:
            used.update(k for k, _ in grp)
            staves.append({"lines": [g[1] for g in grp], "x0": x0, "x1": x1})
    staves.sort(key=lambda s: s["lines"][0])
    return staves


class Event:
    def __init__(self, heads, dur, x, stem, kind="note"):
        self.heads = heads  # lista di dict: y, pitch (midi), name, finger, glyph
        self.dur = dur  # Fraction in sedicesimi
        self.x = x
        self.stem = stem  # "up", "down", None
        self.kind = kind
        self.tuplet = None
        self.onset = None
        self.tie_from_prev = set()


def parse_system(glyphs, texts, vl, fills, curves, staves, hl_all):
    """staves: [treble_staff, bass_staff] (in ordine verticale). Restituisce le battute del sistema."""
    sp = (staves[0]["lines"][4] - staves[0]["lines"][0]) / 4
    top = staves[0]["lines"][0] - 6 * sp
    bot = staves[1]["lines"][4] + 6 * sp
    mid = (staves[0]["lines"][4] + staves[1]["lines"][0]) / 2
    G = [g for g in glyphs if top < g.y < bot]
    staff_of = lambda y: 0 if y < mid else 1
    # stanghette: linee verticali spesse che coprono un rigo
    bars = []
    for x, y0, y1, w in vl:
        if w > 0.8 and y0 <= staves[0]["lines"][0] + 1 and y1 >= staves[0]["lines"][4] - 1:
            bars.append(x)
    for r, pts in fills:
        if r.width < 6 and r.height > 4 * sp * 0.9 and r.y0 <= staves[0]["lines"][0] + 1 and r.y1 >= staves[0]["lines"][4] - 1:
            bars.append((r.x0 + r.x1) / 2)
    bars = sorted(bars)
    xs = []
    for b in bars:
        if not xs or b - xs[-1] > 3:
            xs.append(b)
    bars = xs
    stems = [(x, y0, y1) for x, y0, y1, w in vl if w <= 0.8 and y1 - y0 > 2 * sp]
    beams = [(r, pts) for r, pts in fills if not (r.width < 6 and r.height > 3 * sp) and r.height < 6 * sp and r.width > 3]
    out = {"bars": bars, "staff": []}
    # teste nello spazio tra i due righi: si decide dai tagli addizionali disegnati (il rigo di violino li mette
    # sotto, a tb+sp, tb+2sp…; quello di basso sopra, a bt-sp, bt-2sp…); se non bastano, dalle teste vicine
    tb, bt = staves[0]["lines"][4], staves[1]["lines"][0]
    gstaff = {}
    allheads = [g for g in G if g.code in HEAD]
    ledgers = [(y, x0, x1) for y, x0, x1 in hl_all if x1 - x0 < 3.2 * sp and tb < y < bt]

    def needed(y, base, direction):
        out = []
        k = 1
        while True:
            ly = base + direction * k * sp
            if (direction > 0 and ly > y + 0.3 * sp) or (direction < 0 and ly < y - 0.3 * sp):
                break
            out.append(ly)
            k += 1
        return out

    for g in allheads:
        if tb + sp * 0.6 < g.y < bt - sp * 0.6:
            here = [y for y, x0, x1 in ledgers if x0 - 1 < g.xc < x1 + 1]
            has = lambda ly: any(abs(ly - y) < 0.8 for y in here)
            nt, nb = needed(g.y, tb, 1), needed(g.y, bt, -1)
            ok_t = all(has(l) for l in nt) and not any(has(l) for l in nb if all(abs(l - m) > 0.8 for m in nt))
            ok_b = all(has(l) for l in nb) and not any(has(l) for l in nt if all(abs(l - m) > 0.8 for m in nb))
            if ok_t != ok_b:
                gstaff[id(g)] = 0 if ok_t else 1
                continue
            near = [h for h in allheads if h is not g and abs(h.xc - g.xc) < 45 and not (tb + sp * 0.6 < h.y < bt - sp * 0.6)]
            if near:
                h = min(near, key=lambda h: abs(h.y - g.y) + abs(h.xc - g.xc) * 0.1)
                gstaff[id(g)] = 0 if h.y < mid else 1
    # anche gli accidenti e i punti seguono la testa a cui sono attaccati
    for g in G:
        if g.code in ACCG or g.code == 0xE1E7:
            for h in allheads:
                if id(h) in gstaff and abs(h.y - g.y) < sp * 0.6 and -3 * sp < g.x0 - h.x0 < 3 * sp:
                    gstaff[id(g)] = gstaff[id(h)]
    sof = lambda g: gstaff.get(id(g), staff_of(g.y))
    for si, st in enumerate(staves):
        L = st["lines"]
        mine = [g for g in G if sof(g) == si]
        clefs = sorted([g for g in mine if g.code in (0xE050, 0xE062, 0xE07A, 0xE07C)], key=lambda g: g.x0)
        # chiave e armatura
        first_clef = clefs[0] if clefs else None
        heads = [g for g in mine if g.code in HEAD and g.size > NORMAL * 0.9]
        grace = [g for g in mine if g.code in HEAD and g.size <= NORMAL * 0.9]
        min_head_x = min((h.x0 for h in heads), default=1e9)
        time_sig = sorted([g for g in mine if g.code in TIMESIG], key=lambda g: g.y)
        # le alterazioni prima della prima nota e prima dell'indicazione di tempo sono l'armatura
        key_limit = min([g.x0 for g in time_sig] + [min_head_x - 14])
        keyacc = [g for g in mine if g.code in (0xE262, 0xE260) and first_clef and first_clef.x1 < g.x0 < key_limit]
        nsharp = sum(1 for g in keyacc if g.code == 0xE262)
        nflat = sum(1 for g in keyacc if g.code == 0xE260)
        keysig = {}
        for c in SHARP_ORDER[:nsharp]:
            keysig[c] = 1
        for c in FLAT_ORDER[:nflat]:
            keysig[c] = -1

        def clef_at(x):
            c = None
            for g in clefs:
                if g.x0 < x:
                    c = g
            return c or first_clef

        def pitch_of(y, x):
            c = clef_at(x)
            if c.code in (0xE050, 0xE07A):  # Sol: origine sulla riga del Sol4
                base = 4 + 7 * 4
            else:  # Fa: origine sulla riga del Fa3
                base = 3 + 7 * 3
            return base + round((c.y - y) / (sp / 2))

        accs = [g for g in mine if g.code in ACCG and g not in keyacc]
        dots = [g for g in mine if g.code == 0xE1E7]
        flags = [g for g in mine if g.code in FLAGS]
        rests = [g for g in mine if g.code in RESTG]
        # gambi delle teste
        hinfo = []
        for h in heads:
            st_ = None
            for x, y0, y1 in stems:
                if y0 - 1 <= h.y <= y1 + 1:
                    if abs(x - h.x1) < 1.3:
                        st_ = ("up", x, y0, y1)
                    elif abs(x - h.x0) < 1.3:
                        st_ = ("down", x, y0, y1)
                    if st_:
                        break
            hinfo.append((h, st_))
        # raggruppa per gambo (accordi); le semibrevi per posizione
        groups = {}
        for h, s in hinfo:
            k = ("s", round(s[1], 1)) if s else ("w", round(h.xc))
            if not s:
                for kk in groups:
                    if kk[0] == "w" and abs(kk[1] - h.xc) < 9.5:
                        k = kk
                        break
            groups.setdefault(k, []).append((h, s))
        events = []
        for k, hs in groups.items():
            h0, s = hs[0]
            g = h0.code
            if g == 0xE0A2:
                dur = F(16)
            elif g == 0xE0A3:
                dur = F(8)
            else:
                nb = 0
                if s:
                    _, sx, sy0, sy1 = s
                    for r, pts in beams:
                        if r.x0 - 0.6 <= sx <= r.x1 + 0.6:
                            span = poly_span(pts, min(max(sx, r.x0 + 0.01), r.x1 - 0.01))
                            if span and span[1] >= sy0 - 0.8 and span[0] <= sy1 + 0.8:
                                nb += 1
                    for fl in flags:
                        if abs(fl.x0 - sx) < 2 and (abs(fl.y - sy0) < 2 * sp or abs(fl.y - sy1) < 2 * sp):
                            nb = max(nb, FLAGS[fl.code])
                dur = F(4, 2 ** nb)
            # punto di valore
            ndots = 0
            for h, _ in hs:
                for dt in dots:
                    if 0 < dt.x0 - h.x1 < 2.5 * sp and abs(dt.y - h.y) < sp * 0.75:
                        ndots = 1
            if ndots:
                dur = dur * F(3, 2)
            if s and s[0] == "up":
                x = s[1] - (h0.x1 - h0.x0)
            elif s:
                x = s[1]
            else:
                x = min(h.x0 for h, _ in hs)
            hd = [{"y": h.y, "x0": h.x0, "x1": h.x1, "step": pitch_of(h.y, h.xc)} for h, _ in hs]
            events.append(Event(hd, dur, x, s[0] if s else None))
        for r in rests:
            ev = Event([], F(RESTG[r.code]), r.x0, None, "rest")
            ev.measure_rest = r.code == 0xE4E3
            events.append(ev)
        events.sort(key=lambda e: e.x)
        # alterazioni (armatura + accidenti che valgono fino alla stanghetta)
        cur = {}
        last_bar = -1
        for e in events:
            bi = sum(1 for b in bars if b < e.x)
            if bi != last_bar:
                cur, last_bar = {}, bi
            for h in e.heads:
                stp = h["step"]
                letter = LET[stp % 7]
                octv = stp // 7
                a = None
                for ag in accs:
                    if 0 < h["x0"] - ag.x1 < 2.6 * sp and abs(ag.y - h["y"]) < sp * 0.4:
                        a = ACCG[ag.code]
                if a is not None:
                    cur[(letter, octv)] = a
                alt = cur.get((letter, octv), keysig.get(letter, 0))
                h["alt"] = alt
                h["midi"] = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}[letter] + alt + 12 * (octv + 1)
                h["name"] = letter + {-2: "bb", -1: "b", 0: "", 1: "#", 2: "##"}[alt] + str(octv)
        out["staff"].append({"events": events, "keysig": (nsharp, nflat), "time": [TIMESIG[g.code] for g in time_sig], "grace": len(grace)})
    # diteggiature (Edwin-Roman, cifre)
    fdig = [t for t in texts if t[0] == "Edwin-Roman" and t[2].isdigit() and top < t[4] < bot]
    for t in fdig:
        _, _, c, x, y, yt, yb = t
        si = staff_of(y)
        # candidati: teste con x vicino
        best = None
        for e in out["staff"][si]["events"]:
            for h in e.heads:
                dx = abs((h["x0"] + h["x1"]) / 2 - x)
                if dx < 5:
                    if best is None or dx < best[0]:
                        best = (dx, e)
        if best:
            best[1].__dict__.setdefault("fdig", []).append((y, int(c)))
    for s in out["staff"]:
        for e in s["events"]:
            fd = getattr(e, "fdig", [])
            if not fd:
                continue
            fd.sort()  # dall'alto in basso
            hs = sorted(e.heads, key=lambda h: -h["midi"])  # dalla nota più alta
            if len(fd) == len(hs):
                for h, (_, f) in zip(hs, fd):
                    h["finger"] = f
            elif len(hs) == 1:
                hs[0]["finger"] = fd[0][1]
            else:
                # meno cifre che note: la cifra va alla nota più vicina in verticale
                for y, f in fd:
                    h = min(hs, key=lambda h: abs(h["y"] - y))
                    h.setdefault("finger", f)
    # terzine (Edwin-Italic «3» di dimensione 10)
    tup = [t for t in texts if t[0] == "Edwin-Italic" and t[2] == "3" and t[1] > 9 and top < t[4] < bot]
    for t in tup:
        x, y = t[3], t[4]
        best = None
        for si in (0, 1):
            evs = [e for e in out["staff"][si]["events"] if e.kind == "note" or True]
            for i in range(len(evs) - 2):
                trio = evs[i : i + 3]
                if any(e.tuplet for e in trio):
                    continue
                cx = (trio[0].x + trio[2].x) / 2 + 3.5
                d = abs(cx - x)
                # il «3» sta sopra o sotto il gruppo, non lontano in verticale
                ys = [h["y"] for e in trio for h in e.heads] or [y]
                if min(abs(y - yy) for yy in ys) > 7 * sp:
                    continue
                if best is None or d < best[0]:
                    best = (d, trio)
        if best and best[0] < 3 * sp:
            for e in best[1]:
                e.tuplet = (3, 2)
                e.dur = e.dur * F(2, 3)
    # legature di valore (curve tra due teste della stessa altezza, vicine)
    ties = []
    for r in curves:
        if r.width > 60 or r.height > 2.2 * sp:
            continue
        for si in (0, 1):
            evs = out["staff"][si]["events"]
            A = [(e, h) for e in evs for h in e.heads if abs(h["x1"] - r.x0) < 4 and abs(h["y"] - (r.y0 + r.y1) / 2) < 1.6 * sp]
            B = [(e, h) for e in evs for h in e.heads if abs(h["x0"] - r.x1) < 4 and abs(h["y"] - (r.y0 + r.y1) / 2) < 1.6 * sp]
            for ea, ha in A:
                for eb, hb in B:
                    if ea is not eb and ha["midi"] == hb["midi"] and eb.x > ea.x:
                        ties.append((si, ea, eb, ha["midi"]))
            # legatura verso il sistema successivo (fine rigo)
            if not B and A and r.x1 > staves[si]["x1"] - 6:
                for ea, ha in A:
                    ha["tie_out"] = True
            if not A and B and r.x0 < staves[si]["x0"] + 40:
                for eb, hb in B:
                    hb["tie_in"] = True
    for si, ea, eb, midi in ties:
        eb.tie_from_prev.add(midi)
    return out


def split_measures(sysdata):
    """divide gli eventi del sistema in battute secondo le stanghette e calcola gli attacchi"""
    bars = sysdata["bars"]
    meas = []
    edges = bars
    for i in range(len(edges) - 1):
        a, b = edges[i], edges[i + 1]
        m = []
        for si in (0, 1):
            m.append([e for e in sysdata["staff"][si]["events"] if a < e.x < b])
        if not m[0] and not m[1] and b - a < 15:
            continue  # doppia stanghetta finale
        meas.append(m)
    return meas


def onsets(measure_events, full):
    """attacchi: ogni voce è continua, quindi il prossimo attacco è la fine più vicina degli eventi in corso.
    Le due mani sono allineate per posizione orizzontale."""
    for st in measure_events:
        for e in st:
            if getattr(e, "measure_rest", False):
                e.onset, e.dur = F(0), full
    evs = sorted([e for st in measure_events for e in st if not getattr(e, "measure_rest", False)], key=lambda e: e.x)
    if not evs:
        return F(0), True
    # colonne: eventi con la stessa x (tolleranza)
    cols = []
    for e in evs:
        tol = 4.5 if e.kind == "rest" or e.stem is None else 2.2
        for c in cols:
            if abs(c["x"] - e.x) < tol:
                c["ev"].append(e)
                break
        else:
            cols.append({"x": e.x, "ev": [e]})
    cols.sort(key=lambda c: c["x"])
    t = F(0)
    active = []
    for c in cols:
        if active:
            ends = [a.onset + a.dur for a in active if a.onset + a.dur > t]
            t = min(ends) if ends else t
        for e in c["ev"]:
            e.onset = t
        active = [a for a in active if a.onset + a.dur > t] + c["ev"]
    total = max(a.onset + a.dur for a in active)
    return total, total == full or (total < full and all(getattr(e, "measure_rest", False) for st in measure_events for e in st if e.onset is None))
