"use client";

import type { BuiltPart, Hand, ScoreNote } from "@/lib/score";
import { chordName, spelledName, type LabelMode, type NameSystem } from "@/lib/notes";
import { HAND_COLOR } from "./Keyboard";

interface Props {
  built: BuiltPart;
  measure: number;
  loop: [number, number] | null;
  sys: NameSystem;
  labelMode: LabelMode;
  /** note che stanno suonando o che l'app attende: chiavi "mano:inizio" */
  live: Set<string>;
  onSelect: (m: number, extend: boolean) => void;
  partBreaks?: number; // battute per parte (vista brano completo)
  dense?: boolean; // ci sono semicrome: meno colonne
  /** battute da mostrare [inizio, fine) — nel brano completo solo la parte corrente */
  range?: [number, number];
}

const DUR_LABEL: Record<number, string> = {
  1: "semicroma",
  2: "croma",
  4: "semiminima",
  6: "semiminima puntata",
  8: "minima",
};

function Row({
  notes,
  hand,
  sys,
  labelMode,
  live,
}: {
  notes: ScoreNote[];
  hand: Hand;
  sys: NameSystem;
  labelMode: LabelMode;
  live: Set<string>;
}) {
  // raggruppa le note simultanee
  const groups: ScoreNote[][] = [];
  for (const n of notes) {
    const g = groups[groups.length - 1];
    if (g && g[0].start === n.start) g.push(n);
    else groups.push([n]);
  }
  return (
    <div className="flex gap-[2px] h-7">
      {groups.map((g) => {
        const d = g[0].dur;
        const on = live.has(hand + ":" + g[0].start);
        const text =
          labelMode === "fingers"
            ? g.map((n) => n.finger ?? "").reverse().join("/")
            : labelMode === "names"
            ? g.map((n) => spelledName(n.label, sys)).reverse().join("/")
            : "";
        return (
          <div
            key={g[0].start + hand}
            title={`${g.map((n) => spelledName(n.label, sys, true)).join(" + ")} — ${DUR_LABEL[d] ?? d + "/16"}`}
            className={`rounded-[4px] flex items-center justify-center font-bold leading-none overflow-hidden text-slate-900 ${
              labelMode === "fingers" ? "text-[12px]" : "text-[10px]"
            } ${on ? "chip-live" : ""}`}
            style={{ flex: d, background: HAND_COLOR[hand], opacity: on ? 1 : d >= 4 ? 0.95 : 0.85 }}
          >
            <span className="truncate px-[1px]">{text}</span>
          </div>
        );
      })}
    </div>
  );
}

export function MeasureGrid({ built, measure, loop, sys, labelMode, live, onSelect, partBreaks, dense, range }: Props) {
  const byMeasure = built.part.measures.map((_, i) => built.notes.filter((n) => n.measure === i));
  return (
    <div className={`grid gap-2 ${dense ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
      {built.part.measures.map((m, i) => {
        if (range && (i < range[0] || i >= range[1])) return null;
        const inLoop = loop && i >= loop[0] && i <= loop[1];
        const current = i === measure;
        const notes = byMeasure[i];
        return (
          <button
            key={i}
            onClick={(e) => onSelect(i, e.shiftKey)}
            className={`text-left rounded-xl p-2 border transition ${
              current
                ? "border-teal-300/80 bg-slate-800"
                : inLoop
                ? "border-amber-400/60 bg-slate-900"
                : "border-slate-800 bg-slate-900/60 hover:border-slate-600"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-slate-400 font-semibold">
                {partBreaks ? `P${Math.floor(i / partBreaks) + 1} · ` : ""}Battuta {i + 1}
              </span>
              <span className="text-xs font-bold text-emerald-300 tracking-wide">
                {chordName(m.chords[0], sys)} · {chordName(m.chords[1], sys)}
              </span>
            </div>
            <div className="space-y-1">
              <Row notes={notes.filter((n) => n.hand === "R")} hand="R" sys={sys} labelMode={labelMode} live={live} />
              <Row notes={notes.filter((n) => n.hand === "L")} hand="L" sys={sys} labelMode={labelMode} live={live} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
