// Romanza (L. van Beethoven), dalla Romanza op. 50 per violino e orchestra. Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in Fa maggiore, 16 battute.
// Pubblicato con il permesso dell'editore. Note e DITEGGIATURE dallo spartito; alle poche note senza dito
// stampato è dato quello della posizione della mano. Battute 3 e 7: la minima legata alla croma è unita in una nota sola.
import type { Song } from "../score";

const nove = { chords: ["C7"], rh: "E4+Bb4:12 A4:1 G4:1 F#4:1 G4:1", lh: "C3:4 D3:4 E3:4 F3:4", rf: "1/5 4 3 2 3", lf: "5 4 3 2" };

export const romanzaBeethoven: Song = {
  slug: "romanza-beethoven",
  title: "Romanza",
  composer: "Ludwig van Beethoven, Romanza op. 50 per violino e orchestra",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "F",
  baseKey: "F",
  progression: ["F", "Bb/F", "C7/F", "C", "F", "Bb/F", "F", "C"],
  progressionLabel: "la sinistra ad accordi spezzati",
  fullTips: [
    "Il brano è in Fa maggiore: tutti i Si sono bemolle, salvo dove c'è il bequadro.",
    "Atmosfera serena: melodia espressiva, accordi della sinistra delicati come un sottofondo.",
    "Le alterazioni momentanee (Fa♯, Sol♯, Si♮) valgono solo nella battuta in cui compaiono.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema",
      focus: "Battute 1–8: melodia lunga sopra basso e accordi",
      tempo: 72,
      tips: [
        "La sinistra suona il basso col 5, poi l'accordo (bicordo) due volte: leggera, senza coprire la melodia.",
        "Battuta 1: Fa lungo col 2, poi il gruppetto di semicrome Sol – Fa – Mi – Fa.",
        "Battute 5–7: le note cromatiche Fa♯ – Sol♯ e Si♮ – Do portano su la melodia.",
        "Battute 4 e 8: la frase si ferma sul Do; diminuendo.",
      ],
      measures: [
        { chords: ["F"], rh: "F4:12 G4:1 F4:1 E4:1 F4:1", lh: "F3:4 A3+C4:4 A3+C4:8", rf: "2 3 2 1 2", lf: "5 3/1 3/1" },
        { chords: ["Bb/F"], rh: "A4:6 G4:2 Bb4:6 G4:2", lh: "F3:4 Bb3+D4:4 Bb3+D4:4 Bb3+D4:4", rf: "4 2 4 2", lf: "5 2/1 2/1 2/1" },
        { chords: ["C7/F"], rh: "F4:10 E4:2 G4:2 E4:2", lh: "F3:4 G3+Bb3:4 G3+Bb3:8", rf: "1 3 5 3", lf: "4 2/1 2/1" },
        { chords: ["C/E"], rh: "C4:12 C4:4", lh: "E3:4 G3:4 E3:8", rf: "1 1", lf: "3 1 3" },
        { chords: ["F", "C7/E"], rh: "F4:8 G4:2 F#4:2 G4:2 G#4:2", lh: "F3:4 A3+C4:4 E3+C4:8", rf: "3 4 3 1 2", lf: "5 3/1 5/1" },
        { chords: ["Bb/F"], rh: "A4:8 Bb4:2 A4:2 Bb4:2 D5:2", lh: "F3:4 Bb3+D4:4 F3+D4:8", rf: "3 4 3 4 5", lf: "5 3/1 5/1" },
        { chords: ["Bb/F", "F"], rh: "A4:10 Bb4:2 B4:2 C5:2", lh: "F3:4 Bb3+D4:4 A3+C4:8", rf: "2 3 4 5", lf: "5 3/1 3/1" },
        { chords: ["C"], rh: "G4:12 C4:4", lh: "E3:4 D3:4 E3:8", rf: "2 1", lf: "3 4 3" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "La risposta e la fine",
      focus: "Battute 9–16: il basso sale Do – Re – Mi – Fa, poi la chiusa",
      tempo: 72,
      firstMeasure: 9,
      tips: [
        "Battute 9 e 11: bicordo Mi – Si♭ tenuto (1 e 5), poi La – Sol – Fa♯ – Sol; la sinistra sale per gradi.",
        "Battuta 12: bicordi della destra col pollice fermo sul Fa; Si♮ e Fa♯ sono alterazioni momentanee.",
        "Battuta 13: forte, Re acuto, poi Si♭ – Mi – Fa; la sinistra Si♭ – Si♮.",
        "Battute 15–16: rit. e diminuendo verso l'accordo finale di Fa.",
      ],
      measures: [
        nove,
        { chords: ["C7"], rh: "E4:4 F4:4 E4:4 F4:4", lh: "C3:4 A3:4 G3:4 A3:4", rf: "1 2 1 2", lf: "5 1 2 1" },
        nove,
        { chords: ["C7", "F"], rh: "E4:4 F4+C5:4 F4+B4:4 F4+C5:4", lh: "C3:4 A3:4 F#3:4 A3:4", rf: "1 1/4 1/3 1/4", lf: "5 1 2 1" },
        { chords: ["Bb", "G7"], rh: "F4+D5:8 r:2 Bb4:2 E5:2 F5:2", lh: "Bb3:8 B3:8", rf: "1/5 3 4 5", lf: "2 1" },
        { chords: ["F"], rh: "F4:12 A4:2 G4:2", lh: "A3:4 C4:4 A3:8", rf: "1 4 3", lf: "3 1 3" },
        { chords: ["C7"], rh: "G4:12 C5:2 E4:2", lh: "C3:4 D3:4 E3:8", rf: "3 5 1", lf: "5 4 3" },
        { chords: ["F"], rh: "F4:16", lh: "F3+A3:16", rf: "2", lf: "2/1" },
      ],
    },
  ],
};
