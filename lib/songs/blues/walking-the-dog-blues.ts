// Blues — «Walking The Dog Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do. Sinistra: walking bass (sale Do Mi Sol La, scende Sib La Sol Mi).
// Destra: l'accordo che «scivola» dalle blue note (terzina semiminima + croma legata a una minima) e,
// nel primo giro, una risposta in terzine Sol – Sol# – La | Do – Sol – Sol# | La – Do – Sol.
// Nel secondo giro la stessa idea un'ottava sopra, con terzine di bicordi Mib+Solb → Mi+Sol.
// Le legature non sono unite: l'accordo legato è scritto di nuovo. DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const BASS: Record<string, { lh: string; lf: string }> = {
  Cup: { lh: "C2:4 E2:4 G2:4 A2:4", lf: "5 3 2 1" },
  Cblue: { lh: "Bb2:4 A2:4 G2:4 E2:4", lf: "1 2 3 5" },
  Cdown: { lh: "C3:4 A2:4 G2:4 E2:4", lf: "1 2 3 5" },
  Fup: { lh: "F2:4 A2:4 C3:4 D3:4", lf: "5 3 2 1" },
  Fblue: { lh: "Eb3:4 D3:4 C3:4 A2:4", lf: "1 2 3 5" },
  Gup: { lh: "G2:4 B2:4 D3:4 E3:4", lf: "5 3 2 1" },
};
const m = (chord: Ch, bass: keyof typeof BASS, rh: string, rf: string) => ({ chords: [chord], rh, rf, ...BASS[bass] });

/** scivolamento: accordo (semiminima di terzina) → accordo (croma di terzina) legato a una minima, poi pausa */
const slide = (from: string, to: string, fFrom: string, fTo: string) => ({
  rh: `[${from}:2 ${to}:1]:4 ${to}:8 r:4`,
  rf: `${fFrom} ${fTo} ${fTo}`,
});
const DO = slide("Eb4+Gb4", "C4+E4+G4", "2/4", "1/3/5");
const FA = slide("Ab4+C5", "F4+A4+C5", "2/4", "1/3/5");
const FA7 = slide("Ab4+C5", "Eb4+A4+C5", "2/4", "1/3/5");
const SOL = slide("Bb4+Db5", "G4+B4+D5", "2/4", "1/3/5");
const DO_ALTO = slide("Eb5+Gb5+C5", "E5+G5+C5", "2/4/5", "1/3/5"); // un'ottava sopra (accordo Do – Mib – Solb)

/** la risposta in terzine: Sol Sol# La | Do Sol Sol# | La + ultima terzina */
const risposta = (last: string, lastF: string) => ({
  rh: `r:4 [G4 G#4 A4]:4 [C5 G4 G#4]:4 [${last}]:4`,
  rf: `1 2 3 5 1 2 ${lastF}`,
});

const TERZINE_ALTE = "[Eb5+Gb5 E5+G5 E5+G5]:4 " + Array(3).fill("[E5+G5 E5+G5 E5+G5]:4").join(" ");
const TERZINE_F = "2/4 1/3 1/3 " + Array(9).fill("1/3").join(" ");

const DO6 = "E4+G4+A4+C5";

export const b_walking_the_dog_blues: Song = {
  slug: "walking-the-dog-blues",
  title: "Walking The Dog Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore con le blue note. La sinistra cammina in semiminime: sale Do – Mi – Sol – La e scende Sib – La – Sol – Mi.",
    "Il gesto della destra è lo scivolamento: un accordo con le blue note (Mib+Solb sul Do) che scivola di un semitono sull'accordo vero (Do+Mi+Sol), in terzina, e si tiene.",
    "Domanda e risposta: nelle battute dispari l'accordo che scivola, in quelle pari la frase in terzine Sol – Sol# – La.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: accordi che scivolano e risposte in terzine",
      tempo: 84,
      tips: [
        "Battuta 1: Mib+Solb (2 e 4) per una semiminima di terzina, poi Do+Mi+Sol (1-3-5) sulla terza croma della terzina, tenuto fino al terzo movimento.",
        "Battuta 2: la risposta in terzine, Sol – Sol# – La | Do – Sol – Sol# | La – Do – Sol, dita 1-2-3 | 5-1-2 | 3-5-1.",
        "Sul Fa lo stesso gesto: Lab+Do che scivola su Fa+La+Do (battuta 5) o su Mib+La+Do (battuta 10, il Fa7).",
        "Battuta 9, sul Sol: Sib+Reb che scivola su Sol+Si+Re.",
        "Battuta 12: Do+Mib+Solb scivola su Do+Mi+Sol per chiudere il giro.",
      ],
      measures: [
        m("C", "Cup", DO.rh, DO.rf),
        m("C", "Cblue", risposta("A4 C5 G4", "3 5 1").rh, risposta("A4 C5 G4", "3 5 1").rf),
        m("C", "Cup", DO.rh, DO.rf),
        m("C", "Cblue", risposta("A4 C5 G4", "3 5 1").rh, risposta("A4 C5 G4", "3 5 1").rf),
        m("F", "Fup", FA.rh, FA.rf),
        m("F", "Fblue", risposta("G4 E4 C4", "3 2 1").rh, risposta("G4 E4 C4", "3 2 1").rf),
        m("C", "Cup", DO.rh, DO.rf),
        m("C", "Cblue", "r:12 [G4 G#4 A4]:4", "1 2 3"),
        m("G", "Gup", SOL.rh, SOL.rf),
        m("F", "Fup", FA7.rh, FA7.rf),
        m("C", "Cup", DO.rh, DO.rf),
        m("C", "Cblue", "r:4 C4+Eb4+Gb4:4 C4+E4+G4:8", "1/2/4 1/3/5"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: un'ottava sopra, terzine di bicordi",
      tempo: 84,
      firstMeasure: 13,
      tips: [
        "Battute 13 e 15 (1 e 3 della parte): terzine di bicordi un'ottava sopra il Do centrale; il primo, Mib+Solb, scivola subito su Mi+Sol, poi Mi+Sol per tutta la battuta (pollice e 3).",
        "Battute 14 e 16 (2 e 4): Do+Mib+Solb che scivola su Do+Mi+Sol, tenuto.",
        "Battute 17–18 (5–6), sul Fa: Fa7 (Fa–La–Mib) e Fa6 (Fa–La–Re), dita 1-2-5 e 1-2-4.",
        "Battuta 20 (8): Sib+Reb scivola sul Sol7 della battuta dopo (Fa–Si–Re), poi il Do.",
        "Ultime battute: Fa7, Do6 e il Do grave alla sinistra.",
      ],
      measures: [
        m("C", "Cup", TERZINE_ALTE, TERZINE_F),
        m("C", "Cblue", DO_ALTO.rh, DO_ALTO.rf),
        m("C", "Cup", TERZINE_ALTE, TERZINE_F),
        m("C", "Cblue", DO_ALTO.rh, DO_ALTO.rf),
        m("F", "Fup", "F4+A4+Eb5:8 F4+A4+D5:8", "1/2/5 1/2/4"),
        m("F", "Fblue", "r:8 F4+A4+Eb5:4 F4+A4+D5:4", "1/2/5 1/2/4"),
        m("C", "Cup", `${DO6}:16`, "1/2/3/5"),
        m("C", "Cblue", "E4+G4:12 Bb4+Db5:4", "1/3 2/4"),
        m("G", "Gup", "F4+B4+D5:12 C5:4", "1/3/5 4"),
        m("F", "Fup", "F4+A4+Eb5:16", "1/2/5"),
        m("C", "Cdown", `${DO6}:16`, "1/2/3/5"),
        { chords: ["C"], rh: "r:16", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
