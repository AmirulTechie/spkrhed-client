"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const preventDrag = (e) => e.preventDefault();

// Matches Loader.jsx's TOTAL_DURATION so the hero animation starts the
// instant the preloader finishes sliding away.
const LOADER_DURATION = 3.5;

// Row-major order so mobile (which stacks these in DOM order, no absolute
// positioning) reads "WATCH THE SEED / PLANT THE CLIENTS" line by line
// instead of grouping by column. Desktop re-pairs them into the two-column
// layout below via lg:absolute + explicit row offsets.
const HEADLINE_LINES = [
  { text: "WATCH", column: "left", row: 0 },
  { text: "THE SEED", column: "right", row: 0 },
  { text: "PLANT", column: "left", row: 1 },
  { text: "THE CLIENTS", column: "right", row: 1 },
];
const MOVEMENT_TEXT = "This is a movement";

function Line({ text }) {
  return (
    <div className="overflow-hidden">
      <span className="block">
        {text.split("").map((char, i) => (
          <span key={i} className="sprout-char inline-block opacity-0">
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function Hero() {
  const linesRef = useRef(null);
  const bulletRef = useRef(null);
  const movementCharRefs = useRef([]);

  useLayoutEffect(() => {
    const chars = [...linesRef.current.querySelectorAll(".sprout-char")];

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0, yPercent: 60, filter: "blur(6px)" });

      // "This is a movement" is coupled to the "T" — every other char and
      // the bullet start stacked on top of it, then pull apart outward in
      // both directions like train cars uncoupling, and decelerate into
      // their resting spots.
      const movementChars = movementCharRefs.current.filter(Boolean);
      const anchorEl = movementChars[0];
      const movementEls = [bulletRef.current, ...movementChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(movementEls, {
        opacity: 0,
        x: (_, target) => anchorLeft - target.getBoundingClientRect().left,
      });

      const tl = gsap.timeline({ delay: LOADER_DURATION });

      // Characters sprout up from a clipped baseline, sharpening from
      // blur into focus as they emerge — text growing out of the ground.
      tl.to(chars, {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.035,
        ease: "power2.out",
      }).to(
        movementEls,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.032, from: movementEls.indexOf(anchorEl) },
        },
        "-=0.25"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-dvh w-full select-none items-center justify-center overflow-hidden bg-black py-24 lg:py-0">
      <Image
        src="/images/Home/hero-banner-2.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1023px) 200vh, 100vw"
        draggable={false}
        onDragStart={preventDrag}
        className="pointer-events-none object-cover"
      />

      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="(max-width: 1023px) 190vh, 100vw"
        draggable={false}
        onDragStart={preventDrag}
        className="pointer-events-none object-cover opacity-20"
      />

      <Image
        src="/images/Home/small-spots.png"
        alt=""
        fill
        sizes="(max-width: 1023px) 180vh, 100vw"
        draggable={false}
        onDragStart={preventDrag}
        className="pointer-events-none object-cover opacity-80"
      />

      <p className="absolute bottom-[clamp(32px,6vw,100px)] right-[clamp(24px,6vw,100px)] z-10 flex items-center gap-3 font-poppins text-[clamp(18px,2.2vw,40px)] font-bold uppercase text-white">
        <span ref={bulletRef} className="inline-flex opacity-0">
          <Image
            src="/images/Home/leaf-2.png"
            alt=""
            width={30}
            height={30}
            className="brightness-0 invert"
          />
        </span>
        <span className="inline-block">
          {MOVEMENT_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                movementCharRefs.current[i] = el;
              }}
              className="inline-block opacity-0"
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      </p>

      <div className="relative z-10 mt-0 flex w-full max-w-[1800px] flex-col items-center px-[clamp(20px,5.5556vw,80px)] text-center text-white lg:-mt-25">
        <div className="flex w-full flex-col items-center">
          <div
            ref={linesRef}
            className="relative flex w-full flex-col items-center lg:h-[calc(2*clamp(30px,6.9444vw,160px))]"
          >
            {HEADLINE_LINES.map(({ text, column, row }) => (
              <div
                key={text}
                className={`whitespace-nowrap font-anton-sc text-[clamp(40px,11vw,160px)] leading-none lg:text-[clamp(30px,6.9444vw,160px)] lg:absolute ${
                  column === "left"
                    ? "lg:right-[calc(50%+clamp(24px,5.55vw,90px))]"
                    : "lg:left-[calc(50%+clamp(24px,5.55vw,90px))]"
                } ${row === 0 ? "lg:top-0" : "lg:top-[clamp(30px,6.9444vw,160px)]"}`}
              >
                <Line text={text} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
