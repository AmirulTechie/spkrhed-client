"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Deck of "/Problem" cards — content only. Add another object to shuffle in
// a new card: number, label, heading, description, and bullet points.
// Color is tied to card identity, not stack position: only the first card
// (index 0) is styled purple, every other card is gray, regardless of
// whether it's currently on top or behind (see PURPLE_STYLE / GRAY_STYLE
// below).
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

const PURPLE_STYLE = { bg: "#AC40FF", labelColor: "#FFFFFF" };
const GRAY_STYLE = { bg: "#CECECE", labelColor: "#101010" };

const DESCRIPTION_TEXT =
  "You're the strategist, the creator, the sales team, and the closer. If you disappear for a week, so does your pipeline. That's not a business — that's a job you can never step away from.";

function styleForCardIndex(index) {
  return index === 0 ? PURPLE_STYLE : GRAY_STYLE;
}

// Splits text into words (kept as real space text nodes between them, so
// wrapping stays natural) and each word into individually animatable
// characters — the same "type on" building block used by Hero's headings.
function SproutChars({ text }) {
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

// One clipped row: chars sprout up from a hidden baseline inside it,
// mirroring Hero's <Line> treatment for its display headings.
function SproutLine({ children, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <span className="block">{children}</span>
    </div>
  );
}

function ProblemCard({ card }) {
  return (
    <>
      <span
        style={{ color: "var(--label-color)" }}
        className="font-poppins text-[11px] font-semibold uppercase sm:text-[clamp(14px,1.7361vw,25px)]"
      >
        {card.label}
      </span>
      <h3 className="mt-2 max-w-md font-anton-sc text-[20px] uppercase leading-[0.97] text-[#101010] sm:mt-[clamp(20px,2.8472vw,41px)] sm:text-[clamp(28px,4.1667vw,60px)]">
        {card.heading}
      </h3>
      <p className="mt-2 max-w-md font-poppins text-[12px] font-medium leading-[1.2] text-[#101010] sm:mt-[clamp(16px,2.1528vw,31px)] sm:text-[clamp(14px,1.3889vw,20px)] sm:leading-[1.1]">
        {card.description}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-4 sm:pt-[clamp(24px,3.3333vw,48px)]">
        <ul className="font-poppins text-[12px] font-semibold leading-[1.3] text-[#101010] sm:text-[clamp(14px,1.3889vw,20px)] sm:leading-[1.1]">
          {card.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <span className="font-anton-sc text-[32px] leading-[1.1] text-[#101010] sm:text-[clamp(56px,8.3333vw,120px)]">
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
  const sectionRef = useRef(null);
  const bulletRef = useRef(null);
  const soundFamiliarRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const leafTopRef = useRef(null);
  const leafLeftRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const topRef = useRef(null);
  const backRef = useRef(null);
  const animatingRef = useRef(false);

  const topIndex = order[0];
  const backIndex = order[1 % order.length];
  const topCard = PROBLEM_CARDS[topIndex];
  const backCard = PROBLEM_CARDS[backIndex];
  const topCardStyle = styleForCardIndex(topIndex);
  const backCardStyle = styleForCardIndex(backIndex);

  useLayoutEffect(() => {
    if (!topRef.current || !backRef.current) return;
    gsap.set(topRef.current, { x: 0, y: 0, rotate: 0, opacity: 1 });
    gsap.set(backRef.current, {
      x: 0,
      yPercent: 8.7,
      rotate: -1.95,
      opacity: 1,
    });
  }, [order]);

  // One-time entrance: "Sound familiar?" sprouts in with the same
  // char-coupling technique as Hero's "This is a movement" line, the
  // heading/description type on character by character, the leaves drift
  // in from off-section, and the card stack slides in from the right.
  useLayoutEffect(() => {
    const soundFamiliarChars = [
      ...soundFamiliarRef.current.querySelectorAll(".sprout-char"),
    ];
    const headingChars = [...headingRef.current.querySelectorAll(".sprout-char")];
    const descriptionChars = [
      ...descriptionRef.current.querySelectorAll(".sprout-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(headingChars, { opacity: 0, yPercent: 60, filter: "blur(6px)" });
      gsap.set(descriptionChars, { opacity: 0, yPercent: 50 });

      gsap.set(leafLeftRef.current, { rotate: 160, opacity: 0, x: -160 });
      gsap.set(cardsWrapperRef.current, { opacity: 0, x: 160 });
      gsap.set(leafTopRef.current, {
        opacity: 0,
        x: 80,
        y: -140,
        rotate: -20,
      });

      // "Sound familiar?" is coupled to its first character — every other
      // char and the bullet start stacked on top of it, then pull apart
      // outward, exactly like Hero's movement text.
      const anchorEl = soundFamiliarChars[0];
      const soundFamiliarEls = [bulletRef.current, ...soundFamiliarChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(soundFamiliarEls, {
        opacity: 0,
        x: (_, target) => anchorLeft - target.getBoundingClientRect().left,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(soundFamiliarEls, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.032, from: soundFamiliarEls.indexOf(anchorEl) },
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
          descriptionChars,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.3,
            stagger: 0.008,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .to(
          leafLeftRef.current,
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "<",
        )
        .to(
          cardsWrapperRef.current,
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "<",
        )
        .to(
          leafTopRef.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "<0.1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleShuffle() {
    if (animatingRef.current) return;
    animatingRef.current = true;

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
        {
          x: 0,
          yPercent: 0,
          rotate: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );
  }

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative z-10 -mt-[clamp(56px,4.4444vw,64px)] overflow-hidden rounded-5xl bg-[#F0F0EA]"
    >
      <Image
        ref={leafTopRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute left-[70%] top-[7%] z-20 w-[clamp(60px,9.7014vw,140px)] select-none"
      />
      <Image
        ref={leafLeftRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute left-[17.16%] top-[62%] z-0 w-[clamp(54px,8.7188vw,126px)] select-none"
      />

      <div className="relative mx-auto max-w-360 px-[clamp(20px,3.1944vw,46px)] py-[clamp(40px,6.9444vw,100px)]">
        <div className="grid grid-cols-1 items-start gap-x-[clamp(32px,6.1111vw,88px)] gap-y-[clamp(32px,3.3333vw,48px)] md:grid-cols-2 lg:grid-cols-[526fr_647fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span ref={bulletRef} className="inline-flex opacity-0">
                <Image
                  src="/images/Home/banner-bullet.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-[clamp(10px,1.0271vw,15px)] w-[clamp(10px,1.0271vw,15px)]"
                />
              </span>
              <span
                ref={soundFamiliarRef}
                className="font-poppins text-[clamp(20px,2.6389vw,38px)] font-semibold uppercase text-[#424242]"
              >
                <SproutChars text="Sound familiar?" />
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-anton-sc text-[clamp(32px,6.25vw,90px)] uppercase leading-[97%] text-black"
            >
              <SproutLine>
                <SproutChars text="Every client" />
              </SproutLine>
              <SproutLine>
                <SproutChars text="you have" />{" "}
                <span className="text-[#AC40FF]">
                  <SproutChars text="came" />
                </span>
              </SproutLine>
              <SproutLine className="text-[#AC40FF]">
                <SproutChars text="from you." />
              </SproutLine>
            </h2>

            <p
              ref={descriptionRef}
              className="relative z-10 mt-4 max-w-lg font-poppins text-[clamp(16px,1.5278vw,22px)] font-medium leading-[0.97] text-black lg:top-50"
            >
              <SproutChars text={DESCRIPTION_TEXT} />
            </p>
          </div>

          <div
            ref={cardsWrapperRef}
            className="relative w-full lg:aspect-647/565.5"
          >
            {/* Absolutely positioned, so it shares the exact size of the
                front card below instead of drifting out of sync with it. */}
            <div
              ref={backRef}
              aria-hidden="true"
              className="absolute inset-0 flex flex-col rounded-[clamp(8px,0.8333vw,12px)] p-4 sm:p-[clamp(24px,2.7778vw,40px)]"
              style={{
                backgroundColor: backCardStyle.bg,
                "--label-color": backCardStyle.labelColor,
              }}
            >
              <ProblemCard card={backCard} />
            </div>

            <button
              type="button"
              ref={topRef}
              onClick={handleShuffle}
              aria-label="Show next problem card"
              className="relative z-10 flex h-full w-full flex-col rounded-[clamp(8px,0.8333vw,12px)] p-4 text-left cursor-pointer sm:p-[clamp(24px,2.7778vw,40px)]"
              style={{
                backgroundColor: topCardStyle.bg,
                "--label-color": topCardStyle.labelColor,
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
