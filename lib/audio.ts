// Motore audio: pianoforte sintetizzato con Web Audio oppure campioni .wav
// (public/samples/piano, letti con l'audio-engine copiato da Keyboard).
// Entrambi usano lo stesso AudioContext condiviso, così lo scheduling resta sincronizzato.

import { getOrCreateAudioContext } from "./audio-engine/context";
import { createSampleEngine } from "./audio-engine/sampleEngine";

export type SoundMode = "synth" | "piano";

/** Formato dei campioni: "wav" (qualità piena) oppure "mp3" (molto più leggeri) */
export const SAMPLE_EXT = "wav";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let soundMode: SoundMode = "synth";
// tipi dell'engine (il modulo è JavaScript)
interface SampleEngine {
  preload(midis: number[]): Promise<unknown[]>;
  playNote(midi: number, opts: { durationMs?: number; velocity?: number; startAt?: number }): Promise<number | null>;
  setMasterGain(g: number): void;
  stopAll(releaseMs?: number): void;
}
let piano: SampleEngine | null = null;

export function setSoundMode(m: SoundMode) {
  soundMode = m;
}

function getPiano() {
  if (!piano) {
    piano = createSampleEngine({ sampleBasePath: "/samples/piano", ext: SAMPLE_EXT, maxVoices: 48 }) as unknown as SampleEngine;
    piano.setMasterGain(0.9);
  }
  return piano;
}

/** Scarica e decodifica i campioni delle note indicate; onProgress(caricati, totali) */
export async function preloadPiano(midis: number[], onProgress?: (done: number, total: number) => void) {
  getCtx();
  const p = getPiano();
  const list = [...new Set(midis)];
  let done = 0;
  onProgress?.(0, list.length);
  await Promise.all(
    list.map(async (m) => {
      await p.preload([m]);
      done++;
      onProgress?.(done, list.length);
    })
  );
}

export function getCtx(): AudioContext {
  const shared = getOrCreateAudioContext() as AudioContext | null;
  if (!shared) throw new Error("Web Audio non disponibile");
  if (ctx !== shared) {
    ctx = shared;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(comp).connect(ctx.destination);
  }
  return ctx;
}

export async function resumeAudio() {
  const c = getCtx();
  if (c.state !== "running") await c.resume();
  return c;
}

export function setMasterVolume(v: number) {
  getCtx();
  if (master) master.gain.value = v;
}

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/** Suona una nota. `when` in secondi di AudioContext, `dur` in secondi. */
export function playNote(midi: number, when: number, dur: number, velocity = 0.8) {
  if (soundMode === "piano") {
    const c = getCtx();
    getPiano()
      .playNote(midi, { startAt: Math.max(when, c.currentTime), durationMs: dur * 1000 + 80, velocity: Math.min(1, velocity * 1.05) })
      .catch(() => playSynth(midi, when, dur, velocity)); // campione mancante: ripiega sul sintetizzatore
    return;
  }
  playSynth(midi, when, dur, velocity);
}

function playSynth(midi: number, when: number, dur: number, velocity: number) {
  const c = getCtx();
  if (!master) return;
  const t = Math.max(when, c.currentTime);
  const f = freq(midi);
  // le note gravi decadono più lentamente
  const decay = 0.6 + Math.max(0, (72 - midi) / 24) * 1.2;
  const amp = 0.22 * velocity * (midi > 84 ? 0.75 : 1);

  const out = c.createGain();
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(amp, t + 0.006);
  out.gain.setTargetAtTime(amp * 0.35, t + 0.006, decay * 0.35);
  const end = t + Math.max(dur, 0.08);
  out.gain.setTargetAtTime(0, end, 0.09);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(Math.min(12000, f * 9), t);
  filter.frequency.setTargetAtTime(Math.min(8000, f * 3.5), t + 0.01, 0.4);
  filter.Q.value = 0.3;
  filter.connect(out).connect(master);

  const partials: [number, number, OscillatorType][] = [
    [1, 1, "triangle"],
    [2, 0.35, "sine"],
    [3, 0.12, "sine"],
    [4, 0.05, "sine"],
  ];
  for (const [mult, g, type] of partials) {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = f * mult;
    o.detune.value = (mult - 1) * 1.5; // leggera inarmonicità
    const og = c.createGain();
    og.gain.value = g;
    o.connect(og).connect(filter);
    o.start(t);
    o.stop(end + 0.6);
  }
}

/** Click del metronomo */
export function playClick(when: number, accent: boolean) {
  const c = getCtx();
  if (!master) return;
  const t = Math.max(when, c.currentTime);
  const o = c.createOscillator();
  o.type = "square";
  o.frequency.value = accent ? 1760 : 1175;
  const g = c.createGain();
  g.gain.setValueAtTime(accent ? 0.12 : 0.07, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.06);
}
