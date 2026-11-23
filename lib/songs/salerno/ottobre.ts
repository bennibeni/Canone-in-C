// Ottobre (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_ottobre: Song = {
  slug: "ottobre",
  title: "Ottobre",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/ottobre.mp3",
  mode: "minor",
  videoKey: "G",
  baseKey: "G",
  progression: ["Em", "D#\u00b0", "Em", "D#\u00b0", "Em", "C", "B", "Em"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Mi minore (1 diesis in chiave).", "Tempo indicato: semiminima = 140. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–10",
      focus: "Battute 1–10",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "2 4 2 4 2 4 2 4", lh: "D#3:4 D#3:4 D#3:4 D#3:4", lf: "2 2 2 2" },
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "2 4 2 4 2 4 2 4", lh: "D#3:4 D#3:4 D#3:4 D#3:4", lf: "2 2 2 2" },
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["C"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "C3:4 C3:4 C3:4 C3:4", lf: "3 3 3 3" },
        { chords: ["B"], rh: "F#4:8 F#4:8", rf: "2 2", lh: "B2:16", lf: "4" },
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "2 4 2 4 2 4 2 4", lh: "D#3:4 D#3:4 D#3:4 D#3:4", lf: "2 2 2 2" },
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 11–19",
      focus: "Battute 11–19",
      tempo: 100,
      firstMeasure: 11,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "2 4 2 4 2 4 2 4", lh: "D#3:4 D#3:4 D#3:4 D#3:4", lf: "2 2 2 2" },
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["C"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "C3:4 C3:4 C3:4 C3:4", lf: "2 2 2 2" },
        { chords: ["B"], rh: "F#4:8 F#4:8", rf: "2 2", lh: "B2:16", lf: "3" },
        { chords: ["Em"], rh: "E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2", rf: "1 3 1 3 1 3 1 3", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "2 4 2 4 2 4 2 4", lh: "D#3:4 D#3:4 D#3:4 D#3:4", lf: "2 2 2 2" },
        { chords: ["Em"], rh: "G4:2 B4:2 G4:2 B4:2 G4:2 B4:2 G4:2 B4:2", rf: "3 5 3 5 3 5 3 5", lh: "E3:4 E3:4 E3:4 E3:4", lf: "1 1 1 1" },
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "2 4 2 4 2 4 2 4", lh: "D#3:4 D#3:4 D#3:4 D#3:4", lf: "2 2 2 2" },
        { chords: [], rh: "E4:16", rf: "1", lh: "E3:4 E3:4 E3:8", lf: "1 1 1" },
      ],
    },
  ],
};
