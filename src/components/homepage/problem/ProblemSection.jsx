"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

// Deck of "/Problem" cards — content only. Add another object to shuffle in
// a new card: number, label, heading, description, and bullet points.
// Color isn't part of the data: whichever card is on top is always styled
// purple, and whatever's behind it is always styled gray (see FRONT_STYLE /
// BACK_STYLE below).
const PROBLEM_CARDS = [
  {
    number: "01",
    label: "/Problem",
    heading: "Feast or famine, every quarter",
    description:
      "One month you're turning people away. The next, you're refreshing your inbox wondering where everyone went.",
    points: [
      "Volatility",
      "Inconsistency",
      "Unpredictable Growth",
      "Founder-Led Manual Outreach",
      "Single Point of Failure",
    ],
  },
  {
    number: "02",
    label: "/Problem",
    heading: "Feast or famine, every quarter",
    description:
      "One month you're turning people away. The next, you're refreshing your inbox wondering where everyone went.",
    points: [
      "Volatility",
      "Inconsistency",
      "Unpredictable Growth",
      "Founder-Led Manual Outreach",
      "Single Point of Failure",
    ],
  },
];

const FRONT_STYLE = { bg: "#AC40FF", labelColor: "#FFFFFF" };
const BACK_STYLE = { bg: "#CECECE", labelColor: "#101010" };

function ProblemCard({ card }) {
  return (
    <>
      <span
        style={{ color: "var(--label-color)" }}
        className="font-poppins text-[clamp(14px,1.25vw,18px)] font-semibold uppercase tracking-wide"
      >
        {card.label}
      </span>
      <h3 className="mt-3 font-anton-sc text-[70px] uppercase leading-[97%] text-[#101010] max-w-xl">
        {card.heading}
      </h3>
      <p className="mt-5 max-w-sm font-poppins text-[clamp(13px,1.1111vw,16px)] font-medium leading-[140%] text-[#101010]">
        {card.description}
      </p>

      <div className="mt-10 flex items-end justify-between gap-4">
        <ul className="font-poppins text-[clamp(13px,1.1111vw,16px)] font-semibold leading-[150%] text-[#101010]">
          {card.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <span className="font-anton-sc text-[clamp(48px,5.5556vw,80px)] leading-none text-[#101010]">
          {card.number}
        </span>
      </div>
    </>
  );
}

export default function ProblemSection() {
  // Front-to-back order of card indexes. Shuffling rotates the front index
  // to the end of the array, so the deck cycles forever instead of running out.
  const [order, setOrder] = useState(() =>
    PROBLEM_CARDS.map((_, index) => index),
  );
  const topRef = useRef(null);
  const backRef = useRef(null);
  const animatingRef = useRef(false);

  const topCard = PROBLEM_CARDS[order[0]];
  const backCard = PROBLEM_CARDS[order[1 % order.length]];

  useLayoutEffect(() => {
    if (!topRef.current || !backRef.current) return;
    gsap.set(topRef.current, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    gsap.set(backRef.current, {
      x: 6,
      y: 10,
      rotate: -1.95,
      scale: 0.97,
      opacity: 1,
    });
  }, [order]);

  function handleShuffle() {
    if (animatingRef.current) return;
    animatingRef.current = true;

    // The back card is about to slide into the front spot — recolor it to
    // the front style right now, while it's still fully hidden behind the
    // opaque outgoing front card, so it's already purple by the time it
    // becomes visible instead of popping from gray to purple mid-slide.
    gsap.set(backRef.current, {
      backgroundColor: FRONT_STYLE.bg,
      "--label-color": FRONT_STYLE.labelColor,
    });

    gsap
      .timeline({
        onComplete: () => {
          setOrder((current) => [...current.slice(1), current[0]]);
          animatingRef.current = false;
        },
      })
      .to(topRef.current, {
        x: 140,
        y: -24,
        rotate: 14,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      })
      .to(
        backRef.current,
        { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );
  }

  return (
    <section className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] overflow-x-hidden rounded-5xl bg-[#F0F0EA] pt-30">
      <div className="relative px-[clamp(32px,5.5556vw,80px)] py-[clamp(40px,6.9444vw,100px)]">
        <Image
          src="/images/Home/leaf.png"
          alt=""
          width={200}
          height={148}
          className="pointer-events-none absolute right-[10%] top-[0%] w-[clamp(56px,6.25vw,90px)] -scale-x-100 rotate-150 select-none"
        />
        <Image
          src="/images/Home/leaf.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute left-[15%] top-[36%] w-[clamp(36px,3.6111vw,52px)] rotate-165 select-none"
        />

        <div className="grid grid-cols-1 items-start gap-x-[clamp(32px,3.0556vw,44px)] gap-y-12 lg:grid-cols-[589fr_647fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
              />
              <span className="font-poppins text-[38px] font-semibold uppercase text-[#424242]">
                Sound familiar?
              </span>
            </div>

            <h2 className="font-anton-sc text-[clamp(32px,4.7222vw,90px)] uppercase leading-[0.97] text-black">
              Every client{" "}
              <span className="block">
                you have <span className="text-[#AC40FF]">came</span>
              </span>
              <span className="block text-[#AC40FF]">from you.</span>
            </h2>

            <p className="mt-8 max-w-md font-poppins text-[20px] font-medium leading-[97%] text-black">
              You&apos;re the strategist, the creator, the sales team, and the
              closer. If you disappear for a week, so does your pipeline.
              That&apos;s not a business — that&apos;s a job you can never
              step away from.
            </p>
          </div>

          <div className="relative">
            {/* Absolutely positioned, so it takes its size from the front
                card below (the only element in normal flow) instead of
                forcing a fixed aspect ratio that outgrows its content. */}
            <div
              ref={backRef}
              aria-hidden="true"
              className="absolute inset-0 flex flex-col rounded-[clamp(16px,1.6667vw,24px)] p-[clamp(24px,2.7778vw,40px)]"
              style={{
                backgroundColor: BACK_STYLE.bg,
                "--label-color": BACK_STYLE.labelColor,
              }}
            >
              <ProblemCard card={backCard} />
            </div>

            <button
              type="button"
              ref={topRef}
              onClick={handleShuffle}
              aria-label="Show next problem card"
              className="relative z-10 flex w-full flex-col rounded-[clamp(16px,1.6667vw,24px)] p-[clamp(24px,2.7778vw,40px)] text-left cursor-pointer"
              style={{
                backgroundColor: FRONT_STYLE.bg,
                "--label-color": FRONT_STYLE.labelColor,
              }}
            >
              <ProblemCard card={topCard} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
