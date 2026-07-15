"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import EngineCard from "./EngineCard";

const CARDS = {
  foundation: {
    id: "foundation",
    shape: "/images/services/foundation-card-shape.svg",
    mask: "/images/services/foundation-card-mask.svg",
    heightPx: 513,
    eyebrow: "FOUNDATION",
    headingLines: [
      { text: "Build what the engine", color: "purple" },
      { text: "runs on.", color: "white" },
    ],
    body: "The engine needs somewhere to send people and something to run on behind the scenes. We build both, so nothing your LinkedIn outreach creates ever gets wasted.",
    columns: [
      [
        {
          label: "Website Development",
          detail:
            "A site built to close, not just sit there. We turn the traffic your LinkedIn presence drives into booked calls, with the funnel wired in from the start.",
        },
        {
          label: "GHL Handling",
          detail:
            "We set up and run your GoHighLevel backend. CRM, pipelines, automations and follow-up, all wired so no lead falls through the cracks.",
        },
      ],
      [
        {
          label: "Recruitment Landing Pages",
          detail:
            "Purpose-built pages for staffing and recruitment firms. Made to convert applicants and client leads on their own, not just look the part.",
        },
      ],
    ],
  },
  amplify: {
    id: "amplify",
    shape: "/images/services/amplify-card-shape.svg",
    mask: "/images/services/amplify-card-mask.svg",
    heightPx: 441,
    eyebrow: "AMPLIFY",
    headingLines: [
      { text: "Pour fuel on what", color: "purple" },
      { text: "already works.", color: "white" },
    ],
    body: "Once the engine proves a message converts organically, paid takes that exact message and puts it in front of more of the right people.",
    columns: [
      [
        {
          label: "Meta & Cross-Channel Ads",
          detail:
            "Facebook and Instagram ads for retargeting and social proof, built to feed the same funnel. Catch the buyers who saw you on LinkedIn everywhere else they scroll.",
        },
      ],
      [
        {
          aside:
            "So far the engine fills the top and the foundation holds it. Next we stop the leaks, then layer on the premium plays that pull buyers toward you.",
        },
      ],
    ],
  },
};

// Front and peek-right share the same top edge, so the swap is a pure
// horizontal move. This is the xPercent distance between the two slots,
// derived from Figma (peek-right left% minus front left%, both relative to
// the container the cards fill edge to edge).
const SWAP_X_PERCENT = 77.33;

export default function FoundationAmplifySection() {
  const [frontId, setFrontId] = useState("foundation");
  const backId = frontId === "foundation" ? "amplify" : "foundation";

  const frontRef = useRef(null);
  const peekRightRef = useRef(null);
  const peekLeftRef = useRef(null);
  const animatingRef = useRef(false);
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    tl.fromTo(
      frontRef.current,
      { xPercent: SWAP_X_PERCENT },
      { xPercent: 0, duration: 0.6, ease: "power2.inOut" },
      0,
    );
    tl.fromTo(
      peekRightRef.current,
      { xPercent: -SWAP_X_PERCENT },
      { xPercent: 0, duration: 0.6, ease: "power2.inOut" },
      0,
    );
    tl.fromTo(
      peekLeftRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power1.out" },
      0.15,
    );
  }, [frontId]);

  function handleAdvance() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setFrontId((id) => (id === "foundation" ? "amplify" : "foundation"));
  }

  return (
    <section className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
      <Image
        src="/images/big-branch.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute bottom-[-10%] left-[-15%] w-[65%] max-w-none -scale-x-100 select-none"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[30%] bg-linear-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-[30%] bg-linear-to-b from-transparent to-black"
      />

      <div className="relative mx-auto max-w-300 px-8 sm:px-12 lg:px-16">
        <div
          className="relative"
          style={{ minHeight: "clamp(320px,35.625vw,513px)" }}
        >
          <EngineCard
            card={CARDS[backId]}
            cardRef={peekLeftRef}
            variant="back"
            className="z-10"
            style={{
              left: "-48.67%",
              width: "100%",
              top: "clamp(28px,5vw,72px)",
              height: `clamp(${CARDS[backId].heightPx * 0.55}px,${(CARDS[backId].heightPx / 1440) * 100}vw,${CARDS[backId].heightPx}px)`,
            }}
          />
          <EngineCard
            card={CARDS[backId]}
            cardRef={peekRightRef}
            variant="back"
            className="z-20"
            style={{
              left: "77.33%",
              width: "100%",
              top: 0,
              height: `clamp(${CARDS[backId].heightPx * 0.55}px,${(CARDS[backId].heightPx / 1440) * 100}vw,${CARDS[backId].heightPx}px)`,
            }}
          />
          <EngineCard
            card={CARDS[frontId]}
            cardRef={frontRef}
            variant="front"
            className="z-30"
            style={{
              left: "0%",
              width: "100%",
              top: 0,
              height: `clamp(${CARDS[frontId].heightPx * 0.55}px,${(CARDS[frontId].heightPx / 1440) * 100}vw,${CARDS[frontId].heightPx}px)`,
            }}
          />

          <button
            type="button"
            onClick={handleAdvance}
            aria-label="Swap the engine pillar shown up front"
            className="absolute z-40 flex items-center justify-center rounded-full backdrop-blur-[5.5px]"
            style={{
              width: "clamp(48px,5.9722vw,86px)",
              height: "clamp(48px,5.9722vw,86px)",
              right: "clamp(-24px,-2.9861vw,-43px)",
              top: "60.8%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(15,15,15,0.5)",
            }}
          >
            <Image
              src="/images/services/engine-arrow-icon.svg"
              alt=""
              width={28}
              height={28}
              className="h-[35%] w-[35%]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
