import type { Song } from "../score";
import { canone } from "./canone";
import { autumnLeaves } from "./autumn-leaves";
import { passacaglia } from "./passacaglia";
import { preludioDo } from "./preludio-in-do";
import { preludioMiMinore } from "./preludio-mi-minore";
import { ariaQuartaCorda } from "./aria-sulla-quarta-corda";
import { alleluja } from "./alleluja";
import { cavalcataValchirie } from "./cavalcata-valchirie";
import { primaveraVivaldi } from "./primavera-vivaldi";
import { allegroMozart } from "./allegro-mozart";
import { romanzaBeethoven } from "./romanza-beethoven";
import { foglieMorte } from "./foglie-morte";
import { wonderfulWorld } from "./wonderful-world";
import { ceraUnaVolta } from "./cera-una-volta-in-america";
import { whiterShadeOfPale } from "./whiter-shade-of-pale";
import { addamsFamily } from "./addams-family";
import { misty } from "./misty";
import { SALERNO } from "./salerno";

/** Elenco dei brani (ordine del menu). Per aggiungerne uno: crea il file in lib/songs e mettilo qui. */
/** Brani principali (menu «Brani») */
export const MAIN_SONGS: Song[] = [canone, autumnLeaves, passacaglia, preludioDo, preludioMiMinore, cavalcataValchirie, primaveraVivaldi, ariaQuartaCorda, alleluja, allegroMozart, romanzaBeethoven, foglieMorte, wonderfulWorld, misty, whiterShadeOfPale, addamsFamily, ceraUnaVolta];

/** Tutti i brani: principali e «Brani facili» (Christian Salerno) */
export const SONGS: Song[] = [...MAIN_SONGS, ...SALERNO];

export const getSong = (slug: string) => SONGS.find((s) => s.slug === slug);
