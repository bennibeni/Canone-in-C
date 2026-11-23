# Brani facili (Christian Salerno) dal PDF

Il PDF di «Emozioni al Pianoforte» è esportato da MuseScore: contiene i simboli musicali (font Leland) e le
diteggiature (font Edwin) come testo, con la loro posizione. Questi script li leggono direttamente, senza
riconoscimento ottico.

- `reader.py` — righi, chiavi, armatura, teste, alterazioni (valide fino alla stanghetta), gambi e travature
  (durate), punti, pause, terzine, legature, diteggiature.
- `convert.py` — attacchi delle note, battute nel formato dell'app; le dita stampate sono vincoli, quelle mancanti
  le calcola `../musicxml/fingering.py`.
- `gen.py` — scrive `lib/songs/salerno/*.ts` (pagine del PDF in `songs.py`; correzioni a mano in `FIX`).

```
pip install pymupdf
cd scripts/salerno
python gen.py        # scrive lib/songs/salerno/*.ts
```
Il PDF è cercato in `Desktop/Christian Salerno`; per un altro percorso imposta la variabile `SALERNO_PDF`.
`fingering.py` e `chords.py` vengono da `scripts/musicxml` (aggiunto al percorso da `convert.py`; per l'editor
c'è `pyrightconfig.json` nella radice del progetto).
