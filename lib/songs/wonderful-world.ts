// What a Wonderful World (G. D. Weiss, B. Thiele). Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in Fa maggiore. Pubblicato con il permesso dell'editore.
// Note e DITEGGIATURE dallo spartito; le ripetizioni (ritornello, 1ª e 2ª volta) sono scritte per esteso.
// Alle note ribattute senza dito stampato è dato il dito della prima nota. Dove la sinistra tiene una nota
// lunga sotto altre note, l'app suona una voce sola.
import type { Song } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string) => ({ chords, rh, rf, lh, lf });
const strofa = [
  M(["F"], "F4:16", "1", "F3:4 A3:4 C4:4 A3:4", "5 3 1 3"),
  M(["Am"], "C5:16", "4", "E3:4 A3:4 C4:4 A3:4", "5 2 1 2"),
  M(["Bb"], "r:4 D5:4 F4+D5:4 D5:4", "5 1/5 5", "Bb3:16", "1"),
  M(["Am"], "C5:16", "4", "A3:4 C4:4 E4:4 C4:4", "4 2 1 2"),
  M(["Gm7"], "r:4 Bb4:4 F4+Bb4:4 Bb4:4", "3 1/4 4", "Bb3:8 G3:8", "3 4"),
  M(["F"], "E4+A4:16", "1/3", "F3:4 A3:4 C4:4 A3:4", "5 3 1 3"),
  M(["A7"], "r:4 G4:4 G4:4 G4:4", "2 2 2", "G3+A3+C#4:16", "4/3/1"),
  M(["Dm"], "F4:8 F4:4 F4:4", "1 1 1", "D3:4 F3:4 A3:8", "5 3 1"),
  M(["Db"], "F4:8 F4:4 F4:4", "3 3 3", "Db3+Ab3:16", "5/1"),
  M(["Db", "C"], "F4:16", "3", "Db3:8 C3:8", "3 4"),
  M(["Gm7"], "F4:8 F4:4 F4:4", "3 3 3", "Bb2:16", "5"),
  M(["C7"], "E4:8 F4:4 G4:4", "2 3 4", "C3+Bb3:16", "5/1"),
];
const ponte = (fine: ReturnType<typeof M>) => [
  M(["C7"], "D4+G4:4 G4:4 G4:4 G4:4", "1/4 4 4 4", "C3+Bb3:16", "5/1"),
  M(["C"], "E4+G4:12 C4:4", "2/4 1", "C3:8 E3:8", "5 4"),
  M(["F"], "F4+Bb4:4 A4:4 A4:4 G4:4", "2/5 4 4 3", "F3+C4:16", "3/1"),
  fine,
];

export const wonderfulWorld: Song = {
  slug: "what-a-wonderful-world",
  title: "What a Wonderful World",
  composer: "George David Weiss e Bob Thiele",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "F",
  baseKey: "F",
  progression: ["F", "Am", "Bb", "Am", "Gm7", "F", "A7", "Dm"],
  progressionLabel: "la strofa",
  fullTips: [
    "Il brano è in Fa maggiore: tutti i Si sono bemolle.",
    "Moderato, con espressione: la melodia ha molte note ribattute, suonale tutte con lo stesso dito e con lo stesso peso.",
    "La sinistra spezza l'accordo in quattro semiminime (5-3-1-3): falla scorrere piano sotto la melodia.",
    "Le ripetizioni dello spartito (ritornello, 1ª e 2ª volta) qui sono scritte di seguito.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "La strofa",
      focus: "Levare e battute 1–16: la strofa con la prima volta",
      tempo: 72,
      pickup: true,
      tips: [
        "Levare: Do – Re con 1 e 2, poi il Fa lungo col pollice.",
        "Battuta 3: Re ribattuto col 5; sul secondo Re il Fa sotto, col pollice.",
        "Battute 9–12: Fa ribattuti col 3 sopra il Re♭ della sinistra.",
        "Battute 14–16: la prima volta torna all'inizio con Do – Re.",
      ],
      measures: [
        { chords: [], rh: "r:8 C4:4 D4:4", rf: "1 2", lh: "r:16" },
        ...strofa,
        M(["F", "C/E"], "F4+A4:16", "2/5", "F3:8 E3:8", "2 3"),
        M(["Dm"], "r:4 D4:4 F4:4 G4:4", "1 2 3", "D3:16", "4"),
        M(["Gm7"], "F4+A4:8 Bb4:4 A4:4", "2/4 5 4", "G3:16", "2"),
        M(["C7"], "E4+G4:8 C4:4 D4:4", "1/3 1 2", "C3+Bb3:8 r:8", "5/1"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "La strofa ripetuta",
      focus: "Battute 17–30: la strofa con la seconda volta",
      tempo: 72,
      firstMeasure: 17,
      tips: ["Come la parte 1; la seconda volta chiude sul Fa lungo e prepara il ponte."],
      measures: [
        ...strofa,
        M(["F"], "F4:16", "3", "F3:4 A3:4 C4:4 A3:4", "5 3 1 3"),
        M(["F"], "F4:12 F4:4", "3 3", "F3:12 r:4", "5"),
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Il ponte",
      focus: "Battute 31–46: «The colors of the rainbow…»",
      tempo: 72,
      firstMeasure: 31,
      tips: [
        "mp, dolcemente: Sol ribattuti col 4 sopra il Re (pollice), poi l'accordo Mi – Sol e il Do.",
        "La sinistra suona bicordi tenuti (5 e 1).",
        "Battuta 39: forte, «sentito»: Re acuto col 5 sopra il Fa col pollice.",
        "Battuta 46: Re – Sol, Do – Re per tornare alla strofa.",
      ],
      measures: [
        ...ponte(M(["F", "C/E"], "A4:12 F4:4", "4 2", "F3:8 E3:8", "2 3")),
        ...ponte(M(["F", "C/E"], "A4:8 A4:4 C5:4", "4 2 4", "F3:8 E3:8", "3 4")),
        M(["Dm"], "F4+D5:8 D5:4 D5:4", "1/5 5 5", "D3+A3:16", "5/1"),
        M(["Am"], "E4+C5:8 A4:4 C5:4", "1/4 2 4", "A3:16", "1"),
        M(["Dm"], "F4+D5:4 D5:4 D5:4 D5:4", "1/5 5 5 5", "D3+A3:16", "5/1"),
        M(["Am"], "E4+C5:8 A4:4 C5:4", "1/4 2 4", "A3:16", "1"),
        M(["Dm"], "F4+D5:8 D5:4 D5:4", "1/5 5 5", "D3+A3:16", "5/1"),
        M(["Am", "D7"], "E4+C5:8 A4:8", "1/4 2", "A3:8 F#3:8", "1 3"),
        M(["Gm"], "F4+Bb4:8 A4:8", "2/5 4", "G3:16", "2"),
        M(["C7"], "D4+G4:8 C4:4 D4:4", "1/3 1 2", "C3+Bb3:16", "5/1"),
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "L'ultima strofa e la coda",
      focus: "Battute 47–67: la strofa per l'ultima volta e la coda pianissimo",
      tempo: 72,
      firstMeasure: 47,
      tips: [
        "Battute 59–62: crescendo verso l'accordo di Re con il Fa♯, tenuto per due battute.",
        "Coda: mezzo piano, poi rit. e diminuendo fino all'accordo finale pianissimo.",
      ],
      measures: [
        ...strofa,
        M(["F"], "A4:16", "5", "F3:4 A3:4 C4:4 A3:4", "5 3 1"  + " 3"),
        M(["Eb7"], "G4:16", "4", "Eb3+Db4:16", "5/1"),
        M(["D7"], "D4+F#4:16", "1/3", "D3:16", "5"),
        M(["D7"], "D4+F#4:12 D4:4", "1/3 1", "C4:12 r:4", "1"),
        M(["Dm"], "D4+A4:4 F4:4 F4:4 G4:4", "1/5 3 3 4", "D3+F3+A3:16", "5/4/2"),
        M(["Dm"], "F4:16", "3", "r:8 D3:4 F3:4", "4 2"),
        M(["Gm7"], "r:8 F4:4 F4:4", "4 4", "C#3+Bb3:16", "5/1"),
        M(["C7"], "E4:8 F4:4 G4:4", "3 4 5", "C3+Bb3:16", "5/1"),
        M(["F"], "C4+F4:16", "1/4", "F3+A3:16", "5/3"),
      ],
    },
  ],
};
