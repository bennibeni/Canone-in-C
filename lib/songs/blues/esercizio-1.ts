// Blues — Esercizio 1. Note dallo spartito (screenshot): solo la mano sinistra, minime in chiave di basso,
// fondamentale e terza dell'accordo su un giro di blues di 12 battute in Do, da ripetere.
// Le DITEGGIATURE sono proposte (lo spartito non le indica): 5 sulla fondamentale, 3 sulla terza.
import type { Song } from "../../score";

const m = (chord: string, root: string, third: string) => ({ chords: [chord], rh: "r:16", lh: `${root}:8 ${third}:8`, lf: "5 3" });
const C = m("C", "C2", "E2");
const F = m("F", "F2", "A2");
const G = m("G", "G2", "B2");

export const b_esercizio_1: Song = {
  slug: "blues-esercizio-1",
  title: "Esercizio 1",
  composer: "Blues",
  credit: "Esercizio di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. Si suona solo con la mano sinistra, due minime per battuta.",
    "In ogni battuta suoni la fondamentale dell'accordo e la sua terza: Do–Mi, Fa–La, Sol–Si.",
    "Lo spartito dice «Repeat»: alla fine delle 12 battute ricomincia da capo senza fermarti.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il giro di 12 battute",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 80,
      tips: [
        "Mignolo (5) sulla fondamentale, medio (3) sulla terza: la mano resta nella stessa forma e si sposta solo quando cambia l'accordo.",
        "Il passaggio da Do a Fa (battuta 5) e da Sol a Fa (battuta 10) è un salto della mano: preparalo durante la seconda minima.",
        "Conta ad alta voce «1-2-3-4» e ascolta dove cade il cambio d'accordo: le battute 1, 5, 7, 9, 10 e 11 sono i punti fermi del giro.",
      ],
      measures: [C, C, C, C, F, F, C, C, G, F, C, C],
    },
  ],
};
