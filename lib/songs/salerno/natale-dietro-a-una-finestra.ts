// Natale dietro a una finestra (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_natale_dietro_a_una_finestra: Song = {
  slug: "natale-dietro-a-una-finestra",
  title: "Natale dietro a una finestra",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/natale-dietro-a-una-finestra.mp3",
  mode: "major",
  videoKey: "E",
  baseKey: "E",
  progression: ["E", "Emaj7", "B", "Amaj7", "C#7", "G#m7", "G#7", "E"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Mi maggiore (4 diesis in chiave).", "Tempo indicato: semiminima = 120. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–8",
      focus: "Battute 1–8",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["E"], rh: "E5:4 B5:4 A5:4 G#5:4", rf: "1 5 4 3", lh: "G#4+B4:16", lf: "2/1" },
        { chords: [], rh: "D#5:8 C#5:8", rf: "2 1", lh: "A3+G#4:4 E4:4 C#4:4 B3:4", lf: "3/2 1 2 3" },
        { chords: ["Emaj7"], rh: "B4:4 D#5:4 E5:4 F#5:4", rf: "1 3 4 5", lh: "G#3+E4:16", lf: "4/1" },
        { chords: ["B"], rh: "G#4:8 F#4:8", rf: "1 2", lh: "F#3+E4:4 C#4:4 B3:4 D#4:4", lf: "5/1 2 3 1" },
        { chords: [], rh: "F#3+E5:4 B5:4 A5:4 G#5:4", rf: "1/2 5 4 3", lh: "D#4+B4:16", lf: "2/1" },
        { chords: ["Amaj7"], rh: "E5+C#6:16", rf: "1/5", lh: "A3+G#4:4 E4:4 C#4:4 B3:4", lf: "5/1 2 4 5" },
        { chords: ["C#7"], rh: "B5:4 G#5:4 D#5:4 E5:4", rf: "5 4 2 1", lh: "C#4+G#4+B4:16", lf: "4/2/1" },
        { chords: ["G#m7"], rh: "A5:4 B4+G#5:4 F#5:4 B4+G#5:4", rf: "5 1/4 3 1/4", lh: "F#4:16", lf: "1" },
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
        { chords: ["G#7"], rh: "A4:4 G#4:4 F#4:4 G#4:4", rf: "3 2 1 2", lh: "F#3:16", lf: "4" },
        { chords: ["E"], rh: "B4+E5:4 B4+E5:4 B4+E5:4 B4+E5:4", rf: "2/5 1/2 1/2 1/2", lh: "E3:4 B3:4 A3:4 G#3:4", lf: "5 2 1 2" },
        { chords: ["Emaj7", "C#m7"], rh: "B4+E5:4 B4+E5:4 B4+E5:4 B4+E5:4", rf: "1/2 1/2 1/2 1/2", lh: "D#3:8 C#3:8", lf: "4 5" },
        { chords: ["Emaj7", "Bsus4"], rh: "B4+E5:4 B4+E5:4 B4+E5:4 B4+E5:4", rf: "1/2 1/2 1/2 1/2", lh: "B2:4 D#3:4 E3:4 F#3:4", lf: "5 3 2 1" },
        { chords: ["E", "Bsus4"], rh: "B4+E5:4 B4+E5:4 B4+E5:4 B4+E5:4", rf: "1/2 1/2 1/2 1/2", lh: "G#2:8 F#2:8", lf: "3 4" },
        { chords: ["E", "Bsus4"], rh: "B4+E5+B5:4 B4+E5+B5:4 B4+E5+B5:4 B4+E5+B5:4", rf: "1/2/5 1/2/5 1/2/5 1/2/5", lh: "E2:4 E3:4 B3:4 E4:4", lf: "5 1 2 1" },
        { chords: ["E"], rh: "B5+E6+B6:16", rf: "1/2/5", lh: "G#4:16", lf: "2" },
      ],
    },
  ],
};
