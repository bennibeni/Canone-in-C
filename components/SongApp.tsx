"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KEYS, buildFull, buildPart, keyTonic, relativeKey, songTitle, transposeChord, type Song } from "@/lib/score";
import { getSong } from "@/lib/songs";
import { SongMenu } from "./SongMenu";
import { chordName, rangeFor, spelledName, type LabelMode, type NameSystem } from "@/lib/notes";
import { preloadPiano, setSoundMode, type SoundMode } from "@/lib/audio";
import { usePlayer, type FinishResult, type HandSet, type Mode } from "@/hooks/usePlayer";
import { Keyboard, HAND_COLOR } from "./Keyboard";
import { FallingNotes } from "./FallingNotes";
import { MeasureGrid } from "./MeasureGrid";
import { SheetMusic } from "./SheetMusic";
import { VideoPanel } from "./VideoPanel";

const STEPS: { title: string; desc: string; mode: Mode; practice: HandSet }[] = [
  { title: "Ascolta", desc: "Ascolta la parte intera seguendo le note che scendono.", mode: "listen", practice: { R: true, L: false } },
  { title: "Mano sinistra", desc: "Modalità attesa: suoni tu la sinistra, l'app la destra.", mode: "wait", practice: { R: false, L: true } },
  { title: "Mano destra", desc: "Modalità attesa: suoni tu la destra, l'app la sinistra.", mode: "wait", practice: { R: true, L: false } },
  { title: "Mani insieme", desc: "Modalità attesa con entrambe le mani, fino in fondo.", mode: "wait", practice: { R: true, L: true } },
];


export default function SongApp({ slug }: { slug: string }) {
  const song = getSong(slug)!;
  const nParts = song.parts.length;
  const [partIdx, setPartIdx] = useState(0); // 0..nParts-1 = parti, nParts = brano completo
  const baseKey = song.baseKey ?? "C";
  const [keyId, setKeyId] = useState(baseKey);
  const key = KEYS.find((k) => k.id === keyId) ?? KEYS[0];
  // trasposizione dai dati (scritti in baseKey) alla tonalità scelta
  const tkey = useMemo(() => relativeKey(baseKey, key), [baseKey, key]);
  const built = useMemo(
    () => (partIdx < nParts ? buildPart(song, song.parts[partIdx], tkey) : buildFull(song, tkey)),
    [song, nParts, partIdx, tkey]
  );
  const part = built.part;

  const [mode, setMode] = useState<Mode>("listen");
  const [practice, setPractice] = useState<HandSet>({ R: true, L: false });
  const [tempoPct, setTempoPct] = useState(80);
  const [loop, setLoop] = useState<[number, number] | null>(null);
  const [repeat, setRepeat] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [countIn, setCountIn] = useState(true);
  const [sys, setSys] = useState<NameSystem>("it");
  const [labelMode, setLabelMode] = useState<LabelMode>("names");
  const [keyLabels, setKeyLabels] = useState<"c" | "all" | "none">("c");
  const [zoom, setZoom] = useState(13);
  const [toast, setToast] = useState<string | null>(null);
  const [sound, setSound] = useState<SoundMode>("synth");
  const [singleRow, setSingleRow] = useState(true); // spartito: una riga alla volta
  const [loadState, setLoadState] = useState<{ done: number; total: number } | null>(null);
  const loading = useRef<Promise<void> | null>(null);

  const tempo = Math.round((part.tempo * tempoPct) / 100);

  // tonalità scelta: ricordata nel browser
  useEffect(() => {
    try {
      const k = localStorage.getItem(`canone-in-do:key:${slug}`);
      if (k && KEYS.some((x) => x.id === k)) setKeyId(k);
    } catch {}
  }, [slug]);
  const chooseKey = (id: string) => {
    setKeyId(id);
    try {
      localStorage.setItem(`canone-in-do:key:${slug}`, id);
    } catch {}
  };
  const progression = useMemo(() => song.progression.map((c) => chordName(transposeChord(c, tkey), sys)), [song, tkey, sys]);
  const keyLabel = (id: string) => `${chordName(keyTonic(song, id), sys)} ${song.mode === "minor" ? "minore" : "maggiore"}`;

  useEffect(() => {
    setLoop(null);
    setZoom(built.notes.some((n) => n.dur === 1) ? 22 : 13);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partIdx]);

  const onFinish = useCallback(
    (r: FinishResult) => {
      setToast(r.mode === "wait" ? "Parte completata! 🎉" : "Ascolto completato");
      setTimeout(() => setToast(null), 3500);
    },
    []
  );

  const player = usePlayer({ built, tempo, mode, practice, loop, repeat, metronome, countIn, onFinish });
  const { playing, pause, seek, userPress, userRelease, pressTargets } = player;

  // suono: sintetizzato o campioni .wav del pianoforte (scelta ricordata nel browser)
  useEffect(() => {
    try {
      const v = localStorage.getItem("canone-in-do:sound");
      if (v === "piano" || v === "synth") setSound(v);
    } catch {}
  }, []);
  const chooseSound = (v: SoundMode) => {
    setSound(v);
    try {
      localStorage.setItem("canone-in-do:sound", v);
    } catch {}
  };
  // con i campioni: carica solo le note della parte/tonalità corrente
  useEffect(() => {
    setSoundMode(sound);
    if (sound !== "piano") {
      setLoadState(null);
      loading.current = null;
      return;
    }
    let alive = true;
    const job = preloadPiano(
      built.notes.map((n) => n.midi),
      (done, total) => alive && setLoadState({ done, total })
    ).catch(() => {});
    loading.current = job;
    return () => {
      alive = false;
    };
  }, [sound, built]);
  const play = useCallback(async () => {
    if (loading.current) await loading.current;
    await player.play();
  }, [player.play]); // eslint-disable-line react-hooks/exhaustive-deps

  const [lo, hi] = useMemo(() => rangeFor(built.minMidi, built.maxMidi), [built]);

  // Spazio: in attesa suona la nota richiesta, altrimenti play/pausa
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key !== " " || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "TEXTAREA" || el.tagName === "VIDEO" || (el.tagName === "INPUT" && (el as HTMLInputElement).type === "text"))) return;
      e.preventDefault();
      if (e.repeat) return;
      if (playing && mode === "wait") pressTargets();
      else if (playing) pause();
      else void play();
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [playing, mode, play, pause, pressTargets]);


  const startStep = (i: number) => {
    const s = STEPS[i];
    setMode(s.mode);
    setPractice(s.practice);
    setLoop(null);
  };

  // video: solo in Do maggiore (sono registrati in Do); quando suona guida spartito e note
  const showVideo =
    key.id === song.videoKey &&
    (partIdx < nParts ? !!song.parts[partIdx].videos?.length : song.parts.some((p) => p.videos?.length));
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoJump, setVideoJump] = useState<{ m: number; n: number } | null>(null);
  useEffect(() => {
    if (!showVideo) setVideoPlaying(false);
  }, [showVideo]);

  const selectMeasure = (m: number, extend: boolean) => {
    if (extend && loop) setLoop([Math.min(loop[0], m), Math.max(loop[1], m)]);
    else if (loop && loop[0] === m && loop[1] === m) setLoop(null);
    else setLoop([m, m]);
    setVideoJump({ m: extend && loop ? Math.min(loop[0], m) : m, n: Date.now() });
  };

  // salto da applicare dopo il cambio di loop (il player riparte dall'inizio quando il loop cambia)
  const pendingSeek = useRef<number | null>(null);
  useEffect(() => {
    if (pendingSeek.current != null) {
      seek(pendingSeek.current);
      pendingSeek.current = null;
    }
  }, [loop, seek]);

  // battute: si vedono al massimo due righe, quelle della pagina in cui si trova la musica:
  // 8 battute (4 per riga), oppure 4 (2 per riga) se nella pagina ci sono semicrome;
  // nel brano completo le pagine sono dentro la parte corrente
  const isFull = partIdx === nParts;
  const starts = built.partStarts;
  const gridPart = isFull ? starts.filter((st) => st <= player.measure).length - 1 : 0;
  const partRange: [number, number] = isFull
    ? [starts[gridPart], starts[gridPart + 1] ?? built.part.measures.length]
    : [0, built.part.measures.length];
  const hasSixteenths = (a: number, b: number) => built.notes.some((n) => n.dur === 1 && n.measure >= a && n.measure < b);
  const pages: [number, number][] = [];
  for (let m = partRange[0]; m < partRange[1]; ) {
    const end8 = Math.min(partRange[1], m + 8);
    const end = hasSixteenths(m, end8) ? Math.min(partRange[1], m + 4) : end8;
    pages.push([m, end]);
    m = end;
  }
  const pageStarts = pages.map((pg) => pg[0]);
  const gridPage = Math.max(0, pages.findIndex(([a, b]) => player.measure >= a && player.measure < b));
  const gridRange = pages[gridPage];
  const pageLabel = (a: number) => {
    const [, end] = pages.find((pg) => pg[0] === a)!;
    const l = (m: number) => built.labels[m];
    return a === end - 1 ? l(a) : `${l(a)}–${l(end - 1)}`;
  };
  /** va a una battuta (in pausa); se c'è un loop lo toglie prima */
  const goTo = (m: number) => {
    if (playing) pause();
    if (loop) {
      pendingSeek.current = m * 16; // dopo che il loop è stato tolto
      setLoop(null);
    } else seek(m * 16);
  };
  const dense = hasSixteenths(gridRange[0], gridRange[1]);

  // note in esecuzione (o attese) da far lampeggiare nei pannelli delle battute
  const targetNotes = useMemo(
    () =>
      player.waitPos == null
        ? []
        : built.notes.filter((n) => n.start === player.waitPos && practice[n.hand]).sort((a, b) => a.midi - b.midi),
    [built, player.waitPos, practice]
  );
  const live = useMemo(() => {
    const s = new Set<string>();
    if (playing || videoPlaying) for (const n of player.active) s.add(n.hand + ":" + n.start);
    for (const n of targetNotes) s.add(n.hand + ":" + n.start);
    return s;
  }, [player.active, targetNotes, playing, videoPlaying]);
  const waitingForUser = mode === "wait" && player.targets.length > 0;

  return (
    <div className="min-h-screen bg-[#060912] text-slate-200 lg:flex">
      <SongMenu current={slug} />
      <div className="flex-1 min-w-0">
      <header className="border-b border-slate-800/80 bg-[#070b17]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-end gap-x-6 gap-y-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-violet-300 to-teal-200 bg-clip-text text-transparent">
              {songTitle(song, (t) => chordName(t, sys), key.id)}
            </h1>
            <p className="text-sm text-slate-400">
              {song.composer} · {song.progressionLabel ?? "progressione"}{" "}
              <span className="text-emerald-300 font-semibold">{progression.join(" → ")}</span>
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Tonalità</span>
            <select
              value={keyId}
              onChange={(e) => chooseKey(e.target.value)}
              className="bg-slate-900 border border-indigo-400/60 rounded-lg px-2 py-1.5 font-semibold text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {KEYS.map((k) => (
                <option key={k.id} value={k.id}>
                  {keyLabel(k.id)}
                  {k.id === song.videoKey && song.parts.some((p) => p.videos?.length) ? " · video" : ""}
                </option>
              ))}
            </select>
          </label>
          <nav className="flex flex-wrap gap-1.5 ml-auto" aria-label="Parti">
            {[...song.parts.map((p) => p.title), ...(nParts > 1 ? ["Brano completo"] : [])].map((t, i) => {
              return (
                <button
                  key={t}
                  onClick={() => setPartIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${
                    partIdx === i
                      ? "bg-indigo-500/20 border-indigo-400/70 text-indigo-100"
                      : "border-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5 space-y-5">
        {/* fascia 1: note che scendono + trasporto | parte, percorso, come suonare
            (il riquadro delle note si allunga fino all'altezza della colonna destra) */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px] items-stretch">
          <section className="flex flex-col gap-4 min-w-0">
            <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl shadow-black/40">
              <div className="relative flex-1 flex flex-col">
                <FallingNotes
                  built={built}
                  posRef={player.posRef}
                  targetsRef={player.targetsRef}
                  lo={lo}
                  hi={hi}
                  sys={sys}
                  labelMode={labelMode}
                  mode={mode}
                  practice={practice}
                  loop={loop}
                  zoom={zoom}
                  height={340}
                  playing={playing}
                  onSeek={seek}
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
                  {waitingForUser && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-sm font-bold shadow">
                      {targetNotes
                        .map((n) => (labelMode === "fingers" && n.finger ? `${spelledName(n.label, sys, true)} dito ${n.finger}` : spelledName(n.label, sys, true)))
                        .join(" + ")}{" "}
                      · premi Spazio
                    </span>
                  )}
                  {toast && <span className="px-3 py-1 rounded-full bg-teal-400 text-slate-950 text-sm font-bold shadow">{toast}</span>}
                </div>
              </div>
              <div className="border-t border-slate-800 bg-slate-900">
                <Keyboard
                  lo={lo}
                  hi={hi}
                  active={player.active}
                  targets={player.targets}
                  userKeys={player.userKeys}
                  sys={sys}
                  spelling={key.spelling}
                  labels={keyLabels}
                  onPress={userPress}
                  onRelease={userRelease}
                />
              </div>
            </div>

            {/* ---------------- trasporto ---------------- */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => (playing ? pause() : void play())}
                className="w-12 h-12 rounded-full bg-teal-400 text-slate-950 text-xl font-bold grid place-items-center hover:bg-teal-300 shadow-lg shadow-teal-500/20"
                aria-label={playing ? "Pausa" : "Suona"}
                title="Spazio"
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <button
                onClick={() => {
                  pause();
                  seek(loop ? loop[0] * 16 : 0);
                }}
                className="w-10 h-10 rounded-full border border-slate-600 text-slate-200 grid place-items-center hover:border-slate-400"
                aria-label="Torna all'inizio"
                title="Torna all'inizio"
              >
                ⏮
              </button>
              <div className="text-sm leading-tight">
                <div className="text-slate-400 text-xs">Battuta</div>
                <div className="font-bold tabular-nums">
                  {built.labels[player.measure] === "Levare" ? "levare" : built.labels[player.measure]} / {built.labels.filter((l) => l !== "Levare").at(-1)}
                </div>
              </div>

              <div className="flex rounded-lg overflow-hidden border border-slate-700 text-sm font-semibold ml-1">
                {(["listen", "wait"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-2 ${mode === m ? "bg-indigo-500/30 text-indigo-100" : "text-slate-300 hover:bg-slate-800"}`}
                  >
                    {m === "listen" ? "Ascolto" : "Attesa (suono io)"}
                  </button>
                ))}
              </div>

              {mode === "wait" && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">Suono io</span>
                  <div className="flex rounded-lg overflow-hidden border border-slate-700 font-semibold">
                    {(
                      [
                        ["L", "Sinistra", { R: false, L: true }],
                        ["R", "Destra", { R: true, L: false }],
                        ["both", "Entrambe", { R: true, L: true }],
                      ] as [string, string, HandSet][]
                    ).map(([k, label, hs]) => {
                      const on = practice.R === hs.R && practice.L === hs.L;
                      const color = k === "both" ? "#e0e7ff" : HAND_COLOR[k as "R" | "L"];
                      return (
                        <button
                          key={k}
                          onClick={() => setPractice(hs)}
                          className={`px-3 py-2 ${on ? "bg-slate-700" : "hover:bg-slate-800"}`}
                          style={{ color: on ? color : "#94a3b8" }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm grow min-w-[220px]">
                <span className="text-slate-400 whitespace-nowrap">Tempo</span>
                <input
                  type="range"
                  min={30}
                  max={120}
                  step={5}
                  value={tempoPct}
                  onChange={(e) => setTempoPct(+e.target.value)}
                  className="grow accent-teal-400"
                />
                <span className="tabular-nums font-semibold w-24 text-right">
                  {tempoPct}% · {tempo}
                  <span className="text-slate-500 text-xs"> bpm</span>
                </span>
              </label>

            </div>

          </section>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="text-xs uppercase tracking-wider text-violet-300 font-semibold">{part.title}</div>
              <h2 className="text-lg font-bold">{part.subtitle}</h2>
              <p className="text-sm text-slate-400 mb-3">{part.focus}</p>
              {key.id !== baseKey && (
                <p className="text-xs text-amber-200/90 bg-amber-500/10 border border-amber-400/30 rounded-lg px-2.5 py-2 mb-3">
                  Suggerimenti e diteggiature sono pensati per {keyLabel(baseKey)}: in {keyLabel(key.id)} i nomi delle note
                  citati cambiano e sui tasti neri può servire una diteggiatura diversa.
                </p>
              )}
              <ul className="space-y-2 text-sm text-slate-300">
                {part.tips.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-300 mt-0.5">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {partIdx < nParts && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold">Percorso di studio</h3>
                </div>
                <p className="text-xs text-slate-400 mb-3">Clicca un passo per impostarlo.</p>
                <ol className="space-y-1.5">
                  {STEPS.map((s, i) => {
                    const current =
                      s.mode === mode && (s.mode === "listen" || (s.practice.R === practice.R && s.practice.L === practice.L));
                    return (
                      <li key={s.title}>
                        <button
                          onClick={() => startStep(i)}
                          aria-pressed={current}
                          className={`w-full text-left flex items-start gap-3 rounded-xl px-2.5 py-2 border transition ${
                            current
                              ? "border-indigo-400/80 bg-indigo-500/15"
                              : "border-transparent hover:border-slate-700 hover:bg-slate-800/50"
                          }`}
                        >
                          <span
                            className={`mt-0.5 w-6 h-6 shrink-0 rounded-full grid place-items-center text-xs font-bold ${
                              current ? "bg-indigo-400 text-slate-950" : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <div className="grow">
                            <div className="text-sm font-semibold flex items-center gap-2">
                              {s.title}
                              {current && <span className="text-[10px] uppercase tracking-wide text-indigo-200">in corso</span>}
                            </div>
                            <div className="text-xs text-slate-400">{s.desc}</div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            <details className="group rounded-2xl border border-slate-800 bg-slate-900/70 text-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-2xl p-4 font-semibold hover:bg-slate-800/40 [&::-webkit-details-marker]:hidden">
                <h3>Come suonare</h3>
                <span aria-hidden="true" className="text-slate-400 transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <p className="px-4 pb-4 text-xs text-slate-400">
                In modalità attesa le note si fermano sul tasto evidenziato in arancione: premi <kbd className="kbd">Spazio</kbd> (o
                clicca il tasto) per suonarle e andare avanti. Negli altri momenti <kbd className="kbd">Spazio</kbd> avvia e mette in
                pausa. In pausa puoi scorrere le note con la rotellina.
              </p>
            </details>
          </aside>
        </div>
        {/* fascia 2: battute + spartito, uno sotto l'altro senza spazi | video (solo in Do) + opzioni */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px] items-start">
          <section className="space-y-5 min-w-0">
            {/* ---------------- battute ---------------- */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-semibold text-slate-200">Battute</h2>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="w-3 h-3 rounded" style={{ background: HAND_COLOR.R }} /> Mano destra
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="w-3 h-3 rounded" style={{ background: HAND_COLOR.L }} /> Mano sinistra
                  </span>
                  {isFull && (
                    <div className="flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold">
                      {song.parts.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(starts[i])}
                          className={`px-2.5 py-1 ${gridPart === i ? "bg-indigo-500/30 text-indigo-100" : "text-slate-400 hover:bg-slate-800"}`}
                        >
                          Parte {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                  {pageStarts.length > 1 && (
                    <div className="flex rounded-lg overflow-hidden border border-slate-700 text-xs font-semibold" aria-label="Gruppi di battute">
                      {pageStarts.map((a, i) => (
                        <button
                          key={a}
                          onClick={() => goTo(a)}
                          className={`px-2.5 py-1 tabular-nums ${gridPage === i ? "bg-teal-400/20 text-teal-100" : "text-slate-400 hover:bg-slate-800"}`}
                        >
                          {pageLabel(a)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Clic su una battuta per ripeterla in loop · Maiusc+clic per allargare il loop
                  {loop && (
                    <button onClick={() => setLoop(null)} className="ml-2 text-amber-300 underline">
                      togli loop ({built.labels[loop[0]]}–{built.labels[loop[1]]})
                    </button>
                  )}
                </p>
              </div>
              <MeasureGrid
                built={built}
                measure={player.measure}
                loop={loop}
                sys={sys}
                labelMode={labelMode}
                live={live}
                onSelect={selectMeasure}
                showParts={isFull}
                dense={dense}
                range={gridRange}
              />
              {labelMode === "fingers" && (
                <p className="mt-2 text-xs text-slate-400">Dita: 1 pollice · 2 indice · 3 medio · 4 anulare · 5 mignolo</p>
              )}
            </div>

            {/* ---------------- spartito ---------------- */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h2 className="font-semibold text-slate-200">Spartito</h2>
                <p className="text-xs text-slate-400">Le note che suonano si illuminano · clic su una battuta per il loop</p>
              </div>
              <SheetMusic
                built={built}
                live={live}
                measure={player.measure}
                playing={playing || videoPlaying}
                labelMode={labelMode}
                loop={loop}
                onSelect={selectMeasure}
                singleRow={singleRow}
                onGoToMeasure={(m) => {
                  if (playing) pause();
                  seek(m * 16);
                }}
              />
            </div>
          </section>
          <aside className="space-y-4">
            {showVideo && (
              <VideoPanel
                song={song}
                partIdx={partIdx}
                partStarts={starts}
                appPlaying={playing}
                onVideoPlay={() => {
                  pause();
                  setVideoPlaying(true);
                }}
                onVideoStop={() => setVideoPlaying(false)}
                onVideoPos={seek}
                loop={loop}
                jump={videoJump}
                onSelectPart={setPartIdx}
              />
            )}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 text-sm">
              <h3 className="font-semibold">Opzioni</h3>
              <div className="grid grid-cols-2 gap-2">
                <Toggle label="Metronomo" value={metronome} onChange={setMetronome} />
                <Toggle label="Battuta d'attacco" value={countIn} onChange={setCountIn} />
                <Toggle label="Ripeti" value={repeat} onChange={setRepeat} />
                <Toggle label="Spartito: una riga" value={singleRow} onChange={setSingleRow} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20">Suono</span>
                <Seg
                  value={sound}
                  onChange={(v) => chooseSound(v as SoundMode)}
                  options={[
                    ["synth", "Sintetizzato"],
                    ["piano", "Pianoforte"],
                  ]}
                />
              </div>
              {sound === "piano" && loadState && loadState.done < loadState.total && (
                <div className="text-xs text-slate-400">
                  Caricamento campioni… {loadState.done}/{loadState.total}
                  <div className="h-1 mt-1 rounded bg-slate-800 overflow-hidden">
                    <div className="h-full bg-teal-400" style={{ width: `${(100 * loadState.done) / loadState.total}%` }} />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20">Sulle note</span>
                <Seg
                  value={labelMode}
                  onChange={(v) => setLabelMode(v as LabelMode)}
                  options={[
                    ["names", "Nomi"],
                    ["fingers", "Dita"],
                    ["none", "Niente"],
                  ]}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20">Nomi</span>
                <Seg
                  value={sys}
                  onChange={(v) => setSys(v as NameSystem)}
                  options={[
                    ["it", "Do Re Mi"],
                    ["en", "C D E"],
                  ]}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20">Tasti</span>
                <Seg
                  value={keyLabels}
                  onChange={(v) => setKeyLabels(v as "c" | "all" | "none")}
                  options={[
                    ["c", "Solo Do"],
                    ["all", "Tutti"],
                    ["none", "Nessuno"],
                  ]}
                />
              </div>
              <label className="flex items-center gap-2">
                <span className="text-slate-400 w-20">Zoom</span>
                <input
                  type="range"
                  min={6}
                  max={26}
                  value={zoom}
                  onChange={(e) => setZoom(+e.target.value)}
                  className="grow accent-indigo-400"
                />
              </label>
            </div>

          </aside>
        </div>
      </main>

      <ArrangerCredit song={song} />
      <footer className="projects-footer">
        <a href="https://links-page-bennibeni.vercel.app/">
          <span aria-hidden="true">← </span>All projects
        </a>
      </footer>
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`px-2 py-1.5 rounded-lg border text-xs font-semibold text-left ${
        value ? "border-teal-300/70 text-teal-200 bg-teal-400/10" : "border-slate-700 text-slate-400"
      }`}
    >
      {value ? "● " : "○ "}
      {label}
    </button>
  );
}

function Seg({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-slate-700 grow">
      {options.map(([v, l]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`flex-1 px-2 py-1 text-xs font-semibold ${value === v ? "bg-indigo-500/30 text-indigo-100" : "text-slate-400 hover:bg-slate-800"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/** riconoscimento all'autore dell'arrangiamento e dei video */
function ArrangerCredit({ song }: { song: Song }) {
  const a = song.arranger;
  if (!a) return <p className="max-w-7xl mx-auto px-4 pb-4 text-xs text-slate-500">{song.credit}</p>;
  return (
    <section className="max-w-7xl mx-auto px-4 pb-5" aria-label="Riconoscimenti">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-400">
        <p>
          {song.credit} di{" "}
          <a href={a.links[0]?.url ?? a.videosUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-200 hover:text-teal-200">
            {a.name}
          </a>
          {a.fullName && <> ({a.fullName})</>}, <span className="text-slate-300">{a.handle}</span>
          {a.about && <> — {a.about}</>}. I video e l&apos;arrangiamento sono suoi{a.permission ? <> e sono usati con il suo permesso</> : null}: se l&apos;app ti è utile, segui il suo lavoro.
        </p>
        <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {a.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-teal-300/90 hover:text-teal-200 underline underline-offset-2">
              {l.label}
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}
