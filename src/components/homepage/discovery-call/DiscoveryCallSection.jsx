"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Same curl used by Hero's "climb to you" text — a vine tip unrolling into
// place rather than a straight vertical slide. Reused here so "You'll Never
// Get Back" matches that motion exactly.
const CLIMB_PATH = [
  { x: 0, y: 90 },
  { x: 26, y: 55 },
  { x: -14, y: 22 },
  { x: 0, y: 0 },
];

const DESCRIPTION_TEXT =
  "One call. Within 30 days, your pipeline runs on two channels instead of zero. Qualified prospects book calls whether you posted today or not.";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable,
// opacity-only span — the same typewriter treatment used by Beanstalk's
// "Five Plantings" line and Pricing's heading/description.
function TypewriterChars({ text }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span key={ci} className="typewriter-char inline-block opacity-0">
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

export default function DiscoveryCallSection() {
  const sectionRef = useRef(null);
  const duckDesktopRef = useRef(null);
  const duckMobileRef = useRef(null);
  const birdRef = useRef(null);
  const headingDesktopRef = useRef(null);
  const headingMobileRef = useRef(null);
  const climbDesktopRef = useRef(null);
  const climbMobileRef = useRef(null);
  const descriptionDesktopRef = useRef(null);
  const descriptionMobileRef = useRef(null);

  // One-time entrance, gated behind ScrollTrigger the moment the section is
  // reached: the duck glides in from the section's bottom-right corner into
  // its resting spot, the bird pack rises up from below the cloud, the
  // heading types on character by character, "You'll Never Get Back" climbs
  // in with the same curl as Hero's "climb to you", and the description then
  // types on last. Desktop and mobile markup are both always mounted (shown
  // via responsive classes, not conditional rendering), so every phase
  // animates both copies together — only the visible one is ever seen.
  useLayoutEffect(() => {
    const duckEls = [duckDesktopRef.current, duckMobileRef.current].filter(
      Boolean,
    );
    const headingChars = [
      ...headingDesktopRef.current.querySelectorAll(".typewriter-char"),
      ...headingMobileRef.current.querySelectorAll(".typewriter-char"),
    ];
    const climbEls = [climbDesktopRef.current, climbMobileRef.current].filter(
      Boolean,
    );
    const descriptionChars = [
      ...descriptionDesktopRef.current.querySelectorAll(".typewriter-char"),
      ...descriptionMobileRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(duckEls, { opacity: 0, x: 260, y: 220 });
      gsap.set(birdRef.current, { opacity: 0, y: 240 });
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(climbEls, {
        opacity: 0,
        filter: "blur(6px)",
        rotate: -8,
        transformOrigin: "left bottom",
      });
      gsap.set(descriptionChars, { opacity: 0 });

      // Starts later than the rest of the homepage's "top 70%" convention —
      // this timeline runs long enough (duck + birds + heading + climb +
      // description, ~3s) that firing it that early meant it was mostly or
      // fully finished by the time the section actually scrolled into view.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(duckEls, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          birdRef.current,
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "<0.1",
        )
        .to(
          headingChars,
          { opacity: 1, duration: 0.01, stagger: 0.012, ease: "none" },
          "-=0.45",
        )
        .to(
          climbEls,
          {
            opacity: 1,
            filter: "blur(0px)",
            rotate: 0,
            duration: 0.55,
            ease: "power2.out",
            motionPath: { path: CLIMB_PATH, curviness: 1.5 },
          },
          "-=0.12",
        )
        .to(
          descriptionChars,
          { opacity: 1, duration: 0.01, stagger: 0.006, ease: "none" },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="discovery-call"
      className="relative overflow-hidden rounded-[clamp(24px,3.4722vw,50px)] bg-[#c983ff]"
    >
      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute bottom-[-20%] left-1/2 z-2 max-w-none -translate-x-1/2 select-none lg:-bottom-87.5 lg:w-[160%]"
      />

      {/* Desktop — pinned to a fixed 1440x860 canvas matching the Figma
          frame exactly, so the duck/bird/heading composition never
          reflows with viewport width; the section's overflow-hidden
          crops the excess symmetrically on narrower desktop windows
          instead of letting the layout scale. */}
      <div className="relative hidden lg:block">
        <div className="relative mx-auto w-360">
          <Image
            ref={duckDesktopRef}
            src="/images/Home/golden-duck.png"
            alt=""
            width={1244}
            height={1244}
            className="pointer-events-none absolute left-[60%] top-90 z-1 w-[43.19%] select-none"
          />

          <Image
            ref={birdRef}
            src="/images/Home/bird-group.png"
            alt=""
            width={552}
            height={290}
            className="pointer-events-none absolute left-[10.69%] top-[585.2px] z-10 w-[19.17%] select-none"
          />

          <div className="relative z-4 flex flex-col items-center px-11.5 pb-27.5 pt-32 text-center">
            <h2
              ref={headingDesktopRef}
              className="font-anton-sc text-[93px] uppercase leading-[0.96] text-black"
            >
              <span className="block">
                <TypewriterChars text="Every Month" />
              </span>
              <span className="block">
                <TypewriterChars text="Without A System Is" />
              </span>
              <span className="block">
                <TypewriterChars text="A Month Of Leads" />
              </span>
            </h2>

            <p
              ref={climbDesktopRef}
              className="-mt-9.25 font-alex-brush text-[95px] leading-[1.1] text-white"
            >
              You&rsquo;ll Never Get Back
            </p>

            <p
              ref={descriptionDesktopRef}
              className="mt-8 max-w-121.75 font-poppins text-[19px] font-semibold leading-[110%] text-black/70"
            >
              <TypewriterChars text={DESCRIPTION_TEXT} />
            </p>

            <button
              type="button"
              className="mt-38.25 w-96.75 cursor-pointer rounded-lg bg-[#ac40ff] py-3 font-poppins text-[24px] font-semibold uppercase leading-[1.1] text-[#101010]"
            >
              Book Your Discovery Call
            </button>

            <p className="mt-4.25 font-poppins text-[14px] font-medium text-black/70">
              30-minute call &nbsp;·&nbsp; No pressure &nbsp;·&nbsp; No pitch
              deck &nbsp;·&nbsp; Just honest strategy
            </p>
          </div>
        </div>
      </div>

      {/* Mobile — same content, simplified stacked layout */}
      <div className="relative z-4 flex flex-col items-center px-6 pb-14 pt-12 text-center lg:hidden">
        <h2
          ref={headingMobileRef}
          className="font-anton-sc text-[clamp(22px,8.2vw,30px)] uppercase leading-[0.96] text-black"
        >
          <span className="block">
            <TypewriterChars text="Every Month" />
          </span>
          <span className="block">
            <TypewriterChars text="Without A System Is" />
          </span>
          <span className="block">
            <TypewriterChars text="A Month Of Leads" />
          </span>
        </h2>

        <p
          ref={climbMobileRef}
          className="-mt-1 font-alex-brush text-[clamp(26px,9.5vw,34px)] leading-[1.1] text-white"
        >
          You&rsquo;ll Never Get Back
        </p>

        <Image
          ref={duckMobileRef}
          src="/images/Home/golden-duck.png"
          alt=""
          width={1244}
          height={1244}
          className="pointer-events-none mt-4 w-36 select-none sm:w-44"
        />

        <p
          ref={descriptionMobileRef}
          className="mt-4 max-w-sm font-poppins text-[15px] font-semibold leading-snug text-black/70"
        >
          <TypewriterChars text={DESCRIPTION_TEXT} />
        </p>

        <button
          type="button"
          className="mt-8 w-full max-w-xs cursor-pointer rounded-lg bg-[#ac40ff] py-3 font-poppins text-base font-semibold uppercase leading-[1.1] text-[#101010]"
        >
          Book Your Discovery Call
        </button>

        <p className="mt-3 max-w-xs font-poppins text-xs font-medium leading-normal text-black/70">
          30-minute call &nbsp;·&nbsp; No pressure &nbsp;·&nbsp; No pitch deck
          &nbsp;·&nbsp; Just honest strategy
        </p>
      </div>
    </section>
  );
}
