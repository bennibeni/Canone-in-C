// Descrizione dell'armonia di ogni brano, mostrata dal pulsante «Armonia» accanto al titolo.
// I nomi degli accordi nel testo sono nella tonalità dello spartito (indicata in `key`); le righe `chords`
// sono simboli inglesi e nell'app vengono trasposti nella tonalità scelta e scritti nel sistema di nomi scelto.

export interface HarmonySection {
  title: string;
  text: string;
  /** sequenza di accordi da mostrare (simboli inglesi, es. ["Am7", "D7", "Gmaj7"]) */
  chords?: string[];
}

export interface Harmony {
  /** tonalità dello spartito, come la si legge nel testo */
  key: string;
  summary: string;
  /** i concetti armonici che il brano insegna */
  concepts: string[];
  sections: HarmonySection[];
}

export const HARMONY: Record<string, Harmony> = {
  canone: {
    key: "Do maggiore",
    summary:
      "Tutto il brano è costruito su otto accordi che si ripetono sempre uguali, mezza battuta ciascuno, sopra un basso che non cambia mai: è un basso ostinato. Le variazioni sono solo nella melodia.",
    concepts: ["basso ostinato", "basso che scende per gradi", "progressione per quarte", "cadenza IV–V–I"],
    sections: [
      {
        title: "Gli otto accordi",
        text: "Do – Sol – Lam – Mim – Fa – Do – Fa – Sol, cioè in gradi I – V – vi – iii – IV – I – IV – V. Dopo il Sol si ricomincia dal Do: la fine del giro è anche la sua «domanda» e il Do la «risposta».",
        chords: ["C", "G", "Am", "Em", "F", "C", "F", "G"],
      },
      {
        title: "Il basso",
        text: "Le note più gravi sono Do – Si – La – Sol – Fa – Mi – Fa – Sol: le prime sei scendono per gradi, le ultime due risalgono verso il Sol. Per questo il Sol e il Mim compaiono in primo rivolto (Sol/Si, Do/Mi) in molti arrangiamenti: il basso resta una scala che scende.",
      },
      {
        title: "Lo stesso passo tre volte",
        text: "Do → Sol, Lam → Mim, Fa → Do: ogni coppia scende di una quarta, e ogni coppia parte un grado più in basso della precedente. Una figura ripetuta su gradi diversi si chiama progressione (o sequenza). Poi Fa – Sol (IV – V) prepara il ritorno al Do: è la cadenza più comune della musica tonale.",
      },
      {
        title: "Una piccola variante",
        text: "Nell'ultima battuta della parte 2 c'è Rem – Sol invece di Fa – Sol: il Rem (ii) ha due note in comune con il Fa e porta al Sol con la stessa forza. È il «ii – V» che ritorna in quasi tutti i brani jazz dell'app.",
        chords: ["F", "C", "Dm", "G"],
      },
      {
        title: "Dove ritrovarlo",
        text: "Questo giro, o la sua prima metà, è alla base di moltissime canzoni pop. Confrontalo con il basso che scende dell'Aria sulla IV corda e di A Whiter Shade of Pale.",
      },
    ],
  },

  "autumn-leaves": {
    key: "La minore",
    summary:
      "È lo stesso brano di Foglie morte, una quarta sopra e semplificato con triadi (senza settime). Gli accordi scendono per quinte, poi chiudono con la cadenza della tonalità minore.",
    concepts: ["catena di quinte", "relativa maggiore e minore", "cadenza minore iv–V–i", "sensibile"],
    sections: [
      {
        title: "Il giro delle quinte",
        text: "Rem → Sol → Do → Fa: ogni accordo è una quinta sotto il precedente (Re, Sol, Do, Fa). In Do maggiore sono ii – V – I – IV: i primi tre sono la cadenza «ii – V – I», la più usata nel jazz.",
        chords: ["Dm", "G", "C", "F"],
      },
      {
        title: "La svolta in minore",
        text: "Dopo il Fa il giro prosegue con Rem – Mi – Lam: è la cadenza di La minore, la relativa minore di Do (stesse note, tonica diversa). Il Mi è maggiore, con il Sol♯: quel tasto nero è la sensibile, la nota che «tira» verso il La.",
        chords: ["Dm", "E", "Am"],
      },
      {
        title: "La seconda parte",
        text: "Comincia proprio sul Mi (la dominante) e lo risolve sul Lam; poi ripete Rem – Sol – Do (ii – V – I della relativa maggiore) e chiude due volte con Rem – Mi – Lam. Tutto il brano oscilla così tra Do maggiore e La minore.",
        chords: ["E", "Am", "Dm", "G", "C", "Dm", "E", "Am"],
      },
      {
        title: "Nella sinistra",
        text: "La sinistra suona fondamentale – quinta – ottava – quinta: senza terza non dice se l'accordo è maggiore o minore, lo dice la melodia. Confronta con la versione di Concina (Foglie morte), che usa accordi di settima.",
      },
    ],
  },

  passacaglia: {
    key: "La minore",
    summary:
      "Una passacaglia è una serie di variazioni sopra un giro di accordi che si ripete. Qui il giro è di otto battute e scende per quinte attraverso tutti i gradi di La minore.",
    concepts: ["basso ostinato", "catena di quinte", "variazione", "cadenza minore"],
    sections: [
      {
        title: "Il giro",
        text: "Lam – Rem – Sol – Do – Fa – Rem – Mi – Lam (i – iv – VII – III – VI – iv – V – i). Da La a Fa ogni accordo è una quinta sotto il precedente: La, Re, Sol, Do, Fa. Poi Rem – Mi – Lam chiude con la cadenza minore.",
        chords: ["Am", "Dm", "G", "C", "F", "Dm", "E", "Am"],
      },
      {
        title: "Lo stesso giro di Autumn Leaves",
        text: "Togli il primo Lam e trovi Rem – Sol – Do – Fa – Rem – Mi – Lam: è esattamente il giro di Autumn Leaves. La catena di quinte era già il pane quotidiano dei compositori barocchi, due secoli prima del jazz.",
      },
      {
        title: "Il Mi maggiore",
        text: "Nella penultima battuta il Mi è maggiore (Sol♯): in minore la dominante si «presta» la sensibile dalla scala minore armonica, per rendere la cadenza più forte.",
      },
      {
        title: "Le due parti",
        text: "Le due parti usano lo stesso giro: cambia solo il modo di suonarlo. È il principio della variazione: armonia fissa, figurazione sempre nuova.",
      },
    ],
  },

  "preludio-in-do": {
    key: "Do maggiore",
    summary:
      "Un accordo per battuta, sempre arpeggiato con la stessa figura: è come ascoltare l'armonia allo stato puro. Bach collega gli accordi muovendo le voci il meno possibile.",
    concepts: ["arpeggio", "condotta delle voci", "dominanti secondarie", "accordi diminuiti di passaggio", "pedale di dominante e di tonica"],
    sections: [
      {
        title: "La prima frase",
        text: "Do – Rem7 – Sol7 – Do: I – ii7 – V7 – I, la frase più semplice possibile. Da un accordo all'altro molte note restano uguali e le altre si spostano di un grado: prova a suonarli come accordi pieni e lo senti sotto le dita.",
        chords: ["C", "Dm7", "G7", "C"],
      },
      {
        title: "Verso la dominante",
        text: "Lam – Re7 – Sol: il Re7 con il Fa♯ è la «dominante della dominante» (V/V): per un momento il Sol sembra la tonica. Accordi di settima che preparano un grado diverso dal Do si chiamano dominanti secondarie.",
        chords: ["Am", "D7", "G", "Cmaj7"],
      },
      {
        title: "I diminuiti",
        text: "Nella seconda e terza parte compaiono accordi diminuiti (Do♯°7, Si°7, Fa♯°7, La♭°7): fatti di terze minori sovrapposte, suonano tesi e servono da ponte cromatico tra due accordi vicini.",
        chords: ["Am7", "D7", "G", "C#°7", "Dm"],
      },
      {
        title: "I pedali del finale",
        text: "Nell'ultima parte il basso si ferma: prima sul Sol (pedale di dominante), mentre sopra si alternano Do, Sol7, Fa♯°7; poi sul Do (pedale di tonica), con Do7 – Fa – Sol7 – Do che chiudono il brano.",
        chords: ["C", "Gsus4", "G7", "F#°7", "C", "C7", "F", "G7", "C"],
      },
    ],
  },

  "preludio-mi-minore": {
    key: "Mi minore",
    summary:
      "La melodia è quasi ferma; tutto il movimento è negli accordi della sinistra, che cambiano una nota alla volta, quasi sempre scendendo di un semitono. Il risultato sono armonie sfumate che solo alla fine trovano la dominante.",
    concepts: ["cromatismo", "condotta delle voci per semitoni", "dominante", "sesta eccedente"],
    sections: [
      {
        title: "Una nota alla volta",
        text: "Mim → Fa♯m7 → Fa7 → Mi7 → …: in ogni cambio una sola voce dell'accordo scende di un semitono. Molti accordi intermedi non hanno una funzione precisa: sono tappe di una discesa cromatica, e il nome conta meno del movimento.",
        chords: ["Em", "F#m7", "F7", "E7", "C", "F#ø7", "D7", "Dm7"],
      },
      {
        title: "L'arrivo sulla dominante",
        text: "Dopo la discesa, la sinistra si appoggia più volte sul Si7 (battute 10–12), la dominante di Mi minore, alternato al Lam. La prima metà si ferma lì, sospesa.",
        chords: ["Esus4", "B7", "Am", "B7"],
      },
      {
        title: "Il culmine",
        text: "La seconda metà ripete la discesa più in fretta e arriva allo stretto (battute 16–17), il punto più forte, con accordi diminuiti e la melodia che sale.",
      },
      {
        title: "La cadenza finale",
        text: "Do7 – Si – Mim: il Do7 (con il La♯ scritto come Si♭) funziona come accordo di sesta eccedente, che spinge sulla dominante Si; il Si risolve sulla tonica. Gli ultimi tre accordi sono lenti e profondi.",
        chords: ["C7", "B", "Em"],
      },
    ],
  },

  "cavalcata-delle-valchirie": {
    key: "La minore",
    summary:
      "Il tema è un arpeggio dell'accordo: la melodia stessa disegna l'armonia. Gli accordi si spostano spesso per terze (La → Do → Mi), un colore tipico del romanticismo.",
    concepts: ["arpeggio", "relazioni di terza", "minore e maggiore omonimi", "cadenza iv–V–i"],
    sections: [
      {
        title: "Il tema sull'accordo",
        text: "La – Mi – La – Do – La: sono le note di La minore. Lo stesso disegno si sposta su Do (Do – Sol – Do – Mi) e su Mi (Mi – Si – Mi – Sol): tre accordi le cui toniche distano una terza.",
        chords: ["Am", "C", "Em", "E"],
      },
      {
        title: "Il galoppo",
        text: "Nella parte 3 si va su Re minore, con il Si♭; poi Mi7 – Lam: la cadenza minore (iv – V – i). Alla fine della parte il Lam diventa La maggiore.",
        chords: ["Dm", "Bb/D", "E7", "Am"],
      },
      {
        title: "Il tema in maggiore",
        text: "La parte 5 ripete il tema in La maggiore: La – Do♯m – Mi, ancora accordi a distanza di terza ma con i diesis. Passare dal minore al maggiore con la stessa tonica (La minore → La maggiore) si chiama cambio di modo.",
        chords: ["A", "C#m", "E"],
      },
      {
        title: "La chiusa",
        text: "Re – Sim – Mi7 – La: in La maggiore è IV – ii – V – I. Il brano finisce così in maggiore, sul La acuto.",
        chords: ["D", "Bm/D", "E7", "A"],
      },
    ],
  },

  "primavera-vivaldi": {
    key: "Do maggiore",
    summary:
      "Armonia barocca semplicissima: tonica e dominante, con un breve passaggio verso il Sol. La seconda parte gioca su una nota tenuta (il Do) che resta ferma mentre l'armonia cambia.",
    concepts: ["tonica e dominante", "tonicizzazione", "nota pedale", "cadenza V7–I"],
    sections: [
      {
        title: "Il tema e l'eco",
        text: "Quattro battute ferme sul Do, poi Do – Re7 – Sol: il Re7 (con il Fa♯) è la dominante del Sol, e per un attimo il Sol diventa una piccola tonica (tonicizzazione). Poi lo stesso, piano, come un'eco.",
        chords: ["C", "C", "D7", "G"],
      },
      {
        title: "La nota pedale",
        text: "Nella seconda parte il pollice tiene il Do centrale mentre sopra la melodia scorre e sotto la sinistra alterna Mi – Re – Mi e Fa – Mi. Il Do resta comune a Do e Fa: l'armonia si muove tra I e IV senza mai lasciare la nota.",
        chords: ["C", "F", "C"],
      },
      {
        title: "Le cadenze",
        text: "Le frasi chiudono con Sol7 – Do (V7 – I), la cadenza perfetta. Contale: il brano ne ha una ogni poche battute, come un discorso fatto di frasi brevi.",
        chords: ["F", "C", "G7", "C"],
      },
    ],
  },

  "aria-sulla-quarta-corda": {
    key: "Do maggiore",
    summary:
      "Sotto la melodia lunga il basso cammina per gradi, quasi sempre scendendo. Gli accordi di settima e le dominanti secondarie fanno passare la musica verso il Sol, dove si chiude la prima sezione.",
    concepts: ["basso che scende per gradi", "dominanti secondarie", "cromatismo", "modulazione alla dominante"],
    sections: [
      {
        title: "Il basso che scende",
        text: "Do – Si – La – Sol – Fa – Fa♯ – Sol: i primi cinque gradi scendono, poi il Fa♯ (cromatico) spinge verso il Sol. Sopra, Do – Do/Si – Lam – Lam/Sol – Famaj7: gli accordi seguono il basso. A Whiter Shade of Pale riprende proprio questa idea.",
        chords: ["C", "C/B", "Am", "Am/G", "Fmaj7", "F#ø7", "G", "G7"],
      },
      {
        title: "Le dominanti secondarie",
        text: "Nella seconda frase compaiono Do7 (con il Si♭) e La7 (con il Do♯): sono dominanti «prese in prestito» che preparano altri gradi. Il La7 porta al Rem (V/ii), poi Sol7 riporta verso il Do.",
        chords: ["C7/E", "Gm/D", "A7/C#", "A7", "Dm", "Dm/C", "G/B", "G7"],
      },
      {
        title: "Verso il Sol",
        text: "Nella terza parte Re7 → Sol compare due volte: il Re7 è la dominante di Sol. La sezione finisce su Sol come nuova tonica: è la modulazione alla dominante, il modo classico di chiudere la prima metà di un brano barocco.",
        chords: ["Am", "D7", "G", "Am/C", "D7", "G"],
      },
    ],
  },

  alleluja: {
    key: "Do maggiore",
    summary:
      "Un coro costruito su tonica e dominante, con una parte centrale all'unisono. La forza viene dal ritmo e dalle ripetizioni più che da accordi complessi.",
    concepts: ["tonica e dominante", "modulazione alla dominante", "cadenza plagale"],
    sections: [
      {
        title: "«Hallelujah»",
        text: "Il motto si regge su Do (I) e Sol (V): l'alternanza tra tonica e dominante è l'ossatura di tutta la musica tonale.",
        chords: ["C", "C", "C", "G", "C"],
      },
      {
        title: "Verso il Sol",
        text: "Nella seconda parte il tema si sposta su Sol, con Re7 – Sol: il Re7 (Fa♯) è la dominante di Sol, che per un momento diventa la tonica.",
        chords: ["G", "C", "D7", "G"],
      },
      {
        title: "L'unisono e il finale",
        text: "«For the Lord God omnipotent reigneth» è una melodia quasi senza accompagnamento: l'armonia è sottintesa. Le battute finali si appoggiano su Fa – Do (IV – I): è la cadenza plagale, quella dell'«Amen», che Händel usa per chiudere il coro.",
        chords: ["C", "F", "C"],
      },
    ],
  },

  "allegro-mozart": {
    key: "Sol maggiore",
    summary:
      "Il classicismo nella sua forma più chiara: il tema è fatto di arpeggi dell'accordo di tonica e di dominante. In mezzo, una frase cantabile con una piccola sorpresa: la cadenza d'inganno.",
    concepts: ["arpeggio di tonica e dominante", "domanda e risposta", "cadenza d'inganno", "cadenza perfetta"],
    sections: [
      {
        title: "Il segnale",
        text: "Sol – Re – Sol – Re – Sol – Si – Re: è l'accordo di Sol (I). Poi Do – La – Fa♯ – La: è il Re7 (V7). Due battute di tonica e due di dominante, come una domanda e la sua risposta.",
        chords: ["G", "G", "D7", "D7"],
      },
      {
        title: "Il tema",
        text: "Le battute 5–8 alternano Sol e Re ogni battuta (I – V – I – V): la sinistra tiene il basso, la melodia passa tra le note dei due accordi.",
        chords: ["G", "D", "G", "D"],
      },
      {
        title: "La cadenza d'inganno",
        text: "Nella parte cantata (battute 11–17): Sol – Do – Re – Mim. Dopo il Re (dominante) l'orecchio si aspetta il Sol, invece arriva il Mim (vi): è la cadenza d'inganno. Subito dopo Do – Re – Sol (IV – V – I) dà la conclusione attesa.",
        chords: ["G", "C", "D", "Em", "C", "D", "G"],
      },
      {
        title: "Il finale",
        text: "Il segnale torna, poi una lunga insistenza su Sol con le note Sol – Fa♯ ripetute: la sensibile che gira intorno alla tonica, prima degli accordi conclusivi.",
      },
    ],
  },

  "romanza-beethoven": {
    key: "Fa maggiore",
    summary:
      "Una melodia lunga sopra un basso che resta spesso fermo: prima sul Fa (pedale di tonica), poi sul Do (dominante). Le note cromatiche della melodia danno il colore romantico.",
    concepts: ["pedale di tonica", "semicadenza", "dominante della dominante", "note cromatiche di passaggio"],
    sections: [
      {
        title: "Il pedale di Fa",
        text: "Fa – Si♭/Fa – Do7/Fa – Fa: il basso resta sul Fa mentre sopra passano IV e V7. È un pedale di tonica: l'armonia si muove ma la musica resta «a casa».",
        chords: ["F", "Bb/F", "C7/F", "C/E"],
      },
      {
        title: "La semicadenza",
        text: "La prima frase si ferma su Do (battuta 4), la seconda pure (battuta 8): fermarsi sulla dominante, come una virgola, si chiama semicadenza. Nelle battute 5–7 la melodia sale per semitoni (Fa♯, Sol♯, Si♮): note cromatiche di passaggio.",
        chords: ["F", "C7/E", "Bb/F", "F", "C"],
      },
      {
        title: "La seconda parte",
        text: "Il basso sale Do – Re – Mi – Fa sotto il Do7, poi Si♭ – Sol7 – Fa – Do7 – Fa: il Sol7 (con il Si♮) è la dominante della dominante, che rende più forte la cadenza finale.",
        chords: ["C7", "C7", "F", "Bb", "G7", "F", "C7", "F"],
      },
    ],
  },

  "foglie-morte": {
    key: "Mi minore (relativa di Sol maggiore)",
    summary:
      "Il giro di Foglie morte attraversa tutti i sette gradi della scala scendendo per quinte: è il modello di tante canzoni jazz. Prima in Sol maggiore, poi nella relativa Mi minore.",
    concepts: ["catena di quinte", "ii–V–I maggiore", "iiø–V–i minore", "accordi di settima", "relativa minore"],
    sections: [
      {
        title: "Il giro completo",
        text: "Lam7 – Re7 – Solmaj7 – Domaj7 – Fa♯ø7 – Si7 – Mim: le fondamentali sono La, Re, Sol, Do, Fa♯, Si, Mi, ognuna una quinta sotto la precedente. In sette accordi c'è tutta la scala di Sol maggiore.",
        chords: ["Am7", "D7", "Gmaj7", "Cmaj7", "F#ø7", "B7", "Em"],
      },
      {
        title: "Due cadenze in una",
        text: "Lam7 – Re7 – Solmaj7 è il ii – V – I di Sol maggiore. Fa♯ø7 – Si7 – Mim è il ii – V – i di Mi minore: in minore il ii è semidiminuito (ø) e il V ha la sensibile (Re♯). È il giro da imparare a memoria per suonare jazz.",
        chords: ["Am7", "D7", "Gmaj7", "F#ø7", "B7", "Em"],
      },
      {
        title: "La parte centrale",
        text: "Insiste su Fa♯ø7 – Si7 (la cadenza minore) e fa scendere il basso cromaticamente (Mi – Mi♭ – Re – Re♯), poi Re7 riporta verso Sol. L'ultima parte ripete la cadenza minore per chiudere in Mi minore.",
        chords: ["F#ø7", "B7", "Em7", "Eb", "D", "D#°", "D7", "G"],
      },
      {
        title: "Confronto",
        text: "Autumn Leaves (Reeves Wong) è lo stesso giro una quarta sopra e senza settime: Rem – Sol – Do – Fa – Rem – Mi – Lam. Nella versione di Concina le settime (maj7, 7, ø7) danno il suono jazz.",
      },
    ],
  },

  "what-a-wonderful-world": {
    key: "Fa maggiore",
    summary:
      "Una canzone semplice ma piena di piccoli colori: un basso che si muove per gradi, una dominante secondaria e un accordo preso in prestito dalla tonalità minore.",
    concepts: ["basso per gradi", "dominante secondaria", "prestito modale (♭VI)", "ii–V–I"],
    sections: [
      {
        title: "La strofa",
        text: "Fa – Lam – Si♭ – Lam – Solm7 – Fa: I – iii – IV – iii – ii7 – I. Il basso va Fa – Mi – Re – Do… e la melodia sale: le due linee si allontanano.",
        chords: ["F", "Am", "Bb", "Am", "Gm7", "F"],
      },
      {
        title: "La7 e Re♭",
        text: "La7 – Rem: il La7 (con il Do♯) è la dominante del Rem (V/vi). Poi arriva il Re♭: non appartiene a Fa maggiore, viene da Fa minore. Prendere un accordo dalla tonalità minore omonima si chiama prestito modale: è quel momento di malinconia nella frase. Il Re♭ scivola di un semitono sul Do (V).",
        chords: ["A7", "Dm", "Db", "C", "Gm7", "C7", "F"],
      },
      {
        title: "Il ponte",
        text: "Do7 – Do – Fa (V – I) due volte, poi Rem – Lam alternati (vi – iii) e Re7 – Solm – Do7: il Re7 è la dominante del Solm, che con il Do7 forma il ii – V che riporta alla strofa.",
        chords: ["C7", "F", "Dm", "Am", "D7", "Gm", "C7"],
      },
      {
        title: "La coda",
        text: "Mi♭7 – Re7: due accordi di settima a un semitono di distanza, un passaggio cromatico che porta al Rem. Poi Solm7 – Do7 – Fa: la cadenza ii – V – I chiude il brano.",
        chords: ["F", "Eb7", "D7", "Dm", "Gm7", "C7", "F"],
      },
    ],
  },

  misty: {
    key: "Do maggiore",
    summary:
      "Il brano più ricco dell'app dal punto di vista armonico: catene di ii–V, accordi presi in prestito, un giro di chiusura classico del jazz e un ponte che modula verso tonalità lontane.",
    concepts: ["ii–V verso il IV", "prestito modale (iv–♭VII)", "turnaround I–vi–ii–V", "dominanti secondarie", "accordi senza fondamentale"],
    sections: [
      {
        title: "Verso il Fa",
        text: "Domaj7 – Solm7 – Do7 – Famaj7: Solm7 – Do7 è il ii – V di Fa. Il Do diventa Do7 (con il Si♭) e trascina la musica sul IV grado.",
        chords: ["Cmaj7", "Gm7", "C7", "Fmaj7"],
      },
      {
        title: "Il ritorno «dalla porta di servizio»",
        text: "Fam7 – Si♭7 – Do: il Fa diventa minore e arriva un Si♭7. Sono accordi presi da Do minore (iv e ♭VII7): invece della dominante Sol7, al Do si torna con un colore più morbido. Nel jazz si chiama «backdoor» ii–V.",
        chords: ["Fmaj7", "Fm7", "Bb7", "C"],
      },
      {
        title: "Il giro di chiusura",
        text: "Do – Lam7 – Rem7 – Sol7: I – vi – ii – V, il turnaround più usato del jazz. Poi La7 (con il Do♯ al basso) riporta al Rem7 – Sol7: una catena di dominanti.",
        chords: ["C", "Am7", "Dm7", "G7", "Am/C", "A7/C#", "Dm7", "G7"],
      },
      {
        title: "Il ponte",
        text: "Nella parte B la musica lascia il Do: compaiono Fa7, Do♯m e Si7 con molti diesis, poi Sol7 – Do7 e Rem7 – Sol7 riportano al tema. Attenzione: gli accordi del ponte sono letti da una stampa poco nitida e alcuni sono da verificare.",
        chords: ["C7", "F7", "C#m", "B7", "G7", "C7", "Dm7", "G7"],
      },
      {
        title: "La sinistra jazz",
        text: "Spesso la sinistra non suona la fondamentale: per Solm7 suona Fa – Sol – Si♭, per Do7 Mi – Sol – Si♭. Le note importanti sono la terza e la settima, che definiscono l'accordo; la fondamentale la «sente» l'orecchio.",
      },
    ],
  },

  "a-whiter-shade-of-pale": {
    key: "Do maggiore",
    summary:
      "Il brano dei Procol Harum è un omaggio a Bach: sotto la melodia il basso scende per gradi come nell'Aria sulla IV corda, accordo dopo accordo.",
    concepts: ["basso che scende per gradi", "accordi rivoltati", "cadenza IV–V–I"],
    sections: [
      {
        title: "Il basso di Bach",
        text: "Do – Do/Si – Lam – Lam/Sol – Fa – Do/Mi – Rem: il basso suona Do – Si – La – Sol – Fa – Mi – Re, una scala che scende. Molti accordi sono rivoltati (Do/Si, Lam/Sol, Do/Mi): la nota al basso non è la fondamentale, così la linea resta continua.",
        chords: ["C", "C/B", "Am", "Am/G", "F", "C/E", "Dm"],
      },
      {
        title: "Confronta con l'Aria",
        text: "L'Aria sulla IV corda comincia con Do – Do/Si – Lam – Lam/Sol – Famaj7: le stesse quattro tappe. Suonale una dopo l'altra per sentire la parentela.",
      },
      {
        title: "La strofa",
        text: "Lo stesso basso, poi Fa – Mim – Rem (IV – iii – ii, ancora a scendere) e Sol (V). Le frasi chiudono con Do – Fa – Sol – Do.",
        chords: ["F", "Em", "Dm", "G", "C", "F", "G", "C"],
      },
    ],
  },

  "the-addams-family": {
    key: "Do maggiore",
    summary:
      "Il giro della sigla è una catena di dominanti: ogni accordo di settima prepara il successivo, scendendo per quinte fino al Do. I tasti neri (Do♯, Fa♯) sono le sensibili di questi accordi.",
    concepts: ["dominanti secondarie", "catena di quinte", "giro I–VI7–ii–V"],
    sections: [
      {
        title: "Il giro",
        text: "Do – La7 – Rem – Re7 – Sol7 – Do. La7 è la dominante di Rem, Re7 è la dominante di Sol, Sol7 è la dominante di Do: le fondamentali La – Re – Sol – Do scendono per quinte.",
        chords: ["C", "A7", "Dm", "D7", "G7", "C"],
      },
      {
        title: "Da dove vengono i diesis",
        text: "Il Do♯ della terzina La – Si – Do♯ è la terza del La7 e porta al Re; il Fa♯ della sinistra è la terza del Re7 e porta al Sol. Ogni nota cromatica del brano è la sensibile della nota che segue.",
        chords: ["A7", "Dm", "D7", "G"],
      },
      {
        title: "Le terzine",
        text: "Nella prima parte l'armonia avanza una battuta alla volta: Do – La7 – Rem – La7 – Rem – Sol – Do. Le pause lasciano l'accordo «in sospeso» e creano l'effetto comico.",
      },
    ],
  },

  "cera-una-volta-in-america": {
    key: "Fa maggiore",
    summary:
      "Un tema lento costruito su due accordi (Fa e Si♭) sopra un Fa tenuto, poi una frase che si allontana con dominanti secondarie prima di tornare a casa.",
    concepts: ["pedale di tonica", "dominanti secondarie", "cadenza d'inganno", "accordo sospeso"],
    sections: [
      {
        title: "Fa e Si♭",
        text: "Fa – Fa – Si♭/Fa – Si♭: I e IV, con il basso che resta sul Fa sotto il Si♭. Due battute di accordo tenuto e due di melodia che sale: l'armonia è ferma e la melodia può cantare.",
        chords: ["F", "F", "Bb/F", "Bb"],
      },
      {
        title: "La frase che si allontana",
        text: "Dom/Mi♭ – Re7 – Si♭: il Re7 è la dominante di Solm, ma invece del Solm arriva Si♭, che ha due note in comune con esso (una sorta di cadenza d'inganno). Poi Si♭ – Do (IV – V) e La7 – Rem: il La7 è la dominante di Rem (V/vi).",
        chords: ["Cm/Eb", "D7", "Bb", "C", "A7", "Dm"],
      },
      {
        title: "Il ritorno",
        text: "Solm – Solm/Do – Do – Fa: Solm sopra il Do al basso è un accordo «sospeso» che si scioglie nel Do e poi nel Fa. È un ii – V – I in cui il V arriva con calma.",
        chords: ["Gm", "Gm/C", "C", "F"],
      },
      {
        title: "Il finale",
        text: "Nella seconda parte tutto si ripete un'ottava sopra e l'ultima frase finisce su un'ottava di Fa, mentre la sinistra sale Fa – Sol – La – Do e si posa sul Fa.",
      },
    ],
  },

  "blues-esercizio-1": {
    key: "Do maggiore",
    summary:
      "È il giro di blues di 12 battute, la struttura di quasi tutto il blues e di tanto rock'n'roll e jazz. Usa solo tre accordi: quelli costruiti sul I, sul IV e sul V grado della scala.",
    concepts: ["giro di blues di 12 battute", "I – IV – V", "fondamentale e terza", "turnaround"],
    sections: [
      {
        title: "Le 12 battute",
        text: "Quattro battute di Do (I), due di Fa (IV), due di Do (I), poi Sol (V) – Fa (IV) – Do – Do. Si legge bene in tre frasi di quattro battute: la prima resta sulla tonica, la seconda va al IV e torna, la terza scende dal V al IV e chiude sul I.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Fondamentale e terza",
        text: "La sinistra suona solo due note per accordo: la fondamentale, che dà il nome all'accordo, e la terza, che dice se è maggiore o minore. Do–Mi, Fa–La e Sol–Si sono tre terze maggiori: tre accordi maggiori.",
      },
      {
        title: "La chiusura e il «Repeat»",
        text: "Le ultime due battute portano di nuovo all'inizio: il blues gira in tondo, e ogni giro si chiama «chorus». Nei blues più elaborati qui si mette un Sol (V) per rilanciare il giro successivo: è il turnaround.",
      },
    ],
  },

  "blues-esercizio-2": {
    key: "Do maggiore",
    summary:
      "Lo stesso giro di blues di 12 battute dell'Esercizio 1 (I – IV – V), con una melodia alla destra costruita quasi tutta sulle note della scala pentatonica di Do.",
    concepts: ["giro di blues di 12 battute", "scala pentatonica", "note dell'accordo", "domanda e risposta"],
    sections: [
      {
        title: "Gli accordi",
        text: "Quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do. La sinistra suona fondamentale e terza di ogni accordo, come nell'Esercizio 1.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Le note della melodia",
        text: "La destra usa Sol, La, Do e Re: sono quattro delle cinque note della pentatonica di Do (Do – Re – Mi – Sol – La), la scala più usata per improvvisare sul blues. Il Si e il Fa non compaiono mai.",
      },
      {
        title: "La melodia e l'accordo",
        text: "Le note lunghe stanno sull'accordo: il Sol è la quinta del Do, il La è la terza del Fa, il Re è la quinta del Sol. Sul Fa della battuta 10 il Re è una sesta: un colore tipico del blues, che risolve sul Do della battuta 11.",
      },
      {
        title: "Tre frasi uguali",
        text: "Le tre righe hanno la stessa forma: nota lunga legata, una piccola figura, nota d'arrivo. Ripetere un'idea su accordi diversi è il principio di domanda e risposta del blues; l'ultima frase scende al Do grave per chiudere.",
      },
    ],
  },

  "a-blue-note-blues": {
    key: "Do maggiore",
    summary:
      "Il giro di blues di 12 battute in Do (I – IV – V) con una melodia costruita sulle blue note: Mi bemolle, Fa diesis e Si bemolle, le note «stonate» rispetto alla scala maggiore che danno al blues il suo colore.",
    concepts: ["blue note", "scala blues", "cromatismo", "giro di blues di 12 battute"],
    sections: [
      {
        title: "Gli accordi",
        text: "Gli stessi degli esercizi: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do. La sinistra suona fondamentale e terza; nell'ultima battuta resta solo il Do grave.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Le blue note",
        text: "Il Mib è la terza abbassata: la sinistra suona Mi naturale e la destra Mib, e lo scontro tra maggiore e minore è il suono tipico del blues. Il Fa# (o Solb) è la quinta abbassata, la blue note più aspra. Il Sib, nella battuta 7, è la settima abbassata: trasforma il Do in un Do7.",
      },
      {
        title: "La scala blues",
        text: "Do – Mib – Fa – Fa# – Sol – Sib – Do è la scala blues di Do: la pentatonica minore (Do – Mib – Fa – Sol – Sib) con in più il Fa#. Quasi tutte le note della destra vengono da qui; la figura della battuta 9 la sale, quelle delle battute 2, 6 e 10 la scendono.",
      },
      {
        title: "La figura cromatica",
        text: "Fa# – Fa – Mib – Do scende per semitoni e poi salta sulla tonica. Torna su accordi diversi (Do, Fa, Fa) senza cambiare: nel blues la stessa frase va bene su tutti e tre gli accordi, ed è proprio l'attrito con l'accordo che cambia a renderla espressiva.",
      },
    ],
  },

  "three-note-bass-line": {
    key: "Do maggiore",
    summary:
      "Il giro di blues di 12 battute in Do (I – IV – V) con un basso che suona per intero ogni accordo: fondamentale, terza e quinta, cioè la triade arpeggiata dal basso.",
    concepts: ["giro di blues di 12 battute", "triade", "arpeggio", "I – IV – V"],
    sections: [
      {
        title: "Gli accordi",
        text: "Quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do: è lo stesso giro di tutti i brani di questa serie.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "La triade",
        text: "Un accordo maggiore è fatto di tre note: la fondamentale, la terza maggiore (quattro semitoni sopra) e la quinta (sette semitoni sopra). Do–Mi–Sol, Fa–La–Do e Sol–Si–Re sono le triadi del I, del IV e del V grado. Nell'Esercizio 1 mancava la quinta; qui l'accordo è completo.",
      },
      {
        title: "Un basso che cammina",
        text: "Suonare le note dell'accordo una dopo l'altra (arpeggio) invece che insieme fa muovere il basso e dà la spinta ritmica: è il primo passo verso i bassi del boogie-woogie e il walking bass, che aggiungono la sesta, la settima e note di passaggio.",
      },
    ],
  },

  "first-time-blues": {
    key: "Do maggiore",
    summary:
      "Il primo blues completo della serie: due giri di 12 battute in Do (I – IV – V), con il basso a tre note alla sinistra e alla destra una melodia sulla scala blues, che nel secondo giro sale al Do acuto.",
    concepts: ["giro di blues di 12 battute", "scala blues", "blue note", "chorus", "variazione"],
    sections: [
      {
        title: "Gli accordi",
        text: "Ogni giro è quello di tutta la serie: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do. Il brano ne suona due di fila: nel linguaggio del blues e del jazz ogni giro si chiama chorus.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Il basso",
        text: "La sinistra arpeggia la triade di ogni accordo: fondamentale, terza e quinta (Do–Mi–Sol, Fa–La–Do, Sol–Si–Re). Solo l'ultima battuta è un Do grave tenuto, che chiude il brano.",
      },
      {
        title: "Le blue note",
        text: "La destra usa la scala blues di Do: Do – Mib – Fa – Fa# – Sol – Sib. Il Mib contro il Mi della sinistra, il Fa# (quinta abbassata) e il Sib (settima abbassata, battute 7, 10 e 18) danno il colore blues; la figura Do – Mib – Fa – Fa# sale verso il Sol, quella Fa# – Fa – Mib – Do scende verso il Do.",
      },
      {
        title: "Il secondo giro",
        text: "Il secondo chorus comincia come il primo, poi alle battute 16–19 sposta la melodia sul Do acuto e la fa salire con Fa# – Sol – Sib – Do. Ripetere una frase cambiandone solo una parte è il modo più semplice di variare un blues senza perdere la forma.",
      },
    ],
  },

  "kitty-cat-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V). La destra suona a seste, che scivolano di un semitono sulle blue note; la sinistra cammina sulle note di ogni accordo.",
    concepts: ["seste", "scivolamento cromatico", "tritono", "blue note", "basso che cammina"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Le seste",
        text: "Sol+Mi e Mi+Do sono seste: due note dell'accordo di Do a distanza di sei gradi, con un suono pieno e morbido. Il Solb+Mib che segue è la stessa forma un semitono sotto: ci si appoggia per un attimo sulle blue note (Mib = terza abbassata, Solb = quinta abbassata) e si torna su. È lo «scivolamento» tipico del piano blues.",
      },
      {
        title: "Il tritono del Do7",
        text: "Nella battuta 4, Mi+Sib sono la terza e la settima del Do7: tra loro c'è un tritono (tre toni), l'intervallo più instabile, che chiede di andare all'accordo di Fa della battuta dopo. Allo stesso modo Fa+Re nella battuta 9 sono settima e quinta del Sol7.",
      },
      {
        title: "La terza che oscilla",
        text: "Nella battuta 10 la melodia fa Mib – Mi – Mib – Re: è la blue note che oscilla tra terza minore e terza maggiore del Do. Nella battuta 22 la stessa idea è suonata a seste, e nella 16 il Sol# porta per semitono al La dell'accordo di Fa.",
      },
      {
        title: "Il basso",
        text: "La sinistra suona fondamentale – terza – quinta – terza in semiminime: è la triade arpeggiata di «Three Note Bass-Line», con un movimento continuo che fa «camminare» il brano.",
      },
    ],
  },

  "walking-the-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V). La sinistra cammina sulle note degli accordi, la destra suona bicordi in terzine che partono da una blue note e scivolano di un semitono sulla nota dell'accordo: è il «crush» del piano blues.",
    concepts: ["terzine", "scivolamento (crush)", "blue note", "nota di volta cromatica", "basso che cammina"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Lo scivolamento",
        text: "Sul Do il Mib scivola sul Mi: dalla terza minore (blue note) alla terza maggiore dell'accordo. Sul Sol il Sib scivola sul Si, la terza del Sol. Sul Fa il Sol# scivola sul La, la terza del Fa, e nella battuta 19 il Fa# scivola sul Sol. È sempre lo stesso gesto: un semitono sotto la nota dell'accordo, poi la nota giusta.",
      },
      {
        title: "Il Mib sul Fa",
        text: "Nelle battute 5–6 il Mib+Sol resta fermo sul Fa: lì il Mib non è una blue note da risolvere, ma la settima dell'accordo (Fa7), e il Sol è la nona. Lo stesso bicordo cambia funzione quando cambia l'accordo sotto.",
      },
      {
        title: "Le terzine",
        text: "Ogni movimento è diviso in tre crome uguali: è la base del ritmo «swing» e «shuffle» del blues, dove le crome non sono mai dritte.",
      },
      {
        title: "Il finale",
        text: "Nella battuta 16 la nota alta scende Mi – Mib – Re – Do, nella 22 la nota bassa scende La – Lab – Sol: sono linee cromatiche che portano verso l'accordo di Do. Il brano chiude su Mi+Sol+Do, la triade completa.",
      },
    ],
  },

  "triple-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V) con una melodia quasi tutta in terzine, costruita sulla scala blues. La sinistra cammina sulle note degli accordi.",
    concepts: ["terzine", "scala blues", "blue note", "note di avvicinamento cromatiche", "terze parallele"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "La scala blues",
        text: "Fa – Mib – Do (battute 1, 3, 7) e Fa# – Sol – Sib (battute 13–20) sono pezzi della scala blues di Do: Do – Mib – Fa – Fa# – Sol – Sib. La stessa scala va bene sopra tutti e tre gli accordi; quello che cambia è l'attrito con l'accordo sotto.",
      },
      {
        title: "Avvicinarsi per semitono",
        text: "Sul Fa il Sol# sale al La, la terza del Fa (battute 5, 10, 22); sul Sol il Sib sale al Si, la terza del Sol (battute 9, 21). Una nota un semitono sotto la nota dell'accordo è il modo più semplice di «colorare» un arpeggio nel blues.",
      },
      {
        title: "Il Mib sul Fa",
        text: "Nelle battute 6 e 17–18 il Mib sopra l'accordo di Fa è la sua settima: Fa – La – Do – Mib è un Fa7. Nel blues tutti e tre gli accordi sono di solito di settima (Do7, Fa7, Sol7).",
      },
      {
        title: "Le terze che scendono",
        text: "Nella battuta 11 i bicordi Mi+Sol – Mib+Solb – Re+Fa scendono per semitoni e si posano su Do+Mi: un piccolo turnaround cromatico che chiude il primo giro. Il secondo giro chiude invece con la melodia che scende Mi – Re – Do.",
      },
    ],
  },

  "walking-the-blues-2": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V). La sinistra suona un vero «walking bass» a quattro note per battuta, la destra accordi di settima e di sesta e bicordi sulle blue note che scivolano nell'accordo successivo.",
    concepts: ["walking bass", "accordo di sesta", "accordi di settima", "scivolamento (crush)", "blue note"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Il walking bass",
        text: "La sinistra sale fondamentale – terza – quinta – sesta (Do – Mi – Sol – La) e nella battuta dopo riscende (Do – La – Sol – Mi). Aggiungere la sesta alla triade dà al basso quattro note diverse per battuta: è il basso «che cammina» del boogie-woogie e dello swing. Sul Fa e sul Sol la forma è la stessa: Fa – La – Do – Re, Sol – Si – Re – Mi.",
      },
      {
        title: "Accordi di settima e di sesta",
        text: "Sol7 (battuta 9) è suonato senza fondamentale, Fa – Si – Re: la fondamentale la fa il basso. Fa7 è Fa – La – Mib, e nella battuta 5 La – Mib – Sol aggiunge la nona (Sol). Il Do finale è un Do6: Mi – Sol – La – Do, il suono tipico della chiusura di un blues o di uno swing.",
      },
      {
        title: "Gli scivolamenti",
        text: "Mib+Solb scivola su Mi+Sol, Solb+Mib su Sol+Mi, Sib+Reb su Si+Re: ogni volta un bicordo un semitono sotto, sulle blue note, che si risolve sulle note dell'accordo nella battuta dopo. Nella battuta 20 lo scivolamento Sib+Reb → Si+Re porta dal Do al Sol7.",
      },
    ],
  },

  "walking-the-blues-3": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V). Il walking bass scende passando per la settima abbassata (Sib sul Do, Mib sul Fa), e la destra alterna accordi pieni (Do6, Fa7, Fa9) e accordi di Do che oscillano sulle blue note.",
    concepts: ["walking bass", "settima abbassata", "accordo di sesta", "accordi di settima e nona", "blue note"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Il basso con la settima",
        text: "Quando sale il basso suona fondamentale, terza, quinta e sesta (Do – Mi – Sol – La). Quando scende parte dalla settima abbassata: Sib – La – Sol – Mi sul Do, Mib – Re – Do – La sul Fa. Il Sib trasforma il Do in Do7 e il Mib il Fa in Fa7: nel blues tutti gli accordi sono «di settima».",
      },
      {
        title: "L'accordo che oscilla",
        text: "Nelle battute 2 e 4 la destra alterna Mib+Solb+Do e Mi+Sol+Do: terza e quinta abbassate (le blue note) e poi quelle dell'accordo, sopra un Do che resta fermo. È lo stesso scivolamento di «Walking The Blues», fatto con un accordo intero.",
      },
      {
        title: "Sesta, settima e nona",
        text: "Il Do6 (Mi – Sol – La – Do) è il Do con la sesta, il suono della chiusura. Sul Fa, Mib – Sol – La – Do è un Fa9 senza fondamentale (settima Mib, nona Sol); Fa – La – Mib è il Fa7 e Mib – La – Re aggiunge la tredicesima (Re).",
      },
      {
        title: "Il secondo giro",
        text: "Il secondo chorus usa l'ottava Sol+Sol come risposta all'accordo di Do, poi sul Fa una frase in terzine Do – Re – Mib, cioè la scala blues sopra il Fa7. Il finale riprende le seste che scivolano (Solb+Mib → Fa+Re → Mi+Do) e chiude sul Do.",
      },
    ],
  },

  "jump-the-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V) con solo tre accordi alla destra, suonati in controtempo sopra un basso in semiminime: è il ritmo del jump blues, il blues veloce e ballabile degli anni Quaranta.",
    concepts: ["controtempo", "swing", "accordo di sesta", "accordi di nona e di settima", "giro di blues di 12 battute"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Tre forme vicine",
        text: "Do6 = Mi – Sol – La – Do. Fa9 = Mib – Sol – La – Do: le stesse note con il Mi abbassato, che diventa la settima del Fa (il Sol è la nona, il La la terza, il Do la quinta). Sol7 = Fa – Sol – Si – Re. Passare da un accordo all'altro muovendo il meno possibile le dita si chiama condotta delle parti.",
      },
      {
        title: "Il controtempo",
        text: "Nel primo giro l'accordo cade sulla seconda croma di ogni movimento, esattamente a metà tra due battiti. Nel secondo giro il movimento è diviso in tre (terzina) e l'accordo cade sulla terza parte: arriva un po' più tardi ed è più vicino al battito dopo. È la differenza tra crome «dritte» e crome «swing».",
      },
      {
        title: "Il basso",
        text: "Nel primo giro la sinistra arpeggia fondamentale – terza – quinta – terza; nel secondo sale fino alla sesta (Do – Mi – Sol – La), come nei walking bass della serie.",
      },
    ],
  },

  "walking-the-dog-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V). Sopra un walking bass, la destra alterna un accordo che scivola dalle blue note all'accordo vero e una risposta in terzine: è il «domanda e risposta» del blues.",
    concepts: ["scivolamento (crush)", "blue note", "domanda e risposta", "walking bass", "accordi di settima e di sesta"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Lo scivolamento",
        text: "Su ogni accordo la destra parte un semitono sotto la terza e la quinta: Mib+Solb → Mi+Sol sul Do, Lab → La sul Fa, Sib+Reb → Si+Re sul Sol. Le prime sono blue note (terza e quinta abbassate), le seconde le note dell'accordo: il blues «stona» per un attimo e poi si appoggia.",
      },
      {
        title: "Domanda e risposta",
        text: "Nel primo giro le battute dispari sono la «domanda» (l'accordo che scivola) e quelle pari la «risposta» in terzine: Sol – Sol# – La, cioè quinta, quinta aumentata e sesta del Do, poi di nuovo Do e Sol. Il Sol# è una nota di passaggio cromatica verso il La.",
      },
      {
        title: "Il basso",
        text: "Il walking bass sale fondamentale – terza – quinta – sesta e scende partendo dalla settima abbassata: Sib – La – Sol – Mi sul Do, Mib – Re – Do – La sul Fa. Il Sib e il Mib rendono gli accordi di settima (Do7, Fa7).",
      },
      {
        title: "Il secondo giro",
        text: "La stessa idea un'ottava sopra, con terzine di bicordi Mi+Sol in movimento continuo. Sul Fa compaiono Fa7 (Fa – La – Mib) e Fa6 (Fa – La – Re); nella battuta 20 il Sib+Reb prepara il Sol7 (Fa – Si – Re); il brano chiude sul Do6.",
      },
    ],
  },

  "first-boogie-blues": {
    key: "Do maggiore",
    summary:
      "Il primo boogie della serie: due giri di blues di 12 battute in Do (I – IV – V) con la sinistra che martella quinte in semiminime e la destra che suona terze lunghe, con lo scivolamento sulle blue note.",
    concepts: ["boogie-woogie", "quinta vuota", "terze", "scivolamento (crush)", "blue note"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "La quinta vuota",
        text: "Do+Sol, Fa+Do e Sol+Re sono quinte: fondamentale e quinta dell'accordo, senza la terza. Non dicono se l'accordo è maggiore o minore, e proprio per questo lasciano libera la destra di suonare la terza maggiore o la blue note. È la base dei bassi del boogie-woogie e del rock'n'roll.",
      },
      {
        title: "Le terze e le blue note",
        text: "Mi+Sol sono terza e quinta del Do. Mib+Solb è la stessa terza un semitono sotto: terza e quinta abbassate, le blue note. Sul Fa, Mib+Sol è settima e nona del Fa7; sul Sol il Sib scivola sul Si (la terza del Sol), sul Fa il Sol# scivola sul La (la terza del Fa).",
      },
      {
        title: "Il secondo giro",
        text: "Nella battuta 13 le terze scendono per semitoni, Mi+Sol – Mib+Solb – Re+Fa, e arrivano su Do+Mi: una piccola linea cromatica. Il resto riprende gli scivolamenti del primo giro, con qualche variante sul Sol e sul Fa.",
      },
    ],
  },

  "up-n-down-blues": {
    key: "Do maggiore",
    summary:
      "Il giro di blues di 12 battute in Do (I – IV – V), suonato due volte, con il basso «su e giù» del boogie-woogie: sopra la fondamentale la nota alta alterna quinta e sesta.",
    concepts: ["boogie-woogie", "quinta e sesta", "terze", "scivolamento (crush)", "blue note"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Il basso su e giù",
        text: "Do+Sol è una quinta, Do+La una sesta: alternandole la nota alta oscilla di un tono sopra una fondamentale ferma. Sul Fa diventa Fa+Do / Fa+Re, sul Sol Sol+Re / Sol+Mi. È il basso più classico del boogie-woogie e del rock'n'roll (lo si sente in tantissimi brani di Chuck Berry).",
      },
      {
        title: "La destra",
        text: "È la stessa di «First Boogie Blues»: terze lunghe, con Mib+Solb (terza e quinta abbassate, le blue note) che scivola su Mi+Sol, Mib+Sol sul Fa (settima e nona), Sib → Si sul Sol e Sol# → La sul Fa.",
      },
    ],
  },

  "straight-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V) a crome dritte: la sinistra suona otto crome per battuta alternando quinta e sesta, la destra accordi pieni che scivolano sulle blue note.",
    concepts: ["crome dritte (straight)", "boogie-woogie", "blue note", "accordo di passaggio", "scivolamento (crush)"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Dritto o swing",
        text: "Negli altri brani le crome erano spesso «swing» (lunga-corta, come in una terzina). Qui sono dritte, tutte uguali: è il suono del rock'n'roll e del boogie più moderno. Il basso è quello di «Up 'n' Down Blues» (quinta e sesta), raddoppiato in crome.",
      },
      {
        title: "Le blue note negli accordi",
        text: "Sul Do, Mib+Solb+Do porta dentro l'accordo terza e quinta abbassate. Sul Fa la blue note è il Lab (terza abbassata del Fa), sul Sol il Sib e il Reb. Ogni volta l'accordo «stona» per un momento e torna sull'accordo vero.",
      },
      {
        title: "Accordi di passaggio",
        text: "Fa+Sib+Re (battute 5 e 18) è un accordo di Sib in secondo rivolto sopra il Fa: un modo antico (gospel, blues) di muovere la mano sopra un accordo fermo. Nella battuta 3 le terze salgono per semitoni, Re+Fa → Mib+Solb → Mi+Sol.",
      },
    ],
  },

  "shuffle-boogie-blues": {
    key: "Do maggiore",
    summary:
      "Gli stessi accordi di «Straight Blues» (due giri di blues di 12 battute in Do, I – IV – V) con il basso in ritmo shuffle: lunga-corta su ogni movimento, alternando quinta e sesta.",
    concepts: ["shuffle", "boogie-woogie", "quinta e sesta", "blue note", "accordo di passaggio"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Lo shuffle",
        text: "Nello spartito ogni movimento è scritto come croma puntata + semicroma: la prima nota dura tre volte la seconda. È il ritmo «zoppo» dello shuffle, parente stretto dello swing (dove il rapporto è due a uno, come in una terzina). Confronta con «Straight Blues»: stesse note, ritmo diverso, carattere completamente diverso.",
      },
      {
        title: "Il basso",
        text: "La nota alta alterna quinta e sesta a ogni movimento (Do+Sol / Do+La): la quinta sulla parte lunga, la sesta su quella corta. È il basso shuffle del boogie e del rock'n'roll.",
      },
      {
        title: "La destra",
        text: "Accordi pieni che scivolano sulle blue note: Mib+Solb+Do sul Do, Lab sul Fa, Sib+Reb sul Sol, più l'accordo di passaggio Fa+Sib+Re sopra il Fa.",
      },
    ],
  },

  "triple-blues-shuffle": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V). La destra suona terze in terzine, la sinistra lo shuffle: due modi diversi di dividere il movimento che si sovrappongono, il cuore ritmico del blues.",
    concepts: ["terzine", "shuffle", "terze parallele", "blue note", "scivolamento (crush)"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Terzine sopra lo shuffle",
        text: "La destra divide ogni movimento in tre parti uguali, la sinistra in lunga-corta (croma puntata + semicroma). Nella pratica i pianisti blues avvicinano lo shuffle alla terzina: la semicroma cade quasi sulla terza nota della terzina, e le mani «si incastrano».",
      },
      {
        title: "Le terze che scivolano",
        text: "Mi+Sol è terza e quinta del Do; Mib+Solb la stessa coppia abbassata (le blue note); Re+Fa e Do+Mi portano giù verso la tonica. Sul Sol la stessa scala si sale (Do+Mi – Re+Fa – Mib+Solb – Mi+Sol) e arriva sulla sesta e la nona del Sol; sul Fa Do+Mib è quinta e settima del Fa7, e Lab → La la terza blues del Fa.",
      },
      {
        title: "Il finale",
        text: "Nella battuta 19 Solb+Do (quinta abbassata e tonica) scivola su Sol+Do, con la piccola frase cromatica Sol – Sol# – La. Il brano chiude su Mi+Do, preceduto da Mib+Do: l'ultimo scivolamento dalla terza blues alla terza maggiore.",
      },
    ],
  },

  "triple-feel-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V) in «triple feel»: le crome scritte si suonano swing, come semiminima + croma di terzina. La destra alterna accordi e nota singola, muovendo l'accordo tra I e IV sopra un pedale.",
    concepts: ["swing (triple feel)", "pedale", "accordo di IV sopra il I", "accordi di settima", "boogie-woogie"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Triple feel",
        text: "L'indicazione in testa allo spartito (due crome = semiminima + croma in terzina) dice di non suonare le crome uguali ma lunga-corta, in rapporto due a uno. È lo swing: si scrive dritto per comodità e si suona «in tre».",
      },
      {
        title: "Il IV sopra il I",
        text: "Sopra il Do che resta fermo (un pedale) la destra alterna Do+Mi+Sol e Do+Fa+La: il secondo è l'accordo di Fa in secondo rivolto. Sul Fa lo stesso gesto dà Fa+La+Do / Fa+Sib+Re, sul Sol Sol+Si+Re / Sol+Do+Mi: ogni volta il IV dell'accordo, sopra la sua fondamentale. È il «rocking» tipico del boogie e del rock'n'roll.",
      },
      {
        title: "Le settime",
        text: "Nel secondo giro compaiono le settime: Do+Mi+Sib (Do7) nelle battute 14, 16 e 23, Sol+Re+Fa (Sol7) nella 21, Fa+Do+Mib (Fa7) nella 22. Il finale chiude con le terze che scendono per semitoni, Mib+Solb – Re+Fa – Do+Mi.",
      },
    ],
  },

  "seventh-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V), in swing, dove compaiono le settime: nel basso (Do+Sib, Fa+Mib) e negli accordi della destra (Do7, Fa7, Sol7). Sono le settime a dare al blues il suo suono tipico.",
    concepts: ["accordo di settima di dominante", "settima nel basso", "swing (triple feel)", "IV sopra il I", "avvicinamento cromatico"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte dopo una battuta di attacco: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Tre accordi di settima",
        text: "Do7 = Do – Mi – Sol – Sib, Fa7 = Fa – La – Do – Mib, Sol7 = Sol – Si – Re – Fa. Nella musica classica solo il V è un accordo di settima di dominante; nel blues lo sono tutti e tre. Alla destra compaiono in forma ridotta: Do+Sol+Sib, Fa+Do+Mib, Sol+Re+Fa.",
      },
      {
        title: "La settima nel basso",
        text: "Il basso alterna quinta e sesta (Do+Sol, Do+La) come nei brani precedenti; in metà delle battute la sesta sale alla settima abbassata (Do+Sib, Fa+Mib). È il basso boogie «5 – 6 – b7 – 6».",
      },
      {
        title: "Avvicinamenti cromatici",
        text: "L'attacco Do – Mib – Mi scivola dalla terza blues alla terza maggiore. Nella battuta 11 Sol#+Si → La+Do sale di un semitono verso l'accordo di Do; nella 22 il Do# porta al Re; nel finale Mib+Solb → Re+Fa scendono verso il Do.",
      },
    ],
  },

  "first-nola-blues": {
    key: "Do maggiore",
    summary:
      "Due giri di blues di 12 battute in Do (I – IV – V) in stile New Orleans («Nola»): la sinistra suona il ritmo 3+3+2 sulle note degli accordi, la destra accordi in sincope con le blue note.",
    concepts: ["ritmo 3+3+2 (tresillo)", "sincope", "blue note", "accordo di nona", "accordo di settima"],
    sections: [
      {
        title: "Gli accordi",
        text: "Lo stesso giro di tutta la serie, suonato due volte: quattro battute di Do, due di Fa, due di Do, poi Sol – Fa – Do – Do.",
        chords: ["C", "C", "C", "C", "F", "F", "C", "C", "G", "F", "C", "C"],
      },
      {
        title: "Il ritmo di New Orleans",
        text: "Semiminima puntata, semiminima puntata, semiminima: le otto crome della battuta divise in 3+3+2. È il «tresillo», arrivato a New Orleans dai Caraibi, ed è la base del piano di Professor Longhair e Fats Domino. La sinistra lo suona su fondamentale, terza e quinta.",
      },
      {
        title: "Gli accordi della destra",
        text: "Sul Do la destra suona Sol + Mi+Sol (quinta, terza e quinta all'ottava); il Mib è la blue note che scivola sul Mi. Sul Fa, La + Mib + Sol sono terza, settima e nona: un Fa9 senza fondamentale. Sul Sol, Sol + Re+Fa è il Sol7.",
      },
      {
        title: "La sincope",
        text: "Gli accordi cadono spesso fuori dal battito: croma, semiminima, semiminima puntata. Contro il 3+3+2 della sinistra questo crea l'incastro ritmico tipico del blues di New Orleans. Nel secondo giro la destra diventa melodia: La – Mib – Re – Do sul Fa, e frasi in crome con il Sol# che sale al La.",
      },
    ],
  },

  "georgia-on-my-mind": {
    key: "Fa maggiore",
    summary:
      "Una ballata in forma A A B A (32 battute). Le sezioni A girano attorno al Fa con accordi di passaggio cromatici (Mi diminuito, Sib minore) e catene di dominanti; il ponte va in Re minore, il relativo minore.",
    concepts: ["forma AABA", "accordo diminuito di passaggio", "IV minore (prestito)", "dominanti secondarie", "relativo minore"],
    sections: [
      {
        title: "La sezione A",
        text: "Fa – Mi° – Rem7 – Sol – Sibm, poi Fa – Mi7 – Solm – Do7. Il basso scende Fa – Mi – Re: il Mi diminuito è un accordo di passaggio tra Fa e Rem7. Il Sol (maggiore!) è la dominante della dominante, il Sib minore è il IV minore preso in prestito da Fa minore: un colore malinconico tipico di Carmichael.",
        chords: ["F", "E°", "Dm7", "G", "Bbm", "F", "E7", "Gm", "C7"],
      },
      {
        title: "Catene di dominanti",
        text: "Mi7 → Lam7 → Re7 → Solm7 → Do7 → Fa: ogni accordo di settima porta a quello una quinta sotto. Il Do7 con la quinta aumentata (Do – Mi – Sol# – Sib) nella battuta 8 tende ancora di più verso il Fa.",
        chords: ["E7", "Am7", "D7", "Gm7", "C7", "F"],
      },
      {
        title: "Il ponte",
        text: "Le battute 17–24 vanno in Re minore: Rem7 – Rem6 – Rem(+5) – Rem6, con la voce interna che si muove Do – Si – Sib – Si (la linea cromatica nel basso della sinistra). Poi Lam – Mi, la dominante di La, e la catena Rem7 – Solm – Lam – Mi7 – Lam7 – Re7 – Solm7 – Do7 che riporta al Fa.",
        chords: ["Dm7", "Dm6", "Dm7", "Gm", "Am", "E", "Am7", "D7", "Gm7", "C7"],
      },
    ],
  },

  "body-and-soul": {
    key: "Sol maggiore",
    summary:
      "Una delle ballate jazz più suonate (1930), in forma A A B A. In questo arrangiamento in Sol, la sezione A parte dal La minore (il ii) e torna al Sol attraverso linee cromatiche: il basso scende per semitoni e gli accordi di passaggio sono diminuiti o di settima un semitono sopra (sostituti di tritono).",
    concepts: ["linea cromatica (line cliché)", "accordo diminuito di passaggio", "sostituto di tritono", "ii – V – I"],
    sections: [
      {
        title: "Il La minore che scende",
        text: "Lam – Lam(maj7) – Lam7 – Lam6: l'accordo resta lo stesso, ma la nota La scende La – Sol# – Sol – Fa#. È il «line cliché», un movimento cromatico dentro un accordo fermo (lo stesso di «My Funny Valentine» o «Michelle»).",
        chords: ["Am", "Am(maj7)", "Am7", "Am6"],
      },
      {
        title: "Accordi diminuiti di passaggio",
        text: "Sol/Si – Sib° – Lam: il basso scende Si – Sib – La per semitoni. Re7 – Re#° – Mim7: qui sale, Re – Re# – Mi. L'accordo diminuito collega due accordi a distanza di un tono.",
        chords: ["G/B", "Bb°", "Am", "D7", "D#°", "Em7"],
      },
      {
        title: "Sostituti di tritono",
        text: "Mim7 – Mib7 – Re7 – Sol: il Mib7 sta un semitono sopra il Re7 e ne prende il posto per un attimo (hanno le stesse terza e settima, scambiate). Nell'introduzione la stessa idea in catena: Solmaj7 – Solb7 – Fa7 – Mi7, tutti un semitono sotto il precedente, fino al Mi7 che porta al La minore del tema.",
        chords: ["Em7", "Eb7", "D7", "G", "Gmaj7", "Gb7", "F7", "E7"],
      },
      {
        title: "Il ponte un semitono sopra",
        text: "Il ponte salta in La bemolle, un semitono sopra la tonalità: Lab – Sibm – Labmaj7 – Rebm – Lab/Mib – Mib7 – Lab (un ii – V – I in Lab). Poi Labm – Reb7 – Solb, e Labm – Reb7 ancora. Per tornare si scende di semitono in semitono: Solb7 – Fa7 – Mi7, fino al La minore della A finale. Il Rebm (iv minore di Lab) e il La° di passaggio sono gli stessi colori della sezione A.",
        chords: ["Ab", "Bbm", "Abmaj7", "Dbm", "Ab/Eb", "Eb7", "Ab", "Abm", "Db7", "Gb", "A°", "Gb7", "F7", "E7"],
      },
    ],
  },

  fever: {
    key: "La minore",
    summary:
      "Un blues in minore costruito quasi tutto su un solo accordo, il La minore, con la nota bassa che scende cromaticamente; poi Fa7 – Mi7 – La minore chiude ogni frase. Pochissimi accordi, tutto il carattere sta nel ritmo e nelle blue note.",
    concepts: ["line cliché (linea cromatica)", "cadenza VI7 – V7 – i", "blue note", "ritmo puntato"],
    sections: [
      {
        title: "Il La minore che scende",
        text: "Lam – Lam(maj7) – Lam7 – Lam6: sopra le note fisse Do e Mi, la nota bassa scende La – Sol# – Sol – Fa#. È lo stesso «line cliché» di Body And Soul (e del tema di James Bond): un solo accordo che si muove dall'interno.",
        chords: ["Am", "Am(maj7)", "Am7", "Am6"],
      },
      {
        title: "Fa7 – Mi7 – La minore",
        text: "Ogni frase finisce scendendo di un semitono: Fa7 → Mi7 → Lam. Il Fa7 (VI grado, con la settima Mib) sta un semitono sopra il Mi7 e funziona come il suo sostituto di tritono; il Mi7 è la dominante vera. È la cadenza tipica del blues minore e del flamenco.",
        chords: ["F7", "E7", "Am"],
      },
      {
        title: "Le blue note",
        text: "Il Mib nella melodia e nell'accordo di Fa7 è la quinta abbassata del La: la blue note più aspra. Il Sol# all'ottava di «Fever!» è invece la sensibile, che sale al La.",
      },
    ],
  },

  "lover-man": {
    key: "Fa maggiore",
    summary:
      "Una ballata in forma A A B A. La sezione A parte lontano dal Fa, con due ii – V (Rem7 – Sol7, Solm7 – Do7), poi passa per gli accordi di settima di stile blues (Fa7, Sib7) e arriva alla dominante attraverso il Reb7, un semitono sopra il Do7.",
    concepts: ["ii – V", "shell voicings", "IV7 blues", "sostituto di tritono", "line cliché"],
    sections: [
      {
        title: "La sezione A",
        text: "Rem7 – Sol7 è un ii – V che non va al Do ma si sposta su Solm7 – Do7, il ii – V di Fa. Poi Fa7 – Sib7: I7 e IV7, come in un blues. Infine Reb7 – Do7 – Fa: il Reb7 è il sostituto di tritono del Sol7 e scivola di un semitono sul Do7.",
        chords: ["Dm7", "G7", "Gm7", "C7", "F7", "Bb7", "Db7", "C7", "F"],
      },
      {
        title: "Shell voicings",
        text: "La sinistra suona solo le note essenziali dell'accordo: fondamentale e settima (Re + Do per il Rem7, Sol + Fa per il Solm7) o terza e settima (Fa + Si per il Sol7, Sib + Mi per il Do7). È il modo in cui i pianisti jazz accompagnano, lasciando la quinta da parte.",
      },
      {
        title: "Il ponte",
        text: "Lam – Lam(maj7) – Lam7 – Lam6 e poi Solm – Solm(maj7) – Solm7 – Solm6: due volte il «line cliché», la nota interna che scende per semitoni dentro un accordo minore fermo. In mezzo Solmaj7 – Sol7 – Sol6 – Sol+5: il Sol aumentato (Re#) prepara il Sol minore. Mim7 – La7 chiude il ponte e riporta al Rem7 della A.",
        chords: ["Am", "Am(maj7)", "Am7", "Am6", "Gmaj7", "G7", "G6", "G+5", "Gm", "Gm(maj7)", "Gm7", "Gm6", "F", "Eb7", "Em7", "A7"],
      },
    ],
  },

  summertime: {
    key: "La minore",
    summary:
      "Una ninna nanna in minore (da «Porgy and Bess», 1935). L'armonia oscilla tra La minore con la sesta (Lam6) e Mi7, la dominante; poi una frase più lunga passa per Rem – Mim7 – Fa – Fa#° e arriva al Mi, preparato dal suo Si7.",
    concepts: ["minore con la sesta (dorico)", "oscillazione i – V", "diminuito di passaggio", "dominante della dominante", "line cliché"],
    sections: [
      {
        title: "Lam6 – Mi7",
        text: "Il Lam6 (La – Do – Mi – Fa#) ha la sesta maggiore, il Fa#: è il colore della scala dorica, più chiaro del minore naturale. Nella destra il Fa# scende di un tono al Sol# del Mi7 e risale: una voce interna che dondola, come la culla della ninna nanna.",
        chords: ["Am6", "E7", "Am6", "E7"],
      },
      {
        title: "Il basso che sale",
        text: "Rem – Mim7 – Fa – Fa#° – Mi: il basso sale Re – Mi – Fa – Fa# e poi si appoggia sul Mi. Il Fa# diminuito è un accordo di passaggio cromatico; il Si7 è la dominante del Mi (V del V) e rende il Mi ancora più atteso.",
        chords: ["Dm", "Em7", "F", "F#°", "E", "B7", "E"],
      },
      {
        title: "La chiusura",
        text: "Lam – Re9 – Do – Lam – Re7 – Sol7: in mezzo al minore compare per un momento il Do maggiore (il relativo), con la sua dominante Sol7. Nel finale la sinistra fa scendere La – Sol – Fa# – Fa (Lam – Lam7 – Lam6 – Fa): lo stesso «line cliché» di Body And Soul e Fever. L'ultimo accordo è ancora il Lam6, che resta sospeso.",
        chords: ["Am", "D9", "C", "Am", "D7", "G7", "Am", "Am7", "Am6", "F"],
      },
    ],
  },
};
