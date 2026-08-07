"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { canPlayVideo } from "@/lib/media";

// Mirrors the source template's video strip: a horizontally-scrollable row
// of clickable poster thumbnails that open a fullscreen modal player. The
// old site used a Swiper carousel with prev/next arrows; native scroll-snap
// gets the same browsing feel without pulling in a carousel dependency.
// Posters whose video hasn't been migrated yet render as plain (non-clickable)
// stills rather than teasing a broken link.
export default function ProjectVideoGallery({ videos }) {
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);

  const closeModal = () => setOpenIndex(null);

  useEffect(() => {
    if (openIndex === null) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex]);

  if (!videos || videos.length === 0) return null;

  // Wraps at either end instead of stopping dead, so the arrows feel like
  // they're browsing a loop — next past the last card jumps back to the
  // first, prev before the first jumps to the last.
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

  const active = openIndex !== null ? videos[openIndex] : null;

  return (
    <div className="relative bg-black py-[clamp(40px,5.5556vw,80px)]">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(24px,6.9444vw,100px)]"
      >
        {videos.map((item, i) => {
          const playable = canPlayVideo(item.videoUrl);
          return (
            <div
              key={i}
              data-card
              className="relative aspect-video w-[min(78vw,420px)] shrink-0 snap-start overflow-hidden rounded-2xl"
            >
              <Image
                src={item.poster}
                alt={item.alt ?? "ROR Tobacco video still"}
                fill
                sizes="(min-width: 1024px) 420px, 78vw"
                className="object-cover"
              />
              {playable && (
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label="Play video"
                  className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/40 cursor-pointer"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-black">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          );
        })}
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
        // A compact floating "mini player" over a dimmed, still-visible
        // page — mirrors the old site's lightbox treatment rather than a
        // full-bleed cinema modal. Clicking anywhere outside the player
        // dismisses it; clicking the player itself (its native controls)
        // does not.
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-[min(92vw,760px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-lg text-white/80 transition-colors hover:border-white hover:text-white cursor-pointer"
            >
              ×
            </button>
            <video
              src={active.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
