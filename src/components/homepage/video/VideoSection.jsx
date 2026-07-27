"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// One position per branch, used at every breakpoint (not just lg:). The
// source PNGs are hard-cropped rectangles, not vine art that fades out at
// its own edges — each branch must sit far enough outside the stage that
// only the vine's natural, tapering silhouette crosses into frame, with the
// raw crop edges clipped off by the stage's overflow-hidden. That's exactly
// what the original lg-only values did; reusing them unscaled at every
// breakpoint keeps that same safety margin, since they're already percentage
// values relative to the stage.
//
// `side` says which edge this branch exits toward on scroll, and is also
// how branches are grouped for that exit: everything on one side is
// translated together as a single rigid unit, so the overlap between
// neighboring branches (tuned to match Figma) never changes — only the
// group's shared position does.
const BRANCHES = [
  {
    src: "/images/Home/tree-branch-1.png",
    width: 1615,
    height: 2396,
    side: "left",
    position: "left-[-7%] top-[-20%] w-[55%]",
  },
  {
    src: "/images/Home/tree-branch-3.png",
    width: 1615,
    height: 2396,
    side: "left",
    // top is pushed further down than the other branches: below lg the
    // stage is a boxier aspect-4/3 (vs. lg's wide 1440/666), which leaves
    // more vertical room and exposes this PNG's hard-cropped bottom seam
    // at top-40%. Pushing it to top-63% restores the same clipped margin
    // the wide desktop stage gives it for free.
    position: "left-[-10%] top-[63%] w-[35%]",
  },
  {
    src: "/images/Home/tree-branch-2.png",
    width: 2507,
    height: 1943,
    side: "right",
    position: "right-[-32%] top-[-85%] w-[90%]",
  },
  {
    src: "/images/Home/tree-branch-1.png",
    width: 2507,
    height: 1943,
    side: "right",
    position: "right-[-16%] top-[-30%] w-[55%]",
  },
];

// Same idea for the cloud: one position, used at every breakpoint.
const CLOUD_POSITION = "bottom-[-35%] left-1/2 w-[115%]";

// How much stage width/height stays clear around the video once it has
// scaled up to its largest, final size.
const VIDEO_FINAL_MARGIN_RATIO = 0.03;

export default function VideoSection() {
  const stageRef = useRef(null);
  const branchRefs = useRef([]);
  const cloudRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const cloud = cloudRef.current;
    const video = videoRef.current;
    const branchEls = BRANCHES.map((branch, i) => ({
      side: branch.side,
      el: branchRefs.current[i],
    })).filter((b) => b.el);

    let ctx;

    const build = () => {
      ctx = gsap.context(() => {
        // These transform components stay put for the whole animation —
        // gsap tracks them independently of the x/y/scale tweens below.
        gsap.set(cloud, { xPercent: -50 });
        gsap.set(video, { xPercent: -50, yPercent: -50 });

        // Rest state: branches sit exactly where their CSS puts them
        // (matches Figma), cloud stays put.
        branchEls.forEach(({ el }) => gsap.set(el, { x: 0, y: 0 }));
        gsap.set(cloud, { y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + window.innerHeight,
            scrub: 0.6,
            pin: true,
          },
        });

        // Each side's branches exit toward their nearest border as one
        // rigid group. Only the group's innermost edge (the one nearest
        // the video, i.e. the last part of the group still in frame) is
        // measured; the whole group is translated by the same delta until
        // that edge sits flush with the stage border. Neighboring branches
        // within a group never move relative to each other.
        const stageRect = stage.getBoundingClientRect();
        const leftEls = branchEls.filter((b) => b.side === "left").map((b) => b.el);
        const rightEls = branchEls.filter((b) => b.side === "right").map((b) => b.el);

        if (leftEls.length) {
          const innerEdge = Math.max(...leftEls.map((el) => el.getBoundingClientRect().right));
          const delta = stageRect.left - innerEdge;
          leftEls.forEach((el) => tl.to(el, { x: delta, ease: "none" }, 0));
        }

        if (rightEls.length) {
          const innerEdge = Math.min(...rightEls.map((el) => el.getBoundingClientRect().left));
          const delta = stageRect.right - innerEdge;
          rightEls.forEach((el) => tl.to(el, { x: delta, ease: "none" }, 0));
        }

        // Scale the video up to fill the stage minus a small breathing
        // margin, capped by whichever dimension (width or height) is
        // tighter so it never overflows the stage.
        const videoRect = video.getBoundingClientRect();
        const marginX = stageRect.width * VIDEO_FINAL_MARGIN_RATIO;
        const marginY = stageRect.height * VIDEO_FINAL_MARGIN_RATIO;
        const targetScale = Math.min(
          (stageRect.width - marginX * 2) / videoRect.width,
          (stageRect.height - marginY * 2) / videoRect.height
        );

        gsap.set(video, { scale: 0.4 });
        tl.to(video, { scale: targetScale, ease: "none" }, 0);
      }, stage);
    };

    build();

    // Rebuild from scratch on resize so the exit offsets, target scale,
    // and pin distance stay correct across breakpoints.
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
            className={`pointer-events-none absolute max-w-none select-none z-0 will-change-transform lg:z-30 ${branch.position}`}
          />
        ))}

        <Image
          ref={cloudRef}
          src="/images/Home/cloud.png"
          alt=""
          width={3723}
          height={1164}
          className={`pointer-events-none absolute max-w-none select-none z-999 will-change-transform ${CLOUD_POSITION}`}
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
