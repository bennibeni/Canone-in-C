// Blues — «Shuffle Boogie Blues». Note dallo spartito (screenshot): la stessa destra di «Straight Blues»;
// cambia la sinistra, in ritmo «shuffle»: croma puntata + semicroma, quinta e sesta alternate su ogni movimento
// (Do+Sol. Do+La, Fa+Do. Fa+Re, Sol+Re. Sol+Mi). Ultima battuta: Do+Sol tenuto. DITEGGIATURE proposte.
import type { Song } from "../../score";
import { b_straight_blues } from "./straight-blues";

type Ch = "C" | "F" | "G";
const PAIR: Record<Ch, [string, string]> = { C: ["C2+G2", "C2+A2"], F: ["F2+C3", "F2+D3"], G: ["G2+D3", "G2+E3"] };
const lh = (ch: Ch) => Array(4).fill(`${PAIR[ch][0]}:3 ${PAIR[ch][1]}:1`).join(" ");
const LF = "5/2 5/1 5/2 5/1 5/2 5/1 5/2 5/1";

const nParts = b_straight_blues.parts.length;
const parts = b_straight_blues.parts.map((p, pi) => ({
  ...p,
  tempo: 96,
  tips:
    pi === 0
      ? [
          "Sinistra «shuffle»: su ogni movimento una croma puntata (la quinta, dita 5/2) e una semicroma (la sesta, 5/1): lunga-corta, lunga-corta.",
          ...p.tips.filter((t) => !t.startsWith("Prima la sinistra")),
        ]
      : p.tips,
  measures: p.measures.map((ms, i) =>
    pi === nParts - 1 && i === p.measures.length - 1
      ? { ...ms, lh: "C2+G2:16", lf: "5/1" }
      : { ...ms, lh: lh(ms.chords[0] as Ch), lf: LF }
  ),
}));

export const b_shuffle_boogie_blues: Song = {
  ...b_straight_blues,
  slug: "shuffle-boogie-blues",
  title: "Shuffle Boogie Blues",
  fullTips: [
    "Tonalità: Do maggiore. La destra è la stessa di «Straight Blues»; la sinistra passa dalle crome dritte allo «shuffle».",
    "Shuffle: ogni movimento è diviso in lunga-corta (croma puntata + semicroma). Sul Do: Do+Sol lunga, Do+La corta; sul Fa Fa+Do / Fa+Re; sul Sol Sol+Re / Sol+Mi.",
    "Conta «uno-e, due-e» spostando la «e» verso il battito dopo; quando va da sola, aggiungi gli accordi della destra.",
  ],
  parts,
};
