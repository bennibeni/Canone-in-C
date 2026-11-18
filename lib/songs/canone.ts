// Canone in Re di Pachelbel, arrangiamento in Do di @reeveswongpiano — trascrizione dai 4 video.
import type { Part, Song } from "../score";
import { REEVES_WONG } from "./arrangers";

const v = (file: string) => `/videos/${encodeURIComponent(file)}`;

const LH = {
  C_G: "C3 G3 C4 G3 G2 D3 G3 D3",
  Am_Em: "A2 E3 A3 E3 E2 B2 E3 B2",
  F_C: "F2 C3 F3 C3 C3 G3 C4 G3",
  F_C_low: "F2 C3 F3 C3 C2 G2+C4 C3 G2",
  F_C_low2: "F2 C3 F3 C3 C2 G2 C3 G2",
  F_G: "F2 C3 F3 C3 G2 D3 G3 D3",
  Dm_G: "D2 A2 D3 A2 G2 D3 G3 D3",
};

// Parte 1 — arpeggi aperti nella sinistra (10a), minime nella destra
const P1_LH = {
  C_G: "C3 G3 C4 E4 G2 D3 G3 B3",
  Am_Em: "A2 E3 A3 C4 E2 B2 E3 G3",
  F_C: "F2 C3 F3 A3 C3 G3 C4 E4",
  F_G: "F2 C3 F3 A3 G2 D3 G3 B3",
};

const PARTS: Part[] = [
  {
    id: 1,
    title: "Parte 1",
    subtitle: "Il basso del Canone",
    focus: "Minime nella destra, arpeggi a crome nella sinistra",
    tempo: 72,
    tips: [
      "La progressione è sempre la stessa: Do – Sol – Lam – Mim – Fa – Do – Fa – Sol. Due accordi per battuta.",
      "Sinistra: ogni accordo è un arpeggio di 4 crome (fondamentale, quinta, ottava, decima). Imparala da sola finché non va in automatico.",
      "Destra: una nota lunga (minima) per accordo, che scende per gradi: Mi Re Do Si La Sol La Si.",
      "Al secondo giro la melodia riparte una terza sotto: Do Si La Sol Fa Mi Fa Sol.",
    ],
    videos: [
      {
        label: "Video",
        src: v("Canon In C Parte 1 – Johann Pachelbel.mp4"),
        beats: [1.267, 2.060, 2.750, 3.538, 4.373, 5.195, 6.014, 6.827, 7.626, 8.431, 9.230, 10.029, 10.817, 11.603, 12.384, 13.165, 13.958, 14.751, 15.542, 16.336, 17.123, 17.904, 18.695, 19.481, 20.269, 21.064, 21.861, 22.660, 23.460, 24.255, 25.050, 25.839, 26.623],
      },
    ],
    measures: [
      { chords: ["C", "G"], rh: "E6:8 D6:8", rf: "5 4", lh: P1_LH.C_G },
      { chords: ["Am", "Em"], rh: "C6:8 B5:8", rf: "3 2", lh: P1_LH.Am_Em },
      { chords: ["F", "C"], rh: "A5:8 G5:8", rf: "3 2", lh: P1_LH.F_C },
      { chords: ["F", "G"], rh: "A5:8 B5:8", rf: "3 4", lh: P1_LH.F_G },
      { chords: ["C", "G"], rh: "C6:8 B5:8", rf: "5 4", lh: P1_LH.C_G },
      { chords: ["Am", "Em"], rh: "A5:8 G5:8", rf: "3 2", lh: P1_LH.Am_Em },
      { chords: ["F", "C"], rh: "F5:8 E5:8", rf: "2 1", lh: P1_LH.F_C },
      { chords: ["F", "G"], rh: "F5:8 G5:8", rf: "2 3", lh: P1_LH.F_G },
    ],
  },
  {
    id: 2,
    title: "Parte 2",
    subtitle: "La melodia a crome",
    focus: "Crome nella destra, poi semiminime",
    tempo: 72,
    tips: [
      "La sinistra cambia schema: fondamentale – quinta – ottava – quinta, sempre a crome.",
      "Battute 1–4: la destra suona crome con salti d'ottava (Do6 → Do5). Guarda prima la forma della mano, poi le note.",
      "Battute 5–8: semiminime, una ogni movimento. È il momento per curare il legato.",
      "Nell'ultima battuta compare il Re minore (Dm): la sinistra scende fino al Re2.",
    ],
    videos: [
      {
        label: "Video",
        src: v("Canon In C Parte 2 – Johann Pachelbel.mp4"),
        beats: [0.027, 0.824, 1.616, 2.405, 3.182, 3.957, 4.724, 5.489, 6.249, 7.011, 7.770, 8.527, 9.275, 10.026, 10.766, 11.515, 12.270, 13.032, 13.799, 14.571, 15.337, 16.105, 16.867, 17.623, 18.376, 19.124, 19.879, 20.632, 21.382, 22.133, 22.881, 23.629, 24.380],
      },
    ],
    measures: [
      { chords: ["C", "G"], rh: "C6:2 B5:2 C6:2 C5:2 B4:2 G5:2 D5:2 E5:2", rf: "5 4 5 2 1 5 2 3", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "C5:2 C6:2 B5:2 A5:2 B5:2 E6:2 G6:2 A6:2", rf: "1 5 4 3 1 2 4 5", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "F6:2 E6:2 D6:2 F6:2 E6:2 D6:2 C6:2 B5:2", rf: "5 4 3 5 4 3 2 1", lh: LH.F_C },
      { chords: ["F", "G"], rh: "A5:2 G5:2 F5:2 E5:2 D5:2 F5:2 E5:2 D5:2", rf: "3 2 1 3 2 4 3 2", lh: LH.F_G },
      { chords: ["C", "G"], rh: "C5:4 C6:4 G5:4 B5:4", rf: "1 5 2 4", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:4 A5:4 D5:4 G5:4", rf: "1 4 1 4", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "A4:4 F5:4 E5:4 G5:4", rf: "1 4 3 5", lh: LH.F_C },
      { chords: ["Dm", "G"], rh: "D5:4 C6:4 G5:4 B5:4", rf: "1 5 2 4", lh: LH.Dm_G },
    ],
  },
  {
    id: 3,
    title: "Parte 3",
    subtitle: "Le semicrome",
    focus: "Croma + due semicrome e scale veloci",
    tempo: 66,
    tips: [
      "Ritmo base della destra: croma + due semicrome («taaa-ti-ti»). Contalo ad alta voce prima di suonare.",
      "Le scale a semicrome (Sol4 → Sol5) vanno diteggiate con il passaggio del pollice: provale lente, a mani separate.",
      "Battuta 3: attenzione alla sincope semicroma – croma – semicroma (Mi Re · Re).",
      "Le battute 5–8 ripetono esattamente le battute 1–4.",
    ],
    videos: [
      {
        label: "Video",
        src: v("Canon In C Parte 3 – Johann Pachelbel.mp4"),
        beats: [0.118, 0.854, 1.625, 2.391, 3.154, 3.919, 4.681, 5.441, 6.190, 6.933, 7.665, 8.398, 9.131, 9.866, 10.608, 11.346, 12.083, 12.827, 13.563, 14.302, 15.039, 15.775, 16.515, 17.255, 17.986, 18.718, 19.448, 20.175, 20.907, 21.642, 22.375, 23.109, 23.836],
      },
    ],
    measures: [
      { chords: ["C", "G"], rh: "G5:2 E5:1 F5:1 G5:2 E5:1 F5:1 G5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1", rf: "4 2 3 4 2 3 4 1 2 3 1 2 3 4", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:2 C5:1 D5:1 E5:2 E4:1 F4:1 G4:1 A4:1 G4:1 F4:1 G4:1 E4:1 F4:1 G4:1", rf: "3 1 2 3 1 2 3 4 3 2 3 1 2 3", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "F4:2 A4:1 G4:1 F4:2 E4:1 D4:1 E4:1 D4:2 D4:1 E4:1 F4:1 G4:1 A4:1", rf: "3 5 4 3 2 1 2 1 1 2 3 4 5", lh: LH.F_C_low },
      { chords: ["F", "G"], rh: "F4:2 A4:1 G4:1 A4:2 B4:1 C5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1 G5:1", rf: "1 3 2 3 4 5 1 2 3 1 2 3 4 5", lh: LH.F_G },
      { chords: ["C", "G"], rh: "G5:2 E5:1 F5:1 G5:2 E5:1 F5:1 G5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1", rf: "4 2 3 4 2 3 4 1 2 3 1 2 3 4", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:2 C5:1 D5:1 E5:2 E4:1 F4:1 G4:1 A4:1 G4:1 F4:1 G4:1 E4:1 F4:1 G4:1", rf: "3 1 2 3 1 2 3 4 3 2 3 1 2 3", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "F4:2 A4:1 G4:1 F4:2 E4:1 D4:1 E4:1 D4:2 D4:1 E4:1 F4:1 G4:1 A4:1", rf: "3 5 4 3 2 1 2 1 1 2 3 4 5", lh: LH.F_C_low },
      { chords: ["F", "G"], rh: "F4:2 A4:1 G4:1 A4:2 B4:1 C5:1 G4:1 A4:1 B4:1 C5:1 D5:1 E5:1 F5:1 G5:1", rf: "1 3 2 3 4 5 1 2 3 1 2 3 4 5", lh: LH.F_G },
    ],
  },
  {
    id: 4,
    title: "Parte 4",
    subtitle: "Il ritmo puntato",
    focus: "Semiminima puntata + croma, il Si bemolle",
    tempo: 72,
    tips: [
      "Ritmo chiave: semiminima puntata + croma («taaa–a-ti»). La nota puntata dura tre crome della sinistra.",
      "Battuta 4 e 8: compare il Si♭ (tasto nero). Nella battuta 8 il Si♭ si risolve sul Si naturale.",
      "La sinistra torna allo schema della Parte 2, con il Do grave (Do2) sull'accordo di Do.",
      "Battute 5–8: la melodia riparte dal Sol5, una terza sopra. Nella battuta 7 c'è il salto Do5 → La5, nella 8 si sale fino al Do6.",
    ],
    videos: [
      {
        label: "Video",
        src: v("Canon In C Parte 4 – Johann Pachelbel.mp4"),
        beats: [1.033, 1.754, 2.466, 3.178, 3.884, 4.586, 5.287, 5.993, 6.699, 7.409, 8.123, 8.831, 9.523, 10.222, 10.914, 11.614, 12.325, 13.029, 13.728, 14.423, 15.108, 15.791, 16.471, 17.156, 17.842, 18.537, 19.236, 19.933, 20.621, 21.311, 22.003, 22.703, 23.431],
      },
    ],
    measures: [
      { chords: ["C", "G"], rh: "E5:6 E5:2 E5:2 F5:2 E5:2 D5:2", rf: "3 3 3 4 3 2", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "C5:6 C5:2 C5:2 D5:2 C5:2 B4:2", rf: "2 2 2 3 2 1", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "A4:6 A4:2 G4:6 G4:2", rf: "2 2 1 1", lh: LH.F_C_low2 },
      { chords: ["F", "G"], rh: "C5:2 Bb4:2 A4:2 Bb4:2 G4:8", rf: "4 3 2 3 1", lh: LH.F_G },
      { chords: ["C", "G"], rh: "G5:6 G5:2 G5:2 A5:2 G5:2 F5:2", rf: "3 3 3 4 3 2", lh: LH.C_G },
      { chords: ["Am", "Em"], rh: "E5:6 E5:2 E5:2 F5:2 E5:2 D5:2", rf: "3 3 3 4 3 2", lh: LH.Am_Em },
      { chords: ["F", "C"], rh: "C5:6 A5:2 G5:8", rf: "1 5 4", lh: LH.F_C_low2 },
      { chords: ["F", "G"], rh: "C6:2 Bb5:2 A5:2 Bb5:2 B5:8", rf: "5 4 3 4 4", lh: LH.F_G },
    ],
  },
];

export const canone: Song = {
  slug: "canone",
  title: "Canone",
  titleWithKey: true,
  composer: "Johann Pachelbel",
  credit: "Trascrizione dall'arrangiamento in quattro parti e dai video",
  arranger: REEVES_WONG,
  mode: "major",
  videoKey: "C",
  progression: ["C", "G", "Am", "Em", "F", "C", "F", "G"],
  lhPattern: [5, 2, 1, 2],
  fullTips: [
    "Suona le quattro parti senza fermarti: il passaggio tra una parte e l'altra è il punto più delicato.",
    "Ogni parte inizia con l'accordo della tonica: usa la prima battuta come ancora.",
  ],
  parts: PARTS,
};
