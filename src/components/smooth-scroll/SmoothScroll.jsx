"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GsapLenisBridge() {
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  return null;
}

// Lenis smooths window scroll itself, so the browser's native scroll
// restoration on back/forward races it and gets overwritten a frame later.
// This tracks each page's scroll offset live (keyed by pathname) and
// restores it on browser back/forward navigation instead of resetting to
// top. A fresh link click (push navigation, e.g. clicking a project card)
// still lands at the top of the new page, same as before.
function ScrollRestoration() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isPopRef = useRef(false);
  const positionsRef = useRef(new Map());

  useLenis(({ scroll }) => {
    positionsRef.current.set(pathname, scroll);
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      isPopRef.current = true;
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const saved = positionsRef.current.get(pathname);
    if (isPopRef.current && saved != null) {
      lenis.scrollTo(saved, { immediate: true });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    isPopRef.current = false;
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <GsapLenisBridge />
      <ScrollRestoration />
      {children}
    </ReactLenis>
  );
}
