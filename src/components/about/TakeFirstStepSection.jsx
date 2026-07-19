"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADING_TEXT = "Take the first step";

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

export default function TakeFirstStepSection() {
  const sectionRef = useRef(null);
  const vineWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const infoRef = useRef(null);

  // One-time entrance, gated behind ScrollTrigger the moment the section is
  // reached: the vine rises from below (matching BeanstalkSystemSection's
  // big-branch entrance), the heading types on fast, the description pops up
  // from the bottom, and the "start the climb" info slides in from the right.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(vineWrapperRef.current, { opacity: 0, y: 140 });
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 40 });
      gsap.set(infoRef.current, { opacity: 0, x: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(vineWrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      })
        .to(
          headingChars,
          {
            opacity: 1,
            duration: 0.01,
            stagger: 0.02,
            ease: "none",
          },
          "-=0.7",
        )
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          infoRef.current,
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-120 overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)] lg:h-[clamp(500px,48.4028vw,697px)] lg:py-0"
    >
      {/* Wrapper owns the entrance transform so GSAP never has to fight the
          inner element's Tailwind rotate transform (animating x/y directly on
          a rotated element replaces its whole `transform`, silently dropping
          the rotation). Positioning/rotation of the vine itself is untouched. */}
      <div ref={vineWrapperRef} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[2%] bottom-0 h-[min(80vw,614px)] w-[min(55vw,422px)] overflow-hidden lg:right-auto lg:bottom-auto lg:left-[28.3870%] lg:top-[15.0646%] lg:h-[97.3611vw] lg:w-[54.7917%] lg:origin-top-left lg:overflow-visible lg:rotate-[10.6363deg]"
        >
          <Image
            src="/images/about/footer-beanstalk-vine.webp"
            alt=""
            fill
            sizes="(min-width: 500px) 40vw, 40vw"
            className="object-cover select-none"
          />
          {/* Mobile/tablet-only fade for the vine's flat-cut top edge; desktop uses the precisely
              positioned/rotated overlay below, matching the Figma design exactly. */}
          <div
            className="absolute inset-x-0 top-0 h-[40%] lg:hidden"
            style={{
              background: "linear-gradient(180deg, #000000 0%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </div>
      {/* Blends the vine's flat-cut top edge into the black bg, matching the Figma overlay
          (same size/position/rotation as the "Rectangle 164" gradient in the Figma design). */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden lg:left-[32.9590%] lg:top-[17.5036%] lg:block lg:h-[24.4429vw] lg:w-[43.1675%] lg:origin-top-left lg:rotate-[5.4463deg]"
        style={{
          background: "linear-gradient(180deg, #000000 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative mx-auto h-auto max-w-11/12 px-8 sm:px-12 lg:mx-auto lg:h-full lg:max-w-360 lg:px-0 xl:px-16">
      <div className="flex justify-center">
        <h2
          ref={headingRef}
          className="text-center font-anton-sc text-[clamp(40px,12.1528vw,175px)] leading-[1.4] uppercase text-white lg:absolute lg:top-0 lg:left-[4.6528%] lg:w-[90.7639%] lg:whitespace-nowrap lg:leading-[0.8]"
        >
          <TypewriterChars text={HEADING_TEXT} />
        </h2>
        </div>
        <div className="flex flex-col gap-[clamp(20px,2.5vw,36px)] lg:contents">
          <p
            ref={descriptionRef}
            className="font-poppins text-[clamp(14px,1.5972vw,23px)] leading-[1.1] text-white uppercase lg:absolute lg:top-[26.3988%] lg:left-[5.0694%] lg:w-[38.4028%] lg:max-w-120"
          >
            This is a movement, and it has room for you. If you are done
            being just another inbox blast and ready to grow the human way,
            you already know what to do. The work starts here.
          </p>

          <div
            ref={infoRef}
            className="flex items-center gap-2 lg:absolute lg:top-[41.8937%] lg:left-[60.4861%]"
          >
            <span className="font-poppins text-[clamp(14px,1.5972vw,23px)] text-white/25 uppercase">
              Start the climb:
            </span>
            <a
              href="mailto:info@speakerhead.com"
              className="inline-flex items-center rounded-full border border-white px-[clamp(16px,1.1806vw,17px)] py-[clamp(6px,0.3819vw,6px)] font-poppins text-[clamp(14px,1.5972vw,23px)] text-white"
            >
              info@speakerhead.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
