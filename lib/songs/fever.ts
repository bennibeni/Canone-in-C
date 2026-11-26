// Fever (John Davenport / Eddie Cooley), arrangiamento facile in La minore, «Bluesy» semiminima = 112.
// Note e DITEGGIATURE dallo spartito (screenshot); dove manca il dito è proposto.
// Le crome puntate + semicrome sono scritte come sono (3 + 1 sedicesimi); le legature tra battute non sono unite;
// le acciaccature (Sol–Sol# nel basso dell'intro, Si–La prima del Sol nella melodia) sono scritte come note brevi.
import type { Song, Measure } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Measure => ({ chords, rh, rf, lh, lf });

const AM = "A3+C4+E4", AMM7 = "G#3+C4+E4", AM7 = "G3+C4+E4", AM6 = "F#3+C4+E4";
const F7 = "F3+A3+Eb4", E7 = "E3+G#3+D4";
const L = (a: string, b: string) => ({ lh: `${a}:8 ${b}:8`, lf: "4/2/1 5/2/1" });
const L73 = (a: string, b: string) => ({ lh: `${a}:8 ${b}:8`, lf: "5/3/1 5/3/1" });
const T = (chords: string[], rh: string, rf: string, l: { lh: string; lf: string }): Measure => ({ chords, rh, rf, ...l });

const dotted = "D5:3 C5:1 D5:3 C5:1";
const fe = (end: string, endF: string) => T(["F7", "E7"], `${dotted} D5:3 C5:1 ${end}`, `3 1 3 1 3 1 ${endF}`, L73(F7, E7));

const intro = (last: boolean) => [
  M(["Am", "Am/G"], "r:4 C4+E4:4 r:4 C4+E4:4", "2/4 2/4", "G2:1 G#2:1 A2:6 G2:8", "3 2 1 1"),
  last
    ? M(["F7", "E7"], "r:4 A3+Eb4:4 r:4 G#3+D4:4", "1/4 1/3", "F2:8 E2:4 r:4", "1 2")
    : M(["F7", "E7"], "r:4 A3+Eb4:4 r:4 G#3+D4:4", "1/4 1/3", "F2:8 E2:8", "1 2"),
];

const strofa = [
  T(["Am", "Am(maj7)"], "r:3 D5:1 [C5 D5 C5]:4 D5:4 A4:2 C5:2", "3 2 3 2 3 1 2", L(AM, AMM7)),
  T(["Am7", "Am6"], "C5:2 D5:10 r:4", "2 3", L(AM7, AM6)),
  T(["Am", "Am(maj7)"], `${dotted} D5:3 C5:1 A4:2 A4:2`, "3 2 3 2 3 2 1 1", L(AM, AMM7)),
  T(["Am7", "Am6"], "A4:12 r:4", "1", L(AM7, AM6)),
  T(["Am", "Am(maj7)"], `${dotted} D5:4 A4:2 C5:2`, "3 2 3 2 3 1 2", L(AM, AMM7)),
  T(["Am7", "Am6"], "C5:2 D5:6 r:3 A4:1 A4:3 A4:1", "2 3 1 1 1", L(AM7, AM6)),
  fe("A4:2 A4:2", "1 1"),
  T(["Am"], "r:3 A4:1 A4:3 A4:1 C5:4 A4:4", "1 1 1 2 1", { lh: `${AM}:4 r:12`, lf: "4/2/1" }),
  T(["Am(maj7)"], "E5:2 A4+A5:14", "3 1/5", L(AM, AMM7)),
  T(["Am7", "Am6"], "r:4 Eb5:3 C5:1 D5:3 C5:1 C5:4", "4 2 3 2 2", L(AM7, AM6)),
  fe("A4:2 A4:2", "1 1"),
  T(["Am"], "r:4 A4:3 B4:1 C5:3 D5:1 E5:4", "1 2 3 4 5", { lh: `${AM}:4 r:12`, lf: "4/2/1" }),
  T(["Am(maj7)"], "G#4+G#5:2 A4+A5:10 D5:3 C5:1", "1/4 1/5 3 2", L(AM, AMM7)),
  T(["Am7", "Am6"], "D5:2 C5:10 r:4", "3 2", L(AM7, AM6)),
  T(["F7", "E7"], "D5:3 C5:1 Eb5:4 D5:3 C5:1 A4:2 A4:2", "3 2 4 3 2 1 1", L73(F7, E7)),
];

export const fever: Song = {
  slug: "fever",
  title: "Fever",
  composer: "Davenport / Cooley",
  credit: "Arrangiamento facile in La minore, pubblicato con il permesso. Note e diteggiature dallo spartito (dove manca il dito è proposto)",
  collection: "standards",
  mode: "minor",
  videoKey: "C",
  baseKey: "C",
  progression: ["Am", "Am(maj7)", "Am7", "Am6", "F7", "E7", "Am"],
  progressionLabel: "il giro della strofa",
  fullTips: [
    "Tonalità: La minore. «Bluesy», semiminima = 112: un ritmo lento e «schioccante» (nell'originale si schioccano le dita sul 2 e sul 4).",
    "La sinistra suona accordi tenuti, due per battuta: La minore con la nota bassa che scende La – Sol# – Sol – Fa#, poi Fa7 – Mi7.",
    "La melodia gira tutta attorno a Re – Do – La con il ritmo puntato (croma puntata + semicroma): lunga-corta, sempre uguale.",
  ],
  parts: [
    {
      id: 1,
      title: "Intro",
      subtitle: "Introduzione",
      focus: "Battute 1–4: La minore – Fa7 – Mi7",
      tempo: 112,
      tips: [
        "Destra: bicordi staccati sul secondo e sul quarto movimento (Do+Mi, La+Mib, Sol#+Re), come lo schiocco delle dita.",
        "Sinistra: Sol – Sol# di slancio verso il La, poi La – Sol – Fa – Mi in minime accentate: il basso che scende.",
      ],
      measures: [...intro(false), ...intro(true)],
    },
    {
      id: 2,
      title: "Strofa",
      subtitle: "«Never know how much I love you…»",
      focus: "Battute 5–20 (1ª volta)",
      tempo: 112,
      firstMeasure: 5,
      tips: [
        "Battuta 1 della parte: dopo la semicroma Re, la terzina Do – Re – Do (2-3-2).",
        "Il ritmo Re. Do Re. Do (3-2-3-2) torna in quasi ogni battuta: tienilo lunga-corta, senza correre.",
        "«Fever!»: Sol#+Sol# all'ottava (1 e 4) che sale a La+La (1 e 5), accentato e tenuto.",
        "Battuta 10 (14 nel brano): Mib, la blue note sopra il La minore.",
        "1ª volta: dopo il La la sinistra sale Mi – Fa – Fa# – Sol# e riporta all'inizio della strofa.",
      ],
      measures: [
        ...strofa,
        T(["Am", "E"], "A4:4 r:12", "1", { lh: `${AM}:4 r:4 E3:3 F3:1 F#3:3 G#3:1`, lf: "4/2/1 5 4 3 2" }),
      ],
    },
    {
      id: 3,
      title: "Strofa ripetuta",
      subtitle: "«Sun lights up the daytime…»",
      focus: "La stessa strofa con le seconde parole",
      tempo: 112,
      tips: ["Le note sono le stesse della strofa: cambiano solo le parole. Alla fine si va alla 2ª volta."],
      measures: strofa,
    },
    {
      id: 4,
      title: "Finale",
      subtitle: "«Everybody's got the fever…»",
      focus: "2ª volta e chiusura",
      tempo: 112,
      tips: [
        "La melodia scende La – Sol con piccole note di passaggio (Si – La prima del Sol): suonale veloci, quasi un'acciaccatura.",
        "Sinistra: accordi di La minore con la nota bassa che si muove (La, Sol, Fa#).",
        "Ultime battute: Re. Do Re. Do sul Fa7 – Mi7 e il La finale, con l'accordo di La minore staccato.",
      ],
      measures: [
        T(["Am", "Am7"], "A4:4 C5:3 A4:1 A4:4 B4:1 A4:1 G4:2", "1 4 2 2 3 2 1", L(AM, AM7)),
        T(["Am6", "Am7"], "r:4 A4:3 G4:1 A4:2 C5:2 C5:4", "2 1 2 3 3", L(AM6, AM7)),
        T(["Am", "Am7"], "r:4 C5:3 A4:1 A4:4 G4:2 A4:2", "4 2 2 1 2", L(AM, AM7)),
        T(["Am6", "Am7"], "A4:4 G4:2 A4:2 A4:8", "2 1 2 2", L(AM6, AM7)),
        T(["Am", "Am7"], "r:4 C5:3 A4:1 A4:4 B4:1 A4:1 G4:2", "4 2 2 3 2 1", L(AM, AM7)),
        T(["Am6"], "r:4 A4:3 G4:1 A4:2 C5:2 C5:4", "2 1 2 3 3", L(AM6, AM6)),
        T(["F7", "E7"], "D5:3 C5:1 D5:3 C5:1 D5:3 C5:1 A4:2 A4:2", "4 2 4 2 4 2 1 1", L73(F7, E7)),
        T(["Am"], "A4:4 r:12", "1", { lh: `${AM}:4 r:12`, lf: "4/2/1" }),
      ],
    },
  ],
};
