// Il temporale (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_il_temporale: Song = {
  slug: "il-temporale",
  title: "Il temporale",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/il-temporale.mp3",
  mode: "minor",
  videoKey: "Eb",
  baseKey: "Eb",
  progression: ["C", "Csus4", "C+", "C", "Fm", "Csus4", "C"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do minore (3 bemolle in chiave).", "Tempo indicato: semiminima = 120. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–9",
      focus: "Battute 1–9",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["C"], rh: "C4:8 G4:8", rf: "1 3", lh: "C3:16", lf: "1" },
        { chords: ["Csus4", "C+"], rh: "F4:8 Ab4:8", rf: "2 4", lh: "C3:16", lf: "1" },
        { chords: [], rh: "C4:16", rf: "1", lh: "C3:16", lf: "1" },
        { chords: [], rh: "C4:16", rf: "1", lh: "C3:16", lf: "1" },
        { chords: ["C", "Fm"], rh: "C4:4 G4:4 F4:4 Ab4:4", rf: "1 3 2 4", lh: "C3:16", lf: "1" },
        { chords: ["Csus4", "C"], rh: "G4:4 F4:4 G4:8", rf: "3 2 3", lh: "C3:16", lf: "1" },
        { chords: [], rh: "C4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 5 4 3 2 3 4 5", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "C4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 5 4 3 2 3 4 5", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "D4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "2 5 4 3 2 3 4 5", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 10–18",
      focus: "Battute 10–18",
      tempo: 100,
      firstMeasure: 10,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "B3:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 5 3 2 1 2 3 4", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "C4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "C4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "D4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "B3:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "C3:4 r:4 C3:4 r:4", lf: "1 1" },
        { chords: [], rh: "C4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "Ab2:4 r:4 Ab2:4 r:4", lf: "3 3" },
        { chords: [], rh: "C4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "F2:4 r:4 F2:4 r:4", lf: "5 5" },
        { chords: [], rh: "D4:2 G4:2 F4:2 Eb4:2 D4:2 Eb4:2 F4:2 G4:2", rf: "1 4 3 2 1 2 3 4", lh: "G2:16", lf: "4" },
        { chords: [], rh: "C4:16", rf: "1", lh: "C3:16", lf: "1" },
      ],
    },
  ],
};
