"use client";

import { useEffect, useMemo, useRef } from "react";
import type { BuiltPart } from "@/lib/score";
import { chordName, keyboardLayout, spelledName, type LabelMode, type NameSystem } from "@/lib/notes";
import type { HandSet, Mode } from "@/hooks/usePlayer";
import { HAND_COLOR, HAND_COLOR_DIM } from "./Keyboard";

interface Props {
  built: BuiltPart;
  posRef: React.MutableRefObject<number>;
  targetsRef: React.MutableRefObject<number[]>;
  lo: number;
  hi: number;
  sys: NameSystem;
  labelMode: LabelMode;
  mode: Mode;
  practice: HandSet;
  loop: [number, number] | null;
  zoom: number; // pixel per sedicesimo
  /** altezza minima: il riquadro si allunga per riempire lo spazio disponibile */
  height: number;
  playing: boolean;
  onSeek: (pos: number) => void;
}

export function FallingNotes(p: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const props = useRef(p);
  props.current = p;
  const layout = useMemo(() => keyboardLayout(p.lo, p.hi), [p.lo, p.hi]);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0;
    let H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      W = wrap.clientWidth;
      H = Math.max(props.current.height, Math.floor(wrap.clientHeight));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      // con il riquadro ancora largo 0 (prima dell'impaginazione) o molto stretto le misure
      // possono diventare negative: arcTo non accetta raggi negativi
      w = Math.max(0, w);
      h = Math.max(0, h);
      const rr = Math.max(0, Math.min(r, w / 2, h / 2));
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    const draw = () => {
      const { built, posRef, targetsRef, sys, labelMode, mode, practice, loop, zoom } = props.current;
      if (H !== Math.max(props.current.height, Math.floor(wrap.clientHeight)) || W !== wrap.clientWidth) resize();
      if (W < 10) {
        raf = requestAnimationFrame(draw); // riquadro non ancora impaginato
        return;
      }
      const { keys, whiteCount } = layoutRef.current;
      const kw = W / whiteCount;
      const keyX = new Map<number, [number, number]>();
      for (const k of keys) keyX.set(k.midi, [k.x * kw, k.w * kw]);
      const pos = posRef.current;
      const px = zoom;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // sfondo con corsie dei tasti neri
      ctx.fillStyle = "#0b1020";
      ctx.fillRect(0, 0, W, H);
      for (const k of keys) {
        if (k.black) {
          ctx.fillStyle = "#0e1428";
          ctx.fillRect(k.x * kw, 0, k.w * kw, H);
        } else if (k.midi % 12 === 0) {
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(k.x * kw, 0, 1, H);
        }
      }

      const yOf = (t: number) => H - (t - pos) * px;
      const total = built.part.measures.length;

      // fuori dal loop
      if (loop) {
        const a = yOf(loop[0] * built.mlen);
        const b = yOf((loop[1] + 1) * built.mlen);
        ctx.fillStyle = "rgba(2,6,23,0.6)";
        if (a < H) ctx.fillRect(0, a, W, H - a);
        if (b > 0) ctx.fillRect(0, 0, W, b);
      }

      // linee di battuta e movimento + accordi
      for (let m = 0; m <= total; m++) {
        const nb = built.mlen / 4;
        for (let beat = 0; beat < nb; beat++) {
          const t = m * built.mlen + beat * 4;
          const y = yOf(t);
          if (y < -20 || y > H + 2) continue;
          if (beat === 0) {
            ctx.fillStyle = "rgba(148,163,184,0.45)";
            ctx.fillRect(0, y, W, 1);
            if (m < total) {
              ctx.fillStyle = "#94a3b8";
              ctx.font = "600 11px ui-sans-serif, system-ui";
              ctx.fillText(built.labels[m] === "Levare" ? "levare" : built.labels[m], 6, y - 5);
            }
          } else {
            ctx.fillStyle = "rgba(148,163,184,0.10)";
            ctx.fillRect(0, y, W, 1);
          }
          // accordi distribuiti in parti uguali della battuta (1 = sul primo movimento, 2 = sul primo e sul terzo…)
          const chs = m < total ? built.part.measures[m].chords : [];
          const slot = chs.length ? (beat * chs.length) / nb : -1;
          if (m < total && chs.length && Number.isInteger(slot)) {
            const ch = chs[slot];
            const label = chordName(ch, sys);
            ctx.font = "700 13px ui-sans-serif, system-ui";
            const tw = ctx.measureText(label).width;
            const x = W - tw - 14;
            ctx.fillStyle = "rgba(16,185,129,0.12)";
            roundRect(x - 6, y - 21, tw + 12, 18, 6);
            ctx.fill();
            ctx.fillStyle = "#6ee7b7";
            ctx.fillText(label, x, y - 7.5);
          }
        }
      }

      // note
      const targets = new Set(targetsRef.current);
      for (const n of built.notes) {
        const yb = yOf(n.start);
        const yt = yOf(n.start + n.dur);
        if (yb < -4 || yt > H) continue;
        const geo = keyX.get(n.midi);
        if (!geo) continue;
        const [x0, w0] = geo;
        const pad = Math.max(1.5, w0 * 0.08);
        const x = x0 + pad;
        const w = w0 - pad * 2;
        const top = yt + 1.5;
        const h = Math.max(4, Math.min(yb, H) - top - 1.5);
        const sounding = n.start <= pos + 1e-6 && pos < n.start + n.dur;
        const isUser = mode === "wait" && practice[n.hand];
        const isTarget = isUser && n.start === pos && targets.has(n.midi);
        ctx.save();
        if (sounding || isTarget) {
          ctx.shadowColor = isTarget ? "#f59e0b" : HAND_COLOR[n.hand];
          ctx.shadowBlur = 16;
        }
        ctx.fillStyle = mode === "wait" && !isUser ? HAND_COLOR_DIM[n.hand] : HAND_COLOR[n.hand];
        ctx.globalAlpha = sounding ? 1 : 0.88;
        if (w < 1) {
          ctx.restore();
          continue; // tasto troppo stretto per disegnare la nota
        }
        roundRect(x, top, w, h, 5);
        ctx.fill();
        if (isTarget) {
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
        const label = labelMode === "fingers" ? (n.finger ? String(n.finger) : "") : labelMode === "names" ? spelledName(n.label, sys) : "";
        if (label && h > 13 && w > 12) {
          ctx.fillStyle = mode === "wait" && !isUser ? "#cbd5e1" : "#0f172a";
          const fs = labelMode === "fingers" ? Math.min(14, Math.max(9, w * 0.55)) : Math.min(12, Math.max(8, w * 0.42));
          ctx.font = `700 ${fs}px ui-sans-serif, system-ui`;
          ctx.textAlign = "center";
          ctx.fillText(label, x + w / 2, Math.min(yb, H) - 6);
          ctx.textAlign = "start";
        }
      }

      // linea d'impatto
      const grad = ctx.createLinearGradient(0, H - 6, 0, H);
      grad.addColorStop(0, "rgba(94,234,212,0)");
      grad.addColorStop(1, "rgba(94,234,212,0.35)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, H - 6, W, 6);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // trascinamento quando è in pausa; la rotellina sposta la musica solo tenendo premuto Maiusc
  // (senza Maiusc la rotellina fa scorrere la pagina e non deve cambiare battuta)
  const drag = useRef<{ y: number; pos: number } | null>(null);
  const onWheel = (e: React.WheelEvent) => {
    if (p.playing || !e.shiftKey) return;
    // con Maiusc alcuni browser mettono lo scorrimento in deltaX
    const d = e.deltaY || e.deltaX;
    p.onSeek(p.posRef.current + d / p.zoom);
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden flex-1"
      style={{ minHeight: p.height, cursor: p.playing ? "default" : "ns-resize" }}
      title={p.playing ? undefined : "Trascina per spostarti nella musica (oppure Maiusc + rotellina)"}
      onWheel={onWheel}
      onPointerDown={(e) => {
        if (p.playing) return;
        drag.current = { y: e.clientY, pos: p.posRef.current };
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        p.onSeek(drag.current.pos + (e.clientY - drag.current.y) / p.zoom);
      }}
      onPointerUp={() => (drag.current = null)}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
