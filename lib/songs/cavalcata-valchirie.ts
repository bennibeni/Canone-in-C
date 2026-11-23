// Cavalcata delle Valchirie (R. Wagner), dall'opera «La Valchiria». Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in 3/4, 47 battute. Pubblicato con il permesso dell'editore.
// Note e DITEGGIATURE dallo spartito; alle poche note senza dito stampato è dato quello della figura uguale.
// Battuta 1: la scala è scritta nel rigo di basso ma ha il dito 1 sul La, come le scale delle battute 2–3:
// qui è affidata alla destra. Battute 4–5: le note «m.s.» sono della sinistra.
import type { Song } from "../score";

// la figura del tema: croma, due semicrome, due semiminime (dita 2 1 2 4 1)
const f = (a: string, b: string, c: string, d: string, e: string, rf = "2 1 2 4 1") =>
  ({ rh: `${a}:2 ${b}:1 ${c}:1 ${d}:4 ${e}:4`, rf });
const fh = (a: string, b: string, c: string, d: string, rf = "2 1 2 4") => ({ rh: `${a}:2 ${b}:1 ${c}:1 ${d}:8`, rf });
const lh = (ch: string, lf: string) => ({ lh: `${ch}:8 ${ch}:4`, lf: `${lf} ${lf}` });
// il galoppo: croma, due semicrome, semiminima puntata, croma
const g = (a: string, b: string, c: string, d: string, e: string, rf = "3 1 3 5 2") =>
  ({ rh: `${a}:2 ${b}:1 ${c}:1 ${d}:6 ${e}:2`, rf });

const Am = lh("A3+C4", "3/1"), C = lh("C3+G3", "5/1"), E = lh("E3+B3", "5/1"), Dm = lh("D3+A3", "5/1");
const Ap = lh("A3+C#4", "3/1"), Csm = lh("C#3+G#3", "5/1");

export const cavalcataValchirie: Song = {
  slug: "cavalcata-delle-valchirie",
  title: "Cavalcata delle Valchirie",
  composer: "Richard Wagner, dall'opera «La Valchiria»",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "minor",
  videoKey: "C",
  beats: 3,
  progression: ["Am", "C", "Em", "Dm", "A", "C#m", "E", "D"],
  progressionLabel: "il tema passa per varie tonalità",
  fullTips: [
    "Il brano è in 3/4: tre movimenti per battuta.",
    "Il tema ha sempre lo stesso ritmo: croma, due semicrome veloci, poi due semiminime (o una minima). Le semicrome vanno «lanciate» verso la nota lunga.",
    "La sinistra suona un bicordo lungo (minima) e lo ribatte sul terzo movimento.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "L'introduzione",
      focus: "Battute 1–5: tre scale veloci (Presto) e il segnale a mani alternate",
      tempo: 96,
      tips: [
        "Battute 1–3: La – Si – Do – Re in semicrome e Mi lungo, ogni volta un'ottava sopra, sempre con 1-2-3-4-5. Crescendo, forte.",
        "Battute 4–5 (Allegro, piano): la sinistra (m.s.) dà il La, la destra risponde con il trillo La – Mi e Mi – La.",
      ],
      measures: [
        { chords: [], rh: "A3:1 B3:1 C4:1 D4:1 E4:8", lh: "r:12", rf: "1 2 3 4 5" },
        { chords: [], rh: "A4:1 B4:1 C5:1 D5:1 E5:8", lh: "r:12", rf: "1 2 3 4 5" },
        { chords: ["Am"], rh: "A5:1 B5:1 C6:1 D6:1 E6:8", lh: "r:12", rf: "1 2 3 4 5" },
        { chords: ["Am"], rh: "r:2 A4:1 E4:1 E4:2 E5:1 A4:1 A4:4", lh: "A3:2 r:10", rf: "2 1 1 5 2 2", lf: "2" },
        { chords: ["Am"], rh: "r:2 A4:1 E4:1 E4:2 E5:1 A4:1 A4:4", lh: "A3:2 r:8 E4:2", rf: "2 1 1 5 2 2", lf: "2 1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il tema in La minore",
      focus: "Battute 6–14: il tema sale per gradi La – Do – Mi",
      tempo: 104,
      firstMeasure: 6,
      tips: [
        "Ogni battuta: croma col 2, semicrome col pollice e col 2, poi la nota alta col 4 (o col 5) e di nuovo giù col pollice.",
        "La sinistra cambia accordo ogni due battute: La – Do (La minore), poi Do – Sol, poi Mi – Si.",
        "Battuta 13: il Sol diventa diesis (Mi maggiore). Battuta 14: pausa, poi il Mi in levare per la parte successiva.",
      ],
      measures: [
        { chords: ["Am"], ...f("A4", "E4", "A4", "C5", "A4"), ...Am },
        { chords: ["Am"], ...f("C5", "A4", "C5", "E5", "C5"), ...Am },
        { chords: ["C"], ...f("E5", "C5", "E5", "G5", "G4", "3 1 3 5 1"), ...C },
        { chords: ["C"], ...fh("C5", "G4", "C5", "E5"), ...C },
        { chords: ["C"], ...f("C5", "G4", "C5", "E5", "C5"), ...C },
        { chords: ["C"], ...f("E5", "C5", "E5", "G5", "E5"), ...C },
        { chords: ["Em"], ...f("G5", "E5", "G5", "B5", "B4", "3 1 3 5 1"), ...E },
        { chords: ["E"], ...fh("E5", "B4", "E5", "G#5", "3 1 2 4"), ...E },
        { chords: ["E"], rh: "r:8 r:2 E4:2", rf: "1", ...E },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Il galoppo in Re minore",
      focus: "Battute 15–22: il galoppo Fa – Re – Fa – La",
      tempo: 104,
      firstMeasure: 15,
      tips: [
        "Nuova figura: croma, due semicrome, semiminima puntata e croma. Il La puntato va tenuto bene.",
        "Battuta 17: Si♭ nella destra e nella sinistra, poi Sol♯ alla sinistra (accordo di Mi).",
        "Battuta 21: qui il Si è naturale. Battuta 22: Mi – Do♯ – Mi e Do♯ lungo col 5.",
      ],
      measures: [
        { chords: ["Dm"], ...g("F4", "D4", "F4", "A4", "E4"), ...Dm },
        { chords: ["Dm"], ...g("F4", "D4", "F4", "A4", "E4"), ...Dm },
        { chords: ["Bb/D", "E7"], rh: "F4:2 D4:1 F4:1 Bb4:4 E4:4", rf: "2 1 2 4 2", lh: "D3+Bb3:8 G#3:4", lf: "5/1 2" },
        { chords: ["Am"], rh: "C4:2 E4:1 A4:1 C5:8", rf: "1 2 4 5", lh: "A3:8 A3:4", lf: "1 1" },
        { chords: ["Dm"], ...g("F4", "D4", "F4", "A4", "E4", "3 1 3 5 2"), ...Dm },
        { chords: ["Dm"], ...g("F4", "D4", "F4", "A4", "E4"), ...Dm },
        { chords: ["Dm6", "E7"], rh: "F4:2 D4:1 F4:1 B4:4 E4:4", rf: "2 1 2 5 2", lh: "D3+B3:8 G#3:4", lf: "5/1 2" },
        { chords: ["A"], rh: "E4:2 C#4:1 E4:1 C#5:8", rf: "1 2 1 5", lh: "A3:8 A3:4", lf: "1 1" },
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "Il tema ripreso",
      focus: "Battute 23–30: di nuovo il tema in La minore, ora mezzo forte",
      tempo: 104,
      firstMeasure: 23,
      tips: [
        "Come le battute 6–13: stesse note e stesse dita.",
        "Battuta 29: forte, il Si acuto col 5 e salto giù al Si col pollice.",
      ],
      measures: [
        { chords: ["Am"], ...f("A4", "E4", "A4", "C5", "A4"), ...Am },
        { chords: ["Am"], ...f("C5", "A4", "C5", "E5", "C5"), ...Am },
        { chords: ["C"], ...f("E5", "C5", "E5", "G5", "G4", "3 1 3 5 1"), ...C },
        { chords: ["C"], ...fh("C5", "G4", "C5", "E5"), ...C },
        { chords: ["C"], ...f("C5", "G4", "C5", "E5", "C5"), ...C },
        { chords: ["C"], ...f("E5", "C5", "E5", "G5", "E5"), ...C },
        { chords: ["Em"], ...f("G5", "E5", "G5", "B5", "B4", "3 1 3 5 1"), ...E },
        { chords: ["E"], ...fh("E5", "B4", "E5", "G#5"), ...E },
      ],
    },
    {
      id: 5,
      title: "Parte 5",
      subtitle: "In La maggiore",
      focus: "Battute 31–38: il tema con Do♯ e Sol♯",
      tempo: 104,
      firstMeasure: 31,
      tips: [
        "Il tema torna forte, ma in La maggiore: Do♯ nella destra e nella sinistra.",
        "Battute 33–36: la sinistra suona Do♯ – Sol♯; nella destra Sol♯ e Do♯.",
        "Battute 37–38: come le battute 12–13.",
      ],
      measures: [
        { chords: ["A"], ...f("A4", "E4", "A4", "C#5", "A4"), ...Ap },
        { chords: ["A"], ...f("C#5", "A4", "C#5", "E5", "C#5", "2 1 2 4 2"), ...Ap },
        { chords: ["C#m"], ...f("E5", "C#5", "E5", "G#5", "G#4", "3 1 3 5 1"), ...Csm },
        { chords: ["C#m"], ...f("C#5", "G#4", "C#5", "E5", "G#4"), ...Csm },
        { chords: ["C#m"], ...f("C#5", "G#4", "C#5", "E5", "C#5", "2 1 2 4 2"), ...Csm },
        { chords: ["C#m"], ...f("E5", "C#5", "E5", "G#5", "E5", "3 1 3 5 3"), ...Csm },
        { chords: ["E"], ...f("G#5", "E5", "G#5", "B5", "B4", "3 1 3 5 1"), ...E },
        { chords: ["E"], ...fh("E5", "B4", "E5", "G#5"), ...E },
      ],
    },
    {
      id: 6,
      title: "Parte 6",
      subtitle: "Il galoppo e la fine",
      focus: "Battute 39–47: il galoppo con il Fa♯ e la chiusa forte",
      tempo: 104,
      firstMeasure: 39,
      tips: [
        "Come la parte 3, ma con il Fa♯ (Re maggiore), mezzo piano.",
        "Battuta 42: La – Mi – La e Do♯ puntato col 4.",
        "Battuta 46: tre gruppi croma-semicrome che salgono (La, Do♯, Mi), crescendo.",
        "Battuta 47: La acuto col 5, forte; la sinistra chiude sul La basso, sforzato, con la corona.",
      ],
      measures: [
        { chords: ["D"], ...g("F#4", "D4", "F#4", "A4", "E4"), ...Dm },
        { chords: ["D"], ...g("F#4", "D4", "F#4", "A4", "E4"), ...Dm },
        { chords: ["Bm/D", "E7"], rh: "F#4:2 D4:1 F#4:1 B4:4 E4:4", rf: "2 1 2 5 1", lh: "D3+B3:8 G#3:4", lf: "5/1 2" },
        { chords: ["A"], rh: "A4:2 E4:1 A4:1 C#5:6 E4:2", rf: "2 1 2 4 1", lh: "A3:8 A3:4", lf: "1 1" },
        { chords: ["D"], ...g("F#4", "D4", "F#4", "A4", "E4", "3 1 3 5 1"), ...Dm },
        { chords: ["D"], ...g("F#4", "D4", "F#4", "A4", "E4", "3 1 3 5 1"), ...Dm },
        { chords: ["Bm/D", "E7"], rh: "F#4:2 D4:1 F#4:1 B4:4 E4:4", rf: "2 1 2 5 1", lh: "D3+B3:8 G#3:4", lf: "5/1 2" },
        { chords: ["A"], rh: "A4:2 E4:1 A4:1 C#5:2 A4:1 C#5:1 E5:2 C#5:1 E5:1", rf: "4 1 2 4 1 2 4 1 2", lh: "A3:12", lf: "1" },
        { chords: ["A"], rh: "A5:12", rf: "5", lh: "A3:8 A2:4", lf: "1 5" },
      ],
    },
  ],
};
