// Blues — «Kitty Cat Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do; sinistra in semiminime fondamentale – terza – quinta – terza,
// destra quasi tutta a seste (Sol+Mi, Do sopra il Mi) con lo scivolamento cromatico Solb+Mib.
// Battute 7 e 19: la nota bassa dell'accordo della destra è il Mi sotto il Do centrale (Mi3, due tagli addizionali).
// Le DITEGGIATURE sono proposte (lo spartito non le indica): le seste si suonano con 1 e 5.
import type { Song } from "../../score";

const lh = {
  C: { lh: "C2:4 E2:4 G2:4 E2:4", lf: "5 3 1 3" },
  F: { lh: "F2:4 A2:4 C3:4 A2:4", lf: "5 3 1 3" },
  G: { lh: "G2:4 B2:4 D3:4 B2:4", lf: "5 3 1 3" },
};
const m = (chord: "C" | "F" | "G", rh: string, rf?: string) => ({ chords: [chord], rh, ...(rf ? { rf } : {}), ...lh[chord] });

const sesta = m("C", "G4+E5:12 Gb4+Eb5:4", "1/5 1/5");
const giroFa = m("F", "C4:2 C4:2 Eb4:2 C4:2 F4:4 E4:4", "1 1 2 1 3 2");

export const b_kitty_cat_blues: Song = {
  slug: "kitty-cat-blues",
  title: "Kitty Cat Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore con le blue note. La destra suona soprattutto bicordi (due note insieme): imparali prima come forme della mano.",
    "La sinistra cammina in semiminime: fondamentale – terza – quinta – terza (Do–Mi–Sol–Mi, Fa–La–Do–La, Sol–Si–Re–Si). Dita 5-3-1-3.",
    "Il brano è fatto di due giri di 12 battute: il secondo cambia solo le battute 14, 16 e 22.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 84,
      tips: [
        "Battute 1–2: la sesta Sol+Mi con pollice e mignolo, poi la mano scivola di un semitono su Solb+Mib senza cambiare forma.",
        "Battuta 4: Mi+Sib è il tritono del Do7 (pollice e 4).",
        "Battuta 6: Do Do Mib Do in crome, poi Fa e Mi: dita 1-1-2-1-3-2.",
        "Battuta 7: l'accordo scende sotto il Do centrale, Mi3+Do4: sposta la mano e tieni la forma della sesta.",
        "Battuta 10: Mib – Mi – Mib – Re è la terza blues che oscilla: dita 3-4-3-2.",
      ],
      measures: [
        sesta,
        sesta,
        m("C", "E4+C5:12 G4:4", "1/5 3"),
        m("C", "E4+Bb4:16", "1/4"),
        m("F", "C4+A4:16", "1/5"),
        giroFa,
        m("C", "E3+C4:16", "1/5"),
        m("C", "r:16"),
        m("G", "Gb4+Eb5:8 F4+D5:8", "1/5 1/5"),
        m("F", "Eb5:4 E5:4 Eb5:4 D5:4", "3 4 3 2"),
        m("C", "E4+C5:16", "1/5"),
        m("C", "C4:16", "1"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: le stesse forme, con qualche variante",
      tempo: 84,
      firstMeasure: 13,
      tips: [
        "Battuta 14: tre bicordi, Sol+Mi (minima), Mi+Do e Solb+Mib (semiminime), tutti con 1 e 5.",
        "Battuta 16: dopo Mi+Do salgono Sol e Sol#, che porta al La della battuta 17.",
        "Battuta 22: le seste scivolano per semitoni, Solb+Mib – Sol+Mi – Solb+Mib – Fa+Re, sempre con 1 e 5.",
        "Ultima battuta: la destra chiude sul Do centrale e la sinistra con un Do grave tenuto.",
      ],
      measures: [
        sesta,
        m("C", "G4+E5:8 E4+C5:4 Gb4+Eb5:4", "1/5 1/5 1/5"),
        sesta,
        m("C", "E4+C5:8 G4:4 G#4:4", "1/5 3 4"),
        m("F", "C4+A4:16", "1/5"),
        giroFa,
        m("C", "E3+C4:16", "1/5"),
        m("C", "r:16"),
        m("G", "Gb4+Eb5:8 F4+D5:8", "1/5 1/5"),
        m("F", "Gb4+Eb5:4 G4+E5:4 Gb4+Eb5:4 F4+D5:4", "1/5 1/5 1/5 1/5"),
        m("C", "E4+C5:16", "1/5"),
        { chords: ["C"], rh: "C4:16", rf: "1", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
