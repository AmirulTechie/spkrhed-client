"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLoaderDuration } from "@/components/loader/LoaderTimingContext";
import { canPlayVideo } from "@/lib/media";

export default function ProjectHero({ project }) {
  const { total: loaderDuration } = useLoaderDuration();
  const backButtonRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([backButtonRef.current, eyebrowRef.current, headingRef.current], {
        opacity: 0,
        y: 24,
      });

      gsap
        .timeline({ delay: loaderDuration })
        .to(
          backButtonRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        )
        .to(
          eyebrowRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
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
        <Link
          ref={backButtonRef}
          href="/work"
          className="group inline-flex items-center gap-3 sm:gap-4 font-poppins text-[clamp(20px,2.4vw,34px)] font-bold uppercase tracking-wider text-white transition-all duration-200 hover:text-white/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[clamp(20px,2.4vw,34px)] w-[clamp(20px,2.4vw,34px)] transition-transform duration-200 group-hover:-translate-x-1.5"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Work
        </Link>

        <p
          ref={eyebrowRef}
          className="mt-[clamp(12px,1.8vw,24px)] font-poppins text-[clamp(14px,1.25vw,18px)] font-medium uppercase text-[#AC40FF]"
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
