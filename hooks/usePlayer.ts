"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BuiltPart, Hand, ScoreNote } from "@/lib/score";
import { getCtx, playClick, playNote, resumeAudio } from "@/lib/audio";

export type Mode = "listen" | "wait";
export type HandSet = { R: boolean; L: boolean };

export interface PlayerOptions {
  built: BuiltPart;
  tempo: number;
  mode: Mode;
  /** mani suonate dall'utente in modalità attesa */
  practice: HandSet;
  loop: [number, number] | null; // battute (incluse), 0-based
  repeat: boolean;
  metronome: boolean;
  countIn: boolean;
  onFinish?: (r: FinishResult) => void;
}

export interface FinishResult {
  mode: Mode;
  practice: HandSet;
  tempo: number;
  full: boolean; // parte intera (senza loop)
}

export type KeyState = "ok" | "bad" | "down";

const LOOKAHEAD = 0.15; // secondi

export function usePlayer(opts: PlayerOptions) {
  const o = useRef(opts);
  o.current = opts;
  const { built } = opts;

  const posRef = useRef(0);
  const anchorCtx = useRef(0);
  const anchorPos = useRef(0);
  const scheduledUpTo = useRef(0);
  const raf = useRef<number | null>(null);
  const waiting = useRef(false);
  const nextTarget = useRef(Infinity);
  const pressed = useRef<Set<number>>(new Set());
  const activeKey = useRef("");
  const measureRef = useRef(-1);
  const targetsRef = useRef<number[]>([]);

  const [playing, setPlaying] = useState(false);
  const [targets, setTargets] = useState<number[]>([]);
  const [waitPos, setWaitPos] = useState<number | null>(null);
  const targetKey = useRef("");
  const [active, setActive] = useState<ScoreNote[]>([]);
  const [measure, setMeasure] = useState(0);
  const [userKeys, setUserKeys] = useState<Map<number, KeyState>>(new Map());

  const sps = () => (o.current.tempo / 60) * 4; // sedicesimi al secondo

  const bounds = useCallback((): [number, number] => {
    const { loop, built } = o.current;
    if (loop) return [loop[0] * 16, (loop[1] + 1) * 16];
    return [0, built.length];
  }, []);

  /** onset delle note che deve suonare l'utente (modalità attesa) */
  const userOnsets = useMemo(() => {
    const s = new Set<number>();
    for (const n of built.notes) if (opts.practice[n.hand]) s.add(n.start);
    return [...s].sort((a, b) => a - b);
  }, [built, opts.practice]);
  const userOnsetsRef = useRef(userOnsets);
  userOnsetsRef.current = userOnsets;

  const computeNextTarget = useCallback(
    (from: number, inclusive: boolean) => {
      if (o.current.mode !== "wait") return Infinity;
      const [, end] = bounds();
      for (const t of userOnsetsRef.current) {
        if ((inclusive ? t >= from : t > from) && t < end) return t;
      }
      return Infinity;
    },
    [bounds]
  );

  const requiredAt = useCallback((t: number) => {
    const req = new Set<number>();
    for (const n of o.current.built.notes) if (n.start === t && o.current.practice[n.hand]) req.add(n.midi);
    return req;
  }, []);

  const publishTargets = (arr: number[], at: number | null = null) => {
    const k = arr.join(",") + "@" + (arr.length ? at : "");
    if (k !== targetKey.current) {
      targetKey.current = k;
      targetsRef.current = arr;
      setTargets(arr);
      setWaitPos(arr.length ? at : null);
    }
  };

  const reanchor = (pos: number, at?: number) => {
    const c = getCtx();
    anchorPos.current = pos;
    anchorCtx.current = at ?? c.currentTime;
    scheduledUpTo.current = pos;
  };

  const updateVisual = (pos: number) => {
    const { built, mode, practice } = o.current;
    const act = built.notes.filter(
      (n) =>
        n.start <= pos + 1e-6 &&
        pos < n.start + n.dur - 0.05 &&
        (mode === "wait" ? !practice[n.hand] : true)
    );
    const key = act.map((n) => n.midi + n.hand + n.start).join("|");
    if (key !== activeKey.current) {
      activeKey.current = key;
      setActive(act);
    }
    const m = Math.max(0, Math.min(built.part.measures.length - 1, Math.floor(pos / 16)));
    if (m !== measureRef.current) {
      measureRef.current = m;
      setMeasure(m);
    }
  };

  const finish = useCallback(() => {
    const { mode, practice, tempo, loop, onFinish } = o.current;
    onFinish?.({ mode, practice, tempo, full: !loop });
  }, []);

  const stopLoop = () => {
    if (raf.current != null) cancelAnimationFrame(raf.current);
    raf.current = null;
  };

  const tick = useCallback(() => {
    const c = getCtx();
    const now = c.currentTime;
    const rate = sps();
    const { mode, built, practice, metronome, repeat, loop } = o.current;
    const [start, end] = bounds();

    let pos = waiting.current ? posRef.current : anchorPos.current + (now - anchorCtx.current) * rate;

    // modalità attesa: fermati sul prossimo gruppo di note dell'utente
    if (mode === "wait" && !waiting.current && pos >= nextTarget.current) {
      pos = nextTarget.current;
      waiting.current = true;
      // tieni solo le pressioni "in anticipo" valide
      const req = requiredAt(pos);
      for (const m of [...pressed.current]) if (!req.has(m)) pressed.current.delete(m);
      publishTargets([...req], pos);
      if ([...req].every((m) => pressed.current.has(m))) {
        satisfy(pos);
        pos = posRef.current;
      }
    }

    // fine parte / loop
    if (pos >= end) {
      if (repeat || loop) {
        if (mode === "wait") finish();
        reanchor(start, now);
        nextTarget.current = computeNextTarget(start, true);
        pos = start;
      } else {
        posRef.current = end;
        updateVisual(end);
        stopLoop();
        setPlaying(false);
        publishTargets([]);
        finish();
        return;
      }
    }
    posRef.current = pos;

    // scheduling audio
    if (!waiting.current) {
      let horizon = pos + LOOKAHEAD * rate;
      if (mode === "wait") horizon = Math.min(horizon, nextTarget.current);
      horizon = Math.min(horizon, end);
      const from = scheduledUpTo.current;
      if (horizon > from) {
        for (const n of built.notes) {
          if (n.start < from || n.start >= horizon) continue;
          const plays = mode === "wait" ? !practice[n.hand] : true;
          if (!plays) continue;
          const when = anchorCtx.current + (n.start - anchorPos.current) / rate;
          playNote(n.midi, when, (n.dur / rate) * 0.97, n.hand === "L" ? 0.62 : 0.85);
        }
        if (metronome || from < start) {
          for (let b = Math.ceil(from / 4) * 4; b < horizon; b += 4) {
            if (!metronome && b >= start) break;
            const when = anchorCtx.current + (b - anchorPos.current) / rate;
            playClick(when, ((b % 16) + 16) % 16 === 0);
          }
        }
        scheduledUpTo.current = horizon;
      }
    }

    updateVisual(Math.max(pos, 0));
    raf.current = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, computeNextTarget, finish, requiredAt]);

  const satisfy = (t: number) => {
    waiting.current = false;
    pressed.current.clear();
    publishTargets([]);
    reanchor(t);
    posRef.current = t;
    nextTarget.current = computeNextTarget(t, false);
  };

  const play = useCallback(async () => {
    await resumeAudio();
    const [start, end] = bounds();
    let p = posRef.current;
    if (p < start || p >= end - 0.01) p = start;
    const c = getCtx();
    const lead = 0.08;
    const countIn = o.current.countIn ? 16 : 0;
    // con il count-in l'ancora è una battuta prima
    anchorPos.current = p - countIn;
    anchorCtx.current = c.currentTime + lead;
    scheduledUpTo.current = p - countIn;
    posRef.current = p;
    waiting.current = false;
    pressed.current.clear();
    nextTarget.current = computeNextTarget(p, true);
    setPlaying(true);
    stopLoop();
    raf.current = requestAnimationFrame(tick);
  }, [bounds, computeNextTarget, tick]);

  const pause = useCallback(() => {
    stopLoop();
    waiting.current = false;
    publishTargets([]);
    setPlaying(false);
    posRef.current = Math.max(posRef.current, 0);
  }, []);

  const seek = useCallback(
    (p: number) => {
      const [start, end] = bounds();
      const q = Math.max(start, Math.min(end - 0.001, p));
      posRef.current = q;
      waiting.current = false;
      publishTargets([]);
      pressed.current.clear();
      if (raf.current != null) {
        reanchor(q);
        nextTarget.current = computeNextTarget(q, true);
      }
      updateVisual(q);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bounds, computeNextTarget]
  );

  // cambio tempo durante la riproduzione: ri-ancora
  const lastTempo = useRef(opts.tempo);
  useEffect(() => {
    if (lastTempo.current !== opts.tempo && raf.current != null && !waiting.current) {
      reanchor(posRef.current);
    }
    lastTempo.current = opts.tempo;
  }, [opts.tempo]);

  // cambio parte / modalità / mani / loop: ferma e riparti dall'inizio
  useEffect(() => {
    pause();
    const [start] = bounds();
    posRef.current = start;
    updateVisual(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [built, opts.mode, opts.practice.R, opts.practice.L, opts.loop?.[0], opts.loop?.[1]]);

  useEffect(() => () => stopLoop(), []);

  const flashKey = (midi: number, st: KeyState, ms?: number) => {
    setUserKeys((prev) => {
      const nx = new Map(prev);
      nx.set(midi, st);
      return nx;
    });
    if (ms)
      setTimeout(() => {
        setUserKeys((prev) => {
          if (prev.get(midi) !== st) return prev;
          const nx = new Map(prev);
          nx.delete(midi);
          return nx;
        });
      }, ms);
  };

  /** Nota suonata dall'utente (click, tastiera del computer o MIDI) */
  const userPress = useCallback(
    (midi: number, velocity = 0.8) => {
      const c = getCtx();
      if (c.state !== "running") void c.resume();
      playNote(midi, c.currentTime, 0.7, velocity);
      const { mode } = o.current;
      if (mode === "wait" && raf.current != null) {
        if (waiting.current) {
          const req = requiredAt(posRef.current);
          if (req.has(midi)) {
            pressed.current.add(midi);
            flashKey(midi, "ok", 250);
            if ([...req].every((m) => pressed.current.has(m))) satisfy(posRef.current);
          } else {
            flashKey(midi, "bad", 350);
          }
        } else {
          // pressione leggermente in anticipo (entro una croma)
          const t = nextTarget.current;
          if (t - posRef.current <= 2 && requiredAt(t).has(midi)) {
            pressed.current.add(midi);
            flashKey(midi, "ok", 250);
          } else flashKey(midi, "down");
        }
      } else flashKey(midi, "down");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requiredAt]
  );

  const userRelease = useCallback((midi: number) => {
    setUserKeys((prev) => {
      const st = prev.get(midi);
      if (!st || st === "bad") return prev;
      const nx = new Map(prev);
      nx.delete(midi);
      return nx;
    });
  }, []);

  /** Spazio: suona le note attese (anche se manca poco al loro arrivo) */
  const pressTargets = useCallback(() => {
    if (o.current.mode !== "wait" || raf.current == null) return;
    const c = getCtx();
    let t: number;
    if (waiting.current) t = posRef.current;
    else if (nextTarget.current - posRef.current <= 2) t = nextTarget.current;
    else return;
    const notes = o.current.built.notes.filter((n) => n.start === t && o.current.practice[n.hand]);
    for (const n of notes) {
      playNote(n.midi, c.currentTime, (n.dur / sps()) * 0.97, n.hand === "L" ? 0.62 : 0.85);
      pressed.current.add(n.midi);
      flashKey(n.midi, "ok", 250);
    }
    if (waiting.current) satisfy(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    posRef,
    targetsRef,
    playing,
    targets,
    waitPos,
    active,
    measure,
    userKeys,
    play,
    pause,
    seek,
    userPress,
    userRelease,
    pressTargets,
  };
}

export const handLabel = (h: Hand) => (h === "R" ? "Mano destra" : "Mano sinistra");
