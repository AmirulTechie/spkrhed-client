"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLoaderDuration } from "@/components/loader/LoaderTimingContext";

export default function ProjectHero({ project }) {
  const router = useRouter();
  const { total: loaderDuration } = useLoaderDuration();
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);

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
      gsap.set([eyebrowRef.current, headingRef.current], {
        opacity: 0,
        y: 24,
      });

      gsap
        .timeline({ delay: loaderDuration })
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.35",
        );
    });

    return () => ctx.revert();
  }, []);

  const bannerImage = project.images[0] ?? project.thumbnail;

  return (
    <section className="relative flex min-h-dvh w-full items-end overflow-hidden bg-black">
      <Image
        src={bannerImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[45%] bg-linear-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-b from-transparent to-black"
      />

      <div className="relative z-10 w-full px-8 py-[clamp(64px,10vw,100px)] text-white sm:px-12 lg:px-16">
        <button
          type="button"
          onClick={handleBack}
          className="font-poppins text-[clamp(13px,0.9722vw,14px)] font-semibold uppercase tracking-wide text-white/60 transition-colors hover:text-white"
        >
          ← Work
        </button>

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
