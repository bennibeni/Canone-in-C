// Blues — «Walking The Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do; sinistra in semiminime fondamentale – terza – quinta – terza,
// destra a bicordi in terzine di crome con lo «scivolamento» dalla blue note (Mib→Mi, Sib→Si, Sol#→La).
// Ogni terzina occupa una semiminima: le prime due semiminime sono terzine, poi una minima.
// Le DITEGGIATURE sono proposte (lo spartito non le indica): la nota che scivola cambia dito (4→5, 2→3).
import type { Song } from "../../score";

const lh = {
  C: { lh: "C2:4 E2:4 G2:4 E2:4", lf: "5 3 1 3" },
  F: { lh: "F2:4 A2:4 C3:4 A2:4", lf: "5 3 1 3" },
  G: { lh: "G2:4 B2:4 D3:4 B2:4", lf: "5 3 1 3" },
};
const m = (chord: "C" | "F" | "G", rh: string, rf: string) => ({ chords: [chord], rh, rf, ...lh[chord] });

/** due terzine di bicordi (la prima nota può scivolare da sotto) e poi una minima */
const slide = (chord: "C" | "F" | "G", from: string, to: string, fFrom: string, fTo: string) =>
  m(chord, `[${from} ${to} ${to}]:4 [${to} ${to} ${to}]:4 ${to}:8`, `${fFrom} ${fTo} ${fTo} ${fTo} ${fTo} ${fTo} ${fTo}`);

const sesta = slide("C", "G4+Eb5", "G4+E5", "1/4", "1/5"); // Sol + Mib→Mi
const terzaAlta = slide("C", "Eb5+G5", "E5+G5", "2/5", "3/5"); // Mib→Mi + Sol
const fa = slide("F", "Eb5+G5", "Eb5+G5", "3/5", "3/5"); // Mib + Sol sul Fa
const sol = slide("G", "Bb4+D5", "B4+D5", "2/5", "3/5"); // Sib→Si + Re
const terzaBassa = slide("C", "Eb4+G4", "E4+G4", "2/5", "3/5"); // Mib→Mi + Sol

export const b_walking_the_blues: Song = {
  slug: "walking-the-blues",
  title: "Walking The Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore con le blue note. La destra suona bicordi in terzine di crome: tre bicordi per ogni movimento, poi una minima.",
    "La sinistra cammina in semiminime come in «Kitty Cat Blues»: fondamentale – terza – quinta – terza, dita 5-3-1-3.",
    "Il gesto del brano è lo scivolamento: il primo bicordio parte dalla blue note (Mib, Sib, Sol#) e scivola di un semitono sulla nota dell'accordo, cambiando dito.",
    "Conta «1-e-a 2-e-a 3 – 4»: le terzine devono essere uguali, senza correre verso la minima.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 72,
      tips: [
        "Battute 1, 3 e 7: Sol col pollice, sopra Mib col 4 che scivola sul Mi col 5.",
        "Battute 2, 4 e 8: terze in alto, Mib+Sol (2 e 5) che diventa Mi+Sol (3 e 5).",
        "Battute 5–6, sul Fa: Mib+Sol per tutta la battuta, senza scivolare (3 e 5).",
        "Battuta 9, sul Sol: Sib+Re che scivola su Si+Re. Battuta 10, sul Fa: Sol#+Do che scivola su La+Do.",
        "Battute 11–12: la stessa idea un'ottava sotto, Mib+Sol che scivola su Mi+Sol.",
      ],
      measures: [
        sesta,
        terzaAlta,
        sesta,
        terzaAlta,
        fa,
        fa,
        sesta,
        terzaAlta,
        sol,
        slide("F", "G#4+C5", "A4+C5", "2/5", "3/5"),
        terzaBassa,
        terzaBassa,
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: varianti e finale",
      tempo: 72,
      firstMeasure: 13,
      tips: [
        "Le battute 13–15 sono uguali alle 1–3.",
        "Battuta 16: sopra il Sol tenuto la nota alta scende Mi – Mib – Re – Do: dita 5, 4, 3, 2 con il pollice fermo sul Sol.",
        "Battute 17–18, sul Fa: La+Do (1 e 3), poi le terzine Sib+Re (2 e 4), poi di nuovo La+Do tenuto.",
        "Battuta 19: Fa#+Do scivola su Sol+Do. Battuta 21: Si+Re senza scivolare.",
        "Battuta 22: sotto il Do fermo la nota bassa scende La – Lab – Sol (3, 2, 1) e porta all'accordo finale Mi+Sol+Do.",
      ],
      measures: [
        sesta,
        terzaAlta,
        sesta,
        m("C", "[G4+E5 G4+E5 G4+E5]:4 [G4+E5 G4+Eb5 G4+D5]:4 G4+C5:8", "1/5 1/5 1/5 1/5 1/4 1/3 1/2"),
        m("F", "A4+C5:8 [Bb4+D5 Bb4+D5 Bb4+D5]:4 [Bb4+D5 Bb4+D5 Bb4+D5]:4", "1/3 2/4 2/4 2/4 2/4 2/4 2/4"),
        m("F", "A4+C5:16", "1/3"),
        slide("C", "F#4+C5", "G4+C5", "2/5", "3/5"),
        sesta,
        slide("G", "B4+D5", "B4+D5", "3/5", "3/5"),
        m("F", "A4+C5:8 [A4+C5 A4+C5 A4+C5]:4 [A4+C5 Ab4+C5 G4+C5]:4", "3/5 3/5 3/5 3/5 3/5 2/5 1/5"),
        m("C", "E4+G4+C5:16", "1/3/5"),
        { chords: ["C"], rh: "C4:16", rf: "1", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
