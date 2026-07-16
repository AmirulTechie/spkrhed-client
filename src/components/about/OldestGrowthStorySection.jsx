"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const ACTIVE_FILTER = "grayscale(0) brightness(1)";
const INACTIVE_FILTER = "grayscale(1) brightness(0.35)";

const CARDS = [
  {
    id: "magic-beans",
    title: "The Magic Beans",
    quote: "“A small bet that changes everything.”",
    body: "Most founders pass on the unglamorous move. The few who plant it own the channel everyone else ignored. For you, that is LinkedIn done right.",
    image: "/images/about/oldest-growth/handful.png",
    imageWidthPct: 55.5,
    textMaxWidthPct: 41,
  },
  {
    id: "beanstalk-branch",
    title: "The Beanstalk",
    quote: "“Watch it grow overnight.”",
    body: "One system, planted once, that climbs on its own. Compounding conversations and steady upward momentum, a real pipeline instead of a monthly scramble.",
    image: "/images/about/oldest-growth/tree-branch.png",
    imageWidthPct: 43.4,
    textMaxWidthPct: 53,
  },
  {
    id: "singing-harp",
    title: "The Singing Harp",
    quote: "“Content that calls them to you.”",
    body: "The harp sang and people came. Your content does the same. Authority that pulls the right buyers toward you before you ever send a message.",
    image: "/images/about/oldest-growth/harmony.png",
    imageWidthPct: 50.9,
    textMaxWidthPct: 45,
  },
  {
    id: "beanstalk-duck",
    title: "The Beanstalk",
    quote: "“Watch it grow overnight.”",
    body: "One system, planted once, that climbs on its own. Compounding conversations and steady upward momentum, a real pipeline instead of a monthly scramble.",
    image: "/images/about/oldest-growth/duck.png",
    imageWidthPct: 57.1,
    textMaxWidthPct: 39,
  },
  {
    id: "giant",
    title: "The Giant",
    quote: "“The loud ones fall first.”",
    body: "Market incumbents look unbeatable until you climb past them. Noise is not strength. Precision beats volume every time.",
    image: "/images/about/oldest-growth/castle.png",
    imageWidthPct: 43.9,
    textMaxWidthPct: 52,
  },
  {
    id: "axe",
    title: "The Axe",
    quote: "“Cut what isn’t working.”",
    body: "Every climb needs one decisive move. The cold calls, the dead referrals, the site that just sits there. The old way goes so the new one can grow.",
    image: "/images/about/oldest-growth/axe.png",
    imageWidthPct: 68.2,
    textMaxWidthPct: 28,
  },
];

export default function OldestGrowthStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasHovered, setHasHovered] = useState(false);
  const contentRefs = useRef([]);
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.to(el, {
        filter: index === activeIndex ? ACTIVE_FILTER : INACTIVE_FILTER,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: true,
      });
    });
  }, [activeIndex]);

  function handleHover(index) {
    setHasHovered(true);
    setActiveIndex(index);
  }

  return (
    <section className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
      <div className="relative mx-auto max-w-11/12 px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-[clamp(16px,2.2222vw,32px)] justify-between md:flex-row md:items-end md:justify-between">
          <div className=" max-w-112.5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,1.0417vw,15px)] w-[clamp(10px,1.0417vw,15px)]"
              />
              <span className="font-poppins text-[clamp(14px,1.5vw,21px)] font-medium uppercase tracking-wide text-[rgba(122,122,122,0.4)]">
                Our Story
              </span>
            </div>
            <h2 className="mt-[clamp(12px,1.6667vw,24px)] font-anton-sc text-[clamp(32px,4.1667vw,60px)] uppercase leading-[0.9] text-white">
              The oldest growth story there is.
            </h2>
          </div>

          <p className="max-w-190 font-poppins text-[clamp(14px,1.3194vw,19px)] leading-[1.3] text-white/70 text-start">
            A boy trades what little he has for a handful of beans everyone
            swears are worthless. Overnight, they climb into a kingdom of
            gold. That is the whole idea behind SPKRHED. The right small
            investment, planted well, grows further than anyone expects.
            Here is how the story maps to the work we do for you.
          </p>
        </div>

        <div className="mt-[clamp(32px,5vw,72px)] grid grid-cols-1 gap-x-[clamp(12px,1.5278vw,22px)] gap-y-[clamp(12px,1.3889vw,20px)] md:grid-cols-2">
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            const showBorder = isActive && hasHovered;

            return (
              <div
                key={card.id}
                onMouseEnter={() => handleHover(index)}
                className={`relative aspect-636/240 w-full cursor-pointer overflow-hidden rounded-[clamp(14px,5.5cqw,35px)] border transition-colors duration-500 ${
                  showBorder
                    ? "border-[rgba(255,223,130,0.55)]"
                    : "border-transparent"
                }`}
                style={{ containerType: "size" }}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="absolute inset-0"
                  style={{
                    filter: index === 0 ? ACTIVE_FILTER : INACTIVE_FILTER,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: "#191919",
                      backgroundImage:
                        "linear-gradient(270deg, rgba(220,183,84,0.09) 0%, rgba(25,25,25,0) 100%)",
                    }}
                  />

                  <div
                    className="absolute inset-y-0 right-0"
                    style={{ width: `${card.imageWidthPct}%` }}
                  >
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-contain object-bottom drop-shadow-[0_0_clamp(12px,5.5cqw,35px)_rgba(255,255,255,0.85)]"
                    />
                  </div>

                  <div
                    className="relative z-10 flex h-full flex-col pt-[clamp(8px,10cqh,24px)] pb-[clamp(6px,5cqh,14px)] pl-[clamp(12px,7cqw,44px)] pr-[clamp(12px,7cqw,44px)]"
                    style={{ maxWidth: `${card.textMaxWidthPct}%` }}
                  >
                    <h3 className="font-poppins text-[clamp(14px,5cqw,32px)] leading-[0.95] font-bold uppercase text-[#dcb754]">
                      {card.title}
                    </h3>
                    <p className="mt-[clamp(3px,3cqh,8px)] font-poppins text-[clamp(9px,1.8cqw,13px)] leading-[1.2] font-medium text-white/70 uppercase">
                      {card.quote}
                    </p>
                    <p className="mt-[clamp(4px,4cqh,10px)] font-poppins text-[clamp(9px,1.8cqw,13px)] leading-tight text-white/70">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
