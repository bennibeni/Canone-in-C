// Georgia On My Mind (Hoagy Carmichael), arrangiamento facile in Fa maggiore, 32 battute (forma A A B A).
// Note e DITEGGIATURE dallo spartito (screenshot); dove lo spartito non indica il dito, il dito è proposto.
// Semplificazioni: le note tenute sotto una melodia che si muove (battute 7, 8, 14, 30) sono scritte di nuovo
// insieme alla nota successiva; le legature tra battute non sono unite.
import type { Song, Measure } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Measure => ({ chords, rh, rf, lh, lf });

const b1 = M(["F"], "A4:4 C5:12", "3 5", "r:4 C3:4 G3:4 F3:4", "5 2 3");
const b2 = M(["E°"], "A4:4 G4:12", "3 2", "r:4 E3:4 Bb3:4 C#4:4", "5 2 1");
const b3 = M(["Dm7"], "r:4 A4:4 D5:4 A4:4", "3 5 3", "D3+C4:16", "5/1");
const b4 = M(["G", "Bbm"], "G4:8 r:4 F4:2 G4:2", "2 1 2", "D3+B3:8 Db3+Bb3:8", "5/1 5/2");
const b5 = M(["F", "E7"], "A4:4 C5:4 E5:4 D5:4", "1 3 5 4", "r:8 Ab3:8", "2");
const b14 = M(["Gm", "C7"], "Bb4:4 F4:4 E4+A4:4 A4:4", "3 1 2/5 5", "G3:8 Bb3:8", "3 1");
const b15 = M(["F"], "F4:16", "3", "r:4 C3:4 B3:4 Bb3:4", "5 1 2");

export const georgia: Song = {
  slug: "georgia-on-my-mind",
  title: "Georgia On My Mind",
  composer: "Hoagy Carmichael",
  collection: "standards",
  credit: "Arrangiamento facile in Fa maggiore. Note e diteggiature dallo spartito (dove manca il dito è proposto)",
  mode: "major",
  videoKey: "F",
  baseKey: "F",
  progression: ["F", "E°", "Dm7", "G", "Bbm", "F", "E7", "Gm", "C7"],
  progressionLabel: "le prime battute",
  fullTips: [
    "Tonalità: Fa maggiore (un bemolle, il Si). Lento ed espressivo: semiminima = 72.",
    "Forma A A B A: tre volte la stessa melodia «Georgia, Georgia…» e in mezzo il ponte (battute 17–24).",
    "Le dita sono quelle dello spartito. Attenzione ai passaggi del pollice indicati: «tuck thumb under» vuol dire passare il pollice sotto il 2° (battute 5, 13, 29) o il 4° dito (battuta 23).",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Prima A",
      focus: "Battute 1–8: «Georgia, Georgia…»",
      tempo: 72,
      tips: [
        "Battuta 1: La col 3, poi Do col 5, legati. Sinistra: Do – Sol – Fa (5-2-3).",
        "Battuta 2, sul Mi diminuito: la sinistra sale Mi – Sib – Do# (5-2-1).",
        "Battuta 3: la sinistra tiene Re + Do (5 e 1) per tutta la battuta; attenzione, il Do è naturale.",
        "Battuta 4: Re + Si naturale, poi Reb + Sib: il pollice resta, il basso scende di un semitono.",
        "Battuta 5: dopo Fa – Sol (1-2) il pollice passa sotto il 2° dito per prendere il La.",
        "Battuta 7: tieni il Do in alto (4) per tutta la battuta mentre sotto Sol scende a Fa#.",
      ],
      measures: [
        b1, b2, b3, b4, b5,
        M(["Gm", "C7"], "Bb4:4 D5:4 A4:4 G4:4", "3 5 2 1", "G3:8 Bb3:8", "3 1"),
        M(["Am7", "D7"], "G4+C5:8 F#4+C5:8", "1/4 2/4", "A3:8 D3+C4:8", "2 5/1"),
        M(["Gm7", "C7"], "F4+D5:2 D5:2 D5:2 D5:2 E4+G#4:8", "1/5 5 5 5 1/2", "G3:8 C3+Bb3:8", "2 5/1"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Seconda A",
      focus: "Battute 9–16: la stessa melodia, finale diverso",
      tempo: 72,
      firstMeasure: 9,
      tips: [
        "Le battute 9–13 sono uguali alle 1–5.",
        "Battuta 14: Sib (3), Fa (1), poi La sopra Mi (5 e 2).",
        "Battuta 15: Fa tenuto (3); la sinistra scende Do – Si – Sib (5-1-2).",
        "Battuta 16, La7: sinistra La – Lab – Sol (1-2-3), destra Do# + Mi.",
      ],
      measures: [
        b1, b2, b3, b4, b5, b14, b15,
        M(["F", "A7"], "F4:4 r:4 C#4+E4:8", "3 2/3", "A3:4 Ab3:4 G3:8", "1 2 3"),
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Il ponte (B)",
      focus: "Battute 17–24: in Re minore",
      tempo: 72,
      firstMeasure: 17,
      tips: [
        "Il ponte va in Re minore: la destra sale Re – Fa – Sol – La (1-2-3-4).",
        "Sinistra in minime: Do – Si naturale, Sib – Si naturale, Do – Sib (attenzione alle alterazioni: «B flat» indica il Si bemolle).",
        "Battuta 20, sul Mi: Si naturale alla destra, Sol# alla sinistra.",
        "Battuta 23: il pollice passa sotto il 4° dito. Battuta 24: Fa naturale nel basso, poi Do# – Re – Sib.",
      ],
      measures: [
        M(["Dm7", "Dm6"], "D4:4 F4:4 G4:4 A4:4", "1 2 3 4", "C4:8 B3:8", "1 2"),
        M(["Dm", "Dm6"], "F4:4 D4:4 F4:8", "2 1 2", "Bb3:8 B3:8", "2 1"),
        M(["Dm7", "Gm"], "D4:4 F4:4 G4:4 A4:4", "1 2 3 4", "C4:8 Bb3:8", "1 2"),
        M(["Am", "E"], "C5:4 A4:4 B4:8", "5 3 4", "A3:8 G#3:8", "2 3"),
        M(["Dm7", "Gm"], "D4:4 F4:4 G4:4 A4:4", "1 2 1 2", "C4:8 Bb3:8", "1 2"),
        M(["Am", "E7"], "C5:4 D5:4 E5:4 D5:4", "3 4 5 4", "A3:8 G#3:8", "2 4"),
        M(["Am7", "D7"], "C5:4 A4:4 C5:4 C5:4", "2 1 4 4", "G3:8 F#3:8", "1 2"),
        M(["Gm7", "C7"], "A4:8 G4:4 r:4", "2 1", "F3:4 C#3:4 D3:4 Bb3:4", "3 5 4 2"),
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "Ultima A",
      focus: "Battute 25–32: ripresa e finale",
      tempo: 72,
      firstMeasure: 25,
      tips: [
        "Le battute 25–30 sono come le 9–14.",
        "Battuta 31: Fa tenuto, sinistra Do – Si – Sib.",
        "Ultima battuta: Fa, pausa, poi Fa + Do con il punto coronato (1 e 5); sotto Sol, poi l'accordo che si risolve sul Fa.",
      ],
      measures: [
        b1, b2, b3, b4, b5, b14, b15,
        M(["F"], "F4:4 r:4 F4+C5:8", "3 1/5", "G3:4 Bb3+C4:4 A3+C4:8", "3 2/1 2/1"),
      ],
    },
  ],
};
