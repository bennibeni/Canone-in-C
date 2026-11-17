export type NameSystem = "it" | "en";
/** cosa scrivere sulle note: nome, numero del dito o niente */
export type LabelMode = "names" | "fingers" | "none";

const EN = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const IT = ["Do", "Do♯", "Re", "Mi♭", "Mi", "Fa", "Fa♯", "Sol", "La♭", "La", "Si♭", "Si"];
const EN_SHARP = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const IT_SHARP = ["Do", "Do♯", "Re", "Re♯", "Mi", "Fa", "Fa♯", "Sol", "Sol♯", "La", "La♯", "Si"];
const EN_FLAT = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
const IT_FLAT = ["Do", "Re♭", "Re", "Mi♭", "Mi", "Fa", "Sol♭", "Sol", "La♭", "La", "Si♭", "Si"];

export type Spelling = "mixed" | "sharp" | "flat";

export const isBlack = (midi: number) => [1, 3, 6, 8, 10].includes(((midi % 12) + 12) % 12);

export function noteName(midi: number, sys: NameSystem, withOctave = false, spelling: Spelling = "mixed") {
  const pc = ((midi % 12) + 12) % 12;
  const table =
    spelling === "sharp"
      ? sys === "it"
        ? IT_SHARP
        : EN_SHARP
      : spelling === "flat"
      ? sys === "it"
        ? IT_FLAT
        : EN_FLAT
      : sys === "it"
      ? IT
      : EN;
  const base = table[pc];
  return withOctave ? `${base}${Math.floor(midi / 12) - 1}` : base;
}

const LETTERS_EN = ["C", "D", "E", "F", "G", "A", "B"];
const LETTERS_IT = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
const ACC: Record<string, string> = { "#": "♯", "##": "𝄪", b: "♭", bb: "𝄫", "": "" };

/** Nome di una nota scritta come "F#5", "Bb4", "C6" (con l'ortografia della tonalità) */
export function spelledName(spelled: string, sys: NameSystem, withOctave = false) {
  const m = /^([A-G])(##|#|bb|b)?(-?\d)$/.exec(spelled);
  if (!m) return spelled;
  const l = LETTERS_EN.indexOf(m[1]);
  const base = (sys === "it" ? LETTERS_IT : LETTERS_EN)[l] + ACC[m[2] ?? ""];
  return withOctave ? base + m[3] : base;
}

/** Accordo scritto come "C", "F#m", "Bb": in italiano "Do", "Fa♯m", "Si♭" */
export function chordName(ch: string, sys: NameSystem) {
  const m = /^([A-G])(##|#|bb|b)?(.*)$/.exec(ch);
  if (!m) return ch;
  const l = LETTERS_EN.indexOf(m[1]);
  return (sys === "it" ? LETTERS_IT : LETTERS_EN)[l] + ACC[m[2] ?? ""] + m[3];
}

export interface KeyGeom {
  midi: number;
  black: boolean;
  x: number; // in unità di tasto bianco
  w: number;
}

/** Geometria della tastiera tra lo, hi (inclusi). Unità: larghezza di un tasto bianco = 1. */
export function keyboardLayout(lo: number, hi: number) {
  const keys: KeyGeom[] = [];
  let white = 0;
  for (let m = lo; m <= hi; m++) {
    if (isBlack(m)) {
      keys.push({ midi: m, black: true, x: white - 0.3, w: 0.6 });
    } else {
      keys.push({ midi: m, black: false, x: white, w: 1 });
      white++;
    }
  }
  return { keys, whiteCount: white };
}

/** Allarga l'intervallo a ottave intere (da un Do a un Si) */
export function rangeFor(min: number, max: number): [number, number] {
  const lo = Math.floor(min / 12) * 12;
  const hi = Math.ceil((max + 1) / 12) * 12 - 1;
  return [lo, hi];
}
