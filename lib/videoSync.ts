// Sincronizzazione video ↔ spartito.
// Ogni video ha la sua tabella `beats`: il secondo in cui cade ciascun movimento
// (4 per battuta) dalla prima battuta della parte fino alla fine.
// Le tabelle si ricavano allineando la trascrizione all'audio/video (vedi i file in lib/songs).

/** Secondo del video → posizione nella parte (sedicesimi). Prima dell'inizio: -1. */
export function videoTimeToPos(beats: number[], t: number): number {
  if (!beats.length || t < beats[0]) return -1;
  if (t >= beats[beats.length - 1]) return (beats.length - 1) * 4;
  let i = 0;
  while (i < beats.length - 2 && beats[i + 1] <= t) i++;
  return (i + (t - beats[i]) / (beats[i + 1] - beats[i])) * 4;
}

/** Posizione nella parte (sedicesimi) → secondo del video */
export function posToVideoTime(beats: number[], pos: number): number {
  if (beats.length < 2) return 0;
  const x = Math.max(0, Math.min(beats.length - 1, pos / 4));
  const i = Math.min(beats.length - 2, Math.floor(x));
  return beats[i] + (x - i) * (beats[i + 1] - beats[i]);
}
