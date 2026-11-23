// Ego superbo (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_ego_superbo: Song = {
  slug: "ego-superbo",
  title: "Ego superbo",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/ego-superbo.mp3",
  mode: "minor",
  videoKey: "C",
  progression: ["Am", "E", "Bsus4", "E", "Bsus4", "Am", "B\u00b0", "Dm"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: La minore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 120. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–8",
      focus: "Battute 1–8",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "A2:4 r:12", lf: "3" },
        { chords: ["Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "A2:4 r:12", lf: "3" },
        { chords: ["E", "Bsus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+B4:4", rf: "1/2 1/2 1/2/5", lh: "G#2:4 r:12", lf: "4" },
        { chords: ["E", "Bsus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+B4:4", rf: "1/2 1/2 1/2/5", lh: "G#2:4 r:12", lf: "4" },
        { chords: ["Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "A2:4 r:12", lf: "3" },
        { chords: ["B°", "Dm"], rh: "r:4 D4+F4:4 D4+F4:4 D4+F4+A4:4", rf: "1/3 1/3 2/3/5", lh: "B2:4 r:12", lf: "2" },
        { chords: ["C", "Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "C3:4 r:12", lf: "1" },
        { chords: ["Dm", "B°"], rh: "r:4 D4+F4:4 D4+F4:4 D4+F4+B4:4", rf: "1/2 1/2 1/2/5", lh: "D3:4 r:12", lf: "3" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 9–16",
      focus: "Battute 9–16",
      tempo: 100,
      firstMeasure: 9,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["E", "Bsus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+B4:4", rf: "1/2 1/2 1/2/5", lh: "E3:4 r:12", lf: "2" },
        { chords: ["E", "Esus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "E3:4 r:12", lf: "1" },
        { chords: ["E"], rh: "B3+E4+G#4:16", rf: "1/2/4", lh: "E3:16", lf: "1" },
        { chords: ["Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "A2:4 r:12", lf: "3" },
        { chords: ["Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "A2:4 r:12", lf: "3" },
        { chords: ["E", "Bsus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+B4:4", rf: "1/2 1/2 1/2/5", lh: "G#2:4 r:12", lf: "4" },
        { chords: ["E", "Bsus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+B4:4", rf: "1/2 1/2 1/2/5", lh: "G#2:4 r:12", lf: "4" },
        { chords: ["Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "A2:4 r:12", lf: "3" },
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Battute 17–23",
      focus: "Battute 17–23",
      tempo: 100,
      firstMeasure: 17,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["B°", "Dm"], rh: "r:4 D4+F4:4 D4+F4:4 D4+F4+A4:4", rf: "2/3 1/3 2/3/5", lh: "B2:4 r:12", lf: "2" },
        { chords: ["C", "Am"], rh: "r:4 C4+E4:4 C4+E4:4 C4+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "C3:4 r:12", lf: "1" },
        { chords: ["Dm", "B°"], rh: "r:4 D4+F4:4 D4+F4:4 D4+F4+B4:4", rf: "2/3 1/3 1/2/5", lh: "D3:4 r:12", lf: "2" },
        { chords: ["E", "Bsus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+B4:4", rf: "1/2 1/2 1/2/5", lh: "E3:4 r:12", lf: "1" },
        { chords: ["E", "Esus4"], rh: "r:4 B3+E4:4 B3+E4:4 B3+E4+A4:4", rf: "1/2 1/2 1/2/5", lh: "E3:4 r:12", lf: "1" },
        { chords: ["E"], rh: "B3+E4+G#4:16", rf: "1/2/4", lh: "E3:16", lf: "1" },
        { chords: ["Am"], rh: "C4+E4+A4:16", rf: "2/3/5", lh: "A2:16", lf: "3" },
      ],
    },
  ],
};
