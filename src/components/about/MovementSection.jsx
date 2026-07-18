"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Splits a heading string into individually animatable character spans for
// the fast type-on treatment, matching Hero/Flywheel's char-level building
// block elsewhere in the app. Splits on words first (kept as
// whitespace-nowrap units) so the browser still only wraps at word
// boundaries, not mid-word.
function TypeChars({ text }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span key={ci} className="type-char inline-block">
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

export default function MovementSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const wordmarkRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const treeLogRef = useRef(null);
  const vineLeftRef = useRef(null);
  const vineRightRef = useRef(null);

  // Desktop: the SPKRHED wordmark pops in and both headings type on fast
  // the moment this section is reached from the hero (one-time entrance),
  // then a separate scrub timeline ties the tree log's grow-and-rotate to
  // continued scroll — it starts small and only reaches full size/rotation
  // as the user keeps scrolling, with the two vine flourishes staying out
  // past the frame edges until the log is most of the way there. Mobile
  // skips all of that and only gets a single smooth pop-in for the section.
  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".type-char"),
    ];
    const subheadingChars = [
      ...subheadingRef.current.querySelectorAll(".type-char"),
    ];

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023.98px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          gsap.set(wordmarkRef.current, { opacity: 0, scale: 0.9, y: -16 });
          gsap.set([...headingChars, ...subheadingChars], {
            opacity: 0,
            yPercent: 60,
            filter: "blur(4px)",
          });
          gsap.set(treeLogRef.current, { scale: 0.5, rotate: -16 });
          gsap.set(vineLeftRef.current, { x: "-18vw", opacity: 0 });
          gsap.set(vineRightRef.current, { x: "18vw", opacity: 0 });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            })
            .to(wordmarkRef.current, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            })
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
              "-=0.5",
            )
            .to(
              subheadingChars,
              {
                opacity: 1,
                yPercent: 0,
                filter: "blur(0px)",
                duration: 0.25,
                stagger: 0.01,
                ease: "power2.out",
              },
              "-=0.15",
            );

          // Pins the card in place for a fixed extra scroll distance —
          // mirroring VideoSection's pinned scroll-scrub stage on the
          // homepage — so the log's grow-and-rotate reads as directly tied
          // to each bit of scroll input, instead of a subtle pass-through
          // tween. The vines only swing in once the log is most of the way
          // there, then the page unpins and continues normally.
          gsap
            .timeline({
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top top",
                end: () => "+=" + window.innerHeight,
                scrub: 0.6,
                pin: true,
              },
            })
            .to(
              treeLogRef.current,
              { scale: 1, rotate: 0, ease: "none" },
              0,
            )
            .to(
              vineLeftRef.current,
              { x: "0vw", opacity: 0.95, ease: "none" },
              0.55,
            )
            .to(
              vineRightRef.current,
              { x: "0vw", opacity: 0.95, ease: "none" },
              0.55,
            );
        } else {
          gsap.set(sectionRef.current, { opacity: 0, scale: 0.96, y: 24 });

          gsap.to(sectionRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-[clamp(12px,2.0833vw,30px)] pb-[clamp(60px,8.3333vw,120px)]"
    >
      <Image
        ref={wordmarkRef}
        src="/images/about/spkrhed-bg-wordmark.svg"
        alt=""
        aria-hidden
        width={1441}
        height={235}
        className="pointer-events-none h-auto w-full select-none"
      />

      <div className="relative mt-[clamp(8px,1.3889vw,20px)] px-[clamp(20px,5.0694vw,73px)]">
        <div ref={cardRef} className="relative mx-auto w-full lg:aspect-1294/1339">
          <div
            aria-hidden
            className="absolute inset-0 z-0 overflow-hidden rounded-[clamp(20px,3.4722vw,50px)] bg-[#f0f0ea]"
            style={{
              backgroundImage:
                "radial-gradient(circle at -8.6% -3.5%, rgba(172,64,255,0.38) 0%, rgba(172,64,255,0.16) 26%, rgba(172,64,255,0) 55%), radial-gradient(circle at 95.6% 97.7%, rgba(172,64,255,0.38) 0%, rgba(172,64,255,0.16) 26%, rgba(172,64,255,0) 55%)",
            }}
          />

          {/* Vine flourishes are desktop-only decoration; on narrow screens they overflow
              the stacked mobile layout awkwardly, so they're hidden below lg. */}
          <div
            ref={vineLeftRef}
            className="pointer-events-none absolute left-[-32%] top-[45%] z-10 hidden w-[50%] rotate-[132.62deg] select-none opacity-95 will-change-transform lg:block"
          >
            <Image
              src="/images/about/tree-vine.png"
              alt=""
              width={1400}
              height={787}
              className="h-auto w-full"
            />
          </div>
          <div
            ref={vineRightRef}
            className="pointer-events-none absolute right-[-25%] top-[15%] z-10 hidden w-[50%] select-none opacity-95 rotate-110 will-change-transform lg:block"
          >
            <Image
              src="/images/about/tree-vine.png"
              alt=""
              width={1400}
              height={787}
              className="h-auto w-full"
            />
          </div>

          {/* Below lg: normal stacked flow. At lg and up: absolute, percentage-positioned
              to match the Figma desktop frame exactly. */}
          <div className="relative z-20 flex flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:absolute lg:inset-0 lg:block lg:px-0 lg:py-0">
            <p
              ref={headingRef}
              className="text-center font-anton-sc text-[clamp(26px,5.5556vw,80px)] uppercase leading-[1.05] lg:absolute lg:left-[17.70%] lg:top-[7.77%] lg:w-[64.53%] lg:leading-[0.95]"
            >
              <span className="text-[#101010]">
                <TypeChars text="We didn't start an" /> <br />{" "}
                <TypeChars text="agency." />
              </span>{" "}
              <span className="text-[#AC40FF]">
                <TypeChars text="We started a" /> <br />{" "}
                <TypeChars text="movement." />
              </span>
            </p>

            <div
              aria-hidden
              className="hidden opacity-20 lg:absolute lg:left-[23.34%] lg:top-[44.74%] lg:block lg:h-[36.82%] lg:w-[53.25%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 35%, transparent 70%)",
              }}
            />

            <Image
              ref={treeLogRef}
              src="/images/about/tree-log.png"
              alt="A moss-covered log floating above the card, sprouting new growth"
              width={1294}
              height={740}
              className="relative mx-auto h-auto w-full max-w-135 will-change-transform lg:absolute lg:left-0 lg:top-[10.61%] lg:mx-0 lg:max-w-none"
            />

            <h3
              ref={subheadingRef}
              className="font-poppins text-[clamp(20px,2.9167vw,42px)] font-bold uppercase leading-[1.05] text-[#101010] lg:absolute lg:left-[5.49%] lg:top-[69.83%] lg:w-[39.95%] lg:max-w-129.25 lg:leading-[0.88]"
            >
              <TypeChars text="The internet promised connection and delivered noise." />
            </h3>

            <div className="flex flex-col gap-8 lg:contents">
              <div className="font-poppins text-[clamp(14px,1.4583vw,21px)] leading-[1.4] text-[#101010] lg:absolute lg:left-[5.49%] lg:top-[79.24%] lg:w-[29%] lg:leading-[1.19]">
                <p>
                  Inboxes full of fake personalization. Feeds full of
                  automation pretending to be human. Buyers learned to tune all
                  of it out, and most agencies answered by turning the volume
                  up louder.
                  We went the other way. Fewer messages, more meaning. We
                  treat every conversation like it belongs to a real person,
                  because it does. We measure success in relationships that
                  compound, not blasts that burn out the moment they land.
                </p>
              </div>

              <p className="font-poppins text-[clamp(14px,1.4583vw,21px)] leading-[1.4] text-black lg:absolute lg:left-[54.10%] lg:top-[79.24%] lg:w-[40.34%] lg:leading-[1.19]">
                This is bigger than any one campaign. Every founder who picks
                up this banner, who chooses the human path over the easy one,
                makes the movement stronger. That is who we build for. That is
                who we are.
              </p>
            </div>

            <div className="mx-auto h-15 w-15 rotate-[-10.5deg] overflow-hidden lg:absolute lg:left-[66.61%] lg:top-[85%] lg:mx-0 lg:h-[11.28%] lg:w-[14.37%]">
              <Image
                src="/images/about/leaf.png"
                alt=""
                aria-hidden
                fill
                className="object-cover blur-[1px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
