"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback) {
  const mql = window.matchMedia("(hover: hover)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(hover: hover)").matches;
}

// SSR/first paint has no matchMedia, so this defaults to true, matching the
// desktop-authored look until the client snapshot resolves.
function getServerSnapshot() {
  return true;
}

// Touch devices have no hover, so treatments built for a mouse resting over
// one element at a time (e.g. "dim everything but the active card") need to
// know whether hover is actually supported rather than assuming it is.
export function useSupportsHover() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
