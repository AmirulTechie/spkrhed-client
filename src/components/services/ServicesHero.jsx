"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Matches Loader.jsx's TOTAL_DURATION so the hero animation starts the
// instant the preloader finishes sliding away.
const LOADER_DURATION = 3.5;

const DESCRIPTION_TEXT =
  "SPKRHED is a LinkedIn-first agency. We turn your profile and presence into a system that starts real conversations with the right buyers, then back it with calls, email and paid to close them. LinkedIn is the front door. Everything else makes sure nobody leaves without booking";

const NOTE_TEXT =
  "B2B buyers ignore cold calls and delete cold email. But they answer the right message from a real person on LinkedIn. Every other service we run exists to feed or finish what LinkedIn starts.";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable,
// opacity-only span — the typewriter treatment used across the homepage
// sections, reused here for the left column copy.
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

export default function ServicesHero() {
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const descriptionRef = useRef(null);
  const noteRef = useRef(null);

  // Plays once on mount, timed to start right as the preloader finishes.
  // The SPKRHED logo is left untouched throughout — only the left column's
  // heading/eyebrow type on, while the right column's copy slides in from
  // the right.
  useLayoutEffect(() => {
    const typewriterChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
      ...eyebrowRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(typewriterChars, { opacity: 0 });
      gsap.set([descriptionRef.current, noteRef.current], {
        opacity: 0,
        x: 80,
      });

      const tl = gsap.timeline({ delay: LOADER_DURATION });

      tl.to(typewriterChars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.02,
        ease: "none",
      })
        .to(
          descriptionRef.current,
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.2",
        )
        .to(
          noteRef.current,
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden bg-black lg:h-screen lg:items-end">
      <Image
        src="/images/services/services-banner.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1023px) 180vh, 100vw"
        className="object-cover"
      />

      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="(max-width: 1023px) 190vh, 100vw"
        className="object-cover opacity-20"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-[#0f0f0f] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-b from-transparent to-[#0f0f0f]"
      />

      <div className="relative z-10 grid w-full grid-cols-1 items-end gap-y-8 px-8 py-[clamp(96px,14vw,120px)] text-white sm:px-12 sm:gap-y-10 lg:grid-cols-[490fr_598fr] lg:gap-x-[clamp(48px,14.4444vw,208px)] lg:px-16 lg:py-0 lg:pb-[clamp(24px,3.1944vw,46px)]">
        <div className="flex flex-col items-start">
          <Image
            src="/images/spkrhed-logo.png"
            alt="SPKRHED"
            width={358}
            height={58}
            className="mb-[clamp(16px,2.2222vw,40px)] h-auto w-[clamp(90px,11.875vw,171px)]"
          />

          <h1
            ref={headingRef}
            className="font-anton-sc text-[clamp(40px,5.5556vw,80px)] uppercase leading-[0.97]"
          >
            <span className="block text-[#AC40FF]">
              <TypewriterChars text="LINKEDIN-FIRST" />
            </span>
            <span className="block">
              <TypewriterChars text="GROWTH AGENCY" />
            </span>
          </h1>

          <p
            ref={eyebrowRef}
            className="mt-[clamp(12px,1.6667vw,24px)] font-poppins text-[clamp(16px,1.7361vw,25px)] font-medium uppercase"
          >
            <TypewriterChars text="Services & Capabilities" />
          </p>
        </div>

        <div className="flex flex-col items-start text-left lg:items-end lg:text-right">
          <p
            ref={descriptionRef}
            className="font-poppins text-[clamp(14px,1.1806vw,17px)] uppercase leading-[1.35] max-w-149.5 lg:leading-[1.1]"
          >
            {DESCRIPTION_TEXT}
          </p>

          <p
            ref={noteRef}
            className="mt-[clamp(8px,1.1111vw,16px)] font-poppins text-[clamp(11px,0.8333vw,12px)] italic uppercase leading-[1.35] text-white/60 max-w-134.75 lg:leading-[1.1]"
          >
            {NOTE_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}
