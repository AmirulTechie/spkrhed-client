"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import EngineCard from "./EngineCard";

gsap.registerPlugin(ScrollTrigger);

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

// Mobile shows one card at a time inside a fixed-height box. Foundation has
// three feature blocks to Amplify's two, so it needs a taller floor to fit
// its content without overflow; this is that measured natural content
// height plus a small buffer, not a guess. Both cards share this one height
// (rather than each getting its own, shorter value) so swapping between
// them never changes the section's total height — Amplify just sits with
// extra breathing room above its bottom-pinned columns instead of shrinking
// the box, which would otherwise yank everything below the section up/down
// on every swipe.
const MOBILE_CARD_HEIGHT = "clamp(500px,88.5417vw,513px)";

export default function FoundationAmplifySection() {
  const [frontId, setFrontId] = useState("foundation");
  const [hasSwapped, setHasSwapped] = useState(false);
  const backId = frontId === "foundation" ? "amplify" : "foundation";

  const sectionRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const frontRef = useRef(null);
  const peekRightRef = useRef(null);
  const peekLeftRef = useRef(null);
  const mobileFrontRef = useRef(null);
  const animatingRef = useRef(false);
  const mountedRef = useRef(false);

  // One-time entrance, played the moment the section reaches the viewport:
  // every card (the desktop 3-slot fan and the mobile single card) pops up
  // in place — the same rise + scale-back treatment used by the homepage's
  // ProjectsSection rows — rather than sliding in from off-screen.
  useLayoutEffect(() => {
    const desktopCards = [
      peekLeftRef.current,
      frontRef.current,
      peekRightRef.current,
    ];
    const mobileCard = mobileFrontRef.current;

    const ctx = gsap.context(() => {
      gsap.set(desktopCards, { opacity: 0, y: 90, scale: 0.92 });
      gsap.to(desktopCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.set(mobileCard, { opacity: 0, y: 90, scale: 0.92 });
      gsap.to(mobileCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: mobileCard,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

    // Mobile only ever shows one card, so the "swap" is a content pop: the
    // ref's content has already re-rendered to the new front card by this
    // point, so cutting it to 0 and fading it back in reads as a swap
    // rather than an instant text change.
    tl.fromTo(
      mobileFrontRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      0.1,
    );
  }, [frontId]);

  function handleAdvance() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setHasSwapped(true);
    setFrontId((id) => (id === "foundation" ? "amplify" : "foundation"));
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black pt-[clamp(48px,10vw,144px)] pb-[clamp(48px,10vw,144px)] lg:pt-[clamp(72px,19.5139vw,281px)] lg:pb-[clamp(80px,21.8056vw,314px)]"
    >
      {/*
        Vine is absolutely positioned against the section itself, so it
        ignores the section's own pt-/pb- padding and always spans its true
        top-to-bottom edge (in Figma the vine fills the whole section box,
        edge to edge). The card deck below is a normal-flow sibling, so IT
        is the one pushed down/up by that padding.

        The top/bottom fade used to be two separately-positioned gradient
        divs stacked on top of the image. Because they were a different
        element trying to align pixel-for-pixel with the image's edges,
        subpixel rounding between the two (varying by viewport width) could
        leave a hairline seam where they didn't quite agree — visible as a
        sharp line on some mobile widths but not others. Baking the same
        fade into a mask-image on the vine itself removes the second layer
        entirely, so there's nothing left to drift out of alignment.
      */}
      <div
        className="mx-auto h-full w-full max-w-360"
        style={{ "--branch-h": "clamp(550px,76.9444vw,1108px)" }}
      >
        <Image
          src="/images/big-branch.png"
          alt=""
          width={1092}
          height={1108}
          className="absolute top-0 object-cover select-none"
          style={{
            left: "12.0833%",
            width: "75.8333%",
            height: "var(--branch-h)",
            WebkitMaskImage: `linear-gradient(to bottom,
              transparent 0%,
              rgba(0,0,0,0.05) 11.0505%,
              rgba(0,0,0,0.25) 22.1011%,
              rgba(0,0,0,0.55) 33.1516%,
              rgba(0,0,0,0.8) 44.2022%,
              black 55.2527%,
              black 71.6606%,
              transparent 100%
            )`,
            maskImage: `linear-gradient(to bottom,
              transparent 0%,
              rgba(0,0,0,0.05) 11.0505%,
              rgba(0,0,0,0.25) 22.1011%,
              rgba(0,0,0,0.55) 33.1516%,
              rgba(0,0,0,0.8) 44.2022%,
              black 55.2527%,
              black 71.6606%,
              transparent 100%
            )`,
          }}
        />
      </div>

      {/*
        Standing in for the old top overlay's opaque #0f0f0f start: softens
        the seam against GrowthEngineSection's #0F0F0F background just above.
        Unlike the old overlay this is a fixed height, not tied to
        --branch-h, so it can't drift out of sync with anything — it only
        has to agree with itself.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 h-[clamp(64px,9vw,130px)] w-full"
        style={{
          background: "linear-gradient(to bottom, #0f0f0f 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto hidden w-full max-w-360 lg:block">
        <div
          className="relative mx-auto"
          style={{ width: "clamp(665px,83.125vw,1197px)" }}
        >
          <div
            ref={cardsWrapperRef}
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
              className="absolute z-40 flex items-center justify-center rounded-full border border-white/25 backdrop-blur-[5.5px] cursor-pointer hover:border-white/50 hover:backdrop-blur-2xl transition-colors"
              style={{
                width: "clamp(72px,8.3333vw,120px)",
                height: "clamp(72px,8.3333vw,120px)",
                right: "clamp(-76px,-9.375vw,-135px)",
                top: "60.8%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(15,15,15,0.6)",
              }}
            >
              <ArrowRight
                className={`h-[38%] w-[38%] text-white ${hasSwapped ? "" : "arrow-pulse"}`}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      {/*
        Mobile: the fanned 3-card deck needs ~665px of width to read as
        intended, so below lg it's replaced with a single full-width card.
        The arrow click still drives the same frontId/backId state and GSAP
        swap timeline above — only the visual treatment differs (a content
        pop instead of a spatial slide).
      */}
      <div className="relative mx-auto w-full max-w-137 px-6 pb-19 lg:hidden">
        <div className="relative" style={{ height: MOBILE_CARD_HEIGHT }}>
          <EngineCard
            card={CARDS[frontId]}
            cardRef={mobileFrontRef}
            variant="front"
            className="z-20"
            style={{ left: 0, top: 0, width: "100%", height: "100%" }}
          />

          {/*
            This button hangs 60px below the card box on purpose (the swipe
            affordance pokes past the card edge by design). The section's
            own bottom padding floors out at 48px on narrow viewports, which
            used to be less than the button's overhang, so `overflow-hidden`
            on the section clipped it. The pb-19 (76px) on this wrapper
            (60px overhang + margin) reserves real flow space so the button
            always has room, independent of the section's own padding.
          */}
          <button
            type="button"
            onClick={handleAdvance}
            aria-label="Swap the engine pillar shown"
            className="absolute z-40 flex items-center justify-center rounded-full border border-white/25 bg-[#0F0F0F]/70 backdrop-blur-[5.5px] cursor-pointer"
            style={{
              width: "60px",
              height: "60px",
              right: "16px",
              bottom: "-60px",
            }}
          >
            <ArrowRight
              className={`h-[38%] w-[38%] text-white ${hasSwapped ? "" : "arrow-pulse"}`}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
