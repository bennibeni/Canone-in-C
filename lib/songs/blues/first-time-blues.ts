// Blues — «First Time Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do; sinistra con il basso a tre note (fondamentale, terza, quinta),
// destra con le blue note (Mib, Fa#, Sib). Il secondo giro riprende il primo un'ottava più in alto alle battute 16–19.
// Le legature tra una battuta e l'altra (1→2, 5→6, 13→14, 17→18) non sono unite: la nota legata è scritta di nuovo.
// Le DITEGGIATURE sono proposte (lo spartito non le indica).
import type { Song } from "../../score";

const lh = {
  C: { lh: "C2:8 E2:4 G2:4", lf: "5 3 1" },
  F: { lh: "F2:8 A2:4 C3:4", lf: "5 3 1" },
  G: { lh: "G2:8 B2:4 D3:4", lf: "5 3 1" },
};
const m = (chord: "C" | "F" | "G", rh: string, rf?: string) => ({ chords: [chord], rh, ...(rf ? { rf } : {}), ...lh[chord] });

export const b_first_time_blues: Song = {
  slug: "first-time-blues",
  title: "First Time Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore con le blue note (Mib, Fa#, Sib): le alterazioni non sono in chiave, guardale nota per nota.",
    "Il brano è fatto di due giri di blues di 12 battute. La sinistra è il basso a tre note di «Three Note Bass-Line»: imparala da sola finché va in automatico.",
    "Unisci le mani prima nelle battute con le note lunghe, poi in quelle con le crome. Le crome si possono suonare prima dritte, poi «swing» (lunga-corta).",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 76,
      tips: [
        "Destra in posizione: pollice sul Do, 2 sul Mib, 3 sul Fa, 4 sul Fa#, 5 sul Sol.",
        "Battuta 2: la figura Do – Mib – Fa – Fa# sale verso il Sol della battuta 3 (dita 1-2-3-4, poi 5).",
        "Battuta 6: sul Fa tenuto parte la figura che scende, Fa# – Fa – Mib – Do (4-3-2-1).",
        "Battute 7 e 10: la mano scende di un tasto per il Sib, che si suona con il pollice (nella 10: Mib 3, Do 2, Sib 1).",
        "Le note legate (battute 1→2 e 5→6) si tengono premute senza ripremerle.",
      ],
      measures: [
        m("C", "C4:16", "1"),
        m("C", "C4:8 C4:2 Eb4:2 F4:2 F#4:2", "1 1 2 3 4"),
        m("C", "G4:16", "5"),
        m("C", "C4:16", "1"),
        m("F", "F4:16", "3"),
        m("F", "F4:8 F#4:2 F4:2 Eb4:2 C4:2", "3 4 3 2 1"),
        m("C", "Bb3:8 C4:8", "1 2"),
        m("C", "r:16"),
        m("G", "G4:8 F#4:4 F4:4", "5 4 3"),
        m("F", "Eb4:8 C4:4 Bb3:4", "3 2 1"),
        m("C", "C4:16", "2"),
        m("C", "r:16"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: la melodia sale al Do acuto",
      tempo: 76,
      firstMeasure: 13,
      tips: [
        "Le battute 13–15 sono uguali alle 1–3. Alla battuta 16 la melodia salta al Do acuto: sposta la mano e prendilo con il 5.",
        "Battuta 18: dal Do tenuto la figura sale Fa# – Sol – Sib – Do (2-3-4-5), con il pollice libero sopra il Fa.",
        "Le battute 21–23 sono uguali alle 9–11: riporta la mano in posizione con il 5 sul Sol.",
        "Nell'ultima battuta la destra tace e la sinistra chiude con un Do grave tenuto.",
      ],
      measures: [
        m("C", "C4:16", "1"),
        m("C", "C4:8 C4:2 Eb4:2 F4:2 F#4:2", "1 1 2 3 4"),
        m("C", "G4:16", "5"),
        m("C", "C5:16", "5"),
        m("F", "C5:16", "5"),
        m("F", "C5:8 F#4:2 G4:2 Bb4:2 C5:2", "5 2 3 4 5"),
        m("C", "C5:16", "5"),
        m("C", "r:16"),
        m("G", "G4:8 F#4:4 F4:4", "5 4 3"),
        m("F", "Eb4:8 C4:4 Bb3:4", "3 2 1"),
        m("C", "C4:16", "2"),
        { chords: ["C"], rh: "r:16", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
