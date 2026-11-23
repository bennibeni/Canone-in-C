"use client";

import type { BuiltPart, Hand, ScoreNote, ScoreRest } from "@/lib/score";
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
  /** brano completo: mostra P1, P2… davanti al numero di battuta */
  showParts?: boolean;
  dense?: boolean; // ci sono semicrome: meno colonne
  /** battute da mostrare [inizio, fine) — nel brano completo solo la parte corrente */
  range?: [number, number];
}

/** nome della durata (per le note dei gruppi irregolari: "croma di terzina") */
const durLabel = (n: { dur: number; tuplet?: { num: number; written: number } }) => {
  const base = DUR_LABEL[n.tuplet ? n.tuplet.written : n.dur];
  if (n.tuplet) return `${base ?? "nota"} di ${TUPLET_NAME[n.tuplet.num] ?? `gruppo di ${n.tuplet.num}`}`;
  return base ?? `${+n.dur.toFixed(2)}/16`;
};
const TUPLET_NAME: Record<number, string> = { 3: "terzina", 5: "quintina", 6: "sestina", 7: "settimina" };

const DUR_LABEL: Record<number, string> = {
  1: "semicroma",
  2: "croma",
  3: "croma puntata",
  4: "semiminima",
  6: "semiminima puntata",
  8: "minima",
};

function Row({
  notes,
  rests,
  hand,
  sys,
  labelMode,
  live,
}: {
  notes: ScoreNote[];
  rests: ScoreRest[];
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
  // le pause occupano lo spazio della loro durata (senza riquadro)
  const items: (ScoreNote[] | ScoreRest)[] = [...groups, ...rests].sort(
    (a, b) => (Array.isArray(a) ? a[0].start : a.start) - (Array.isArray(b) ? b[0].start : b.start)
  );
  return (
    <div className="flex gap-[2px] h-7">
      {items.map((g) => {
        if (!Array.isArray(g))
          return <div key={"r" + g.start + hand} style={{ flex: g.dur }} title={`pausa — ${durLabel(g)}`} />;
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
            title={`${g.map((n) => spelledName(n.label, sys, true)).join(" + ")} — ${durLabel(g[0])}`}
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

export function MeasureGrid({ built, measure, loop, sys, labelMode, live, onSelect, showParts, dense, range }: Props) {
  const partOf = (m: number) => built.partStarts.filter((s) => s <= m).length;
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
                {showParts ? `P${partOf(i)} · ` : ""}
                {built.labels[i] === "Levare" ? "Levare" : `Battuta ${built.labels[i]}`}
              </span>
              <span className="text-xs font-bold text-emerald-300 tracking-wide">
                {m.chords.map((c) => chordName(c, sys)).join(" · ")}
              </span>
            </div>
            <div className="space-y-1">
              <Row notes={notes.filter((n) => n.hand === "R")} rests={built.rests.filter((r) => r.measure === i && r.hand === "R")} hand="R" sys={sys} labelMode={labelMode} live={live} />
              <Row notes={notes.filter((n) => n.hand === "L")} rests={built.rests.filter((r) => r.measure === i && r.hand === "L")} hand="L" sys={sys} labelMode={labelMode} live={live} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
