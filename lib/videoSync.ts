// Sincronizzazione video ↔ spartito.
// Per ogni video (parte 1–4): secondo in cui cade ciascun movimento (ogni 4 sedicesimi),
// dalla battuta 1 alla fine (33 valori = 8 battute × 4 movimenti + la fine).
// Ricavati allineando la trascrizione all'audio dei video (onset delle note, scarto medio ~35 ms).
export const VIDEO_BEATS: Record<number, number[]> = {
  1: [1.267, 2.060, 2.750, 3.538, 4.373, 5.195, 6.014, 6.827, 7.626, 8.431, 9.230, 10.029, 10.817, 11.603, 12.384, 13.165, 13.958, 14.751, 15.542, 16.336, 17.123, 17.904, 18.695, 19.481, 20.269, 21.064, 21.861, 22.660, 23.460, 24.255, 25.050, 25.839, 26.623],
  2: [0.027, 0.824, 1.616, 2.405, 3.182, 3.957, 4.724, 5.489, 6.249, 7.011, 7.770, 8.527, 9.275, 10.026, 10.766, 11.515, 12.270, 13.032, 13.799, 14.571, 15.337, 16.105, 16.867, 17.623, 18.376, 19.124, 19.879, 20.632, 21.382, 22.133, 22.881, 23.629, 24.380],
  3: [0.118, 0.854, 1.625, 2.391, 3.154, 3.919, 4.681, 5.441, 6.190, 6.933, 7.665, 8.398, 9.131, 9.866, 10.608, 11.346, 12.083, 12.827, 13.563, 14.302, 15.039, 15.775, 16.515, 17.255, 17.986, 18.718, 19.448, 20.175, 20.907, 21.642, 22.375, 23.109, 23.836],
  4: [1.033, 1.754, 2.466, 3.178, 3.884, 4.586, 5.287, 5.993, 6.699, 7.409, 8.123, 8.831, 9.523, 10.222, 10.914, 11.614, 12.325, 13.029, 13.728, 14.423, 15.108, 15.791, 16.471, 17.156, 17.842, 18.537, 19.236, 19.933, 20.621, 21.311, 22.003, 22.703, 23.431],
};

/** Secondo del video → posizione nella parte (sedicesimi). Fuori dal brano: -1 prima, 128 dopo. */
export function videoTimeToPos(part: number, t: number): number {
  const b = VIDEO_BEATS[part];
  if (!b) return -1;
  if (t < b[0]) return -1;
  if (t >= b[b.length - 1]) return (b.length - 1) * 4;
  let i = 0;
  while (i < b.length - 2 && b[i + 1] <= t) i++;
  return (i + (t - b[i]) / (b[i + 1] - b[i])) * 4;
}

/** Posizione nella parte (sedicesimi) → secondo del video */
export function posToVideoTime(part: number, pos: number): number {
  const b = VIDEO_BEATS[part];
  if (!b) return 0;
  const x = Math.max(0, Math.min(b.length - 1, pos / 4));
  const i = Math.min(b.length - 2, Math.floor(x));
  return b[i] + (x - i) * (b[i + 1] - b[i]);
}
