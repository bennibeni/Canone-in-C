// Blues — Esercizio 2. Note dallo spartito (screenshot): la sinistra dell'Esercizio 1 (fondamentale e terza
// in minime) e sopra una melodia alla destra, sul giro di blues di 12 battute in Do.
// Le legature tra una battuta e l'altra (1→2, 5→6, 9→10) non sono unite: la nota legata è scritta di nuovo.
// Le DITEGGIATURE sono proposte (lo spartito non le indica): destra in posizione fissa Sol=1 La=2 Do=4 Re=5.
import type { Song } from "../../score";

const lh = { C: { lh: "C2:8 E2:8", lf: "5 3" }, F: { lh: "F2:8 A2:8", lf: "5 3" }, G: { lh: "G2:8 B2:8", lf: "5 3" } };
const m = (chord: "C" | "F" | "G", rh: string, rf?: string) => ({ chords: [chord], rh, ...(rf ? { rf } : {}), ...lh[chord] });

export const b_esercizio_2: Song = {
  slug: "blues-esercizio-2",
  title: "Esercizio 2",
  composer: "Blues",
  credit: "Esercizio di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. La sinistra è la stessa dell'Esercizio 1: impara prima quella, finché va da sola.",
    "La destra usa solo cinque note (Sol, La, Do, Re e il Do finale): tieni il pollice sul Sol e la mano ferma per tutto il brano.",
    "La melodia segue gli accordi: ogni frase di quattro battute parte da una nota lunga, si muove alla seconda battuta e si posa alla terza.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Melodia e basso",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 80,
      tips: [
        "Le note lunghe delle battute 1, 5 e 9 sono legate alla battuta dopo: tienile premute anche nella prima metà della battuta successiva, senza ripremerle.",
        "Destra: pollice (1) sul Sol, 2 sul La, 4 sul Do, 5 sul Re. Il 3 resta sopra il Si, che non si suona mai.",
        "Nelle battute 4 e 8 la destra tace: usa la pausa per prepararti alla frase dopo.",
        "Ultima battuta: la destra scende al Do centrale con il pollice.",
      ],
      measures: [
        m("C", "G4:16", "1"),
        m("C", "G4:8 G4:4 A4:4", "1 1 2"),
        m("C", "C5:16", "4"),
        m("C", "r:16"),
        m("F", "A4:16", "2"),
        m("F", "A4:8 C5:4 A4:4", "2 4 2"),
        m("C", "G4:16", "1"),
        m("C", "r:16"),
        m("G", "D5:16", "5"),
        m("F", "D5:8 C5:4 A4:4", "5 4 2"),
        m("C", "C5:16", "4"),
        m("C", "C4:16", "1"),
      ],
    },
  ],
};
