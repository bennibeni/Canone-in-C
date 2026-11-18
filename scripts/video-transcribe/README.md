# Trascrizione da video (formato "note che scendono" di @reeveswongpiano)

Pipeline usata per Autumn Leaves. Ricava note, ritmo e **diteggiatura** da un reel con
tastiera fissa e mani visibili. Python 3.13.

Dipendenze: `pip install numpy pillow pretty_midi basic-pitch onnxruntime mediapipe` + `ffmpeg`.
Modello delle mani MediaPipe: `hand_landmarker.task` (scaricalo da storage.googleapis.com/mediapipe-models)
e indica il percorso in `4_fingers.py`.

1. **Audio → note** (altezze di controllo): `basic-pitch` sul `.wav` estratto con ffmpeg → `video.mid`.
2. `1_highlights.py video.mp4 845 915 hl.json` — per ogni fotogramma i tasti accesi (blu = sinistra,
   verde acqua = destra) nella fascia y 845–915 (adatta le coordinate alla tastiera del video).
3. `2_keys_to_notes.py video.mp4 hl.json video.mid` — bordi reali dei tasti bianchi (la prospettiva li
   allarga a destra), tasto → nota, ottava allineata con l'audio. Serve prima il file `video.mp4.seps.npy`
   con i bordi (vedi la funzione nel codice della sessione: profilo di luminosità dei tasti bianchi).
4. `3_quantize.py video.mp4 video.mid` — usa le crome della sinistra come metronomo (regge il rubato),
   recupera dall'audio i tasti neri non visti.
5. `4_fingers.py video.mp4` — MediaPipe Hands sui fotogrammi subito dopo ogni attacco: il dito è il
   polpastrello più vicino al centro del tasto acceso (voto su 4 fotogrammi).
6. `5_make_measures.py` — scrive le battute nel formato di `lib/songs/*.ts` (rh/lh/rf/lf, pause, levare).

Controlla sempre a mano il risultato: tasti neri della destra, armoniche dell'audio, levare.
La tabella `beats` per sincronizzare il video si ottiene dagli attacchi della sinistra (vedi `lib/songs/autumn-leaves.ts`).
