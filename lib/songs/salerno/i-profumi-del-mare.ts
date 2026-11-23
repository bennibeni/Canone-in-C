// I profumi del mare (Christian Salerno), da «Emozioni al Pianoforte». Pubblicato con il permesso dell'autore.
// Note e DITEGGIATURE lette dal PDF (esportato da MuseScore) con scripts/salerno; dove lo spartito non
// indica il dito, il dito è calcolato. Ogni mano è una sola voce; le legature tra battute diverse
// non sono unite.
import type { Song } from "../../score";

export const s_i_profumi_del_mare: Song = {
  slug: "i-profumi-del-mare",
  title: "I profumi del mare",
  composer: "Christian Salerno",
  credit: "Da «Emozioni al Pianoforte» di Christian Salerno, pubblicato con il permesso dell'autore. Note e diteggiature dallo spartito",
  collection: "facili",
  audio: "/audio/salerno/i-profumi-del-mare.mp3",
  mode: "major",
  videoKey: "G",
  baseKey: "G",
  progression: ["D", "C", "Gmaj7", "G7", "Em", "Gmaj7", "Dsus4", "B+"],
  progressionLabel: "gli accordi dell'inizio",
  fullTips: ["Tonalità: Sol maggiore (1 diesis in chiave).", "Tempo indicato: semiminima = 50. Comincia molto più lento e alza il tempo solo quando le dita sono sicure.", "Il consiglio dell'autore: studia una mano alla volta, rispetta le alterazioni e le dita indicate, poi unisci le mani molto lentamente."],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Battute 1–7",
      focus: "Battute 1–7",
      tempo: 50,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: [], rh: "D4:6 B3:1 C4:1 D4:2 A4:2 G4:2 D4:2", rf: "3 1 2 1 5 4 2", lh: "G2:2 D3:2 G3:4 G2:2 E3:2 G3:4", lf: "5 2 1 5 2 1" },
        { chords: [], rh: "C4:6 A3:1 B3:1 E3+G3+C4:8", rf: "1 3 4 1/2/5", lh: "A2:2 E3:2 G3:4 D2:8", lf: "5 2 1 5" },
        { chords: [], rh: "C4:6 A3:1 B3:1 C4:2 B4:2 A4:2 F#4:2", rf: "4 2 3 1 5 4 2", lh: "A2:2 E3:2 G3:4 D3:4 D2:4", lf: "2 1 2 1 5" },
        { chords: [], rh: "D4:6 E4:1 F#4:1 B3+D4+G4:6 A4:1 B4:1", rf: "1 3 4 1/2/5 3 4", lh: "B2:2 F#3:2 A3:4 E2:2 B2:2 E3:4", lf: "1 5 3 5 2 1" },
        { chords: ["D"], rh: "C5:2 B4:2 C5:3 E4:1 F#4:7 D4:1", rf: "5 4 5 1 2 1", lh: "A2:2 E3:2 G3:4 D3:4 D2:4", lf: "5 2 1 2 5" },
        { chords: ["C"], rh: "B4:2 A4:2 B4:2 D4:2 E4:8", rf: "5 4 5 1 2", lh: "G2:2 D3:2 G3:4 C3:4 C2:4", lf: "2 5 2 5 2" },
        { chords: ["Gmaj7"], rh: "C5:2 B4:2 C5:3 E4:1 F#4:6 G4:2", rf: "5 4 5 1 2 1", lh: "A2:2 E3:2 G3:4 D3:4 D2:4", lf: "5 2 1 2 4" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Battute 8–14",
      focus: "Battute 8–14",
      tempo: 50,
      firstMeasure: 8,
      tips: ["Prima una mano alla volta, poi insieme, lentamente."],
      measures: [
        { chords: ["G7"], rh: "A4:2 B4:2 B4:12", rf: "2 3 3", lh: "G2:2 D3:2 G3:4 G2:4 F2:4", lf: "1 4 1 4 5" },
        { chords: [], rh: "E5:2 D5:2 E5:2 F#4:2 A4:6 E5:2", rf: "5 4 5 1 2 5", lh: "C3:2 G3:2 C4:4 C3:2 F#3:2 D4:4", lf: "1 2 1 5 2 1" },
        { chords: ["Em"], rh: "D5:2 C#5:2 D5:2 F#4:2 G4:8", rf: "4 3 4 1 2", lh: "B2:2 F#3:2 B3:4 E2:2 B2:2 E3:4", lf: "5 2 1 2 1 2" },
        { chords: [], rh: "E5:2 D5:2 E5:2 F#4:2 A4:6 E5:2", rf: "5 4 5 1 1 3", lh: "C3:2 G3:2 C4:4 C3:2 F#3:2 D4:4", lf: "5 2 1 5 2 1" },
        { chords: [], rh: "F#5:2 E5:2 F#5:2 B4:2 F#5:2 G5:6", rf: "4 3 4 1 4 5", lh: "B2:2 F#3:2 D#4:4 C3:2 G3:2 C4:4", lf: "5 2 1 5 2 1" },
        { chords: ["Gmaj7"], rh: "C5:2 B4:2 A4:2 G4:2 G4:4 F#4:4", rf: "4 3 2 1 3 2", lh: "A2:2 E3:2 G3:4 D3:4 D2:4", lf: "5 2 1 1 5" },
        { chords: ["Dsus4", "B+"], rh: "G4:16", rf: "3", lh: "G2:2 D3:2 A3:2 G3:2 B3:8", lf: "2 5 2 3 1" },
      ],
    },
  ],
};
