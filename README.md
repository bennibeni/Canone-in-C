# Brani al pianoforte — app didattica

App Next.js (App Router, React 19, Tailwind 4) per imparare brani al pianoforte divisi in parti,
dagli arrangiamenti di @reeveswongpiano: **Canone** (Pachelbel, 4 parti) e **Autumn Leaves** (Kosma, 2 parti).
Senza video: Preludio in Do (Bach), Preludio in Mi minore (Chopin) e, dall'antologia «Pianoforte» di Franco Concina
(Nuova Carisch, con il permesso dell'editore; note e diteggiature dallo spartito): Cavalcata delle Valchirie, La primavera,
Aria sulla IV corda, Alleluja, Allegro (Mozart), Romanza (Beethoven), Foglie morte, What a Wonderful World, A Whiter Shade of Pale, The Addams Family, C'era una volta in America.
I brani possono essere in 4/4 (default) o 3/4 (`beats: 3` nel brano, es. la Cavalcata).
I brani si scelgono dal menu verticale a sinistra; ogni brano ha il suo indirizzo (`/canone`, `/autumn-leaves`).

## Avvio

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione (pronta per Vercel)
```

## Funzioni

- **4 parti + brano completo** (32 battute), con suggerimenti specifici per ogni parte.
- **Note che scendono** sopra una tastiera, colorate per mano (verde = destra, blu = sinistra), con nomi delle note e accordi.
- **Ascolto**: tempo 30–120%, metronomo, battuta d'attacco, ripetizione.
- **Attesa (suono io)**: scegli quale mano suoni (sinistra, destra, entrambe); la musica si ferma sulle note di quella mano
  e riparte quando premi **Spazio** (o clicchi il tasto evidenziato). L'app accompagna con l'altra mano.
- **Spartito**: doppio pentagramma con armatura della tonalità scelta, diteggiature opzionali e note che si illuminano mentre suonano.
- **Loop**: clic su una battuta per ripeterla, Maiusc+clic per allargare il loop.
- **Percorso di studio** (Ascolta → Mano sinistra → Mano destra → Mani insieme) con progressi salvati nel browser.
- **Spazio**: in attesa suona le note richieste, altrimenti play/pausa.
- Nomi delle note in **Do Re Mi** o **C D E**, oppure numeri delle dita.
- **Tonalità**: tutte le 12 tonalità maggiori, con l'ortografia corretta delle alterazioni.
- **Suono**: pianoforte sintetizzato oppure campioni `.wav` in `public/samples/piano` (A0–C8, nomi `c4.wav`, `Cs4.wav`…).
  Vengono scaricati solo i campioni delle note della parte/tonalità corrente.

## Struttura

```
app/                 layout, pagina, stili globali
components/
  SongApp.tsx        interfaccia principale (generica per qualunque brano)
  SongMenu.tsx       menu verticale dei brani
  FallingNotes.tsx   canvas con le note che scendono
  Keyboard.tsx       tastiera SVG
  MeasureGrid.tsx    griglia delle battute (loop)
  SheetMusic.tsx     spartito su doppio pentagramma (VexFlow), note evidenziate in tempo reale
hooks/
  usePlayer.ts       trasporto, scheduling audio, modalità attesa
lib/
  score.ts           modello dei brani, lettura delle battute, trasposizione
  songs/             i brani (canone.ts, autumn-leaves.ts) e l'elenco index.ts
  videoSync.ts       sincronizzazione video ↔ spartito
  audio.ts           suono: sintetizzatore Web Audio o campioni (SAMPLE_EXT = "wav" | "mp3")
  audio-engine/      motore a campioni copiato da Keyboard (src/app/audio-engine)
  notes.ts           nomi delle note, geometria della tastiera
```

## Formato della trascrizione (`lib/score.ts`)

Ogni battuta ha due accordi, la mano destra e la sinistra:

```ts
{ chords: ["C", "G"], rh: "G5:2 E5:1 F5:1 ...", lh: "C3 G3 C4 G3 G2 D3 G3 D3" }
```

`NOTA:durata` con durata in sedicesimi (1 semicroma, 2 croma, 4 semiminima, 6 semiminima puntata, 8 minima).
Note simultanee con `+` (es. `G2+C4`). Nella sinistra la durata predefinita è la croma.
Ogni battuta deve sommare 16: in console compare un avviso se non torna.

## Aggiungere un brano

1. Crea `lib/songs/<slug>.ts` con un oggetto `Song` (vedi `canone.ts` e `autumn-leaves.ts`): titolo, compositore,
   tonalità dei dati/video (`videoKey`), modo (`major`/`minor`), progressione, e le parti con le battute.
2. Battute: `{ chords: ["Dm"], rh: "r:4 G4:4 A4:4 B4:4", lh: "G2:2 D3:2 …", rf: "1 2 3", lf: "5 2 1 2 …" }`
   — `r:durata` è una pausa, `pickup: true` sulla parte se la prima battuta è un levare.
3. Video: metti i file in `public/videos` e aggiungi a ogni parte `videos: [{ label, src, beats }]`,
   dove `beats` è il secondo di ogni movimento (4 per battuta). Per i reel a note che scendono gli script in
   `scripts/video-transcribe` ricavano note, ritmo, diteggiatura e `beats`.
4. Aggiungi il brano a `SONGS` in `lib/songs/index.ts`: compare nel menu.
