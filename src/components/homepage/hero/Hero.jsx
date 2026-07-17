"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Matches Loader.jsx's TOTAL_DURATION so the hero animation starts the
// instant the preloader finishes sliding away.
const LOADER_DURATION = 3.5;

const LEFT_LINES = ["WATCH", "PLANT"];
const RIGHT_LINES = ["THE SEED", "THE CLIENTS"];
const MOVEMENT_TEXT = "This is a movement";

// A gentle curl, like a vine tip unrolling into place rather than a
// straight vertical slide.
const CLIMB_PATH = [
  { x: 0, y: 90 },
  { x: 26, y: 55 },
  { x: -14, y: 22 },
  { x: 0, y: 0 },
];

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
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const climbRef = useRef(null);
  const bulletRef = useRef(null);
  const movementCharRefs = useRef([]);

  useLayoutEffect(() => {
    const chars = [
      ...leftRef.current.querySelectorAll(".sprout-char"),
      ...rightRef.current.querySelectorAll(".sprout-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0, yPercent: 60, filter: "blur(6px)" });
      gsap.set(climbRef.current, {
        opacity: 0,
        filter: "blur(6px)",
        rotate: -8,
        transformOrigin: "left bottom",
      });

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
      })
        .to(
          climbRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            rotate: 0,
            duration: 0.9,
            ease: "power2.out",
            motionPath: { path: CLIMB_PATH, curviness: 1.5 },
          },
          "-=0.25"
        )
        .to(movementEls, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.032, from: movementEls.indexOf(anchorEl) },
        });
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

      <div className="relative z-10 mt-0 flex w-full max-w-[1800px] flex-col items-center px-[clamp(20px,5.5556vw,80px)] text-center text-white lg:-mt-25">
        <p className="mb-8 flex items-center gap-3 font-poppins text-[clamp(16px,1.6888vw,32px)] font-semibold uppercase text-white/35 lg:mb-15">
          <span ref={bulletRef} className="inline-flex opacity-0">
            <Image
              src="/images/Home/banner-bullet.png"
              alt=""
              width={20}
              height={20}
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

        <div className="flex w-full flex-col items-center">
          <div className="relative flex w-full flex-col items-center lg:h-[calc(2*clamp(30px,6.9444vw,160px))]">
            <div
              ref={leftRef}
              className="flex flex-col items-center whitespace-nowrap font-anton-sc text-[clamp(30px,6.9444vw,160px)] leading-none lg:absolute lg:top-0 lg:right-[calc(50%+clamp(24px,5.55vw,90px))] lg:items-start"
            >
              {LEFT_LINES.map((line) => (
                <Line key={line} text={line} />
              ))}
            </div>
            <div
              ref={rightRef}
              className="flex flex-col items-center whitespace-nowrap font-anton-sc text-[clamp(30px,6.9444vw,160px)] leading-none lg:absolute lg:top-0 lg:left-[calc(50%+clamp(24px,5.55vw,90px))] lg:items-start"
            >
              {RIGHT_LINES.map((line) => (
                <Line key={line} text={line} />
              ))}
            </div>
          </div>

          <p
            ref={climbRef}
            className="-mt-[clamp(12px,2.2222vw,50px)] font-playwrite-us-trad text-[clamp(32px,5.9028vw,130px)] text-[#AC40FF] z-9999 opacity-0"
          >
            climb to you
          </p>
        </div>
      </div>
    </section>
  );
}
