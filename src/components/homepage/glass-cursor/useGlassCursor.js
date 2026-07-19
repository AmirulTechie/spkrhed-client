"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Desktop-only cursor replacement: a circular frosted-glass disc that
// follows the mouse with a slight easing lag, standing in for the native
// cursor rather than zooming or distorting the content beneath it. Shared
// by any homepage section that wants the effect (see CastleSection, Hero).
export default function useGlassCursor() {
  const sectionRef = useRef(null);
  const lensRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);

  useLayoutEffect(() => {
    gsap.set(lensRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
    });
    quickX.current = gsap.quickTo(lensRef.current, "x", {
      duration: 0.45,
      ease: "power3",
    });
    quickY.current = gsap.quickTo(lensRef.current, "y", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const updatePosition = (e) => {
    quickX.current?.(e.clientX);
    quickY.current?.(e.clientY);
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
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseMove: updatePosition,
      onMouseLeave: handleMouseLeave,
    },
  };
}
