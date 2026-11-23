// C'era una volta in America (Once Upon a Time in America), musica di Ennio Morricone. Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in Fa maggiore, 36 battute. Pubblicato con il permesso dell'editore.
// Note e DITEGGIATURE dallo spartito; alle note senza dito stampato è dato quello della posizione della mano.
// Battute 28–30 sono all'ottava sopra (8va). Battuta 10: la nota lunga della voce inferiore (Fa♯) e il Re lungo
// della sinistra sono suonati in una voce sola. Il legato tra le battute 35 e 36 è ripetuto (l'app non lega le battute).
import type { Song } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string) => ({ chords, rh, rf, lh, lf });
const arpF = "F3:4 A3:4 C4:4 A3:4", arpBb = "F3:4 G3:4 Bb3:4 G3:4";

export const ceraUnaVolta: Song = {
  slug: "cera-una-volta-in-america",
  title: "C'era una volta in America",
  composer: "Ennio Morricone",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "F",
  baseKey: "F",
  progression: ["F", "F", "Bb/F", "Bb", "F", "F", "Bb/F", "Bb"],
  progressionLabel: "il tema",
  fullTips: [
    "Lento, con molta espressione: la melodia va cantata, con atmosfera eterea.",
    "Il brano è in Fa maggiore (tutti i Si bemolle) ed è un'unica parte ripetuta un'ottava sopra.",
    "Nello spartito il pedale cambia a ogni battuta: sii preciso nei cambi.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema",
      focus: "Battute 1–18: bicordo tenuto, poi tre note che salgono",
      tempo: 60,
      tips: [
        "Una battuta con il bicordo tenuto (2 e 5), la successiva con tre note che salgono partendo dal pollice.",
        "Sinistra: accordo spezzato 5-3-1-3 (o 5-4-2-4), poi una nota lunga.",
        "Battuta 10: Fa♯ col pollice, poi Si♭ – La; la sinistra Re basso e Re sopra.",
        "Battute 11–15: forte, poi diminuendo verso la ripresa.",
      ],
      measures: [
        M(["F"], "E4+A4:16", "2/5", arpF, "5 3 1 3"),
        M(["F"], "r:4 C4:4 E4:4 F4:4", "1 2 3", "F3:16", "5"),
        M(["Bb/F"], "D4+G4:16", "2/5", arpBb, "5 4 2 4"),
        M(["Bb"], "r:4 D4:4 F4:4 G4:4", "1 2 3", "Bb3:16", "2"),
        M(["F"], "E4+A4:16", "2/5", arpF, "5 3 1 3"),
        M(["F"], "r:4 C4:4 G4:4 F4:4", "1 3 2", "F3:16", "5"),
        M(["Bb/F"], "D4+Bb4:16", "1/5", arpBb, "5 4 2 4"),
        M(["Bb"], "r:8 D4+A4:4 G4:4", "1/3 2", "Bb3:16", "2"),
        M(["Cm/Eb"], "G4+C5:16", "2/5", "Eb3:4 G3:4 C4:4 G3:4", "5 3 1 3"),
        M(["D7"], "F#4:8 Bb4:4 A4:4", "1 3 2", "D3:4 D4:12", "5 1"),
        M(["Bb"], "A4+D5:16", "2/5", "Bb2:4 F3:4 Bb3:4 F3:4", "5 2 1 2"),
        M(["C"], "r:4 G4:4 F4:4 E4:4", "3 2 1", "C3:16", "5"),
        M(["A7"], "E4+C5:16", "1/5", "A2:4 E3:4 G3:4 E3:4", "5 2 1 2"),
        M(["Dm"], "r:4 F4:4 G4:4 A4:4", "1 2 3", "D3:16", "5"),
        M(["Gm"], "F4+Bb4:12 G4:4", "1/4 2", "G2:4 D3:4 G3:8", "5 2 1"),
        M(["Gm/C", "C"], "D4+F4:8 C4+E4:8", "2/4 1/3", "C3+Bb3:16", "5/1"),
        M(["F"], "C4+E4:8 F4:8", "1/3 4", "F2:4 C3:12", "5 1"),
        M(["C7"], "D4+F4:8 F5:4 G5:4", "2/4 3 4", "C3+Bb3:16", "5/1"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il tema all'ottava sopra",
      focus: "Battute 19–36: la ripresa, il culmine forte e il finale",
      tempo: 60,
      firstMeasure: 19,
      tips: [
        "Mezzo piano: le stesse figure della prima parte, un'ottava sopra.",
        "Battute 28–30 (8va): la destra suona ancora più in alto.",
        "Battuta 31: forte. Poi la frase scende verso il finale.",
        "Battute 35–36: rit. e piano; la destra tiene l'ottava di Fa, la sinistra scende Fa – Sol – La – Do e chiude sul Fa.",
      ],
      measures: [
        M(["F"], "E5+A5:16", "2/5", arpF, "5 3 1 3"),
        M(["F"], "r:4 C5:4 E5:4 F5:4", "1 2 3", "F3:16", "5"),
        M(["Bb/F"], "D5+G5:16", "2/5", arpBb, "5 4 2 4"),
        M(["Bb"], "r:4 D5:4 F5:4 G5:4", "1 2 3", "Bb3:16", "2"),
        M(["F"], "E5+A5:16", "2/5", arpF, "5 3 1 3"),
        M(["F"], "r:4 C5:4 G5:4 F5:4", "1 3 2", "F3:16", "5"),
        M(["Bb/F"], "D5+Bb5:16", "1/5", arpBb, "5 4 2 4"),
        M(["Bb"], "r:8 D5+A5:4 G5:4", "1/3 2", "Bb3:16", "2"),
        M(["Cm/Eb"], "G5+C6:16", "2/5", "Eb3:4 G3:4 C4:4 G3:4", "5 3 1 3"),
        M(["D7"], "r:4 C6:4 Bb5:4 A5:4", "4 3 2", "D3:16", "5"),
        M(["Bb"], "A5+D6:16", "2/5", "Bb2:4 F3:4 Bb3:4 F3:4", "5 2 1 2"),
        M(["Bb"], "r:4 E6:4 F6:4 G6:4", "3 4 5", "Bb2:16", "5"),
        M(["A7"], "E4+C5:16", "1/4", "A2:4 E3:4 G3:4 E3:4", "5 2 1 2"),
        M(["Dm"], "r:4 F5:4 G5:4 A5:4", "2 3 4", "D3:16", "4"),
        M(["Gm"], "D5+Bb5:12 G5:4", "1/5 4", "G2:4 D3:4 F3:8", "5 2 1"),
        M(["Gm/C", "C"], "D5+F5:8 C5+E5:8", "2/4 1/3", "C3+C4:16", "5/1"),
        M(["F"], "F4+F5:16", "1/5", "F2:4 G2:4 A2:4 C3:4", "5 4 3 2"),
        M(["F"], "F4+F5:16", "1/5", "F3:16", "1"),
      ],
    },
  ],
};
