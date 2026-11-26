// Blues — «First Boogie Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»):
// due giri di blues di 12 battute in Do. Sinistra: quinte in semiminime (Do+Sol, Fa+Do, Sol+Re), il primo
// passo del boogie-woogie. Destra: terze lunghe con lo scivolamento Mib+Solb → Mi+Sol.
// Le legature non sono unite: la terza legata è scritta di nuovo. DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const LH: Record<Ch, string> = { C: "C2+G2", F: "F2+C3", G: "G2+D3" };
const m = (chord: Ch, rh: string, rf: string) => ({
  chords: [chord],
  rh,
  rf,
  lh: Array(4).fill(`${LH[chord]}:4`).join(" "),
  lf: "5/1 5/1 5/1 5/1",
});

const MI = "E4+G4";
const BLU = "Eb4+Gb4";
const scivola = m("C", `${MI}:8 ${BLU}:4 ${MI}:4`, "1/3 2/4 1/3");
const tenuto = (chord: Ch = "C") => m(chord, `${MI}:16`, "1/3");
const fa = m("F", `Eb4+G4:8 F4+A4:4 ${MI}:4`, "1/3 2/4 1/3");

export const b_first_boogie_blues: Song = {
  slug: "first-boogie-blues",
  title: "First Boogie Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore. La sinistra suona solo quinte, quattro per battuta: Do+Sol, Fa+Do, Sol+Re, sempre con mignolo e pollice (5 e 1).",
    "La destra suona terze lunghe; il gesto tipico è Mi+Sol → Mib+Solb → Mi+Sol: la terza scivola sulle blue note e torna su.",
    "La sinistra deve andare da sola, regolare come un metronomo: è il «motore» del boogie-woogie.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Primo giro (First 12 Bars)",
      focus: "Battute 1–12: quinte alla sinistra, terze alla destra",
      tempo: 96,
      tips: [
        "Battute 1, 3, 7, 11: Mi+Sol (1 e 3), Mib+Solb (2 e 4, sui tasti neri), Mi+Sol legato alla battuta dopo.",
        "Battuta 5, sul Fa: Mib+Sol, Fa+La, Mi+Sol (legato alla 6).",
        "Battuta 9, sul Sol: Si+Re, poi Sib e Si. Battuta 10, sul Fa: La+Do, poi Sol# e La.",
        "Le terze legate si tengono premute senza ripremerle.",
      ],
      measures: [
        scivola,
        tenuto(),
        scivola,
        tenuto(),
        fa,
        tenuto("F"),
        scivola,
        tenuto(),
        m("G", "B4+D5:8 Bb4:4 B4:4", "3/5 2 3"),
        m("F", "A4+C5:8 G#4:4 A4:4", "2/4 1 2"),
        scivola,
        tenuto(),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 13–24: le terze scendono, poi il finale",
      tempo: 96,
      firstMeasure: 13,
      tips: [
        "Battuta 13 (1 della parte): Mi+Sol, Mib+Solb, Re+Fa: le terze scendono per semitoni fino al Do+Mi della battuta 14.",
        "Battute 19–20 (7–8): lo scivolamento Mi+Sol → Mib+Solb → Mi+Sol due volte di seguito.",
        "Battuta 21 (9), sul Sol: Sol+Si, Fa+La, Sol+Sib, Sol+Si. Battuta 22 (10), sul Fa: Sol#+Do che scivola su La+Do.",
        "Ultime battute: lo scivolamento e Mi+Sol tenuto, con Do+Sol alla sinistra.",
      ],
      measures: [
        m("C", `${MI}:8 ${BLU}:4 D4+F4:4`, "2/4 2/4 1/3"),
        m("C", "C4+E4:16", "1/3"),
        scivola,
        tenuto(),
        fa,
        tenuto("F"),
        scivola,
        scivola,
        m("G", "G4+B4:4 F4+A4:4 G4+Bb4:4 G4+B4:4", "2/4 1/3 2/4 2/4"),
        m("F", "G#4+C5:4 A4+C5:12", "1/3 2/4"),
        scivola,
        { chords: ["C"], rh: `${MI}:16`, rf: "1/3", lh: "C2+G2:16", lf: "5/1" },
      ],
    },
  ],
};
