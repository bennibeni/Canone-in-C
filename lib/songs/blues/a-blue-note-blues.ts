// Blues — «A Blue Note Blues». Note dallo spartito (screenshot): sinistra in minime (fondamentale e terza,
// come negli esercizi), destra con la figura cromatica Fa# – Fa – Mib – Do e le blue note Mib, Fa# e Sib,
// sul giro di blues di 12 battute in Do.
// Le legature tra una battuta e l'altra (1→2, 5→6, 7→8, 11→12) non sono unite: la nota legata è scritta di nuovo.
// Le DITEGGIATURE sono proposte (lo spartito non le indica): destra in posizione Do=1 Mib=2 Fa=3 Fa#=4 Sol=5.
import type { Song } from "../../score";

const lh = { C: { lh: "C2:8 E2:8", lf: "5 3" }, F: { lh: "F2:8 A2:8", lf: "5 3" }, G: { lh: "G2:8 B2:8", lf: "5 3" } };
const m = (chord: "C" | "F" | "G", rh: string, rf?: string) => ({ chords: [chord], rh, ...(rf ? { rf } : {}), ...lh[chord] });

export const b_a_blue_note_blues: Song = {
  slug: "a-blue-note-blues",
  title: "A Blue Note Blues",
  composer: "Blues",
  credit: "Brano di blues: note dallo spartito; diteggiature proposte, da verificare",
  collection: "blues",
  mode: "major",
  videoKey: "C",
  progression: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
  progressionLabel: "il giro di blues di 12 battute",
  fullTips: [
    "Tonalità: Do maggiore, ma con le blue note: Mi bemolle, Fa diesis e Si bemolle. Le alterazioni non sono in chiave: guardale nota per nota.",
    "La sinistra è quella degli esercizi 1 e 2; cambia solo l'ultima battuta, un Do grave tenuto per tutta la battuta.",
    "Il cuore del brano è la figura di quattro crome Fa# – Fa – Mib – Do: torna tre volte (battute 2, 6 e 10), sempre con le stesse dita 4-3-2-1.",
  ],
  parts: [
    {
      id: 1,
      title: "Parte 1",
      subtitle: "Le blue note",
      focus: "Battute 1–12: Do – Fa – Do – Sol – Fa – Do",
      tempo: 72,
      tips: [
        "Destra in posizione: pollice sul Do, 2 sul Mib, 3 sul Fa, 4 sul Fa#, 5 sul Sol. Con queste dita la figura cromatica scende da sola.",
        "Sul La delle battute 5–6 usa il 5 allargando un po' la mano, poi scendi con 4-3-2-1 come nelle altre frasi.",
        "Battuta 7: sposta la mano un tasto più in basso, pollice sul Sib e 2 sul Do; il Do è legato alla battuta 8.",
        "Battuta 9: la figura sale (Do – Mib – Fa – Fa#) e arriva sul Sol con il 5: è lo specchio di quella che scende.",
        "Le note legate (battute 1→2, 5→6, 7→8, 11→12) si tengono premute senza ripremerle.",
        "Le crome si possono suonare «swing», lunga-corta come in una terzina: prima dritte, poi prova a dondolarle.",
      ],
      measures: [
        m("C", "G4:16", "5"),
        m("C", "G4:8 F#4:2 F4:2 Eb4:2 C4:2", "5 4 3 2 1"),
        m("C", "C4:16", "1"),
        m("C", "r:16"),
        m("F", "A4:16", "5"),
        m("F", "A4:8 F#4:2 F4:2 Eb4:2 C4:2", "5 4 3 2 1"),
        m("C", "Bb3:8 C4:8", "1 2"),
        m("C", "C4:8 r:8", "2"),
        m("G", "C4:2 Eb4:2 F4:2 F#4:2 G4:8", "1 2 3 4 5"),
        m("F", "r:8 F#4:2 F4:2 Eb4:2 C4:2", "4 3 2 1"),
        m("C", "C4:16", "1"),
        { chords: ["C"], rh: "C4:8 r:8", rf: "1", lh: "C2:16", lf: "5" },
      ],
    },
  ],
};
