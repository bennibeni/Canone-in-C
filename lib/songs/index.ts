import type { Song } from "../score";
import { canone } from "./canone";
import { autumnLeaves } from "./autumn-leaves";
import { passacaglia } from "./passacaglia";

/** Elenco dei brani (ordine del menu). Per aggiungerne uno: crea il file in lib/songs e mettilo qui. */
export const SONGS: Song[] = [canone, autumnLeaves, passacaglia];

export const getSong = (slug: string) => SONGS.find((s) => s.slug === slug);
