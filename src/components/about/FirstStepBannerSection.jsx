"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINE_1 = "A journey of a thousand miles ";
const HEADING_LINE_2 = "begins with the first step.";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable,
// opacity-only span — the typewriter treatment used across the site.
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

export default function FirstStepBannerSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  // One-time entrance, gated behind ScrollTrigger the moment the section is
  // reached: the heading types on character by character while the
  // description slides in from the left at the same time.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, x: -100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(headingChars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.02,
        ease: "none",
      }).to(
        descriptionRef.current,
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
        "<",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-120 w-full overflow-hidden lg:h-[clamp(480px,57.2917vw,825px)] lg:min-h-0"
    >
      <Image
        src="/images/about/first-step-banner.png"
        alt="A lone figure walking toward a beanstalk bridge in a misty forest"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Full-height overlay: dark at top, fading to transparent by mid/lower banner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0f0f0f 0%, rgba(15,15,15,0) 100%)",
        }}
      />

      {/* Bottom overlay: transparent to dark, grounding the paragraph copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26.18%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,15,15,0) 0%, #0f0f0f 100%)",
        }}
      />

      {/* Below lg: normal stacked flow, heading/paragraph spread top-to-bottom over the
          full-bleed image. At lg+: this wrapper drops out of the box model (`lg:contents`)
          so the children become direct positioned children of the section again, letting
          their `lg:absolute` percentages resolve against the section's own height instead
          of this wrapper's — matching the Figma desktop frame exactly. */}
      <div className="relative z-10 flex h-full min-h-120 flex-col justify-between gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:contents">
        <p
          ref={headingRef}
          className="text-center font-anton-sc text-[clamp(26px,5.5556vw,80px)] uppercase leading-[1.05] lg:absolute lg:top-[8.48%] lg:left-[37.85%] lg:w-[57.08%] lg:text-right lg:leading-none"
        >
          <span className="text-white">
            <TypewriterChars text={HEADING_LINE_1} />
          </span>
          <span className="text-[#AC40FF]">
            <TypewriterChars text={HEADING_LINE_2} />
          </span>
        </p>

        <p
          ref={descriptionRef}
          className="font-poppins text-[clamp(15px,1.5278vw,22px)] leading-[1.18] text-white/70 lg:absolute lg:top-[78.18%] lg:left-[5.07%] lg:w-[61.18%]"
        >
          Every client we have ever grown started in exactly one place. One
          profile, rebuilt. One honest message, sent. One conversation that
          became a call, then a contract, then a referral. We are not here to
          sell you a hack that works for a week and costs you your name. We
          build momentum that still pays you back a year from now. The first
          step is always the hardest. We take it with you.
        </p>
      </div>
    </section>
  );
}
