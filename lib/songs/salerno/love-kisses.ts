// Love Kisses (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_love_kisses: Song = {
  slug: "love-kisses",
  title: "Love Kisses",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/love-kisses.mp3",
  mode: "major",
  videoKey: "C",
  progression: ["Am", "Em", "F", "C", "Cm", "Dm7", "D7", "Gm"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do maggiore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 120. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–8",
      focus: "Battute 1–8",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Am"], rh: "C5:2 E4:2 C5:2 E4:2 C5:2 E4:2 C5:2 E4:2", rf: "5 1 5 1 5 1 5 1", lh: "A2+A3:16", lf: "3/1" },
        { chords: ["Em"], rh: "B4:2 E4:2 B4:2 E4:2 B4:2 E4:2 B4:2 E4:2", rf: "4 1 4 1 4 1 5 2", lh: "G2+G3:16", lf: "4/1" },
        { chords: ["F"], rh: "A4:2 C4:2 A4:2 C4:2 A4:2 C4:2 A4:2 C4:2", rf: "5 1 5 1 5 1 5 1", lh: "F2+F3:16", lf: "5/1" },
        { chords: ["C"], rh: "G4:2 C4:2 G4:2 C4:2 G4:2 C4:2 G4:2 C4:2", rf: "4 1 3 1 3 1 3 1", lh: "E2+E3:16", lf: "3/1" },
        { chords: ["Cm"], rh: "G4:2 C4:2 G4:2 C4:2 G4:2 C4:2 G4:2 C4:2", rf: "3 1 3 1 3 1 3 1", lh: "Eb2+Eb3:16", lf: "4/2" },
        { chords: ["Dm7"], rh: "F4:2 C4:2 F4:2 C4:2 F4:2 C4:2 F4:2 C4:2", rf: "3 1 2 1 2 1 2 1", lh: "D2+D3:16", lf: "5/1" },
        { chords: ["D7"], rh: "F#4:2 C4:2 F#4:2 C4:2 G4:2 C4:2 A4:2 C4:2", rf: "2 1 3 1 3 1 4 1", lh: "D2+D3:16", lf: "5/1" },
        { chords: ["Gm"], rh: "Bb4:2 D4:2 Bb4:2 D4:2 Bb4:2 D4:2 Bb4:2 D4:2", rf: "4 1 4 1 4 1 4 1", lh: "G2+G3:16", lf: "3/1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 9–15",
      focus: "Battute 9–15",
      tempo: 100,
      firstMeasure: 9,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Dm"], rh: "A4:2 D4:2 A4:2 D4:2 A4:2 D4:2 A4:2 D4:2", rf: "4 1 4 1 4 1 4 1", lh: "F2+F3:16", lf: "5/1" },
        { chords: ["Eb"], rh: "G4:2 Bb3:2 G4:2 Bb3:2 G4:2 Bb3:2 G4:2 Bb3:2", rf: "4 1 4 1 4 1 4 1", lh: "Eb2+Eb3:16", lf: "3/2" },
        { chords: ["Bb"], rh: "F4:2 Bb3:2 F4:2 Bb3:2 F4:2 Bb3:2 F4:2 Bb3:2", rf: "3 1 3 1 3 1 3 1", lh: "D2+D3:16", lf: "4/1" },
        { chords: ["Bbm"], rh: "F4:2 Bb3:2 F4:2 Bb3:2 F4:2 Bb3:2 F4:2 Bb3:2", rf: "4 1 4 1 4 1 4 1", lh: "Db2+Db3:16", lf: "5/1" },
        { chords: [], rh: "F4:2 Bb3:2 Eb4:2 Bb3:2 Db4:2 Bb3:2 C4:2 Bb3:2", rf: "4 1 3 1 3 1 2 1", lh: "Db2+Db3:16", lf: "5/1" },
        { chords: ["F"], rh: "A3+C4+F4:16", rf: "1/2/5", lh: "F2+F3:16", lf: "4/1" },
        { chords: ["F"], rh: "A3+C4+F4:16", rf: "1/2/5", lh: "F2+F3:16", lf: "4/1" },
      ],
    },
  ],
};
