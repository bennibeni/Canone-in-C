"use client";

import { useEffect, useRef, useState } from "react";
import type { BuiltPart, Hand, ScoreNote } from "@/lib/score";
import type { LabelMode } from "@/lib/notes";

interface Props {
  built: BuiltPart;
  /** note che stanno suonando o che l'app attende: chiavi "mano:inizio" */
  live: Set<string>;
  measure: number;
  playing: boolean;
  labelMode: LabelMode;
  loop: [number, number] | null;
  onSelect: (m: number, extend: boolean) => void;
  /** mostra una sola riga (coppia di pentagrammi) alla volta, quella della battuta corrente */
  singleRow: boolean;
  /** frecce della vista a riga singola: porta la posizione alla battuta indicata */
  onGoToMeasure: (m: number) => void;
}

// durata in sedicesimi → durata VexFlow
const VF_DUR: Record<number, string> = { 1: "16", 2: "8", 3: "8d", 4: "q", 6: "qd", 8: "h", 12: "hd", 16: "w" };

const TOP = 78; // spazio sopra il pentagramma di violino (tagli addizionali)
const GAP = 118; // distanza tra violino e basso
const ROW_H = TOP + GAP + 120;
const LEFT = 14;

/** "F#5" → "f#/5" */
const vfKey = (label: string) => {
  const m = /^([A-G])(##|#|bb|b)?(-?\d)$/.exec(label)!;
  return `${m[1].toLowerCase()}${m[2] ?? ""}/${m[3]}`;
};

interface Layout {
  rows: number;
  perRow: number;
  measureBox: { x: number; y: number; w: number; h: number }[];
}

export function SheetMusic({ built, live, measure, playing, labelMode, loop, onSelect, singleRow, onGoToMeasure }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [layout, setLayout] = useState<Layout | null>(null);
  const elems = useRef<Map<string, Element[]>>(new Map());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // larghezza disponibile
  useEffect(() => {
    const el = wrapRef.current!;
    let t: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => setWidth(Math.floor(el.clientWidth)), 120);
    });
    ro.observe(el);
    setWidth(Math.floor(el.clientWidth));
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  // disegno dello spartito
  useEffect(() => {
    if (!width) return;
    let cancelled = false;
    (async () => {
      const VF = await import("vexflow/bravura");
      try {
        await document.fonts.load("30px Bravura");
      } catch {}
      if (cancelled) return;
      const { Renderer, Stave, StaveNote, Voice, Formatter, Beam, Accidental, Dot, StaveConnector, FretHandFinger, Modifier } = VF;

      const host = hostRef.current!;
      host.innerHTML = "";
      elems.current = new Map();

      const keySig = built.key.id;
      const nAcc = Math.abs([0, -5, 2, -3, 4, -1, 6, 1, -4, 3, -2, 5][["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"].indexOf(keySig)] ?? 0);
      const dense = built.notes.some((n) => n.dur === 1);
      const minW = dense ? 330 : 230;
      const perRow = Math.max(1, Math.min(4, Math.floor((width - LEFT * 2) / minW)));
      const total = built.part.measures.length;
      const rows = Math.ceil(total / perRow);
      const H = rows * ROW_H + 10;

      const renderer = new Renderer(host, Renderer.Backends.SVG);
      renderer.resize(width, H);
      const ctx = renderer.getContext();
      const svg = host.querySelector("svg")!;

      const measureBox: Layout["measureBox"] = [];
      const firstExtra = 52 + nAcc * 10;
      const timeExtra = 26;

      for (let r = 0; r < rows; r++) {
        const y = r * ROW_H;
        const ms = Array.from({ length: Math.min(perRow, total - r * perRow) }, (_, i) => r * perRow + i);
        const usable = width - LEFT * 2 - firstExtra - (r === 0 ? timeExtra : 0);
        const mw = usable / perRow;
        let x = LEFT;
        ms.forEach((m, i) => {
          const isFirst = i === 0;
          const w = mw + (isFirst ? firstExtra + (r === 0 ? timeExtra : 0) : 0);
          const treble = new Stave(x, y + TOP - 40, w);
          const bass = new Stave(x, y + TOP - 40 + GAP, w);
          if (isFirst) {
            treble.addClef("treble").addKeySignature(keySig);
            bass.addClef("bass").addKeySignature(keySig);
            if (r === 0) {
              treble.addTimeSignature("4/4");
              bass.addTimeSignature("4/4");
            }
          }
          if (m === total - 1) {
            treble.setEndBarType(VF.BarlineType.END);
            bass.setEndBarType(VF.BarlineType.END);
          }
          treble.setContext(ctx).draw();
          bass.setContext(ctx).draw();
          if (isFirst) {
            new StaveConnector(treble, bass).setType("brace").setContext(ctx).draw();
            new StaveConnector(treble, bass).setType("singleLeft").setContext(ctx).draw();
          }
          new StaveConnector(treble, bass)
            .setType(m === total - 1 ? "boldDoubleRight" : "singleRight")
            .setContext(ctx)
            .draw();

          // note della battuta, raggruppate per attacco (accordi)
          const build = (hand: Hand, clef: "treble" | "bass") => {
            const groups: ScoreNote[][] = [];
            for (const n of built.notes) {
              if (n.measure !== m || n.hand !== hand) continue;
              const g = groups[groups.length - 1];
              if (g && g[0].start === n.start) g.push(n);
              else groups.push([n]);
            }
            const notes = groups.map((g) => {
              g.sort((a, b) => a.midi - b.midi);
              const sn = new StaveNote({ keys: g.map((n) => vfKey(n.label)), duration: VF_DUR[g[0].dur] ?? "8", clef, autoStem: true });
              if (VF_DUR[g[0].dur]?.endsWith("d")) Dot.buildAndAttach([sn], { all: true });
              if (labelMode === "fingers") {
                g.forEach((n, k) => {
                  if (!n.finger) return;
                  const f = new FretHandFinger(String(n.finger));
                  f.setPosition(hand === "R" ? Modifier.Position.ABOVE : Modifier.Position.BELOW);
                  sn.addModifier(f, k);
                });
              }
              return { sn, key: `${hand}:${g[0].start}`, start: g[0].start };
            });
            // pause della battuta (in mezzo al pentagramma)
            const rests = built.rests
              .filter((r) => r.measure === m && r.hand === hand)
              .map((r) => ({
                sn: new StaveNote({ keys: [clef === "treble" ? "b/4" : "d/3"], duration: (VF_DUR[r.dur] ?? "8") + "r", clef }),
                start: r.start,
              }));
            const ticks = [...notes, ...rests].sort((a, b) => a.start - b.start).map((x) => x.sn);
            const voice = new Voice({ numBeats: 4, beatValue: 4 }).setMode(Voice.Mode.SOFT);
            voice.addTickables(ticks);
            Accidental.applyAccidentals([voice], keySig);
            return { voice, notes, ticks };
          };
          const rh = build("R", "treble");
          const lh = build("L", "bass");
          const beams = [
            ...Beam.generateBeams(rh.ticks),
            ...Beam.generateBeams(lh.ticks),
          ];
          const startX = Math.max(treble.getNoteStartX(), bass.getNoteStartX());
          treble.setNoteStartX(startX);
          bass.setNoteStartX(startX);
          new Formatter().joinVoices([rh.voice]).joinVoices([lh.voice]).format([rh.voice, lh.voice], treble.getNoteEndX() - startX - 12);
          rh.voice.draw(ctx, treble);
          lh.voice.draw(ctx, bass);
          beams.forEach((b) => b.setContext(ctx).draw());

          for (const { sn, key } of [...rh.notes, ...lh.notes]) {
            const el = sn.getSVGElement();
            if (!el) continue;
            const arr = elems.current.get(key) ?? [];
            arr.push(el);
            elems.current.set(key, arr);
          }
          measureBox[m] = { x, y: y + TOP - 70, w, h: GAP + 140 };
          x += w;
        });
      }

      // riquadri cliccabili delle battute (sotto le note)
      const ns = "http://www.w3.org/2000/svg";
      const layer = document.createElementNS(ns, "g");
      measureBox.forEach((b, m) => {
        const rect = document.createElementNS(ns, "rect");
        rect.setAttribute("x", String(b.x));
        rect.setAttribute("y", String(b.y));
        rect.setAttribute("width", String(b.w));
        rect.setAttribute("height", String(b.h));
        rect.setAttribute("rx", "8");
        rect.setAttribute("class", "sheet-measure");
        rect.setAttribute("stroke", "none");
        rect.setAttribute("pointer-events", "all");
        rect.dataset.m = String(m);
        rect.addEventListener("click", (e) => onSelectRef.current(m, (e as MouseEvent).shiftKey));
        layer.appendChild(rect);
      });
      svg.insertBefore(layer, svg.firstChild);
      setLayout({ rows, perRow, measureBox });
    })();
    return () => {
      cancelled = true;
    };
  }, [built, width, labelMode]);

  // evidenzia le note in esecuzione
  useEffect(() => {
    for (const [key, els] of elems.current) {
      const on = live.has(key);
      for (const el of els) el.classList.toggle(key.startsWith("R") ? "live-R" : "live-L", on);
    }
  }, [live, layout]);

  // battuta corrente e loop
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.querySelectorAll<SVGRectElement>("rect.sheet-measure").forEach((r) => {
      const m = Number(r.dataset.m);
      r.classList.toggle("current", m === measure);
      r.classList.toggle("in-loop", !!loop && m >= loop[0] && m <= loop[1]);
    });
  }, [measure, loop, layout]);

  const row = layout ? Math.floor(measure / layout.perRow) : 0;

  // tiene in vista la riga corrente: sempre nella vista a riga singola, durante la riproduzione altrimenti
  useEffect(() => {
    if (!layout) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (singleRow) {
      wrap.scrollTo({ top: row * ROW_H, behavior: playing ? "smooth" : "auto" });
      return;
    }
    if (!playing) return;
    const b = layout.measureBox[measure];
    if (!b) return;
    if (b.y < wrap.scrollTop || b.y + b.h > wrap.scrollTop + wrap.clientHeight) {
      wrap.scrollTo({ top: Math.max(0, b.y - 8), behavior: "smooth" });
    }
  }, [measure, row, playing, layout, singleRow]);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className={`sheet-wrap rounded-xl bg-[#fbfaf7] overflow-x-hidden ${singleRow ? "overflow-y-hidden" : "overflow-y-auto"}`}
        style={{ maxHeight: singleRow ? ROW_H : 2 * ROW_H + 20 }}
      >
        <div ref={hostRef} className="sheet" />
      </div>
      {singleRow && layout && layout.rows > 1 && (
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-slate-900/85 px-1.5 py-1 text-xs font-semibold text-slate-200 shadow">
          <button
            onClick={() => onGoToMeasure(Math.max(0, row - 1) * layout.perRow)}
            disabled={row === 0}
            className="w-6 h-6 rounded hover:bg-slate-700 disabled:opacity-30"
            aria-label="Riga precedente"
          >
            ‹
          </button>
          <span className="tabular-nums px-1">
            Riga {row + 1}/{layout.rows}
          </span>
          <button
            onClick={() => onGoToMeasure(Math.min(layout.rows - 1, row + 1) * layout.perRow)}
            disabled={row === layout.rows - 1}
            className="w-6 h-6 rounded hover:bg-slate-700 disabled:opacity-30"
            aria-label="Riga successiva"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
