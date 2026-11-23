// La città vuota (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_la_citta_vuota: Song = {
  slug: "la-citta-vuota",
  title: "La città vuota",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/la-citta-vuota.mp3",
  mode: "minor",
  videoKey: "Eb",
  baseKey: "Eb",
  progression: ["Fm", "Eb", "Dm", "Fsus4", "Ebmaj7", "Cm"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do minore (3 bemolle in chiave).", "Tempo indicato: semiminima = 70. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–7",
      focus: "Battute 1–7",
      tempo: 70,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Fm"], rh: "Eb4:2 D4:2 Eb4:2 Bb4:2 Ab4:8", rf: "2 1 2 5 4", lh: "C3:8 F2:8", lf: "1 5" },
        { chords: ["Eb"], rh: "D4:2 C4:2 D4:2 Ab4:2 G4:8", rf: "2 1 2 5 4", lh: "Bb2:8 Eb2:8", lf: "2 5" },
        { chords: ["Dm"], rh: "C4:2 Bb3:2 C4:2 G4:2 F4:8", rf: "2 1 2 5 4", lh: "Ab2:8 D2:8", lf: "2 5" },
        { chords: [], rh: "D4:2 C4:2 D4:2 F4:2 D4:4 Eb4:4", rf: "2 1 2 3 1 2", lh: "G2:8 C3:8", lf: "3 1" },
        { chords: [], rh: "Eb4:2 D4:2 Eb4:2 Bb4:2 Bb4:2 C5:2 Ab4:4", rf: "2 1 2 5 4 5 3", lh: "C3:8 F2:8", lf: "1 5" },
        { chords: [], rh: "D4:2 C4:2 D4:2 Ab4:2 Ab4:2 Bb4:2 G4:4", rf: "1 4 1 4 4 5 3", lh: "Bb2:8 Eb2:8", lf: "2 5" },
        { chords: [], rh: "C4:2 Bb3:2 C4:2 G4:2 G4:2 Ab4:2 F4:4", rf: "1 2 1 4 4 5 3", lh: "Ab2:8 D2:8", lf: "2 5" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 8–13",
      focus: "Battute 8–13",
      tempo: 70,
      firstMeasure: 8,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "D4:2 Eb4:2 F4:2 D4:2 F3+Bb3+D4:8", rf: "2 3 4 2 1/3/5", lh: "G2:8 C3:8", lf: "2 1" },
        { chords: ["Fsus4"], rh: "F3+Bb3+C4:16", rf: "1/3/4", lh: "C3:16", lf: "1" },
        { chords: [], rh: "D4:2 Eb4:2 F4:2 G4:2 Ab4:2 G4:2 F4:2 Eb4:2", rf: "2 3 1 2 3 2 1 3", lh: "r:16" },
        { chords: ["Ebmaj7"], rh: "D4:2 Eb4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 D4:2", rf: "2 3 5 4 3 2 3 2", lh: "r:16" },
        { chords: [], rh: "F3+Bb3+D4:16", rf: "1/3/5", lh: "C3:16", lf: "1" },
        { chords: ["Cm"], rh: "Eb3+G3+C4:16", rf: "1/2/4", lh: "C3:16", lf: "1" },
      ],
    },
  ],
};
