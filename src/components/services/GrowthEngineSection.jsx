"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

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
    bg: "rgba(172,64,255,0.9)",
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
    bg: "rgba(210,210,210,0.9)",
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
    bg: "rgba(210,210,210,0.9)",
  },
];

// The three fan-out slots the cards cycle through: front (centered, on top),
// mid (behind, offset left), back (behind, offset right and lower). Offsets
// are percentages of the card's own size, so the fan holds at any viewport.
const SLOTS = [
  { xPercent: 0, yPercent: 0, rotate: 0, zIndex: 3 },
  { xPercent: -20, yPercent: 12, rotate: -5, zIndex: 2 },
  { xPercent: 21, yPercent: 21, rotate: 5, zIndex: 1 },
];

function GrowthCard({ card, setCardRef, onAdvance }) {
  return (
    <button
      type="button"
      ref={setCardRef}
      onClick={onAdvance}
      aria-label={`Bring ${card.heading} to the front`}
      className="absolute inset-0 flex cursor-pointer flex-col rounded-[clamp(14px,1.7361vw,25px)] p-[clamp(20px,2.7778vw,40px)] text-left backdrop-blur-[5.5px]"
      style={{ backgroundColor: card.bg }}
    >
      <h3 className="max-w-[75%] font-anton-sc text-[clamp(20px,2.4306vw,35px)] uppercase leading-[1.05] text-[#101010]">
        {card.headingLines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p className="mt-[clamp(8px,0.8333vw,12px)] max-w-[65%] font-poppins text-[clamp(11px,0.8333vw,12px)] leading-[1.1] text-[#101010]">
        {card.description}
      </p>

      <div className="mt-[clamp(16px,2.2222vw,32px)] max-w-[65%] border-t border-[#101010]/30" />

      <div className="mt-auto flex items-end justify-between gap-4">
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

  useLayoutEffect(() => {
    order.forEach((cardIndex, slotIndex) => {
      const el = cardRefs.current[cardIndex];
      if (el) gsap.set(el, SLOTS[slotIndex]);
    });
  }, [order]);

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
    <section className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -top-[15%] -left-[25%] w-[50%] max-w-none select-none rotate-80 -scale-x-100"
      />
      <div className="w-48 h-28 bg-gradient-to-b from-stone-950 to-stone-950/0 z-999" />
      <div className="relative mx-auto max-w-[1200px] px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/images/Home/banner-bullet.png"
            alt=""
            width={20}
            height={20}
            className="h-[clamp(10px,1.0417vw,15px)] w-[clamp(10px,1.0417vw,15px)]"
          />
          <span className="font-poppins text-[clamp(16px,2.0833vw,30px)] font-medium uppercase text-[rgba(122,122,122,0.4)]">
            The LinkedIn Growth Engine
          </span>
        </div>

        <h2 className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-[726px] text-center font-anton-sc text-[clamp(32px,5vw,72px)] uppercase leading-[1]">
          <span className="text-[#AC40FF]">LinkedIn at the center. </span>
          <span className="text-white">Three parts, one motion.</span>
        </h2>

        <p className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-[816px] text-center font-poppins text-[clamp(16px,1.3889vw,20px)] text-white">
          Every client runs the same engine, and it lives on LinkedIn. Build
          the authority, start the conversations, convert them to calls.
          Cold calling and email wrap around it. Skip a part and you leave
          money on the table.
        </p>

        <div className="relative z-10 mx-auto mt-[clamp(56px,7.6389vw,110px)] aspect-588/355 w-full max-w-[588px]">
          {CARDS.map((card, index) => (
            <GrowthCard
              key={card.number}
              card={card}
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
        className="pointer-events-none absolute inset-x-0 bottom-[clamp(16px,3vw,48px)] mx-auto w-[90%] max-w-[1441px] select-none"
      />
    </section>
  );
}
