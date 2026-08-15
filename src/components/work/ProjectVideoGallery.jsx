"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { canPlayVideo } from "@/lib/media";

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function MiniVideoPlayer({ src, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const showControls = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (playing) {
      hideTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
    showControls();
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setCurrentTime(v.currentTime);
    showControls();
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      try {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Exit fullscreen error:", err);
      }
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl"
      onMouseMove={showControls}
      onMouseEnter={showControls}
      onMouseLeave={() => {
        if (playing) setControlsVisible(false);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        muted={muted}
        className="h-full w-full cursor-pointer object-cover"
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onPlay={() => {
          setPlaying(true);
          showControls();
        }}
        onPause={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onEnded={onClose}
        onClick={togglePlay}
      />

      {/* Overlay & Controls Bar */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${controlsVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Scrim gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

        {/* Interactive Controls */}
        <div className="pointer-events-auto relative z-10 flex flex-col gap-2 p-4 sm:p-5">
          {/* Progress / Scrubber Bar */}
          <div
            role="slider"
            aria-label="Video timeline"
            aria-valuenow={Math.round(currentTime)}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            className="group/bar relative flex h-4 cursor-pointer items-center"
            onClick={handleSeek}
          >
            <div className="relative h-1.5 w-full rounded-full bg-white/25 transition-all duration-150 group-hover/bar:h-2">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-[#AC40FF]"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute -top-1 right-0 h-3.5 w-3.5 -translate-y-px translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(172,64,255,0.8)] transition-transform duration-150 group-hover/bar:scale-125" />
              </div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                {playing ? (
                  <Pause className="h-5 w-5 fill-white" />
                ) : (
                  <Play className="h-5 w-5 fill-white" />
                )}
              </button>

              {/* Mute / Unmute */}
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                {muted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>

              {/* Time display */}
              <span className="font-poppins text-xs font-medium tabular-nums text-white/90">
                {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
                alt={item.alt ?? "Project video still"}
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative w-[min(92vw,860px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-white hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <MiniVideoPlayer src={active.videoUrl} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
