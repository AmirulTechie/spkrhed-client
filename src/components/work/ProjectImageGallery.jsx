"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// A plain image carousel (concept art, asset sheets, ...) — the source
// site's Swiper strip without any video-modal complexity. Scroll-snap row
// with wrap-around prev/next arrows (see ProjectVideoGallery), and a click
// opens the image full-size in a lightbox instead of a poster-triggered
// video player.
export default function ProjectImageGallery({ images, altPrefix }) {
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);

  const closeLightbox = () => setOpenIndex(null);

  useEffect(() => {
    if (openIndex === null) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex]);

  if (!images || images.length === 0) return null;

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 8;
    const atStart = track.scrollLeft <= 8;

    if (direction > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (direction < 0 && atStart) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    const card = track.querySelector("[data-card]");
    const cardWidth = card ? card.getBoundingClientRect().width : track.clientWidth / 3;
    track.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  }

  const active = openIndex !== null ? images[openIndex] : null;

  return (
    <div className="relative bg-black py-[clamp(40px,5.5556vw,80px)]">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(24px,6.9444vw,100px)]"
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            data-card
            onClick={() => setOpenIndex(i)}
            aria-label="View image"
            className="relative aspect-square w-[min(70vw,340px)] shrink-0 snap-start overflow-hidden rounded-2xl bg-white cursor-pointer"
          >
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 340px, 70vw"
              className="object-contain"
            />
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3 px-[clamp(24px,6.9444vw,100px)]">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Scroll left"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#AC40FF] hover:text-[#AC40FF] cursor-pointer"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Scroll right"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[#AC40FF] hover:text-[#AC40FF] cursor-pointer"
        >
          →
        </button>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative w-[min(92vw,760px)]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-lg text-white/80 transition-colors hover:border-white hover:text-white cursor-pointer"
            >
              ×
            </button>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-2xl">
              <Image src={active} alt={altPrefix} fill sizes="92vw" className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
