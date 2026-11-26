// Lover Man (Oh, Where Can You Be?) (Davis / Ramirez / Sherman), arrangiamento facile in Fa maggiore,
// «Slowly, with feeling», semiminima = 69. Forma A A B A di 32 battute.
// Note e DITEGGIATURE dallo spartito (screenshot); dove manca il dito è proposto. Le note tenute della sinistra
// sotto un basso che si muove (ponte) sono scritte di nuovo insieme alla nota successiva.
import type { Song, Measure } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Measure => ({ chords, rh, rf, lh, lf });

const DM7 = "D3+C4", G7 = "F3+B3", GM7 = "G3+F4", C7 = "Bb3+E4";
const a1 = M(["Dm7", "G7"], "r:2 D4:2 E4:2 D4:2 G4:4 D4:2 E4:2", "1 2 1 4 1 2", `${DM7}:8 ${G7}:8`, "5/1 4/2");
const a2 = M(["Dm7", "G7"], "F4:2 D4:2 G4:2 G4:10", "3 1 4 4", `${DM7}:8 ${G7}:8`, "5/1 4/2");
const a3 = M(["Gm7", "C7"], "r:2 G4:2 A4:2 G4:2 C5:4 G4:2 A4:2", "1 2 1 4 1 2", `${GM7}:8 ${C7}:8`, "5/1 4/2");
const a4 = M(["Gm7", "C7"], "Bb4:2 G4:2 C5:2 C5:6 r:4", "3 1 4 4", `${GM7}:8 ${C7}:8`, "5/1 4/2");
const a5 = M(["F7"], "Ab4:2 F4:2 G4:2 F4:2 Ab4:2 F4:6", "3 1 2 1 3 1", "F3+A3+Eb4:16", "5/3/1");
const a6 = M(["Bb7"], "Ab4:2 F4:2 G4:2 F4:2 C5:2 F4:6", "3 1 2 1 5 1", "Ab3+C4+D4:16", "5/3/1");
const a7 = M(["Db7", "C7"], "Db4:2 F4:2 G4:2 Ab4:2 G4:4 F4:2 D4:2", "1 2 3 4 3 2 1", "Db3+F3+B3:8 C3+E3+Bb3:8", "5/3/1 5/3/1");
const inizio = [a1, a2, a3, a4];
const amante = [a5, a6, a7];

export const loverMan: Song = {
  slug: "lover-man",
  title: "Lover Man",
  composer: "Davis / Ramirez / Sherman",
  credit: "Arrangiamento facile in Fa maggiore, pubblicato con il permesso. Note e diteggiature dallo spartito (dove manca il dito è proposto)",
  collection: "standards",
  mode: "major",
  videoKey: "F",
  baseKey: "F",
  progression: ["Dm7", "G7", "Gm7", "C7", "F7", "Bb7", "Db7", "C7", "F"],
  progressionLabel: "la sezione A",
  fullTips: [
    "Tonalità: Fa maggiore. «Slowly, with feeling», semiminima = 69: molto lento, cantato.",
    "Forma A A B A: tre volte la stessa melodia («I don't know why…», «The night is cold…», «Someday we'll meet…») e in mezzo il ponte in La minore e Sol minore.",
    "La sinistra suona solo due note per accordo (fondamentale e settima, o terza e settima): sono le «shell voicings» del jazz. Imparale come forme.",
  ],
  parts: [
    {
      id: 1,
      title: "Prima A",
      subtitle: "«I don't know why…»",
      focus: "Battute 1–8",
      tempo: 69,
      tips: [
        "Destra: pollice sul Re (o sul Sol nella battuta 3), la mano resta ferma in cinque note.",
        "Sinistra: Re + Do (5 e 1) per il Rem7, Fa + Si (4 e 2) per il Sol7; poi Sol + Fa e Sib + Mi.",
        "Battute 5–6: il Lab (3) è la blue note, la settima abbassata del Sib7 e la terza minore del Fa.",
        "Battuta 7: Reb7 → Do7, l'accordo un semitono sopra che scivola sulla dominante.",
      ],
      measures: [
        ...inizio, ...amante,
        M(["Bbm", "F"], "F4:16", "1", "r:2 Bb2+Db3+F3:6 C3+A3:8", "5/3/1 5/1"),
      ],
    },
    {
      id: 2,
      title: "Seconda A",
      subtitle: "«The night is cold…»",
      focus: "Battute 9–16",
      tempo: 69,
      firstMeasure: 9,
      tips: ["Le battute sono le stesse della prima A; cambia l'ultima: Fa diminuito e Fa, con la melodia sul Fa tenuto."],
      measures: [
        ...inizio, ...amante,
        M(["F°", "F"], "F4:12 r:4", "1", "B2+F3+Ab3:8 C3+F3+A3:4 r:4", "5/2/1 5/3/1"),
      ],
    },
    {
      id: 3,
      title: "Il ponte (B)",
      subtitle: "«I've heard it said…»",
      focus: "Battute 17–24",
      tempo: 69,
      firstMeasure: 17,
      tips: [
        "Il ponte cambia colore: La minore e poi Sol minore, con la nota interna della sinistra che scende La – Sol# – Sol – Fa# (e Sol – Fa# – Fa – Mi).",
        "Sopra, la sinistra tiene una nota ferma (Mi o Re col pollice) mentre il mignolo scende.",
        "Battuta 19: il Si naturale (Solmaj7). Battuta 20: Sol6 e Sol aumentato (Re#), che porta al Sol minore.",
        "Terzine di semiminime nelle battute 18, 19, 22, 23: tre note nello spazio di due movimenti.",
      ],
      measures: [
        M(["Am", "Am(maj7)"], "C5:4 A4:2 B4:2 C5:4 A4:2 B4:2", "4 2 3 4 2 3", "A3+E4:8 G#3+E4:8", "2/1 3/1"),
        M(["Am7", "Am6"], "C5:6 A4:2 [C5 D5 C5]:8", "3 1 3 4 3", "G3+E4:8 F#3+E4:8", "3/1 4/1"),
        M(["Gmaj7", "G7"], "B4:4 G4:2 A4:2 [B4 A4 G4]:8", "3 1 2 3 2 1", "G3+F#4:8 G3+F4:8", "5/1 5/1"),
        M(["G6", "G+5"], "B4:12 r:4", "3", "G3+E4:8 G3+B3+D#4:4 r:4", "5/2 5/3/1"),
        M(["Gm", "Gm(maj7)"], "Bb4:4 G4:2 A4:2 Bb4:4 G4:2 A4:2", "4 2 3 4 2 3", "G3+D4:8 F#3+D4:8", "2/1 3/1"),
        M(["Gm7", "Gm6"], "Bb4:4 G4:2 A4:2 [Bb4 C5 Bb4]:8", "3 1 2 3 4 3", "F3+D4:8 E3+D4:8", "3/1 4/1"),
        M(["F", "Eb7"], "A4:8 [A4 G4 F4]:8", "3 3 2 1", "A3+C4:8 G3+Db4:8", "4/1 5/1"),
        M(["Em7", "A7"], "G4+A4:16", "2/3", "E3+D4:8 E3+C#4:8", "5/1 5/2"),
      ],
    },
    {
      id: 4,
      title: "Ultima A",
      subtitle: "«Someday we'll meet…»",
      focus: "Battute 25–32",
      tempo: 69,
      firstMeasure: 25,
      tips: [
        "È di nuovo la sezione A, con le parole finali («Huggin' and a kissin'…»).",
        "Ultima battuta: Fa tenuto alla destra; la sinistra scende Rem6 – Sibm – Fa, un accordo per movimento.",
      ],
      measures: [
        ...inizio, ...amante,
        M(["Dm6", "Bbm", "F"], "F4:8 r:8", "1", "D3+B3:4 Bb2+Db3+F3:4 F2+C3+A3:4 r:4", "5/1 5/3/1 5/2/1"),
      ],
    },
  ],
};
