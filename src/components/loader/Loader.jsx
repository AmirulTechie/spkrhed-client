"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

const ENTRY_DURATION = 0.45;
const EXIT_DURATION = 0.45;
const TOTAL_DURATION = 3.5;
const HOLD_DURATION = TOTAL_DURATION - ENTRY_DURATION - EXIT_DURATION;

// Module scope (not a ref) so it survives React StrictMode's dev-only
// mount→cleanup→mount cycle: the phantom first run gets killed before its
// timeline ever ticks, so onStart below never fires for it and this only
// flips once the surviving timeline actually starts playing.
let hasPlayedInitialLoader = false;

export default function Loader() {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return undefined;

    setGifKey((key) => key + 1);

    const isFirstLoad = !hasPlayedInitialLoader;
    const tl = gsap.timeline({
      onStart: () => {
        hasPlayedInitialLoader = true;
      },
    });

    if (isFirstLoad) {
      // Overlay is already painted full-screen server-side (no flash of
      // the page underneath) — just hold, then reveal by sliding out.
      tl.set(overlay, { display: "flex", xPercent: 0 }).to(
        overlay,
        { xPercent: -100, duration: EXIT_DURATION, ease: "power3.in" },
        `+=${TOTAL_DURATION - EXIT_DURATION}`
      );
    } else {
      tl.set(overlay, { display: "flex", xPercent: 100 })
        .to(overlay, { xPercent: 0, duration: ENTRY_DURATION, ease: "power3.out" })
        .to(
          overlay,
          { xPercent: -100, duration: EXIT_DURATION, ease: "power3.in" },
          `+=${HOLD_DURATION}`
        );
    }

    tl.set(overlay, { display: "none" });

    return () => tl.kill();
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      <Image
        key={gifKey}
        src={`/loader/preloader.gif?r=${gifKey}`}
        alt=""
        width={480}
        height={270}
        unoptimized
        priority
        className="h-auto w-80 sm:w-md"
      />
    </div>
  );
}
