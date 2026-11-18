import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SongApp from "@/components/SongApp";
import { SONGS, getSong } from "@/lib/songs";

export function generateStaticParams() {
  return SONGS.map((s) => ({ song: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ song: string }> }): Promise<Metadata> {
  const { song } = await params;
  const s = getSong(song);
  return s ? { title: `${s.title} — impara a suonarlo`, description: `${s.title} di ${s.composer} al pianoforte, diviso in parti.` } : {};
}

export default async function Page({ params }: { params: Promise<{ song: string }> }) {
  const { song } = await params;
  if (!getSong(song)) notFound();
  // key: cambiando brano lo stato dell'app riparte da zero
  return <SongApp key={song} slug={song} />;
}
