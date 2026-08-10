"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLoaderDuration } from "@/components/loader/LoaderTimingContext";
import { canPlayVideo } from "@/lib/media";

export default function ProjectHero({ project }) {
  const router = useRouter();
  const { total: loaderDuration } = useLoaderDuration();
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  // backBtnWrapperRef: overflow-hidden container that clips the button during
  // its entrance. backBtnRef: the button itself — animated via y only, never
  // opacity, so its backdrop-filter layer is always initialised (no glitch).
  const backBtnWrapperRef = useRef(null);
  const backBtnRef = useRef(null);

  // A plain <Link href="/work"> always pushes a fresh navigation, which
  // can't restore the scroll position the user was at on the grid.
  // router.back() reuses the actual history entry instead, so it gets the
  // same scroll restoration as the browser's own back button. Falls back to
  // a normal navigation if there's no in-app history to go back to (e.g. a
  // direct/shared link straight to this project).
  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/work");
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Slide in from the left: the button starts off-screen (x: -280) and
      // eases to its natural position (x: 0). The parent <section> already
      // has overflow-hidden, so it clips the button at the viewport's left
      // edge — no extra wrapper clip needed. No opacity is set on the button
      // so backdrop-filter stays fully composited the whole time (no glitch).
      gsap.set(backBtnRef.current, { x: -280 });
      gsap.set([eyebrowRef.current, headingRef.current], { opacity: 0, y: 24 });

      gsap
        .timeline({ delay: loaderDuration })
        .to(backBtnRef.current, {
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          eyebrowRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.35",
        )
        .to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.35",
        );
    });

    return () => ctx.revert();
  }, [loaderDuration]);

  const bannerImage = project.images[0] ?? project.thumbnail;
  const playableHeroVideo = canPlayVideo(project.heroVideo) ? project.heroVideo : null;

  return (
    // Source banners are landscape photos/mockups; a full min-h-dvh section
    // is fine on wide screens (its aspect ratio is close enough to the
    // image's own), but on a tall narrow phone viewport that same crop
    // window becomes so extreme it zooms in past the actual subject —
    // shortening the section on small screens keeps the crop reasonable.
    <section className="relative flex h-[65dvh] w-full items-end overflow-hidden bg-black sm:h-[80dvh] lg:min-h-dvh">
      {playableHeroVideo ? (
        <video
          src={playableHeroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={bannerImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[45%] bg-linear-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-b from-transparent to-black"
      />

      <div className="relative z-10 w-full px-8 py-[clamp(64px,10vw,100px)] text-white sm:px-12 lg:px-16">
        <div ref={backBtnWrapperRef}>
          <button
            ref={backBtnRef}
            type="button"
            onClick={handleBack}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/25 bg-black/40 px-5 py-2.5 font-poppins text-[clamp(14px,1.15vw,17px)] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Work
          </button>
        </div>

        <p
          ref={eyebrowRef}
          className="mt-[clamp(16px,2.2222vw,32px)] font-poppins text-[clamp(14px,1.25vw,18px)] font-medium uppercase text-[#AC40FF]"
        >
          {project.category ?? "Case Study"}
        </p>

        <h1
          ref={headingRef}
          className="mt-[clamp(8px,1.1111vw,16px)] font-anton-sc text-[clamp(36px,6.25vw,90px)] uppercase leading-[0.97]"
        >
          {project.title}
        </h1>
      </div>
    </section>
  );
}
