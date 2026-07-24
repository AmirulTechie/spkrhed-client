"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    category: "/ Marketing Agency",
    name: "Breez Banner System",
    services: "UI/UX, Development, Marketing",
    image: "/images/Home/project-thubmnails/project-01.png",
  },
  {
    category: "/ Agency",
    name: "BQS Website",
    services: "UI/UX, Development, Marketing",
    image: "/images/Home/project-thubmnails/project-02.png",
  },
  {
    category: "/ Fashion",
    name: "Tuft & Stitch",
    services: "Branding, Marketing, Website",
    image: "/images/Home/project-thubmnails/project-03.png",
  },
  {
    category: "/ Healthcare",
    name: "Concord Medical",
    services: "UI/UX, Development, Marketing",
    image: "/images/Home/project-thubmnails/project-04.png",
  },
];

const BULLET_TEXT = "Selected Projects";
const DESCRIPTION_TEXT =
  "Projects across brand strategy, visual identity, web design, development, and visual content. Each project here represents a specific brief, a specific challenge, and a specific outcome.";

// Splits on words, keeping spaces as real text nodes between word-spans
// (rather than wrapping the space itself in a span, which would collapse to
// zero width), and wraps each character in an individually animatable span —
// the char-level building block shared by Hero/Problem/Beanstalk's type-on
// treatments.
function SproutChars({ text, charClassName = "sprout-char" }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
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

// One clipped row: chars sprout up from a hidden baseline inside it,
// mirroring Hero's <Line> treatment for its display headings.
function SproutLine({ children, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <span className="block">{children}</span>
    </div>
  );
}

function ProjectRow({ project, rowRef }) {
  return (
    <div
      ref={rowRef}
      className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="font-poppins text-[clamp(14px,1.3889vw,20px)] leading-[0.97] text-[#b7b7b7]">
          {project.category}
        </p>
        <h3 className="mt-[clamp(8px,2.2917vw,33px)] font-anton-sc text-[clamp(28px,3.4722vw,50px)] uppercase leading-[0.97] text-white">
          {project.name}
        </h3>
        <p className="mt-[clamp(24px,8.125vw,117px)] font-poppins text-[clamp(14px,1.3889vw,20px)] leading-[0.97] text-[#b7b7b7]">
          {project.services}
        </p>
      </div>

      <div className="group relative aspect-544/362 w-full overflow-hidden rounded-[30px] sm:w-[clamp(280px,37.7778vw,544px)] sm:shrink-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(min-width: 640px) 544px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const bulletRef = useRef(null);
  const bulletCharRefs = useRef([]);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const rowRefs = useRef([]);

  // One-time entrance, gated behind ScrollTrigger: "Selected Projects" is
  // coupled to its first character exactly like Hero's "This is a movement"
  // bullet line (everything starts stacked on the anchor, then pulls apart
  // outward), the heading types on line by line the same way as Hero's
  // display headings, and the description types on character by character.
  // Each project row then pops in on its own ScrollTrigger as the user
  // scrolls it into view, rising out of the section's black background.
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
      const bulletEls = [bulletRef.current, ...bulletChars];
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

      rowRefs.current.forEach((rowEl) => {
        if (!rowEl) return;
        gsap.set(rowEl, { opacity: 0, y: 90, scale: 0.92 });
        gsap.to(rowEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: rowEl,
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
      className="relative overflow-hidden py-[clamp(64px,9.7222vw,140px)]"
    >
      <div className="relative mx-auto max-w-325 px-[clamp(24px,5.5556vw,80px)]">
        <div className="mx-[calc(50%-50vw)] flex w-screen items-center justify-center gap-3 px-2 sm:gap-6">
          <span ref={bulletRef} className="inline-flex shrink-0 opacity-0">
            <Image
              src="/images/Home/leaf-2.png"
              alt=""
              width={120}
              height={120}
              className="h-[clamp(24px,5.2083vw,75px)] w-[clamp(24px,5.2083vw,75px)] brightness-0 invert"
            />
          </span>
          <span className="font-anton-sc whitespace-nowrap text-[clamp(40px,10vw,144px)] uppercase leading-none tracking-tight text-white">
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

        <div className="mt-[clamp(96px,15.2778vw,220px)] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            ref={headingRef}
            className="font-anton-sc text-[clamp(32px,6.0417vw,87px)] uppercase leading-[0.97] text-white"
          >
            <SproutLine>
              <SproutChars text="A Curated" />
            </SproutLine>
            <SproutLine>
              <SproutChars text="Collection" />
            </SproutLine>
            <SproutLine>
              <SproutChars text="Of" />{" "}
              <span className="text-[#AC40FF]">
                <SproutChars text="Projects" />
              </span>
            </SproutLine>
          </h2>

          <p
            ref={descriptionRef}
            className="font-poppins text-[clamp(16px,1.5278vw,22px)] font-medium leading-[1.05] text-[#b7b7b7] lg:max-w-[clamp(300px,29.2361vw,421px)]"
          >
            <SproutChars text={DESCRIPTION_TEXT} charClassName="typewriter-char" />
          </p>
        </div>

        <div className="mt-[clamp(80px,12.5vw,180px)] flex flex-col gap-[clamp(32px,6.9444vw,100px)]">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.name}
              project={project}
              rowRef={(el) => {
                rowRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
