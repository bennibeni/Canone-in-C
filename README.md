# Canone in Do — app didattica

App Next.js (App Router, React 19, Tailwind 4) per imparare il Canone di Pachelbel al pianoforte,
diviso nelle 4 parti dell'arrangiamento di @reeveswongpiano.

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
  CanonApp.tsx       interfaccia principale e stato
  FallingNotes.tsx   canvas con le note che scendono
  Keyboard.tsx       tastiera SVG
  MeasureGrid.tsx    griglia delle battute (loop)
  SheetMusic.tsx     spartito su doppio pentagramma (VexFlow), note evidenziate in tempo reale
hooks/
  usePlayer.ts       trasporto, scheduling audio, modalità attesa
lib/
  score.ts           TRASCRIZIONE delle 4 parti (modificabile)
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
