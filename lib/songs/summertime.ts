// Summertime (George Gershwin), arrangiamento facile in La minore, «Gently», minima = 50 (semiminima = 100).
// Note e DITEGGIATURE dallo spartito (screenshot); dove manca il dito è proposto.
// La destra ha spesso due voci (melodia sopra, Fa# – Sol# sotto): l'app non tiene una nota sotto l'altra voce,
// quindi la nota lunga di sotto è scritta all'inizio insieme alla melodia; le legature tra battute non sono unite.
import type { Song, Measure } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Measure => ({ chords, rh, rf, lh, lf });

const AE = { lh: "A3+C4:8 B3+D4:8", lf: "4/2 3/1" };
const T = (chords: string[], rh: string, rf: string, l = AE): Measure => ({ chords, rh, rf, ...l });

const melodia = T(["Am6", "E7"], "F#4+E5:4 D5:2 C5:2 G#4+D5:2 E5:2 C5:4", "1/5 4 3 1/4 5 3");
const cAm = M(["C", "Am"], "G4:4 E4:2 G4:2 A4:4 C5:4", "2 1 2 3 5", "G3:8 E3:8", "2 4");
const d7g7 = M(["D7", "G7"], "F#4+E5:4 D5:4 F4+D5:4 C5:4", "1/5 4 1/5 4", "D3:8 G3:8", "4 2");
const discesa = M(["Am"], "A4:4 G4:2 F#4:2 G4:2 A4:2 F#4:4", "3 1 2 3 4 2", "A3:16", "1");

export const summertime: Song = {
  slug: "summertime",
  title: "Summertime",
  composer: "George Gershwin",
  credit: "Arrangiamento facile in La minore, pubblicato con il permesso. Note e diteggiature dallo spartito (dove manca il dito è proposto)",
  collection: "standards",
  mode: "minor",
  videoKey: "C",
  baseKey: "C",
  progression: ["Am6", "E7", "Am6", "E7", "Am", "E7", "Dm", "Em7", "F", "F#°", "E", "B7"],
  progressionLabel: "la prima metà",
  fullTips: [
    "Tonalità: La minore. «Gently», minima = 50: dolce, cullante (è una ninna nanna, dall'opera «Porgy and Bess»).",
    "Sotto la melodia la destra tiene spesso Fa# – Sol# (pollice e indice): è la voce che fa sentire Lam6 – Mi7. Melodia col 4 e il 5, voce interna con 1 e 2.",
    "La sinistra suona bicordi lenti (La+Do, Si+Re) e, verso la fine, note singole del basso.",
  ],
  parts: [
    {
      id: 1,
      title: "Intro",
      subtitle: "Lam6 – Mi7",
      focus: "Battute 1–2",
      tempo: 100,
      tips: [
        "Destra: Fa# (1) e Sol# (2), lunghe e legate. Sinistra: La+Do (4 e 2), Si+Re (3 e 1).",
        "Alla fine della battuta 2 Mi – Do (5 e 3) attaccano la melodia.",
      ],
      measures: [
        T(["Am6", "E7"], "F#4:8 G#4:8", "1 2"),
        T(["Am6", "E7"], "F#4:8 G#4:4 E5:2 C5:2", "1 2 5 3"),
      ],
    },
    {
      id: 2,
      title: "Strofa",
      subtitle: "«Summertime, and the livin' is easy…»",
      focus: "Battute 3–20 (1ª volta)",
      tempo: 100,
      firstMeasure: 3,
      tips: [
        "Battute 1–2 della parte: il Mi in alto (5) è tenuto mentre sotto Fa# e Sol# si alternano (1 e 2).",
        "Battuta 6 (8 nel brano), su Fa e Fa#°: Re+La, poi Do – La – Do sopra il Re# (1).",
        "Battuta 7 (9) «jump»: dal Si (5) salta giù al Si basso (1); poi Mi – Mib – Re e Fa# – Fa (passaggi cromatici del Si7).",
        "Battuta 8 (10): la sinistra fa una piccola melodia Sol# – Mi – Do# – Do – Si – Sib.",
        "Battuta 14 (16): «play with 4th finger, then shift to 5th»: prendi il Re col 4 e scambia col 5 tenendo il tasto.",
        "1ª volta: discesa La – Sol – Fa# – Sol – La – Fa#, poi Do+Mi, e il basso Re – Do – Re – Mi – Do.",
      ],
      measures: [
        T(["Am6", "E7"], "F#4+E5:8 G#4:8", "1/5 2"),
        melodia,
        T(["Am", "E7"], "A4:8 E4:8", "2 1"),
        T(["Am", "E7"], "E4:8 r:4 E5:2 C5:2", "1 5 3", { lh: "A3+C4:8 B3+D4:4 r:4", lf: "4/2 3/1" }),
        M(["Dm", "Em7"], "F4+D5:8 G4:8", "1/5 2", "D3:8 E3:8", "3 2"),
        M(["F", "F#°"], "A4+D5:4 C5:2 A4:2 D#4+C5:2 A4:2 C5:4", "2/5 4 2 1/5 3 5", "F3:8 F#3:8", "1 3"),
        M(["E", "B7"], "B4:2 B3:2 E4:2 Eb4:2 D4:2 B3:2 F#4:2 F4:2", "5 1 3 2 2 1 4 3", "G#3:8 A3:8", "2 1"),
        M(["E"], "E4:8 r:4 E5:2 C5:2", "1 5 3", "G#3:2 E3:2 C#4:2 C4:2 B3:4 Bb3:4", "3 5 2 1 2 3"),
        T(["Am6", "E7"], "F#4+E5:2 E5:2 E5:4 G#4:8", "1/5 5 5 2"),
        melodia,
        T(["Am", "E7"], "A4:8 E4:8", "2 1"),
        M(["Am", "D9"], "E4:12 E4:4", "1 1", "A3+C4:8 F#3+C4:4 r:4", "4/2 5/1"),
        cAm,
        d7g7,
        discesa,
        M(["Am"], "C4+E4:16", "1/2", "r:4 D3:2 C3:2 D3:2 E3:2 C3:4", "2 3 2 1 3"),
        M(["Am6", "E7"], "r:4 C4+F#4:4 r:4 D4+G#4:4", "1/3 1/4", "A2:8 B2:8", "5 4"),
        M(["Am6", "E7"], "r:4 C4+F#4:4 r:2 E5:2 E5:2 C5:2", "1/3 5 5 3", "A2:8 B2:4 r:4", "5 4"),
      ],
    },
    {
      id: 3,
      title: "Strofa ripetuta",
      subtitle: "«One of these mornings…»",
      focus: "La strofa con le seconde parole (battute 3–16)",
      tempo: 100,
      tips: ["Le note sono le stesse della strofa fino alla battuta 16; poi si salta alla 2ª volta."],
      measures: [
        T(["Am6", "E7"], "F#4+E5:8 G#4:8", "1/5 2"),
        melodia,
        T(["Am", "E7"], "A4:8 E4:8", "2 1"),
        T(["Am", "E7"], "E4:8 r:4 E5:2 C5:2", "1 5 3", { lh: "A3+C4:8 B3+D4:4 r:4", lf: "4/2 3/1" }),
        M(["Dm", "Em7"], "F4+D5:8 G4:8", "1/5 2", "D3:8 E3:8", "3 2"),
        M(["F", "F#°"], "A4+D5:4 C5:2 A4:2 D#4+C5:2 A4:2 C5:4", "2/5 4 2 1/5 3 5", "F3:8 F#3:8", "1 3"),
        M(["E", "B7"], "B4:2 B3:2 E4:2 Eb4:2 D4:2 B3:2 F#4:2 F4:2", "5 1 3 2 2 1 4 3", "G#3:8 A3:8", "2 1"),
        M(["E"], "E4:8 r:4 E5:2 C5:2", "1 5 3", "G#3:2 E3:2 C#4:2 C4:2 B3:4 Bb3:4", "3 5 2 1 2 3"),
        T(["Am6", "E7"], "F#4+E5:2 E5:2 E5:4 G#4:8", "1/5 5 5 2"),
        melodia,
        T(["Am", "E7"], "A4:8 E4:8", "2 1"),
        M(["Am", "D9"], "E4:12 E4:4", "1 1", "A3+C4:8 F#3+C4:4 r:4", "4/2 5/1"),
        cAm,
        d7g7,
      ],
    },
    {
      id: 4,
      title: "Finale",
      subtitle: "2ª volta e coda",
      focus: "«…So hush, little baby, don't you cry»",
      tempo: 100,
      tips: [
        "2ª volta: La lungo (3); la sinistra scende La – Sol – Fa# – Fa (Lam – Lam7 – Lam6 – Fa).",
        "Poi di nuovo Do – Lam e Re7 – Sol7, la discesa La – Sol – Fa# e il Do+Mi tenuto (rit.).",
        "Ultima battuta: accordo Do+Mi+Fa# (Lam6) piano, sopra il La grave.",
      ],
      measures: [
        M(["Am", "Am7"], "A4:16", "3", "A3:8 G3:8", "1 2"),
        M(["Am6", "F"], "A4:8 r:8", "3", "F#3:8 F3:8", "1 2"),
        cAm,
        d7g7,
        discesa,
        M(["Am"], "C4+E4:16", "1/2", "r:4 D3:2 C3:2 D3:2 E3:2 C3:4", "2 3 2 1 3"),
        M(["Am6"], "r:4 C4+E4+F#4:8 r:4", "1/2/3", "A2:12 r:4", "5"),
      ],
    },
  ],
};
