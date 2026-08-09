"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Splits on words and keeps spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span) — a lone space as the
// sole content of an inline-block collapses to zero width otherwise.
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

const CARDS = [
  {
    step: "1. THE LAND OFFER",
    icon: "/images/Home/beanstalk-icon-1.png",
    heading: ["THE SOIL TEST:", "DIAGNOSE & PLANT"],
    description:
      "A five-week diagnostic + pilot. We map every leaking dollar in your funnel and ship the first fix live before we invoice. Two systems in production, a CFO-signed baseline, and the green light to climb.",
    layer: "Foundation Layer",
    align: "start",
  },
  {
    step: "2. PIPELINE",
    icon: "/images/Home/beanstalk-icon-2.png",
    heading: ["THE BEANSTALK —", "LINKEDIN-LED OUTBOUND"],
    description:
      "Sales Navigator targeting, A/B tested sequences, and personalized outreach at enterprise scale. Up to 10,000 DMs a month going to the exact decision-makers who can pay your invoice — pre-qualified before they ever hit your calendar.",
    layer: "Pipeline Layer",
    align: "end",
  },
  {
    step: "3. AUTHORITY",
    icon: "/images/Home/beanstalk-icon-3.png",
    heading: ["GOLDEN HARVEST —", "CONTENT THAT CLOSES"],
    description:
      "Executive LinkedIn content and paid creative at algorithmic tempo. We extract your expertise, frameworks, and insights and turn them into scroll-stopping posts, carousels, and ad creative that warm prospects before the first call.",
    layer: "Pipeline Layer",
    align: "start",
  },
];
function BeanstalkCard({ card, ref }) {
  return (
    <div
      ref={ref}
      className="relative w-full max-w-143.75 rounded-[20px] bg-[#D9D9D9]/20 p-[clamp(24px,2.7778vw,40px)] backdrop-blur-sm flex flex-col items-start"
    >
      <div className="flex w-full items-center justify-between gap-[clamp(12px,1.25vw,18px)]">
        <span className="inline-flex items-center whitespace-nowrap rounded-[70px] bg-[#AC40FF] px-[clamp(16px,1.9444vw,28px)] py-[clamp(8px,0.9722vw,14px)] font-poppins text-[clamp(16px,2.5vw,36px)] font-medium leading-none text-white">
          {card.step}
        </span>
        <div>
        <Image
          src={card.icon}
          alt=""
          width={150}
          height={150}
          className="size-[clamp(60px,10.42vw,150px)]"
        />
        </div>
      </div>

      <h3 className="mt-[clamp(20px,2.4vw,40px)] font-anton-sc text-[clamp(26px,3.4028vw,49px)] uppercase leading-none text-black text-start">
        {card.heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p className="mt-[clamp(12px,1.6667vw,24px)] max-w-md font-poppins text-[clamp(16px,1.3889vw,20px)] font-medium leading-[1.1] text-black text-start">
        {card.description}
      </p>

      <div className="mt-[clamp(20px,2.4vw,40px)] flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-black" />
        <span className="font-poppins text-[clamp(14px,1.1111vw,16px)] font-medium leading-[1.1] text-black">
          {card.layer}
        </span>
      </div>
    </div>
  );
}
export default function BeanstalkSystemSection() {
  const sectionRef = useRef(null);
  const bigBranchRef = useRef(null);
  const fivePlantingsRef = useRef(null);
  const growthEngineRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRefs = useRef([]);

  // One-time entrance, gated behind ScrollTrigger the moment the section is
  // reached: the big-branch rises from below (position untouched), the
  // heading types on, "Growth Engine." fades/lifts in — a straight clip-path
  // wipe (as used by Flywheel's "Outreach Makes Content Close Faster.") cuts
  // a hard vertical line through this cursive font's loops (e.g. the belly
  // of the G) whenever caught mid-transition, so it isn't used here — and
  // the description slides in from the left. Each card then pops in on its
  // own ScrollTrigger as the user scrolls past it.
  useLayoutEffect(() => {
    const typewriterChars = [
      ...fivePlantingsRef.current.querySelectorAll(".typewriter-char"),
    ];
    const growthEngineLine =
      growthEngineRef.current.querySelector(".growth-engine-line");

    const ctx = gsap.context(() => {
      gsap.set(bigBranchRef.current, { opacity: 0, y: 220 });
      gsap.set(typewriterChars, { opacity: 0 });
      gsap.set(growthEngineLine, { opacity: 0, yPercent: 20, filter: "blur(6px)" });
      gsap.set(descriptionRef.current, { opacity: 0, x: -140 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(bigBranchRef.current, {
        opacity: 0.95,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      })
        .to(
          typewriterChars,
          {
            opacity: 1,
            duration: 0.01,
            stagger: 0.045,
            ease: "none",
          },
          "-=0.7",
        )
        .to(
          growthEngineLine,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          descriptionRef.current,
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4",
        );

      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        gsap.set(cardEl, { opacity: 0, y: 80, scale: 0.85 });
        gsap.to(cardEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: cardEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] overflow-hidden rounded-5xl bg-[#F0F0EA] pb-[clamp(64px,9.7222vw,140px)]"
    >
      <Image
  ref={bigBranchRef}
  src="/images/Home/big-branch.png"
  alt=""
  width={2162}
  height={3842}
  className="pointer-events-none absolute right-[2.1528%] top-[20.2083vw] z-0 w-[220%] select-none mask-[linear-gradient(to_bottom,transparent_0%,transparent_30%,black_45%,black_65%,transparent_88%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_30%,black_45%,black_65%,transparent_88%)] lg:w-[75.0694%] lg:mask-[linear-gradient(to_bottom,transparent_0%,black_18%,black_65%,transparent_88%)] lg:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_65%,transparent_88%)]"
/>
      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute bottom-[-40%] left-1/2 w-[160%] max-w-none -translate-x-1/2 select-none z-99"
      />
      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute bottom-[-20%] left-1/2 w-[160%] max-w-none -translate-x-1/2 select-none z-99"
      />
      <h2 className="relative z-10 w-full origin-center px-4 text-center font-anton-sc text-[clamp(40px,8vw,160px)] uppercase leading-[100%] text-black lg:scale-140">
        The Beanstalk System
      </h2>

      <div className="relative z-10 mx-auto max-w-400 px-[clamp(24px,5.5556vw,80px)] text-center">
        <div className="mt-[clamp(24px,10.213vw,141px)] flex flex-col items-center">
          <p
            ref={fivePlantingsRef}
            className="whitespace-nowrap font-anton-sc text-[clamp(22px,5.4167vw,78px)] uppercase leading-none text-black"
          >
            <TypewriterChars text="Five Plantings. One Unstoppable" />
          </p>
          <div className="flex flex-col items-start">
            <p
              ref={growthEngineRef}
              className="mt-[clamp(-39px,-2.7083vw,-11px)] whitespace-pre font-alex-brush text-[clamp(48px,14.0278vw,202px)] leading-none text-[#AC40FF]"
            >
              <span className="growth-engine-line inline-block">
                Growth    Engine.
              </span>
            </p>
            <p
              ref={descriptionRef}
              className="mt-[clamp(-22px,-1.5278vw,-5px)] max-w-[clamp(280px,32.6389vw,470px)] font-poppins text-[clamp(16px,1.8056vw,26px)] font-medium leading-none text-black/80 text-start"
            >
              Jack didn&apos;t climb by accident — he planted the right seed
              in the right ground. We do the same for your business on
              LinkedIn.
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-[clamp(48px,6.6667vw,96px)] flex flex-col items-center gap-[clamp(32px,4.4444vw,64px)]">
          {CARDS.map((card, index) => (
            <div
              key={card.step}
              className={`flex w-full ${
                card.align === "end" ? "lg:justify-end" : "lg:justify-start"
              } ${index === 1 ? "lg:-mt-8" : ""}`}
            >
              <BeanstalkCard
                card={card}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
