"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each branch carries separate mobile/desktop position strings (rather than
// one string mixing bare and lg:-prefixed classes) so the two breakpoints
// can be tuned independently without hunting through a combined string.
// Both must stay full literal strings — Tailwind's build-time scanner only
// generates CSS for arbitrary-value classes it can see verbatim in the
// source, not ones assembled from JS variables at runtime.
const BRANCHES = [
  {
    src: "/images/Home/tree-branch-1.png",
    width: 1615,
    height: 2396,
    mobile: "left-[-10%] top-[-20%] w-[50%]",
    desktop: "lg:left-[-7%] lg:top-[-20%] lg:w-[55%]",
  },
  {
    src: "/images/Home/tree-branch-3.png",
    width: 1615,
    height: 2396,
    mobile: "left-[-10%] top-[40%] w-[35%]",
    desktop: "lg:left-[-10%] lg:top-[40%] lg:w-[35%]",
  },
  {
    src: "/images/Home/tree-branch-2.png",
    width: 2507,
    height: 1943,
    mobile: "right-[-32%] top-[-85%] w-[90%]",
    desktop: "lg:right-[-32%] lg:top-[-85%] lg:w-[90%]",
  },
  {
    src: "/images/Home/tree-branch-1.png",
    width: 2507,
    height: 1943,
    mobile: "right-[-16%] top-[-30%] w-[55%]",
    desktop: "lg:right-[-16%] lg:top-[-30%] lg:w-[55%]",
  },
];

// Same idea for the cloud: its mobile and desktop position/size are edited
// independently here instead of inline in the JSX below.
const CLOUD_MOBILE = "bottom-[-35%] left-1/2 w-[115%]";
const CLOUD_DESKTOP = "lg:bottom-[-35%] lg:left-1/2 lg:w-[115%]";

export default function VideoSection() {
  const stageRef = useRef(null);
  const branchRefs = useRef([]);
  const cloudRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const branches = branchRefs.current.filter(Boolean);
    const cloud = cloudRef.current;
    const video = videoRef.current;

    // Distance (in px) each branch must travel from "gathered at the
    // center" back to its resting spot. gsap's function-based tween
    // values aren't evaluated on the "from" side of fromTo(), so instead
    // we compute the offset up front, gsap.set() it as the starting
    // transform, then tween to the resting {x:0, y:0}.
    const branchOffset = (el) => {
      const stageRect = stage.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      return {
        x: stageRect.left + stageRect.width / 2 - (elRect.left + elRect.width / 2),
        y: stageRect.top + stageRect.height / 2 - (elRect.top + elRect.height / 2),
      };
    };

    const cloudOffsetY = () => {
      const stageRect = stage.getBoundingClientRect();
      const elRect = cloud.getBoundingClientRect();
      return stageRect.top + stageRect.height / 2 - (elRect.top + elRect.height / 2);
    };

    let ctx;

    const build = () => {
      ctx = gsap.context(() => {
        // These transform components stay put for the whole animation —
        // gsap tracks them independently of the x/y/scale tweens below.
        gsap.set(cloud, { xPercent: -50 });
        gsap.set(video, { xPercent: -50, yPercent: -50 });

        // Below lg, skip the pinned scroll-scrub entirely and just render
        // everything at its resting position — pinning a full-viewport
        // stage over a scrub is heavy and janky on mobile scroll.
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        if (!isDesktop) {
          branches.forEach((el) => gsap.set(el, { x: 0, y: 0 }));
          gsap.set(cloud, { y: 0 });
          gsap.set(video, { scale: 1 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: 0.6,
            pin: true,
          },
        });

        branches.forEach((el) => {
          const offset = branchOffset(el);
          gsap.set(el, offset);
          tl.to(el, { x: 0, y: 0, ease: "none" }, 0);
        });

        gsap.set(cloud, { y: cloudOffsetY() });
        tl.to(cloud, { y: 0, ease: "none" }, 0);

        gsap.set(video, { scale: 0.4 });
        tl.to(video, { scale: 1, ease: "none" }, 0);
      }, stage);
    };

    build();

    // Rebuild from scratch on resize so the "gathered" offsets and pin
    // distance stay correct across breakpoints.
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ctx.revert();
        build();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#DDDDD5] rounded-4xl">
      <div
        ref={stageRef}
        className="relative aspect-4/3 w-full overflow-hidden rounded-t-[clamp(24px,4vw,72px)] will-change-transform lg:aspect-1440/666"
      >
        {BRANCHES.map((branch, i) => (
          <Image
            key={i}
            ref={(el) => {
              branchRefs.current[i] = el;
            }}
            src={branch.src}
            alt=""
            width={branch.width}
            height={branch.height}
            className={`pointer-events-none absolute max-w-none select-none z-0 will-change-transform lg:z-30 ${branch.mobile} ${branch.desktop}`}
          />
        ))}

        <Image
          ref={cloudRef}
          src="/images/Home/cloud.png"
          alt=""
          width={3723}
          height={1164}
          className={`pointer-events-none absolute max-w-none select-none z-999 will-change-transform ${CLOUD_MOBILE} ${CLOUD_DESKTOP}`}
        />

        <div
          ref={videoRef}
          className="absolute left-1/2 top-[38%] aspect-850/452 w-[94%] overflow-hidden rounded-[clamp(12px,2.2vw,32px)] z-10 will-change-transform lg:top-1/2 lg:w-[59.03%]"
        >
          <Image
            src="/images/Home/home-video-thumbnail.png"
            alt="Watch the story"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 h-[clamp(32px,4.4vw,80px)] w-[clamp(32px,4.4vw,80px)] -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/Home/video-play-btn.png"
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
