// A Whiter Shade of Pale (Senza luce), musica di K. Reid e G. Brooker, testo italiano di Mogol.
// Adattamento di Franco Concina (trascrizione di proprietà di Nuova Carisch s.r.l.), in Do maggiore, 32 battute.
// Pubblicato con il permesso dell'editore. Note e DITEGGIATURE dallo spartito; alle note senza dito stampato
// è dato quello della posizione della mano.
// Lo spartito ha parti polifoniche (una nota lunga sopra o sotto le crome): l'app suona una voce per mano,
// quindi la nota lunga suona insieme alla prima croma e non resta tenuta. Battuta 24: terzina di semiminime
// nello spazio di una minima. Il ritornello con la 1ª volta (battuta 32 dello spartito) non è ripetuto:
// qui c'è direttamente la 2ª volta; per ripetere usa il loop.
import type { Song } from "../score";

const M = (chords: string[], rh: string, rf: string, lh: string, lf: string) => ({ chords, rh, rf, lh, lf });
const domanda = M(["F", "Em"], "r:4 C5:2 C5:2 A4+D5:2 C5:2 C5:2 A4:2", "4 4 2/5 4 4 2", "F3:8 E3:8", "1 3");
const risposta = (alta: string, f: string) => M(["Dm", "Dm/F"], `F4+C5:2 ${alta}:14`, `1/4 ${f}`, "D3:4 E3:4 F3:4 A3:4", "4 3 2 1");
const ripresa = M(["G", "F/A"], "r:4 A4:2 A4:2 B4:2 A4:2 B4:2 A4:2", "2 2 3 2 3 2", "G3:8 F3+A3:8", "2 2/1");

export const whiterShadeOfPale: Song = {
  slug: "a-whiter-shade-of-pale",
  title: "A Whiter Shade of Pale",
  composer: "Keith Reid e Gary Brooker (Procol Harum); testo italiano di Mogol («Senza luce»)",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "C",
  progression: ["C", "Am", "F", "Dm", "G", "Em", "F", "G"],
  progressionLabel: "il basso scende come in Bach",
  fullTips: [
    "Ispirato all'Aria sulla IV corda di Bach: il basso scende per gradi (Do – Si – La – Sol – Fa – Mi – Re).",
    "Lentamente, con espressione. In alcuni punti la destra suona due linee insieme (stile polifonico).",
    "Battute 4 e 6: ritmo incisivo (due semicrome e croma legata).",
    "Nello spartito il brano si ripete da capo con la 1ª volta; qui c'è la 2ª volta finale.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Il ritornello d'organo",
      focus: "Battute 1–8: la melodia sopra il basso che scende",
      tempo: 66,
      tips: [
        "Battuta 2: crome Do – Re – Do – Si – Do – Re – Mi – Do, legate.",
        "Battute 3 e 5: nota lunga (minima puntata) e poi due crome che salgono.",
        "Battute 4 e 6: Fa – Mi – Fa (o Sol – Fa – Sol) con 2-1-2, deciso.",
      ],
      measures: [
        M(["C", "C/B"], "C4+E4:16", "2/4", "C3:4 C3:4 B2:4 B2:4", "3 3 4 4"),
        M(["Am", "Am/G"], "C4+E4:2 D4:2 C4:2 B3:2 C4:2 D4:2 E4:2 C4:2", "2/4 3 2 1 2 3 4 1", "A2:8 G3:8", "5 1"),
        M(["F", "C/E"], "C4+A4:12 B4:2 C5:2", "1/5 4 5", "F3:4 F3:4 E3:8", "2 2 3"),
        M(["Dm", "Em", "F"], "F4:1 E4:1 F4:10 D4:4", "2 1 2 1", "D3:4 E3:4 F3:8", "4 3 2"),
        M(["G", "F"], "G4+B4:12 C5:2 D5:2", "2/4 4 5", "G3:4 G3:4 F3:8", "1 1 2"),
        M(["Em", "D"], "G4:1 F4:1 G4:8 F4:2 E4:2 F4:2", "2 1 2 1 3 4", "E3:4 E3:4 D3:8", "3 3 4"),
        M(["C", "F"], "F4:2 E4:2 D4:2 C4:2 C4+A4:2 D4:2 E4:2 F4:2", "4 3 2 1 1/5 2 3 4", "C3:8 F3:8", "5 2"),
        M(["G"], "B3+G4:2 C4:2 D4:2 E4:2 C4+F4:2 E4:2 F4:2 D4:2", "1/5 2 3 4 2/5 4 5 3", "G3:8 G2:8", "1 5"),
      ],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "La strofa",
      focus: "Battute 9–22: «We skipped the light fandango…»",
      tempo: 66,
      firstMeasure: 9,
      tips: [
        "Battuta 9: forte. Mi puntato col 3, Sol col pollice, poi Mi – Re alternati col 5 e il 4.",
        "Battute 11–14: mezzo forte. Do ribattuti col 4, poi la frase si posa sul La e sul Sol.",
        "Battute 15–16: forte, Re ribattuti col 4 e l'accordo Do – Mi tenuto.",
      ],
      measures: [
        M(["C", "C/B"], "E4:6 G4:2 G4+E5:2 D5:2 E5:2 D5:2", "3 1 1/5 4 5 4", "C3:4 C3:4 B2:8", "3 3 4"),
        M(["Am", "C"], "D5:2 C5:14", "4 3", "A2:4 B2:4 C3:4 E3:4", "5 4 3 2"),
        domanda,
        risposta("A4", "2"),
        ripresa,
        M(["C", "F", "G"], "A4:2 G4:14", "2 1", "E3:4 F3:4 E3:4 D3:4", "3 2 3 4"),
        M(["C", "G/B"], "r:4 D5:2 D5:2 G4+E5:4 D5:2 C5:2", "4 4 1/5 4 3", "C3:8 B2:8", "5 4"),
        M(["Am", "C"], "C5+E5:16", "3/5", "A2:4 B2:4 C3:4 E3:4", "5 4 3 2"),
        domanda,
        risposta("D5", "5"),
        ripresa,
        M(["C", "F", "G"], "A4:2 G4:14", "2 1", "E3:4 F3:4 E3:4 D3:4", "3 2 3 4"),
        M(["C", "G/B"], "r:4 E5:2 E5:2 D5+G5:2 G5:2 G5:2 E5:2", "2 2 1/4 4 4 2", "C3:8 B2:8", "5 4"),
        M(["Am", "C"], "A5:4 E5:4 E5:8", "5 2 2", "A2:8 C3:4 E3:4", "5 3 2"),
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "Il finale",
      focus: "Battute 23–32: l'ultima frase e la chiusa",
      tempo: 66,
      firstMeasure: 23,
      tips: [
        "Battuta 24: la terzina di semiminime Si+Mi – Mi – Sol (tre note uguali in due movimenti), crescendo.",
        "Battuta 25: forte, accordo La – Mi tenuto e Sol puntato col 4.",
        "Battute 31–32: Mi – Re – Do con 5-4-3 sopra il Do della sinistra.",
      ],
      measures: [
        domanda,
        M(["Dm", "G"], "F4+C5:2 A4:6 [B4+E5 E5 G5]:8", "1/4 2 1/2 3 4", "D3:4 E3:4 G3:8", "4 3 1"),
        M(["C", "G/B"], "E5+A5:8 G5:6 A4+C5+E5:2", "2/5 4 1/2/4", "C3:4 C3:4 B2:4 B2:4", "3 3 4 4"),
        M(["Am", "C"], "E5:2 D5:2 C5:12", "3 2 1", "A2:8 C3:4 E3:4", "5 3 2"),
        domanda,
        risposta("A4", "2"),
        ripresa,
        M(["C", "G"], "A4:2 G4:6 r:2 G4:2 A4:2 C5:2", "2 1 2 3 5", "E3:4 E3:4 D3:8", "3 3 4"),
        M(["C", "F"], "E4+C5:8 r:2 A4:2 A4:2 C5:2", "1/5 2 2 4", "C3:4 C3:4 F3:8", "5 5 2"),
        M(["C"], "G4+E5:2 D5:2 C5:12", "1/5 4 3", "C3:16", "5"),
      ],
    },
  ],
};
