// Body And Soul (Johnny Green), arrangiamento facile in Sol maggiore. Note e DITEGGIATURE dallo spartito
// (screenshot); dove manca il dito è proposto. Forma: intro, A (1ª e 2ª volta), ponte B (in La bemolle), A finale.
// Nel ponte la sinistra ha due voci (basso in minima + accordo sul secondo movimento): qui il basso è scritto
// come semiminima e l'accordo sul secondo movimento.
import type { Song, Measure } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Measure => ({ chords, rh, rf, lh, lf });

const A1 = M(["Am", "Am(maj7)"], "r:2 A4:2 B4:2 A4:2 B4:4 A4:4", "1 2 1 2 1", "A3+C4+E4:8 G#3+C4+E4:8", "4/2/1 5/2/1");
const A2 = M(["Am7", "Am6"], "E5:4 E5:12", "5 5", "G3+C4+E4:8 F#3+C4+E4:8", "5/2/1 5/2/1");
const A3 = M(["G", "Am"], "r:2 D5:2 E5:2 D5:2 E5:4 D5:4", "1 2 1 2 1", "G3+B3:8 A3+C4:8", "4/2 3/1");
const A4 = M(["G/B", "Bb°"], "A5:4 G5:4 F#5:4 E5:4", "5 4 3 2", "B3+D4:8 Bb3+Db4:8", "2/1 3/1");
const A5 = M(["Am", "Am7"], "r:4 G5:4 [E5 C5 E4]:8", "5 4 2 1", "A3+C4:8 G3+C4:8", "2/1 3/1");
const A6 = M(["D7", "D#°"], "B4:8 A4:8", "3 2", "D3+F#3+C4:8 D#3+F#3+C4:8", "5/3/1 5/3/1");
const A7 = M(["Em7", "Eb7", "D7"], "r:2 G4:2 A4:2 B4:2 D5:4 [D5 E5 Bb4]:4", "1 2 3 4 4 5 2",
  "E3+G3+D4:4 Eb3+G3+Db4:4 D3+F#3+C4:8", "5/3/1 5/3/1 5/3/1");
const tema = [A1, A2, A3, A4, A5, A6, A7];

export const bodyAndSoul: Song = {
  slug: "body-and-soul",
  title: "Body And Soul",
  composer: "Johnny Green",
  credit: "Arrangiamento facile in Sol maggiore, pubblicato con il permesso. Note e diteggiature dallo spartito (dove manca il dito è proposto)",
  collection: "standards",
  mode: "major",
  videoKey: "G",
  baseKey: "G",
  progression: ["Am", "Am(maj7)", "Am7", "Am6", "G", "Am", "G/B", "Bb°", "Am", "D7", "Em7", "Eb7", "D7", "G"],
  progressionLabel: "la sezione A",
  fullTips: [
    "Tonalità: Sol maggiore (un diesis, il Fa). «Freely, with expression»: libero ed espressivo, semiminima circa 112.",
    "La sinistra suona accordi tenuti, due per battuta: impara prima le forme (il La minore con il basso che scende La – Sol# – Sol – Fa#).",
    "La destra ha poche note e lunghe: cantale, rispettando le legature di frase.",
  ],
  parts: [
    {
      id: 1,
      title: "Intro",
      subtitle: "Introduzione",
      focus: "Battute 1–2: Solmaj7 – Solb7 – Fa7 – Mi7",
      tempo: 100,
      tips: [
        "Le stesse tre note scendono di un semitono: Re – Sol – Re, poi Reb – Solb – Reb (dita 2-5-2).",
        "Sinistra: accordi che scendono per semitoni, Solmaj7 – Solb7 – Fa7 – Mi7 (5-3-1); nella seconda battuta il Fa è naturale.",
      ],
      measures: [
        M(["Gmaj7", "Gb7"], "r:2 D5:2 G5:2 D5:2 r:2 Db5:2 Gb5:2 Db5:2", "2 5 2 2 5 2", "F#3+B3+D4:8 E3+Bb3+Db4:8", "5/3/1 5/3/1"),
        M(["F7", "E7"], "r:2 C5:2 F5:2 A5:2 E5:4 B4:4", "1 2 5 3 1", "F3+A3+Eb4:8 E3+G#3+D4:8", "5/3/1 5/3/1"),
      ],
    },
    {
      id: 2,
      title: "Tema (A)",
      subtitle: "Prima volta",
      focus: "Battute 3–10: «My heart is sad and lonely…»",
      tempo: 100,
      firstMeasure: 3,
      tips: [
        "Battuta 1 della parte: La – Si – La – Si – La col pollice e il 2. Sotto, la sinistra fa scendere il La: La – Sol# – Sol – Fa#.",
        "Battuta 5 (7 nel brano): La – Sol – Fa# – Mi scende con 5-4-3-2.",
        "Battuta 6: Sol col 5, poi la terzina Mi – Do – Mi grave (4-2-1): apri la mano.",
        "Battuta 8 (1ª volta): Sol tenuto e il Fa naturale che riporta all'inizio del tema.",
      ],
      measures: [
        ...tema,
        M(["G", "F7", "E7"], "G4:12 F4:4", "1 2", "r:4 F3+A3+Eb4:4 E3+G#3+D4:8", "5/3/1 5/3/1"),
      ],
    },
    {
      id: 3,
      title: "Tema (A) ripetuto",
      subtitle: "Seconda volta",
      focus: "Battute 11–18: «I spend my days in longing…»",
      tempo: 100,
      firstMeasure: 11,
      tips: [
        "Le battute sono le stesse della prima volta (con le seconde parole).",
        "Ultima battuta (2ª volta): Sol tenuto; la sinistra scende Fa7 – Mi7 – Mib7.",
      ],
      measures: [
        ...tema,
        M(["G", "F7", "E7", "Eb7"], "G4:16", "1", "r:4 F3+A3+Eb4:4 E3+G#3+D4:4 Eb3+G3+Db4:4", "5/3/1 5/3/1 5/3/1"),
      ],
    },
    {
      id: 4,
      title: "Ponte (B)",
      subtitle: "In La bemolle",
      focus: "Battute 19–26: «I can't believe it, it's hard to conceive it…»",
      tempo: 108,
      firstMeasure: 19,
      tips: [
        "«Con moto»: un po' più mosso. Il ponte va in La bemolle, un semitono sopra il Sol: tanti bemolli scritti nota per nota.",
        "La frase della destra è sempre la stessa: tre crome che salgono (1-2-3), poi la nota lunga col 5.",
        "Sinistra: basso sul primo movimento, accordo sul secondo, due volte per battuta (dita 4 o 5 sul basso, 2/1 sull'accordo).",
        "Battuta 4 (22 nel brano): sotto il Lab grave la sinistra scende Sol – Fa – Mib (1-2-3).",
        "Battuta 8 (26): Sib – La – Sol# alla destra e Solb7 – Fa7 – Mi7 alla sinistra: tutto scende di un semitono e riporta al La minore del tema.",
      ],
      measures: [
        M(["Ab", "Bbm"], "r:2 Ab4:2 Bb4:2 C5:2 Eb5:2 Eb5:4 Eb5:2", "1 2 3 5 5 2", "Ab3:4 C4+Eb4:4 Bb3:4 Db4+F4:4", "4 2/1 3 2/1"),
        M(["Abmaj7", "Dbm"], "Ab5:2 Ab5:4 C5:2 Eb5:2 Eb5:4 Db5:2", "5 5 1 4 4 3", "C4:4 Eb4+G4:4 Db4:4 E4+Ab4:4", "4 2/1 4 2/1"),
        M(["Ab/Eb", "Eb7"], "C5:2 C5:4 Ab4:2 Bb4:4 G4:4", "2 2 1 4 3", "Eb3:4 Ab3+C4:4 Eb3:4 G3+Db4:4", "5 2/1 5 3/1"),
        M(["Ab"], "C4+Eb4:16", "1/3", "r:4 Ab2+G3:4 F3:4 Eb3:4", "5/1 2 3"),
        M(["Abm", "Db7"], "r:2 Ab4:2 Bb4:2 Cb5:2 Eb5:2 Eb5:4 Db5:2", "1 2 3 5 5 1", "Ab3:4 Cb4+Eb4:4 Db3:4 F3+Cb4:4", "3 2/1 5 3/1"),
        M(["Gb", "A°"], "Bb5:2 Bb5:4 F5:2 Ab5:2 Ab5:4 Eb5:2", "5 5 1 4 4 2", "Gb3:4 Bb3+Db4:4 A3:4 C4+Eb4:4", "4 2/1 3 2/1"),
        M(["Abm", "Db7"], "Gb5:2 Gb5:4 Eb5:2 F5:2 F5:4 Db5:2", "4 4 2 5 5 3", "Ab3:4 Cb4+Eb4:4 Db3:4 F3+Cb4:4", "4 2/1 5 3/1"),
        M(["Gb7", "F7", "E7"], "Bb4:4 A4:4 G#4:4 G#4+E5:4", "2 1 2 2/5", "Gb3+Bb3+E4:4 F3+A3+Eb4:4 E3+G#3+D4:8", "5/3/1 5/3/1 5/3/1"),
      ],
    },
    {
      id: 5,
      title: "A finale",
      subtitle: "Ripresa e chiusura",
      focus: "Battute 27–34: «My life's a wreck you're making…»",
      tempo: 100,
      firstMeasure: 27,
      tips: [
        "«Freely»: di nuovo libero. È la sezione A con le parole finali.",
        "Ultima battuta: Sol tenuto alla destra, l'accordo di Sol alla sinistra.",
      ],
      measures: [...tema, M(["G"], "G4:12 r:4", "1", "r:4 G3+B3+D4:8 r:4", "5/3/1")],
    },
  ],
};
