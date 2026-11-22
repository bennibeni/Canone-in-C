// Preludio in Mi minore op. 28 n. 4 (F. Chopin). Note dalla partitura MusicXML con licenza
// CC0 (pubblico dominio), convertita con scripts/musicxml/chopin_e.py. L'app lavora a sedicesimi:
// le terzine delle battute 12 e 18 sono arrotondate e del gruppetto di biscrome di battuta 16
// restano due note; gli abbellimenti (appoggiature) non sono riportati.
// Nel finale (battute 17, 24, 25) le note alte degli accordi troppo larghi passano alla destra.
// DITEGGIATURE e nomi degli accordi sono calcolati automaticamente (fingering.py, chords.py).
import type { Song } from "../score";

export const preludioMiMinore: Song = {
  slug: "preludio-mi-minore",
  title: "Preludio",
  titleWithKey: true,
  composer: "Fryderyk Chopin, op. 28 n. 4",
  credit: "Partitura con licenza CC0 (pubblico dominio). Diteggiature e accordi proposti automaticamente, da verificare",
  mode: "minor",
  videoKey: "G",
  baseKey: "G",
  progression: ["Em", "F#m7", "F7", "E7", "C", "F#ø7", "D7", "Dm7"],
  progressionLabel: "la sinistra scende per semitoni",
  fullTips: [
    "Due metà quasi uguali: la seconda (dalla battuta 13) riprende la prima e sale al culmine della battuta 17 (stretto, forte).",
    "La melodia della destra è quasi immobile (Si – Do, poi La – Si): il brano vive dei piccoli cambi degli accordi della sinistra.",
    "Le diteggiature e i nomi degli accordi sono calcolati automaticamente: se una diteggiatura ti viene scomoda, cambiala.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "La discesa",
      focus: "Levare e battute 1–12: accordi ribattuti che scendono di un semitono alla volta",
      tempo: 50,
      pickup: true,
      tips: [
        "Sinistra: accordi di tre note a crome, sempre legati e piano. Da un accordo al successivo cambia di solito una sola nota, di un semitono: tieni ferme le dita che non si muovono.",
        "Destra: la melodia è fatta di note lunghe (Si per tre quarti di battuta, poi Do). Contale bene e lasciale cantare sopra gli accordi.",
        "Battuta 9: l'unico momento in cui la destra si muove (La – Si – Re – Do – Mi – La); prepara la mano prima.",
        "Battuta 12: la sinistra si ferma sull'accordo di Si7 e la destra scende e risale da sola.",
      ],
      measures: [
      { chords: [], rh: "r:12 B3:3 B4:1", lh: "r:16", rf: "1 3" },
      { chords: ["Em"], rh: "B4:12 C5:4", lh: "G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2", rf: "3 4", lf: "4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1" },
      { chords: ["F#m7", "Eb°"], rh: "B4:12 C5:4", lh: "F#3+A3+E4:2 F#3+A3+E4:2 F#3+A3+E4:2 F#3+A3+E4:2 F#3+A3+Eb4:2 F#3+A3+Eb4:2 F#3+A3+Eb4:2 F#3+A3+Eb4:2", rf: "3 4", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/4/2 5/3/1 5/3/1 5/3/1" },
      { chords: ["F7", "Dm", "D°"], rh: "B4:12 C5:4", lh: "F3+A3+Eb4:2 F3+A3+Eb4:2 F3+A3+Eb4:2 F3+A3+Eb4:2 F3+A3+D4:2 F3+A3+D4:2 F3+G#3+D4:2 F3+G#3+D4:2", rf: "3 4", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["E7", "Em7", "C#°"], rh: "B4:12 Bb4:4", lh: "E3+G#3+D4:2 E3+G#3+D4:2 E3+G#3+D4:2 E3+G#3+D4:2 E3+G3+D4:2 E3+G3+D4:2 E3+G3+C#4:2 E3+G3+C#4:2", rf: "3 2", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/4/2 5/4/2" },
      { chords: ["C", "F#ø7"], rh: "A4:12 B4:4", lh: "E3+G3+C4:2 E3+G3+C4:2 E3+G3+C4:2 E3+G3+C4:2 E3+F#3+C4:2 E3+F#3+C4:2 E3+F#3+C4:2 E3+F#3+C4:2", rf: "1 2", lf: "4/2/1 4/2/1 4/2/1 4/2/1 4/3/1 4/3/1 4/3/1 4/3/1" },
      { chords: ["F#ø7", "C°"], rh: "A4:12 B4:4", lh: "E3+F#3+C4:2 E3+F#3+C4:2 E3+F#3+C4:2 E3+F#3+C4:2 D#3+F#3+C4:2 D#3+F#3+C4:2 D#3+F#3+C4:2 D#3+F#3+C4:2", rf: "1 2", lf: "4/3/1 4/3/1 4/3/1 4/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["D7"], rh: "A4:12 B4:3 A4:1", lh: "D3+F#3+C4:2 D3+F#3+C4:2 D3+F#3+C4:2 D3+F#3+C4:2 D3+F#3+C4:2 D3+F#3+C4:2 D3+F#3+C4:2 D3+F#3+C4:2", rf: "1 2 1", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["Dm7", "B°"], rh: "A4:12 G#4:4", lh: "D3+F3+C4:2 D3+F3+C4:2 D3+F3+C4:2 D3+F3+C4:2 D3+F3+B3:2 D3+F3+B3:2 D3+F3+B3:2 D3+F3+B3:2", rf: "2 1", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["Cmaj7", "Am"], rh: "r:4 A4:2 B4:2 D5:2 C5:2 E4:2 A4:2", lh: "C3+E3+B3:2 C3+E3+B3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "2 3 5 4 1 4", lf: "5/3/1 5/3/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1" },
      { chords: ["Esus4", "B7", "Am"], rh: "F#4:12 A4:4", lh: "B2+E3+A3:2 B2+E3+A3:2 B2+D#3+A3:2 B2+D#3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "2 4", lf: "5/2/1 5/2/1 5/3/1 5/3/1 4/2/1 4/2/1 4/2/1 4/2/1" },
      { chords: ["B7", "Am"], rh: "F#4:12 A4:4", lh: "B2+D#3+A3:2 B2+D#3+A3:2 B2+D#3+A3:2 B2+D#3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "2 4", lf: "5/3/1 5/3/1 5/3/1 5/3/1 4/2/1 4/2/1 4/2/1 4/2/1" },
      { chords: ["B7"], rh: "G4:2 F#4:2 C4:2 B3:2 D#4:2 F#4:2 D5:1 C5:2 B4:1", lh: "B2+D#3+A3:4 r:12", rf: "3 2 1 2 1 2 5 4 3", lf: "5/3/1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il culmine e la fine",
      focus: "Battute 13–25: la ripresa, lo stretto e gli accordi finali",
      tempo: 50,
      firstMeasure: 13,
      tips: [
        "Battute 13–15: come l'inizio, ma la discesa della sinistra è più rapida.",
        "Battute 16–17: lo stretto, il punto più forte del brano. A battuta 17 la sinistra suona il basso e poi accordi pieni.",
        "Battute 18–22: tutto si calma (dim., smorz.); la destra torna sulle note lunghe.",
        "Battute 23–25: tre accordi lenti con il basso profondo. Nel finale le note alte degli accordi sono affidate alla destra.",
      ],
      measures: [
      { chords: ["Em"], rh: "B4:12 C5:4", lh: "G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2", rf: "3 4", lf: "4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1 4/2/1" },
      { chords: ["F#m7", "F7"], rh: "B4:12 C5:4", lh: "F#3+A3+E4:2 F#3+A3+E4:2 F#3+A3+E4:2 F#3+A3+E4:2 F3+A3+Eb4:2 F3+A3+Eb4:2 F3+A3+Eb4:2 F3+A3+Eb4:2", rf: "3 4", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["Fm7", "D°", "E7"], rh: "B4:12 C5:4", lh: "F3+Ab3+Eb4:2 F3+Ab3+Eb4:2 F3+Ab3+D4:2 F3+Ab3+D4:2 E3+G#3+D4:2 E3+G#3+D4:2 E3+G#3+D4:2 E3+G#3+D4:2", rf: "3 4", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["Em7", "C#°", "A#°", "Am"], rh: "B4:3 A#4:1 A#4:2 B4:1 A#4:1 G5:4 F#5:3 E5:1", lh: "E3+G3+D4:2 E3+G3+D4:2 E3+G3+C#4:2 E3+G3+C#4:2 C#3+E3+A#3:2 C#3+E3+A#3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "3 2 2 3 1 4 3 2", lf: "5/3/1 5/3/1 5/4/2 5/3/1 4/2/1 4/2/1 5/3/1 5/3/1" },
      { chords: ["F#°", "Em"], rh: "E5:2 D#5:2 C6:2 D#5:2 D#5:2 E5:2 G5:2 B4:2", lh: "B1+B2:2 A3+C4+F#4+A4:2 A3+C4+F#4+A4:2 A3+C4+F#4+A4:2 G3+B3+D#4+F#4:2 G3+B3+E4:2 G3+B3+E4:2 G3+B3+E4:2", rf: "2 1 5 2 2 3 5 1", lf: "4/1 5/4/2/1 5/4/2/1 5/4/2/1 5/4/3/2 5/3/1 5/3/1 5/3/1" },
      { chords: ["Am", "F#ø7", "Bsus4", "Am"], rh: "D5:2 C5:2 E5:1 E4:2 A4:1 F#4:6 A4:2", lh: "A3+C4+E4:2 A3+C4+E4:2 A2:2 E3+F#3+C4:2 B2+E3+B3:2 B2+E3+B3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "3 2 4 1 4 2 4", lf: "4/2/1 4/2/1 5 3/2/1 5/3/1 5/3/1 4/2/1 4/2/1" },
      { chords: ["Bsus4", "Am"], rh: "F#4:12 A4:4", lh: "B2+E3+B3:2 B2+E3+B3:2 B2+E3+B3:2 B2+E3+B3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "2 4", lf: "5/3/1 5/3/1 5/3/1 5/3/1 4/2/1 4/2/1 4/2/1 4/2/1" },
      { chords: ["Bsus4", "B", "B7"], rh: "F#4:15 E4:1", lh: "B2+E3+B3:2 B2+E3+B3:2 B2+E3+B3:2 B2+E3+B3:2 B2+D#3+B3:2 B2+D#3+B3:2 B2+D#3+A3:2 B2+D#3+A3:2", rf: "2 1", lf: "5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1 5/3/1" },
      { chords: ["Am"], rh: "E4:12 F#4:4", lh: "C3+G3:2 C3+G3:2 C3+G3:2 C3+G3:2 C3+Bb3:2 C3+Bb3:2 C3+E3+A3:2 C3+E3+A3:2", rf: "1 2", lf: "4/1 4/1 4/1 4/1 4/1 4/1 4/2/1 4/2/1" },
      { chords: ["Esus4", "E", "Em"], rh: "E4:12 F#4:4", lh: "B2+E3+A3:2 B2+E3+A3:2 B2+E3+G#3:2 B2+E3+G#3:2 B2+E3+G3:2 B2+E3+G3:2 B2+E3+G3:2 B2+E3+G3:2", rf: "1 2", lf: "5/2/1 5/2/1 5/3/2 5/3/2 5/2/1 5/2/1 5/2/1 5/2/1" },
      { chords: ["C7"], rh: "E4:8 r:8", lh: "Bb2+C3+G3:8 r:8", rf: "1", lf: "4/3/1" },
      { chords: ["B"], rh: "E3+F#3+B3+E4:8 D#3+F#3+B3+D#4:8", lh: "B1+B2:8 B1+F#2+B2:8", rf: "1/2/3/5 1/2/3/4", lf: "5/1 5/2/1" },
      { chords: [], rh: "E3+G3+B3+E4:16", lh: "E1+E2:16", rf: "1/2/3/5", lf: "5/1" },
      ],
    },
  ],
};
