// Allegro (W. A. Mozart), dalla Piccola serenata notturna K 525 (Eine kleine Nachtmusik), 1° movimento.
// Adattamento di Franco Concina (trascrizione di proprietà di Nuova Carisch s.r.l.), in Sol maggiore, 30 battute.
// Pubblicato con il permesso dell'editore. Note e DITEGGIATURE dallo spartito; alle note senza dito
// stampato è dato quello della posizione della mano. Le note «m.s.» scritte nel rigo di violino
// (battute 1–4 e 18–21) sono della mano sinistra.
import type { Song } from "../score";

const segnale = [
  { chords: ["G"], rh: "G4:4 r:4 G4:4 r:4", lh: "r:6 D4:2 r:6 D4:2", rf: "1 1", lf: "1 1" },
  { chords: ["G"], rh: "G4:2 r:2 G4:2 B4:2 D5:4 r:4", lh: "r:2 D4:2 r:12", rf: "1 1 3 5", lf: "1" },
  { chords: ["D7"], rh: "C5:4 r:2 A4:2 C5:4 r:2 A4:2", lh: "r:16", rf: "5 3 5 3" },
  { chords: ["D7"], rh: "C5:2 A4:2 F#4:2 A4:2 r:8", lh: "r:8 D4:4 r:4", rf: "5 4 2 4", lf: "1" },
];
const tema = [
  { chords: ["G"], rh: "G4:4 G4:6 B4:2 A4:2 G4:2", lh: "G2:2 G3:2 G3:2 G3:2 G3:8", rf: "3 3 5 4 3", lf: "5 1 1 1 1" },
  { chords: ["D"], rh: "G4:2 F#4:2 F#4:6 A4:2 C5:2 F#4:2", lh: "D3:6 D3:2 D3:8", rf: "3 2 2 4 5 2", lf: "2 2 2" },
  { chords: ["G"], rh: "A4:2 G4:2 G4:6 B4:2 A4:2 G4:2", lh: "G2:6 G2:2 G2:8", rf: "4 3 3 5 4 3", lf: "5 5 5" },
  { chords: ["D"], rh: "G4:2 F#4:2 F#4:6 A4:2 C5:2 F#4:2", lh: "D3:6 D3:2 D3:8", rf: "3 2 2 4 5 2", lf: "2 2 2" },
];
const scaletta = { chords: ["G"], rh: "G4:2 G4:2 G4:1 F#4:1 E4:1 F#4:1 G4:2 G4:2 B4:1 A4:1 G4:1 A4:1", lh: "G2:8 G2:8", rf: "3 3 3 2 1 2 3 1 3 2 1 2", lf: "5 5" };

export const allegroMozart: Song = {
  slug: "allegro-mozart",
  title: "Allegro",
  composer: "Wolfgang Amadeus Mozart, Piccola serenata notturna K 525",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "G",
  baseKey: "G",
  progression: ["G", "G", "D7", "D7", "G", "D", "G", "D"],
  progressionLabel: "tonica e dominante",
  fullTips: [
    "Il brano è in Sol maggiore: tutti i Fa sono diesis.",
    "Deciso e brillante: le note staccate brevi, le legature di frase ben legate.",
    "Nelle battute 1–4 e 18–21 il segnale d'apertura si suona alternando le mani: le note «m.s.» le suona la sinistra.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il segnale",
      focus: "Battute 1–4: le mani si alternano (m.s. = mano sinistra)",
      tempo: 100,
      tips: [
        "Sol con la destra, Re con la sinistra (m.s.): un'alternanza regolare, forte e deciso.",
        "Battuta 2: Sol – Si – Re salgono con 1-3-5.",
        "Battute 3–4: Do – La sul Re7; la sinistra chiude sul Re a battuta 4.",
      ],
      measures: segnale,
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il tema e le scalette",
      focus: "Battute 5–10: melodia legata e semicrome",
      tempo: 100,
      firstMeasure: 5,
      tips: [
        "Battute 5–8: mf, melodia legata; la sinistra alterna il Sol e il Re col basso tenuto.",
        "Battuta 9: crome staccate e gruppi di semicrome (Sol – Fa♯ – Mi – Fa♯), crescendo.",
        "Battuta 10: Si – Si, poi Re – Do – Si – Do e Re tenuto.",
      ],
      measures: [...tema, scaletta,
        { chords: ["G"], rh: "B4:2 B4:2 D5:1 C5:1 B4:1 C5:1 D5:4 r:4", lh: "G2:4 A2:4 B2:4 r:4", rf: "3 1 3 2 1 2 3", lf: "5 4 3" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Cantato",
      focus: "Battute 11–17: la melodia sopra gli accordi della sinistra",
      tempo: 92,
      firstMeasure: 11,
      tips: [
        "mp, cantato: Re e Mi lunghi, poi la melodia scende per gradi.",
        "La sinistra suona bicordi (due note insieme): prepara le dita indicate prima di suonarli.",
        "Battute 15–17 ripetono 11–13 con le crome staccate.",
      ],
      measures: [
        { chords: ["G", "C"], rh: "D5:8 E5:8", lh: "B2+G3:8 C3+G3:8", rf: "4 5", lf: "5/1 5/1" },
        { chords: ["D", "Em"], rh: "D5:2 C5:2 C5:4 C5:2 B4:2 B4:4", lh: "D3+F#3:8 E3+G3:8", rf: "4 3 3 3 2 2", lf: "4/2 3/1" },
        { chords: ["C", "D"], rh: "B4:2 A4:2 A4:4 G4:2 F#4:2 E4:2 F#4:2", lh: "C3+E3:8 D3:8", rf: "2 1 1 3 2 1 2", lf: "5/3 2" },
        { chords: ["G"], rh: "G4:2 r:2 A4:2 r:2 B4:2 r:6", lh: "G2:2 r:2 D3:2 r:2 G3:2 r:6", rf: "3 4 5", lf: "5 3 1" },
        { chords: ["G", "C"], rh: "D5:8 E5:8", lh: "B2+G3:8 C3+G3:8", rf: "4 5", lf: "5/1 5/1" },
        { chords: ["D", "Em"], rh: "D5:2 C5:2 C5:2 C5:2 C5:2 B4:2 B4:2 B4:2", lh: "D3+F#3:8 E3+G3:8", rf: "4 3 3 3 3 2 2 2", lf: "4/2 3/1" },
        { chords: ["C", "D"], rh: "B4:2 A4:2 A4:2 A4:2 G4:2 F#4:2 E4:2 F#4:2", lh: "C3+E3:8 D3:8", rf: "2 1 1 1 3 2 1 2", lf: "5/3 2" },
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "Ripresa e finale",
      focus: "Battute 18–30: il segnale e il tema ritornano, poi la chiusa",
      tempo: 100,
      firstMeasure: 18,
      tips: [
        "Battute 18–26: come l'inizio (segnale, tema, scalette).",
        "Battuta 27: Re – Do – Si – Do in semicrome, poi la sinistra sale Sol – La – Si – Re.",
        "Battuta 28: Sol – Fa♯ ripetuti con 1-2, crescendo verso il forte.",
        "Battute 29–30: accordi accentati, forte; il finale è un Sol tenuto.",
      ],
      measures: [
        { ...segnale[0], rf: "4 1" }, segnale[1], segnale[2], segnale[3],
        ...tema, scaletta,
        { chords: ["G", "D7"], rh: "B4:2 B4:2 D5:1 C5:1 B4:1 C5:1 D5:2 C5:2 B4:2 A4:2", lh: "G2:4 A2:4 B2:4 D3:4", rf: "3 3 5 4 3 4 5 4 3 2", lf: "5 4 3 1" },
        { chords: ["G"], rh: "G4:2 F#4:2 G4:2 F#4:2 G4:2 F#4:2 G4:2 F#4:2", lh: "G2:8 G2:8", rf: "1 2 1 2 1 2 1 2", lf: "5 5" },
        { chords: ["G"], rh: "G4:4 r:4 D4+B4:4 r:4", lh: "G2:4 r:4 G2:4 r:4", rf: "1 1/5", lf: "5 5" },
        { chords: ["G"], rh: "B3+G4:16", lh: "G2:16", rf: "1/5", lf: "5" },
      ],
    },
  ],
};
