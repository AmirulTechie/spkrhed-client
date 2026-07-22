"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACTIVE_FILTER = "grayscale(0) brightness(1)";
const INACTIVE_FILTER = "grayscale(1) brightness(0.35)";
const BULLET_TEXT = "Why Now · The Climb";
const HEADING_TEXT = "Most founders are still trading the cow.";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable span —
// the same char-level building block ProjectsSection uses for its bullet,
// heading, and description entrance.
function SproutChars({ text, charClassName = "sprout-char" }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block">
        {word.split("").map((char, ci) => (
          <span
            key={ci}
            className={`${charClassName} inline-block opacity-0`}
          >
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

// Card geometry is authored 1:1 from the Figma frame (636x240) and converted
// to container-query units so it scales exactly with the card at any size.
const CARD_W = 636;
const CARD_H = 240;
const pct = (px, base) => `${+((px / base) * 100).toFixed(4)}`;
const cw = (px) => `${pct(px, CARD_W)}cqw`;
const ch = (px) => `${pct(px, CARD_H)}cqh`;
const fluidFont = (px, minPx) => `clamp(${minPx}px, ${pct(px, CARD_W)}cqw, ${px}px)`;

const TEXT_LEFT = cw(54);
const TITLE_TOP = ch(34);
const QUOTE_TOP = ch(109);
const TITLE_FONT = fluidFont(40, 18);
const BODY_FONT = fluidFont(13, 10);

// Below the "@[500px]/card" container-query breakpoint used throughout
// this section (the card's own rendered width, not the viewport — this
// grid switches between 1 and 2 columns, so the same viewport width can
// mean very different card widths) the text column and image use
// different proportions than the desktop design: the image shrinks to a
// fixed 30% (instead of the 43-68% each card uses on desktop) and text
// gets a much wider fixed column (78cqw), because the floor font sizes in
// fluidFont() stop shrinking well before narrow cards do — without the
// extra room, body copy that wraps to 3-4 lines on a wide card wraps to
// 7-8 on a narrow one and overflows it. Desktop keeps each card's
// authored proportions via the `--*-desktop` custom properties, restored
// once the card itself (queried via the named `card` container below) is
// wide enough. The threshold sits just above where BODY_FONT's
// cqw-derived size first exceeds its 10px floor (~489px), so the switch
// lands where the fixed-percentage desktop layout starts having real
// room to work.
//
// The breakpoint is written as a literal string everywhere it's used
// (never interpolated from a JS variable) because Tailwind's build-time
// scanner extracts candidate classes from the raw source text — a
// template-interpolated variant like `${SOME_VAR}:w-...` never appears in
// the file as the real class string, so no CSS would be generated for it.
const MOBILE_IMAGE_WIDTH = "w-[30%]";
const MOBILE_TEXT_WIDTH = "w-[78cqw]";

const CARDS = [
  {
    id: "cow",
    title: "The Cow",
    titleWidth: 153,
    quote: "“Stop trading your best hours for nothing.”",
    quoteWidth: 320,
    body: "Cold calls, dead referrals, a site that just sits there. Most founders keep feeding their last good asset, their time, into channels that quit paying. That ends here.",
    bodyTop: 169,
    bodyWidth: 339,
    image: "/images/services/why-now/cow.png",
    imageWidthPct: 46.9,
  },
  {
    id: "overnight-climb",
    title: "The Overnight Climb",
    titleWidth: 317,
    quote: "“It grows while you sleep.”",
    quoteNowrap: true,
    body: "The system runs whether you are on a call, on a flight, or off the clock. Conversations get started and nurtured in the background, every single day.",
    bodyTop: 161,
    bodyWidth: 313,
    image: "/images/services/why-now/moon.png",
    imageWidthPct: 48.7,
  },
  {
    id: "clouds",
    title: "The Clouds",
    titleWidth: 165,
    quote: "“Your market is higher than you think.”",
    quoteNowrap: true,
    body: "The buyers worth the most sit above where your competitors bother to look. We climb past the noise and start the conversations they never reach.",
    bodyTop: 175,
    bodyWidth: 339,
    image: "/images/services/why-now/cloud.png",
    imageWidthPct: 48.9,
  },
  {
    id: "treasure-room",
    title: "The Treasure Room",
    titleWidth: 291,
    quote: "“The access is already yours.”",
    quoteNowrap: true,
    body: "The opportunities you want are often one introduction deep inside networks you can already reach. We unlock what is sitting right there waiting.",
    bodyTop: 161,
    bodyWidth: 293,
    image: "/images/services/why-now/door.png",
    imageWidthPct: 50.9,
  },
  {
    id: "fee-fi-fo-fum",
    title: "Fee-Fi-Fo-Fum",
    titleWidth: 167,
    quote: "“Loud is not the same as strong.”",
    quoteNowrap: true,
    body: "Your noisiest competitors win on volume, not precision. A sharper message to the right person beats a louder one to everyone, every time.",
    bodyTop: 175,
    bodyWidth: 339,
    image: "/images/services/why-now/speaker.png",
    imageWidthPct: 58.6,
  },
  {
    id: "jacks-courage",
    title: "Jack’s Courage",
    titleWidth: 200,
    quote: "“Someone has to make the climb.”",
    quoteNowrap: true,
    body: "Every result starts with the decision to go. We do not sell magic. We hand you the beans, then climb right alongside you.",
    bodyTop: 161,
    bodyWidth: 255,
    image: "/images/services/why-now/compass.png",
    imageWidthPct: 56.4,
  },
];

export default function WhyNowClimbSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasHovered, setHasHovered] = useState(false);
  const contentRefs = useRef([]);
  const mountedRef = useRef(false);

  const sectionRef = useRef(null);
  const bulletIconRef = useRef(null);
  const bulletCharRefs = useRef([]);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRefs = useRef([]);

  // One-time entrance, gated behind ScrollTrigger, mirroring ProjectsSection:
  // the bullet label is coupled to its first character and pulls apart
  // outward from that anchor, the heading sprouts up char by char with a
  // blur, and the description types on character by character. Each card
  // then pops in on its own ScrollTrigger as the user scrolls it into view,
  // rising out of the grid the same way ProjectsSection's rows do.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".sprout-char"),
    ];
    const descriptionChars = [
      ...descriptionRef.current.querySelectorAll(".typewriter-char"),
    ];
    const bulletChars = bulletCharRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(headingChars, {
        opacity: 0,
        yPercent: 60,
        filter: "blur(6px)",
      });
      gsap.set(descriptionChars, { opacity: 0 });

      const anchorEl = bulletChars[0];
      const bulletEls = [bulletIconRef.current, ...bulletChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(bulletEls, {
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

      tl.to(bulletEls, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.032, from: bulletEls.indexOf(anchorEl) },
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
            duration: 0.01,
            stagger: 0.012,
            ease: "none",
          },
          "-=0.2",
        );

      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        gsap.set(cardEl, { opacity: 0, y: 90, scale: 0.92 });
        gsap.to(cardEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: cardEl,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]"
    >
      <Image
        src="/images/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-80"
      />

      <div className="relative mx-auto max-w-11/12 px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-[clamp(16px,2.2222vw,32px)] justify-between md:flex-row md:items-end md:justify-between">
          <div className="max-w-159">
            <div className="flex items-center gap-3">
              <span ref={bulletIconRef} className="inline-flex opacity-0">
                <Image
                  src="/images/Home/leaf-2.png"
                  alt=""
                  width={30}
                  height={30}
                  className="h-[clamp(15px,1.5625vw,23px)] w-[clamp(15px,1.5625vw,23px)] brightness-0 invert"
                />
              </span>
              <span className="font-poppins text-[clamp(14px,1.5vw,21px)] font-medium uppercase tracking-wide text-[rgba(122,122,122,0.4)]">
                {BULLET_TEXT.split("").map((char, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      bulletCharRefs.current[i] = el;
                    }}
                    className="inline-block opacity-0"
                  >
                    {/* A lone space as the sole content of an inline-block box
                        collapses to zero width; a non-breaking space preserves it. */}
                    {char === " " ? " " : char}
                  </span>
                ))}
              </span>
            </div>
            <h2
              ref={headingRef}
              className="mt-[clamp(12px,1.6667vw,24px)] font-anton-sc text-[clamp(32px,4.1667vw,60px)] uppercase leading-[1.1] text-white"
            >
              <SproutChars text={HEADING_TEXT} />
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="max-w-156.25 font-poppins text-[clamp(11px,0.9028vw,13px)] leading-[1.23] text-white uppercase md:text-right"
          >
            <SproutChars
              text="Before SPKRHED, growth means burning your best hours on cold calls, dead referrals, and a website that just sits there. Meanwhile the buyers worth the most are sitting one climb above where your competitors bother to look. Here is what changes the moment you plant the beans."
              charClassName="typewriter-char"
            />
          </p>
        </div>

        <div className="mt-[clamp(32px,5vw,72px)] grid grid-cols-1 gap-x-[clamp(12px,1.5278vw,22px)] gap-y-[clamp(12px,1.3889vw,20px)] md:grid-cols-2">
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            const showBorder = isActive && hasHovered;

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => handleHover(index)}
                className="@container/card relative w-full"
              >
                <div
                  className={`relative aspect-7/5 w-full cursor-pointer overflow-hidden rounded-[clamp(14px,5.5cqw,35px)] border transition-colors duration-500 @[500px]/card:aspect-636/240 ${
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
                      className={`absolute inset-y-0 right-0 ${MOBILE_IMAGE_WIDTH} @[500px]/card:w-(--img-w-desktop)`}
                      style={{ "--img-w-desktop": `${card.imageWidthPct}%` }}
                    >
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 30vw, 30vw"
                        className="object-contain object-bottom"
                      />
                    </div>

                    <h3
                      className={`absolute z-10 font-poppins font-bold uppercase leading-[0.875] text-[#dcb754] ${MOBILE_TEXT_WIDTH} @[500px]/card:w-(--title-w-desktop)`}
                      style={{
                        left: TEXT_LEFT,
                        top: TITLE_TOP,
                        fontSize: TITLE_FONT,
                        "--title-w-desktop": cw(card.titleWidth),
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`absolute z-10 font-poppins font-medium uppercase leading-[1.077] text-white/70 ${MOBILE_TEXT_WIDTH} @[500px]/card:w-(--quote-w-desktop) ${
                        card.quoteNowrap ? "@[500px]/card:whitespace-nowrap" : ""
                      }`}
                      style={{
                        left: TEXT_LEFT,
                        top: QUOTE_TOP,
                        fontSize: BODY_FONT,
                        "--quote-w-desktop": card.quoteWidth
                          ? cw(card.quoteWidth)
                          : "auto",
                      }}
                    >
                      {card.quote}
                    </p>

                    <p
                      className={`absolute z-10 font-poppins leading-[1.077] text-white/70 ${MOBILE_TEXT_WIDTH} @[500px]/card:w-(--body-w-desktop)`}
                      style={{
                        left: TEXT_LEFT,
                        top: ch(card.bodyTop),
                        fontSize: BODY_FONT,
                        "--body-w-desktop": cw(card.bodyWidth),
                      }}
                    >
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
