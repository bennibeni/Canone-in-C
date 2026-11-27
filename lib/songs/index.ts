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
import { emozioni } from "./emozioni";
import { quannoChiove } from "./quanno-chiove";
import { heyJude } from "./hey-jude";
import { godfather } from "./godfather";
import { hallelujah } from "./hallelujah";
import { letItBe } from "./let-it-be";
import { lifeOnMars } from "./life-on-mars";
import { noWomanNoCry } from "./no-woman-no-cry";
import { pinkPanther } from "./pink-panther";
import { ridersOnTheStorm } from "./riders-on-the-storm";
import { hotelCalifornia } from "./hotel-california";
import { knockinOnHeavensDoor } from "./knockin-on-heavens-door";
import { letsSpendTheNightTogether } from "./lets-spend-the-night-together";
import { smokeOnTheWater } from "./smoke-on-the-water";
import { stairwayToHeaven } from "./stairway-to-heaven";
import { cocaine } from "./cocaine";
import { tomAndJerryShow } from "./tom-and-jerry-show";
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

/** ordine alfabetico per titolo (senza l'articolo iniziale «The») */
const sortKey = (t: string) => t.replace(/^The\s+/i, "");
const byTitle = (list: Song[]) => [...list].sort((x, y) => sortKey(x.title).localeCompare(sortKey(y.title), "it", { sensitivity: "base" }));

/** Standards (menu «Standards») */
export const STANDARDS: Song[] = byTitle([georgia, bodyAndSoul, fever, loverMan, summertime]);

/** Brani ricostruiti da file MIDI (menu «Da MIDI») */
export const FROM_MIDI: Song[] = byTitle([emozioni, quannoChiove, heyJude, godfather, hallelujah, letItBe, lifeOnMars, noWomanNoCry, pinkPanther, ridersOnTheStorm, hotelCalifornia, knockinOnHeavensDoor, letsSpendTheNightTogether, smokeOnTheWater, stairwayToHeaven, cocaine, tomAndJerryShow]);

/** Tutti i brani: principali, «Brani facili» (Christian Salerno), «Blues», «Standards» e «Da MIDI» */
export const SONGS: Song[] = [...MAIN_SONGS, ...SALERNO, ...BLUES, ...STANDARDS, ...FROM_MIDI];

export const getSong = (slug: string) => SONGS.find((s) => s.slug === slug);
