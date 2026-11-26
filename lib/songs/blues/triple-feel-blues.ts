// Blues — «Triple Feel Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»).
// Lo spartito indica che due crome si suonano come terzina (semiminima + croma di terzina): «triple feel», cioè
// swing. Qui le coppie di crome sono scritte direttamente così, in entrambe le mani.
// Sinistra: crome quinta, quinta, sesta, sesta (Do+Sol, Do+La). Destra: accordi alternati al basso singolo
// (Do+Mi+Sol – Do – Do+Fa+La – Do), il IV sopra il I del boogie. DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const sw = (a: string, b: string) => `[${a}:2 ${b}]:4`;
const PAIR: Record<Ch, [string, string]> = { C: ["C2+G2", "C2+A2"], F: ["F2+C3", "F2+D3"], G: ["G2+D3", "G2+E3"] };
const lhHalf = (ch: Ch) => `${sw(PAIR[ch][0], PAIR[ch][0])} ${sw(PAIR[ch][1], PAIR[ch][1])}`;
const LH = (ch: Ch) => `${lhHalf(ch)} ${lhHalf(ch)}`;
const LF = "5/2 5/2 5/1 5/1 5/2 5/2 5/1 5/1";
const m = (ch: Ch, rh: string, rf: string) => ({ chords: [ch], rh, rf, lh: LH(ch), lf: LF });

const CEG = "C4+E4+G4", CFA = "C4+F4+A4", C = "C4";
const FAC = "F4+A4+C5", FBD = "F4+Bb4+D5", F = "F4";
const GBD = "G4+B4+D5", GCE = "G4+C5+E5", GDF = "G4+D5+F5", G = "G4";

const groove = `${sw(CEG, C)} ${sw(CFA, C)}`;
const grooveF = "1/3/5 1 1/3/5 1";
const corto = m("C", `${sw(CEG, C)} ${CFA}:4 ${CEG}:8`, "1/3/5 1 1/3/5 1/3/5");
const lungo = m("C", `${sw(CEG, C)} ${CFA}:4 ${sw(CEG, C)} ${CFA}:4`, "1/3/5 1 1/3/5 1/3/5 1 1/3/5");
const fa = m("F", `${sw(FAC, F)} ${sw(FBD, F)} ${sw(FAC, F)} ${sw(FBD, F)}`, "1/3/5 1 1/3/5 1 1/3/5 1 1/3/5 1");
const sol = m("G", `${sw(GBD, G)} ${sw(GCE, G)} ${sw(GBD, G)} ${sw(GCE, G)}`, "1/3/5 1 1/3/5 1 1/3/5 1 1/3/5 1");
const tutto = m("C", `${groove} ${groove}`, `${grooveF} ${grooveF}`);
const settima = m("C", `${groove} ${sw("C4+E4+Bb4", C)} ${sw(CFA, C)}`, `${grooveF} 1/2/5 1 1/3/5 1`);

export const b_triple_feel_blues: Song = {
  slug: "triple-feel-blues",
  title: "Triple Feel Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. In testa allo spartito c'è l'indicazione: due crome = semiminima + croma di terzina. È lo swing («triple feel»): lunga-corta, lunga-corta. Nell'app è già scritto così.",
    "Sinistra: crome a coppie, Do+Sol, Do+Sol, Do+La, Do+La (dita 5/2, 5/2, 5/1, 5/1); sul Fa e sul Sol la stessa forma.",
    "Destra: accordo e Do singolo alternati. L'accordo passa da Do+Mi+Sol a Do+Fa+La (il Fa sopra il Do): con il pollice fermo sul Do muovi solo 3 e 5 di un tasto.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 92,
      tips: [
        "Battute 1, 2, 4, 8: Do+Mi+Sol e Do (swing), Do+Fa+La, poi Do+Mi+Sol tenuto per due movimenti.",
        "Battute 3 e 7: lo stesso gesto due volte nella battuta.",
        "Battute 5, 6, 10, sul Fa: Fa+La+Do e Fa, Fa+Sib+Re e Fa: pollice fermo sul Fa, sopra 3 e 5 salgono di un tasto e tornano.",
        "Battuta 9, sul Sol: Sol+Si+Re e Sol, Sol+Do+Mi e Sol: stesso movimento.",
        "Il pollice suona sempre la nota singola: tienilo leggero e lascia che la mano «rimbalzi» tra accordo e nota.",
      ],
      measures: [corto, corto, lungo, corto, fa, fa, lungo, corto, sol, fa, tutto,
        m("C", `${groove} ${CEG}:8`, `${grooveF} 1/3/5`)],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: settima, accordi in alto e finale",
      tempo: 92,
      firstMeasure: 13,
      tips: [
        "Battute 14 e 16 (2 e 4 della parte): nella seconda metà Do+Mi+Sib (1/2/5), la settima del Do7.",
        "Battuta 17 (5): due coppie in swing e poi Fa+La+Do tenuto. Battuta 18 (6): Fa+La+Do, Fa+Sib+Re e Fa+La+Do tenuto.",
        "Battute 19–20 (7–8): la mano sale: Do+Mi+Sol e Do+Mi+La sopra il Do centrale, alternati al La (2/3/5 sugli accordi, pollice sul La).",
        "Battuta 21 (9), sul Sol: Sol+Si+Re, Sol+Do+Mi, poi Sol+Re+Fa (il Sol7) e Sol+Si+Re.",
        "Ultima battuta: Do+Mi+Sol, Do, poi le terze scendono Mib+Solb – Re+Fa fino a Do+Mi.",
      ],
      measures: [
        tutto,
        settima,
        tutto,
        settima,
        m("F", `${sw(FAC, F)} ${sw(FBD, F)} ${FAC}:8`, "1/3/5 1 1/3/5 1 1/3/5"),
        m("F", `${FAC}:4 ${FBD}:4 ${FAC}:8`, "1/3/5 1/3/5 1/3/5"),
        m("C", `${sw("C5+E5+G5", "A4")} ${sw("C5+E5+A5", "A4")} ${sw("C5+E5+G5", "A4")} ${sw("C5+E5+A5", "A4")}`,
          "2/3/5 1 2/3/5 1 2/3/5 1 2/3/5 1"),
        m("C", `${sw("C5+E5+G5", "A4")} ${sw("C5+E5+A5", "A4")} C5+E5+G5:8`, "2/3/5 1 2/3/5 1 2/3/5"),
        m("G", `${sw(GBD, G)} ${sw(GCE, G)} ${sw(GDF, G)} ${sw(GBD, G)}`, "1/3/5 1 1/3/5 1 1/4/5 1 1/3/5 1"),
        m("F", `${sw(FAC, F)} ${sw(FBD, F)} ${sw("F4+C5+Eb5", F)} ${sw(FAC, F)}`, "1/3/5 1 1/3/5 1 1/4/5 1 1/3/5 1"),
        m("C", `${groove} ${sw("C4+E4+Bb4", C)} ${sw(CFA, C)}`, `${grooveF} 1/2/5 1 1/3/5 1`),
        { chords: ["C"], rh: `${sw(CEG, C)} ${sw("Eb4+Gb4", "D4+F4")} C4+E4:8`, rf: "1/3/5 1 2/4 1/3 1/3",
          lh: `${lhHalf("C")} C2+G2:8`, lf: "5/2 5/2 5/1 5/1 5/1" },
      ],
    },
  ],
};
