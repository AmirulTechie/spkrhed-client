"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

// Matches Loader.jsx's TOTAL_DURATION so the hero animation starts the
// instant the preloader finishes sliding away.
const LOADER_DURATION = 3.5;

const EYEBROW_TEXT = "Sound familiar?";

export default function AboutHero() {
  const bulletRef = useRef(null);
  const eyebrowCharRefs = useRef([]);
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // "Sound familiar?" is coupled to its first character — every other
      // char and the bullet start stacked on top of it, then pull apart
      // outward in both directions like train cars uncoupling, matching the
      // homepage hero's "This is a movement" treatment.
      const eyebrowChars = eyebrowCharRefs.current.filter(Boolean);
      const anchorEl = eyebrowChars[0];
      const eyebrowEls = [bulletRef.current, ...eyebrowChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(eyebrowEls, {
        opacity: 0,
        x: (_, target) => anchorLeft - target.getBoundingClientRect().left,
      });
      gsap.set([logoRef.current, descriptionRef.current], {
        opacity: 0,
        x: -80,
      });

      const tl = gsap.timeline({ delay: LOADER_DURATION });

      tl.to(eyebrowEls, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.032, from: eyebrowEls.indexOf(anchorEl) },
      })
        .to(
          logoRef.current,
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.2",
        )
        .to(
          descriptionRef.current,
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-screen w-full items-end overflow-hidden bg-black">
      <Image
        src="/images/about/about-hero.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1023px) 160vh, 100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-b from-transparent to-[#0f0f0f]"
      />

      <div className="relative z-10 w-full px-8 pb-[clamp(28px,3.1944vw,46px)] text-white sm:px-12 lg:px-16">
        <p className="mb-[clamp(16px,1.6667vw,24px)] flex items-center gap-[clamp(4px,0.4167vw,6px)] font-poppins text-[clamp(16px,2.0833vw,30px)] font-medium uppercase text-white/30">
          <span ref={bulletRef} className="inline-flex opacity-0">
            <Image
              src="/images/Home/banner-bullet.png"
              alt=""
              width={13}
              height={13}
              className="h-[clamp(9px,0.9028vw,13px)] w-[clamp(9px,0.9028vw,13px)]"
            />
          </span>
          <span className="inline-block">
            {EYEBROW_TEXT.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  eyebrowCharRefs.current[i] = el;
                }}
                className="inline-block opacity-0"
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </p>

        <div ref={logoRef} className="opacity-0">
          <Image
            src="/images/about/spkrhed-wordmark.svg"
            alt="SPKRHED"
            width={469}
            height={75}
            className="h-auto w-[clamp(220px,32.5694vw,469px)]"
          />
        </div>

        <p
          ref={descriptionRef}
          className="mt-[clamp(12px,1.4583vw,21px)] max-w-150.5 font-poppins text-[clamp(15px,1.5972vw,23px)] leading-[1.124] text-white/60 opacity-0"
        >
          SPKRHED is not another agency. We are a movement to put the human
          back into how companies grow. While the rest of the market drowns
          buyers in bots and cold spam, we are building something rare and
          nearly forgotten. Real people, having real conversations, earning
          real trust. It starts on LinkedIn. It starts with the first
          message. It starts with you.
        </p>
      </div>
    </section>
  );
}
