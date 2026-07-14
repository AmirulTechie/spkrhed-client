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
        className="font-poppins text-[clamp(14px,1.7361vw,25px)] font-semibold uppercase"
      >
        {card.label}
      </span>
      <h3 className="mt-[clamp(20px,2.8472vw,41px)] max-w-xl font-anton-sc text-[clamp(28px,4.1667vw,60px)] uppercase leading-[0.97] text-[#101010]">
        {card.heading}
      </h3>
      <p className="mt-[clamp(16px,2.1528vw,31px)] max-w-sm font-poppins text-[clamp(14px,1.3889vw,20px)] font-medium leading-[1.1] text-[#101010]">
        {card.description}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-[clamp(24px,3.3333vw,48px)]">
        <ul className="font-poppins text-[clamp(14px,1.3889vw,20px)] font-semibold leading-[1.1] text-[#101010]">
          {card.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <span className="font-anton-sc text-[clamp(56px,8.3333vw,120px)] leading-[1.1] text-[#101010]">
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
      x: 0,
      y: 16,
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
    <section
      id="problem"
      className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] overflow-hidden rounded-5xl bg-[#F0F0EA] pt-30"
    >
      <Image
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute left-[80.26%] top-[20.89%] z-20 w-[clamp(60px,9.7014vw,140px)] -scale-x-100 rotate-12 select-none"
      />
      <Image
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute left-[17.16%] top-[62%] z-0 w-[clamp(54px,8.7188vw,126px)] select-none rotate-160"
      />

      <div className="relative px-[clamp(32px,5.5556vw,80px)] py-[clamp(40px,6.9444vw,100px)]">
        <div className="grid grid-cols-1 items-start gap-x-[clamp(32px,6.1111vw,88px)] gap-y-12 lg:grid-cols-[526fr_647fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,1.0271vw,15px)] w-[clamp(10px,1.0271vw,15px)]"
              />
              <span className="font-poppins text-[clamp(20px,2.6389vw,38px)] font-semibold uppercase text-[#424242]">
                Sound familiar?
              </span>
            </div>

            <h2 className="font-anton-sc text-[clamp(32px,6.25vw,90px)] uppercase leading-[97%] text-black">
              Every client{" "}
              <span className="block">
                you have <span className="text-[#AC40FF]">came</span>
              </span>
              <span className="block text-[#AC40FF]">from you.</span>
            </h2>

            <p className="relative z-10 mt-8 max-w-md font-poppins text-[clamp(16px,1.5278vw,22px)] font-medium leading-[0.97] text-black top-50">
              You&apos;re the strategist, the creator, the sales team, and the
              closer. If you disappear for a week, so does your pipeline.
              That&apos;s not a business — that&apos;s a job you can never
              step away from.
            </p>
          </div>

          <div className="relative w-full lg:aspect-647/565.5">
            {/* Absolutely positioned, so it shares the exact size of the
                front card below instead of drifting out of sync with it. */}
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
              className="relative z-10 flex h-full w-full flex-col rounded-[clamp(16px,1.6667vw,24px)] p-[clamp(24px,2.7778vw,40px)] text-left cursor-pointer"
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
