// Nella notte buia (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_nella_notte_buia: Song = {
  slug: "nella-notte-buia",
  title: "Nella notte buia",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/nella-notte-buia.mp3",
  mode: "minor",
  videoKey: "D",
  baseKey: "D",
  progression: ["Bm", "Em", "Gmaj7", "A", "E7", "Bm", "Em", "Gmaj7"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Si minore (2 diesis in chiave).", "Tempo indicato: semiminima = 110. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–7",
      focus: "Battute 1–7",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Bm"], rh: "D4:12 F#4:4", rf: "2 4", lh: "B2:4 F#3:4 B3:8", lf: "5 2 1" },
        { chords: ["Em"], rh: "E4:12 G4:4", rf: "3 5", lh: "G2:4 G3:4 B3:8", lf: "2 2 1" },
        { chords: ["Gmaj7"], rh: "F#4:12 D4:2 B3:2", rf: "4 2 1", lh: "G2:4 D3:4 G3:8", lf: "5 2 1" },
        { chords: ["A"], rh: "E4:16", rf: "3", lh: "F#2:4 D3:4 A3:8", lf: "5 2 1" },
        { chords: ["E7"], rh: "E4:4 D4:2 E4:2 C#4:2 D4:2 E4:2 F#4:2", rf: "4 3 4 2 3 4 5", lh: "E2:8 F#2:8", lf: "5 4" },
        { chords: ["Bm"], rh: "D4:12 F#4:4", rf: "2 4", lh: "B2:4 F#3:4 B3:8", lf: "5 2 1" },
        { chords: ["Em"], rh: "E4:12 G4:4", rf: "2 4", lh: "G2:4 G3:4 B3:8", lf: "2 2 1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 8–14",
      focus: "Battute 8–14",
      tempo: 100,
      firstMeasure: 8,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Gmaj7"], rh: "F#4:12 A4:2 G4:2", rf: "3 5 4", lh: "G2:4 D3:4 G3:8", lf: "5 2 1" },
        { chords: ["A"], rh: "E4:16", rf: "2", lh: "F#2:4 D3:4 A3:8", lf: "5 2 1" },
        { chords: ["E7", "F#"], rh: "E4:2 D4:2 D4:2 E4:2 C#4:8", rf: "4 3 3 4 2", lh: "E2:8 F#2:8", lf: "5 4" },
        { chords: ["C#ø7", "Dmaj7"], rh: "C#4:4 B3:2 C#4:2 D4:4 C#4:2 D4:2", rf: "2 1 2 3 2 1", lh: "G2:8 A2:8", lf: "3 2" },
        { chords: ["Dsus4", "Gmaj7"], rh: "A4:4 G4:4 G4:4 F#4:4", rf: "5 4 4 3", lh: "D3:16", lf: "1" },
        { chords: ["C#ø7", "Dmaj7"], rh: "C#4:4 B3:2 C#4:2 D4:4 C#4:2 D4:2", rf: "2 1 2 3 2 3", lh: "G2:8 A2:8", lf: "5 4" },
        { chords: [], rh: "F#4:4 E4:4 D4:4 C#4:4", rf: "5 4 3 2", lh: "D3:8 A#2:8", lf: "1 4" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Battute 15–21",
      focus: "Battute 15–21",
      tempo: 100,
      firstMeasure: 15,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Bm"], rh: "D4:12 F#4:4", rf: "1 4", lh: "B2:4 F#3:4 B3:8", lf: "5 2 1" },
        { chords: ["Em"], rh: "E4:12 G4:4", rf: "3 5", lh: "G2:4 G3:4 B3:8", lf: "2 2 1" },
        { chords: ["Gmaj7"], rh: "F#4:12 A4:2 G4:2", rf: "4 5 4", lh: "G2:4 D3:4 G3:8", lf: "5 2 1" },
        { chords: ["A"], rh: "E4:16", rf: "2", lh: "F#2:4 D3:4 A3:8", lf: "5 2 1" },
        { chords: ["E7", "F#"], rh: "E4:2 D4:2 D4:2 E4:2 C#4:8", rf: "4 3 3 4 2", lh: "E2:8 F#2:8", lf: "5 4" },
        { chords: ["Bm(maj7)"], rh: "B3:2 A#3:2 B3:2 D4:2 F#4:2 A#4:2 B4:2 D5:2", rf: "1 2 1 2 3 5 1 2", lh: "B2:16", lf: "1" },
        { chords: ["B"], rh: "F#5:8 r:8", rf: "4", lh: "B2:8 r:8", lf: "1" },
      ],
    },
  ],
};
