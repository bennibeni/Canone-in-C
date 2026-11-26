// Blues — «First Nola Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»).
// «Nola» = New Orleans: la sinistra suona il ritmo 3+3+2 (semiminima puntata, semiminima puntata, semiminima)
// su fondamentale, terza e quinta. Destra: accordi a sincope (Sol + Mi+Sol, con la blue note Mib) e brevi frasi.
// DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const LH: Record<Ch, string> = { C: "C2:6 E2:6 G2:4", F: "F2:6 A2:6 C3:4", G: "G2:6 B2:6 D3:4" };
const m = (ch: Ch, rh: string, rf: string) => ({ chords: [ch], rh, rf, lh: LH[ch], lf: "5 3 1" });

const CH = "G4+E5+G5", CHB = "G4+Eb5+G5", CH3 = "G4+C5+E5";
const FA9 = "A4+Eb5+G5", FA7 = "F4+A4+Eb5";

const b1 = m("C", `r:4 ${CH}:4 ${CH}:2 ${CH}:2 r:4`, "1/4/5 1/4/5 1/4/5");
const b2 = m("C", `${CH}:2 ${CH}:4 ${CH}:6 C5:2 G4:2`, "1/4/5 1/4/5 1/4/5 4 1");
const b13 = m("C", `r:4 ${CH}:4 ${CHB}:2 ${CH}:2 r:4`, "1/4/5 1/3/5 1/4/5");

export const b_first_nola_blues: Song = {
  slug: "first-nola-blues",
  title: "First Nola Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. «Nola» sta per New Orleans: la sinistra suona il ritmo 3+3+2 (semiminima puntata, semiminima puntata, semiminima).",
    "Sinistra: fondamentale – terza – quinta su questo ritmo (Do – Mi – Sol, Fa – La – Do, Sol – Si – Re), dita 5-3-1. Conta «1-2-3, 1-2-3, 1-2».",
    "Destra: accordi a sincope, spesso sul levare. La forma base è Sol + Mi+Sol sopra (dita 1/4/5); il Mib è la blue note.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 96,
      tips: [
        "Battute 1, 3, 7, 11: pausa, accordo sul secondo movimento, due crome e pausa.",
        "Battute 2, 8, 12: croma, semiminima, semiminima puntata (sincope), poi la piccola frase Do – Sol.",
        "Battuta 4: Mi+Sol, Mib+Sol (croma) e di nuovo Mi+Sol: la terza scivola sulla blue note e torna.",
        "Battute 5–6, sul Fa: La + Mib+Sol (1/4/5), il suono del Fa9; nella 5 la frase Do – La.",
        "Battuta 9, sul Sol: Sol + Mi+Sol che scende a Sol + Re+Fa (il Sol7). Battuta 10: Fa+La+Mib e la frase Re – Do.",
        "La sinistra non va mai a tempo con la destra: impara il 3+3+2 da solo, poi aggiungi gli accordi lentamente.",
      ],
      measures: [
        b1,
        b2,
        b1,
        m("C", `${CH}:4 ${CHB}:2 ${CH}:6 r:4`, "1/4/5 1/3/5 1/4/5"),
        m("F", `r:4 ${FA9}:4 ${FA9}:2 ${FA9}:2 C5:2 A4:2`, "1/4/5 1/4/5 1/4/5 2 1"),
        m("F", `${FA9}:2 ${FA9}:4 ${FA9}:6 A4:4`, "1/4/5 1/4/5 1/4/5 1"),
        b1,
        b2,
        m("G", `${CH}:4 ${CH}:2 G4+D5+F5:6 G4:4`, "1/4/5 1/4/5 1/3/4 1"),
        m("F", `r:4 ${FA7}:4 ${FA7}:2 ${FA7}:2 D5:2 C5:2`, "1/2/5 1/2/5 1/2/5 4 3"),
        b1,
        b2,
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: blue note e melodia",
      tempo: 96,
      firstMeasure: 13,
      tips: [
        "Battute 13 e 15 (1 e 3 della parte): come nel primo giro, ma la prima croma è Mib+Sol che scivola su Mi+Sol.",
        "Battuta 14 (2): Mi+Sol, Mib+Sol, Mi+Sol in sincope, poi Do – Sol. Battuta 16 (4): finisce con Sol – Sol# verso il La.",
        "Battuta 17 (5), sul Fa: melodia La – Mib – Re – Do in semiminime (1-4-3-2).",
        "Battuta 18 (6): Fa+La+Do+Mib (il Fa7, dita 1-2-3-5), Fa+La+Do e la frase Re – Do.",
        "Battute 21–22 (9–10): melodia in crome, La – Do – Re – La, Do, Re; poi Mib – Re – Do – Sol – Sol# – La – Do – La.",
        "Ultima battuta: l'accordo Sol+Do+Mi tenuto, con il Do grave alla sinistra.",
      ],
      measures: [
        b13,
        m("C", `${CH}:2 ${CHB}:4 ${CH}:6 C5:2 G4:2`, "1/4/5 1/3/5 1/4/5 4 1"),
        b13,
        m("C", `${CHB}:2 ${CHB}:4 ${CHB}:6 G4:2 G#4:2`, "1/3/5 1/3/5 1/3/5 1 2"),
        m("F", "A4:4 Eb5:4 D5:4 C5:4", "1 4 3 2"),
        m("F", "F4+A4+C5+Eb5:2 F4+A4+C5+Eb5:4 F4+A4+C5:6 D5:2 C5:2", "1/2/3/5 1/2/3/5 1/2/3 4 3"),
        m("C", `E5:2 ${CH3}:4 r:2 r:8`, "5 1/3/5"),
        m("C", `${CH3}:2 ${CH3}:4 ${CH3}:6 G4:2 G#4:2`, "1/3/5 1/3/5 1/3/5 1 2"),
        m("G", "A4:2 C5:2 D5:2 A4:2 C5:2 D5:6", "1 2 3 1 2 3"),
        m("F", "Eb5:2 D5:2 C5:2 G4:2 G#4:2 A4:2 C5:2 A4:2", "5 4 3 1 1 2 4 2"),
        m("C", `r:4 ${CH}:4 ${CHB}:2 ${CH}:6`, "1/4/5 1/3/5 1/4/5"),
        { chords: ["C"], rh: `${CH3}:16`, rf: "1/3/5", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
