// A passi lenti (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_a_passi_lenti: Song = {
  slug: "a-passi-lenti",
  title: "A passi lenti",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/a-passi-lenti.mp3",
  mode: "major",
  videoKey: "C",
  progression: ["B\u00f87", "E7", "Dm7", "B\u00f87", "Em7", "B\u00f87", "E7", "F"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do maggiore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 120. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–9",
      focus: "Battute 1–9",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "r:16", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: [], rh: "r:16", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: ["Bø7"], rh: "B3+D4+F4+A4:16", rf: "1/2/3/5", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: ["E7"], rh: "B3+D4+E4+G#4:16", rf: "1/2/3/4", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: [], rh: "C4+E4+G4+B4:16", rf: "1/2/3/5", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: ["Dm7"], rh: "C4+F4+A4:16", rf: "1/3/5", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: ["Bø7"], rh: "B3+D4+F4+A4:16", rf: "1/2/3/5", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: ["Em7"], rh: "B3+D4+E4+G4:16", rf: "1/2/3/5", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: [], rh: "B3+C4+E4:16", rf: "1/2/4", lh: "D2:8 D2:8", lf: "2 2" },
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
        { chords: [], rh: "B3+C4+E4:16", rf: "1/2/4", lh: "D2:8 D2:8", lf: "2 2" },
        { chords: ["Bø7"], rh: "B3+D4+F4+A4:16", rf: "1/2/3/5", lh: "B1:8 B1:8", lf: "4 4" },
        { chords: ["E7"], rh: "B3+D4+E4+G#4:16", rf: "1/2/3/4", lh: "E2:8 E2:8", lf: "1 2" },
        { chords: [], rh: "C4+E4+G4+B4:16", rf: "1/2/3/5", lh: "A2:8 A2:8", lf: "1 1" },
        { chords: ["F"], rh: "C4+F4+A4:16", rf: "1/3/5", lh: "A2:8 A2:8", lf: "1 2" },
        { chords: ["Bø7"], rh: "B3+D4+F4+A4:16", rf: "1/2/3/5", lh: "D3:8 D3:8", lf: "1 1" },
        { chords: ["Em7"], rh: "B3+D4+E4+G4:16", rf: "1/2/3/5", lh: "G2:8 G2:8", lf: "3 3" },
        { chords: ["Cmaj7"], rh: "B3+C4+E4:16", rf: "1/2/4", lh: "C3:8 C3:8", lf: "1 1" },
        { chords: ["Cmaj7"], rh: "B3+C4+E4:16", rf: "1/2/4", lh: "C3:16", lf: "1" },
      ],
    },
  ],
};
