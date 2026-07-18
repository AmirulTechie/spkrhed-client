"use client";

import { useEffect } from "react";
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

function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
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
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  );
}
