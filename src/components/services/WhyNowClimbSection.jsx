"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const ACTIVE_FILTER = "grayscale(0) brightness(1)";
const INACTIVE_FILTER = "grayscale(1) brightness(0.35)";

const CARDS = [
  {
    id: "cow",
    title: "The Cow",
    quote: "“Stop trading your best hours for nothing.”",
    body: "Cold calls, dead referrals, a site that just sits there. Most founders keep feeding their last good asset, their time, into channels that quit paying. That ends here.",
    image: "/images/services/why-now/cow.png",
    imageWidthPct: 52.4,
    textMaxWidthPct: 44,
  },
  {
    id: "overnight-climb",
    title: "The Overnight Climb",
    quote: "“It grows while you sleep.”",
    body: "The system runs whether you are on a call, on a flight, or off the clock. Conversations get started and nurtured in the background, every single day.",
    image: "/images/services/why-now/moon.png",
    imageWidthPct: 54.3,
    textMaxWidthPct: 42,
  },
  {
    id: "clouds",
    title: "The Clouds",
    quote: "“Your market is higher than you think.”",
    body: "The buyers worth the most sit above where your competitors bother to look. We climb past the noise and start the conversations they never reach.",
    image: "/images/services/why-now/cloud.png",
    imageWidthPct: 54.4,
    textMaxWidthPct: 42,
  },
  {
    id: "treasure-room",
    title: "The Treasure Room",
    quote: "“The access is already yours.”",
    body: "The opportunities you want are often one introduction deep inside networks you can already reach. We unlock what is sitting right there waiting.",
    image: "/images/services/why-now/door.png",
    imageWidthPct: 56.5,
    textMaxWidthPct: 40,
  },
  {
    id: "fee-fi-fo-fum",
    title: "Fee-Fi-Fo-Fum",
    quote: "“Loud is not the same as strong.”",
    body: "Your noisiest competitors win on volume, not precision. A sharper message to the right person beats a louder one to everyone, every time.",
    image: "/images/services/why-now/speaker.png",
    imageWidthPct: 64.2,
    textMaxWidthPct: 33,
  },
  {
    id: "jacks-courage",
    title: "Jack’s Courage",
    quote: "“Someone has to make the climb.”",
    body: "Every result starts with the decision to go. We do not sell magic. We hand you the beans, then climb right alongside you.",
    image: "/images/services/why-now/compass.png",
    imageWidthPct: 37.7,
    textMaxWidthPct: 58,
  },
];

export default function WhyNowClimbSection() {
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
      <Image
        src="/images/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-80"
      />

      <div className="relative mx-auto max-w-300 px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-[clamp(16px,2.2222vw,32px)] justify-between md:flex-row md:items-end md:justify-between">
          <div className="max-w-159">
            <div className="flex items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,1.0417vw,15px)] w-[clamp(10px,1.0417vw,15px)]"
              />
              <span className="font-poppins text-[clamp(14px,1.5vw,21px)] font-medium uppercase tracking-wide text-[rgba(122,122,122,0.4)]">
                Why Now &middot; The Climb
              </span>
            </div>
            <h2 className="mt-[clamp(12px,1.6667vw,24px)] font-anton-sc text-[clamp(32px,4.1667vw,60px)] uppercase leading-[0.9] text-white">
              Most founders are still trading the cow.
            </h2>
          </div>

          <p className="max-w-108.5 font-poppins text-[clamp(11px,0.9028vw,13px)] leading-relaxed text-white uppercase md:text-right">
            Before SPKRHED, growth means burning your best hours on cold
            calls, dead referrals, and a website that just sits there.
            Meanwhile the buyers worth the most are sitting one climb above
            where your competitors bother to look. Here is what changes the
            moment you plant the beans.
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
                  <div className="absolute inset-0 bg-[#191919]" />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(270deg, rgba(220,183,84,0.09) 0%, rgba(25,25,25,0) 100%)",
                    }}
                  />

                  <div
                    className="absolute inset-y-0 right-0 shadow-[0_0_clamp(12px,5.5cqw,35px)_rgba(255,255,255,0.85)]"
                    style={{ width: `${card.imageWidthPct}%` }}
                  >
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-contain object-bottom"
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
