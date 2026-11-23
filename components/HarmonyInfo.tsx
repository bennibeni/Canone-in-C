"use client";

import { useEffect, useRef, useState } from "react";
import { transposeChord, type KeyDef } from "@/lib/score";
import { chordName, type NameSystem } from "@/lib/notes";
import { HARMONY } from "@/lib/harmony";

/** nome dell'accordo nel sistema scelto, anche per gli accordi con il basso ("Bb/F" → "Si♭/Fa") */
const fullName = (ch: string, sys: NameSystem) =>
  ch
    .split("/")
    .map((p) => chordName(p, sys))
    .join("/");

/** Pulsante accanto al titolo: apre la descrizione dell'armonia del brano (se c'è). */
export function HarmonyButton({ slug, title, tkey, sys, transposed }: { slug: string; title: string; tkey: KeyDef; sys: NameSystem; transposed: boolean }) {
  const [open, setOpen] = useState(false);
  if (!HARMONY[slug]) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-500/50 text-emerald-200 hover:bg-emerald-500/10 align-middle"
        title="Com'è fatta l'armonia di questo brano"
      >
        Armonia
      </button>
      {open && <HarmonyModal slug={slug} title={title} tkey={tkey} sys={sys} transposed={transposed} onClose={() => setOpen(false)} />}
    </>
  );
}

function HarmonyModal({ slug, title, tkey, sys, transposed, onClose }: { slug: string; title: string; tkey: KeyDef; sys: NameSystem; transposed: boolean; onClose: () => void }) {
  const h = HARMONY[slug];
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}>
      <div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="harmony-title"
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl border border-slate-700 bg-[#0b1020] shadow-2xl focus:outline-none"
      >
        <div className="px-5 pt-5 pb-3 border-b border-slate-800 flex items-start gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-emerald-300 font-semibold">Armonia</div>
            <h2 id="harmony-title" className="text-xl font-bold text-slate-100">{title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Tonalità dello spartito: {h.key}</p>
          </div>
          <button onClick={onClose} aria-label="Chiudi" className="ml-auto text-slate-400 hover:text-slate-100 text-xl leading-none px-1">
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 space-y-5 text-[15px] leading-relaxed text-slate-300">
          <p className="text-slate-200">{h.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {h.concepts.map((c) => (
              <span key={c} className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-200">
                {c}
              </span>
            ))}
          </div>
          {transposed && (
            <p className="text-xs text-amber-200/90 rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2">
              Hai scelto un'altra tonalità: nel testo gli accordi sono nella tonalità dello spartito, nelle sequenze colorate in quella scelta.
            </p>
          )}
          {h.sections.map((s) => (
            <section key={s.title}>
              <h3 className="font-semibold text-slate-100 mb-1">{s.title}</h3>
              <p>{s.text}</p>
              {s.chords && (
                <div className="flex flex-wrap items-center gap-1 mt-2">
                  {s.chords.map((c, i) => (
                    <span key={i} className="flex items-center gap-1">
                      {i > 0 && <span className="text-slate-600 text-xs">→</span>}
                      <span className="rounded-md bg-slate-800/80 border border-slate-700 px-2 py-0.5 text-sm font-semibold text-emerald-300">
                        {fullName(transposeChord(c, tkey), sys)}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
