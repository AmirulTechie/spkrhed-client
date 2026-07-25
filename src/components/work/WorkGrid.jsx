"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK_PROJECTS } from "@/data/work";

gsap.registerPlugin(ScrollTrigger);

function WorkCard({ project, cardRef }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      ref={cardRef}
      className="group relative block aspect-square w-full overflow-hidden rounded-[30px]"
    >
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-[clamp(20px,2.7778vw,40px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {project.category && (
          <p className="font-poppins text-[clamp(12px,0.9722vw,14px)] uppercase text-[#b7b7b7]">
            {project.category}
          </p>
        )}
        <h3 className="font-anton-sc text-[clamp(20px,1.9444vw,28px)] uppercase leading-[0.97] text-white">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

export default function WorkGrid() {
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        gsap.set(cardEl, { opacity: 0, y: 60, scale: 0.94 });
        gsap.to(cardEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: cardEl,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
      <div className="mx-auto max-w-325 px-[clamp(24px,5.5556vw,80px)]">
        <div className="grid grid-cols-1 gap-[clamp(16px,1.6667vw,24px)] md:grid-cols-2">
          {WORK_PROJECTS.map((project, index) => (
            <WorkCard
              key={project.slug}
              project={project}
              cardRef={(el) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
