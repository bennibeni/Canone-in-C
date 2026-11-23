// The Addams Family (Main Title), testo e musica di Hoyt S. Curtin, William Hanna e Joseph Barbera. Adattamento di Franco Concina
// (trascrizione di proprietà di Nuova Carisch s.r.l.), in Do maggiore, 22 battute. Pubblicato con il permesso dell'editore.
// Note e DITEGGIATURE dallo spartito; alle note senza dito stampato è dato quello della posizione della mano.
// TERZINE: l'app divide il tempo in sedicesimi, quindi ogni terzina di crome (un movimento) è approssimata
// con croma + due semicrome (2 + 1 + 1). Le note legate sono unite in una nota sola.
import type { Song } from "../score";

type Ms = { chords: string[]; rh: string; rf: string; lh: string; lf: string };
const M = (chords: string[], rh: string, rf: string, lh: string, lf: string): Ms => ({ chords, rh, rf, lh, lf });
const t = (a: string, b: string, c: string) => `${a}:2 ${b}:1 ${c}:1`;

// prima sezione: le terzine
const b1 = M([], `r:12 ${t("G4", "A4", "B4")}`, "1 2 3", `r:12 ${t("G2", "A2", "B2")}`, "4 3 2");
const b2 = M(["C", "A7"], `C5:4 r:8 ${t("A4", "B4", "C#5")}`, "4 1 2 3", `C3:4 r:8 ${t("A2", "B2", "C#3")}`, "1 4 3 2");
const b3 = M(["Dm", "A7"], `D5:4 r:8 ${t("A4", "B4", "C#5")}`, "4 1 2 3", `D3:4 r:8 ${t("A2", "B2", "C#3")}`, "1 4 3 2");
const b4 = M(["Dm", "G"], `D5:4 ${t("A4", "B4", "C#5")} D5:4 ${t("G4", "A4", "B4")}`, "4 1 2 3 4 1 2 3", `D3:4 ${t("A2", "B2", "C#3")} D3:4 ${t("G2", "A2", "B2")}`, "1 4 3 2 1 4 3 2");
const b5 = M(["C"], "C5:10 G4:1 G4:1 G4:2 G4:1 G4:1", "4 1 1 1 1 1", "C3:8 r:8", "1");
// seconda sezione: croma puntata e semicroma
const frase = (ultima: string, uf: string) =>
  M(["C", "A7", "Dm", "D7"], `C5:3 E5:1 C5:3 A4:1 F4:3 D5:1 r:3 ${ultima}:1`, `4 5 4 2 1 5 ${uf}`, "C3:7 C#3:1 D3:4 F3:3 F#3:1", "5 4 3 1 2");
const risposta = (lh: string, lf: string) =>
  M(["G7", "C"], "F4+B4:3 D5:1 B4:3 F4:1 E4:3 C5:1 r:3 G4:1", "1/3 5 4 2 1 5 1", lh, lf);
const chiusa = (coda: string, cf: string, lh: string, lf: string) =>
  M(["G", "C"], `B4:3 G4:1 A4:3 B4:1 C5:4 ${coda}`, `3 1 2 3 4 ${cf}`, lh, lf);

export const addamsFamily: Song = {
  slug: "the-addams-family",
  title: "The Addams Family",
  composer: "Hoyt S. Curtin, William Hanna e Joseph Barbera",
  credit: "Adattamento di Franco Concina, trascrizione di proprietà di Nuova Carisch s.r.l. Note e diteggiature dallo spartito, pubblicate con il permesso dell'editore",
  mode: "major",
  videoKey: "C",
  progression: ["C", "A7", "Dm", "A7", "Dm", "G", "C"],
  progressionLabel: "la sigla",
  fullTips: [
    "Allegretto, in Do maggiore. Due sezioni alternate: le terzine con le pause (che creano brusche interruzioni) e il ritmo saltellante di croma puntata e semicroma.",
    "Le terzine nell'app sono approssimate: nello spartito le tre note sono uguali, distribuite su un movimento.",
    "Rispetta i crescendo sotto ogni frase: danno il carattere altalenante del brano.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Le terzine",
      focus: "Battute 1–5: tre note che salgono, poi silenzio",
      tempo: 96,
      tips: [
        "Le due mani suonano la stessa terzina a due ottave di distanza: destra col pollice, sinistra col 4.",
        "Dopo la nota d'arrivo (Do, Re) ci sono due pause: rispettale, fanno parte del gioco.",
        "Il Do♯ (tasto nero) porta al Re: crescendo su ogni terzina.",
        "Battuta 5: Do tenuto, poi Sol ribattuti col pollice.",
      ],
      measures: [b1, b2, b3, b4, b5],
    },
    {
      id: 2,
      title: "Parte 2",
      subtitle: "Il ritmo saltellante",
      focus: "Battute 6–13: croma puntata e semicroma",
      tempo: 96,
      firstMeasure: 6,
      tips: [
        "Ogni coppia è lunga-corta (croma puntata e semicroma): Do – Mi, Do – La, Fa – Re con 4-5, 4-2, 1-5.",
        "Sinistra: Do tenuto, poi Do♯ – Re e Fa – Fa♯ che salgono cromatici.",
        "Battuta 7: bicordo Fa – Si (1 e 3), poi la frase scende fino al Mi.",
        "Battuta 9: Si – Sol – La – Si e il Do; la sinistra scende Sol – Fa♯ – Fa – Mi.",
      ],
      measures: [
        frase("A#4", "2"),
        risposta("G3:4 G2:3 B2:1 C3:7 B2:1", "1 5 3 2 3"),
        frase("C5", "4"),
        chiusa("r:3 G4:1", "1", "G3:4 F#3:3 F3:1 E3:4 r:4", "1 2 2 3"),
        frase("A#4", "2"),
        risposta("G3:4 G2:3 B2:1 C3:4 r:3 B2:1", "1 5 3 2 3"),
        frase("C5", "4"),
        chiusa(t("G4", "A4", "B4"), "1 2 3", `G3:4 F#3:3 F3:1 E3:4 ${t("G2", "A2", "B2")}`, "1 2 2 3 4 3 2"),
      ],
    },
    {
      id: 3,
      title: "Parte 3",
      subtitle: "La ripresa e la fine",
      focus: "Battute 14–22: di nuovo le terzine e il ritmo saltellante, poi il finale",
      tempo: 96,
      firstMeasure: 14,
      tips: [
        "Battute 14–17: come le battute 2–5.",
        "Battute 18–21: come la parte 2; nell'ultima frase rit.",
        "Battuta 21: Si – Sol – La – Si a semiminime, rallentando. Battuta 22: Do finale, forte.",
      ],
      measures: [
        b2, b3, b4, b5,
        frase("A#4", "2"),
        risposta("G3:4 G2:3 B2:1 C3:7 B2:1", "1 5 3 2 3"),
        frase("C5", "4"),
        M(["G", "G7"], "B4:4 G4:4 A4:4 B4:4", "3 1 2 3", "G3:8 F#3:4 F3:4", "1 2 2"),
        M(["C"], "C5:16", "4", "C3:16", "5"),
      ],
    },
  ],
};
