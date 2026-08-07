"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canPlayVideo } from "@/lib/media";

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
          className="font-poppins text-[clamp(14px,1.1111vw,16px)] leading-normal text-white/70"
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

// Mirrors the source case-study PDFs: a heading/copy row (contained, like the
// rest of the site) followed by its own image(s) bleeding full-bleed edge to
// edge — no rounded cards, no side padding — before the next section starts.
// Column/aspect count scales with how many images a section carries: a lone
// hero shot, a left/right pair, or a dense asset dump (BQS's Approach folder,
// Concord's Investors Deck).
function SectionImages({ images, altPrefix, getImageRef }) {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div ref={getImageRef()} className="relative aspect-21/9 w-full overflow-hidden">
        <Image
          src={images[0]}
          alt={altPrefix}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (images.length === 2) {
    // A left/right pair stacks on narrow screens (squeezing two side by
    // side gets too small to read) and only goes side-by-side from sm: up.
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {images.map((src, i) => (
          <div key={src} ref={getImageRef()} className="relative aspect-video w-full overflow-hidden">
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return <ImageCollage images={images} altPrefix={altPrefix} getImageRef={getImageRef} />;
}

// Dense asset dumps (deck slides, brand asset sheets) laid out in one
// uniform grid read as flat and repetitive — the source decks themselves
// mix a couple of larger "feature" slides in among smaller supporting ones.
// Chunking into alternating rows (3 small tiles, then 2 larger ones) gives
// the same collage-like rhythm without any row ever mixing tile heights
// (which is what caused visible gaps in the old aspect-square/single-grid
// version — a row is only ever either all-small or all-big).
function ImageCollage({ images, altPrefix, getImageRef }) {
  const rows = [];
  let big = false;
  for (let i = 0; i < images.length; ) {
    const size = big ? 2 : 3;
    rows.push(images.slice(i, i + size));
    i += size;
    big = !big;
  }

  // A trailing group of exactly 1 would otherwise render as a single
  // full-viewport-width "hero" tile — these source images are deck-slide
  // screenshots around ~900px wide, so blown up that large they turn to
  // visible mush. Fold a stray leftover into the previous row instead of
  // ever giving one low-res asset the full-width treatment.
  if (rows.length > 1 && rows[rows.length - 1].length === 1) {
    const [stray] = rows.pop();
    rows[rows.length - 1].push(stray);
  }

  let imgNumber = 0;

  return (
    <div className="flex flex-col">
      {rows.map((items, ri) => {
        const count = items.length;
        // 3 items don't divide evenly into a 2-column mobile grid — that
        // leaves a dangling last row with one empty cell (a visible black
        // hole against this section's dark background), so odd counts
        // stack fully on mobile instead of wrapping into a partial row.
        const cols =
          count === 1
            ? "grid-cols-1"
            : count === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : count === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-4";
        const sizes =
          count === 1
            ? "100vw"
            : count === 2
              ? "(min-width: 640px) 50vw, 100vw"
              : count === 3
                ? "(min-width: 640px) 33vw, 100vw"
                : "(min-width: 640px) 25vw, 50vw";

        return (
          <div key={ri} className={`grid ${cols}`}>
            {items.map((src) => {
              imgNumber += 1;
              return (
                <div key={src} ref={getImageRef()} className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`${altPrefix} ${imgNumber}`}
                    fill
                    sizes={sizes}
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function ProjectSection({ section, textRef, getImageRef }) {
  const paragraphs = section.text.split("\n\n");

  return (
    <div className="flex flex-col gap-[clamp(32px,4.4444vw,56px)] py-[clamp(48px,6.9444vw,100px)] first:pt-0">
      <div
        ref={textRef}
        className="mx-auto grid w-full max-w-325 grid-cols-1 gap-8 px-[clamp(24px,5.5556vw,80px)] lg:grid-cols-2 lg:gap-16"
      >
        <h2 className="font-anton-sc text-[clamp(36px,4.7222vw,68px)] uppercase leading-[0.95] text-[#AC40FF]">
          {section.title}
        </h2>
        <div className="flex flex-col gap-4 lg:pt-2">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="font-poppins text-[clamp(15px,1.25vw,18px)] leading-[1.6] text-white/70"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <SectionImages images={section.images} altPrefix={section.title} getImageRef={getImageRef} />
    </div>
  );
}

export default function ProjectContent({ project }) {
  const sectionRef = useRef(null);
  const summaryRef = useRef(null);
  const approachRef = useRef(null);
  const galleryRefs = useRef([]);
  const sectionTextRefs = useRef([]);
  const sectionImageRefs = useRef([]);

  const hasSections = Array.isArray(project.sections) && project.sections.length > 0;
  const galleryImages = hasSections ? [] : project.images.slice(1);
  const playableVideo = canPlayVideo(project.videoUrl);

  // Every image across every section gets a stable flat ref slot via this
  // closure counter, reset each render — avoids needing per-section nested
  // ref arrays just to feed the same scroll-triggered reveal below.
  let imageSlot = 0;
  function nextImageRef() {
    const slot = imageSlot++;
    return (el) => {
      sectionImageRefs.current[slot] = el;
    };
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textEls = hasSections
        ? sectionTextRefs.current.filter(Boolean)
        : [summaryRef.current, approachRef.current].filter(Boolean);

      textEls.forEach((el) => {
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

      const imageEls = hasSections
        ? sectionImageRefs.current.filter(Boolean)
        : galleryRefs.current;

      imageEls.forEach((el) => {
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
  }, [hasSections]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      {hasSections ? (
        <div className="flex flex-col py-[clamp(64px,9.7222vw,140px)]">
          {project.sections.map((section, i) => (
            <ProjectSection
              key={section.title}
              section={section}
              textRef={(el) => {
                sectionTextRefs.current[i] = el;
              }}
              getImageRef={nextImageRef}
            />
          ))}

          {playableVideo && (
            <div className="mx-auto w-full max-w-325 px-[clamp(24px,5.5556vw,80px)] pt-[clamp(24px,3.3333vw,40px)]">
              <video
                src={project.videoUrl}
                controls
                playsInline
                className="w-full rounded-[30px]"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto flex max-w-325 flex-col gap-[clamp(48px,6.9444vw,100px)] px-[clamp(24px,5.5556vw,80px)] py-[clamp(64px,9.7222vw,140px)]">
          <div className="grid grid-cols-1 gap-[clamp(32px,4.1667vw,60px)] lg:grid-cols-2">
            <TextBlock label="Summary" text={project.summary} blockRef={summaryRef} />
            <TextBlock label="Approach" text={project.approach} blockRef={approachRef} />
          </div>

          {playableVideo && (
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
      )}
    </section>
  );
}
