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
    <div>
      <span className="block">
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block">
            <span className="bloom-word inline-block opacity-0">
              {word}
            </span>
            {i < text.split(" ").length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
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
    const words = [...linesRef.current.querySelectorAll(".bloom-word")];

    const ctx = gsap.context(() => {
      // Each word starts scaled down, invisible, and blurred — ready to bloom.
      gsap.set(words, { opacity: 0, scale: 0.82, filter: "blur(12px)", transformOrigin: "center center" });

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

      // Words bloom outward from the center of the headline — scaling up,
      // fading in, and clearing their blur simultaneously.
      tl.to(words, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: {
          each: 0.12,
          from: "center",
        },
        ease: "power3.out",
      }).to(
        movementEls,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.032, from: movementEls.indexOf(anchorEl) },
        },
        "-=0.35"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-dvh w-full select-none items-center justify-center overflow-hidden bg-black py-24 lg:py-0">
      <Image
        src="/images/Home/hero-banner-plain.png"
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

      <div className="pointer-events-none absolute bottom-[9%] left-1/2 z-20 w-[clamp(420px,64vw,1160px)] -translate-x-1/2">
        <Image
          src="/images/Home/plant-out-bean.png"
          alt=""
          width={1536}
          height={1024}
          draggable={false}
          onDragStart={preventDrag}
          className="pointer-events-none h-auto w-full"
        />
      </div>

      <p className="absolute bottom-[clamp(16px,3vw,60px)] right-[clamp(24px,6vw,100px)] z-10 flex items-center gap-3 font-poppins text-[clamp(22px,2.8vw,52px)] font-bold uppercase text-white">
        <span ref={bulletRef} className="inline-flex opacity-0">
          <Image
            src="/images/Home/leaf-2.png"
            alt=""
            width={40}
            height={40}
            className="w-[clamp(26px,3.4vw,64px)] h-auto brightness-0 invert"
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

      <div className="relative z-10 mt-0 flex w-full max-w-[1800px] flex-col items-center px-[clamp(20px,5.5556vw,80px)] text-center text-white lg:max-w-none lg:px-[clamp(12px,1.5vw,32px)] lg:-mt-25">
        <div className="flex w-full flex-col items-center">
          <div
            ref={linesRef}
            className="relative flex w-full flex-col items-center lg:h-[calc(2*clamp(40px,10.2vw,224px))] lg:-translate-x-[clamp(16px,2.4vw,56px)]"
          >
            {HEADLINE_LINES.map(({ text, column, row }) => (
              <div
                key={text}
                className={`whitespace-nowrap font-anton-sc text-[clamp(46px,12.6vw,186px)] leading-none lg:text-[clamp(40px,10.2vw,224px)] lg:absolute ${
                  column === "left"
                    ? "lg:right-[calc(50%+clamp(24px,5.55vw,90px))]"
                    : "lg:left-[calc(50%+clamp(24px,5.55vw,90px))]"
                } ${row === 0 ? "lg:top-0" : "lg:top-[clamp(40px,10.2vw,224px)]"}`}
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
