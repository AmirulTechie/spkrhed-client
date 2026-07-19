"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_TITLE_CLASS =
  "font-poppins text-[clamp(24px,3.75vw,54px)] font-semibold uppercase leading-[0.93] text-white";
const CARD_BODY_CLASS =
  "font-poppins text-[clamp(9px,0.7639vw,11px)] uppercase leading-[1.09] text-white/50";
const CARD_QUOTE_CLASS =
  "font-poppins text-[clamp(13px,1.25vw,18px)] font-medium uppercase leading-[1.22] text-white";
const CARD_ATTRIBUTION_CLASS =
  "font-poppins text-[clamp(13px,1.3194vw,19px)] uppercase leading-[1.16] text-white/60";
const NUMBER_CLASS =
  "absolute pointer-events-none select-none bg-linear-to-b from-[rgba(255,255,255,0.12)] to-transparent bg-clip-text font-anton-sc text-[clamp(76px,18.4722vw,266px)] leading-none text-transparent";

const BULLET_TEXT = "What holds it together";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable span —
// the same char-level building block OldestGrowthStorySection/ProjectsSection
// use for their bullet/heading/description entrance.
function SproutChars({ text, charClassName = "sprout-char" }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block">
        {word.split("").map((char, ci) => (
          <span key={ci} className={`${charClassName} inline-block opacity-0`}>
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

// left/width are % of the 1440px-wide design frame (unchanged from Figma).
// top/height are % of this section's own 1159px-tall card grid (Figma "Group 133"),
// not the full page canvas, since the heading block above now lays out on its own.
const PRINCIPLES = [
  {
    id: "conscious-collaboration",
    digits: "01",
    align: "left",
    box: { left: "47.29%", top: "0%", width: "43.75%", height: "30.97%" },
    numberBox: { left: "20.21%", top: "8.02%" },
    title: { left: "49.93%", top: "2.33%", width: "31.39%" },
    body: { left: "49.93%", top: "11.65%", width: "34.58%" },
    quote: { left: "49.93%", top: "16.65%", width: "38.47%" },
    attribution: { left: "49.93%", top: "26.75%" },
    titleText: "Conscious Collaboration",
    bodyText:
      "At SPKRHED, we treat active listening as a superpower. Understanding you, your buyer and your market is the cornerstone of every strategic decision we make and every word we send in your name.",
    quoteText:
      "“To learn through listening, practice it naively and actively. Naively means that you listen openly, ready to learn something. Listening actively means acknowledging what you hear and acting accordingly.”",
    attributionText: "Betsy Sanders, Nordstrom",
  },
  {
    id: "purposeful-process",
    digits: "02",
    align: "right",
    box: { left: "9.58%", top: "34.51%", width: "43.75%", height: "30.97%" },
    numberBox: { left: "57.01%", top: "42.54%" },
    title: { left: "18.61%", top: "37.79%", width: "31.39%" },
    body: { left: "15.42%", top: "47.11%", width: "34.58%" },
    quote: { left: "11.53%", top: "52.11%", width: "38.47%" },
    attribution: { left: "40.28%", top: "60.31%" },
    titleText: "Purposeful Process",
    bodyText:
      "We carry your message with exacting detail and deploy every tool in our arsenal to land it. Your core principles and your company culture are the foundation we build on, never an afterthought.",
    quoteText:
      "“It’s only when companies are clear about their purpose, have clearly communicated it, and are understood by the team that they can achieve both unity of effort and distributed decision-making.”",
    attributionText: "Marc Koehler",
  },
  {
    id: "exceeded-expectations",
    digits: "03",
    align: "left",
    box: { left: "47.29%", top: "69.02%", width: "43.75%", height: "30.97%" },
    numberBox: { left: "14.375%", top: "77.05%" },
    title: { left: "49.93%", top: "73.25%", width: "31.39%" },
    body: { left: "49.93%", top: "82.57%", width: "34.58%" },
    quote: { left: "49.93%", top: "87.57%", width: "38.47%" },
    attribution: { left: "49.93%", top: "93.87%" },
    titleText: "Exceeded Expectations",
    bodyText:
      "Your complete satisfaction is our first priority. In a world where attention is the whole game, we would rather build something genuinely worth talking about than shout about something that is not.",
    quoteText:
      "“In the old world, you devoted 30% of your time to building a great service and 70% of your time to shouting about it. In the new world, that inverts.”",
    attributionText: "Jeff Bezos",
  },
];

export default function ThreePrinciplesSection() {
  const sectionRef = useRef(null);
  const bulletIconRef = useRef(null);
  const bulletCharRefs = useRef([]);
  const headingRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingHighlightRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRefs = useRef([]);
  const mobileCardRefs = useRef([]);

  // One-time entrance, gated behind ScrollTrigger, mirroring OldestGrowthStorySection/
  // ProjectsSection: the bullet label is coupled to its first character and pulls apart
  // outward from that anchor, the heading sprouts up char by char with a blur, and the
  // description types on character by character. Each card (border, number and copy,
  // animated together as one unit) then pops in on its own ScrollTrigger as the user
  // scrolls it into view.
  useLayoutEffect(() => {
    const headingLine1Chars = [
      ...headingLine1Ref.current.querySelectorAll(".sprout-char"),
    ];
    const headingLine2Chars = [
      ...headingHighlightRef.current.querySelectorAll(".sprout-char"),
    ];
    const headingChars = [...headingLine1Chars, ...headingLine2Chars];
    const descriptionChars = [
      ...descriptionRef.current.querySelectorAll(".typewriter-char"),
    ];
    const bulletChars = bulletCharRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(headingChars, {
        opacity: 0,
        yPercent: 60,
        filter: "blur(6px)",
      });
      // The purple highlight is a background box, not text — it stays invisible
      // until "No exceptions." itself starts sprouting, so it never paints in
      // ahead of the letters it sits behind.
      gsap.set(headingHighlightRef.current, { opacity: 0 });
      gsap.set(descriptionChars, { opacity: 0 });

      const anchorEl = bulletChars[0];
      const bulletEls = [bulletIconRef.current, ...bulletChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(bulletEls, {
        opacity: 0,
        x: (_, target) => anchorLeft - target.getBoundingClientRect().left,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(bulletEls, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.032, from: bulletEls.indexOf(anchorEl) },
      })
        .to(
          headingChars,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
          },
          "-=0.15",
        )
        .to(
          headingHighlightRef.current,
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          `<+=${headingLine1Chars.length * 0.02}`,
        )
        .to(
          descriptionChars,
          {
            opacity: 1,
            duration: 0.01,
            stagger: 0.012,
            ease: "none",
          },
          "-=0.2",
        );

    }, sectionRef);

    // The absolute Figma grid only renders at lg+ (`hidden lg:block`); below
    // that a separate stacked mobile card list takes over (`lg:hidden`). Only
    // one set is ever actually in the layout at a time, so matchMedia is used
    // to animate whichever one matches the current breakpoint — mirroring
    // MovementSection's desktop/mobile split — instead of wiring up
    // ScrollTriggers for a hidden set that will never receive real geometry.
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023.98px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const activeCards = isDesktop
          ? cardRefs.current
          : mobileCardRefs.current;

        activeCards.forEach((cardEl) => {
          if (!cardEl) return;
          gsap.set(cardEl, { opacity: 0, y: 90, scale: 0.92 });
          gsap.to(cardEl, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: cardEl,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      },
    );

    // Images (the bullet icon here, plus anything above/below) can finish loading
    // after this effect runs and change the document's total height, staleifying
    // ScrollTrigger start/end positions. Refreshing on load, plus a couple of
    // delayed safety refreshes, realigns every trigger to the final layout.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = setTimeout(refresh, 500);
    const t2 = setTimeout(refresh, 1500);

    return () => {
      ctx.revert();
      mm.revert();
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-20 sm:py-24 lg:py-[clamp(64px,8.3333vw,120px)]"
    >
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-12 px-6 sm:gap-16 sm:px-10 lg:gap-20 lg:px-0">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span
              ref={bulletIconRef}
              className="relative inline-flex size-2.5 shrink-0 opacity-0 sm:size-3 lg:size-[clamp(8px,0.9028vw,13px)]"
            >
              <Image
                src="/images/about/holds-together-icon.png"
                alt=""
                fill
                className="object-contain"
              />
            </span>
            <p className="font-poppins text-xs font-medium uppercase leading-none text-[rgba(122,122,122,0.4)] sm:text-sm lg:text-[clamp(16px,2.0833vw,30px)]">
              {BULLET_TEXT.split("").map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    bulletCharRefs.current[i] = el;
                  }}
                  className="inline-block opacity-0"
                >
                  {/* A lone space as the sole content of an inline-block box
                      collapses to zero width; a non-breaking space preserves it. */}
                  {char === " " ? " " : char}
                </span>
              ))}
            </p>
          </div>

          <h2
            ref={headingRef}
            className="flex flex-col items-center justify-center font-anton-sc text-[clamp(36px,9.7222vw,140px)] uppercase leading-[0.95] text-white"
          >
            <span ref={headingLine1Ref} className="block">
              <SproutChars text="Three principles." />
            </span>
            <span
              ref={headingHighlightRef}
              className="relative inline-block bg-linear-to-r from-[#AC40FF] from-55% to-[#AC40FF]/0 py-[0.04em] opacity-0"
            >
              <SproutChars text="No exceptions." />
            </span>
          </h2>

          <p
            ref={descriptionRef}
            className="max-w-sm font-poppins text-sm uppercase leading-snug text-white sm:max-w-md sm:text-base lg:max-w-175.75 lg:text-[clamp(16px,1.6667vw,24px)] lg:leading-normal"
          >
            <SproutChars
              text="Everything we do runs through these. They are how the movement keeps its promise, on every account, every day."
              charClassName="typewriter-char"
            />
          </p>
        </div>

        {/* Desktop: pixel-exact Figma grid, absolutely positioned within its own
            1440x1159 frame. Only rendered at lg+ — below that its percentage-based
            left/top offsets have nothing sane to resolve against on a narrow
            screen, so a dedicated stacked layout takes over instead (below). */}
        <div className="relative hidden aspect-1440/1159 w-full lg:block">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={principle.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute inset-0"
            >
              <div
                aria-hidden
                className="absolute rounded-[25px] border border-[#353535]"
                style={principle.box}
              />

              <p aria-hidden className={NUMBER_CLASS} style={principle.numberBox}>
                {principle.digits}
              </p>

              <h3
                className={`absolute ${CARD_TITLE_CLASS} ${
                  principle.align === "right" ? "text-right" : "text-left"
                }`}
                style={principle.title}
              >
                {principle.titleText}
              </h3>

              <p
                className={`absolute ${CARD_BODY_CLASS} ${
                  principle.align === "right" ? "text-right" : "text-left"
                }`}
                style={principle.body}
              >
                {principle.bodyText}
              </p>

              <blockquote
                className={`absolute ${CARD_QUOTE_CLASS} ${
                  principle.align === "right" ? "text-right" : "text-left"
                }`}
                style={principle.quote}
              >
                {principle.quoteText}
              </blockquote>

              <p
                className={`absolute whitespace-nowrap ${CARD_ATTRIBUTION_CLASS} ${
                  principle.align === "right" ? "text-right" : "text-left"
                }`}
                style={principle.attribution}
              >
                {principle.attributionText}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile/tablet: a plain stacked card list, real flow instead of
            percentage positions borrowed from the desktop canvas. */}
        <div className="flex w-full flex-col gap-6 sm:gap-8 lg:hidden">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={principle.id}
              ref={(el) => {
                mobileCardRefs.current[index] = el;
              }}
              className="flex flex-col gap-3 rounded-[25px] border border-[#353535] bg-black/40 p-6 text-left sm:gap-4 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className={CARD_TITLE_CLASS}>{principle.titleText}</h3>
                <p
                  aria-hidden
                  className="shrink-0 select-none bg-linear-to-b from-white/10 to-transparent bg-clip-text font-anton-sc text-[56px] leading-none text-transparent sm:text-[72px]"
                >
                  {principle.digits}
                </p>
              </div>
              <p className={CARD_BODY_CLASS}>{principle.bodyText}</p>
              <blockquote className={CARD_QUOTE_CLASS}>
                {principle.quoteText}
              </blockquote>
              <p className={CARD_ATTRIBUTION_CLASS}>
                {principle.attributionText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
