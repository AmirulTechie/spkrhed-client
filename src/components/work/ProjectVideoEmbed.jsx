"use client";

import { useEffect, useRef, useState } from "react";
import { canPlayVideo } from "@/lib/media";

// Some case studies embed a video block full-screen, edge to edge, matching
// the old site's borderless "video-cover" sections. Source can be a direct
// file (Cloudinary-hosted, once migrated), a Vimeo iframe, or a YouTube
// iframe — detected from the URL so a project can mix any of the three
// without extra data plumbing. "ambient" autoplays muted/looped with no
// controls (a background loop); "player" shows native controls for a video
// meant to be watched. Vimeo/YouTube embeds are always safe to render (CSP
// allows both generally); a direct file still pointing at an unmigrated
// host is gated the same way as everywhere else, so it just doesn't render
// rather than showing a broken/empty video box.
export default function ProjectVideoEmbed({ src, variant = "player" }) {
  const isVimeo = src.includes("vimeo.com");
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isIframeEmbed = isVimeo || isYouTube;
  const ambient = variant === "ambient";

  // A "player" iframe (Vimeo/YouTube) has no object-fit: cover of its own —
  // left to fill an h-dvh-tall box, the platform's embed letterboxes or
  // pillarboxes to the video's native 16:9 the moment the viewport's own
  // ratio isn't also 16:9 (any window shorter/wider than that leaves visible
  // bars down the sides, so the video reads as not spanning full width).
  // Constraining the container itself to aspect-video instead guarantees the
  // box's ratio always matches the video's, so the iframe fills it edge to
  // edge with no bars and its native control bar lands fully on-screen.
  // Ambient embeds keep the h-dvh cover treatment below — they have no
  // control bar to protect, so cropping the excess to stay full-bleed is
  // fine there.
  const iframePlayer = isIframeEmbed && !ambient;

  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // A Vimeo/YouTube iframe doesn't just fetch a video file — it loads the
  // whole embed player page first (its own HTML/CSS/JS bundle), which is
  // real weight competing with the rest of the page for bandwidth the
  // instant it mounts, even while it's still scrolled well out of view.
  // Deferring the iframe (or the video's own src) until the block is
  // actually approaching the viewport spreads that cost out instead of
  // front-loading every video block on the page at once. 600px of runway
  // means it's typically already loaded by the time a user scrolls to it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!isIframeEmbed && !canPlayVideo(src)) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-black ${iframePlayer ? "aspect-video" : "h-dvh"}`}
    >
      {shouldLoad &&
        (isIframeEmbed ? (
          <iframe
            src={src}
            // Ambient/background embeds get oversized to whichever dimension
            // the viewport demands (16:9 assumed, matching the old site's own
            // background-video embeds) and centered, so the crop always fills
            // edge to edge with no gaps — the classic iframe "cover" trick.
            // A "player" embed just fills its aspect-video container exactly
            // (see iframePlayer above), so it's never cropped or barred.
            className={
              ambient
                ? "absolute left-1/2 top-1/2 h-[56.25vw] min-h-dvh w-screen min-w-[177.78dvh] -translate-x-1/2 -translate-y-1/2"
                : "absolute inset-0 h-full w-full"
            }
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Project video"
          />
        ) : (
          <video
            src={src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay={ambient}
            muted={ambient}
            loop={ambient}
            controls={!ambient}
            playsInline
          />
        ))}
    </div>
  );
}
