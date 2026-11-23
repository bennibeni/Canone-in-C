// Nel mare (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_nel_mare: Song = {
  slug: "nel-mare",
  title: "Nel mare",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/nel-mare.mp3",
  mode: "major",
  videoKey: "C",
  progression: ["Am", "F", "Am", "C", "D7", "F", "E", "Am"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Do maggiore (nessuna alterazione in chiave).", "Tempo indicato: semiminima = 112. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–9",
      focus: "Battute 1–9",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["Am", "F"], rh: "E4:4 C4:2 E4:2 F4:4 C4:2 F4:2", rf: "2 1 2 3 1 3", lh: "A2:2 E3:2 A3:4 A2:2 F3:2 A3:4", lf: "5 2 1 5 2 1" },
        { chords: ["Am"], rh: "E4:4 C4:4 C5:2 B4:2 G4:2 F4:2", rf: "2 1 5 4 2 1", lh: "A2:2 E3:2 A3:4 r:8", lf: "5 2 1" },
        { chords: ["C"], rh: "E4:4 C4:2 E4:2 F4:4 C4:2 F4:2", rf: "3 1 3 4 1 4", lh: "G2:2 E3:2 G3:4 G2:2 E3:2 A3:4", lf: "5 2 1 5 2 1" },
        { chords: ["C"], rh: "E4:4 C4:4 D4:2 C4:2 B3:2 C4:2", rf: "3 1 3 2 1 2", lh: "G2:2 E3:2 G3:4 r:8", lf: "5 2 1" },
        { chords: ["D7"], rh: "D4:12 D4:2 A4:2", rf: "3 3 5", lh: "F#2:2 C3:2 A3:4 F#2:2 C3:2 A3:4", lf: "5 2 1 5 2 1" },
        { chords: ["F", "E"], rh: "C4:8 B3:8", rf: "2 1", lh: "F2:2 C3:2 A3:4 E2:2 B2:2 G#3:4", lf: "5 2 1 5 2 1" },
        { chords: ["Am", "F"], rh: "E4:4 C4:2 E4:2 F4:4 C4:2 F4:2", rf: "2 1 2 3 1 3", lh: "A2:2 E3:2 A3:4 A2:2 F3:2 A3:4", lf: "5 2 1 5 2 1" },
        { chords: ["Am"], rh: "E4:4 C4:4 C5:2 B4:2 G4:2 F4:2", rf: "2 1 5 4 1 4", lh: "A2:2 E3:2 A3:4 r:8", lf: "5 2 1" },
        { chords: [], rh: "E4:4 C#4:2 E4:2 F#4:4 C#4:2 F#4:2", rf: "3 2 3 4 2 4", lh: "B2:2 E3:2 A3:4 B2:2 F#3:2 A3:4", lf: "5 2 1 5 2 1" },
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
        { chords: ["Esus4", "B7"], rh: "E4:8 D#4:8", rf: "3 2", lh: "B2:2 E3:2 A3:4 B2:2 F#3:2 A3:4", lf: "5 2 1 5 2 1" },
        { chords: ["Em7"], rh: "G4:4 D4:2 G4:2 A4:4 D4:2 A4:2", rf: "3 1 3 4 1 4", lh: "E2:2 B2:2 G3:4 E2:2 C3:2 G3:4", lf: "5 2 1 5 2 1" },
        { chords: ["Em"], rh: "G4:4 B3:4 D5:2 C5:2 B4:2 A4:2", rf: "3 1 5 4 3 1", lh: "E2:2 B2:2 G3:4 r:8", lf: "5 2 1" },
        { chords: ["G"], rh: "G4:4 D4:2 G4:2 A4:4 D4:2 A4:2", rf: "4 1 4 5 1 5", lh: "G2:2 D3:2 B3:4 G2:2 E3:2 B3:4", lf: "5 2 1 5 2 1" },
        { chords: ["G"], rh: "G4:4 B3:4 D5:2 C5:2 B4:2 A4:2", rf: "4 1 5 4 3 2", lh: "G2:2 D3:2 B3:4 r:8", lf: "5 2 1" },
        { chords: ["Abmaj7"], rh: "G4:8 D4+G4:8", rf: "1 2/5", lh: "Ab2:2 Eb3:2 C4:4 Ab2:2 Eb3:2 Bb3:4", lf: "5 2 1 5 2 1" },
        { chords: [], rh: "C4+Eb4:8 D4+F4:8", rf: "1/3 2/4", lh: "Bb2:2 F3:2 Bb3:4 Bb2:2 F3:2 C4:4", lf: "5 2 1 5 2 1" },
        { chords: [], rh: "C4+E4:16", rf: "1/3", lh: "C3:2 G3:2 D4:4 C3:2 G3:2 D4:4", lf: "5 2 1 5 2 1" },
        { chords: ["C"], rh: "C4+E4:16", rf: "1/3", lh: "C3:2 G3:2 C4:12", lf: "5 2 1" },
      ],
    },
  ],
};
