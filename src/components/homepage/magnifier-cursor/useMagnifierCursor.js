"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ZOOM = 1.7;

// Desktop-only cursor replacement: a circular glass lens that follows the
// mouse and shows a zoomed copy of whatever sits under it, panned so the
// exact point under the cursor stays centered — the math a real magnifying
// glass does optically. Shared by any homepage section that wants the
// effect (see CastleSection, Hero) so the lens/pan math stays in one place.
export default function useMagnifierCursor() {
  const sectionRef = useRef(null);
  const lensRef = useRef(null);
  const panRef = useRef(null);
  const scaleBoxRef = useRef(null);
  const quickLensX = useRef(null);
  const quickLensY = useRef(null);
  const quickPanX = useRef(null);
  const quickPanY = useRef(null);

  // quickTo (rather than plain state-driven transforms) so the lens and its
  // zoomed content chase the raw mousemove stream at 60fps, in lockstep,
  // without React re-renders on every pixel.
  useLayoutEffect(() => {
    gsap.set(lensRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });
    quickLensX.current = gsap.quickTo(lensRef.current, "x", {
      duration: 0.45,
      ease: "power3",
    });
    quickLensY.current = gsap.quickTo(lensRef.current, "y", {
      duration: 0.45,
      ease: "power3",
    });
    quickPanX.current = gsap.quickTo(panRef.current, "x", {
      duration: 0.45,
      ease: "power3",
    });
    quickPanY.current = gsap.quickTo(panRef.current, "y", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const updatePosition = (e) => {
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const lensSize = lensRef.current.offsetWidth;
    const relX = e.clientX - sectionRect.left;
    const relY = e.clientY - sectionRect.top;

    quickLensX.current?.(e.clientX);
    quickLensY.current?.(e.clientY);

    if (scaleBoxRef.current) {
      scaleBoxRef.current.style.width = `${sectionRect.width}px`;
      scaleBoxRef.current.style.height = `${sectionRect.height}px`;
    }

    quickPanX.current?.(lensSize / 2 - relX * ZOOM);
    quickPanY.current?.(lensSize / 2 - relY * ZOOM);
  };

  const handleMouseEnter = (e) => {
    updatePosition(e);
    gsap.to(lensRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lensRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return {
    sectionRef,
    lensRef,
    panRef,
    scaleBoxRef,
    zoom: ZOOM,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseMove: updatePosition,
      onMouseLeave: handleMouseLeave,
    },
  };
}
