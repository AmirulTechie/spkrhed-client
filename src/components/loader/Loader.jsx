"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

const EXIT_DURATION = 0.45;
const TOTAL_DURATION = 3.5;
const HOLD_DURATION = TOTAL_DURATION - EXIT_DURATION;

export default function Loader() {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const [gifKey, setGifKey] = useState(0);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return undefined;

    setGifKey((key) => key + 1);

    const tl = gsap.timeline();

    // Loader takes over the screen instantly on every route change (no
    // slide-in), holds, then exits by sliding out to the right.
    tl.set(overlay, { display: "flex", xPercent: 0 }).to(
      overlay,
      { xPercent: 100, duration: EXIT_DURATION, ease: "power3.in" },
      `+=${HOLD_DURATION}`
    );

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
