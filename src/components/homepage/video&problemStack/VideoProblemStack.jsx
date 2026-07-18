"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoSection from "@/components/homepage/video/VideoSection";
import ProblemSection from "@/components/homepage/problem/ProblemSection";

gsap.registerPlugin(ScrollTrigger);

export default function VideoProblemStack() {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const problemRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (!isDesktop) return;

      ScrollTrigger.create({
        trigger: videoRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.fromTo(
        problemRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: problemRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div ref={videoRef} className="relative z-0">
        <VideoSection />
      </div>
      <div ref={problemRef} className="relative z-10">
        <ProblemSection />
      </div>
    </div>
  );
}