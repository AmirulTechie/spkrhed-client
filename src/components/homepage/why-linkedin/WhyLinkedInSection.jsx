"use client"
import Image from "next/image";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KICKER_TEXT = "Why LinkedIn?";

// Masks a word behind overflow-hidden and exposes it via ".reveal-word" so
// the entrance timeline can grab every word with one querySelectorAll and
// stagger them, mirroring the sprout-char pattern used elsewhere on the
// homepage but at word granularity — same convention as ScaleNotStrategy.jsx.
function RevealWord({ children, className = "" }) {
  return (
    <span className={`inline-block overflow-hidden align-top ${className}`}>
      <span className="reveal-word inline-block opacity-0">{children}</span>
    </span>
  );
}

export default function WhyLinkedInSection() {
  const glowRef = useRef(null);
  const sectionRef = useRef(null);
  const kickerIconRef = useRef(null);
  const kickerCharRefs = useRef([]);
  const headingRef = useRef(null);
  const leftParaRef = useRef(null);
  const rightParaRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    const glow = { outer: 0.43, inner: 0.3 };

    const tween = gsap.to(glow, {
      outer: 0.75,
      inner: 0.55,
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        el.style.boxShadow = `0px 0px 55.6px rgba(172, 64, 255, ${glow.outer}), inset 0px 0px 32.9px rgba(172, 64, 255, ${glow.inner})`;
      },
    });

    return () => tween.kill();
  }, []);

  // Scroll-triggered entrance: the kicker, heading and paragraphs sprout up
  // word by word, then the 01 badge rises in from below. Every tween ends
  // at the element's existing layout position — nothing is repositioned,
  // only revealed. Tree branches are static and untouched by this timeline.
  useLayoutEffect(() => {
    const kickerChars = kickerCharRefs.current.filter(Boolean);
    const headingWords = [...headingRef.current.querySelectorAll(".reveal-word")];
    const leftWords = [...leftParaRef.current.querySelectorAll(".reveal-word")];
    const rightWords = [...rightParaRef.current.querySelectorAll(".reveal-word")];

    const ctx = gsap.context(() => {
      gsap.set([...kickerChars, ...headingWords, ...leftWords, ...rightWords], {
        opacity: 0,
        yPercent: 110,
        filter: "blur(6px)",
      });
      gsap.set(kickerIconRef.current, { opacity: 0, y: 20 });
      gsap.set(glowRef.current, { opacity: 0, y: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(kickerIconRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(
          kickerChars,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.03,
          },
          "<0.05"
        )
        .to(
          headingWords,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
          },
          "-=0.2"
        )
        .to(
          [...leftWords, ...rightWords],
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.03,
          },
          "-=0.3"
        )
        .to(
          glowRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-[clamp(64px,9.7222vw,140px)]"
    >
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-80"
      />
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute left-[-21.7778%] top-[-25.3333vw] w-[55%] -scale-x-100 rotate-30 select-none opacity-90 sm:w-[40%]"
      />
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute left-[-16.4444%] top-[-16.2222vw] w-[55%] -scale-x-100 rotate-60 select-none opacity-90 sm:w-[40%]"
      />
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute right-[-20.8333%] top-[-11.1111vw] w-[55%] -rotate-50 select-none opacity-90 sm:w-[40%]"
      />

      <div className="relative mx-auto max-w-300 px-[clamp(24px,5.5556vw,80px)] text-center">
        <div className="mb-15 mt-20 flex justify-center items-center gap-3">
          <span ref={kickerIconRef} className="inline-flex opacity-0">
            <Image
              src="/images/Home/banner-bullet.png"
              alt=""
              width={20}
              height={20}
              className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
            />
          </span>
          <span className="font-poppins text-[clamp(14px,1.5972vw,23px)] font-semibold uppercase tracking-wide text-[#b7b7b7]">
            {KICKER_TEXT.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  kickerCharRefs.current[i] = el;
                }}
                className="inline-block opacity-0"
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </div>

        <h2
          ref={headingRef}
          className="mt-6 max-w-201 mx-auto text-center font-anton-sc text-[clamp(28px,4.8611vw,81px)] uppercase leading-[0.97] text-white"
        >
          <RevealWord>The</RevealWord> <RevealWord>only</RevealWord>{" "}
          <RevealWord>platform</RevealWord> <RevealWord>where</RevealWord>{" "}
          <RevealWord>your</RevealWord>{" "}
          <RevealWord className="text-[#AC40FF] whitespace-nowrap">
            exact buyer
          </RevealWord> <RevealWord>is</RevealWord> <RevealWord>already</RevealWord>{" "}
          <RevealWord>waiting.</RevealWord>
        </h2>

        <div className="mt-25 grid grid-cols-1 items-center sm:grid-cols-[1fr_auto_1fr]">
          <p
            ref={leftParaRef}
            className="font-anton-sc max-w-59.75 ml-auto mr-[clamp(24px,11.1111vw,160px)] text-[clamp(22px,2.7778vw,40px)] uppercase leading-[100%] text-white text-left"
          >
            <RevealWord>No</RevealWord> <RevealWord>promotions</RevealWord>{" "}
            <RevealWord>folder,</RevealWord>
            <br></br>
            <RevealWord>no</RevealWord> <RevealWord>buried</RevealWord>{" "}
            <RevealWord>requests</RevealWord> <RevealWord>tab.</RevealWord>
          </p>

          <div
            ref={glowRef}
            className="mx-auto flex h-[clamp(100px,14.3056vw,206px)] w-[clamp(100px,14.3056vw,206px)] shrink-0 items-center justify-center rounded-full opacity-0 sm:mx-0"
            style={{ background: "rgba(0, 0, 0, 0.004)" }}
          >
            <span className="font-anton-sc text-[clamp(24px,4.8611vw,70px)] text-[#AC40FF]">
              01
            </span>
          </div>

          <p
            ref={rightParaRef}
            className="font-poppins ml-[clamp(16px,6.3194vw,91px)] w-full max-w-xl text-[clamp(16px,1.6667vw,24px)] font-medium leading-[97%] text-[#b7b7b7] text-left"
          >
            <RevealWord>LinkedIn</RevealWord> <RevealWord>messages</RevealWord>{" "}
            <RevealWord>land</RevealWord> <RevealWord>in</RevealWord>{" "}
            <RevealWord>your</RevealWord> <RevealWord>prospect&apos;s</RevealWord>{" "}
            <RevealWord>primary</RevealWord> <RevealWord>inbox.</RevealWord>{" "}
            <RevealWord>They</RevealWord> <RevealWord>see</RevealWord>{" "}
            <RevealWord>your</RevealWord> <RevealWord>name,</RevealWord>{" "}
            <RevealWord>your</RevealWord> <RevealWord>message,</RevealWord>{" "}
            <RevealWord>and</RevealWord> <RevealWord>decide</RevealWord>{" "}
            <RevealWord>on</RevealWord> <RevealWord>the</RevealWord>{" "}
            <RevealWord>spot.</RevealWord>
          </p>
        </div>
      </div>
    </section>
  );
}
