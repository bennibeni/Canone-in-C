"use client";

import { memo, useMemo } from "react";
import type { ScoreNote } from "@/lib/score";
import type { KeyState } from "@/hooks/usePlayer";
import { keyboardLayout, noteName, type NameSystem, type Spelling } from "@/lib/notes";

export const HAND_COLOR = { R: "#5eead4", L: "#7aa2ff" } as const;
export const HAND_COLOR_DIM = { R: "#134e4a", L: "#1e3a8a" } as const;

interface Props {
  lo: number;
  hi: number;
  active: ScoreNote[];
  targets: number[];
  userKeys: Map<number, KeyState>;
  sys: NameSystem;
  spelling?: Spelling;
  labels: "c" | "all" | "none";
  onPress: (midi: number) => void;
  onRelease: (midi: number) => void;
}

function KeyboardImpl({ lo, hi, active, targets, userKeys, sys, spelling, labels, onPress, onRelease }: Props) {
  const { keys, whiteCount } = useMemo(() => keyboardLayout(lo, hi), [lo, hi]);
  const activeMap = useMemo(() => {
    const m = new Map<number, "R" | "L">();
    for (const n of active) m.set(n.midi, n.hand);
    return m;
  }, [active]);
  const targetSet = useMemo(() => new Set(targets), [targets]);

  const H = 5.2; // altezza tasti bianchi in unità
  const BH = 3.3;

  const fill = (midi: number, black: boolean) => {
    const u = userKeys.get(midi);
    if (u === "bad") return "#f87171";
    if (u === "ok") return "#fbbf24";
    if (u === "down") return black ? "#a16207" : "#fde68a";
    const h = activeMap.get(midi);
    if (h) return HAND_COLOR[h];
    return black ? "#111827" : "#f8fafc";
  };

  const handlers = (midi: number) => ({
    onPointerDown: (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as Element).releasePointerCapture?.(e.pointerId);
      onPress(midi);
    },
    onPointerUp: () => onRelease(midi),
    onPointerLeave: () => onRelease(midi),
  });

  return (
    <svg
      viewBox={`0 0 ${whiteCount} ${H}`}
      className="block w-full h-auto select-none touch-none"
      role="group"
      data-targets={targets.join(",")}
      aria-label="Tastiera del pianoforte"
    >
      {keys
        .filter((k) => !k.black)
        .map((k) => {
          const isC = k.midi % 12 === 0;
          const showLabel = labels === "all" || (labels === "c" && isC);
          return (
            <g key={k.midi} data-midi={k.midi} {...handlers(k.midi)} className="cursor-pointer">
              <rect
                x={k.x + 0.03}
                y={0}
                width={k.w - 0.06}
                height={H}
                rx={0.12}
                fill={fill(k.midi, false)}
                stroke="#334155"
                strokeWidth={0.04}
              />
              {targetSet.has(k.midi) && (
                <rect
                  x={k.x + 0.12}
                  y={H - 1.35}
                  width={k.w - 0.24}
                  height={1.1}
                  rx={0.2}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={0.12}
                  className="animate-pulse"
                />
              )}
              {showLabel && (
                <text
                  x={k.x + 0.5}
                  y={H - 0.4}
                  fontSize={labels === "all" ? 0.42 : 0.48}
                  textAnchor="middle"
                  fill={isC ? "#334155" : "#64748b"}
                  fontWeight={isC ? 700 : 500}
                  style={{ pointerEvents: "none" }}
                >
                  {noteName(k.midi, sys, isC, spelling)}
                </text>
              )}
            </g>
          );
        })}
      {keys
        .filter((k) => k.black)
        .map((k) => (
          <g key={k.midi} data-midi={k.midi} {...handlers(k.midi)} className="cursor-pointer">
            <rect
              x={k.x}
              y={0}
              width={k.w}
              height={BH}
              rx={0.08}
              fill={fill(k.midi, true)}
              stroke={targetSet.has(k.midi) ? "#f59e0b" : "#020617"}
              strokeWidth={targetSet.has(k.midi) ? 0.12 : 0.04}
              className={targetSet.has(k.midi) ? "animate-pulse" : undefined}
            />
          </g>
        ))}
    </svg>
  );
}

export const Keyboard = memo(KeyboardImpl);
