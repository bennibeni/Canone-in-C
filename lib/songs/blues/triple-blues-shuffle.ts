// Blues — «Triple Blues Shuffle». Note dallo spartito (screenshot): due giri di blues di 12 battute in Do.
// Destra: terze in terzine di crome (Mi+Sol in alto nel primo giro, Mi+Sol al centro nel secondo), con lo
// scivolamento sulle blue note (Mib+Solb → Re+Fa → Do+Mi). Sinistra: shuffle come in «Shuffle Boogie Blues»
// (croma puntata + semicroma, quinta e sesta). DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const PAIR: Record<Ch, [string, string]> = { C: ["C2+G2", "C2+A2"], F: ["F2+C3", "F2+D3"], G: ["G2+D3", "G2+E3"] };
const lh = (ch: Ch) => Array(4).fill(`${PAIR[ch][0]}:3 ${PAIR[ch][1]}:1`).join(" ");
const LF = "5/2 5/1 5/2 5/1 5/2 5/1 5/2 5/1";
const m = (ch: Ch, rh: string, rf: string) => ({ chords: [ch], rh, rf, lh: lh(ch), lf: LF });
const t = (a: string, b: string, c: string) => `[${a} ${b} ${c}]:4`;
const f = (s: string, n: number) => Array(n).fill(s).join(" ");

const EG = "E5+G5", EGb = "Eb5+Gb5", DF = "D5+F5", CE = "C5+E5", CEb = "C5+Eb5";
const eg = "E4+G4", egb = "Eb4+Gb4";

const giroAlto = m("C", f(t(EG, EG, EG), 4), f("3/5", 12));
const discesa = m("C", `${t(EG, EG, EG)} ${t(EG, EGb, DF)} ${CE}:8`, "3/5 3/5 3/5 3/5 3/5 2/4 1/3");
const salita = (ch: Ch, end: string, endF: string, rest = true) =>
  m(ch, `${rest ? "r:4" : ""} ${t(CE, DF, EGb)} ${end}:8`.trim(), `1/3 2/4 3/5 ${endF}`);
const scivola = `${t(egb, eg, eg)} ${t(eg, eg, eg)}`;
const scivolaF = "2/4 2/4 2/4 2/4 2/4 2/4";
const faScivola = `${t("Ab4+C5", "A4+C5", "A4+C5")} ${t("A4+C5", "A4+C5", "A4+C5")}`;

export const b_triple_blues_shuffle: Song = {
  slug: "triple-blues-shuffle",
  title: "Triple Blues Shuffle",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. La destra suona terze in terzine di crome (tre per movimento), la sinistra lo shuffle (croma puntata + semicroma) di «Shuffle Boogie Blues».",
    "Terzine contro shuffle: le due mani dividono il movimento in modo diverso (3 contro lunga-corta). Impara le mani separate, poi uniscile molto lentamente.",
    "Il gesto della destra: la terza scende per semitoni Mi+Sol → Mib+Solb → Re+Fa → Do+Mi (o sale al contrario sul Sol e sul Fa).",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro",
      focus: "Battute 1–12: terze in alto",
      tempo: 84,
      tips: [
        "Battute 1, 3, 7: dodici terze Mi+Sol sopra il Do centrale (3 e 5), leggere e regolari.",
        "Battute 2, 4, 8: dopo le terzine, Mi+Sol – Mib+Solb – Re+Fa (3/5, 3/5, 2/4) e la minima Do+Mi (1/3).",
        "Battute 5–6, sul Fa: terze Do+Mib (3/5); nella 6 scendono Do+Mib – Sib+Re – La+Do (3/5, 2/4, 1/3).",
        "Battute 9–10: pausa, poi la terza sale Do+Mi – Re+Fa – Mib+Solb (1/3, 2/4, 3/5) fino a Mi+Sol (Sol) o Re+Fa (Fa).",
        "Battuta 11: Do+Mi tenuto, poi le terze scendono un'ottava sotto Mi+Sol – Mib+Solb – Re+Fa verso il Do+Mi finale.",
      ],
      measures: [
        giroAlto,
        discesa,
        giroAlto,
        discesa,
        m("F", f(t(CEb, CEb, CEb), 4), f("3/5", 12)),
        m("F", `${t(CEb, CEb, CEb)} ${t(CEb, "Bb4+D5", "A4+C5")} ${CEb}:8`, "3/5 3/5 3/5 3/5 2/4 1/3 3/5"),
        giroAlto,
        discesa,
        salita("G", EG, "3/5"),
        salita("F", DF, "2/4"),
        m("C", `${CE}:12 ${t(eg, egb, "D4+F4")}`, "3/5 3/5 3/5 2/4"),
        m("C", "C4+E4:16", "1/3"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro",
      focus: "Battute 13–24: terze al centro, finale",
      tempo: 84,
      firstMeasure: 13,
      tips: [
        "Battute 13 e 15 (1 e 3 della parte): Mib+Solb scivola su Mi+Sol all'inizio di ogni terzina dispari, con le stesse dita 2/4.",
        "Battute 14 e 16 (2 e 4): due terzine e poi la minima Mi+Sol.",
        "Battute 17–18 (5–6), sul Fa: Lab+Do che scivola su La+Do (2/4).",
        "Battuta 19 (7): Solb+Do, Sol+Do (1/5), la terzina Sol – Sol# – La (1-2-3) e di nuovo Sol+Do.",
        "Battuta 21 (9), sul Sol: due volte la salita Do+Mi – Re+Fa – Mib+Solb e Mi+Sol.",
        "Finale: Mib+Solb e Re+Fa, poi Do+Mi tenuto, Mib+Do e l'accordo Mi+Do.",
      ],
      measures: [
        m("C", `${scivola} ${scivola}`, `${scivolaF} ${scivolaF}`),
        m("C", `${scivola} ${eg}:8`, `${scivolaF} 2/4`),
        m("C", `${scivola} ${scivola}`, `${scivolaF} ${scivolaF}`),
        m("C", `${scivola} ${eg}:8`, `${scivolaF} 2/4`),
        m("F", `${faScivola} ${faScivola}`, `${scivolaF} ${scivolaF}`),
        m("F", `${faScivola} A4+C5:8`, `${scivolaF} 2/4`),
        m("C", "Gb4+C5:4 G4+C5:4 [G4 G#4 A4]:4 G4+C5:4", "1/5 1/5 1 2 3 1/5"),
        m("C", "E4+G4+C5:16", "1/2/5"),
        m("G", `${t(CE, DF, EGb)} ${EG}:4 ${t(CE, DF, EGb)} ${EG}:4`, "1/3 2/4 3/5 3/5 1/3 2/4 3/5 3/5"),
        m("F", `r:8 ${EGb}:4 ${DF}:4`, "3/5 2/4"),
        m("C", `${CE}:12 Eb4+C5:4`, "2/4 1/5"),
        { chords: ["C"], rh: "E4+C5:16", rf: "1/5", lh: "C2+G2:16", lf: "5/1" },
      ],
    },
  ],
};
