// Misty, musica di Erroll Garner, testo di Johnny Burke. Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in Do maggiore, levare + 39 battute, forma A-A-B-A.
// Pubblicato con il permesso dell'editore. Note e DITEGGIATURE dallo spartito; alle note senza dito stampato
// è dato quello della posizione della mano.
// Battute 5, 13, 29 e 37: la semiminima è legata alla prima nota della terzina che segue: è scritta come un
// gruppo unico ("[B4+E5:4 F5 G5]:8", nota lunga + due crome di terzina), quindi lo spartito mostra un gruppo di 6.
// Dove la destra tiene una nota lunga sopra un'altra voce (battute 7, 23, 24…) l'app suona una voce sola.
// Gli accordi della sinistra nel ponte (battute 16–24) sono letti da una stampa poco nitida: da verificare.
import type { Song } from "../score";

type Ms = { chords: string[]; rh: string; rf: string; lh: string; lf: string };
const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Ms => ({ chords, rh, rf, lh, lf });

const a1 = M(["Cmaj7"], "C4+E4+G4+B4:12 G4:2 A4:2", "1/2/3/5 1 2", "C3:4 E3:4 G3:8", "5 3 1");
const a2 = M(["Gm7", "C7"], "Bb4:2 A5:2 A5:2 A5:2 A5:2 G5:2 E5:2 C5:2", "1 5 5 5 5 4 2 1", "F3+G3+Bb3:8 E3+G3+Bb3:8", "3/2/1 4/3/1");
const a3 = M(["Fmaj7"], "E4+A4:8 E4:2 F4:2 A4:2 C5:2", "1/3 2 1 2 3", "F3:4 A3:12", "5 4");
const a4 = M(["Fm7", "Bb7"], "G5:2 G5:2 G5:2 F5:2 G5:4 F5:4", "5 5 5 4 5 4", "Eb3+G3+Bb3+C4:8 D3+F3+Bb3:8", "4/3/2/1 5/3/1");
const a5 = M(["C", "Am7"], "[B4+E5:4 F5 G5]:8 [C5:4 D5 E5]:8", "1/3 4 5 2 3 4", "C3:4 B2:4 A2+G3:4 E3:4", "3 4 5/1 2");
const a6 = M(["Dm7", "G7"], "C5+F5:4 A4:4 [B4 C5 D5]:8", "2/5 1 2 3 4", "D3:4 C3:4 F2+F3:8", "3 4 5/1");
const a6b = M(["Dm7", "G7"], "C5+F5:4 A4:4 [B4 C5 D5]:8", "2/5 1 2 3 4", "D3:4 C3:4 G2+F3:8", "3 4 5/1");
const a7 = M(["Am/C", "A7/C#"], "B4+E5:8 Bb4:8", "2/5 1", "C3:8 C#3:8", "4 3");
const a8 = M(["Dm7", "G7"], "A4+E5:8 Eb5:4 G5:2 E5:2", "1/5 3 5 4", "D3+C4:8 G3+B3:8", "5/1 2/1");
const fine = M(["C6"], "E4+C5:16", "1/5", "C3+E3+A3:16", "5/2/1");

export const misty: Song = {
  slug: "misty",
  title: "Misty",
  composer: "Erroll Garner, testo di Johnny Burke",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "C",
  progression: ["Cmaj7", "Gm7", "C7", "Fmaj7", "Fm7", "Bb7", "Am7", "Dm7", "G7"],
  progressionLabel: "il giro della strofa",
  fullTips: [
    "Composta da Erroll Garner nel 1954 e resa celebre dal film «Brivido nella notte» (Play Misty for Me) di Clint Eastwood.",
    "Forma A-A-B-A: la parte A torna tre volte, la parte centrale (B) modula verso tonalità lontane.",
    "Lentamente e molto legato: la sinistra suona accordi tenuti (spesso senza la fondamentale, come nel jazz).",
    "Le terzine vanno distese, senza correre: tre note uguali nello spazio di uno (o due) movimenti.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema (A)",
      focus: "Levare e battute 1–8",
      tempo: 60,
      pickup: true,
      tips: [
        "Levare: Sol – Mi col 5, poi l'accordo di Domaj7 tenuto (1-2-3-5).",
        "Battuta 2: Si♭ col pollice e salto al La acuto col 5; i La ribattuti tutti col 5.",
        "Battuta 5: la nota lunga si lega alla terzina: conta «uno-due-tri-o-la».",
        "Battuta 8: Sol – Mi finale è il levare della ripresa.",
      ],
      measures: [M([], "r:12 G5:2 E5:2", "5 3", "r:16", ""), a1, a2, a3, a4, a5, a6, a7, a8].map((m) =>
        m.lf === "" ? { chords: m.chords, rh: m.rh, rf: m.rf, lh: m.lh } : m
      ),
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il tema ripetuto (A)",
      focus: "Battute 9–15: come la prima volta, con la chiusa su Do",
      tempo: 60,
      firstMeasure: 9,
      tips: [
        "Uguale alla parte 1 fino alla battuta 13.",
        "Battuta 14: la sinistra scende sul Sol basso (Sol – Fa).",
        "Battuta 15: accordo finale Mi – Do sopra Do – Mi – La (Do6), tenuto.",
      ],
      measures: [a1, a2, a3, a4, a5, a6b, fine],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Il ponte (B)",
      focus: "Battute 16–24: terzine di semiminime e modulazioni",
      tempo: 60,
      firstMeasure: 16,
      tips: [
        "Battute 16 e 20: terzine di semiminime (tre note in due movimenti) che salgono, crescendo.",
        "Battuta 17: forte. Si♭ ribattuti col 4, l'ultimo legato alla minima.",
        "Battuta 22: Re♯ col pollice, poi la terzina Re – Si – La.",
        "Battuta 24: mp, Sol – Mi in levare per tornare al tema.",
      ],
      measures: [
        M(["C7"], "[r C4 D4]:8 [E4 G4 A4]:8", "1 2 1 2 3", "C3:16", "5"),
        M(["F7"], "Bb4:2 Bb4:2 Bb4:2 Bb4:10", "4 4 4 4", "Eb3+A3+C4:8 Eb3:4 D3:4", "3/2/1 2 3"),
        M(["Cmaj7", "C7"], "r:4 Bb4:2 C5:2 [Db5 C5 Bb4]:8", "3 4 5 4 3", "C3+B3:8 Bb3:8", "5/1 1"),
        M(["Em7"], "A4:2 A4:2 A4:2 A4:10", "4 4 4 4", "E3+G3+B3:8 E3:4 D3:4", "3/2/1 3 4"),
        M(["C"], "[r C4 D4]:8 [F4 G4 A4]:8", "2 1 2 3 4", "C3:16", "5"),
        M(["C#m"], "B4:2 B4:2 B4:2 A4:2 B4:8", "5 5 5 4 5", "C#3+E3+G#3:16", "4/2/1"),
        M(["B7"], "D#4:2 B4:2 B4:2 A4:2 [D5 B4 A4]:8", "1 4 4 3 5 4 3", "B2+A3:8 B2+F#3:8", "5/1 5/2"),
        M(["G7", "C7"], "D4+G4:8 Db4:8", "1/4 2", "B2+F3:8 Bb2+E3:8", "5/1 4/1"),
        M(["Dm7", "G7"], "C4+F4:8 B3:4 G5:2 E5:2", "1/3 1 5 4", "A2+F3:8 Ab2+D3:8", "5/2 4/1"),
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "La ripresa (A) e il finale",
      focus: "Battute 25–39: il tema due volte e la chiusa rallentando",
      tempo: 60,
      firstMeasure: 25,
      tips: [
        "Battute 25–32: come la parte 1.",
        "Battute 33–38: ancora il tema; rit. alla battuta 38.",
        "Battuta 39: accordo finale tenuto, piano.",
      ],
      measures: [a1, a2, a3, a4, a5, a6, a7, a8, a1, a2, a3, a4, a5, a6b, fine],
    },
  ],
};
