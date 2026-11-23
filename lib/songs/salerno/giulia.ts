// Giulia (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_giulia: Song = {
  slug: "giulia",
  title: "Giulia",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/giulia.mp3",
  mode: "major",
  videoKey: "C",
  progression: ["Dsus4", "D", "Cmaj7", "D", "D7", "D"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do maggiore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 80. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–8",
      focus: "Battute 1–8",
      tempo: 80,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "[B3 C4 D4]:4 [B3 C4 D4]:4 [B3 C4 D4]:4 [B3 C4 D4]:4", rf: "1 2 3 1 2 3 1 2 3 1 2 3", lh: "G2:16", lf: "2" },
        { chords: [], rh: "[B3 C4 D4]:4 [B3 C4 D4]:4 [B3 C4 D4]:4 [B3 C4 D4]:4", rf: "1 2 3 1 2 3 1 2 3 1 2 1", lh: "C2+C3:16", lf: "5/1" },
        { chords: [], rh: "[E4 F#4 G4]:4 [E4 F#4 G4]:4 [E4 F#4 G4]:4 [E4 F#4 G4]:4", rf: "2 3 4 2 3 4 2 3 4 2 3 4", lh: "E2:16", lf: "4" },
        { chords: ["Dsus4", "D"], rh: "D4+G4:8 F#4:8", rf: "1/4 3", lh: "D2:16", lf: "5" },
        { chords: [], rh: "[B3 C4 D4]:4 [B3 C4 D4]:4 [G4 G4 G4]:4 [G4 G4 G4]:4", rf: "1 2 3 1 2 1 3 3 3 3 3 3", lh: "G2:16", lf: "2" },
        { chords: ["Cmaj7"], rh: "[B3 C4 D4]:4 [B3 C4 D4]:4 [B4 B4 B4]:4 [B4 B4 B4]:4", rf: "1 2 3 1 2 1 3 3 3 3 3 3", lh: "C2+C3:16", lf: "5/1" },
        { chords: [], rh: "[E4 F#4 G4]:4 [E4 F#4 G4]:4 E4:8", rf: "1 2 3 1 2 3 1", lh: "E2:16", lf: "3" },
        { chords: ["D"], rh: "F#4:16", rf: "2", lh: "D2:16", lf: "4" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 9–16",
      focus: "Battute 9–16",
      tempo: 80,
      firstMeasure: 9,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "[G4 A4 B4]:4 [G4 A4 B4]:4 [G4 A4 B4]:4 [G4 A4 B4]:4", rf: "2 3 4 2 3 4 2 3 4 2 3 4", lh: "C2+C3:16", lf: "5/1" },
        { chords: [], rh: "[F#4 G4 A4]:4 [F#4 G4 A4]:4 [D5 F#4 G4]:4 [A4 G4 F#4]:4", rf: "1 2 3 1 2 3 5 1 2 3 2 1", lh: "B1+B2:16", lf: "4/1" },
        { chords: [], rh: "[F#4 G4 C4]:4 [F#4 G4 C4]:4 [F#4 G4 C4]:4 [F#4 G4 C4]:4", rf: "3 4 1 3 4 1 3 4 1 3 4 1", lh: "A1+A2:16", lf: "5/1" },
        { chords: [], rh: "[F#4 G4 B3]:4 [F#4 G4 B3]:4 [F#4 G4 B3]:4 [F#4 G4 B3]:4", rf: "3 4 1 3 4 1 3 4 1 3 4 1", lh: "E2:16", lf: "2" },
        { chords: ["D7"], rh: "[G4 A4 B4]:4 [G4 A4 B4]:4 [D5 D5 D5]:4 [D5 D5 D5]:4", rf: "4 1 2 1 2 3 5 5 5 5 5 5", lh: "C2+C3:16", lf: "3/1" },
        { chords: [], rh: "[F#4 G4 A4]:4 [F#4 G4 A4]:4 [D5 F#4 G4]:4 [A4 G4 F#4]:4", rf: "1 2 3 1 2 3 5 2 3 4 3 2", lh: "B1+B2:16", lf: "4/1" },
        { chords: [], rh: "[F#4 G4 C4]:4 [F#4 G4 C4]:4 [F#4 G4 C4]:4 [F#4 G4 C4]:4", rf: "2 3 1 3 4 1 3 4 1 3 4 1", lh: "A1+A2:16", lf: "5/1" },
        { chords: ["D"], rh: "F#4:16", rf: "3", lh: "D2:16", lf: "3" },
      ],
    },
  ],
};
