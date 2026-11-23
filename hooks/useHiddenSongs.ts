"use client";

import { useCallback, useSyncExternalStore } from "react";

// Brani esclusi dalle pagine dell'app, salvati nel browser. Si salvano gli ESCLUSI (non gli inclusi):
// così un brano aggiunto in futuro compare subito, senza dover essere attivato.
const KEY = "canone-in-do:hidden-songs";
const EVENT = "canone-in-do:hidden-songs-change";
const EMPTY: string[] = [];

let cacheRaw: string | null = null;
let cacheVal: string[] = EMPTY;

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cacheRaw) return cacheVal;
  cacheRaw = raw;
  try {
    const v = raw ? JSON.parse(raw) : [];
    cacheVal = Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : EMPTY;
  } catch {
    cacheVal = EMPTY;
  }
  return cacheVal;
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage); // altre schede
  window.addEventListener(EVENT, cb); // questa scheda
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, cb);
  };
}

/** lettura diretta (fuori dai componenti) */
export const readHiddenSongs = () => read();

export function saveHiddenSongs(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* archiviazione non disponibile: la scelta vale solo finché la pagina resta aperta */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** slug dei brani esclusi (lista vuota sul server e al primo render) */
export function useHiddenSongs(): [string[], (slugs: string[]) => void] {
  const hidden = useSyncExternalStore(subscribe, read, () => EMPTY);
  const save = useCallback((s: string[]) => saveHiddenSongs(s), []);
  return [hidden, save];
}
