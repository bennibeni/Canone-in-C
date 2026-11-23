// Vento dell'Est (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_vento_dellest: Song = {
  slug: "vento-dellest",
  title: "Vento dell'Est",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/vento-dellest.mp3",
  mode: "minor",
  videoKey: "G",
  baseKey: "G",
  progression: ["Em", "Cmaj7", "B", "Em", "Cmaj7", "A7", "F#m7", "B"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Mi minore (1 diesis in chiave).", "Tempo indicato: semiminima = 105. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–10",
      focus: "Battute 1–10",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Em"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "r:16" },
        { chords: ["Em"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "r:16" },
        { chords: ["Em"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "E3:16", lf: "1" },
        { chords: ["Em"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "E3:16", lf: "1" },
        { chords: ["Cmaj7"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "C3:16", lf: "3" },
        { chords: ["Cmaj7"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "C3:16", lf: "3" },
        { chords: [], rh: "E4:2 B4:2 E5:2 D5:2 C5:2 B4:2 A4:2 G4:2", rf: "1 2 5 4 3 2 1 3", lh: "A2:16", lf: "5" },
        { chords: [], rh: "F#4:2 G4:2 F#4:2 G4:2 A4:2 B4:2 A4:2 G4:2", rf: "2 3 2 3 4 5 4 3", lh: "A2:16", lf: "5" },
        { chords: ["B"], rh: "F#4:16", rf: "2", lh: "B2:16", lf: "4" },
        { chords: ["B"], rh: "F#4:16", rf: "2", lh: "B2:16", lf: "4" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 11–20",
      focus: "Battute 11–20",
      tempo: 100,
      firstMeasure: 11,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Em"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "E3:16", lf: "1" },
        { chords: ["Em"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "E3:16", lf: "1" },
        { chords: ["Cmaj7"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "C3:16", lf: "2" },
        { chords: ["Cmaj7"], rh: "E4:2 G4:2 B4:2 G4:2 A4:2 F#4:2 G4:2 E4:2", rf: "1 3 5 3 4 2 3 1", lh: "C3:16", lf: "1" },
        { chords: [], rh: "E4:2 B4:2 E5:2 D5:2 E5:2 C5:2 E5:2 B4:2", rf: "1 2 5 4 5 3 5 2", lh: "A2:16", lf: "3" },
        { chords: ["A7", "F#m7"], rh: "E5:2 A4:2 E5:2 G4:2 E5:2 F#4:2 E5:2 E4:2", rf: "5 1 5 1 5 1 5 1", lh: "A2:16", lf: "3" },
        { chords: ["B"], rh: "D#4:16", rf: "2", lh: "B2:16", lf: "2" },
        { chords: ["B"], rh: "F#4:16", rf: "4", lh: "B2:16", lf: "2" },
        { chords: [], rh: "E4:16", rf: "3", lh: "E3:16", lf: "1" },
        { chords: [], rh: "r:16", lh: "E2:16", lf: "5" },
      ],
    },
  ],
};
