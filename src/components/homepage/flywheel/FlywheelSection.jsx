"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BULLET_TEXT = "The Flywheel";

const STEPS = [
  {
    number: "01",
    title: "Outbound DM Lands",
    description:
      "Your prospect receives a personalized message. They're curious — so they click your profile.",
    offset: false,
  },
  {
    number: "02",
    title: "Profile Builds Trust",
    description:
      "They see polished positioning, real social proof, and a feed of content that makes them feel they already know you.",
    offset: true,
  },
  {
    number: "03",
    title: "Content Keeps Them Warm",
    description:
      "Even if they're not ready today, they follow. Every post keeps you top of mind until the timing is right.",
    offset: false,
  },
  {
    number: "04",
    title: "Qualified Call Booked",
    description:
      "When they're ready, you're the only name they think of. They book — already pre-sold on your value.",
    offset: true,
  },
];

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable span —
// the char-level building block shared by Hero/Problem/Projects/Beanstalk's
// type-on treatments.
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

function StepCard({ step, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`relative aspect-321/353 w-full bg-[rgba(217,217,217,0.5)] backdrop-blur-md [mask-image:url('/images/Home/flywheel-card-shape.svg')] mask-no-repeat mask-size-[100%_100%] ${step.offset ? "sm:mt-[clamp(38px,8.0556vw,116px)]" : ""}`}
    >
      <div className="flex h-full w-full flex-col pt-[clamp(20px,1.875vw,27px)] pr-[clamp(20px,1.875vw,27px)] pb-[clamp(28px,2.6389vw,38px)] pl-[clamp(20px,1.875vw,27px)]">
        <div className="mr-[clamp(13px,1.3194vw,19px)] flex items-start justify-between">
          <span className="font-anton-sc text-[clamp(40px,5.5556vw,80px)] leading-[0.8] text-[#101010]">
            {step.number}
          </span>
          <ArrowUpRight
            className="mt-[clamp(32px,3.1944vw,46px)] h-8 w-8 shrink-0 text-[#101010]"
          />
        </div>
        <div className="mt-[clamp(9px,0.9028vw,13px)] mr-[clamp(13px,1.3194vw,19px)] border-t border-[#101010]" />

        <div className="mt-auto">
          <h3 className="font-anton-sc text-[clamp(16px,1.3889vw,20px)] uppercase leading-[0.8] text-[#101010]">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[clamp(146px,14.4444vw,208px)] font-poppins text-[clamp(9px,0.6944vw,10px)] leading-none text-[#101010]">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FlywheelSection() {
  const sectionRef = useRef(null);
  const treeBranchRef = useRef(null);
  const bulletRef = useRef(null);
  const bulletCharRefs = useRef([]);
  const headingRef = useRef(null);
  const climbRef = useRef(null);
  const cardRefs = useRef([]);

  // One-time entrance, gated behind ScrollTrigger the moment the section is
  // reached: the tree branch rises from below (resting position/rotation
  // untouched), "The Flywheel" is coupled to its first character exactly
  // like Hero's "This is a movement" line, the heading types on line by line
  // the same way as Hero's display headings, and "Outreach Makes Content
  // Close Faster." ink-reveals line by line — each line clip-path wipes in
  // left to right like a pen writing it, rather than the shaky curl/rotate
  // treatment used elsewhere. Each of the 4 cards then pops in on its own
  // ScrollTrigger as it's scrolled into view, matching ProjectsSection's
  // project-row treatment, instead of a single staggered batch.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".sprout-char"),
    ];
    const bulletChars = bulletCharRefs.current.filter(Boolean);
    const climbLines = [...climbRef.current.querySelectorAll(".climb-line")];

    const ctx = gsap.context(() => {
      // Rotation is set explicitly (rather than left to the Tailwind
      // rotate-12 class) because GSAP owns the full transform once it
      // animates y here — an untouched rotate value would otherwise be
      // silently dropped.
      gsap.set(treeBranchRef.current, { opacity: 0, y: 220, rotate: 12 });
      gsap.set(headingChars, { opacity: 0, yPercent: 60, filter: "blur(6px)" });
      // Each line starts fully clipped from the right so it can wipe into
      // view left to right, hugging the line's own text width (the lines
      // are inline-block) rather than the paragraph's full centered box.
      gsap.set(climbLines, { clipPath: "inset(0% 100% 0% 0%)" });

      const anchorEl = bulletChars[0];
      const bulletEls = [bulletRef.current, ...bulletChars];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(bulletEls, {
        opacity: 0,
        x: (_, target) => anchorLeft - target.getBoundingClientRect().left,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Phases are deliberately overlapped rather than chained end-to-end —
      // the branch rises in the background while the bullet/heading build
      // in front of it. Played as a chord instead of a sequence so the
      // whole entrance resolves quickly.
      tl.to(treeBranchRef.current, {
        opacity: 0.9,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          bulletEls,
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            stagger: { each: 0.018, from: bulletEls.indexOf(anchorEl) },
          },
          "<0.1",
        )
        .to(
          headingChars,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.3,
            stagger: 0.012,
            ease: "power2.out",
          },
          "-=0.15",
        )
        .to(
          climbLines,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "power2.inOut",
            stagger: 0.25,
          },
          "-=0.15",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Each of the 4 flywheel steps pops in independently as the user scrolls
  // it into view — same treatment as ProjectsSection's project rows —
  // instead of all 4 firing together off the section's own entrance.
  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      cards.forEach((cardEl) => {
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

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] overflow-hidden rounded-5xl bg-[#F0F0EA] pb-[clamp(64px,9.7222vw,140px)] pt-[clamp(48px,6.25vw,90px)]"
    >
      <Image
        ref={treeBranchRef}
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={2162}
        height={3842}
        className="pointer-events-none absolute right-[-8%] top-[15%] z-0 w-[50%] select-none"
      />

      <div className="relative z-10 mx-auto max-w-360 px-[clamp(20px,3.1944vw,46px)] text-center">
        <div className="flex items-center justify-center gap-3">
          <span ref={bulletRef} className="inline-flex opacity-0">
            <Image
              src="/images/Home/banner-bullet.png"
              alt=""
              width={20}
              height={20}
              className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
            />
          </span>
          <span className="font-poppins text-[clamp(20px,2.6389vw,38px)] font-semibold uppercase text-[#424242]">
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
          className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-129.5 font-anton-sc text-[clamp(32px,5.9028vw,85px)] uppercase leading-[1.06] text-black"
        >
          <SproutLine>
            <SproutChars text="Content Makes" />
          </SproutLine>
          <SproutLine>
            <SproutChars text="Outreach Work" />
          </SproutLine>
          <SproutLine>
            <SproutChars text="Harder." />
          </SproutLine>
        </h2>

        <p
          ref={climbRef}
          className="mx-auto mt-[clamp(-23px,-1.5972vw,-16px)] max-w-197 font-alex-brush text-[clamp(48px,7.2917vw,105px)] leading-[0.8] text-[#AC40FF]"
        >
          <span className="block">
            <span className="climb-line inline-block">Outreach Makes</span>
          </span>
          <span className="block">
            <span className="climb-line inline-block">
              Content Close Faster.
            </span>
          </span>
        </p>

        <div className="relative z-10 mt-[clamp(48px,9.5139vw,137px)] grid grid-cols-1 gap-x-[clamp(30px,1.4583vw,40px)] gap-y-[clamp(16px,4.4444vw,64px)] text-left sm:grid-cols-2 sm:gap-y-[clamp(40px,4.4444vw,64px)] lg:grid-cols-4 lg:items-start">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              cardRef={(el) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>

      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute bottom-[-33.3333%] left-1/2 w-[160%] max-w-none -translate-x-1/2 select-none z-9999 opacity-50"
      />
    </section>
  );
}
