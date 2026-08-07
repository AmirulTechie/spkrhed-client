"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canPlayVideo } from "@/lib/media";
import ProjectVideoGallery from "./ProjectVideoGallery";
import ProjectVideoEmbed from "./ProjectVideoEmbed";
import ProjectImageGallery from "./ProjectImageGallery";

gsap.registerPlugin(ScrollTrigger);

// Mirrors the old speakerhead.com case-study template: a big centered
// heading/paragraph "Summary" row, then a sequence of alternating
// image/text rows (left-image/right-text, right-image/left-text) each with
// its own small heading ("Approach", "Branding", "Marketing", ...). Unlike
// the source site we stay on one dark theme throughout instead of
// flip-flopping light/dark per row — that alternation doesn't fit this
// site's otherwise-consistent black aesthetic. Type scale and spacing are
// deliberately generous, matching the source template rather than this
// site's more compact default copy sizing.
function SummaryRow({ heading, text, rowRef, reverse = false }) {
  if (!text) return null;
  const paragraphs = text.split("\n\n");

  return (
    <div
      ref={rowRef}
      className="grid w-full grid-cols-1 items-center gap-10 px-[clamp(24px,6.9444vw,100px)] py-[clamp(64px,9.7222vw,140px)] lg:grid-cols-12 lg:gap-12"
    >
      <h2
        className={`font-anton-sc text-[clamp(44px,6.25vw,96px)] uppercase leading-[0.9] text-[#AC40FF] lg:col-span-5 ${
          reverse ? "lg:col-start-8" : "lg:col-start-1"
        }`}
      >
        {heading.split("\n").map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h2>
      <div
        className={`flex flex-col gap-5 lg:col-span-6 lg:row-start-1 ${
          reverse ? "lg:col-start-1" : "lg:col-start-7"
        }`}
      >
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-poppins text-[clamp(18px,1.6667vw,24px)] leading-[1.65] text-white/70"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

// Some projects (e.g. Rooster Rojo Tequila) never pair an image alongside
// text at all — every text section is a standalone heading/paragraph row
// like Summary, and every image is its own full-bleed section in between.
// Reuses SummaryRow's exact layout so any block can carry a heading like
// "Approach" or "Production + 3D Animation" the same way. `reverse` flips
// heading/text left-right per row for a tic-tac-toe rhythm down the page.
function TextRow({ heading, text, rowRef, reverse }) {
  return <SummaryRow heading={heading} text={text} rowRef={rowRef} reverse={reverse} />;
}

// A row of small feature cards (e.g. Pyramid Tequila's "Bottle Design /
// Logo Design / OOH Campaign") — three contained columns instead of a
// full-bleed image/text row, for wrapping up a project with a few short
// callouts rather than another full section each.
function FeatureGrid({ items, rowRef }) {
  return (
    <div
      ref={rowRef}
      className="grid w-full grid-cols-1 gap-x-10 gap-y-12 px-[clamp(24px,6.9444vw,100px)] py-[clamp(56px,8.3333vw,120px)] sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-3">
          <h3 className="font-anton-sc text-[clamp(24px,2.5vw,36px)] uppercase leading-[0.95] text-[#AC40FF]">
            {item.heading}
          </h3>
          <p className="font-poppins text-[clamp(15px,1.1806vw,17px)] leading-[1.65] text-white/70">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

// A side-by-side pair of images, edge to edge with no side padding or
// gutter (e.g. Golden Soil's two banner shots stacked as one row) — distinct
// from ImageGridBlock, which is contained/padded for a wall of 3+ images.
function ImagePairBlock({ images, altPrefix, rowRef }) {
  return (
    <div ref={rowRef} className="grid grid-cols-1 sm:grid-cols-2">
      {images.map((src, i) => (
        <div key={src} className="relative aspect-video w-full overflow-hidden">
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

// A static 3-column image grid (e.g. Jaxon Homes' interior-visualization
// set) — every tile the same weight, no carousel/scroll behavior. Distinct
// from ProjectImageGallery, which is for a scrollable, click-to-enlarge
// strip; this is just a contained, evenly-spaced wall of images.
function ImageGridBlock({ images, altPrefix, rowRef }) {
  return (
    <div
      ref={rowRef}
      className="grid w-full grid-cols-1 gap-4 px-[clamp(24px,6.9444vw,100px)] py-[clamp(56px,8.3333vw,120px)] sm:grid-cols-2 lg:grid-cols-3"
    >
      {images.map((src, i) => (
        <div key={src} className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// A standalone image with no paired text — edge to edge, natural aspect
// ratio (never cropped), same as a ZigzagBlock image but spanning the full
// row width instead of half of it.
function FullImageBlock({ block, altPrefix, imageRef }) {
  return (
    <div ref={imageRef}>
      <Image
        src={block.image}
        alt={block.alt ?? altPrefix}
        width={block.imageWidth}
        height={block.imageHeight}
        sizes="100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

// Mirrors the source template's image treatment: each image renders at its
// own natural aspect ratio — never cropped — so the row's height is simply
// whatever the image (or the text, whichever is taller) needs, with both
// columns vertically centered. The image still bleeds edge to edge with no
// padding or radius.
function ZigzagBlock({ block, altPrefix, textRef, imageRef }) {
  const paragraphs = block.text.split("\n\n");
  const imageOnRight = block.imageSide !== "left";

  return (
    <div className="grid grid-cols-1 items-center lg:grid-cols-2">
      <div
        ref={textRef}
        className={`flex flex-col gap-6 px-[clamp(24px,6.9444vw,100px)] py-[clamp(56px,8.3333vw,120px)] ${
          imageOnRight ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {block.heading && (
          <h2 className="font-anton-sc text-[clamp(36px,5vw,72px)] uppercase leading-[0.92] text-[#AC40FF]">
            {block.heading}
          </h2>
        )}
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-poppins text-[clamp(17px,1.5278vw,22px)] leading-[1.7] text-white/70"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {block.image && (
        <div
          ref={imageRef}
          className={imageOnRight ? "lg:order-2" : "lg:order-1"}
        >
          <Image
            src={block.image}
            alt={block.heading ?? altPrefix}
            width={block.imageWidth}
            height={block.imageHeight}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="block h-auto w-full"
          />
        </div>
      )}
    </div>
  );
}

export default function ProjectBlocks({ project }) {
  const sectionRef = useRef(null);
  const summaryRef = useRef(null);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);

  const playableVideo = canPlayVideo(project.videoUrl);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textEls = [summaryRef.current, ...textRefs.current].filter(Boolean);
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

      imageRefs.current.filter(Boolean).forEach((el) => {
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
  }, [project]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      {project.videoAfterHero && playableVideo && (
        <video
          src={project.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="block w-full"
        />
      )}

      <div className="flex flex-col divide-y divide-white/5">
        <SummaryRow heading="Summary" text={project.summary} rowRef={summaryRef} />

        {project.blocks.map((block, i) =>
          block.type === "video-gallery" ? (
            <ProjectVideoGallery key={i} videos={block.videos} />
          ) : block.type === "image-gallery" ? (
            <ProjectImageGallery key={i} images={block.images} altPrefix={project.title} />
          ) : block.type === "video-embed" ? (
            <ProjectVideoEmbed key={i} src={block.src} variant={block.variant} />
          ) : block.type === "text-row" ? (
            <TextRow
              key={i}
              heading={block.heading}
              text={block.text}
              reverse={block.reverse}
              rowRef={(el) => {
                textRefs.current[i] = el;
              }}
            />
          ) : block.type === "full-image" ? (
            <FullImageBlock
              key={i}
              block={block}
              altPrefix={project.title}
              imageRef={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ) : block.type === "feature-grid" ? (
            <FeatureGrid
              key={i}
              items={block.items}
              rowRef={(el) => {
                textRefs.current[i] = el;
              }}
            />
          ) : block.type === "image-grid" ? (
            <ImageGridBlock
              key={i}
              images={block.images}
              altPrefix={project.title}
              rowRef={(el) => {
                textRefs.current[i] = el;
              }}
            />
          ) : block.type === "image-pair" ? (
            <ImagePairBlock
              key={i}
              images={block.images}
              altPrefix={project.title}
              rowRef={(el) => {
                textRefs.current[i] = el;
              }}
            />
          ) : (
            <ZigzagBlock
              key={i}
              block={block}
              altPrefix={project.title}
              textRef={(el) => {
                textRefs.current[i] = el;
              }}
              imageRef={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ),
        )}
      </div>

      {!project.videoAfterHero && playableVideo && (
        <div className="mx-auto w-full max-w-350 px-[clamp(24px,6.9444vw,100px)] pb-[clamp(64px,9.7222vw,140px)]">
          <video
            src={project.videoUrl}
            controls
            playsInline
            className="w-full rounded-3xl"
          />
        </div>
      )}
    </section>
  );
}
