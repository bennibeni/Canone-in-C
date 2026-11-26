// Blues — «Straight Blues». Note dallo spartito (screenshot): due giri di blues di 12 battute in Do.
// Sinistra in crome dritte (straight eighths): fondamentale + quinta due volte, fondamentale + sesta due volte.
// Destra: accordi lunghi con lo scivolamento sulle blue note (Mib+Solb), il Fa con il Sib+Re di passaggio e
// i Sol che oscillano Sib+Reb ↔ Si+Re. DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const LH: Record<Ch, string> = {
  C: "C2+G2:2 C2+G2:2 C2+A2:2 C2+A2:2 C2+G2:2 C2+G2:2 C2+A2:2 C2+A2:2",
  F: "F2+C3:2 F2+C3:2 F2+D3:2 F2+D3:2 F2+C3:2 F2+C3:2 F2+D3:2 F2+D3:2",
  G: "G2+D3:2 G2+D3:2 G2+E3:2 G2+E3:2 G2+D3:2 G2+D3:2 G2+E3:2 G2+E3:2",
};
const LF = "5/2 5/2 5/1 5/1 5/2 5/2 5/1 5/1";
const m = (chord: Ch, rh: string, rf: string) => ({ chords: [chord], rh, rf, lh: LH[chord], lf: LF });

const DO = "E4+G4+C5";
const DOB = "Eb4+Gb4+C5";
const FA = "F4+A4+C5";
const SIB = "F4+Bb4+D5";
const SOL = "G4+B4+D5";
const SOLB = "G4+Bb4+Db5";
const FAB = "F4+Ab4+B4";

export const b_straight_blues: Song = {
  slug: "straight-blues",
  title: "Straight Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. «Straight» vuol dire crome dritte: la sinistra suona otto crome uguali per battuta, senza swing.",
    "Sinistra: due volte la quinta (Do+Sol) e due volte la sesta (Do+La), mignolo fermo sulla fondamentale (dita 5/2 e 5/1). Sul Fa e sul Sol la stessa forma.",
    "Destra: accordi lunghi. Il gesto tipico è l'accordo di Do che scivola su Mib+Solb+Do e torna su Mi+Sol+Do.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 104,
      tips: [
        "Battute 1–2: Mi+Sol+Do (1-2-5) per tre movimenti, poi Mib+Solb+Do (2-3-5) sull'ultimo.",
        "Battuta 3: Do+Mi+La, poi le terze salgono Re+Fa → Mib+Solb → Mi+Sol (battuta 4).",
        "Battuta 5, sul Fa: Fa+La+Do, poi Fa+Sib+Re di passaggio, e di nuovo Fa+La+Do.",
        "Battuta 9, sul Sol: Sol+Si+Re, poi Sib+Reb e Si+Re (la terza e la quinta scivolano).",
        "Prima la sinistra da sola: le crome devono essere regolarissime.",
      ],
      measures: [
        m("C", `${DO}:12 ${DOB}:4`, "1/2/5 2/3/5"),
        m("C", `${DO}:12 ${DOB}:4`, "1/2/5 2/3/5"),
        m("C", "C4+E4+A4:8 D4+F4:4 Eb4+Gb4:4", "1/2/5 1/3 2/4"),
        m("C", `${DO}:16`, "1/2/5"),
        m("F", `${FA}:12 ${SIB}:4`, "1/3/5 1/3/5"),
        m("F", `${FA}:16`, "1/3/5"),
        m("C", "E4+G4:12 Eb4+Gb4:4", "1/3 2/4"),
        m("C", "C4+E4:16", "1/3"),
        m("G", `${SOL}:8 Bb4+Db5:4 B4+D5:4`, "1/3/5 2/4 3/5"),
        m("F", `${FA}:12 Eb4+Gb4:4`, "1/3/5 2/4"),
        m("C", `${DO}:16`, "1/2/5"),
        m("C", "C4+E4+G4:16", "1/3/5"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro",
      focus: "Battute 13–24: accordi che oscillano",
      tempo: 104,
      firstMeasure: 13,
      tips: [
        "Battute 13, 15, 19 (1, 3, 7 della parte): due minime, Mi+Sol+Do e Mib+Solb+Do.",
        "Battuta 17 (5), sul Fa: Fa+La+Do, Fa+Lab+Do, Fa+La+Do: il La scivola sul Lab (la blue note del Fa) e torna.",
        "Battuta 21 (9), sul Sol: quattro accordi che oscillano, Sol+Si+Re e Sol+Sib+Reb (1-3-5).",
        "Battuta 22 (10), sul Fa: Fa+La+Do alternato con Fa+Lab+Si (1-3-4).",
        "Battuta 23 (11): Do+Mi+Sol e Do+Mib+Solb, due minime; poi l'accordo finale.",
      ],
      measures: [
        m("C", `${DO}:8 ${DOB}:8`, "1/2/5 2/3/5"),
        m("C", `${DO}:16`, "1/2/5"),
        m("C", `${DO}:8 ${DOB}:8`, "1/2/5 2/3/5"),
        m("C", `${DO}:16`, "1/2/5"),
        m("F", `${FA}:4 F4+Ab4+C5:4 ${FA}:8`, "1/3/5 1/3/5 1/3/5"),
        m("F", `${FA}:4 ${SIB}:4 ${FA}:8`, "1/3/5 1/3/5 1/3/5"),
        m("C", `${DO}:8 ${DOB}:8`, "1/2/5 2/3/5"),
        m("C", `${DO}:16`, "1/2/5"),
        m("G", `${SOL}:4 ${SOLB}:4 ${SOL}:4 ${SOLB}:4`, "1/3/5 1/3/5 1/3/5 1/3/5"),
        m("F", `${FA}:4 ${FAB}:4 ${FA}:4 ${FAB}:4`, "1/3/5 1/3/4 1/3/5 1/3/4"),
        m("C", "C4+E4+G4:8 C4+Eb4+Gb4:8", "1/3/5 1/3/5"),
        m("C", "C4+E4+G4:16", "1/3/5"),
      ],
    },
  ],
};
