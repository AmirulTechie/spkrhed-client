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
    zIndex: 40,
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
    position: "left-[-15%] top-[55%] w-[35%]",
    zIndex: 30,
  },
  {
    src: "/images/Home/tree-branch-2.png",
    width: 2507,
    height: 1943,
    side: "right",
    position: "right-[-32%] top-[-85%] w-[90%]",
    zIndex: 30,
  },
  {
    src: "/images/Home/tree-branch-1.png",
    width: 2507,
    height: 1943,
    side: "right",
    position: "right-[-16%] top-[-30%] w-[55%]",
    zIndex: 30,
  },
];
// How much stage width/height stays clear around the video once it has
// scaled up to its largest, final size. Zero so the video fills the stage
// edge-to-edge at full scale, with no gap left for the user to scroll past
// before the pin releases.
const VIDEO_FINAL_MARGIN_RATIO = 0;

// How much extra pinned scroll happens AFTER the video finishes growing,
// before the pin releases and the next section is allowed to appear. This
// is the fix for the "problem section sneaks into view right as the video
// hits full size" issue — without a hold, the growth tween's end and the
// pin's release land on the exact same scroll pixel, so there's no scroll
// distance left to signal "you're done here, the video is now static full
// screen." 0.4 = 40% of one viewport height of "nothing animates" scroll.
const HOLD_RATIO = 0.4;

export default function VideoSection() {
  const stageRef = useRef(null);
  const branchRefs = useRef([]);
  const videoRef = useRef(null);
  const playBtnRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    const branchEls = BRANCHES.map((branch, i) => ({
      side: branch.side,
      el: branchRefs.current[i],
    })).filter((b) => b.el);

    // Centering transforms apply at every breakpoint — they're layout, not
    // animation, so they stay in effect even where the scroll-driven
    // pin/scrub below is disabled.
    gsap.set(video, { xPercent: -50, yPercent: -50 });

    // The branch/video pin-and-scrub animation, and the branches
    // themselves, are desktop-only (see the `hidden lg:block` on the
    // branch images below). gsap.matchMedia builds this block only when
    // the query matches and automatically reverts it — killing the
    // ScrollTrigger/pin and resetting tweened props — when the viewport
    // drops below `lg`, so mobile/tablet gets a plain static video with
    // no scroll hijacking.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Rest state: branches sit exactly where their CSS puts them
      // (matches Figma).
      branchEls.forEach(({ el }) => gsap.set(el, { x: 0, y: 0 }));

      // Stacking + height fix: the stage must be raised above ProblemSection's
      // `z-10` stacking context, otherwise the fixed-positioned stage (which
      // has no explicit z-index by default) renders BEHIND it, causing a thin
      // sliver of ProblemSection to bleed into the bottom of the viewport
      // during the pin. Setting height: 100vh here (before ScrollTrigger is
      // created) also ensures the stage always covers the full viewport from
      // the moment the pin starts — no partial-height gap as the animation
      // progresses. Both values are reverted automatically by mm.revert() when
      // the viewport drops below lg, restoring the normal aspect-ratio layout.
      gsap.set(stage, { zIndex: 50, height: "100vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + window.innerHeight * (0.4 + HOLD_RATIO),
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
        leftEls.forEach((el) => tl.to(el, { x: delta, ease: "none", duration: 1 }, 0));
      }

      if (rightEls.length) {
        const innerEdge = Math.min(...rightEls.map((el) => el.getBoundingClientRect().left));
        const delta = stageRect.right - innerEdge;
        rightEls.forEach((el) => tl.to(el, { x: delta, ease: "none", duration: 1 }, 0));
      }

      // Grow the video from a small starting box up to the stage's full
      // width and height independently (not a uniform scale), so the
      // final frame is flush with the stage on every side instead of
      // being letterboxed to the video's own, narrower aspect ratio. The
      // inner Image uses object-cover, so it crops to fill as the box's
      // aspect ratio shifts rather than stretching/distorting.
      //
      // Target size is "100%" (of the stage, the video's positioned
      // parent) rather than a pixel number computed from
      // getBoundingClientRect(). A computed pixel target can end up a
      // few px short of the real stage size (subpixel rounding,
      // scrollbar width, layout not fully settled when this effect
      // runs), which shows up as a thin gap around the video once it's
      // "full screen." Tweening straight to 100% has no such drift, it
      // always lands exactly on the stage's actual rendered edges.
      // VIDEO_FINAL_MARGIN_RATIO stays available for a deliberate inset;
      // when it's 0 the target is just 100%.
      const videoRect = video.getBoundingClientRect();
      const startWidth = videoRect.width * 0.4;
      const startHeight = videoRect.height * 0.4;
      const targetWidth = `${(1 - VIDEO_FINAL_MARGIN_RATIO * 2) * 100}%`;
      const targetHeight = `${(1 - VIDEO_FINAL_MARGIN_RATIO * 2) * 100}%`;

      gsap.set(video, { width: startWidth, height: startHeight });
      tl.to(
        video,
        { width: targetWidth, height: targetHeight, ease: "none", duration: 1 },
        0,
      );

      // Remove the stage's top-corner rounding in sync with the video growth
      // and branch exit animations. Height is no longer tweened here because
      // it was already set to 100vh in the gsap.set above.
      tl.to(
        stage,
        {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // Play button: hidden at rest, fades + scales in during the hold
      // phase (timeline position 1 onward) so it only appears once the
      // thumbnail has reached full screen. Using half the hold duration
      // so it finishes well before the pin releases.
      gsap.set(playBtnRef.current, { opacity: 0, scale: 0.6 });
      tl.to(
        playBtnRef.current,
        { opacity: 1, scale: 1, ease: "none", duration: HOLD_RATIO * 0.6 },
        1,
      );

      // Hold: nothing animates here, it's an empty tween that just
      // occupies timeline (and therefore scroll) space. This is what
      // keeps the stage pinned for a bit after the video hits full size,
      // so the user has to scroll past this before the pin releases and
      // ProblemSection is allowed to creep into view.
      tl.to({}, { duration: HOLD_RATIO });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-[#DDDDD5] rounded-t-4xl">
      <div
        ref={stageRef}
        className="relative aspect-video w-full overflow-hidden rounded-t-[clamp(24px,4vw,72px)] will-change-transform lg:aspect-1440/666"
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
            style={{ zIndex: branch.zIndex }}
            className={`pointer-events-none absolute hidden max-w-none select-none will-change-transform lg:block ${branch.position}`}
          />
        ))}
        <div
          ref={videoRef}
          className="absolute left-1/2 top-1/2 aspect-850/452 w-[94%] overflow-hidden rounded-4xl z-50 will-change-transform lg:rounded-none lg:w-[59.03%]"
        >
          <Image
            src="/images/Home/video_thumbnail.png"
            alt="Watch the story"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <button
            ref={playBtnRef}
            type="button"
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.15)]"
            style={{
              width: "clamp(44px,4.16vw,76px)",
              height: "clamp(44px,4.16vw,76px)",
              background: "rgba(255,255,255,0.18)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow:
                "0 2px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            {/*
              100×100 viewBox with vertices at (35,20), (35,80), (80,50).
              Centroid = ((35+35+80)/3, (20+80+50)/3) = (50, 50) — perfectly
              centred, no translateX hack required.
            */}
            <svg
              viewBox="0 0 100 100"
              fill="white"
              aria-hidden="true"
              style={{ width: "46%", height: "46%" }}
            >
              <polygon points="35,20 35,80 80,50" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}