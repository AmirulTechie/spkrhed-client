"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Masks a word behind overflow-hidden and exposes it via ".reveal-word" so
// the entrance timeline can grab every word with one querySelectorAll and
// stagger them, mirroring the sprout-char pattern used elsewhere on the
// homepage but at word granularity (this heading stacks one word per line).
function RevealWord({ children, className = "" }) {
  return (
    <span className={`inline-block overflow-hidden align-top ${className}`}>
      <span className="reveal-word inline-block opacity-0">{children}</span>
    </span>
  );
}

export default function ScaleNotStrategy() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leafCornerRef = useRef(null);
  const leafCenterRef = useRef(null);
  const leafRightRef = useRef(null);

  // One-time entrance, gated behind ScrollTrigger: the stacked words sprout
  // up one after another, and each leaf drifts in from whichever section
  // border it sits closest to (top-left corner, top edge, right edge).
  useLayoutEffect(() => {
    const words = [...headingRef.current.querySelectorAll(".reveal-word")];

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, yPercent: 110, filter: "blur(6px)" });

      // Rotation is set explicitly (rather than left to the Tailwind
      // rotate-* classes) because GSAP owns the full transform once it
      // animates x/y on these images — an untouched rotate value would
      // otherwise be silently dropped.
      gsap.set(leafCornerRef.current, {
        opacity: 0,
        x: -140,
        y: -140,
        rotate: 65,
      });
      gsap.set(leafCenterRef.current, { opacity: 0, y: -160, rotate: 335 });
      gsap.set(leafRightRef.current, { opacity: 0, x: 170, rotate: 225 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(words, {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
      })
        .to(
          leafCornerRef.current,
          { opacity: 1, x: 0, y: 0, rotate: 90, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        )
        .to(
          leafCenterRef.current,
          { opacity: 1, y: 0, rotate: 360, duration: 0.9, ease: "power3.out" },
          "<0.1",
        )
        .to(
          leafRightRef.current,
          { opacity: 1, x: 0, rotate: 250, duration: 0.9, ease: "power3.out" },
          "<0.1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-[clamp(72px,12.5vw,180px)]"
    >
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-70"
      />

      <Image
        ref={leafCornerRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute left-[8%] top-[4%] w-[clamp(56px,10.1vw,146px)] select-none"
      />
      <Image
        ref={leafCenterRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute left-[50%] top-[42%] z-10 w-[clamp(40px,6.9vw,99px)] select-none blur-[1.5px]"
      />
      <Image
        ref={leafRightRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute right-[8%] top-[62%] w-[clamp(24px,3.9vw,56px)] select-none"
      />

      <h2
        ref={headingRef}
        className="relative mx-auto max-w-160 px-6 text-center font-anton-sc text-[clamp(40px,11.09vw,121px)] uppercase leading-none text-white"
      >
        <RevealWord>The</RevealWord> <RevealWord>problem</RevealWord>
        <br />
        <RevealWord>is</RevealWord>{" "}
        <RevealWord className="text-[#AC40FF]">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-[0.12em]">
            <span>{"{"}</span>
            <span>Scale</span>
            <ArrowUpRight
              strokeWidth={2}
              className="inline-block h-[1em] w-[1em] shrink-0 scale-170"
            />
            <span>{"},"}</span>
          </span>
        </RevealWord>{" "}
        <RevealWord>not</RevealWord> <RevealWord>strategy.</RevealWord>
      </h2>
    </section>
  );
}
