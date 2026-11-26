// Blues — «Walking The Blues 3». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do. Sinistra: walking bass che sale (Do Mi Sol La) e scende con la settima
// abbassata (Sib La Sol Mi; sul Fa: Mib Re Do La). Destra: accordi di sesta e di settima, accordi di Do che
// oscillano con le blue note (Mib+Solb+Do ↔ Mi+Sol+Do) e, nel secondo giro, una frase in terzine sul Fa.
// Le DITEGGIATURE sono proposte (lo spartito non le indica).
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const BASS: Record<string, { lh: string; lf: string }> = {
  Cup: { lh: "C2:4 E2:4 G2:4 A2:4", lf: "5 3 2 1" },
  Cdown: { lh: "C3:4 A2:4 G2:4 E2:4", lf: "1 2 3 5" },
  Cblue: { lh: "Bb2:4 A2:4 G2:4 E2:4", lf: "1 2 3 5" },
  Cstep: { lh: "C3:4 Bb2:4 A2:4 G2:4", lf: "1 2 3 4" },
  Fup: { lh: "F2:4 A2:4 C3:4 D3:4", lf: "5 3 2 1" },
  Fblue: { lh: "Eb3:4 D3:4 C3:4 A2:4", lf: "1 2 3 5" },
  Gup: { lh: "G2:4 B2:4 D3:4 E3:4", lf: "5 3 2 1" },
};
const m = (chord: Ch, bass: keyof typeof BASS, rh: string, rf: string) => ({ chords: [chord], rh, rf, ...BASS[bass] });

const DO6 = "E4+G4+A4+C5";
const BLU = "Eb4+Gb4+C5"; // Do con le blue note
const DO = "E4+G4+C5";
const oscilla = `${BLU}:4 ${DO}:4 ${BLU}:4 ${DO}:4`;
const fa7 = m("F", "Fblue", "F4+A4+Eb5:8 Eb4+A4+D5:8", "1/2/5 1/3/5");

export const b_walking_the_blues_3: Song = {
  slug: "walking-the-blues-3",
  title: "Walking The Blues 3",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore con le blue note. La sinistra cammina in semiminime per tutto il brano.",
    "Il basso sale Do – Mi – Sol – La (5-3-2-1) e scende passando per la settima abbassata: Sib – La – Sol – Mi sul Do, Mib – Re – Do – La sul Fa (1-2-3-5).",
    "La destra suona accordi: impara le forme (Do6, Fa7, Do con le blue note) come prese della mano, prima di unire le mani.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 88,
      tips: [
        "Battute 1, 3 e 7: Do6 (Mi–Sol–La–Do, dita 1-2-3-5) tenuto per tutta la battuta.",
        "Battute 2 e 4: quattro accordi che oscillano, Mib+Solb+Do e Mi+Sol+Do, con le stesse dita 1-3-5: la mano scivola di un semitono avanti e indietro.",
        "Battute 5–6, sul Fa: Mib–Sol–La–Do, poi Fa–La–Mib e Mib–La–Re.",
        "Battuta 9, sul Sol: seste Sol+Mi, Solb+Mib, Sol+Mi (pollice e 4), poi l'ottava Sol+Sol.",
        "Battute 11–12: dopo l'accordo tenuto, l'ultimo movimento è Mib+Solb+Do, che rilancia il giro.",
      ],
      measures: [
        m("C", "Cup", `${DO6}:16`, "1/2/3/5"),
        m("C", "Cblue", oscilla, "1/3/5 1/3/5 1/3/5 1/3/5"),
        m("C", "Cup", `${DO6}:16`, "1/2/3/5"),
        m("C", "Cblue", oscilla, "1/3/5 1/3/5 1/3/5 1/3/5"),
        m("F", "Fup", "Eb4+G4+A4+C5:16", "1/2/3/5"),
        fa7,
        m("C", "Cdown", `${DO6}:16`, "1/2/3/5"),
        m("C", "Cup", "r:12 Gb4+Eb5:4", "1/4"),
        m("G", "Gup", "G4+E5:4 Gb4+Eb5:4 G4+E5:4 G4+G5:4", "1/4 1/4 1/4 1/5"),
        m("F", "Fup", "F4+A4+Eb5:8 Eb4+A4+D5:8", "1/2/5 1/3/5"),
        m("C", "Cup", `${DO6}:12 ${BLU}:4`, "1/2/3/5 1/3/5"),
        m("C", "Cblue", `${DO}:12 ${BLU}:4`, "1/3/5 1/3/5"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: accordi e una frase in terzine",
      tempo: 88,
      firstMeasure: 13,
      tips: [
        "Battute 13–15 (1–3 della parte): Mi–Sol–Do (1-3-5) e poi l'ottava Sol+Sol (1 e 5), due minime per battuta.",
        "Battuta 16 (4): Do6, Sol+Sol e La; sotto, il basso scende Do – Sib – La – Sol.",
        "Battute 17–18 (5–6), sul Fa: terzine Do – Re – Mib (1-2-3); nella 18 la frase sale al Fa e ridiscende Fa – Mib – Re, Do – La – Do (5-4-3, 2-1-2).",
        "Battute 20–22 (8–10): seste che scivolano, Solb+Mib → Fa+Re → Mi+Do; nella 22 Solb+Mib – Sol+Mi – Solb+Mib – Fa+Re.",
        "Ultime battute: Mi+Do tenuto, poi il Do centrale con il Do grave alla sinistra.",
      ],
      measures: [
        m("C", "Cup", `${DO}:8 G4+G5:8`, "1/3/5 1/5"),
        m("C", "Cblue", `${DO}:8 G4+G5:8`, "1/3/5 1/5"),
        m("C", "Cup", `${DO}:8 G4+G5:8`, "1/3/5 1/5"),
        m("C", "Cstep", `${DO6}:8 G4+G5:4 A4:4`, "1/2/3/5 1/5 2"),
        m("F", "Fup", "[C5 D5 Eb5]:4 [C5 D5 Eb5]:4 C5:8", "1 2 3 1 2 3 1"),
        m("F", "Fblue", "[C5 D5 Eb5]:4 [C5 D5 Eb5]:4 [F5 Eb5 D5]:4 [C5 A4 C5]:4", "1 2 3 1 2 3 5 4 3 2 1 2"),
        m("C", "Cup", `${DO6}:16`, "1/2/3/5"),
        m("C", "Cblue", "Gb4+Eb5:4 F4+D5:4 E4+C5:8", "1/5 1/4 1/3"),
        m("G", "Gup", "Gb4+Eb5:8 F4+D5:8", "1/5 1/4"),
        m("F", "Fblue", "Gb4+Eb5:4 G4+E5:4 Gb4+Eb5:4 F4+D5:4", "1/4 1/5 1/4 1/3"),
        m("C", "Cdown", "E4+C5:16", "1/5"),
        { chords: ["C"], rh: "C4:16", rf: "1", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
