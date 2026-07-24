"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Line breaks match the Figma layout exactly (enforced at lg+).
const COPY_LINES = [
  "A LinkedIn-led growth partner for",
  "founders, consultants, and enterprise",
  "teams.We turn quiet profiles into pipeline-",
  "generating beanstalks so qualified buyers",
  "come to you, while you sleep.",
];

const STATS = [
  { value: "10+", valueClassName: "text-white", label: "Years of\nExperience" },
  { value: "50K+", valueClassName: "text-[#AC40FF]", label: "Targeted\nDMs / Month" },
];

// Two rows of four, matching the Figma order and per-logo widths
// (measured at the 1440px design frame; min/max ≈ 0.6x/1.6x).
const LOGO_ROWS = [
  [
    { src: "/images/clients-logo/logo-01.svg", alt: "RubyMine", w: 120, h: 23, width: "w-[clamp(72px,8.3104vw,191px)]" },
    { src: "/images/clients-logo/logo-02.svg", alt: "Spotify", w: 102, h: 35, width: "w-[clamp(61px,7.1174vw,164px)]" },
    { src: "/images/clients-logo/logo-03.svg", alt: "Lexus", w: 87, h: 40, width: "w-[clamp(52px,6.0583vw,140px)]" },
    { src: "/images/clients-logo/logo-05.svg", alt: "Coca-Cola", w: 101, h: 35, width: "w-[clamp(61px,7.0049vw,161px)]" },
  ],
  [
    { src: "/images/clients-logo/logo-04.svg", alt: "NHL on TNT", w: 120, h: 37, width: "w-[clamp(72px,8.3097vw,191px)]" },
    { src: "/images/clients-logo/logo-06.svg", alt: "Tim Hortons", w: 120, h: 26, width: "w-[clamp(72px,8.3083vw,191px)]" },
    { src: "/images/clients-logo/logo-07.svg", alt: "Mercedes-Benz", w: 146, h: 32, width: "w-[clamp(88px,10.1597vw,234px)]" },
    { src: "/images/clients-logo/logo-08.svg", alt: "Chevrolet", w: 88, h: 42, width: "w-[clamp(53px,6.1118vw,141px)]" },
  ],
];

// Splits "10K+" into { target: 10, suffix: "K+" } so the number can be
// tweened while the unit/suffix stays put.
function parseStatValue(value) {
  const [, digits, suffix] = value.match(/^(\d+)(.*)$/);
  return { target: Number(digits), suffix };
}

function Stat({ value, valueClassName, label, valueRef }) {
  const { suffix } = parseStatValue(value);

  return (
    <div className="flex flex-col">
      <span
        ref={valueRef}
        className={`font-anton-sc text-[clamp(48px,6.9444vw,160px)] leading-none ${valueClassName}`}
      >
        {`0${suffix}`}
      </span>
      <span className="mt-1 whitespace-pre-line font-poppins text-[clamp(14px,1.7361vw,25px)] font-semibold leading-[1.35] text-white/35">
        {label}
      </span>
    </div>
  );
}

export default function StatsClientsSection() {
  const rowRef = useRef(null);
  const fillRef = useRef(null);
  const wordRefs = useRef([]);
  const statValueRefs = useRef([]);
  const clientsSectionRef = useRef(null);
  const clientsRevealRef = useRef(null);

  useLayoutEffect(() => {
    const words = wordRefs.current.filter(Boolean);
    const statEls = statValueRefs.current;

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.35 });

      const trigger = {
        trigger: rowRef.current,
        start: "clamp(top 80%)",
        end: "clamp(bottom 55%)",
        scrub: 0.5,
      };

      gsap.to(words, {
        opacity: 1,
        stagger: 0.4,
        ease: "none",
        scrollTrigger: trigger,
      });

      gsap.to(fillRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: trigger,
      });

      STATS.forEach((stat, index) => {
        const el = statEls[index];
        if (!el) return;

        const { target, suffix } = parseStatValue(stat.value);
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${suffix}`;
          },
        });
      });

      gsap.set(clientsRevealRef.current, { yPercent: 100, opacity: 0 });

      gsap.to(clientsRevealRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: clientsSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  let wordIndex = -1;

  return (
    <section className="bg-black">
      <div className="px-[clamp(32px,5.0694vw,117px)] pt-[clamp(56px,8.125vw,187px)] pb-[clamp(24px,3.1944vw,74px)]">
        <div
          ref={rowRef}
          className="grid grid-cols-1 items-start gap-x-[clamp(32px,4.4444vw,102px)] gap-y-14 lg:grid-cols-[589fr_641fr]"
        >
          <div>
            <div className="mb-[clamp(32px,4.7222vw,109px)] h-0.5 w-[clamp(200px,26.7361vw,616px)] bg-white/20">
              <div
                ref={fillRef}
                className="h-full w-full origin-left scale-x-0 bg-white"
              />
            </div>
            <div className="flex gap-x-[clamp(40px,6.25vw,144px)]">
              {STATS.map((stat, index) => (
                <Stat
                  key={stat.value}
                  {...stat}
                  valueRef={(el) => {
                    statValueRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
          </div>

          <p className="font-anton-sc text-[clamp(18px,2.2222vw,51px)] leading-[1.275] text-white">
            {COPY_LINES.map((line, lineIndex) => (
              <span key={lineIndex} className="lg:block">
                {line.split(" ").map((word) => {
                  // eslint-disable-next-line react-hooks/immutability
                  wordIndex += 1;
                  const index = wordIndex;
                  return (
                    <span key={index}>
                      <span
                        ref={(el) => {
                          wordRefs.current[index] = el;
                        }}
                      >
                        {word}
                      </span>{" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div
        ref={clientsSectionRef}
        className="overflow-hidden px-[clamp(32px,5.0694vw,117px)] pt-[clamp(40px,6.1111vw,141px)] pb-[clamp(48px,6.1111vw,141px)]"
      >
        <div
          ref={clientsRevealRef}
          className="grid grid-cols-1 items-start gap-x-[clamp(32px,4.4444vw,102px)] gap-y-10 lg:grid-cols-[589fr_641fr]"
        >
          <div className="flex items-start gap-3">
            <Image
              src="/images/Home/leaf-2.png"
              alt=""
              width={30}
              height={30}
              className="mt-[0.3em] h-[clamp(20px,1.6667vw,30px)] w-[clamp(20px,1.6667vw,30px)] shrink-0 brightness-0 invert"
            />
            <p className="max-w-180 font-poppins text-[clamp(22px,2.7778vw,48px)] font-semibold uppercase leading-none text-white">
  Clients whose realities we&apos;ve changed
</p>
          </div>

          <div className="flex flex-col gap-y-[clamp(32px,4.5139vw,104px)]">
            {LOGO_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-between">
                {row.map((logo) => (
                  <Image
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={logo.h}
                    className={`h-auto opacity-60 transition-all duration-300 ease-out hover:scale-110 hover:opacity-100 ${logo.width} cursor-pointer`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
