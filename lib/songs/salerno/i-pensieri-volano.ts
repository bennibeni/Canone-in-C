// I pensieri volano (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_i_pensieri_volano: Song = {
  slug: "i-pensieri-volano",
  title: "I pensieri volano",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/i-pensieri-volano.mp3",
  mode: "major",
  videoKey: "C",
  progression: ["Cmaj7", "Cm(maj7)", "Dsus4", "D", "Cmaj7", "Cm(maj7)", "Dsus4", "D"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do maggiore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 95. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–8",
      focus: "Battute 1–8",
      tempo: 95,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "[C5 B4 G4]:4 [D5 B4 G4]:4 [C5 B4 G4]:4 [D5 B4 G4]:4", rf: "3 2 1 4 2 1 3 2 1 5 4 2", lh: "A2:16", lf: "1" },
        { chords: ["Cmaj7"], rh: "[B4 G4 E4]:4 [C5 G4 E4]:4 [B4 G4 E4]:4 [C5 G4 E4]:4", rf: "4 2 1 5 2 1 4 2 1 5 2 1", lh: "E2:16", lf: "3" },
        { chords: [], rh: "[C5 B4 G4]:4 [D5 B4 G4]:4 [C5 B4 G4]:4 [D5 B4 G4]:4", rf: "4 3 1 5 3 1 4 3 1 5 3 1", lh: "A2:16", lf: "1" },
        { chords: ["Cmaj7"], rh: "[B4 G4 E4]:4 [C5 G4 E4]:4 [B4 G4 E4]:4 [C5 G4 E4]:4", rf: "3 2 1 5 2 1 4 2 1 5 2 1", lh: "E2:16", lf: "3" },
        { chords: ["Cm(maj7)"], rh: "[B4 G4 Eb4]:4 [C5 G4 Eb4]:4 [D5 G4 Eb4]:4 [C5 G4 Eb4]:4", rf: "4 2 1 5 2 1 5 2 1 5 2 1", lh: "Eb2:16", lf: "4" },
        { chords: ["Dsus4"], rh: "[D5 G4 D4]:4 [D5 G4 D4]:4 [D5 G4 D4]:4 [D5 G4 D4]:4", rf: "5 2 1 5 2 1 5 2 1 5 2 1", lh: "D2:16", lf: "5" },
        { chords: ["D"], rh: "[D5 F#4 D4]:4 [D5 F#4 D4]:4 [D5 F#4 D4]:4 [D5 F#4 D4]:4", rf: "5 2 1 5 2 1 5 2 1 5 2 1", lh: "D2:16", lf: "5" },
        { chords: [], rh: "[C5 B4 G4]:4 [D5 B4 G4]:4 [C5 B4 G4]:4 [D5 B4 G4]:4", rf: "3 2 1 4 2 1 3 2 1 5 3 1", lh: "A2:16", lf: "1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 9–16",
      focus: "Battute 9–16",
      tempo: 95,
      firstMeasure: 9,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Cmaj7"], rh: "[B4 G4 E4]:4 [C5 G4 E4]:4 [B4 G4 E4]:4 [C5 G4 E4]:4", rf: "3 2 1 5 2 1 4 2 1 5 2 1", lh: "E2:16", lf: "2" },
        { chords: [], rh: "[C5 B4 G4]:4 [D5 B4 G4]:4 [C5 B4 G4]:4 [D5 B4 G4]:4", rf: "4 3 1 5 3 1 4 3 1 5 3 1", lh: "A2:16", lf: "1" },
        { chords: ["Cmaj7"], rh: "[B4 G4 E4]:4 [C5 G4 E4]:4 [B4 G4 E4]:4 [C5 G4 E4]:4", rf: "3 2 1 5 2 1 4 2 1 5 2 1", lh: "E2:16", lf: "2" },
        { chords: ["Cm(maj7)"], rh: "[B4 G4 Eb4]:4 [C5 G4 Eb4]:4 [D5 G4 Eb4]:4 [C5 G4 Eb4]:4", rf: "4 2 1 5 2 1 5 2 1 5 2 1", lh: "Eb2:16", lf: "3" },
        { chords: ["Dsus4"], rh: "[D5 G4 D4]:4 [D5 G4 D4]:4 [D5 G4 D4]:4 [D5 G4 D4]:4", rf: "5 2 1 5 2 1 5 2 1 5 2 1", lh: "D2:16", lf: "4" },
        { chords: ["D"], rh: "[D5 F#4 D4]:4 [D5 F#4 D4]:4 [D5 F#4 D4]:4 [D5 F#4 D4]:4", rf: "5 2 1 5 2 1 5 2 1 5 2 1", lh: "D2:16", lf: "4" },
        { chords: [], rh: "D4+G4+B4:4 C5:4 D5:4 C5:4", rf: "1/2/3 4 5 4", lh: "E2:16", lf: "1" },
        { chords: ["Em7"], rh: "D4+G4+B4:16", rf: "1/2/3", lh: "E1:16", lf: "4" },
      ],
    },
  ],
};
