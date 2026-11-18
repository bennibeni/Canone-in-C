// Autumn Leaves (Joseph Kosma), arrangiamento in La minore di @reeveswongpiano — due reel.
// Note, ritmo e DITEGGIATURA ricavati dai video: tasto acceso + posizione dei polpastrelli
// (riconoscimento delle mani fotogramma per fotogramma), altezze confermate dall'audio.
// La melodia nel video è tenuta col pedale: qui è scritta legata fino alla nota successiva.
// Battuta 0 = levare (le note prima del primo battere).
import type { Song } from "../score";
import { REEVES_WONG } from "./arrangers";

const v = (file: string) => `/videos/${encodeURIComponent(file)}`;

export const autumnLeaves: Song = {
  slug: "autumn-leaves",
  title: "Autumn Leaves",
  composer: "Joseph Kosma",
  credit: "Trascrizione e diteggiature dall'arrangiamento e dai due reel",
  arranger: REEVES_WONG,
  mode: "minor",
  videoKey: "C",
  progression: ["Dm", "G", "C", "F", "Dm", "E", "Am"],
  progressionLabel: "quinte discendenti e cadenza minore",
  lhPattern: [5, 2, 1, 2],
  fullTips: [
    "Le due parti formano il brano intero: il tema (A) e la sezione centrale con la cadenza minore.",
    "Tra la fine della Parte 1 e l'attacco della Parte 2 tieni il La2 e prepara la destra sul Sol♯.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il tema",
      focus: "Quinte discendenti: Rem – Sol – Do – Fa",
      tempo: 96,
      pickup: true,
      tips: [
        "La progressione scende per quinte: Rem – Sol – Do – Fa, poi Rem – Mi – Lam (la cadenza minore).",
        "Sinistra: arpeggio fondamentale – quinta – ottava – quinta a crome, sempre con le dita 5-2-1-2.",
        "Destra: le tre note d'attacco (La-Si-Do, Sol-La-Si, Fa-Sol-La) con 1-2-3, poi la nota lunga con il 5 aprendo la mano.",
        "Battuta 6: sull'accordo di Mi compare il Sol♯ (tasto nero) — è la sensibile che porta al La minore.",
      ],
      videos: [{ label: "Note che scendono", src: v("Autumn Leaves Part 1 – Joseph Kosma.mp4"), beats: [-0.733, -0.100, 0.533, 1.167, 1.800, 2.433, 3.067, 3.700, 4.333, 4.967, 5.600, 6.167, 6.800, 7.400, 8.000, 8.600, 9.233, 9.867, 10.467, 11.033, 11.633, 12.267, 12.867, 13.467, 14.067, 14.700, 15.300, 15.867, 16.500, 17.100, 17.700, 18.300, 18.900, 19.533, 20.167, 20.867, 21.567, 22.200, 22.767, 23.333, 23.933, 24.567, 25.133, 25.733, 26.333, 26.933, 27.567, 28.133, 28.733, 29.333, 29.933, 30.533, 31.133, 31.767, 32.333, 32.900, 33.467, 34.100, 34.667, 35.267, 35.867, 36.467, 37.067, 37.667, 38.267, 38.867, 39.467, 40.067, 40.667] }],
      measures: [
      { chords: [], rh: "r:8 r:2 A4:2 B4:2 C5:2", lh: "r:16", rf: "1 2 3" },
      { chords: ["Dm"], rh: "F5:16", lh: "D2:2 A2:2 D3:2 A2:2 D3:2 A2:2 D3:2 A2:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["G"], rh: "r:4 G4:4 A4:4 B4:4", lh: "G2:2 D3:2 G3:2 D3:2 G3:2 D3:2 G3:2 D3:2", rf: "1 2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["C"], rh: "E5:16", lh: "C3:2 G3:2 C4:2 G3:2 C4:2 G3:2 C4:2 G3:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["F"], rh: "r:4 F4:4 G4:4 A4:4", lh: "F2:2 C3:2 F3:2 C3:2 F3:2 C3:2 F3:2 C3:2", rf: "1 2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "D5:16", lh: "D2:2 A2:2 D3:2 A2:2 D3:2 A2:2 D3:2 A2:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "r:4 E4:8 G#4:4", lh: "E2:2 B2:2 E3:2 B2:2 E3:2 B2:2 E3:2 B2:2", rf: "1 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "C5:16", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "r:4 A4:4 B4:4 C5:4", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "1 2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "F5:16", lh: "D2:2 A2:2 D3:2 A2:2 D3:2 A2:2 D3:2 A2:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["G"], rh: "r:4 G4:4 A4:4 B4:4", lh: "G2:2 D3:2 G3:2 D3:2 G3:2 D3:2 G3:2 D3:2", rf: "1 2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["C"], rh: "E5:16", lh: "C3:2 G3:2 C4:2 G3:2 C4:2 G3:2 C4:2 G3:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["F"], rh: "r:4 F4:4 G4:4 A4:4", lh: "F2:2 C3:2 F3:2 C3:2 F3:2 C3:2 F3:2 C3:2", rf: "1 2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "D5:16", lh: "D2:2 A2:2 D3:2 A2:2 D3:2 A2:2 D3:2 A2:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "r:4 B4:4 D5:4 C5:4", lh: "E2:2 B2:2 E3:2 B2:2 E3:2 B2:2 E3:2 B2:2", rf: "3 5 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "A4:16", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "2", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "r:16", lh: "A2:16", lf: "5" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "La cadenza minore",
      focus: "Rem – Mi – Lam e il Re♯ cromatico",
      tempo: 96,
      pickup: true,
      tips: [
        "Parte centrale costruita sulla cadenza minore Rem – Mi – Lam: il Mi maggiore porta il Sol♯.",
        "Battuta 6: salto d'ottava Sol4 → Sol5 (1 → 5): sposta la mano durante la nota lunga precedente.",
        "Battuta 8: il Re♯ cromatico (dito 2) sale al Mi (dito 3).",
        "Battuta 9: il Fa ripetuto cambia dito (3 → 4), poi Re con il 2.",
        "La sinistra non cambia: 5-2-1-2 su ogni accordo.",
      ],
      videos: [{ label: "Note che scendono", src: v("Autumn Leaves Part 2 – Joseph Kosma.mp4"), beats: [-0.300, 0.267, 0.833, 1.400, 1.967, 2.567, 3.133, 3.700, 4.267, 4.867, 5.433, 6.033, 6.600, 7.200, 7.800, 8.367, 8.967, 9.567, 10.133, 10.733, 11.400, 12.067, 12.633, 13.233, 13.833, 14.433, 15.033, 15.633, 16.267, 16.867, 17.433, 18.033, 18.600, 19.233, 19.833, 20.433, 21.067, 21.700, 22.267, 22.833, 23.500, 24.067, 24.667, 25.233, 25.900, 26.533, 27.100, 27.667, 28.233, 28.867, 29.500, 30.167, 30.867, 31.500, 32.100, 32.700, 33.333, 33.933, 34.533, 35.133, 35.767, 36.367, 36.967, 37.633, 38.267, 38.900, 39.533, 40.167, 40.800] }],
      measures: [
      { chords: [], rh: "r:8 G#4:4 A4:4", lh: "r:16", rf: "1 2" },
      { chords: ["E"], rh: "B4:4 E4:4 B4:8", lh: "E2:2 B2:2 E3:2 B2:2 E3:2 B2:2 E3:2 B2:2", rf: "3 1 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "r:4 B4:4 A4:4 B4:4", lh: "E2:2 B2:2 E3:2 B2:2 E3:2 B2:2 E3:2 B2:2", rf: "4 3 4", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "C5:16", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "r:4 C5:4 B4:4 C5:4", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "3 2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "D5:16", lh: "D2:2 A2:2 D3:2 A2:2 D3:2 A2:2 D3:2 A2:2", rf: "4", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["G"], rh: "r:4 G4:4 G5:4 F5:4", lh: "G2:2 D3:2 G3:2 D3:2 G3:2 D3:2 G3:2 D3:2", rf: "1 5 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["C"], rh: "E5:16", lh: "C3:2 G3:2 C4:2 G3:2 C4:2 G3:2 C4:2 G3:2", rf: "3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["C"], rh: "r:8 D#5:4 E5:4", lh: "C3:2 G3:2 C4:2 G3:2 C4:2 G3:2 C4:2 G3:2", rf: "2 3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "F5:4 F5:4 D5:4 D5:4", lh: "D3:2 A3:2 D4:2 A3:2 D4:2 A3:2 D4:2 A3:2", rf: "3 4 2 2", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "B4:12 F5:4", lh: "E2:2 B2:2 E3:2 B2:2 E3:2 B2:2 E3:2 B2:2", rf: "1 4", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "E5:16", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "A4:16", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "D5:12 C5:4", lh: "D2:2 A2:2 D3:2 A2:2 D3:2 A2:2 D3:2 A2:2", rf: "5 4", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "B4:8 C5:4 E4:4", lh: "E2:2 B2:2 E3:2 B2:2 E3:2 B2:2 E3:2 B2:2", rf: "3 4 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "A4:16", lh: "A2:2 E3:2 A3:2 E3:2 A3:2 E3:2 A3:2 E3:2", rf: "3", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Am"], rh: "r:16", lh: "A2:16", lf: "5" },
      ],
    },
  ],
};
