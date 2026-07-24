"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    badge: "SEED",
    icon: "/images/Home/pricing-sprout-icon.png",
    iconWidth: 68,
    iconHeight: 68,
    name: "SPROUT",
    description: "Founders & consultants planting the first row.",
    features: [
      "Profile transformation & positioning",
      "8 posts / month, fully written",
      "5,000 outbound DMs / month",
      "A/B tested message sequences",
      "~15-20 qualified calls / month target",
      "Monthly performance report",
    ],
    cta: "START GROWING",
    highlight: false,
  },
  {
    badge: "GIANT",
    icon: "/images/Home/pricing-beanstalk-icon.png",
    iconWidth: 31,
    iconHeight: 34,
    name: "BEANSTALK",
    description: "Agencies & growing teams ready to scale past referrals.",
    features: [
      "12 posts + 2 carousels / month",
      "10,000 outbound DMs / month",
      "Lead magnet + landing page build",
      "Advanced ICP targeting & segmentation",
      "5-step email nurture sequence",
      "Bi-weekly strategy calls",
      "Full pipeline dashboard",
      "~30-40 qualified calls / month target",
    ],
    cta: "BOOK A CALL",
    highlight: true,
    mostPopular: true,
  },
  {
    badge: "SKY-HIGH",
    icon: "/images/Home/pricing-giant-icon.png",
    iconWidth: 76,
    iconHeight: 80,
    name: "GOLDEN GIANT",
    description: "Scale-stage founders ready to make referrals optional.",
    features: [
      "Unlimited content production",
      "Custom outreach volume",
      "Multiple lead magnets + funnels",
      "7-step automated email nurture",
      "Newsletter & thought-leadership ghostwriting",
      "Weekly strategy calls — priority support",
      "Dedicated account strategist",
      "~50-70 qualified calls / month target",
    ],
    cta: "LET'S SCALE",
    highlight: false,
  },
  {
    badge: "CLOUD",
    icon: "/images/Home/pricing-cloud-icon.png",
    iconWidth: 90,
    iconHeight: 62,
    name: "CLOUD KINGDOM",
    description:
      "Enterprise & PE-backed platforms the seat at the top of the beanstalk.",
    features: [
      "Full Beanstalk System™ deployed end-to-end",
      "Whole executive team LinkedIn presence",
      "AI voice agent & missed-call recovery",
      "Multi-location territory management",
      "Watchtower revenue intelligence",
      "Performance Creative Lab — paid ad assets at tempo",
      "Custom AI operating system",
      "Executive briefing cadence",
    ],
    cta: "BUILD YOUR CASTLE",
    highlight: false,
  },
];

function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.75 8.25L6.75 10.25L11.25 5.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable,
// opacity-only span — the same typewriter treatment used by Beanstalk's
// "Five Plantings" line, shared here by the heading and description so both
// type on the same way.
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

function PricingCard({ tier, cardRef }) {
  const highlight = tier.highlight;

  // Hover scale is applied to this outer wrapper (not the inner card div) so
  // the "Most Popular" tag — an absolutely positioned sibling of the inner
  // card — scales up together with it instead of getting left behind.
  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    // no vertical translate — all four cards share the same top edge, per Figma
    <div
      ref={cardRef}
      className="relative h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {tier.mostPopular && (
        // Flush against the card's top edge — the tag is a narrower "neck" poking
        // above the card, same gray fill as the card's border reveal, so the two
        // read as one continuous bottle-shaped silhouette rather than two divs.
        <div className="absolute -top-[clamp(22px,1.8889vw,27px)] left-1/2 z-10 flex -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-t-[clamp(11px,0.9722vw,14px)] bg-[#F0F0EA] px-[clamp(16px,1.3889vw,20px)] py-[clamp(6px,0.4861vw,7px)]">
          <span className="font-poppins text-[clamp(10px,0.9028vw,13px)] font-semibold uppercase leading-none text-[#101010]">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`relative z-10 flex h-full flex-col rounded-[10px] p-[clamp(16px,1.3889vw,20px)] ${
          highlight
            ? "border-[clamp(3px,0.2778vw,4px)] border-[#F0F0EA] bg-[#AC40FF]"
            : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-black px-[clamp(8px,0.6944vw,10px)] py-[clamp(4px,0.3889vw,6px)]">
            <span className="h-1.25 w-1.25 shrink-0 rounded-full bg-[#AC40FF]" />
            <span
              className={`font-poppins text-[clamp(11px,1.0417vw,15px)] font-semibold leading-none ${
                highlight ? "text-[#AC40FF]" : "text-white"
              }`}
            >
              {tier.badge}
            </span>
          </span>

          <Image
            src={tier.icon}
            alt=""
            width={tier.iconWidth}
            height={tier.iconHeight}
            className="h-[clamp(24px,2.3611vw,34px)] w-auto shrink-0 object-contain"
          />
        </div>

        <h3 className="mt-[clamp(10px,0.9375vw,13px)] font-anton-sc text-[clamp(20px,1.8056vw,26px)] uppercase leading-[0.97] text-black">
          {tier.name}
        </h3>
        <p className="mt-1 font-poppins text-[12px] leading-[0.97] text-black">
          {tier.description}
        </p>

        <div className="mt-[clamp(10px,0.9028vw,13px)] border-t border-black/15" />

        <ul className="mt-[clamp(20px,2.2222vw,32px)] flex flex-1 flex-col gap-[clamp(12px,1.25vw,18px)]">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckIcon
                className={`mt-0.5 h-[clamp(14px,1.1972vw,17px)] w-[clamp(14px,1.1972vw,17px)] shrink-0 ${
                  highlight ? "text-black" : "text-[#AC40FF]"
                }`}
              />
              <span className="font-poppins text-[clamp(11px,0.8333vw,12px)] font-medium leading-[1.2] text-black/70">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`mt-3 w-full rounded-lg py-[clamp(8px,0.7546vw,11px)] font-poppins text-[clamp(19px,0.138vw,20px)] font-semibold uppercase cursor-pointer ${
            highlight ? "bg-black text-[#AC40FF]" : "bg-[#AC40FF] text-black"
          }`}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
}

const DESCRIPTION_TEXT =
  "Four service tiers, each one a different rung up the beanstalk. Every tier ships with content, outreach, and pipeline systems baked in — because one without the other leaves money on the table.";

export default function PricingSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRefs = useRef([]);

  // One-time entrance, gated behind ScrollTrigger the moment the section is
  // reached: cards pop in together, the heading types on char-by-char, and
  // the description fades/slides up from below — all as one simultaneous
  // wave. The tree branches are static (no entrance animation, no position
  // changes) — they render straight at their resting look.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];
    const cards = cardRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.6)",
      })
        .to(
          headingChars,
          { opacity: 1, duration: 0.01, stagger: 0.02, ease: "none" },
          "<",
        )
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "<",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[clamp(64px,9.7222vw,140px)]"
    >
      {/* Each branch fades both its top AND bottom edges out via a mask
          (rather than a black overlay div) so only the vine's pixels fade —
          the black background behind it never gets darkened or smudged.
          The bottom fade matters because the branch is much taller than the
          card row it runs behind: the cards (z-10) cover the middle of the
          branch, but its tail extends well past the last card and would
          otherwise show a hard, unmasked cut in open black space. Size/
          position are the same fixed formula on every breakpoint (no
          shrinking to a small mobile accent) so the branch reads with the
          same visual weight everywhere. */}
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute left-[-25%] top-[-23vw] w-[50%] rotate-45 select-none opacity-90"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
        }}
      />

      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute right-[-24%] top-[-6vw] w-[50%] -scale-x-100 select-none opacity-90"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 25%, black 70%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-325 px-[clamp(24px,5.0694vw,73px)]">
        <h2
          ref={headingRef}
          className="mx-auto max-w-4xl text-center font-anton-sc text-[clamp(32px,6.25vw,90px)] uppercase leading-[0.97] text-white"
        >
          <TypewriterChars text="Pick Your Beanstalk." />
        </h2>

        <p
          ref={descriptionRef}
          className="mx-auto mt-[clamp(16px,1.875vw,27px)] max-w-3xl text-center font-poppins text-[clamp(15px,1.3194vw,19px)] leading-[0.97] text-white"
        >
          {DESCRIPTION_TEXT}
        </p>

        {/* mt-top gives room for the "Most Popular" tag that sits above the Beanstalk card */}
        <div className="mt-[clamp(32px,3.2639vw,47px)] grid grid-cols-1 items-stretch gap-[clamp(30px,0.6944vw,50px)] sm:grid-cols-2 sm:gap-7 xl:grid-cols-4 xl:gap-[11.7px]">
          {TIERS.map((tier, index) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              cardRef={(el) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}