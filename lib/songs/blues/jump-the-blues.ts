// Blues — «Jump The Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do. La destra suona solo accordi in controtempo:
// nel primo giro sulla seconda croma di ogni movimento (croma dritta), nel secondo giro sulla terza nota
// della terzina (lo «swing» del jump blues, come nell'esempio ritmico dello spartito: 1-2-3, accordo sul 3).
// Sinistra: semiminime fondamentale – terza – quinta – terza (primo giro) e fondamentale – terza – quinta – sesta (secondo).
// Le DITEGGIATURE sono proposte (lo spartito non le indica).
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const CHORD: Record<Ch, string> = {
  C: "E4+G4+A4+C5", // Do6
  F: "Eb4+G4+A4+C5", // Fa9 senza fondamentale
  G: "F4+G4+B4+D5", // Sol7
};
const BASS1: Record<Ch, string> = { C: "C2:4 E2:4 G2:4 E2:4", F: "F2:4 A2:4 C3:4 A2:4", G: "G2:4 B2:4 D3:4 B2:4" };
const BASS2: Record<Ch, string> = { C: "C2:4 E2:4 G2:4 A2:4", F: "F2:4 A2:4 C3:4 D3:4", G: "G2:4 B2:4 D3:4 E3:4" };
const RF = "1/2/3/5 1/2/3/5 1/2/3/5 1/2/3/5";

/** primo giro: pausa di croma e accordo di croma, quattro volte */
const dritto = (ch: Ch) => ({ chords: [ch], rh: Array(4).fill(`r:2 ${CHORD[ch]}:2`).join(" "), rf: RF, lh: BASS1[ch], lf: "5 3 1 3" });
/** secondo giro: accordo sulla terza nota della terzina, quattro volte */
const swing = (ch: Ch) => ({ chords: [ch], rh: Array(4).fill(`[r r ${CHORD[ch]}]:4`).join(" "), rf: RF, lh: BASS2[ch], lf: "5 3 2 1" });

const GIRO: Ch[] = ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"];

export const b_jump_the_blues: Song = {
  slug: "jump-the-blues",
  title: "Jump The Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. La destra suona solo tre forme di accordo, sempre fuori dal battito: Do6, Fa9 e Sol7.",
    "La sinistra batte il tempo in semiminime; la destra «salta» negli spazi tra un battito e l'altro. È questo il gioco del jump blues.",
    "Primo giro: accordo sulla seconda croma («1-e 2-e»: suoni sull'«e»). Secondo giro: conta «1-2-3» su ogni movimento e suona l'accordo sul 3.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: accordi in controtempo, crome dritte",
      tempo: 92,
      tips: [
        "Do6: Mi–Sol–La–Do (1-2-3-5). Fa9: Mib–Sol–La–Do (1-2-3-5), è il Do6 con il Mi abbassato. Sol7: Fa–Sol–Si–Re (1-2-3-5).",
        "Passando da Do a Fa cambia solo il Mi, che diventa Mib: il pollice scivola di un semitono e le altre dita restano ferme.",
        "Prima suona la sinistra da sola contando «1-e 2-e 3-e 4-e», poi aggiungi la destra sulle «e».",
        "Tieni gli accordi corti e leggeri, staccati: lo spazio tra un accordo e l'altro fa parte del ritmo.",
      ],
      measures: GIRO.map(dritto),
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: accordi sulla terza nota della terzina",
      tempo: 92,
      firstMeasure: 13,
      tips: [
        "Ogni movimento è una terzina: pausa, pausa, accordo. Conta «1-2-3» e suona sul 3, subito prima del battito successivo della sinistra.",
        "È lo stesso accordo del primo giro, spostato un po' più tardi: senti come il ritmo diventa «swing».",
        "La sinistra ora sale fondamentale – terza – quinta – sesta (Do–Mi–Sol–La, dita 5-3-2-1).",
        "Ultima battuta: Do6 tenuto e Do grave alla sinistra.",
      ],
      measures: [
        ...GIRO.slice(0, 11).map(swing),
        { chords: ["C"], rh: `${CHORD.C}:16`, rf: "1/2/3/5", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
