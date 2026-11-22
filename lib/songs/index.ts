import type { Song } from "../score";
import { canone } from "./canone";
import { autumnLeaves } from "./autumn-leaves";
import { passacaglia } from "./passacaglia";
import { preludioDo } from "./preludio-in-do";
import { preludioMiMinore } from "./preludio-mi-minore";

/** Elenco dei brani (ordine del menu). Per aggiungerne uno: crea il file in lib/songs e mettilo qui. */
export const SONGS: Song[] = [canone, autumnLeaves, passacaglia, preludioDo, preludioMiMinore];

export const getSong = (slug: string) => SONGS.find((s) => s.slug === slug);
