"use client";

import { createContext, useContext, useRef } from "react";
import { usePathname } from "next/navigation";

// Full preloader treatment used for a real first load / cross-section
// navigation (Home <-> Services <-> About, etc).
const FULL_DURATION = { total: 3.5, exit: 0.45 };

// Users click through many case studies in one visit, so the full 3.5s
// preloader between /work and /work/[slug] reads as sluggish rather than
// intentional — this is used only when both the previous and next pathname
// are within the work section.
const WORK_TRANSITION_DURATION = { total: 0.6, exit: 0.3 };

const LoaderTimingContext = createContext(FULL_DURATION);

export function LoaderTimingProvider({ children }) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(undefined);
  const durationRef = useRef(FULL_DURATION);

  // Derived-during-render (not an effect) so the value is already correct
  // by the time Loader and the page heroes read it via context in this same
  // render pass, instead of racing their own layout effects against a
  // parent effect that hasn't committed yet.
  if (prevPathnameRef.current !== pathname) {
    const isWorkToWork =
      prevPathnameRef.current?.startsWith("/work") && pathname.startsWith("/work");
    durationRef.current = isWorkToWork ? WORK_TRANSITION_DURATION : FULL_DURATION;
    prevPathnameRef.current = pathname;
  }

  return (
    <LoaderTimingContext.Provider value={durationRef.current}>
      {children}
    </LoaderTimingContext.Provider>
  );
}

export function useLoaderDuration() {
  return useContext(LoaderTimingContext);
}
