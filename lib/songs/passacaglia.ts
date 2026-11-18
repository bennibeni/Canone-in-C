// Passacaglia (Händel / Halvorsen), arrangiamento a due mani in La minore di @reeveswongpiano — due reel.
// Note, ritmo e DITEGGIATURA ricavati dai video (tasto acceso + posizione dei polpastrelli),
// altezze confermate dall'audio. Battuta 7: Sol♯ e Fa♯ della destra (tasti neri non visti dal
// video) e le loro dita sono ricavati dall'audio e dedotti.
import type { Song } from "../score";
import { REEVES_WONG } from "./arrangers";

const v = (file: string) => `/videos/${encodeURIComponent(file)}`;

export const passacaglia: Song = {
  slug: "passacaglia",
  title: "Passacaglia",
  composer: "Händel / Halvorsen",
  credit: "Trascrizione e diteggiature dall'arrangiamento a due mani e dai due reel",
  arranger: REEVES_WONG,
  mode: "minor",
  videoKey: "C",
  progression: ["Am", "Dm", "G", "C", "F", "Dm", "E", "Am"],
  progressionLabel: "quinte discendenti e cadenza minore",
  lhPattern: [5, 2, 1, 2, 1, 2, 1, 2],
  fullTips: [
    "Le due parti usano lo stesso basso e gli stessi accordi: cambia solo la destra (scala che scende, poi scala che sale).",
    "Tra le due parti la sinistra ripete identica l'arpeggio: concentrati sul cambio di disegno della destra.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "La scala che scende",
      focus: "Nota tenuta in alto e scala discendente col pollice",
      tempo: 128,
      tips: [
        "La progressione scende per quinte: Lam – Rem – Sol – Do – Fa, poi Rem – Mi – Lam (la cadenza minore).",
        "Sinistra: arpeggio a crome fondamentale – quinta – ottava – quinta – decima, con le dita 5-2-1-2-1-2-1-2.",
        "Destra: il 5 resta sulla nota acuta (Do, poi Si, poi La) mentre la scala scende alternandosi con lei.",
        "Battuta 7: sull'accordo di Mi la destra fa un piccolo abbellimento La – Sol♯ – La – Fa♯ – Sol♯ che porta al La finale.",
      ],
      videos: [{ label: "Note che scendono", src: v("Passacaglia Part 1 – Handel  Halvorsen.mp4"), beats: [0.133, 0.567, 1.067, 1.533, 2.033, 2.467, 2.933, 3.433, 3.933, 4.367, 4.833, 5.333, 5.800, 6.233, 6.733, 7.200, 7.700, 8.100, 8.667, 9.133, 9.600, 10.067, 10.533, 10.967, 11.500, 11.933, 12.400, 12.900, 13.433, 13.900, 14.400, 14.867, 15.333] }],
      measures: [
      { chords: ["Am"], rh: "C5:2 C6:2 B5:2 C6:2 A5:2 C6:2 G5:2 C6:2", lh: "A2:2 E3:2 A3:2 E3:2 C4:2 E3:2 A3:2 E3:2", rf: "1 5 4 5 3 5 2 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "F5:2 C6:2 E5:2 C6:2 D5:2 C6:2 C5:2 C6:2", lh: "D2:2 A2:2 D3:2 A2:2 F3:2 A2:2 D3:2 A2:2", rf: "1 5 1 5 1 5 1 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["G"], rh: "B4:2 B5:2 A5:2 B5:2 G5:2 B5:2 F5:2 B5:2", lh: "G2:2 D3:2 G3:2 D3:2 B3:2 D3:2 G3:2 D3:2", rf: "1 5 4 5 3 5 2 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["C"], rh: "E5:2 B5:2 D5:2 B5:2 C5:2 B5:2 B4:2 B5:2", lh: "C2:2 G2:2 C3:2 G2:2 E3:2 G2:2 C3:2 G2:2", rf: "1 5 1 5 1 5 1 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["F"], rh: "A4:2 A5:2 G5:2 A5:2 F5:2 A5:2 E5:2 A5:2", lh: "F2:2 C3:2 F3:2 C3:2 A3:2 C3:2 F3:2 C3:2", rf: "1 5 4 5 3 5 2 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "D5:2 A5:2 C5:2 A5:2 B4:2 A5:2 A4:2 A5:2", lh: "D2:2 A2:2 D3:2 A2:2 F3:2 A2:2 D3:2 A2:2", rf: "1 5 1 5 1 5 1 5", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "A5:4 G#5:4 G#5:2 A5:2 F#5:2 G#5:2", lh: "E2:2 B2:2 E3:2 B2:2 G#3:4 E3+G#3+B3:4", rf: "5 4 3 4 2 3", lf: "5 2 1 2 1 5/3/1" },
      { chords: ["Am"], rh: "A5:16", lh: "A2:2 E3:2 A3:2 E3:2 C4:4 A3+C4+E4:4", rf: "4", lf: "5 2 1 2 1 5/3/1" },
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "La scala che sale",
      focus: "Nota tenuta in basso e scala ascendente",
      tempo: 128,
      tips: [
        "Stesso basso e stessi accordi della Parte 1: la sinistra non cambia.",
        "Destra: ora il pollice resta sulla nota grave (Do, poi Si, poi La) e la scala sale con 2-3-4-5.",
        "Nelle battute 2, 4 e 6 il 5 sale di nota in nota: apri la mano senza spostare il pollice.",
        "Battuta 7: stesso abbellimento sul Mi della Parte 1 (La – Sol♯ – La – Fa♯ – Sol♯ → La).",
      ],
      videos: [{ label: "Note che scendono", src: v("Passacaglia Part 2 – Handel  Halvorsen.mp4"), beats: [0.067, 0.533, 1.000, 1.467, 1.967, 2.433, 2.900, 3.367, 3.867, 4.333, 4.800, 5.267, 5.833, 6.200, 6.700, 7.167, 7.633, 8.100, 8.567, 9.067, 9.567, 10.000, 10.467, 10.900, 11.367, 11.833, 12.300, 12.800, 13.300, 13.767, 14.267, 14.733, 15.200] }],
      measures: [
      { chords: ["Am"], rh: "C6:2 C5:2 D5:2 C5:2 E5:2 C5:2 F5:2 C5:2", lh: "A2:2 E3:2 A3:2 E3:2 C4:2 E3:2 A3:2 E3:2", rf: "5 1 2 1 3 1 4 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "G5:2 C5:2 A5:2 C5:2 B5:2 C5:2 C6:2 C5:2", lh: "D2:2 A2:2 D3:2 A2:2 F3:2 A2:2 D3:2 A2:2", rf: "5 1 5 1 5 1 5 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["G"], rh: "B5:2 B4:2 C5:2 B4:2 D5:2 B4:2 E5:2 B4:2", lh: "G2:2 D3:2 G3:2 D3:2 B3:2 D3:2 G3:2 D3:2", rf: "5 1 2 1 3 1 4 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["C"], rh: "F5:2 B4:2 G5:2 B4:2 A5:2 B4:2 B5:2 B4:2", lh: "C2:2 G2:2 C3:2 G2:2 E3:2 G2:2 C3:2 G2:2", rf: "5 1 5 1 5 1 5 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["F"], rh: "A5:2 A4:2 B4:2 A4:2 C5:2 A4:2 D5:2 A4:2", lh: "F2:2 C3:2 F3:2 C3:2 A3:2 C3:2 F3:2 C3:2", rf: "5 1 2 1 3 1 4 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["Dm"], rh: "E5:2 A4:2 F5:2 A4:2 G5:2 A4:2 A5:2 A4:2", lh: "D2:2 A2:2 D3:2 A2:2 F3:2 A2:2 D3:2 A2:2", rf: "5 1 5 1 5 1 5 1", lf: "5 2 1 2 1 2 1 2" },
      { chords: ["E"], rh: "A5:4 G#5:4 G#5:2 A5:2 F#5:2 G#5:2", lh: "E2:2 B2:2 E3:2 B2:2 G#3:4 E3+G#3+B3:4", rf: "5 4 3 4 2 3", lf: "5 2 1 2 1 5/3/1" },
      { chords: ["Am"], rh: "A5:16", lh: "A2:2 E3:2 A3:2 E3:2 C4:4 A3+C4+E4:4", rf: "4", lf: "5 2 1 2 1 5/3/1" },
      ],
    },
  ],
};
