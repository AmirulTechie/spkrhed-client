"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    number: "01",
    heading: "LinkedIn Content & Authority",
    headingLines: ["LinkedIn Content &", "Authority"],
    description:
      "Buyers check your LinkedIn before they answer your message. We build the presence that makes the reply easy, posted in your voice, every single week.",
    points: [
      {
        label: "LinkedIn Content & Posting",
        detail: "Posts and carousels, run end to end",
      },
      {
        label: "Profile & Positioning",
        detail: "The profile they land on after the post",
      },
      {
        label: "Newsletter & Content Hub",
        detail: "An owned audience that compounds",
      },
    ],
    color: "172,64,255",
  },
  {
    number: "02",
    heading: "LinkedIn Outreach",
    headingLines: ["LinkedIn", "Outreach"],
    description:
      "This is the heart of it. Managed LinkedIn DMs at real scale, sent by real people having real conversations. Calls and email wrap around the LinkedIn motion to back it up.",
    points: [
      {
        label: "LinkedIn DM Outreach",
        detail: "The primary channel, run at scale",
      },
      { label: "Cold Calling", detail: "Live voice on accounts that engage" },
      {
        label: "Email Marketing",
        detail: "The follow-up layer around LinkedIn",
      },
    ],
    color: "210,210,210",
  },
  {
    number: "03",
    heading: "Pipeline & Reporting",
    headingLines: ["Pipeline &", "Reporting"],
    description:
      "Attention is worthless until it books. We turn conversations into qualified calls and show you every number behind it.",
    points: [
      { label: "Lead Magnets & Funnels", detail: "A reason to raise a hand" },
      {
        label: "Appointment Setting",
        detail: "Booked calls, not just interest",
      },
      {
        label: "Pipeline Dashboard",
        detail: "Reach, replies and conversions, monthly",
      },
    ],
    color: "210,210,210",
  },
];

// The three fan-out slots the cards cycle through: front (centered, on top),
// mid (behind, offset left), back (behind, offset right and lower). Offsets
// are percentages of the card's own size (matching the Figma fan exactly),
// so the fan holds at any viewport.
const SLOTS = [
  { xPercent: 0, yPercent: 0, rotate: 0, zIndex: 3 },
  { xPercent: -17.9, yPercent: 18.6, rotate: -5, zIndex: 2 },
  { xPercent: 23.1, yPercent: 28.4, rotate: 5, zIndex: 1 },
];

// "The LinkedIn Growth Engine" is split char by char so it can be coupled
// to its first letter and pulled apart outward, the same entrance used by
// Hero's "This is a movement" line. Spaces are kept as real text nodes
// between word-groups (not char-spans) so they don't collapse to zero
// width — an inline-block span containing only a space renders empty.
function EyebrowChars({ text }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span key={ci} className="sprout-char inline-block opacity-0">
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

// Splits on words, keeping spaces as real text nodes between them (so
// wrapping stays natural), and each word into individually animatable,
// opacity-only characters — the typewriter treatment used across the site.
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

// Only the front and mid slots sit in front of another card, so only they
// get the frosted-glass treatment; the back slot has nothing behind it to
// blur, and renders as a flat, fully opaque card per the Figma design.
function GrowthCard({ card, slotIndex, setCardRef, onAdvance }) {
  const isBack = slotIndex === 2;

  return (
    <button
      type="button"
      ref={setCardRef}
      onClick={onAdvance}
      aria-label={`Bring ${card.heading} to the front`}
      className={`absolute inset-0 flex cursor-pointer flex-col rounded-[clamp(14px,1.7361vw,25px)] px-[clamp(20px,2.5694vw,37px)] py-[clamp(18px,2.4306vw,35px)] text-left ${isBack ? "" : "backdrop-blur-[5.5px]"}`}
      style={{
        backgroundColor: isBack
          ? `rgb(${card.color})`
          : `rgba(${card.color},0.9)`,
      }}
    >
      <h3 className="max-w-[75%] font-anton-sc text-[clamp(20px,2.4306vw,35px)] uppercase leading-[1.05] text-[#101010]">
        {card.headingLines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p className="mt-[clamp(2px,0.2778vw,4px)] max-w-[65%] font-poppins text-[clamp(11px,0.8333vw,12px)] leading-[1.1] text-[#101010]">
        {card.description}
      </p>

      <div className="mt-[clamp(3px,0.3472vw,5px)] w-[64%] border-t border-[#101010]/40" />

      <div className="mt-[clamp(20px,2.6389vw,38px)] flex items-end justify-between gap-4">
        <ul className="flex flex-col gap-[clamp(8px,0.9722vw,14px)]">
          {card.points.map((point) => (
            <li key={point.label} className="font-poppins text-[#101010]">
              <p className="text-[clamp(12px,1.1111vw,16px)] font-semibold uppercase leading-[1.15]">
                {point.label} -
              </p>
              <p className="text-[clamp(10px,0.8333vw,12px)] leading-[1.15]">
                {point.detail}
              </p>
            </li>
          ))}
        </ul>
        <span className="font-anton-sc text-[clamp(48px,6.9444vw,100px)] leading-none text-[#101010]">
          {card.number}
        </span>
      </div>
    </button>
  );
}

export default function GrowthEngineSection() {
  const [order, setOrder] = useState([0, 1, 2]);
  const cardRefs = useRef([]);
  const animatingRef = useRef(false);

  const sectionRef = useRef(null);
  const leftBranchRef = useRef(null);
  const rightBranchRef = useRef(null);
  const bulletRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsWrapperRef = useRef(null);

  useLayoutEffect(() => {
    order.forEach((cardIndex, slotIndex) => {
      const el = cardRefs.current[cardIndex];
      if (el) gsap.set(el, SLOTS[slotIndex]);
    });
  }, [order]);

  // One-time entrance, played the moment the section reaches the viewport:
  // the tree branches slide in from left/right, the eyebrow line couples
  // to its first character and pulls apart like Hero's movement text, the
  // heading and description type on, and the card stack rises in from
  // below. Nothing here touches resting positions — every element ends up
  // exactly where its CSS already puts it.
  useLayoutEffect(() => {
    const eyebrowChars = [
      ...eyebrowRef.current.querySelectorAll(".sprout-char"),
    ];
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];
    const descriptionChars = [
      ...descriptionRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(leftBranchRef.current, { xPercent: -50, opacity: 0 });
      gsap.set(rightBranchRef.current, { xPercent: 50, opacity: 0 });
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(descriptionChars, { opacity: 0 });
      gsap.set(cardsWrapperRef.current, { y: 120, opacity: 0 });

      // Coupled to its first character — every other char and the bullet
      // start stacked on top of it, then pull apart outward, exactly like
      // Hero's "This is a movement" line.
      const anchorEl = eyebrowChars[0];
      const eyebrowEls = [bulletRef.current, ...eyebrowChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(eyebrowEls, {
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

      tl.to(
        [leftBranchRef.current, rightBranchRef.current],
        { xPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0,
      )
        .to(
          eyebrowEls,
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power3.out",
            stagger: { each: 0.014, from: eyebrowEls.indexOf(anchorEl) },
          },
          "-=0.4",
        )
        .to(
          headingChars,
          { opacity: 1, duration: 0.01, stagger: 0.008, ease: "none" },
          "-=0.3",
        )
        .to(
          descriptionChars,
          { opacity: 1, duration: 0.01, stagger: 0.004, ease: "none" },
          "-=0.2",
        )
        .to(
          cardsWrapperRef.current,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleAdvance() {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const newOrder = [order[1], order[2], order[0]];
    const tl = gsap.timeline({
      onComplete: () => {
        setOrder(newOrder);
        animatingRef.current = false;
      },
    });

    newOrder.forEach((cardIndex, slotIndex) => {
      const el = cardRefs.current[cardIndex];
      if (!el) return;
      gsap.set(el, { zIndex: SLOTS[slotIndex].zIndex });
      tl.to(
        el,
        {
          xPercent: SLOTS[slotIndex].xPercent,
          yPercent: SLOTS[slotIndex].yPercent,
          rotate: SLOTS[slotIndex].rotate,
          duration: 0.6,
          ease: "power2.inOut",
        },
        0,
      );
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0F0F0F] pt-[clamp(40px,4vw,58px)]"
    >
      <div
        ref={leftBranchRef}
        className="pointer-events-none absolute top-[-30%] left-[-25%] z-10 w-[50%] select-none"
      >
        <Image
          src="/images/Home/tree-branch-1.png"
          alt=""
          width={1615}
          height={2396}
          className="h-auto w-full max-w-none select-none rotate-80 -scale-x-100"
        />
      </div>
      <div
        ref={rightBranchRef}
        className="pointer-events-none absolute top-[-30%] right-[-25%] z-10 w-[50%] select-none"
      >
        <Image
          src="/images/Home/tree-branch-1.png"
          alt=""
          width={1615}
          height={2396}
          className="h-auto w-full max-w-none select-none rotate-280"
        />
      </div>
      <div className="relative mx-auto max-w-300 px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-center gap-3">
          <span ref={bulletRef} className="inline-flex opacity-0">
            <Image
              src="/images/Home/banner-bullet.png"
              alt=""
              width={20}
              height={20}
              className="h-[clamp(10px,1.0417vw,15px)] w-[clamp(10px,1.0417vw,15px)]"
            />
          </span>
          <span
            ref={eyebrowRef}
            className="font-poppins text-[clamp(16px,2.0833vw,30px)] font-medium uppercase text-[rgba(122,122,122,0.4)]"
          >
            <EyebrowChars text="The LinkedIn Growth Engine" />
          </span>
        </div>

        <h2
          ref={headingRef}
          className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-181.5 text-center font-anton-sc text-[clamp(32px,5vw,72px)] uppercase leading-none"
        >
          <span className="text-[#AC40FF]">
            <TypewriterChars text="LinkedIn at the center." />
          </span>{" "}
          <span className="text-white">
            <TypewriterChars text="Three parts, one motion." />
          </span>
        </h2>

        <p
          ref={descriptionRef}
          className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-204 text-center font-poppins text-[clamp(16px,1.3889vw,20px)] text-white"
        >
          <TypewriterChars text="Every client runs the same engine, and it lives on LinkedIn. Build the authority, start the conversations, convert them to calls. Cold calling and email wrap around it. Skip a part and you leave money on the table." />
        </p>

        <div
          ref={cardsWrapperRef}
          className="relative z-10 mx-auto mt-[clamp(56px,7.6389vw,110px)] mb-[clamp(140px,20.76vw,299px)] aspect-588/355 w-full max-w-147"
        >
          {CARDS.map((card, index) => (
            <GrowthCard
              key={card.number}
              card={card}
              slotIndex={order.indexOf(index)}
              setCardRef={(el) => {
                cardRefs.current[index] = el;
              }}
              onAdvance={handleAdvance}
            />
          ))}
        </div>
      </div>

      <Image
        src="/images/services/growth-engine-watermark.svg"
        alt=""
        width={1441}
        height={235}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
      />
    </section>
  );
}
