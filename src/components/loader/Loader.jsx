"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useLoaderDuration } from "./LoaderTimingContext";

export default function Loader() {
  const pathname = usePathname();
  const { total, exit } = useLoaderDuration();
  const hold = total - exit;
  const overlayRef = useRef(null);
  const [gifKey, setGifKey] = useState(0);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return undefined;

    setGifKey((key) => key + 1);

    // Lenis drives scroll itself (wheel/touch on the window), so locking
    // body overflow alone doesn't stop it — the instance must be paused too.
    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const unlockScroll = () => {
      lenis?.start();
      document.body.style.overflow = overflow;
    };

    const tl = gsap.timeline({ onComplete: unlockScroll });

    // Loader takes over the screen instantly on every route change (no
    // slide-in), holds, then exits by sliding out to the right.
    tl.set(overlay, { display: "flex", xPercent: 0 }).to(
      overlay,
      { xPercent: 100, duration: exit, ease: "power3.in" },
      `+=${hold}`
    );

    tl.set(overlay, { display: "none" });

    return () => {
      tl.kill();
      unlockScroll();
    };
  }, [pathname, total, exit, hold, lenis]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-1000000 flex items-center justify-center bg-black"
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
