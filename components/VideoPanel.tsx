"use client";

import { useEffect, useRef, useState } from "react";
import { posToVideoTime, videoTimeToPos } from "@/lib/videoSync";

// video in public/videos (i nomi contengono spazi e il trattino lungo: vanno codificati nell'URL)
const VIDEOS = [1, 2, 3, 4].map((n) => `/videos/${encodeURIComponent(`Canon In C Parte ${n} – Johann Pachelbel.mp4`)}`);
const PART_LEN = 8 * 16; // sedicesimi per parte

interface Props {
  /** 0..3 = parte, 4 = brano completo */
  partIdx: number;
  /** l'app sta suonando: il video va messo in pausa */
  appPlaying: boolean;
  /** il video è partito: l'app va messa in pausa */
  onVideoPlay: () => void;
  onVideoStop: () => void;
  /** posizione dello spartito (sedicesimi) corrispondente al punto del video */
  onVideoPos: (pos: number) => void;
  loop: [number, number] | null;
  /** clic su una battuta: il video salta lì */
  jump: { m: number; n: number } | null;
}

export function VideoPanel({ partIdx, appPlaying, onVideoPlay, onVideoStop, onVideoPos, loop, jump }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(true);
  const [choice, setChoice] = useState(0); // parte scelta nella vista "brano completo"
  const idx = partIdx < 4 ? partIdx : choice;
  const base = partIdx < 4 ? 0 : idx * PART_LEN; // inizio della parte dentro il brano completo
  const pending = useRef<number | null>(null); // salto da fare appena il video è caricato

  const p = useRef({ idx, base, loop, onVideoPos, onVideoStop, onVideoPlay });
  p.current = { idx, base, loop, onVideoPos, onVideoStop, onVideoPlay };

  useEffect(() => {
    try {
      if (localStorage.getItem("canone-in-do:video-open") === "0") setOpen(false);
    } catch {}
  }, []);
  const toggle = () => {
    setOpen((o) => {
      try {
        localStorage.setItem("canone-in-do:video-open", o ? "0" : "1");
      } catch {}
      if (o) p.current.onVideoStop();
      return !o;
    });
  };

  useEffect(() => {
    if (appPlaying) ref.current?.pause();
  }, [appPlaying]);

  // cambio di video o pannello chiuso/smontato: lo spartito non è più guidato dal video
  useEffect(() => () => p.current.onVideoStop(), [idx]);

  /** invia allo spartito la posizione del video; gestisce il loop */
  const sync = () => {
    const v = ref.current;
    if (!v) return;
    const { idx, base, loop, onVideoPos } = p.current;
    const local = videoTimeToPos(idx + 1, v.currentTime);
    if (loop && !v.paused) {
      const a = loop[0] * 16 - base;
      const b = (loop[1] + 1) * 16 - base;
      if (a >= 0 && b <= PART_LEN && local >= b) {
        v.currentTime = Math.max(0, posToVideoTime(idx + 1, a) - 0.12);
        return;
      }
    }
    onVideoPos(base + Math.max(0, Math.min(PART_LEN - 0.01, local)));
  };

  // mentre il video suona aggiorna lo spartito a ogni fotogramma
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let raf = 0;
    const loopFrame = () => {
      sync();
      raf = requestAnimationFrame(loopFrame);
    };
    const onPlay = () => {
      p.current.onVideoPlay();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loopFrame);
    };
    const onStop = () => {
      cancelAnimationFrame(raf);
      sync();
      p.current.onVideoStop();
    };
    const onLoaded = () => {
      if (pending.current != null) {
        v.currentTime = pending.current;
        pending.current = null;
      }
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onStop);
    v.addEventListener("ended", onStop);
    v.addEventListener("seeked", sync);
    v.addEventListener("loadedmetadata", onLoaded);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onStop);
      v.removeEventListener("ended", onStop);
      v.removeEventListener("seeked", sync);
      v.removeEventListener("loadedmetadata", onLoaded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, open]);

  // clic su una battuta: porta il video all'inizio di quella battuta
  useEffect(() => {
    if (!jump || !open) return;
    const part = partIdx < 4 ? partIdx : Math.floor(jump.m / 8);
    const local = (jump.m - (partIdx < 4 ? 0 : part * 8)) * 16;
    const t = Math.max(0, posToVideoTime(part + 1, local) - 0.12);
    if (partIdx === 4 && part !== choice) {
      pending.current = t;
      setChoice(part);
    } else if (ref.current) {
      if (ref.current.readyState >= 1) ref.current.currentTime = t;
      else pending.current = t;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump?.n]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-slate-200">Video · Parte {idx + 1}</h3>
        <button
          onClick={toggle}
          className="text-xs px-2.5 py-1 rounded-md border border-slate-600 text-slate-300 hover:border-slate-400"
        >
          {open ? "Nascondi" : "Mostra"}
        </button>
      </div>
      {partIdx === 4 && open && (
        <div className="mt-2 flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setChoice(i)}
              className={`flex-1 py-1 ${choice === i ? "bg-indigo-500/30 text-indigo-100" : "text-slate-400 hover:bg-slate-800"}`}
            >
              Parte {i + 1}
            </button>
          ))}
        </div>
      )}
      {open && (
        <>
          <video
            ref={ref}
            key={idx}
            src={VIDEOS[idx]}
            controls
            preload="metadata"
            playsInline
            className="mt-2 w-full rounded-xl bg-black"
          />
          <p className="mt-2 text-xs text-slate-400">
            Quando il video suona, spartito, battute e tastiera lo seguono. Clic su una battuta: il video salta lì (e ripete il
            loop).
          </p>
        </>
      )}
    </div>
  );
}
