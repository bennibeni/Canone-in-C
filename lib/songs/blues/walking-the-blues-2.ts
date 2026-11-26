// Blues — «Walking The Blues 2». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do. Qui il «walking bass» è alla sinistra: fondamentale – terza – quinta – sesta
// che sale e poi riscende (Do Mi Sol La | Do La Sol Mi), mentre la destra suona accordi lunghi (Do6, Fa7, Sol7)
// e piccoli bicordi sulle blue note che scivolano nell'accordo della battuta dopo.
// Le DITEGGIATURE sono proposte (lo spartito non le indica).
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const BASS: Record<string, { lh: string; lf: string }> = {
  Cup: { lh: "C2:4 E2:4 G2:4 A2:4", lf: "5 3 2 1" },
  Cdown: { lh: "C3:4 A2:4 G2:4 E2:4", lf: "1 2 3 5" },
  Fup: { lh: "F2:4 A2:4 C3:4 D3:4", lf: "5 3 2 1" },
  Fdown: { lh: "F3:4 D3:4 C3:4 A2:4", lf: "1 2 3 5" },
  Gup: { lh: "G2:4 B2:4 D3:4 E3:4", lf: "5 3 2 1" },
};
const m = (chord: Ch, bass: keyof typeof BASS, rh: string, rf?: string) => ({ chords: [chord], rh, ...(rf ? { rf } : {}), ...BASS[bass] });

const DO = "G4+C5+E5:16";
const DO6 = "E4+G4+A4+C5:16";
const FA7 = "F4+A4+Eb5:16";

export const b_walking_the_blues_2: Song = {
  slug: "walking-the-blues-2",
  title: "Walking The Blues 2",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. Questa volta è la sinistra a «camminare»: quattro semiminime per battuta, sempre in movimento.",
    "Il basso sale per una battuta (Do – Mi – Sol – La, dita 5-3-2-1) e scende nella successiva (Do – La – Sol – Mi, dita 1-2-3-5). Sul Fa e sul Sol è la stessa forma spostata.",
    "Impara prima la sinistra da sola finché va in automatico; la destra ha poche note, quasi tutte lunghe.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 88,
      tips: [
        "Battuta 1: l'accordo di Do (Sol–Do–Mi, dita 1-3-5) si tiene per tutta la battuta mentre la sinistra sale.",
        "Battuta 2: sul quarto movimento Mib+Solb (2 e 4), che scivola su Mi+Sol nella battuta 3 (3 e 5, con il Sol col pollice sotto).",
        "Battuta 5, sul Fa: La–Mib–Sol (1-3-5). Battuta 6: Solb+Mib sull'ultimo movimento (1 e 4), che scivola sull'accordo di Do della 7.",
        "Battute 9–11: Sol7 (Fa–Si–Re), Fa7 (Fa–La–Mib), Do6 (Mi–Sol–La–Do, dita 1-2-3-5).",
        "Nelle battute con la pausa alla destra ascolta il basso: è lui che porta avanti il giro.",
      ],
      measures: [
        m("C", "Cup", DO, "1/3/5"),
        m("C", "Cdown", "r:12 Eb5+Gb5:4", "2/4"),
        m("C", "Cup", "G4+E5+G5:16", "1/3/5"),
        m("C", "Cdown", "r:16"),
        m("F", "Fup", "A4+Eb5+G5:16", "1/3/5"),
        m("F", "Fdown", "r:12 Gb4+Eb5:4", "1/4"),
        m("C", "Cup", DO, "1/3/5"),
        m("C", "Cdown", "r:16"),
        m("G", "Gup", "F4+B4+D5:16", "1/3/5"),
        m("F", "Fup", FA7, "1/2/5"),
        m("C", "Cup", DO6, "1/2/3/5"),
        m("C", "Cdown", "r:16"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: più scivolamenti alla destra",
      tempo: 88,
      firstMeasure: 13,
      tips: [
        "Le battute 13–15 sono uguali alle 1–3.",
        "Battuta 16: due minime, Solb+Mib che scivola su Sol+Mi (1/4, poi 1/5).",
        "Battuta 18: dopo la pausa, Do (3) e poi Solb+Mib (1 e 4), che risolve sul Do della 19.",
        "Battuta 19: Mib+Solb sull'ultimo movimento (1 e 3) scivola su Mi+Sol+Do. Battuta 20: Sib+Reb (2 e 4) scivola su Si+Re del Sol7.",
        "Ultime battute: Fa7, Do6 e il Do grave tenuto alla sinistra.",
      ],
      measures: [
        m("C", "Cup", DO, "1/3/5"),
        m("C", "Cdown", "r:12 Eb5+Gb5:4", "2/4"),
        m("C", "Cup", "G4+E5+G5:16", "1/3/5"),
        m("C", "Cdown", "Gb4+Eb5:8 G4+E5:8", "1/4 1/5"),
        m("F", "Fup", FA7, "1/2/5"),
        m("F", "Fdown", "r:8 C5:4 Gb4+Eb5:4", "3 1/4"),
        m("C", "Cup", "G4+C5+E5:12 Eb4+Gb4:4", "1/3/5 1/3"),
        m("C", "Cdown", "E4+G4+C5:12 Bb4+Db5:4", "1/3/5 2/4"),
        m("G", "Gup", "F4+B4+D5:12 C5:4", "1/3/5 4"),
        m("F", "Fdown", FA7, "1/2/5"),
        m("C", "Cdown", DO6, "1/2/3/5"),
        { chords: ["C"], rh: "r:16", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
