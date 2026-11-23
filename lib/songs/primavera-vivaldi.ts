// Allegro (A. Vivaldi), 1° movimento del concerto «La primavera» (Le quattro stagioni).
// Adattamento di Franco Concina (trascrizione di proprietà di Nuova Carisch s.r.l.), in Do maggiore, 26 battute.
// Pubblicato con il permesso dell'editore. Note e DITEGGIATURE dallo spartito.
// L'app suona una voce per mano: dove la sinistra tiene il Do (battuta 1) o la destra tiene il Do centrale
// sotto la melodia (battute 13–26), la nota tenuta è suonata insieme alla prima nota della melodia e non resta premuta.
import type { Song } from "../score";

const a1 = { chords: ["C"], rh: "E4:4 E4:4 E4:4 D4:2 C4:2", lh: "C3:8 G3:8", rf: "3 3 3 2 1", lf: "5 1" };
const a2 = { chords: ["C"], rh: "E4+G4:12 G4:2 F4:2", lh: "C3:4 D3:4 E3:8", rf: "3/5 5 4", lf: "5 4 3" };
const a5 = { chords: ["C", "D7"], rh: "E4:4 F4:2 G4:2 C4+F4:4 C4+E4:4", lh: "C3:8 A3:4 F#3:4", rf: "3 3 3 1/4 1/3", lf: "5 1 3" };
const a6 = { chords: ["G"], rh: "B3+D4:12 C4:4", lh: "G3:4 A3:4 B3:4 r:4", rf: "1/2 1", lf: "2 1 2" };
const b1 = { chords: ["C"], rh: "C4+G4:4 F4:2 E4:2 F4:4 G4:4", lh: "E3:8 D3:4 E3:4", rf: "1/4 3 2 3 4", lf: "3 4 3" };
const b2 = { chords: ["F", "C"], rh: "C4+A4:4 C4+G4:8 C4:4", lh: "F3:4 E3:12", rf: "1/5 1/4 1", lf: "2 3" };
const c1 = { chords: ["F", "C", "F"], rh: "C4+A4:4 G4:8 F4:4", lh: "F3:4 E3:8 D3:4", rf: "1/5 4 3", lf: "2 3 4" };
const c2 = { chords: ["C", "G7"], rh: "E4:4 D4:2 C4:2 B3+D4:6 C4:2", lh: "C3+G3:8 G3:4 F3:4", rf: "2 1 2 1/3 2", lf: "5/1 1 2" };

export const primaveraVivaldi: Song = {
  slug: "primavera-vivaldi",
  title: "La primavera",
  composer: "Antonio Vivaldi, Allegro dal concerto «La primavera»",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "C", "D7", "G", "G"],
  progressionLabel: "il tema della primavera",
  fullTips: [
    "Allegro: il tema si ripete prima forte e poi piano, come un'eco.",
    "Nella seconda metà la destra tiene il Do centrale col pollice mentre le altre dita cantano la melodia.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema e l'eco",
      focus: "Battute 1–12: il tema forte (1–6) e ripetuto piano (7–12)",
      tempo: 104,
      tips: [
        "Battuta 1: tre Mi col 3, poi Re – Do; la sinistra Do e Sol.",
        "Battuta 2: bicordo Mi – Sol tenuto (3 e 5), poi Sol – Fa.",
        "Battuta 5: Mi – Fa – Sol e due bicordi col pollice sul Do; nella sinistra il Fa♯.",
        "Battute 7–12: lo stesso, piano, come un'eco.",
      ],
      measures: [a1, a2, a1, a2, a5, a6, a1, a2, a1, a2, a5, a6],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il canto degli uccelli",
      focus: "Battute 13–26: melodia sopra il Do tenuto dal pollice",
      tempo: 96,
      firstMeasure: 13,
      tips: [
        "Il pollice tiene il Do centrale (nell'app suona solo all'inizio): le dita 2-3-4-5 cantano Sol – Fa – Mi – Fa – Sol.",
        "La sinistra risponde col basso Mi – Re – Mi e Fa – Mi.",
        "Battute 20–23: lo stesso, piano.",
        "Battute 25–26: rit. verso il Do finale.",
      ],
      measures: [
        b1, b2, b1, b2, c1, c2,
        { chords: ["C"], rh: "C4:12 C4:4", lh: "E3:4 D3:4 C3:8", rf: "1 1", lf: "3 4 5" },
        b1, b2, b1, b2, c1, c2,
        { chords: ["C"], rh: "C4:16", lh: "E3:4 D3:4 C3:8", rf: "1", lf: "3 4 5" },
      ],
    },
  ],
};
