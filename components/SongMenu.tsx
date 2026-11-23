"use client";

import Link from "next/link";
import { songTitle, type Song } from "@/lib/score";
import { MAIN_SONGS } from "@/lib/songs";
import { SALERNO } from "@/lib/songs/salerno";
import { chordName } from "@/lib/notes";
import { useHiddenSongs } from "@/hooks/useHiddenSongs";

/** Menu dei brani: colonna verticale a sinistra su schermi larghi, riga orizzontale su telefono.
 *  Due sezioni: «Brani» e «Brani facili» (Christian Salerno). */
export function SongMenu({ current }: { current: string }) {
  const [hidden] = useHiddenSongs();
  // il brano aperto resta nel menu anche se escluso (attenuato), per non perdere il segno
  const visible = (list: Song[]) => list.filter((s) => !hidden.includes(s.slug) || s.slug === current);
  const main = visible(MAIN_SONGS);
  const easy = visible(SALERNO);

  const item = (s: Song) => {
    const active = s.slug === current;
    const excluded = hidden.includes(s.slug);
    return (
      <Link
        key={s.slug}
        href={`/${s.slug}`}
        aria-current={active ? "page" : undefined}
        title={excluded ? "Brano escluso: lo vedi perché è aperto" : undefined}
        className={`shrink-0 rounded-xl px-3 py-2 border transition ${excluded ? "opacity-50 " : ""}${
          active
            ? "border-indigo-400/70 bg-indigo-500/15 text-indigo-100"
            : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
        }`}
      >
        <div className="text-sm font-semibold leading-tight">{songTitle(s, (t) => chordName(t, "it"))}</div>
        <div className="text-xs text-slate-400 leading-tight mt-0.5">
          {s.composer} · {s.parts.length} {s.parts.length === 1 ? "parte" : "parti"}
        </div>
      </Link>
    );
  };

  const heading = (text: string, extra = "") => (
    <div className={`shrink-0 self-center px-2 text-[11px] uppercase tracking-widest text-slate-500 font-semibold lg:self-auto lg:px-2 lg:pt-4 lg:pb-1 ${extra}`}>{text}</div>
  );

  return (
    <aside className="border-b border-slate-800 bg-[#05070f] lg:border-b-0 lg:border-r lg:w-56 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <nav aria-label="Brani" className="flex gap-1.5 overflow-x-auto px-3 py-2 lg:flex-col lg:gap-1 lg:px-2 lg:py-0 lg:pb-4">
        {main.length > 0 && heading("Brani")}
        {main.map(item)}
        {easy.length > 0 && heading("Brani facili", "lg:border-t lg:border-slate-800 lg:mt-3")}
        {easy.map(item)}
        <Link href="/confronto-pianoplayer" aria-current={current === "confronto-pianoplayer" ? "page" : undefined} className="shrink-0 rounded-xl border border-teal-800 px-3 py-2 text-sm text-teal-200 hover:bg-teal-950 lg:mt-3">Confronto PianoPlayer</Link>
      </nav>
    </aside>
  );
}
