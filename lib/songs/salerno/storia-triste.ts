// Storia triste (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_storia_triste: Song = {
  slug: "storia-triste",
  title: "Storia triste",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/storia-triste.mp3",
  mode: "minor",
  videoKey: "Bb",
  baseKey: "Bb",
  progression: ["Gm", "Cm", "Gm", "Dm", "Gm", "Cm", "Gm", "D"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Sol minore (2 bemolle in chiave).", "Tempo indicato: semiminima = 140. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–9",
      focus: "Battute 1–9",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "Bb2+D3+G3:16", lf: "5/3/1" },
        { chords: ["Cm"], rh: "C5:2 G4:2 C5:2 G4:2 C5:2 G4:2 C5:2 G4:2", rf: "4 1 4 1 4 1 4 1", lh: "C3+Eb3+G3:16", lf: "4/2/1" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "Bb2+D3+G3:16", lf: "4/2/1" },
        { chords: ["Dm"], rh: "F4:2 D4:2 F4:2 D4:2 F4:2 D4:2 F4:2 D4:2", rf: "2 1 2 1 2 1 2 1", lh: "A2+D3+F3:16", lf: "5/2/1" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "Bb2+D3+G3:16", lf: "4/2/1" },
        { chords: ["Cm"], rh: "C5:2 G4:2 C5:2 G4:2 C5:2 G4:2 C5:2 G4:2", rf: "4 1 4 1 4 1 4 1", lh: "C3+Eb3+G3:16", lf: "3/2/1" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 C5:2", rf: "3 1 3 1 3 1 3 4", lh: "Bb2+D3+G3:16", lf: "4/2/1" },
        { chords: ["D"], rh: "A4:16", rf: "2", lh: "A2+D3+F#3:16", lf: "5/3/2" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "Bb2+D3+G3:4 Bb2+D3+G3:4 r:4 Bb2+D3+G3:4", lf: "4/2/1 4/2/1 4/2/1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 10–17",
      focus: "Battute 10–17",
      tempo: 100,
      firstMeasure: 10,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Cm"], rh: "C5:2 G4:2 C5:2 G4:2 C5:2 G4:2 C5:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "C3+Eb3+G3:4 C3+Eb3+G3:4 r:4 C3+Eb3+G3:4", lf: "3/2/1 3/2/1 3/2/1" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2", rf: "2 1 2 1 2 1 2 1", lh: "Bb2+D3+G3:4 Bb2+D3+G3:4 r:4 Bb2+D3+G3:4", lf: "4/2/1 4/2/1 4/2/1" },
        { chords: ["Dm"], rh: "F4:2 D4:2 F4:2 D4:2 F4:2 D4:2 F4:2 D4:2", rf: "2 1 2 1 2 1 2 1", lh: "A2+D3+F3:4 A2+D3+F3:4 r:4 A2+D3+F3:4", lf: "5/3/2 5/2/1 5/3/2" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "Bb2+D3+G3:4 Bb2+D3+G3:4 r:4 Bb2+D3+G3:4", lf: "4/2/1 4/2/1 4/2/1" },
        { chords: ["Cm"], rh: "C5:2 G4:2 C5:2 G4:2 C5:2 G4:2 C5:2 G4:2", rf: "3 1 3 1 3 1 3 1", lh: "C3+Eb3+G3:4 C3+Eb3+G3:4 r:4 C3+Eb3+G3:4", lf: "3/2/1 3/2/1 3/2/1" },
        { chords: ["Gm"], rh: "Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 G4:2 Bb4:2 C5:2", rf: "2 1 2 1 2 1 2 3", lh: "Bb2+D3+G3:4 Bb2+D3+G3:4 r:4 Bb2+D3+G3:4", lf: "4/2/1 4/2/1 4/2/1" },
        { chords: ["D"], rh: "A4:16", rf: "1", lh: "D3:2 A3:2 D4:2 A3:2 D3:2 C3:2 Bb2:2 A2:2", lf: "5 2 1 2 1 2 3 4" },
        { chords: ["Dsus4"], rh: "r:16", lh: "G2:2 D3:2 G3:2 A3:2 Bb3:8", lf: "5 2 1 3 2" },
      ],
    },
  ],
};
