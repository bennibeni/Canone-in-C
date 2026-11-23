// Scrigno dei misteri (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_scrigno_dei_misteri: Song = {
  slug: "scrigno-dei-misteri",
  title: "Scrigno dei misteri",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/scrigno-dei-misteri.mp3",
  mode: "minor",
  videoKey: "C",
  progression: ["B7", "Dm", "E7", "A", "B7", "Dm", "A", "B7"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: La minore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 90. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–8",
      focus: "Battute 1–8",
      tempo: 90,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["B7"], rh: "r:4 A5:2 B5:2 C6:2 B5:2 A5:2 E5:2", rf: "2 3 4 3 2 1", lh: "r:16" },
        { chords: ["Dm", "E7"], rh: "D5:6 F5:2 E5:6 D5:2", rf: "2 4 3 2", lh: "D3:8 E3:8", lf: "2 1" },
        { chords: ["A"], rh: "E5:16", rf: "1", lh: "A2:16", lf: "5" },
        { chords: ["B7"], rh: "r:4 A5:2 B5:2 C6:2 B5:2 A5:2 E5:2", rf: "2 3 4 3 2 1", lh: "r:16" },
        { chords: ["Dm"], rh: "D5:6 F5:2 E5:2 D5:2 C5:2 B4:2", rf: "2 4 3 2 1 3", lh: "D3:8 E3:8", lf: "2 1" },
        { chords: ["A"], rh: "A4:16", rf: "2", lh: "A2:4 E3:4 A2:4 r:4", lf: "5 1 5" },
        { chords: ["B7"], rh: "r:4 A5:2 B5:2 C6:2 B5:2 A5:2 E5:2", rf: "3 4 5 4 3 1", lh: "r:16" },
        { chords: ["Dm"], rh: "D5:6 F5:2 G5:6 F5:2", rf: "2 4 5 2", lh: "D3:8 E3+G#3:8", lf: "3 1/2" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 9–16",
      focus: "Battute 9–16",
      tempo: 90,
      firstMeasure: 9,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["A"], rh: "E5:16", rf: "1", lh: "A2:8 r:8", lf: "5" },
        { chords: ["B7"], rh: "r:4 A5:2 B5:2 C6:2 B5:2 A5:2 E5:2", rf: "2 3 4 3 2 1", lh: "r:16" },
        { chords: ["Dm"], rh: "D5:6 F5:2 E5:2 D5:2 C5:2 B4:2", rf: "2 4 3 2 1 3", lh: "D3:8 E3:8", lf: "2 1" },
        { chords: ["A"], rh: "A4:4 E5:4 A4:4 r:4", rf: "2 5 1", lh: "A2:4 E3:4 A2:4 r:4", lf: "5 1 5" },
        { chords: ["Dsus4"], rh: "A4:2 G4:2 G4:2 A4:2 B4:2 B4:2 A4:2 G4:2", rf: "3 2 2 3 4 4 3 2", lh: "G2:4 D2:4 G2:4 D2:4", lf: "2 5 2 5" },
        { chords: ["C"], rh: "F4:2 E4:2 E4:2 D#4:2 E4:8", rf: "1 3 3 2 3", lh: "C3:4 G2:4 C3:4 G2:4", lf: "1 4 1 4" },
        { chords: [], rh: "D4:2 C4:2 C4:2 D4:2 E4:2 E4:2 F#4:2 G#4:2", rf: "2 1 1 2 3 1 2 3", lh: "B2:4 F2:4 E3:4 E2:4", lf: "2 5 1 5" },
        { chords: ["A"], rh: "A4:2 E4:2 A4:2 E4:2 A4:8", rf: "4 1 3 1 3", lh: "A2:4 E3:4 A2:8", lf: "4 1 5" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Battute 17–22",
      focus: "Battute 17–22",
      tempo: 90,
      firstMeasure: 17,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["B7"], rh: "r:4 A5:2 B5:2 C6:2 B5:2 A5:2 E5:2", rf: "2 3 4 3 2 1", lh: "r:4 A3:2 B3:2 C4:2 B3:2 A3:2 E3:2", lf: "4 3 2 3 1 4" },
        { chords: ["Dm", "E7"], rh: "D5:6 F5:2 E5:6 D5:2", rf: "2 4 3 2", lh: "D3:2 A3:2 F3:4 E3:2 B3:2 G#3:4", lf: "5 2 4 5 1 2" },
        { chords: ["Esus4"], rh: "E5:16", rf: "1", lh: "A2:2 E3:2 A3:2 B3:2 C4:2 B3:2 A3:2 E3:2", lf: "5 2 1 3 2 3 1 2" },
        { chords: ["B7"], rh: "r:4 A5:2 B5:2 C6:2 B5:2 A5:2 E5:2", rf: "2 3 4 3 2 1", lh: "A2:4 r:12", lf: "5" },
        { chords: ["Dm"], rh: "D5:6 F5:2 E5:2 D5:2 C5:2 B4:2", rf: "2 4 3 2 1 3", lh: "D3:2 A3:2 F3:4 E3:2 B3:2 G#3:4", lf: "5 1 3 4 1 2" },
        { chords: ["A"], rh: "A4:16", rf: "2", lh: "A2:4 E3:4 A2:4 r:4", lf: "5 1 5" },
      ],
    },
  ],
};
