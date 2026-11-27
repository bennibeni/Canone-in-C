"use client";

import { useEffect, useRef, useState } from "react";
import { songTitle } from "@/lib/score";
import { SONGS, MAIN_SONGS, STANDARDS, FROM_MIDI } from "@/lib/songs";
import { SALERNO } from "@/lib/songs/salerno";
import { BLUES } from "@/lib/songs/blues";
import type { Song } from "@/lib/score";
import { chordName } from "@/lib/notes";
import { useHiddenSongs } from "@/hooks/useHiddenSongs";

/** Pulsante dell'intestazione: apre la finestra per scegliere quali brani mostrare nell'app. */
export function SongPickerButton() {
  const [open, setOpen] = useState(false);
  const [hidden] = useHiddenSongs();
  const shown = SONGS.length - SONGS.filter((s) => hidden.includes(s.slug)).length;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-slate-700 text-slate-300 hover:border-slate-500 inline-flex items-center gap-1.5"
        title="Scegli quali brani mostrare"
      >
        <span aria-hidden>☰</span> Brani <span className="text-slate-500 font-normal">{shown}/{SONGS.length}</span>
      </button>
      {open && <SongPickerModal onClose={() => setOpen(false)} />}
    </>
  );
}

function SongPickerModal({ onClose }: { onClose: () => void }) {
  const [hidden, save] = useHiddenSongs();
  // bozza: si salva solo con "Salva"
  const [draft, setDraft] = useState(() => new Set(SONGS.map((s) => s.slug).filter((s) => !hidden.includes(s))));
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      e.stopPropagation(); // lo Spazio non deve far partire la musica mentre la finestra è aperta
    };
    window.addEventListener("keydown", onKey, true);
    dialog.current?.focus();
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const toggle = (slug: string) =>
    setDraft((d) => {
      const n = new Set(d);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });
  const none = draft.size === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}>
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="song-picker-title"
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl border border-slate-700 bg-[#0b1020] shadow-2xl focus:outline-none"
      >
        <div className="px-5 pt-5 pb-3 border-b border-slate-800">
          <h2 id="song-picker-title" className="text-lg font-bold text-slate-100">Brani da mostrare</h2>
          <p className="text-sm text-slate-400 mt-1">
            Togli la spunta ai brani che vuoi escludere dal menu. La scelta resta salvata in questo browser.
          </p>
          <div className="flex gap-2 mt-3 text-sm">
            <button onClick={() => setDraft(new Set(SONGS.map((s) => s.slug)))} className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 hover:border-slate-500">
              Tutti
            </button>
            <button onClick={() => setDraft(new Set())} className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 hover:border-slate-500">
              Nessuno
            </button>
            <span className="ml-auto self-center text-slate-500">
              {draft.size} di {SONGS.length}
            </span>
          </div>
        </div>
        <div className="overflow-y-auto px-3 py-2 flex-1">
          {([["Brani", MAIN_SONGS], ["Brani facili", SALERNO], ["Blues", BLUES], ["Standards", STANDARDS], ["Da MIDI", FROM_MIDI]] as [string, Song[]][]).map(([label, list]) => {
            const all = list.every((s) => draft.has(s.slug));
            return (
              <div key={label} className="mb-2">
                <div className="flex items-center px-2 pt-2 pb-1">
                  <span className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{label}</span>
                  <button
                    onClick={() =>
                      setDraft((d) => {
                        const n = new Set(d);
                        list.forEach((s) => (all ? n.delete(s.slug) : n.add(s.slug)));
                        return n;
                      })
                    }
                    className="ml-auto text-xs text-indigo-300 hover:text-indigo-200"
                  >
                    {all ? "togli tutti" : "metti tutti"}
                  </button>
                </div>
                <ul>
                  {list.map((s) => {
                    const on = draft.has(s.slug);
                    return (
                      <li key={s.slug}>
                        <label className={`flex items-start gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-slate-800/50 ${on ? "" : "opacity-55"}`}>
                          <input type="checkbox" checked={on} onChange={() => toggle(s.slug)} className="mt-1 h-4 w-4 accent-indigo-400" />
                          <span>
                            <span className="block text-sm font-semibold text-slate-100">{songTitle(s, (t) => chordName(t, "it"))}</span>
                            <span className="block text-xs text-slate-400">{s.composer}</span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 border-t border-slate-800 flex items-center gap-2">
          {none && <span className="text-xs text-amber-300">Scegli almeno un brano.</span>}
          <button onClick={onClose} className="ml-auto px-3 py-1.5 rounded-lg text-sm border border-slate-700 text-slate-300 hover:border-slate-500">
            Annulla
          </button>
          <button
            disabled={none}
            onClick={() => {
              save(SONGS.map((s) => s.slug).filter((s) => !draft.has(s)));
              onClose();
            }}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-indigo-400/70 bg-indigo-500/20 text-indigo-100 hover:bg-indigo-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
}
