"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLoaderDuration } from "@/components/loader/LoaderTimingContext";

const DESCRIPTION_TEXT =
  "Clients benefit from increased lead generation, video production, a solid omni-channel strategy, and strategic conversion optimization tactics as the core tactics we incorporate into every opportunity.";

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

export default function WorkHero() {
  const { total: loaderDuration } = useLoaderDuration();
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    const typewriterChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(typewriterChars, { opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 24 });

      gsap
        .timeline({ delay: loaderDuration })
        .to(typewriterChars, {
          opacity: 1,
          duration: 0.01,
          stagger: 0.02,
          ease: "none",
        })
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-dvh w-full items-end overflow-hidden bg-black">
      <Image
        src="/images/work/top.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[45%] bg-linear-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent to-black"
      />

      <div className="relative z-10 mx-auto w-full max-w-325 px-8 py-[clamp(96px,14vw,120px)] text-center text-white sm:px-12 lg:px-16">
        <h1
          ref={headingRef}
          className="font-anton-sc text-[clamp(32px,5.5556vw,80px)] uppercase leading-[0.97]"
        >
          <TypewriterChars text="What's Your Brand Saying?" />
        </h1>

        <p
          ref={descriptionRef}
          className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-181 font-poppins text-[clamp(14px,1.25vw,18px)] leading-[1.35] text-white/70"
        >
          {DESCRIPTION_TEXT}
        </p>
      </div>
    </section>
  );
}
