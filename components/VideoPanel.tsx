"use client";

import { useEffect, useRef, useState } from "react";
import type { Song } from "@/lib/score";
import { posToVideoTime, videoTimeToPos } from "@/lib/videoSync";

interface Props {
  song: Song;
  /** indice della parte; = song.parts.length per il brano completo */
  partIdx: number;
  /** battuta d'inizio di ogni parte nel brano completo */
  partStarts: number[];
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
  /** passa a un'altra parte dell'app (video precedente/successivo fuori dal brano completo) */
  onSelectPart: (i: number) => void;
}

export function VideoPanel({ song, partIdx, partStarts, appPlaying, onVideoPlay, onVideoStop, onVideoPos, loop, jump, onSelectPart }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(true);
  const [choice, setChoice] = useState(0); // parte scelta nella vista "brano completo"
  const [vidIdx, setVidIdx] = useState(0); // quale video della parte (es. note che scendono / mani)
  const isFull = partIdx >= song.parts.length;
  const idx = isFull ? choice : partIdx;
  const part = song.parts[idx];
  const videos = part.videos ?? [];
  const video = videos[Math.min(vidIdx, videos.length - 1)];
  const base = isFull ? (partStarts[idx] ?? 0) * 16 : 0; // inizio della parte dentro il brano completo
  const partLen = part.measures.length * 16;
  const pending = useRef<number | null>(null); // salto da fare appena il video è caricato

  const p = useRef({ video, base, partLen, loop, onVideoPos, onVideoStop, onVideoPlay });
  p.current = { video, base, partLen, loop, onVideoPos, onVideoStop, onVideoPlay };

  useEffect(() => {
    try {
      if (localStorage.getItem("canone-in-do:video-open") === "0") setOpen(false);
    } catch {}
  }, []);
  const nextVid = useRef<number | null>(null); // video da mostrare dopo un cambio di parte
  useEffect(() => {
    setVidIdx(nextVid.current ?? 0);
    nextVid.current = null;
  }, [song.slug, idx]);

  // tutti i video del brano in ordine: [parte, video]
  const all: [number, number][] = song.parts.flatMap((pt, i) => (pt.videos ?? []).map((_, j) => [i, j] as [number, number]));
  const cur = all.findIndex(([i, j]) => i === idx && j === Math.min(vidIdx, videos.length - 1));
  const goVideo = (k: number) => {
    const target = all[k];
    if (!target) return;
    ref.current?.pause();
    const [i, j] = target;
    if (i === idx) return setVidIdx(j);
    nextVid.current = j;
    if (isFull) {
      setChoice(i);
      p.current.onVideoPos((partStarts[i] ?? 0) * 16); // lo spartito va all'inizio della parte
    } else onSelectPart(i);
  };

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

  // cambio di video o pannello smontato: lo spartito non è più guidato dal video
  useEffect(() => () => p.current.onVideoStop(), [video?.src]);

  /** invia allo spartito la posizione del video; gestisce il loop */
  const sync = () => {
    const v = ref.current;
    const { video, base, partLen, loop, onVideoPos } = p.current;
    if (!v || !video) return;
    const local = videoTimeToPos(video.beats, v.currentTime);
    if (loop && !v.paused) {
      const a = loop[0] * 16 - base;
      const b = (loop[1] + 1) * 16 - base;
      if (a >= 0 && b <= partLen && local >= b) {
        v.currentTime = Math.max(0, posToVideoTime(video.beats, a) - 0.12);
        return;
      }
    }
    onVideoPos(base + Math.max(0, Math.min(partLen - 0.01, local)));
  };

  // mentre il video suona aggiorna lo spartito a ogni fotogramma
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let raf = 0;
    const frame = () => {
      sync();
      raf = requestAnimationFrame(frame);
    };
    const onPlay = () => {
      p.current.onVideoPlay();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
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
  }, [video?.src, open]);

  // clic su una battuta: porta il video all'inizio di quella battuta
  useEffect(() => {
    if (!jump || !open) return;
    let target = idx;
    if (isFull) {
      target = 0;
      partStarts.forEach((s, i) => {
        if (jump.m >= s) target = i;
      });
    }
    const tv = (song.parts[target].videos ?? [])[target === idx ? Math.min(vidIdx, videos.length - 1) : 0];
    if (!tv) return;
    const local = (jump.m - (isFull ? partStarts[target] : 0)) * 16;
    const t = Math.max(0, posToVideoTime(tv.beats, local) - 0.12);
    if (isFull && target !== choice) {
      pending.current = t;
      setChoice(target);
    } else if (ref.current) {
      if (ref.current.readyState >= 1) ref.current.currentTime = t;
      else pending.current = t;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump?.n]);

  if (!video) return null;

  const seg = (items: string[], value: number, set: (i: number) => void) => (
    <div className="mt-2 flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold">
      {items.map((label, i) => (
        <button
          key={label}
          onClick={() => set(i)}
          className={`flex-1 py-1 ${value === i ? "bg-indigo-500/30 text-indigo-100" : "text-slate-400 hover:bg-slate-800"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {all.length > 1 && (
            <div className="flex rounded-md overflow-hidden border border-slate-600 text-xs" aria-label="Cambia video">
              <button
                onClick={() => goVideo(cur - 1)}
                disabled={cur <= 0}
                title="Video precedente"
                aria-label="Video precedente"
                className="px-2 py-0.5 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                ‹
              </button>
              <button
                onClick={() => goVideo(cur + 1)}
                disabled={cur >= all.length - 1}
                title="Video successivo"
                aria-label="Video successivo"
                className="px-2 py-0.5 border-l border-slate-600 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                ›
              </button>
            </div>
          )}
          <h3 className="font-semibold text-slate-200 truncate">Video · {part.title}</h3>
        </div>
        <button
          onClick={toggle}
          className="text-xs px-2.5 py-1 rounded-md border border-slate-600 text-slate-300 hover:border-slate-400"
        >
          {open ? "Nascondi" : "Mostra"}
        </button>
      </div>
      {isFull && open && seg(song.parts.map((x) => x.title), choice, setChoice)}
      {open && videos.length > 1 && seg(videos.map((x) => x.label), vidIdx, setVidIdx)}
      {open && (
        <>
          <video
            ref={ref}
            key={video.src}
            src={video.src}
            controls
            preload="metadata"
            playsInline
            className="mt-2 w-full rounded-xl bg-black"
          />
          {song.arranger && (
            <p className="mt-1.5 text-xs text-slate-400">
              Video di{" "}
              <a href={song.arranger.videosUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-200 hover:text-teal-200">
                {song.arranger.name}
              </a>{" "}
              · {song.arranger.handle}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-400">
            Quando il video suona, spartito, battute e tastiera lo seguono. Clic su una battuta: il video salta lì (e ripete il
            loop).
          </p>
        </>
      )}
    </div>
  );
}
