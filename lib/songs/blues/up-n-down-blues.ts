// Blues — «Up 'n' Down Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// la stessa destra di «First Boogie Blues» (terze con lo scivolamento Mib+Solb → Mi+Sol); cambia la sinistra,
// che alterna quinta e sesta sopra la fondamentale (Do+Sol, Do+La): la nota alta sale e scende, «up 'n' down».
// Differenza alla destra: l'ultima battuta è Do+Mi. DITEGGIATURE proposte.
import type { Song } from "../../score";
import { b_first_boogie_blues } from "./first-boogie-blues";

type Ch = "C" | "F" | "G";
const LH: Record<Ch, string> = {
  C: "C2+G2:4 C2+A2:4 C2+G2:4 C2+A2:4",
  F: "F2+C3:4 F2+D3:4 F2+C3:4 F2+D3:4",
  G: "G2+D3:4 G2+E3:4 G2+D3:4 G2+E3:4",
};
const LF = "5/2 5/1 5/2 5/1";

const parts = b_first_boogie_blues.parts.map((p, pi) => ({
  ...p,
  measures: p.measures.map((ms, i) => {
    const last = pi === b_first_boogie_blues.parts.length - 1 && i === p.measures.length - 1;
    if (last) return { chords: ["C"], rh: "C4+E4:16", rf: "1/3", lh: "C2+G2:16", lf: "5/1" };
    return { ...ms, lh: LH[ms.chords[0] as Ch], lf: LF };
  }),
}));
parts[0] = {
  ...parts[0],
  tips: [
    "Sinistra: il mignolo resta sulla fondamentale, sopra si alternano quinta e sesta (Do+Sol, Do+La) con 2 e 1.",
    ...parts[0].tips,
  ],
};

export const b_up_n_down_blues: Song = {
  ...b_first_boogie_blues,
  slug: "up-n-down-blues",
  title: "Up 'n' Down Blues",
  fullTips: [
    "Tonalità: Do maggiore. È «First Boogie Blues» con una sinistra nuova: sopra la fondamentale la nota alta va su e giù tra quinta e sesta.",
    "Sul Do: Do+Sol, Do+La; sul Fa: Fa+Do, Fa+Re; sul Sol: Sol+Re, Sol+Mi. Mignolo fermo sulla fondamentale, 2 sulla quinta, 1 sulla sesta.",
    "Prima la sinistra da sola, regolare e leggera; poi aggiungi le terze della destra, che già conosci.",
  ],
  parts,
};
