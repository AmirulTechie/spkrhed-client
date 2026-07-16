"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

// Matches Loader.jsx's TOTAL_DURATION so the hero animation starts the
// instant the preloader finishes sliding away.
const LOADER_DURATION = 3.5;

const LEFT_LINES = ["WATCH", "PLANT"];
const RIGHT_LINES = ["THE SEED", "THE CLIENTS"];

function splitChars(line) {
  return line.split("").map((char, i) => (
    <span key={i} className="inline-block opacity-0">
      {char === " " ? " " : char}
    </span>
  ));
}

export default function Hero() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const climbRef = useRef(null);

  useLayoutEffect(() => {
    const chars = [
      ...leftRef.current.querySelectorAll("span span"),
      ...rightRef.current.querySelectorAll("span span"),
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: LOADER_DURATION });

      tl.to(chars, {
        opacity: 1,
        duration: 0.02,
        stagger: 0.035,
        ease: "none",
      }).fromTo(
        climbRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <Image
        src="/images/Home/hero-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />

      <Image
        src="/images/Home/small-spots.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-80"
      />

      <div className="relative z-10 mt-[-100] flex w-full max-w-[1800px] flex-col items-center text-center text-white">
        <p className="mb-15 flex items-center gap-3 font-poppins text-[clamp(18px,1.6888vw,32px)] font-semibold uppercase text-white/35">
  <Image
    src="/images/Home/banner-bullet.png"
    alt=""
    width={20}
    height={20}
  />
  This is a movement
</p>

        <div className="flex flex-col items-center">
          <div className="relative w-full h-[calc(2*clamp(48px,6.9444vw,160px))]">
            <div
              ref={leftRef}
              className="absolute top-0 right-[calc(50%+clamp(24px,5.55vw,90px))] flex flex-col items-start whitespace-nowrap font-anton-sc text-[clamp(48px,6.9444vw,160px)] leading-none"
            >
              {LEFT_LINES.map((line) => (
                <span key={line}>{splitChars(line)}</span>
              ))}
            </div>
            <div
              ref={rightRef}
              className="absolute top-0 left-[calc(50%+clamp(24px,5.55vw,90px))] flex flex-col items-start whitespace-nowrap font-anton-sc text-[clamp(48px,6.9444vw,160px)] leading-none"
            >
              {RIGHT_LINES.map((line) => (
                <span key={line}>{splitChars(line)}</span>
              ))}
            </div>
          </div>

          <div className="-mt-[clamp(12px,2.2222vw,50px)] overflow-hidden">
            <p
              ref={climbRef}
              className="font-playwrite-us-trad text-[clamp(40px,5.9028vw,130px)] text-[#AC40FF] z-9999 opacity-0"
            >
              climb to you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
