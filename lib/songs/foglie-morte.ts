// Foglie morte (Les Feuilles Mortes), musica di J. Kosma, testo di J. Prévert. Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), 33 battute: lo spartito indica «La minore» (parte da Lam7), ma le frasi si chiudono in Mi minore.
// È lo stesso brano di Autumn Leaves (Reeves Wong), che è una quarta sopra: Lam7–Re7–Solmaj7… qui, Rem–Sol–Do… là. Pubblicato con il permesso dell'editore.
// Note e DITEGGIATURE dallo spartito; alle note senza dito stampato è dato quello della posizione della mano.
// La sinistra a volte tiene una nota lunga sotto le semiminime: l'app suona una voce sola, la nota lunga
// suona all'inizio e poi seguono le semiminime. Le note brevi di battute 19, 21 e 25 sono semplificate a semiminime.
// La D.S. finale (ripresa dal segno, battuta 2) non è ripetuta: si torna indietro con il loop.
import type { Song } from "../score";

const att = (a: string, b: string, c: string, rf = "1 2 3") => ({ rh: `r:4 ${a}:4 ${b}:4 ${c}:4`, rf });
const acc = (ch: string, rf: string) => ({ rh: `${ch}:16`, rf });
const arp = (b: string, x: string, y: string) => ({ lh: `${b}:4 ${x}:4 ${y}:4 ${x}:4`, lf: "5 2 1 2" });
const bic = (ch: string) => ({ lh: `${ch}:16`, lf: "3/1" });

export const foglieMorte: Song = {
  slug: "foglie-morte",
  title: "Foglie morte",
  composer: "Joseph Kosma (Les Feuilles Mortes), testo di Jacques Prévert",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "minor",
  videoKey: "C",
  progression: ["Am7", "D7", "Gmaj7", "Cmaj7", "F#ø7", "B7", "Em"],
  progressionLabel: "il giro per quarte",
  fullTips: [
    "Uno degli standard più suonati dai jazzisti: gli accordi si susseguono per quarte, come nelle cadenze di Bach.",
    "Il discorso passa da una mano all'altra: tre note della destra, poi la sinistra risponde sotto l'accordo tenuto.",
    "Usa il pedale a ogni cambio di accordo.",
    "Nello spartito la D.S. dell'ultima battuta fa ricominciare dal segno (battuta 2).",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "L'esposizione",
      focus: "Battute 1–8: tre note che salgono e un accordo tenuto",
      tempo: 84,
      tips: [
        "Destra: tre semiminime col 1-2-3, poi un bicordo tenuto per tutta la battuta.",
        "Sinistra: sotto il bicordo suona il basso col 5 e poi tre note col 2-1-2.",
        "Battuta 8: la sinistra scende cromaticamente Mi – Re – Do♯ – Do.",
      ],
      measures: [
        { chords: [], ...att("E4", "F#4", "G4"), lh: "r:16" },
        { chords: ["Am7"], ...acc("G4+C5", "2/5"), ...arp("A2", "E3", "G3") },
        { chords: ["D7"], ...att("D4", "E4", "F#4"), ...bic("D3+F#3") },
        { chords: ["Gmaj7"], ...acc("F#4+B4", "2/5"), ...arp("G2", "D3", "F#3") },
        { chords: ["Cmaj7"], ...att("C4", "D4", "E4"), ...bic("C3+E3") },
        { chords: ["F#ø7"], ...acc("E4+A4", "3/5"), ...arp("F#2", "C#3", "E3") },
        { chords: ["B7"], ...att("B3", "C#4", "D#4"), ...bic("B2+D#3") },
        { chords: ["Em"], ...acc("E4+G4", "1/5"), lh: "E3:4 D3:4 C#3:4 C3:4", lf: "1 2 3 4" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "La ripetizione",
      focus: "Battute 9–16: la stessa frase, con un finale diverso",
      tempo: 84,
      firstMeasure: 9,
      tips: [
        "Come la parte 1. Battuta 15: Fa♯ – La – Sol con 2-4-3.",
        "Battuta 16: Mi tenuto, la sinistra scende Re – Do♯ – Do.",
      ],
      measures: [
        { chords: ["B7"], ...att("E4", "F#4", "G4"), lh: "B2:16", lf: "5" },
        { chords: ["Am7"], ...acc("G4+C5", "2/5"), ...arp("A2", "E3", "G3") },
        { chords: ["D7"], ...att("D4", "E4", "F#4"), ...bic("D3+F#3") },
        { chords: ["Gmaj7"], ...acc("F#4+B4", "2/5"), ...arp("G2", "D3", "F#3") },
        { chords: ["Cmaj7"], ...att("C4", "D4", "E4"), ...bic("C3+E3") },
        { chords: ["F#ø7"], ...acc("E4+A4", "2/5"), ...arp("F#2", "C#3", "E3") },
        { chords: ["B7"], ...att("F#4", "A4", "G4", "2 4 3"), ...bic("B2+D#3") },
        { chords: ["Em"], rh: "E4:16", rf: "1", lh: "r:4 D3:4 C#3:4 C3:4", lf: "1 2 3" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "La seconda parte",
      focus: "Battute 17–24: più ardita, con le modulazioni",
      tempo: 80,
      firstMeasure: 17,
      tips: [
        "mf: Mi – Re♯ – Mi con 3-2-3 sopra il Si basso, poi l'accordo di Si (1-3-4).",
        "Battute 19 e 21: in mezzo alla frase c'è un bicordo (pollice e 3).",
        "Battuta 20: la sinistra scende Mi – Mi♭; battuta 21 sale Re – Re♯ – Mi.",
      ],
      measures: [
        { chords: ["B7"], rh: "r:4 E4:4 D#4:4 E4:4", rf: "3 2 3", lh: "B2:16", lf: "5" },
        { chords: ["B", "B7"], rh: "B3+D#4+F#4:16", rf: "1/3/4", lh: "B2:8 A3:8", lf: "5 1" },
        { chords: ["F#ø7", "B7"], rh: "r:4 F#4:4 B3+E4:4 F#4:4", rf: "4 1/3 4", lh: "F#3:8 C#3:4 D#3:4", lf: "2 3 2" },
        { chords: ["Em7", "Eb"], rh: "D4+E4+G4:16", rf: "2/3/5", lh: "E3:8 Eb3:8", lf: "1 2" },
        { chords: ["D", "D#°"], rh: "r:4 G4:4 C#4+F#4:4 G4:4", rf: "4 1/3 4", lh: "D3:8 D#3:4 E3:4", lf: "3 2 1" },
        { chords: ["F#ø7", "Em"], rh: "E4+A4:16", rf: "2/5", lh: "F#3:8 E3:8", lf: "2 3" },
        { chords: ["D7"], rh: "r:4 A4:4 D5:4 C5:4", rf: "2 5 4", lh: "D3:8 F#3:8", lf: "4 2" },
        { chords: ["G", "D7"], rh: "F#4+B4:16", rf: "1/3", lh: "G3:8 F#3:8", lf: "1 2" },
      ],
    },
    {
      id: 4,
      title: "Parte 4",
      subtitle: "Il culmine e la fine",
      focus: "Battute 25–33: forte, note lunghe, poi la chiusa in La minore",
      tempo: 80,
      firstMeasure: 25,
      tips: [
        "Battuta 25: forte. Si – La♯ – Si con 4 e 3, la sinistra sale Mi – Fa♯ – Sol.",
        "Battute 26–30: note lunghe (minime puntate) seguite da un salto: tienile per tutto il valore.",
        "Battuta 31: Re♯ – Fa♯ – La – Sol con 2-3-5-4 sopra l'accordo di Si7.",
        "Battuta 33: la frase iniziale, mezzo piano, per ricominciare (D.S.).",
      ],
      measures: [
        { chords: ["Em", "F#"], rh: "r:4 B4:4 E4+A#4:4 B4:4", rf: "4 1/3 4", lh: "E3:8 F#3:4 G3:4", lf: "3 2 1" },
        { chords: ["Am"], rh: "A4+C5:12 E4:4", rf: "2/5 1", lh: "A3:16", lf: "2" },
        { chords: ["D7"], rh: "F#4:12 C5:4", rf: "2 5", lh: "D3:8 F#3:8", lf: "5 3" },
        { chords: ["G"], rh: "F#4+B4:12 D4:4", rf: "2/4 1", lh: "G3:16", lf: "2" },
        { chords: ["Cmaj7"], rh: "E4:12 B4:4", rf: "2 5", lh: "C3+B3:8 E3:8", lf: "5/1 3" },
        { chords: ["F#ø7", "C#°"], rh: "E4+A4:12 C#4:4", rf: "1/4 1", lh: "G#3:8 E3:8", lf: "2 3" },
        { chords: ["B7"], rh: "D#4:4 F#4:4 A4:4 G4:4", rf: "2 3 5 4", lh: "B2+A3:16", lf: "5/1" },
        { chords: ["Em"], rh: "E4:16", rf: "2", lh: "r:4 D3:4 C#3:4 C3:4", lf: "2 3 4" },
        { chords: ["B7"], rh: "r:4 E4:4 F#4:4 G4:4", rf: "1 2 3", lh: "B2:16", lf: "5" },
      ],
    },
  ],
};
