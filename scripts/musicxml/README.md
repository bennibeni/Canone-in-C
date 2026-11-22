# Da MusicXML a brano dell'app

Per i brani senza video: le note vengono da una partitura MusicXML (pianoforte, due pentagrammi, 4/4)
e le diteggiature sono **proposte** da un calcolo automatico, da verificare suonando.

- `mxl_to_measures.py` — legge il MusicXML e produce le battute nel formato dell'app
  (`rh`/`lh` in sedicesimi, `rf`/`lf` con le dita; negli accordi le dita sono separate da `/`).
  Ogni mano è scritta come una sola voce: una nota dura fino all'attacco successivo della stessa mano.
  Le dita già presenti nel file hanno la precedenza su quelle calcolate.
- `fingering.py` — diteggiatura con programmazione dinamica (Viterbi del secondo ordine) e un modello di
  costo ispirato a Parncutt et al. (1997): estensioni comode/praticabili per coppia di dita, dita deboli,
  pollice sui tasti neri, stesso dito su note diverse, spostamenti della mano.
- `chords.py` — nome dell'accordo da un gruppo di note (per le etichette delle battute; approssimato).
- Opzioni di `build()`: `move` (note dalla destra alla sinistra), `max_left_span` (accordi troppo larghi
  per la sinistra: le note alte passano alla destra), `edit` (correzioni a mano prima delle dita).
  Il levare (prima battuta incompleta) diventa la battuta "Levare"; terzine e biscrome sono arrotondate ai
  sedicesimi (a parità di sedicesimo resta la nota più vicina alla griglia).
- `chopin_e.py` — esempio: Preludio in Mi minore op. 28 n. 4 (partitura CC0), con gli accordi calcolati.
- `prelude_c.py` — esempio: Preludio in Do BWV 846, con la seconda nota di ogni mezza battuta spostata
  alla sinistra (come nell'originale) e la stessa diteggiatura per tutta la battuta.

```
python prelude_c.py "…/the-well-tempered-clavier-book-1-prelude-1-in-c-major-….musicxml" preludio.json
python chopin_e.py "…/prelude-no-4-in-e-minor-op-28-frederic-chopin.musicxml" chopin.json
```

Il JSON contiene, per ogni battuta, `R` e `L` come coppie [note, dita]: si copiano nel file del brano in
`lib/songs/` aggiungendo gli accordi (`chords`) e dividendo il brano in parti.

Se il brano non è in Do maggiore / La minore, nel file del brano indica `baseKey` (la maggiore relativa in cui
sono scritte le note, es. "G" per Mi minore): il menu della tonalità parte da lì e traspone di conseguenza.
