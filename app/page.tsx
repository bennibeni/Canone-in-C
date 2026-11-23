"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SONGS } from "@/lib/songs";
import { readHiddenSongs } from "@/hooks/useHiddenSongs";

/** Pagina iniziale: porta al primo brano non escluso. */
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const hidden = readHiddenSongs();
    const first = SONGS.find((s) => !hidden.includes(s.slug)) ?? SONGS[0];
    router.replace(`/${first.slug}`);
  }, [router]);
  return <div className="min-h-screen bg-[#060912]" />;
}
