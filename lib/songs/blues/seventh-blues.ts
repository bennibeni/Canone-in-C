// Blues — «Seventh Blues». Note dallo spartito (screenshot, «First 12 Bars» e «Second 12 Bars»).
// Come «Triple Feel Blues» le crome si suonano swing (semiminima + croma di terzina) e sono scritte già così.
// Novità: le settime. Nel basso, in metà delle battute, la sesta diventa settima (Do+Sib, Fa+Mib); alla destra
// accordi di settima (Do+Sol+Sib, Fa+Do+Mib, Sol+Re+Fa). Battuta 1: attacco in levare (Do – Mib – Mi).
// Le legature tra accordi uguali non sono unite (l'accordo è scritto di nuovo). DITEGGIATURE proposte.
import type { Song } from "../../score";

type Ch = "C" | "F" | "G";
const sw = (a: string, b: string) => `[${a}:2 ${b}]:4`;
const P: Record<Ch, [string, string, string]> = {
  C: ["C2+G2", "C2+A2", "C2+Bb2"],
  F: ["F2+C3", "F2+D3", "F2+Eb3"],
  G: ["G2+D3", "G2+E3", "G2+F3"],
};
const half = (ch: Ch, seventh = false) =>
  seventh ? `${sw(P[ch][2], P[ch][2])} ${sw(P[ch][1], P[ch][1])}` : `${sw(P[ch][0], P[ch][0])} ${sw(P[ch][1], P[ch][1])}`;
const lh = (ch: Ch, seventh: boolean) => ({
  lh: `${half(ch)} ${half(ch, seventh)}`,
  lf: `5/2 5/2 5/1 5/1 ${seventh ? "5/1 5/1 5/1 5/1" : "5/2 5/2 5/1 5/1"}`,
});
const m = (ch: Ch, seventh: boolean, rh: string, rf: string) => ({ chords: [ch], rh, rf, ...lh(ch, seventh) });

const CEG = "C4+E4+G4", CFA = "C4+F4+A4", C7 = "C4+G4+Bb4", C = "C4";
const FAC = "F4+A4+C5", FBD = "F4+Bb4+D5", F7 = "F4+C5+Eb5", F = "F4";
const G = "G4";

const doSett = m("C", false, `${sw(CEG, C)} ${sw(CFA, C7)} ${C7}:8`, "1/3/5 1 1/3/5 1/3/4 1/3/4");
const doSett7 = { ...doSett, ...lh("C", true) };
const faSett = (sev: boolean) => m("F", sev, `${sw(FAC, F)} ${sw(FBD, F7)} ${F7}:8`, "1/3/5 1 1/3/5 1/4/5 1/4/5");
const doFine = (sev: boolean) => m("C", sev, `${sw(CEG, C)} ${sw(CFA, CEG)} ${CEG}:8`, "1/3/5 1 1/3/5 1/3/5 1/3/5");

export const b_seventh_blues: Song = {
  slug: "seventh-blues",
  title: "Seventh Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore, crome swing (semiminima + croma di terzina, come indicato in testa allo spartito). Nell'app sono già scritte così.",
    "La novità sono le settime: nel basso Do+Sol, Do+Sol, Do+Sib, Do+Sib… (la sesta Do+La diventa settima); alla destra Do+Sol+Sib, Fa+Do+Mib, Sol+Re+Fa.",
    "Il brano comincia con una battuta di attacco: tre crome in terzina Do – Mib – Mi alla destra, da sola.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Attacco e primo giro (First 12 Bars)",
      focus: "Battuta 1 di attacco, poi battute 2–13",
      tempo: 92,
      tips: [
        "Battuta 1: aspetta tre movimenti, poi Do – Mib – Mi in terzina (1-2-2 o 1-2-3): la blue note che scivola sulla terza.",
        "Battute 2, 5, 14: Do+Mi+Sol e Do, Do+Fa+La, poi Do+Sol+Sib (il Do7, dita 1-3-4) tenuto.",
        "Sul Fa: Fa+La+Do e Fa, Fa+Sib+Re, poi Fa+Do+Mib (il Fa7, dita 1-4-5).",
        "Battuta 8: la mano sale, Mib+Sol → Mi+Sol, Do, Sol; poi Sol+Do, Mib, Mi, Sol+Do.",
        "Battuta 11: dopo il Fa7, Sol#+Si e La+Do: salgono di un semitono verso il Do della battuta dopo.",
        "Sinistra: quando c'è il bemolle (Do+Sib, Fa+Mib) usa 5 e 1, altrimenti 5/2 sulla quinta e 5/1 sulla sesta.",
      ],
      measures: [
        { chords: ["C"], rh: "r:12 [C4 Eb4 E4]:4", rf: "1 2 2", lh: "r:16" },
        doSett,
        faSett(false),
        m("C", false, `${sw(CEG, C)} ${sw(CFA, C7)} ${sw(C7, C)} ${sw(CFA, C)}`, "1/3/5 1 1/3/5 1/3/4 1/3/4 1 1/3/5 1"),
        doSett7,
        m("F", false, `${sw(FAC, F)} ${sw(FBD, F)} ${sw(F7, F)} ${sw(FBD, F)}`, "1/3/5 1 1/3/5 1 1/4/5 1 1/3/5 1"),
        m("F", true, `${sw(F7, F)} ${sw(FBD, F)} ${sw(F7, F)} ${sw(FBD, F)}`, "1/4/5 1 1/3/5 1 1/4/5 1 1/3/5 1"),
        m("C", false, `${sw("Eb5+G5", "E5+G5")} ${sw("C5", "G4")} ${sw("G4+C5", "Eb4")} ${sw("E4", "G4+C5")}`, "3/5 3/5 2 1 2/5 1 1 2/5"),
        doFine(true),
        m("G", false, `${sw("G4+D5+F5", G)} ${sw("G4+C5+E5", G)} ${sw("G4+B4+D5", G)} ${sw("G4+C5+E5", G)}`, "1/4/5 1 1/3/5 1 1/3/5 1 1/3/5 1"),
        m("F", true, `${sw(F7, F)} ${sw(FBD, F)} ${sw("G#4+B4", F)} ${sw("A4+C5", F)}`, "1/4/5 1 1/3/5 1 2/3 1 2/4 1"),
        m("C", false, `${sw(CEG, C)} ${sw(CFA, C)} ${sw(CEG, C)} ${sw(CFA, C)}`, "1/3/5 1 1/3/5 1 1/3/5 1 1/3/5 1"),
        doFine(false),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Secondo giro (Second 12 Bars)",
      focus: "Battute 14–25: accordi in alto, terzine e finale",
      tempo: 92,
      firstMeasure: 14,
      tips: [
        "Battute 16–17 (3–4 della parte): la mano sale sopra il Do centrale. Pollice sul Do5 che si ripete, sopra Mi+Sol, Fa+La, Sol+Sib.",
        "Battuta 18 (5): terzine di terze Mib+Sol → Mi+Sol (2/4 → 3/5), poi una pausa.",
        "Battuta 19 (6): pausa, Fa+Do+Mib e Fa, Sib+Re e Fa, poi La+Do.",
        "Battuta 22 (9), sul Sol: terzine Do# – Re – Fa, poi Do – Re – Fa due volte e il Fa tenuto.",
        "Battuta 23 (10), sul Fa: Mib – Re – Do tre volte (3-2-1), poi Do tenuto.",
        "Finale: accordi su un Do fermo che scendono verso Mib+Solb → Re+Fa, poi Do+Mi, Sol, La e l'accordo Sol+Do.",
      ],
      measures: [
        doSett,
        { ...faSett(true) },
        m("C", false, `${sw("C5+E5+G5", "C5")} ${sw("C5+F5+A5", "C5")} ${sw("C5+G5+Bb5", "C5")} ${sw("C5+F5+A5", "C5")}`,
          "1/3/5 1 1/4/5 1 1/4/5 1 1/4/5 1"),
        m("C", true, `${sw("C5+A5+C6", "C5")} ${sw("C5+F5+A5", "C5")} ${sw("C5+E5+G5", "C5")} ${sw("C5+F5+A5", "C5")}`,
          "1/4/5 1 1/4/5 1 1/3/5 1 1/4/5 1"),
        m("F", false, "[Eb5+G5 E5+G5 E5+G5]:4 [E5+G5 E5+G5 E5+G5]:4 [E5+G5 E5+G5:2]:4 r:4",
          "2/4 3/5 3/5 3/5 3/5 3/5 3/5 3/5"),
        m("F", true, `r:4 ${sw(F7, F)} ${sw("Bb4+D5", F)} A4+C5:4`, "1/4/5 1 2/4 1 2/4"),
        doFine(false),
        doSett7,
        m("G", false, "[C#5 D5 F5]:4 [C5 D5 F5]:4 [C5 D5 F5]:4 F5:4", "2 3 5 1 2 4 1 2 4 4"),
        m("F", true, "[Eb5 D5 C5]:4 [Eb5 D5 C5]:4 [Eb5 D5 C5]:4 C5:4", "3 2 1 3 2 1 3 2 1 1"),
        m("C", true, `${sw("C4+G4+C5", C)} ${sw(C7, C)} ${sw(CFA, C)} ${sw("Eb4+Gb4", "D4+F4")}`, "1/3/5 1 1/3/4 1 1/3/5 1 2/4 1/3"),
        { chords: ["C"], rh: `${sw("C4+E4", "G3")} A3:2 r:2 G3+C4:8`, rf: "3/5 1 2 1/3",
          lh: `${half("C")} C2:8`, lf: "5/2 5/2 5/1 5/1 5" },
      ],
    },
  ],
};
