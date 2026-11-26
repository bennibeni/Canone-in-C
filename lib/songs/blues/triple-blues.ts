// Blues — «Triple-Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do; sinistra in semiminime fondamentale – terza – quinta – terza,
// destra quasi tutta in terzine di crome (una terzina per movimento) sulle note della scala blues.
// Le alterazioni valgono per tutta la battuta, come nello spartito (es. battuta 1: sempre Mib).
// Le DITEGGIATURE sono proposte (lo spartito non le indica), in parte dal calcolo automatico.
import type { Song } from "../../score";

const lh = {
  C: { lh: "C2:4 E2:4 G2:4 E2:4", lf: "5 3 1 3" },
  F: { lh: "F2:4 A2:4 C3:4 A2:4", lf: "5 3 1 3" },
  G: { lh: "G2:4 B2:4 D3:4 B2:4", lf: "5 3 1 3" },
};
const m = (chord: "C" | "F" | "G", rh: string, rf: string) => ({ chords: [chord], rh, rf, ...lh[chord] });
/** la stessa terzina ripetuta n volte */
const t = (notes: string, n: number) => Array(n).fill(`[${notes}]:4`).join(" ");
const f = (fingers: string, n: number) => Array(n).fill(fingers).join(" ");

const faMibDo = m("C", t("F5 Eb5 C5", 4), f("3 2 1", 4));
const faSibSi = m("C", t("F#4 G4 Bb4", 4), f("2 3 4", 4));
const faSibDo = m("C", `${t("F#4 G4 Bb4", 2)} C5:8`, `${f("2 3 4", 2)} 5`);

export const b_triple_blues: Song = {
  slug: "triple-blues",
  title: "Triple-Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore con le blue note. La destra suona quasi sempre terzine di crome: tre note per ogni movimento, uguali.",
    "Attenzione alle alterazioni: valgono per tutta la battuta. Nella battuta 1 il Mi è sempre Mib, nella 5 il Sol è sempre Sol#.",
    "La sinistra cammina in semiminime come in «Walking The Blues»: fondamentale – terza – quinta – terza, dita 5-3-1-3.",
    "Conta «1-e-a 2-e-a 3-e-a 4-e-a» e tieni le terzine regolari, senza fermarti tra un gruppo e l'altro.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 76,
      tips: [
        "Battute 1, 3 e 7: Fa – Mib – Do che scende, dita 3-2-1, quattro volte.",
        "Battuta 2: Fa col 4 e Sol col 5, tenuto. Battuta 4: Sib col pollice e Do col 2, tenuto.",
        "Battuta 5, sul Fa: Sol# – La – Do (2-3-4), che porta al Mib – Re della battuta 6.",
        "Battuta 9, sul Sol: Sib – Si – Re, la blue note che scivola sulla terza del Sol, poi Mi.",
        "Battuta 11: dopo Do+Mi e la pausa, i bicordi scendono per semitoni Mi+Sol – Mib+Solb – Re+Fa fino a Do+Mi.",
      ],
      measures: [
        faMibDo,
        m("C", "F5:4 G5:12", "4 5"),
        faMibDo,
        m("C", "Bb4:4 C5:12", "1 2"),
        m("F", t("G#4 A4 C5", 4), f("2 3 4", 4)),
        m("F", "Eb5:4 D5:12", "5 4"),
        faMibDo,
        m("C", `${t("F5 Eb5 C5", 2)} G5:8`, `${f("3 2 1", 2)} 5`),
        m("G", `${t("Bb4 B4 D5", 2)} E5:8`, `${f("2 3 4", 2)} 5`),
        m("F", `${t("G#4 A4 C5", 2)} Eb5:4 D5:4`, `${f("2 3 4", 2)} 5 4`),
        m("C", "C5+E5:8 r:4 [E4+G4 Eb4+Gb4 D4+F4]:4", "1/3 3/5 2/4 1/3"),
        m("C", "C4+E4:16", "1/3"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: la melodia scende e risale",
      tempo: 76,
      firstMeasure: 13,
      tips: [
        "Battute 13–15: Fa# – Sol – Sib che sale (2-3-4), poi il Do tenuto col 5 nella 14.",
        "Battuta 16: dopo Fa# – Sol – Sib la seconda terzina scende Fa# – Fa – Mib e arriva al Do centrale (4-3-2-1).",
        "Battute 17–18, sul Fa: Sib – Do – Mib sotto il Do centrale (2-3-5), quattro volte, poi il Mib tenuto.",
        "Battuta 21, sul Sol: Sib – Si – Re due volte, poi la discesa Mi – Re – Si – Sib – La – Sol.",
        "Battuta 22: Sol# – La – Do due volte, poi Re – Do – La e Sol# – Sol – Fa, che chiude su Mi – Re – Do.",
      ],
      measures: [
        faSibSi,
        faSibDo,
        faSibSi,
        m("C", `${t("F#4 G4 Bb4", 1)} [F#4 F4 Eb4]:4 C4:8`, "3 4 5 4 3 2 1"),
        m("F", t("Bb3 C4 Eb4", 4), f("2 3 5", 4)),
        m("F", `${t("Bb3 C4 Eb4", 2)} Eb4:8`, `${f("2 3 5", 2)} 5`),
        faSibDo,
        faSibDo,
        m("G", `${t("Bb4 B4 D5", 2)} [E5 D5 B4]:4 [Bb4 A4 G4]:4`, "2 3 4 2 3 4 5 4 3 3 2 1"),
        m("F", `${t("G#4 A4 C5", 2)} [D5 C5 A4]:4 [G#4 G4 F4]:4`, "2 3 4 2 3 4 5 4 3 2 2 1"),
        m("C", "E4:12 D4:4", "3 2"),
        { chords: ["C"], rh: "C4:16", rf: "1", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
