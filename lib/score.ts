// Modello dei brani e costruzione delle note da suonare.
//
// Notazione delle battute: "NOTA:durata" con durata in sedicesimi (1 semicroma, 2 croma,
// 4 semiminima, 6 semiminima puntata, 8 minima, 12 minima puntata, 16 semibreve).
// Più note insieme: "G2+C4". Pausa: "r:4". Ogni battuta deve sommare 16 (4/4).
// Nella mano sinistra la durata predefinita è la croma.

export type Hand = "R" | "L";

export interface ScoreNote {
  midi: number;
  start: number; // in sedicesimi dall'inizio della parte
  dur: number; // in sedicesimi
  hand: Hand;
  measure: number; // indice battuta (0-based)
  label: string; // nota scritta nella tonalità scelta, es. "F#5"
  finger?: number; // diteggiatura (1 = pollice … 5 = mignolo)
}

export interface ScoreRest {
  start: number;
  dur: number;
  hand: Hand;
  measure: number;
}

export interface Measure {
  /** accordi della battuta, distribuiti in parti uguali (1 = tutta la battuta, 2 = mezza ciascuno) */
  chords: string[];
  rh: string;
  lh: string;
  /** diteggiatura della mano destra: un numero per ogni nota o accordo di `rh` (pause escluse) */
  rf?: string;
  /** diteggiatura della mano sinistra; se manca si usa `Song.lhPattern` */
  lf?: string;
}

export interface VideoDef {
  label: string;
  /** percorso in /public, es. "/videos/…mp4" */
  src: string;
  /** secondo del video in cui cade ogni movimento (4 per battuta), dalla battuta 1 alla fine */
  beats: number[];
}

export interface Part {
  id: number;
  title: string;
  subtitle: string;
  focus: string;
  tips: string[];
  tempo: number; // BPM suggeriti (semiminima)
  measures: Measure[];
  /** la prima battuta è un levare: si chiama "Levare" e le altre si numerano da 1 */
  pickup?: boolean;
  /** numero della prima battuta (default 1): per numerare le battute di seguito nel brano */
  firstMeasure?: number;
  videos?: VideoDef[];
}

export interface Arranger {
  name: string;
  fullName?: string;
  handle: string;
  about?: string;
  /** pagina con tutti i suoi video */
  videosUrl: string;
  /** ha dato il permesso di usare video e arrangiamenti nell'app */
  permission?: boolean;
  links: { label: string; url: string }[];
}

export interface Song {
  slug: string;
  title: string;
  /** il titolo mostra la tonalità ("Canone in Do") */
  titleWithKey?: boolean;
  composer: string;
  credit: string;
  /** autore dell'arrangiamento e dei video, mostrato con i suoi link */
  arranger?: Arranger;
  /** maggiore o minore: cambia solo il nome mostrato della tonalità */
  mode: "major" | "minor";
  /** tonalità (maggiore relativa) in cui sono registrati i video */
  videoKey: string;
  /** tonalità (maggiore relativa) in cui sono scritte le note dei dati (default "C") */
  baseKey?: string;
  progression: string[];
  progressionLabel?: string;
  /** diteggiatura ciclica della sinistra quando la battuta non ha `lf` */
  lhPattern?: number[];
  /** movimenti (semiminime) per battuta: 4 = 4/4 (default), 3 = 3/4 */
  beats?: number;
  fullTips: string[];
  parts: Part[];
}

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

/** trasposizione da applicare ai dati (scritti in `baseId`) per arrivare alla tonalità `target` */
export function relativeKey(baseId: string, target: KeyDef): KeyDef {
  const base = KEYS.find((k) => k.id === baseId) ?? KEYS[0];
  let shift = target.shift - base.shift;
  let semis = target.semis - base.semis;
  if (semis > 6) {
    semis -= 12;
    shift -= 7;
  } else if (semis < -6) {
    semis += 12;
    shift += 7;
  }
  return { id: target.id, shift, semis, spelling: target.spelling };
}

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
  const m = /^([A-G](?:##|#|bb|b)?)([^/]*)(?:\/([A-G](?:##|#|bb|b)?))?$/.exec(ch);
  if (!m) return ch;
  // traspone una nota senza ottava (con alterazione) mantenendo la grafia diatonica
  const tr = (n: string) => {
    const l = LETTERS.indexOf(n[0]);
    const nl = (((l + key.shift) % 7) + 7) % 7;
    const alt = n.slice(1);
    const src = STEP[n[0]] + (alt.startsWith("#") ? alt.length : -alt.length);
    let acc = (((src + key.semis - STEP[LETTERS[nl]]) % 12) + 12) % 12;
    if (acc > 6) acc -= 12;
    return LETTERS[nl] + ACC_STR[acc];
  };
  return tr(m[1]) + m[2] + (m[3] ? "/" + tr(m[3]) : "");
}

export function noteToMidi(n: string): number {
  const m = /^([A-G])(##|#|bb|b)?(-?\d)$/.exec(n);
  if (!m) throw new Error("Nota non valida: " + n);
  let v = STEP[m[1]] + (m[3] ? (parseInt(m[3]) + 1) * 12 : 0);
  if (m[2]) v += m[2].startsWith("#") ? m[2].length : -m[2].length;
  return v;
}


function parseVoice(
  src: string,
  hand: Hand,
  measure: number,
  offset: number,
  defDur: number,
  fingers: number[][] | null,
  pattern: number[] | undefined,
  key: KeyDef,
  rests: ScoreRest[],
  mlen = 16
): ScoreNote[] {
  const out: ScoreNote[] = [];
  let t = offset;
  let k = 0; // indice tra le note (pause escluse)
  for (const tok of src.trim().split(/\s+/)) {
    const [pitches, d] = tok.split(":");
    const dur = d ? parseInt(d) : defDur;
    if (pitches === "r") {
      rests.push({ start: t, dur, hand, measure });
      t += dur;
      continue;
    }
    // un dito per nota; negli accordi le dita si separano con "/" (es. "5/3/1" per Mi+Sol#+Si)
    const fs = fingers ? fingers[k] ?? [] : pattern ? [pattern[k % pattern.length]] : [];
    pitches.split("+").forEach((p, j) => {
      const label = transposeSpelled(p, key);
      // senza dita per l'accordo: nella sinistra la nota acuta va al pollice
      const f = fs[j] ?? (j > 0 && hand === "L" && fs.length < 2 ? 1 : undefined);
      out.push({ midi: noteToMidi(label), start: t, dur, hand, measure, label, finger: f || undefined });
    });
    t += dur;
    k++;
  }
  if (fingers && fingers.length !== k) {
    console.warn(`Battuta ${measure + 1} (${hand}): ${k} note ma ${fingers.length} diteggiature`);
  }
  if (t - offset !== mlen) {
    console.warn(`Battuta ${measure + 1} (${hand}) dura ${t - offset} sedicesimi`);
  }
  return out;
}

const nums = (s?: string) => (s ? s.trim().split(/\s+/).map((t) => t.split("/").map(Number)) : null);

export interface BuiltPart {
  part: Part;
  notes: ScoreNote[];
  rests: ScoreRest[];
  length: number; // sedicesimi
  minMidi: number;
  maxMidi: number;
  key: KeyDef;
  /** battuta in cui inizia ciascuna parte (nel brano completo; altrimenti [0]) */
  partStarts: number[];
  /** durata di una battuta in sedicesimi (16 in 4/4, 12 in 3/4) */
  mlen: number;
  /** nome di ogni battuta da mostrare ("Levare", "1", "2", …) */
  labels: string[];
  /** battute vere (levare escluso) */
  measureCount: number;
}

const measureLabels = (p: Part) => {
  const first = p.firstMeasure ?? 1;
  return p.measures.map((_, i) => (p.pickup ? (i === 0 ? "Levare" : String(i + first - 1)) : String(i + first)));
};

export function buildPart(
  song: Song,
  source: Part,
  key: KeyDef = KEYS[0],
  partStarts: number[] = [0],
  labels: string[] = measureLabels(source)
): BuiltPart {
  // accordi trasposti nella tonalità scelta
  const part: Part = {
    ...source,
    measures: source.measures.map((m) => ({ ...m, chords: m.chords.map((c) => transposeChord(c, key)) })),
  };
  const notes: ScoreNote[] = [];
  const rests: ScoreRest[] = [];
  const mlen = (song.beats ?? 4) * 4;
  source.measures.forEach((m, i) => {
    notes.push(...parseVoice(m.rh, "R", i, i * mlen, 4, nums(m.rf), undefined, key, rests, mlen));
    notes.push(...parseVoice(m.lh, "L", i, i * mlen, 2, nums(m.lf), song.lhPattern, key, rests, mlen));
  });
  notes.sort((a, b) => a.start - b.start || a.midi - b.midi);
  const midis = notes.map((n) => n.midi);
  return {
    part,
    notes,
    rests,
    length: part.measures.length * mlen,
    mlen,
    minMidi: Math.min(...midis),
    maxMidi: Math.max(...midis),
    key,
    partStarts,
    labels,
    measureCount: labels.filter((l) => l !== "Levare").length,
  };
}

/** Brano completo: tutte le parti in sequenza */
export function buildFull(song: Song, key: KeyDef = KEYS[0]): BuiltPart {
  const starts: number[] = [];
  let acc = 0;
  for (const p of song.parts) {
    starts.push(acc);
    acc += p.measures.length;
  }
  const all: Part = {
    id: 0,
    title: "Brano completo",
    subtitle: `Le ${song.parts.length} parti di seguito`,
    focus: `${acc} battute`,
    tempo: Math.round(song.parts.reduce((a, p) => a + p.tempo, 0) / song.parts.length),
    tips: song.fullTips,
    measures: song.parts.flatMap((p) => p.measures),
  };
  return buildPart(song, all, key, starts, song.parts.flatMap(measureLabels));
}

/** nome della tonalità per il menu: maggiore, oppure la relativa minore */
const RELATIVE_MINOR: Record<string, string> = {
  C: "A", Db: "Bb", D: "B", Eb: "C", E: "C#", F: "D", "F#": "D#", G: "E", Ab: "F", A: "F#", Bb: "G", B: "G#",
};
export function keyTonic(song: Song, keyId: string) {
  return song.mode === "minor" ? RELATIVE_MINOR[keyId] : keyId;
}

/** titolo mostrato: "Canone in Do", "Preludio in Mi minore" (nei nomi italiani, tonalità dei dati se non indicata) */
export function songTitle(song: Song, keyName: (tonic: string) => string, keyId = song.baseKey ?? "C") {
  if (!song.titleWithKey) return song.title;
  return `${song.title} in ${keyName(keyTonic(song, keyId))}${song.mode === "minor" ? " minore" : ""}`;
}
