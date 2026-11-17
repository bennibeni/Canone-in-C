// Canone in Re di Pachelbel, arrangiamento in Do (Reeves Wong) — trascrizione dai 4 video.
// Notazione: "NOTA:durata" con durata in sedicesimi (2 = croma, 4 = semiminima,
// 6 = semiminima puntata, 8 = minima). Più note insieme: "G2+C4".
// Mano sinistra: se la durata manca vale 2 (croma).

export type Hand = "R" | "L";

export interface ScoreNote {
  midi: number;
  start: number; // in sedicesimi dall'inizio della parte
  dur: number; // in sedicesimi
  hand: Hand;
  measure: number; // indice battuta (0-based)
  label: string; // nota scritta nella tonalità scelta, es. "F#5"
  finger?: number; // diteggiatura suggerita (1 = pollice … 5 = mignolo)
}

export interface Measure {
  chords: [string, string];
  rh: string;
  lh: string;
  /** diteggiatura della mano destra, un numero per ogni nota di `rh` */
  rf?: string;
}

export interface Part {
  id: number;
  title: string;
  subtitle: string;
  focus: string;
  tips: string[];
  tempo: number; // BPM suggeriti (semiminima)
  measures: Measure[];
}

const LH = {
  C_G: "C3 G3 C4 G3 G2 D3 G3 D3",
  Am_Em: "A2 E3 A3 E3 E2 B2 E3 B2",
  F_C: "F2 C3 F3 C3 C3 G3 C4 G3",
  F_C_low: "F2 C3 F3 C3 C2 G2+C4 C3 G2",
  F_C_low2: "F2 C3 F3 C3 C2 G2 C3 G2",
  F_G: "F2 C3 F3 C3 G2 D3 G3 D3",
  Dm_G: "D2 A2 D3 A2 G2 D3 G3 D3",
};

// Parte 1 — arpeggi aperti nella sinistra (10a), minime nella destra
const P1_LH = {
  C_G: "C3 G3 C4 E4 G2 D3 G3 B3",
  Am_Em: "A2 E3 A3 C4 E2 B2 E3 G3",
  F_C: "F2 C3 F3 A3 C3 G3 C4 E4",
  F_G: "F2 C3 F3 A3 G2 D3 G3 B3",
};

export const PARTS: Part[] = [
  {
    id: 1,
    title: "Parte 1",
    subtitle: "Il basso del Canone",
    focus: "Minime nella destra, arpeggi a crome nella sinistra",
    tempo: 72,
    tips: [
      "La progressione è sempre la stessa: Do – Sol – Lam – Mim – Fa – Do – Fa – Sol. Due accordi per battuta.",
      "Sinistra: ogni accordo è un arpeggio di 4 crome (fondamentale, quinta, ottava, decima). Imparala da sola finché non va in automatico.",
      "Destra: una nota lunga (minima) per accordo, che scende per gradi: Mi Re Do Si La Sol La Si.",
      "Al secondo giro la melodia riparte una terza sotto: Do Si La Sol Fa Mi Fa Sol.",
    ],
    measures: [
      { chords: ["C", "G"], rh: "E6:8 D6:8", rf: "5 4", lh: P1_LH.C_G },
      { chords: ["Am", "Em"], rh: "C6:8 B5:8", rf: "3 2", lh: P1_LH.Am_Em },
      { chords: ["F", "C"], rh: "A5:8 G5:8", rf: "3 2", lh: P1_LH.F_C },
      { chords: ["F", "G"], rh: "A5:8 B5:8", rf: "3 4", lh: P1_LH.F_G },
      { chords: ["C", "G"], rh: "C6:8 B5:8", rf: "5 4", lh: P1_LH.C_G },
      { chords: ["Am", "Em"], rh: "A5:8 G5:8", rf: "3 2", lh: P1_LH.Am_Em },
      { chords: ["F", "C"], rh: "F5:8 E5:8", rf: "2 1", lh: P1_LH.F_C },
      { chords: ["F", "G"], rh: "F5:8 G5:8", rf: "2 3", lh: P1_LH.F_G },
    ],
  },
  {
    id: 2,
    title: "Parte 2",
    subtitle: "La melodia a crome",
    focus: "Crome nella destra, poi semiminime",
    tempo: 72,
    tips: [
      "La sinistra cambia schema: fondamentale – quinta – ottava – quinta, sempre a crome.",
      "Battute 1–4: la destra suona crome con salti d'ottava (Do6 → Do5). Guarda prima la forma della mano, poi le note.",
      "Battute 5–8: semiminime, una ogni movimento. È il momento per curare il legato.",
      "Nell'ultima battuta compare il Re minore (Dm): la sinistra scende fino al Re2.",
    ],
    measures: [
      { chords: ["C", "G"], rh: "C6:2 B5:2 C6:2 C5:2 B4:2 G5:2 D5:2 E5:2", rf: "5 4 5 2 1 5 2 3", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "C5:2 C6:2 B5:2 A5:2 B5:2 E6:2 G6:2 A6:2", rf: "1 5 4 3 1 2 4 5", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "F6:2 E6:2 D6:2 F6:2 E6:2 D6:2 C6:2 B5:2", rf: "5 4 3 5 4 3 2 1", lh: LH.F_C },
      { chords: ["F", "G"], rh: "A5:2 G5:2 F5:2 E5:2 D5:2 F5:2 E5:2 D5:2", rf: "3 2 1 3 2 4 3 2", lh: LH.F_G },
      { chords: ["C", "G"], rh: "C5:4 C6:4 G5:4 B5:4", rf: "1 5 2 4", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:4 A5:4 D5:4 G5:4", rf: "1 4 1 4", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "A4:4 F5:4 E5:4 G5:4", rf: "1 4 3 5", lh: LH.F_C },
      { chords: ["Dm", "G"], rh: "D5:4 C6:4 G5:4 B5:4", rf: "1 5 2 4", lh: LH.Dm_G },
    ],
  },
  {
    id: 3,
    title: "Parte 3",
    subtitle: "Le semicrome",
    focus: "Croma + due semicrome e scale veloci",
    tempo: 66,
    tips: [
      "Ritmo base della destra: croma + due semicrome («taaa-ti-ti»). Contalo ad alta voce prima di suonare.",
      "Le scale a semicrome (Sol4 → Sol5) vanno diteggiate con il passaggio del pollice: provale lente, a mani separate.",
      "Battuta 3: attenzione alla sincope semicroma – croma – semicroma (Mi Re · Re).",
      "Le battute 5–8 ripetono esattamente le battute 1–4.",
    ],
    measures: [
      { chords: ["C", "G"], rh: "G5:2 E5:1 F5:1 G5:2 E5:1 F5:1 G5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1", rf: "4 2 3 4 2 3 4 1 2 3 1 2 3 4", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:2 C5:1 D5:1 E5:2 E4:1 F4:1 G4:1 A4:1 G4:1 F4:1 G4:1 E4:1 F4:1 G4:1", rf: "3 1 2 3 1 2 3 4 3 2 3 1 2 3", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "F4:2 A4:1 G4:1 F4:2 E4:1 D4:1 E4:1 D4:2 D4:1 E4:1 F4:1 G4:1 A4:1", rf: "3 5 4 3 2 1 2 1 1 2 3 4 5", lh: LH.F_C_low },
      { chords: ["F", "G"], rh: "F4:2 A4:1 G4:1 A4:2 B4:1 C5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1 G5:1", rf: "1 3 2 3 4 5 1 2 3 1 2 3 4 5", lh: LH.F_G },
      { chords: ["C", "G"], rh: "G5:2 E5:1 F5:1 G5:2 E5:1 F5:1 G5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1", rf: "4 2 3 4 2 3 4 1 2 3 1 2 3 4", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:2 C5:1 D5:1 E5:2 E4:1 F4:1 G4:1 A4:1 G4:1 F4:1 G4:1 E4:1 F4:1 G4:1", rf: "3 1 2 3 1 2 3 4 3 2 3 1 2 3", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "F4:2 A4:1 G4:1 F4:2 E4:1 D4:1 E4:1 D4:2 D4:1 E4:1 F4:1 G4:1 A4:1", rf: "3 5 4 3 2 1 2 1 1 2 3 4 5", lh: LH.F_C_low },
      { chords: ["F", "G"], rh: "F4:2 A4:1 G4:1 A4:2 B4:1 C5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1 G5:1", rf: "1 3 2 3 4 5 1 2 3 1 2 3 4 5", lh: LH.F_G },
    ],
  },
  {
    id: 4,
    title: "Parte 4",
    subtitle: "Il ritmo puntato",
    focus: "Semiminima puntata + croma, il Si bemolle",
    tempo: 72,
    tips: [
      "Ritmo chiave: semiminima puntata + croma («taaa–a-ti»). La nota puntata dura tre crome della sinistra.",
      "Battuta 4 e 8: compare il Si♭ (tasto nero). Nella battuta 8 il Si♭ si risolve sul Si naturale.",
      "La sinistra torna allo schema della Parte 2, con il Do grave (Do2) sull'accordo di Do.",
      "Battute 5–8: la melodia riparte dal Sol5, una terza sopra. Nella battuta 7 c'è il salto Do5 → La5, nella 8 si sale fino al Do6.",
    ],
    measures: [
      { chords: ["C", "G"], rh: "E5:6 E5:2 E5:2 F5:2 E5:2 D5:2", rf: "3 3 3 4 3 2", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "C5:6 C5:2 C5:2 D5:2 C5:2 B4:2", rf: "2 2 2 3 2 1", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "A4:6 A4:2 G4:6 G4:2", rf: "2 2 1 1", lh: LH.F_C_low2 },
      { chords: ["F", "G"], rh: "C5:2 Bb4:2 A4:2 Bb4:2 G4:8", rf: "4 3 2 3 1", lh: LH.F_G },
      { chords: ["C", "G"], rh: "G5:6 G5:2 G5:2 A5:2 G5:2 F5:2", rf: "3 3 3 4 3 2", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:6 E5:2 E5:2 F5:2 E5:2 D5:2", rf: "3 3 3 4 3 2", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "C5:6 A5:2 G5:8", rf: "1 5 4", lh: LH.F_C_low2 },
      { chords: ["F", "G"], rh: "C6:2 Bb5:2 A5:2 Bb5:2 B5:8", rf: "5 4 3 4 4", lh: LH.F_G },
    ],
  },
];

const STEP: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

// ---- tonalità --------------------------------------------------------------------
// shift = di quante lettere si sposta la nota (C→D = 1), semis = di quanti semitoni.
export interface KeyDef {
  id: string; // tonica in notazione inglese, es. "F#"
  shift: number;
  semis: number;
  spelling: "mixed" | "sharp" | "flat";
}

export const KEYS: KeyDef[] = [
  { id: "C", shift: 0, semis: 0, spelling: "mixed" },
  { id: "Db", shift: 1, semis: 1, spelling: "flat" },
  { id: "D", shift: 1, semis: 2, spelling: "sharp" },
  { id: "Eb", shift: 2, semis: 3, spelling: "flat" },
  { id: "E", shift: 2, semis: 4, spelling: "sharp" },
  { id: "F", shift: 3, semis: 5, spelling: "flat" },
  { id: "F#", shift: 3, semis: 6, spelling: "sharp" },
  { id: "G", shift: -3, semis: -5, spelling: "sharp" },
  { id: "Ab", shift: -2, semis: -4, spelling: "flat" },
  { id: "A", shift: -2, semis: -3, spelling: "sharp" },
  { id: "Bb", shift: -1, semis: -2, spelling: "flat" },
  { id: "B", shift: -1, semis: -1, spelling: "sharp" },
];

const LETTERS = "CDEFGAB";
const ACC_STR: Record<number, string> = { [-2]: "bb", [-1]: "b", 0: "", 1: "#", 2: "##" };

/** Traspone una nota scritta ("Bb4") nella tonalità: ritorna la nuova grafia ("C5") */
export function transposeSpelled(n: string, key: KeyDef): string {
  if (key.semis === 0) return n;
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(n)!;
  const abs = LETTERS.indexOf(m[1]) + 7 * parseInt(m[3]) + key.shift;
  const letter = ((abs % 7) + 7) % 7;
  const oct = Math.floor(abs / 7);
  const target = noteToMidi(n) + key.semis;
  const natural = STEP[LETTERS[letter]] + (oct + 1) * 12;
  return LETTERS[letter] + ACC_STR[target - natural] + oct;
}

/** Traspone il nome di un accordo ("Am" → "F#m" in Re maggiore) */
export function transposeChord(ch: string, key: KeyDef): string {
  if (key.semis === 0) return ch;
  const m = /^([A-G])(.*)$/.exec(ch)!;
  const l = LETTERS.indexOf(m[1]);
  const nl = (((l + key.shift) % 7) + 7) % 7;
  let acc = (STEP[m[1]] + key.semis - STEP[LETTERS[nl]]) % 12;
  if (acc > 6) acc -= 12;
  if (acc < -6) acc += 12;
  return LETTERS[nl] + ACC_STR[acc] + m[2];
}

export function noteToMidi(n: string): number {
  const m = /^([A-G])(##|#|bb|b)?(-?\d)$/.exec(n);
  if (!m) throw new Error("Nota non valida: " + n);
  let v = STEP[m[1]] + (m[3] ? (parseInt(m[3]) + 1) * 12 : 0);
  if (m[2]) v += m[2].startsWith("#") ? m[2].length : -m[2].length;
  return v;
}

// mano sinistra: ogni gruppo di 4 crome (fondamentale, quinta, ottava, quinta/decima) si suona 5-2-1-2
const LH_FINGERS = [5, 2, 1, 2];

function parseVoice(
  src: string,
  hand: Hand,
  measure: number,
  offset: number,
  defDur: number,
  fingers: string | undefined,
  key: KeyDef
): ScoreNote[] {
  const out: ScoreNote[] = [];
  let t = offset;
  const toks = src.trim().split(/\s+/);
  const fl = fingers ? fingers.trim().split(/\s+/).map(Number) : null;
  if (fl && fl.length !== toks.length) {
    console.warn(`Battuta ${measure + 1} (${hand}): ${toks.length} note ma ${fl.length} diteggiature`);
  }
  toks.forEach((tok, i) => {
    const [pitches, d] = tok.split(":");
    const dur = d ? parseInt(d) : defDur;
    const f = hand === "L" ? LH_FINGERS[i % 4] : fl?.[i];
    pitches.split("+").forEach((p, k) => {
      // nelle note doppie della sinistra la nota acuta va al pollice
      const label = transposeSpelled(p, key);
      out.push({ midi: noteToMidi(label), start: t, dur, hand, measure, label, finger: k === 0 ? f : 1 });
    });
    t += dur;
  });
  if (t - offset !== 16) {
    console.warn(`Battuta ${measure + 1} (${hand}) dura ${t - offset} sedicesimi`);
  }
  return out;
}

export interface BuiltPart {
  part: Part;
  notes: ScoreNote[];
  length: number; // sedicesimi
  minMidi: number;
  maxMidi: number;
  key: KeyDef;
}

export function buildPart(source: Part, key: KeyDef = KEYS[0]): BuiltPart {
  // accordi trasposti nella tonalità scelta
  const part: Part = {
    ...source,
    measures: source.measures.map((m) => ({
      ...m,
      chords: [transposeChord(m.chords[0], key), transposeChord(m.chords[1], key)],
    })),
  };
  const notes: ScoreNote[] = [];
  source.measures.forEach((m, i) => {
    notes.push(...parseVoice(m.rh, "R", i, i * 16, 4, m.rf, key));
    notes.push(...parseVoice(m.lh, "L", i, i * 16, 2, undefined, key));
  });
  notes.sort((a, b) => a.start - b.start || a.midi - b.midi);
  const midis = notes.map((n) => n.midi);
  return {
    part,
    notes,
    length: part.measures.length * 16,
    minMidi: Math.min(...midis),
    maxMidi: Math.max(...midis),
    key,
  };
}

// Brano completo: le 4 parti in sequenza
export function buildFull(key: KeyDef = KEYS[0]): BuiltPart {
  const all: Part = {
    id: 0,
    title: "Brano completo",
    subtitle: "Le quattro parti di seguito",
    focus: "32 battute, sempre la stessa progressione",
    tempo: 70,
    tips: [
      "Suona le quattro parti senza fermarti: il passaggio tra una parte e l'altra è il punto più delicato.",
      "Ogni parte inizia con l'accordo della tonica: usa la prima battuta come ancora.",
    ],
    measures: PARTS.flatMap((p) => p.measures),
  };
  return buildPart(all, key);
}
