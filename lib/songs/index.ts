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
import { georgia } from "./georgia-on-my-mind";
import { bodyAndSoul } from "./body-and-soul";
import { fever } from "./fever";
import { loverMan } from "./lover-man";
import { summertime } from "./summertime";
import { SALERNO } from "./salerno";
import { BLUES } from "./blues";

/** Elenco dei brani (ordine del menu). Per aggiungerne uno: crea il file in lib/songs e mettilo qui. */
/** Brani principali (menu «Brani») */
export const MAIN_SONGS: Song[] = [canone, autumnLeaves, passacaglia, preludioDo, preludioMiMinore, cavalcataValchirie, primaveraVivaldi, ariaQuartaCorda, alleluja, allegroMozart, romanzaBeethoven, foglieMorte, wonderfulWorld, misty, whiterShadeOfPale, addamsFamily, ceraUnaVolta];

/** Standards (menu «Standards») */
export const STANDARDS: Song[] = [georgia, bodyAndSoul, fever, loverMan, summertime];

/** Tutti i brani: principali, «Brani facili» (Christian Salerno), «Blues» e «Standards» */
export const SONGS: Song[] = [...MAIN_SONGS, ...SALERNO, ...BLUES, ...STANDARDS];

export const getSong = (slug: string) => SONGS.find((s) => s.slug === slug);
