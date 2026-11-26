// Blues — «Three Note Bass-Line». Note dallo spartito (screenshot): solo la mano sinistra, in chiave di basso:
// fondamentale (minima), terza e quinta (semiminime) dell'accordo, sul giro di blues di 12 battute in Do, da ripetere.
// Le DITEGGIATURE sono proposte (lo spartito non le indica): 5 – 3 – 1 su fondamentale, terza e quinta.
import type { Song } from "../../score";

const m = (chord: string, root: string, third: string, fifth: string) => ({ chords: [chord], rh: "r:16", lh: `${root}:8 ${third}:4 ${fifth}:4`, lf: "5 3 1" });
const C = m("C", "C2", "E2", "G2");
const F = m("F", "F2", "A2", "C3");
const G = m("G", "G2", "B2", "D3");

export const b_three_note_bass_line: Song = {
  slug: "three-note-bass-line",
  title: "Three Note Bass-Line",
  composer: "Blues",
  credit: "Esercizio di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. Si suona solo con la mano sinistra: è il basso dell'Esercizio 1 con una nota in più.",
    "In ogni battuta suoni le tre note dell'accordo dal basso: fondamentale (minima), terza e quinta (semiminime). Do–Mi–Sol, Fa–La–Do, Sol–Si–Re.",
    "Lo spartito dice «Repeat»: alla fine delle 12 battute ricomincia da capo senza fermarti.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il basso a tre note",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 80,
      tips: [
        "Dita 5 – 3 – 1 in ogni battuta: la mano prende la forma dell'accordo e la tiene; cambia solo la posizione quando cambia l'accordo.",
        "Dopo il pollice sulla quinta, il mignolo deve saltare alla fondamentale della battuta dopo: tieni la mano leggera e guarda già il tasto d'arrivo.",
        "Prova prima ogni battuta come accordo pieno (le tre note insieme), poi sciogli: minima, semiminima, semiminima.",
        "Conta «1-2-3-4»: la fondamentale cade sull'1 e dura due tempi, la terza sul 3, la quinta sul 4.",
      ],
      measures: [C, C, C, C, F, F, C, C, G, F, C, C],
    },
  ],
};
