// Fly (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_fly: Song = {
  slug: "fly",
  title: "Fly",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/fly.mp3",
  mode: "minor",
  videoKey: "G",
  baseKey: "G",
  progression: ["Em", "C", "G", "D", "Em", "C", "G", "D"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Mi minore (1 diesis in chiave).", "Tempo indicato: semiminima = 90. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–7",
      focus: "Battute 1–7",
      tempo: 90,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Em"], rh: "G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2", rf: "4 2 4 2 4 2 4 2", lh: "E3:16", lf: "3" },
        { chords: ["C"], rh: "G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2", rf: "4 2 4 2 4 2 4 2", lh: "C3:16", lf: "5" },
        { chords: ["G"], rh: "G4:2 D4:2 G4:2 D4:2 G4:2 D4:2 G4:2 D4:2", rf: "4 1 4 1 4 1 4 1", lh: "G3:16", lf: "1" },
        { chords: ["D"], rh: "F#4:2 D4:2 F#4:2 D4:2 F#4:2 D4:2 F#4:2 D4:2", rf: "3 1 3 1 3 1 3 1", lh: "D3:16", lf: "4" },
        { chords: ["Em"], rh: "G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2", rf: "4 2 4 2 4 2 4 2", lh: "E3:16", lf: "3" },
        { chords: ["C"], rh: "G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2", rf: "4 2 4 2 4 2 4 2", lh: "C3:16", lf: "5" },
        { chords: ["G"], rh: "G4:2 D4:2 G4:2 D4:2 G4:2 D4:2 G4:2 D4:2", rf: "4 1 4 1 4 1 4 1", lh: "G3:16", lf: "1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 8–13",
      focus: "Battute 8–13",
      tempo: 90,
      firstMeasure: 8,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["D"], rh: "F#4:2 D4:2 F#4:2 D4:2 F#4:2 D4:2 F#4:2 D4:2", rf: "3 1 3 1 3 1 3 1", lh: "D3:16", lf: "4" },
        { chords: ["C"], rh: "G4:2 E4:2 G4:2 E4:2 G4:2 E4:2 G4:2 E4:2", rf: "4 2 4 2 4 2 4 2", lh: "C3:16", lf: "5" },
        { chords: ["D"], rh: "F#4:2 D4:2 F#4:2 D4:2 F#4:2 D4:2 F#4:2 D4:2", rf: "3 1 3 1 3 1 3 1", lh: "D3:16", lf: "4" },
        { chords: ["D#°"], rh: "F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2 F#4:2 A4:2", rf: "3 5 3 5 3 5 3 5", lh: "D#3:16", lf: "3" },
        { chords: ["F#7"], rh: "G4:4 F#4:4 E4:4 F#4:4", rf: "4 3 2 3", lh: "E3:16", lf: "2" },
        { chords: ["Em"], rh: "G4:16", rf: "4", lh: "E2:16", lf: "5" },
      ],
    },
  ],
};
