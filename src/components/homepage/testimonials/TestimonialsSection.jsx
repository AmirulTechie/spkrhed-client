"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const CARD_BASE =
  "flex flex-col overflow-hidden rounded-[clamp(9px,0.86vw,12px)] p-[clamp(20px,2.3611vw,34px)]";

const QUOTE_CLASS =
  "font-poppins text-[clamp(15px,1.4583vw,21px)] font-semibold leading-[1.1]";
const DESCRIPTION_CLASS =
  "font-poppins text-[clamp(13px,1.25vw,18px)] font-normal leading-[1.35]";
const NAME_CLASS = "font-poppins text-[clamp(12px,0.9722vw,14px)] font-medium leading-[1.1]";
const ROLE_CLASS = "font-poppins text-[clamp(11px,0.9028vw,13px)] leading-[1.1]";

const BULLET_TEXT = "Testimonials";
const DESCRIPTION_TEXT = "Founders, agencies, and enterprise teams who joined the movement.";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable span —
// the true "type on" building block shared by Beanstalk/Projects/Pricing.
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

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 53 53" className={className} aria-hidden="true">
      <path
        d="M23.8145 15.2626C21.1516 13.5681 17.667 15.4809 17.667 18.6373V34.9806C17.667 38.1369 21.1516 40.0498 23.8145 38.3552L36.6556 30.1836C39.1256 28.6118 39.1256 25.0061 36.6556 23.4343L23.8145 15.2626Z"
        fill="currentColor"
      />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    id: "aferdita",
    variant: "video",
    quote: "“Went from $50K to $2M ARR in less than 18 months.”",
    name: "Aferdita Gutierrez",
    role: "Chief Operating Officer · BQS Advisory",
    thumbnail:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785571254/Review_1_wewskm.jpg",
    video:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785571254/Review_1_wewskm.mp4",
  },
  {
    id: "sam",
    variant: "light",
    quote: "“SPKRHED don't just play the game… they make sure the ball finds the net.”",
    name: "Sam Sohaili",
    role: "Executive Creative Director and Founder, DMA United",
    tagline: "Award-winning agency. Fortune 500 clients.",
    photo: "/images/Home/clients-reviews/Review%202.jpeg",
  },
  {
    id: "chris",
    variant: "dark",
    quote:
      "“Karriem and the SPKRHED team are forward thinking and highly skilled. They break down complex problems and turn them into real solutions. I've used them across multiple businesses, and the results have been successful every time.”",
    name: "Chris Milano",
    role: "Enigma ENT",
    tagline: "Has worked with Drake, Kanye West, Akon, 50 Cent, Chris Brown",
    photo: "/images/Home/clients-reviews/Review%203.jpeg",
  },
  {
    id: "delta-sigma-theta",
    variant: "video",
    description:
      "Brand Director for Delta Sigma Theta Sorority, an international organization founded in 1913 with more than 350,000 initiated members and over 1,000 chapters worldwide.",
    thumbnail:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785572963/Review_4_qvb4jb.jpg",
    video:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785572963/Review_4_qvb4jb.mp4",
  },
];

const VARIANT_CLASSES = {
  light: "bg-[#D9D9D9]/81 text-black",
  video: "bg-[#AC40FF] text-black",
  dark: "border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl backdrop-saturate-150",
};

const ROLE_OPACITY = {
  light: "text-black/70",
  video: "text-black/70",
  dark: "text-white/70",
};

function TestimonialCard({ testimonial, className = "", ariaHidden = false }) {
  const { variant, quote, description, name, role, tagline, thumbnail, video, photo } =
    testimonial;
  const [isPlaying, setIsPlaying] = useState(false);
  const hasMedia = Boolean(video || photo);
  const aspectClass = hasMedia ? "lg:aspect-440/521" : "lg:aspect-440/324";

  return (
    <div
      className={`${CARD_BASE} ${aspectClass} ${VARIANT_CLASSES[variant]} ${className}`}
      data-testimonial={testimonial.id}
      aria-hidden={ariaHidden || undefined}
    >
      {variant === "video" && (
        <div className="relative mb-[clamp(8px,0.9028vw,13px)] aspect-402/287 w-full overflow-hidden rounded-[clamp(7px,0.6597vw,9.5px)]">
          {isPlaying ? (
            <video
              src={video}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={name ? `Play ${name}'s testimonial video` : "Play testimonial video"}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={thumbnail}
                alt={name || "SPKRHED client testimonial"}
                fill
                sizes="(min-width: 1024px) 402px, 90vw"
                className="object-cover"
              />
              <span className="absolute inset-0 m-auto flex h-[clamp(40px,4.7917vw,69px)] w-[clamp(40px,4.7917vw,69px)] items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                <PlayIcon className="h-[clamp(30px,3.6806vw,53px)] w-[clamp(30px,3.6806vw,53px)] translate-x-[6%] text-white" />
              </span>
            </button>
          )}
        </div>
      )}

      {!video && photo && (
        <div className="relative mb-[clamp(8px,0.9028vw,13px)] aspect-402/287 w-full overflow-hidden rounded-[clamp(7px,0.6597vw,9.5px)]">
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(min-width: 1024px) 402px, 90vw"
            className="object-cover object-top"
          />
        </div>
      )}

      {quote && <p className={QUOTE_CLASS}>{quote}</p>}
      {description && <p className={DESCRIPTION_CLASS}>{description}</p>}

      {name && (
        <div className="mt-auto pt-[clamp(16px,1.9444vw,28px)]">
          <p className={NAME_CLASS}>{name}</p>
          {role && <p className={`${ROLE_CLASS} ${ROLE_OPACITY[variant]}`}>{role}</p>}
          {tagline && <p className={`${ROLE_CLASS} ${ROLE_OPACITY[variant]}`}>{tagline}</p>}
        </div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const bulletIconRef = useRef(null);
  const bulletCharRefs = useRef([]);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const treeBranchRef = useRef(null);
  const leafRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // One-time entrance, gated behind ScrollTrigger: the "Testimonials" bullet
  // line is coupled to its first character exactly like Hero's "This is a
  // movement" line (everything starts stacked on the anchor, then pulls
  // apart outward), the heading and description type on character by
  // character, the tree branch slides in from the left border, the leaf
  // drifts in from the middle of the section, and the card strip fades and
  // rises into place. No resting position changes — only the
  // approach. Once in, the strip sits at the exact Figma rest position (a
  // left gap revealing the tree branch, the third card cut off on the
  // right) and becomes a bounded drag: dragging left slides the cards over
  // that gap until the last card's edge is flush with the viewport (hard
  // stop, no wrap), dragging right returns to the Figma rest position (also
  // a hard stop) — see the Draggable setup below.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];
    const descriptionChars = [
      ...descriptionRef.current.querySelectorAll(".typewriter-char"),
    ];
    const bulletChars = bulletCharRefs.current.filter(Boolean);

    let removeResizeListener = () => {};

    const ctx = gsap.context(() => {
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(descriptionChars, { opacity: 0 });
      gsap.set(treeBranchRef.current, { opacity: 0, x: -180 });
      gsap.set(leafRef.current, {
        opacity: 0,
        scale: 0.4,
        x: -170,
        y: -160,
        rotate: 250,
      });

      if (viewportRef.current) gsap.set(viewportRef.current, { opacity: 0, y: 60 });

      // Make the card strip a bounded, grab-and-drag scroller — same at
      // every breakpoint. The strip's rest position (x: 0) is the Figma
      // layout itself — the left gap/margin-left on the track already
      // places card one there in normal flow. Dragging left is allowed
      // only until the last card's right edge reaches the viewport's right
      // edge (minX); dragging right is capped at the rest position (maxX:
      // 0). edgeResistance is < 1 so pulling past either dead end
      // stretches like a rubber band (heavy resistance, not a 1:1 drag)
      // and snaps back to the bound on release — no wrap. Card width is
      // clamp()-based (see the track below), so on narrow phones the
      // clamp's min pins each card to roughly a full screen width and only
      // one is visible at rest — no separate mobile layout needed.
      if (trackRef.current && viewportRef.current) {
        const track = trackRef.current;
        const viewport = viewportRef.current;

        const getBounds = () => {
          const viewportWidth = viewport.getBoundingClientRect().width;
          const trackWidth = track.scrollWidth;
          const restGap = parseFloat(getComputedStyle(track).marginLeft) || 0;
          return { minX: Math.min(0, viewportWidth - trackWidth - restGap), maxX: 0 };
        };

        gsap.set(track, { x: 0 });

        // edgeResistance gives the drag itself a heavy, rubber-band feel
        // once past either dead end. inertia's own bounds-aware throw
        // handles the snap-back for a real flick, but a slow drag that's
        // released with ~zero velocity right won't generate a throw large
        // enough to pull it back in on its own — so onDragEnd explicitly
        // tweens it back to the nearest bound whenever release happens
        // outside [minX, maxX], guaranteeing the rubber always retracts.
        const [draggable] = Draggable.create(track, {
          type: "x",
          bounds: getBounds(),
          edgeResistance: 0.65,
          inertia: true,
          onDragEnd: () => {
            const bounds = getBounds();
            const x = gsap.getProperty(track, "x");
            if (x > bounds.maxX || x < bounds.minX) {
              gsap.killTweensOf(track);
              gsap.to(track, {
                x: gsap.utils.clamp(bounds.minX, bounds.maxX, x),
                duration: 0.6,
                ease: "elastic.out(1, 0.75)",
              });
            }
          },
        });

        const onResize = () => {
          const bounds = getBounds();
          draggable.applyBounds(bounds);
          gsap.set(track, {
            x: gsap.utils.clamp(bounds.minX, bounds.maxX, gsap.getProperty(track, "x")),
          });
        };
        window.addEventListener("resize", onResize);
        removeResizeListener = () => window.removeEventListener("resize", onResize);
      }

      // "Testimonials" is coupled to its first character — every other
      // char and the bullet start stacked on top of it, then pull apart
      // outward in both directions, exactly like Hero's movement text.
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
          { opacity: 1, duration: 0.01, stagger: 0.02, ease: "none" },
          "-=0.15",
        )
        .to(
          descriptionChars,
          { opacity: 1, duration: 0.01, stagger: 0.012, ease: "none" },
          "-=0.25",
        )
        .to(
          treeBranchRef.current,
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.3",
        );

      if (viewportRef.current) {
        tl.to(
          viewportRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6",
        );
      }

      tl.to(
        leafRef.current,
        {
          opacity: 0.9,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 340,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.5",
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      removeResizeListener();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]"
    >
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-90"
      />

      <Image
        ref={treeBranchRef}
        src="/images/Home/tree-branch-small.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute left-[-9%] top-[25%] z-0 w-[20%] max-w-none select-none"
      />

      <Image
        ref={leafRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute bottom-[6%] right-[20%] z-20 w-[7%] select-none"
      />

      <div className="relative z-10 mx-auto max-w-360 px-[clamp(20px,3.1944vw,46px)] text-center">
        <div className="mx-[calc(50%-50vw)] flex w-screen items-center justify-center gap-3 px-2 sm:gap-6">
          <span ref={bulletIconRef} className="inline-flex shrink-0 opacity-0">
            <Image
              src="/images/Home/leaf-2.png"
              alt=""
              width={120}
              height={120}
              className="h-[clamp(32px,7.6389vw,110px)] w-[clamp(32px,7.6389vw,110px)] brightness-0 invert"
            />
          </span>
          <span className="font-anton-sc whitespace-nowrap text-[clamp(60px,14.5833vw,210px)] uppercase leading-none tracking-tight text-white">
            {BULLET_TEXT.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  bulletCharRefs.current[i] = el;
                }}
                className="inline-block opacity-0"
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </div>

        <h2
          ref={headingRef}
          className="mx-auto mt-[clamp(40px,5.5556vw,80px)] max-w-217 font-anton-sc text-[clamp(32px,6.8056vw,98px)] uppercase leading-[1.02] text-white"
        >
          <TypewriterChars text="In Their" />{" "}
          <span className="text-[#ac40ff]">
            <TypewriterChars text="Own Voice." />
          </span>
        </h2>

        <p
          ref={descriptionRef}
          className="mx-auto mt-[clamp(8px,1.1806vw,17px)] font-poppins text-[clamp(15px,1.5278vw,22px)] text-white/60"
        >
          <TypewriterChars text={DESCRIPTION_TEXT} />
        </p>
      </div>

      <div
        ref={viewportRef}
        className="relative z-10 mt-[clamp(40px,4.9306vw,71px)] w-full select-none overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab items-start gap-[clamp(13px,1.2919vw,18.603px)] ml-[clamp(140px,16.5972vw,239px)] active:cursor-grabbing"
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              className="testimonial-marquee-card w-[clamp(230px,30.5736vw,440px)] shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
