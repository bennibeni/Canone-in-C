// Splendido autunno (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_splendido_autunno: Song = {
  slug: "splendido-autunno",
  title: "Splendido autunno",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/splendido-autunno.mp3",
  mode: "major",
  videoKey: "G",
  baseKey: "G",
  progression: ["G", "Gsus4", "G", "C", "A", "A7", "D", "G"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Sol maggiore (1 diesis in chiave).", "Tempo indicato: semiminima = 120. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–10",
      focus: "Battute 1–10",
      tempo: 100,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["G"], rh: "r:16", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "r:16", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["Gsus4"], rh: "C4:16", rf: "1", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "B3:16", rf: "2", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: [], rh: "G4:4 F#4:4 G4:4 F#4:4", rf: "3 2 3 2", lh: "G2:2 C3:2 G3:2 C3:2 G2:2 C3:2 G3:2 C3:2", lf: "5 3 1 3 5 3 1 3" },
        { chords: ["C"], rh: "E4:16", rf: "1", lh: "G2:2 C3:2 G3:2 C3:2 G2:2 C3:2 G3:2 C3:2", lf: "5 3 1 3 5 3 1 3" },
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
        { chords: ["A", "A7"], rh: "E4:8 G4:8", rf: "1 3", lh: "A2:2 E3:2 A3:2 E3:2 A2:2 E3:2 A3:2 E3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["D"], rh: "F#4:16", rf: "2", lh: "D3:16", lf: "1" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["Gsus4"], rh: "C4:16", rf: "1", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "B3:16", rf: "2", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["G"], rh: "G4:8 F#4:4 A4:4", rf: "3 2 4", lh: "G2:2 D3:2 G3:2 D3:2 G2:2 D3:2 G3:2 D3:2", lf: "5 2 1 2 5 2 1 2" },
        { chords: ["Dsus4"], rh: "G4:8 B3:2 D4:2 G4:2 A4:2", rf: "3 1 2 1 2", lh: "G2:2 D3:2 G3:2 A3:2 r:8", lf: "5 2 1 2" },
        { chords: [], rh: "B4:2 D5:2 G5:2 A5:2 B5:8", rf: "4 1 2 3 4", lh: "r:16" },
      ],
    },
  ],
};
