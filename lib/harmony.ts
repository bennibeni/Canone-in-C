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
};
