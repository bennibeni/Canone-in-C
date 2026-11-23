// Alleluja (G. F. Händel, dal Messiah HWV 56), adattamento di Franco Concina (trascrizione di proprietà di Nuova Carisch s.r.l.),
// in Do maggiore, 19 battute. Pubblicato con il permesso dell'editore.
// Note e DITEGGIATURE lette dallo spartito; alle note senza dito stampato è dato il dito della nota
// vicina uguale o quello che segue la posizione della mano (note ribattute, coppie di semicrome).
// Battuta 4: le due crome Do legate sono unite in una semiminima.
// Battute 10 e 14: la nota scritta nel pentagramma di violino con «m.s.» è suonata dalla sinistra.
import type { Song } from "../score";

export const alleluja: Song = {
  slug: "alleluja",
  title: "Alleluja",
  composer: "Georg Friedrich Händel, dal Messiah HWV 56",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "G", "C", "G", "G", "G"],
  progressionLabel: "tonica e dominante",
  fullTips: [
    "Il coro che chiude la seconda parte del Messiah. Allegro, forte: note brevi e ben staccate dove ci sono le pause, legate sotto le arcate.",
    "Le note ribattute (Do – Do, Re – Re) vanno suonate tutte con lo stesso dito, rilasciando il tasto quel tanto che basta.",
    "Nelle battute 9–15 la destra canta da sola (mf); la sinistra entra solo con una nota (m.s.) e con le semicrome che preparano il forte.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema su Do",
      focus: "Battute 1–4: Do puntato, note ribattute e cadenza",
      tempo: 96,
      tips: [
        "Battute 1–2: «Hal-le-lu-jah»: Do puntato col 5, poi Sol – La – Sol con 2-3-2. La sinistra sale Do – Re – Mi – Fa e torna al Mi.",
        "Battuta 3: tutti Do col 5 nella destra; la sinistra alterna Fa e Mi con 2 e 3.",
        "Battuta 4: Si – Do (tenuto) – Si – Do e pausa; diminuendo nella sinistra che scende verso il Do.",
      ],
      measures: [
      { chords: ["C"], rh: "C5:6 G4:2 A4:2 G4:2 r:4", lh: "C3 C3 D3 E3 F3 E3 r:4", rf: "5 2 3 2", lf: "5 5 4 3 2 3" },
      { chords: ["C"], rh: "C5:6 G4:2 A4:2 G4:2 r:2 C5:1 C5:1", lh: "C3 C3 D3 E3 F3 E3 r:2 E3:1 E3:1", rf: "5 2 3 2 5 5", lf: "5 5 4 3 2 3 3 3" },
      { chords: ["C"], rh: "C5:2 C5:2 r:2 C5:1 C5:1 C5:2 C5:2 r:2 C5:2", lh: "F3 E3 r:2 E3:1 E3:1 F3 E3 r:2 E3", rf: "5 5 5 5 5 5 5", lf: "2 3 3 3 2 3 3" },
      { chords: ["G", "C"], rh: "B4:2 C5:4 B4:2 C5:4 r:4", lh: "D3 C3 G3:4 C3 E3 D3 C3", rf: "4 5 4 5", lf: "4 5 1 5 3 4 5" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il tema su Sol",
      focus: "Battute 5–8: lo stesso disegno sul Re, poi la discesa Mi – Re – Do – Si",
      tempo: 96,
      firstMeasure: 5,
      tips: [
        "Battute 5–6: Re puntato col 4 e salto giù al Sol col pollice; la sinistra resta sul Si e sul Do (2 e 1).",
        "Battuta 7: Re ribattuti col 4, Mi col 5.",
        "Battuta 8: Mi – Re – Do – Si con 5-4-3-2, diminuendo; la sinistra scende La – Re e chiude sul Sol.",
      ],
      measures: [
      { chords: ["G"], rh: "D5:6 G4:2 E5:2 D5:2 r:4", lh: "B3:6 B3:2 C4:2 B3:2 r:4", rf: "4 1 5 4", lf: "2 2 1 2" },
      { chords: ["G"], rh: "D5:6 G4:2 E5:2 D5:2 r:2 D5:1 D5:1", lh: "B3:6 B3:2 C4:2 B3:2 r:2 B3:1 B3:1", rf: "4 1 5 4 4 4", lf: "2 2 1 2 2 2" },
      { chords: ["G"], rh: "E5:2 D5:2 r:2 D5:1 D5:1 E5:2 D5:2 r:2 D5:2", lh: "C4 B3 r:2 B3:1 B3:1 C4 B3 r:2 B3", rf: "5 4 4 4 5 4 4", lf: "1 2 2 2 1 2 2" },
      { chords: ["C", "D7", "G", "G"], rh: "E5:2 D5:2 C5:4 B4:4 r:4", lh: "C4 B3 A3 D3 G3:4 r:4", rf: "5 4 3 2", lf: "1 2 1 5 2" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Il canto",
      focus: "Battute 9–14: la destra canta da sola, la sinistra aggiunge una nota",
      tempo: 96,
      firstMeasure: 9,
      tips: [
        "Battuta 9: «For the Lord God omnipotent reigneth»: Sol – La – Si con 1-2-3, mf e legato.",
        "Battuta 10: dopo il primo Do la sinistra (m.s.) suona il Do centrale col 2, poi la destra continua Do – Do – Si.",
        "Battuta 11: La – Sol, poi le semicrome Re – Re (forte) preparano la battuta 12, come nella battuta 7.",
        "Battute 13–14: lo stesso canto una quinta sotto (Do – Re – Mi, poi Fa); la nota della sinistra è il Fa.",
      ],
      measures: [
      { chords: [], rh: "G4:8 A4:4 B4:4", lh: "r:16", rf: "1 2 3" },
      { chords: ["C"], rh: "C5:2 r:2 C5:6 C5:2 B4:4", lh: "r:2 C4:2 r:12", rf: "4 4 4 3", lf: "2" },
      { chords: [], rh: "A4:8 G4:4 r:2 D5:1 D5:1", lh: "r:14 B3:1 B3:1", rf: "2 1 4 4", lf: "2 2" },
      { chords: ["G"], rh: "E5:2 D5:2 r:2 D5:1 D5:1 E5:2 D5:2 r:4", lh: "C4 B3 r:2 B3:1 B3:1 C4 B3 r:4", rf: "5 4 4 4 5 4", lf: "1 2 2 2 1 2" },
      { chords: [], rh: "C4:8 D4:4 E4:4", lh: "r:16", rf: "1 2 3" },
      { chords: ["F"], rh: "F4:2 r:2 F4:6 F4:2 E4:4", lh: "r:2 F3:2 r:12", rf: "4 4 4 3", lf: "2" },
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "Il finale",
      focus: "Battute 15–19: note ribattute in forte e accordi finali",
      tempo: 96,
      firstMeasure: 15,
      tips: [
        "Battuta 15: Re – Do col 2 e l'1, poi le semicrome Do – Do (forte) col 5.",
        "Battute 16–17: Do ribattuti alla destra, Fa – Mi alla sinistra (2 e 3), come nella battuta 3.",
        "Battuta 17: l'ultima croma è l'accordo Mi – Do (fortissimo), con 1 e 5.",
        "Battute 18–19: rallentando: accordo Fa – Do sopra il La, poi l'accordo finale di Do.",
      ],
      measures: [
      { chords: [], rh: "D4:8 C4:4 r:2 C5:1 C5:1", lh: "r:14 E3:1 E3:1", rf: "2 1 5 5", lf: "3 3" },
      { chords: ["C"], rh: "C5:2 C5:2 r:2 C5:1 C5:1 C5:2 C5:2 r:2 C5:1 C5:1", lh: "F3 E3 r:2 E3:1 E3:1 F3 E3 r:2 E3:1 E3:1", rf: "5 5 5 5 5 5 5 5", lf: "2 3 3 3 2 3 3 3" },
      { chords: ["C"], rh: "C5:2 C5:2 r:2 C5:1 C5:1 C5:2 C5:2 r:2 E4+C5:2", lh: "F3 E3 r:2 E3:1 E3:1 F3 E3 r:2 G3", rf: "5 5 5 5 5 5 1/5", lf: "2 3 3 3 2 3 1" },
      { chords: ["F"], rh: "F4+C5:12 F4+C5:4", lh: "A3:12 A3:4", rf: "1/5 1/5", lf: "1 1" },
      { chords: ["C"], rh: "E4+C5:16", lh: "C3+G3:16", rf: "1/5", lf: "5/2" },
      ],
    },
  ],
};
