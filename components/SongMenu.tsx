"use client";

import Link from "next/link";
import { SONGS } from "@/lib/songs";

/** Menu dei brani: colonna verticale a sinistra su schermi larghi, riga orizzontale su telefono. */
export function SongMenu({ current }: { current: string }) {
  return (
    <aside className="border-b border-slate-800 bg-[#05070f] lg:border-b-0 lg:border-r lg:w-56 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="px-4 pt-4 pb-2 hidden lg:block">
        <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">Brani</div>
      </div>
      <nav aria-label="Brani" className="flex gap-1.5 overflow-x-auto px-3 py-2 lg:flex-col lg:gap-1 lg:px-2 lg:py-0">
        {SONGS.map((s) => {
          const active = s.slug === current;
          return (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-xl px-3 py-2 border transition ${
                active
                  ? "border-indigo-400/70 bg-indigo-500/15 text-indigo-100"
                  : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
              }`}
            >
              <div className="text-sm font-semibold leading-tight">{s.title}</div>
              <div className="text-xs text-slate-400 leading-tight mt-0.5">
                {s.composer} · {s.parts.length} {s.parts.length === 1 ? "parte" : "parti"}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
