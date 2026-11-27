"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { songTitle, type Song } from "@/lib/score";
import { MAIN_SONGS, STANDARDS, FROM_MIDI } from "@/lib/songs";
import { SALERNO } from "@/lib/songs/salerno";
import { BLUES } from "@/lib/songs/blues";
import { chordName } from "@/lib/notes";
import { useHiddenSongs } from "@/hooks/useHiddenSongs";

/** Menu dei brani: colonna verticale a sinistra su schermi larghi, riga orizzontale su telefono.
 *  Tre sezioni a fisarmonica: «Brani», «Brani facili» (Christian Salerno), «Blues», «Standards» e «Da MIDI».
 *  All'apertura è aperta la sezione del brano corrente; le sezioni aperte sono ricordate nel browser. */
type SectionId = "brani" | "facili" | "blues" | "standards" | "midi";
const STORE = "canone-in-do:menu-open";

export function SongMenu({ current }: { current: string }) {
  const [hidden] = useHiddenSongs();
  // il brano aperto resta nel menu anche se escluso (attenuato), per non perdere il segno
  const visible = (list: Song[]) => list.filter((s) => !hidden.includes(s.slug) || s.slug === current);
  const main = visible(MAIN_SONGS);
  const easy = visible(SALERNO);
  const blues = visible(BLUES);
  const standards = visible(STANDARDS);
  const midi = visible(FROM_MIDI);

  const sectionOf = (slug: string): SectionId =>
    FROM_MIDI.some((x) => x.slug === slug) ? "midi" : STANDARDS.some((x) => x.slug === slug) ? "standards" : BLUES.some((x) => x.slug === slug) ? "blues" : SALERNO.some((x) => x.slug === slug) ? "facili" : "brani";
  const [open, setOpen] = useState<SectionId[]>(() => [sectionOf(current)]);
  // sezioni aperte salvate nel browser; quella del brano corrente si apre sempre
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? "null") as SectionId[] | null;
      if (Array.isArray(saved)) setOpen([...new Set([...saved, sectionOf(current)])]);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  const toggle = (id: SectionId) =>
    setOpen((o) => {
      const next = o.includes(id) ? o.filter((x) => x !== id) : [...o, id];
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {}
      return next;
    });

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

  const section = (id: SectionId, label: string, list: Song[], extra = "") => {
    if (list.length === 0) return null;
    const isOpen = open.includes(id);
    const hasCurrent = list.some((x) => x.slug === current);
    return (
      <div key={id} className={`contents lg:block ${extra}`}>
        <button
          type="button"
          onClick={() => toggle(id)}
          aria-expanded={isOpen}
          className={`shrink-0 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] uppercase tracking-widest font-semibold hover:bg-slate-800/40 lg:w-full lg:mt-2 ${
            hasCurrent && !isOpen ? "text-indigo-300" : "text-slate-400"
          }`}
        >
          <span aria-hidden className={`inline-block transition-transform ${isOpen ? "rotate-90" : ""}`}>▸</span>
          <span className="flex-1 text-left">{label}</span>
          <span className="normal-case tracking-normal font-normal text-slate-500">{list.length}</span>
        </button>
        {isOpen && <div className="contents lg:flex lg:flex-col lg:gap-1 lg:mt-1">{list.map(item)}</div>}
      </div>
    );
  };

  return (
    <aside className="border-b border-slate-800 bg-[#05070f] lg:border-b-0 lg:border-r lg:w-56 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <nav aria-label="Brani" className="flex gap-1.5 overflow-x-auto px-3 py-2 lg:flex-col lg:gap-1 lg:px-2 lg:pt-2 lg:pb-4">
        {section("brani", "Brani", main)}
        {section("facili", "Brani facili", easy, "lg:border-t lg:border-slate-800 lg:mt-2")}
        {section("blues", "Blues", blues, "lg:border-t lg:border-slate-800 lg:mt-2")}
        {section("standards", "Standards", standards, "lg:border-t lg:border-slate-800 lg:mt-2")}
        {section("midi", "Da MIDI", midi, "lg:border-t lg:border-slate-800 lg:mt-2")}
        <Link href="/confronto-pianoplayer" aria-current={current === "confronto-pianoplayer" ? "page" : undefined} className="shrink-0 rounded-xl border border-teal-800 px-3 py-2 text-sm text-teal-200 hover:bg-teal-950 lg:mt-3">Confronto PianoPlayer</Link>
      </nav>
    </aside>
  );
}
