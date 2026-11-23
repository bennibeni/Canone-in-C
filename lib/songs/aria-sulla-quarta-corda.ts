// Aria sulla IV corda (J. S. Bach, dalla Suite n. 3 BWV 1068), adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in Do maggiore: la prima sezione dell'Aria, 12 battute.
// Note e DITEGGIATURE lette dallo spartito; le poche note senza dito stampato hanno un dito proposto
// (accordo di battuta 3, Re–Do di battuta 10, Do di battuta 11, sinistra sulle note ribattute).
// Battute 5 e 7: la destra ha due voci (una minima tenuta sopra le crome). L'app suona una voce sola:
// la minima diventa una semiminima, seguita dalla voce inferiore.
// Battuta 9: nello spartito il Si3 della sinistra ha la sostituzione 2→1; qui c'è il 2.
// Pubblicato con il permesso dell'editore (Nuova Carisch).
import type { Song } from "../score";

export const ariaQuartaCorda: Song = {
  slug: "aria-sulla-quarta-corda",
  title: "Aria sulla IV corda",
  composer: "Johann Sebastian Bach, Suite n. 3 BWV 1068",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "C",
  progression: ["C", "Am", "Fmaj7", "G7", "C7/E", "A7", "Dm", "G7"],
  progressionLabel: "il basso scende per gradi",
  fullTips: [
    "Adagio, mf espressivo: melodia e accompagnamento più legati possibile, per un'atmosfera raccolta.",
    "Il basso scende quasi sempre per gradi (Do – Si – La – Sol – Fa…): ascoltalo come una seconda melodia.",
    "Attenzione alle alterazioni che valgono per tutta la battuta: Si♭ in battuta 5, Do♯ in battuta 6.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema",
      focus: "Battute 1–4: accordi tenuti sopra il basso che scende, poi la melodia",
      tempo: 56,
      tips: [
        "Battute 1–2: la destra tiene l'accordo (1-3-5) per tutta la battuta; la sinistra scende Do – Si – La – Sol, legato.",
        "Battuta 3: la melodia parte dal La acuto col 5 e scende; il 3 sul Si passa sopra al pollice.",
        "Battuta 3, sinistra: Fa – Fa♯, il primo cromatismo del brano.",
        "Battuta 4: Si puntato, La, Sol lungo: lascia respirare la fine della frase.",
      ],
      measures: [
      { chords: ["C", "C/B"], rh: "G4+C5+E5:16", lh: "C4:4 C4:4 B3:4 B3:4", rf: "1/3/5", lf: "1 1 2 2" },
      { chords: ["Am", "Am/G"], rh: "A4+C5+E5:16", lh: "A3:4 A3:4 G3:4 G3:4", rf: "1/3/5", lf: "1 1 2 2" },
      { chords: ["Fmaj7", "F#ø7"], rh: "A4+C5+E5:4 A5:2 F5:2 D5:2 C5:2 B4:2 C5:2", lh: "F3:8 F#3:8", rf: "1/3/5 5 4 2 1 3 4", lf: "3 2" },
      { chords: ["G", "G7"], rh: "B4:6 A4:2 G4:8", lh: "G3:4 G2:4 G3:4 F3:4", rf: "3 2 1", lf: "1 5 1 2" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Le voci intrecciate",
      focus: "Battute 5–8: due voci nella destra e cromatismi",
      tempo: 56,
      firstMeasure: 5,
      tips: [
        "Battute 5 e 7: nello spartito la nota acuta (Sol, poi Fa) è una minima tenuta mentre sotto si muovono le crome; l'app la accorcia a un quarto.",
        "Battuta 5: Si♭ – La – Si♭, il bemolle vale per tutta la battuta.",
        "Battuta 6: salti di quinta (La – Mi) e il Do♯; la sinistra suona Do♯ – La – Do♯.",
        "Battuta 8: stessa figura della 6, un tono sotto, verso il Sol.",
      ],
      measures: [
      { chords: ["C7/E", "Gm/D"], rh: "G5:4 Bb4:2 A4:2 Bb4:4 G5:2 Bb4:2", lh: "E3:8 D3:8", rf: "5 2 1 2 5 2", lf: "1 2" },
      { chords: ["A7/C#", "A7"], rh: "A4:2 E5:2 Bb4:2 A4:2 D5:2 C#5:2 G5:2 F5:2", lh: "C#3:8 A2:4 C#3:4", rf: "1 5 2 1 3 2 5 4", lf: "3 5 2" },
      { chords: ["Dm", "Dm/C"], rh: "F5:4 D5:2 C5:2 D5:2 E5:2 F5:2 D5:2", lh: "D3:8 C3:8", rf: "4 2 1 2 3 4 2", lf: "1 2" },
      { chords: ["G/B", "G7"], rh: "G4:2 D5:2 A4:2 G4:2 C5:2 B4:2 F5:2 E5:2", lh: "B2:8 G2:4 G3:4", rf: "1 5 2 1 3 2 5 4", lf: "3 5 1" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "La conclusione",
      focus: "Battute 9–12: semicrome e cadenza su Sol",
      tempo: 56,
      firstMeasure: 9,
      tips: [
        "Battuta 9: Mi lungo (minima puntata) col 3, poi Fa♯ – Sol con 4 e 5.",
        "Battuta 9, sinistra: Do – Do (ottava sopra) – Si – Si (ottava sotto); sul Si3 lo spartito indica di cambiare dito, 2 → 1.",
        "Battute 10–11: le coppie di semicrome vanno legate senza correre; crescendo e diminuendo in battuta 11.",
        "Battuta 12: accordo finale piano, Sol a entrambe le mani.",
      ],
      measures: [
      { chords: ["C", "Em/B"], rh: "E5:12 F#5:2 G5:2", lh: "C3:4 C4:4 B3:4 B2:4", rf: "3 4 5", lf: "5 1 2 4" },
      { chords: ["Am", "D7"], rh: "C5:4 C5:1 D5:1 E5:2 E5:2 D5:2 D5:2 C5:2", lh: "A2:4 A3:4 F#3:4 D3:4", rf: "1 3 4 5 5 4 4 3", lf: "5 1 3 5" },
      { chords: ["G", "Am/C", "D7", "D7"], rh: "B4:2 A4:2 A4:1 B4:1 C5:2 C5:4 B4:2 A4:2", lh: "G3:4 C3:4 D3:4 D2:4", rf: "2 1 2 3 4 4 3 2", lf: "1 5 1 5" },
      { chords: ["G"], rh: "G4:16", lh: "G2:16", rf: "1", lf: "1" },
      ],
    },
  ],
};
