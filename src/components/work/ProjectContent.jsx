"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TextBlock({ label, text, blockRef }) {
  if (!text) return null;

  const paragraphs = text.split("\n\n");

  return (
    <div ref={blockRef} className="flex flex-col gap-4">
      <h2 className="font-anton-sc text-[clamp(22px,2.2222vw,32px)] uppercase leading-[0.97] text-[#AC40FF]">
        {label}
      </h2>
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="font-poppins text-[clamp(14px,1.1111vw,16px)] leading-[1.5] text-white/70"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function GalleryImage({ src, alt, imgRef }) {
  return (
    <div
      ref={imgRef}
      className="relative aspect-4/3 w-full overflow-hidden rounded-[30px]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

export default function ProjectContent({ project }) {
  const sectionRef = useRef(null);
  const summaryRef = useRef(null);
  const approachRef = useRef(null);
  const galleryRefs = useRef([]);

  const galleryImages = project.images.slice(1);
  // CSP's media-src only allows Cloudinary — videos still pointing at the old
  // speakerhead.com host get silently blocked by the browser, so only render
  // once a project's videoUrl has actually been migrated there.
  const canPlayVideo = project.videoUrl?.includes("res.cloudinary.com");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      [summaryRef.current, approachRef.current].filter(Boolean).forEach((el) => {
        gsap.set(el, { opacity: 0, y: 40 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      galleryRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 60, scale: 0.96 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
      <div className="mx-auto flex max-w-325 flex-col gap-[clamp(48px,6.9444vw,100px)] px-[clamp(24px,5.5556vw,80px)]">
        <div className="grid grid-cols-1 gap-[clamp(32px,4.1667vw,60px)] lg:grid-cols-2">
          <TextBlock label="Summary" text={project.summary} blockRef={summaryRef} />
          <TextBlock label="Approach" text={project.approach} blockRef={approachRef} />
        </div>

        {canPlayVideo && (
          <video
            src={project.videoUrl}
            controls
            playsInline
            className="w-full rounded-[30px]"
          />
        )}

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-1 gap-[clamp(16px,1.6667vw,24px)] sm:grid-cols-2">
            {galleryImages.map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                alt={`${project.title} ${i + 2}`}
                imgRef={(el) => {
                  galleryRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
