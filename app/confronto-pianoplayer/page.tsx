"use client";

import { useEffect, useMemo, useState } from "react";
import samples from "@/lib/pianoplayer-comparison.json";
import { buildPart, type Hand, type ScoreNote } from "@/lib/score";
import { getSong } from "@/lib/songs";
import { usePlayer } from "@/hooks/usePlayer";
import { rangeFor, spelledName } from "@/lib/notes";
import { Keyboard } from "@/components/Keyboard";
import { SongMenu } from "@/components/SongMenu";

type Sample = (typeof samples)[number];
const button = "rounded-lg border border-slate-600 px-3 py-2 hover:bg-slate-800 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-teal-300";

function Phrase({ sample, hand }: { sample: Sample; hand: Hand }) {
  const [step, setStep] = useState(0);
  const [tempo, setTempo] = useState(45);
  const [repeat, setRepeat] = useState(false);
  const [verdict, setVerdict] = useState("");
  useEffect(() => { try { setVerdict(localStorage.getItem(`pianoplayer:${sample.id}:${hand}`) ?? ""); } catch {} }, [sample.id, hand]);
  const song = getSong(sample.slug)!;
  const built = useMemo(() => {
    const source = buildPart(song, { ...song.parts[0], measures: song.parts[0].measures.slice(sample.firstMeasure - 1, sample.firstMeasure + 1) });
    const notes: ScoreNote[] = sample.notes.filter(n => n.hand === hand).map(n => ({ ...n, hand }));
    return { ...source, notes, rests: source.rests.filter(n => n.hand === hand), length: 32, minMidi: Math.min(...notes.map(n => n.midi)), maxMidi: Math.max(...notes.map(n => n.midi)) };
  }, [sample, song, hand]);
  const player = usePlayer({ built, tempo, mode: "listen", practice: { R: false, L: false }, loop: null, repeat, metronome: false, countIn: false });
  const onsets = useMemo(() => [...new Set(built.notes.map(n => n.start))].sort((a,b) => a-b), [built]);
  const current = player.playing ? player.active : built.notes.filter(n => n.start <= onsets[step] && n.start + n.dur > onsets[step]);
  const alternative = (notes: ScoreNote[]) => notes.map(n => ({ ...n, finger: sample.notes.find(r => r.hand === n.hand && r.start === n.start && r.midi === n.midi)?.alternative ?? undefined }));
  const [lo,hi] = rangeFor(built.minMidi, built.maxMidi);
  const chooseStep = (i: number) => { player.pause(); setStep(i); player.seek(onsets[i]); };
  const changed = built.notes.filter(n => n.finger !== alternative([n])[0].finger).length;
  const save = (value: string) => {
    setVerdict(value);
    try { localStorage.setItem(`pianoplayer:${sample.id}:${hand}`, value); } catch {}
  };
  return <div className="space-y-5">
    <div className="rounded-xl border border-slate-700 p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button className={button} onClick={() => { if(player.playing) player.pause(); else void player.play(); }}>{player.playing ? "Pausa" : "Ascolta la frase"}</button>
        <button className={button} onClick={() => chooseStep(0)}>Dall’inizio</button>
        <label className="flex items-center gap-2">Tempo <input aria-label="Tempo in BPM" type="range" min="25" max="90" value={tempo} onChange={e=>setTempo(Number(e.target.value))}/> {tempo} BPM</label>
        <label className="flex gap-2"><input type="checkbox" checked={repeat} onChange={e=>setRepeat(e.target.checked)}/> Ripeti</label>
      </div>
      <p className="text-sm text-slate-400">L’audio è identico: cambiano soltanto le dita. Prova prima A e poi B sul tuo pianoforte, allo stesso tempo.</p>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <button className={button} disabled={step===0 || player.playing} onClick={()=>chooseStep(step-1)}>← Precedente</button>
      <span aria-live="polite">{player.playing ? `Battuta ${sample.firstMeasure + player.measure}` : `Attacco ${step+1} di ${onsets.length} · battuta ${sample.firstMeasure + Math.floor(onsets[step]/16)}`}</span>
      <button className={button} disabled={step===onsets.length-1 || player.playing} onClick={()=>chooseStep(step+1)}>Successivo →</button>
    </div>
    <div className="grid gap-4 xl:grid-cols-2">
      {[{name:"A · Diteggiatura dell’app",notes:current},{name:"B · PianoPlayer",notes:alternative(current)}].map(panel=><section key={panel.name} className="min-w-0 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
        <h2 className="text-lg font-semibold mb-3">{panel.name}</h2>
        <div className="overflow-x-auto"><div style={{minWidth: Math.max(420,(hi-lo)*17)}}><Keyboard lo={lo} hi={hi} active={panel.notes} targets={[]} userKeys={player.userKeys} sys="it" labels="all" onPress={player.userPress} onRelease={player.userRelease}/></div></div>
        <p className="mt-3 min-h-6 text-sm" aria-live="polite">{panel.notes.length ? panel.notes.map(n=>`${spelledName(n.label,"it")} → ${n.finger ?? "dito non assegnato"}`).join(" · ") : "Pausa"}</p>
      </section>)}
    </div>
    <p className="text-sm text-slate-400">1 pollice · 2 indice · 3 medio · 4 anulare · 5 mignolo. {changed} note su {built.notes.length} hanno indicazioni diverse.</p>
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm text-left"><caption className="text-left p-3 font-semibold">Sequenza completa · clicca un attacco per vederlo sulla tastiera</caption><thead className="bg-slate-800"><tr>{["Battuta / movimento","Note","A · App","B · PianoPlayer"].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>
      {onsets.map((t,i)=>{const notes=built.notes.filter(n=>n.start===t);const other=alternative(notes);const diff=notes.some((n,j)=>n.finger!==other[j].finger);return <tr key={t} className={`${!player.playing && i===step ? "bg-teal-950" : ""} border-t border-slate-800`}><td className="p-2"><button disabled={player.playing} className="p-1 underline decoration-slate-500" onClick={()=>chooseStep(i)}>{sample.firstMeasure+Math.floor(t/16)} / {1+(t%16)/4}</button></td><td className="p-3">{notes.map(n=>spelledName(n.label,"it")).join(" + ")}</td><td className="p-3">{notes.map(n=>n.finger??"—").join(" / ")}</td><td className={`p-3 ${diff?"text-amber-300 font-bold":""}`}>{other.map(n=>n.finger??"—").join(" / ")}{diff && <span className="ml-2 text-xs font-normal">diversa</span>}</td></tr>})}
      </tbody></table>
    </div>
    <section className="rounded-xl border border-slate-700 p-4 space-y-3"><h2 className="font-semibold">Quale ti risulta più comoda?</h2><p className="text-sm text-slate-400">Ripeti ciascuna proposta tre volte. Valuta tensione, salti della mano e continuità tra gli attacchi. Una differenza non è un errore.</p><div className="flex flex-wrap gap-2">{["A · App","B · PianoPlayer","Equivalenti","Da riprovare"].map(v=><button aria-pressed={verdict===v} className={`${button} ${verdict===v?"bg-teal-900 border-teal-300":""}`} key={v} onClick={()=>save(v)}>{v}</button>)}</div>{verdict && <p role="status" className="text-sm text-teal-300">Valutazione: {verdict}</p>}</section>
  </div>;
}

export default function ComparisonPage(){
 const [id,setId]=useState(samples[0].id);
 const [hand,setHand]=useState<Hand>("L");
 const sample=samples.find(s=>s.id===id)!;
 return <div className="min-h-screen text-slate-100 lg:flex"><SongMenu current="confronto-pianoplayer"/><main className="min-w-0 flex-1 max-w-7xl mx-auto p-4 md:p-8 space-y-6"><header><p className="text-sm text-teal-300 mb-2">Laboratorio di diteggiatura</p><h1 className="text-3xl font-bold">App e PianoPlayer sulla tastiera</h1><p className="mt-3 text-slate-400">Quattro frasi di due battute dalla prima parte, nelle tonalità dei dati: Do maggiore per Canone, La minore per Passacaglia. Confronta una mano alla volta, senza cambiare gli spartiti dei brani.</p></header><div className="flex flex-wrap gap-4"><label className="grid gap-2">Frase<select className="rounded-lg border border-slate-600 bg-slate-900 p-2" value={id} onChange={e=>setId(e.target.value)}>{samples.map(s=><option key={s.id} value={s.id}>{s.title} · battute {s.firstMeasure}–{s.firstMeasure+1}</option>)}</select></label><label className="grid gap-2">Mano<select className="rounded-lg border border-slate-600 bg-slate-900 p-2" value={hand} onChange={e=>setHand(e.target.value as Hand)}><option value="R">Destra</option><option value="L">Sinistra</option></select></label></div><Phrase key={`${id}:${hand}`} sample={sample} hand={hand}/></main></div>;
}
