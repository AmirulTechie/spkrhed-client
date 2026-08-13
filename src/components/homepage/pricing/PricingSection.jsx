"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    badge: "SEED",
    icon: "/images/Home/pricing-icon-1.png",
    iconWidth: 100,
    iconHeight: 100,
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
    icon: "/images/Home/pricing-icon-2.png",
    iconWidth: 100,
    iconHeight: 100,
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
    icon: "/images/Home/pricing-icon-3.png",
    iconWidth: 100,
    iconHeight: 100,
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
    icon: "/images/Home/pricing-icon-4.png",
    iconWidth: 100,
    iconHeight: 100,
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
  const iconRef = useRef(null);
  const spotRef = useRef(null);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${highlight ? "rgba(255,255,255,0.12)" : "rgba(172,64,255,0.13)"} 0%, transparent 70%)`;
      spotRef.current.style.opacity = "1";
    }
  };

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.3, ease: "power2.out" });
    gsap.to(iconRef.current, {
      y: -12,
      rotate: 10,
      scale: 1.12,
      duration: 0.45,
      ease: "power3.out",
    });
    if (spotRef.current) spotRef.current.style.opacity = "1";
  };

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(iconRef.current, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.6)",
    });
    if (spotRef.current) {
      spotRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative h-full cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
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
        className={`relative z-10 flex h-full flex-col overflow-hidden rounded-[10px] p-[clamp(16px,1.3889vw,20px)] ${highlight ? "bg-[#AC40FF]" : "bg-white"
          }`}
      >
        {/* Mouse-tracking spotlight */}
        <div
          ref={spotRef}
          className="pointer-events-none absolute inset-0 z-0 rounded-[10px] opacity-0 transition-opacity duration-300"
          style={{ background: "transparent" }}
        />
        <div className="flex items-center justify-between">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black px-[clamp(10px,1vw,16px)] py-[clamp(6px,0.6vw,10px)]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#AC40FF]" />
            <span
              className={`font-poppins text-[clamp(13px,1.3889vw,20px)] font-semibold leading-none ${highlight ? "text-[#AC40FF]" : "text-white"
                }`}
            >
              {tier.badge}
            </span>
          </span>

          <Image
            ref={iconRef}
            src={tier.icon}
            alt=""
            width={tier.iconWidth}
            height={tier.iconHeight}
            className="h-[80px] sm:h-[clamp(50px,6vw,100px)] w-auto shrink-0 object-contain will-change-transform"
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
                className={`mt-0.5 h-[clamp(14px,1.1972vw,17px)] w-[clamp(14px,1.1972vw,17px)] shrink-0 ${highlight ? "text-black" : "text-[#AC40FF]"
                  }`}
              />
              <span className="font-poppins text-[clamp(11px,0.8333vw,12px)] font-medium leading-[1.2] text-black/70">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`mt-3 flex w-full items-center justify-center rounded-lg py-[clamp(8px,0.7546vw,11px)] text-center font-poppins text-[clamp(19px,0.138vw,20px)] font-semibold uppercase transition-colors duration-300 ${highlight
            ? "bg-black text-[#AC40FF] hover:bg-white hover:text-black"
            : "bg-[#AC40FF] text-black hover:bg-black hover:text-[#AC40FF]"
            }`}
        >
          {tier.cta}
        </Link>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];
    const cards = cardRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // — Heading chars start invisible (typewriter reveal)
      gsap.set(headingChars, { opacity: 0 });

      // — Description block: starts off-screen to the left, clipped by the
      //   section's overflow-x-clip, so it travels in as one solid unit
      gsap.set(descriptionRef.current, { opacity: 0, x: -80 });

      // — Cards: pitched back (perspective tilt) and invisible, ready to
      //   unfold into place one by one
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        rotateX: 18,
        transformOrigin: "50% 100%",
        transformPerspective: 900,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Heading types on
      tl.to(headingChars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.018,
        ease: "none",
      });

      // 2. Description slides in from the left (whole block, one smooth move)
      tl.to(
        descriptionRef.current,
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
        "-=0.25",
      );

      // 3. Cards unfold into place left → right with a stagger so each one
      //    peels up independently — feels like a premium deck being laid out
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.55",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F0F0EA] py-[clamp(64px,9.7222vw,140px)]"
    >
      {/* Background vines — framing patterns dropping down from the top edge. */}
      <div className="absolute top-0 left-[-4%] z-0 w-[clamp(280px,36vw,520px)] select-none pointer-events-none">
        <Image
          src="/images/Home/pricing-vine-left.png"
          alt=""
          width={1040}
          height={1438}
          className="h-auto w-full"
        />
      </div>

      <div className="absolute top-0 right-[-4%] z-0 w-[clamp(240px,32vw,460px)] select-none pointer-events-none">
        <Image
          src="/images/Home/pricing-vine-right.png"
          alt=""
          width={920}
          height={1238}
          className="h-auto w-full opacity-90"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-360 px-[clamp(20px,3.1944vw,46px)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            ref={headingRef}
            className="font-anton-sc text-[clamp(45px,6vw,90px)] uppercase leading-[0.97] text-black"
          >
            <span className="block">
              <TypewriterChars text="Sow The Seed." />
            </span>
            <span className="block text-[#AC40FF]">
              <TypewriterChars text="Own The Pipeline." />
            </span>
          </h2>

          <p
            ref={descriptionRef}
            className="max-w-105 font-poppins text-[clamp(16px,1.5278vw,22px)] font-medium leading-[1.1] text-black/60"
          >
            Four growth configurations built around your goals. Pick your system, book your onboarding sequence, and watch the pipeline sprout.
          </p>
        </div>

        <div className="mt-[clamp(60px,8.33vw,120px)] grid grid-cols-1 gap-[clamp(24px,1.8056vw,26px)] sm:grid-cols-2 lg:grid-cols-4">
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