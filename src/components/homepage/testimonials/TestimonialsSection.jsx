"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Volume2, VolumeX } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const CARD_BASE =
  "flex flex-col overflow-hidden rounded-[clamp(9px,0.86vw,12px)] p-[clamp(20px,2.3611vw,34px)]";

const QUOTE_CLASS =
  "font-poppins text-[clamp(15px,1.4583vw,21px)] font-semibold leading-[1.1]";
const DESCRIPTION_CLASS =
  "font-poppins text-[clamp(13px,1.25vw,18px)] font-normal leading-[1.35]";
const NAME_CLASS = "font-poppins text-[clamp(12px,0.9722vw,14px)] font-medium leading-[1.1]";
const ROLE_CLASS = "font-poppins text-[clamp(11px,0.9028vw,13px)] leading-[1.1]";

const BULLET_TEXT = "Testimonials";
const DESCRIPTION_TEXT = "Founders, agencies, and enterprise teams who joined the movement.";

function TypewriterChars({ text }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span key={ci} className="typewriter-char inline-block opacity-0">
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 53 53" className={className} aria-hidden="true">
      <path
        d="M23.8145 15.2626C21.1516 13.5681 17.667 15.4809 17.667 18.6373V34.9806C17.667 38.1369 21.1516 40.0498 23.8145 38.3552L36.6556 30.1836C39.1256 28.6118 39.1256 25.0061 36.6556 23.4343L23.8145 15.2626Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StopIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  );
}

function formatTime(sec) {
  if (!isFinite(sec) || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Custom video player that owns all its own pointer events so GSAP
 * Draggable (which listens globally) cannot steal hover / click events
 * away from the controls. Native <video controls> hides automatically
 * and those show/hide events never surface back through GSAP — this
 * component fixes that by managing the control bar entirely itself.
 */
function VideoPlayer({ src, onClose }) {
  const videoRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Auto-hide controls after 3 s of no interaction
  const bringUpControls = () => {
    setControlsVisible(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
  };

  useEffect(() => {
    bringUpControls();
    return () => clearTimeout(hideTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
    bringUpControls();
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    bringUpControls();
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative h-full w-full"
      // Stop all pointer events from reaching GSAP Draggable
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => { e.stopPropagation(); bringUpControls(); }}
      onMouseEnter={(e) => { e.stopPropagation(); bringUpControls(); }}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        muted={muted}
        className="h-full w-full cursor-default object-cover"
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onClose}
        onClick={togglePlay}
      />

      {/* Control bar overlay */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Gradient scrim so controls are readable over any video frame */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />

        {/* The control elements themselves re-enable pointer-events */}
        <div className="pointer-events-auto relative z-10 flex flex-col gap-1.5 px-3 pb-2.5">
          {/* Scrubber / progress bar */}
          <div
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(currentTime)}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            className="group/bar flex h-4 cursor-pointer items-center"
            onClick={handleSeek}
          >
            <div className="relative h-1 w-full rounded-full bg-white/30 transition-all duration-150 group-hover/bar:h-1.5">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              >
                {/* Scrubber thumb */}
                <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 scale-0 rounded-full bg-white shadow transition-transform group-hover/bar:scale-100" />
              </div>
            </div>
          </div>

          {/* Icon row */}
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="cursor-pointer text-white transition-opacity hover:opacity-70"
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5" fill="currentColor" />
              ) : (
                <PlayIcon className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Time display */}
            <span className="font-poppins text-[10px] tabular-nums text-white/80">
              {formatTime(currentTime)}
              <span className="text-white/40"> / {formatTime(duration)}</span>
            </span>

            {/* Mute / Unmute */}
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="ml-auto cursor-pointer text-white transition-opacity hover:opacity-70"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Close / back-to-thumbnail button (always visible) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Stop video"
        className="absolute right-2 top-2 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/80"
      >
        <StopIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

const TESTIMONIALS = [
  {
    id: "aferdita",
    variant: "video",
    quote: "“Went from $50K to $2M ARR in less than 18 months.”",
    name: "Aferdita Gutierrez",
    role: "Chief Operating Officer · BQS Advisory",
    thumbnail:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785571254/Review_1_wewskm.jpg",
    video:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785571254/Review_1_wewskm.mp4",
  },
  {
    id: "sam",
    variant: "light",
    quote: "“SPKRHED don't just play the game… they make sure the ball finds the net.”",
    name: "Sam Sohaili",
    role: "Executive Creative Director and Founder, DMA United",
    tagline: "Award-winning agency. Fortune 500 clients.",
    photo: "/images/Home/clients-reviews/Review%202.jpeg",
  },
  {
    id: "chris",
    variant: "dark",
    quote:
      "“Karriem and the SPKRHED team are forward thinking and highly skilled. They break down complex problems and turn them into real solutions. I've used them across multiple businesses, and the results have been successful every time.”",
    name: "Chris Milano",
    role: "Enigma ENT",
    tagline: "Has worked with Drake, Kanye West, Akon, 50 Cent, Chris Brown",
    photo: "/images/Home/clients-reviews/Review%203.jpeg",
  },
  {
    id: "delta-sigma-theta",
    variant: "video",
    name: "Erica Ankram",
    role: "Owner and Creative Director · Eyes for Wings Photography and Design",
    description:
      "Brand Director for Delta Sigma Theta Sorority, an international organization founded in 1913 with more than 350,000 initiated members and over 1,000 chapters worldwide.",
    thumbnail:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785572963/Review_4_qvb4jb.jpg",
    video:
      "https://res.cloudinary.com/dqxfobzlw/video/upload/v1785572963/Review_4_qvb4jb.mp4",
  },
];

const VARIANT_CLASSES = {
  light: "bg-[#D9D9D9]/81 text-black",
  video: "bg-[#AC40FF] text-black",
  dark: "border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl backdrop-saturate-150",
};

const ROLE_OPACITY = {
  light: "text-black/70",
  video: "text-black/70",
  dark: "text-white/70",
};

function TestimonialCard({ testimonial, className = "", ariaHidden = false }) {
  const { variant, quote, description, name, role, tagline, thumbnail, video, photo } =
    testimonial;
  const [isPlaying, setIsPlaying] = useState(false);
  const hasMedia = Boolean(video || photo);
  const aspectClass = hasMedia ? "lg:aspect-440/521" : "lg:aspect-440/324";

  return (
    <div
      className={`${CARD_BASE} ${aspectClass} ${VARIANT_CLASSES[variant]} ${className}`}
      data-testimonial={testimonial.id}
      aria-hidden={ariaHidden || undefined}
    >
      {variant === "video" && (
        <div
          className="group relative mb-[clamp(8px,0.9028vw,13px)] aspect-402/287 w-full cursor-default overflow-hidden rounded-[clamp(7px,0.6597vw,9.5px)]"
        >
          {isPlaying ? (
            <VideoPlayer
              src={video}
              onClose={() => setIsPlaying(false)}
            />
          ) : (
            <>
              {/* Thumbnail image — zooms subtly on group hover */}
              <Image
                src={thumbnail}
                alt={name || "SPKRHED client testimonial"}
                fill
                sizes="(min-width: 1024px) 402px, 90vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Dark overlay that fades in on hover to signal clickability */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30"
              />
              {/* Play button anchored bottom-left — pops on group hover */}
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={name ? `Play ${name}'s testimonial video` : "Play testimonial video"}
                className="absolute bottom-3 left-3 flex h-[clamp(36px,4vw,58px)] w-[clamp(36px,4vw,58px)] cursor-pointer items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                <PlayIcon className="h-[clamp(24px,2.8vw,40px)] w-[clamp(24px,2.8vw,40px)] translate-x-[8%] text-white" />
              </button>
              {/* "Tap to play" hint label that slides up on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-[calc(clamp(36px,4vw,58px)+clamp(36px,4vw,58px)*0.25+8px)] translate-y-2 font-poppins text-[clamp(10px,0.8vw,12px)] font-medium text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/80"
              >
                Tap to play
              </span>
            </>
          )}
        </div>
      )}

      {!video && photo && (
        <div className="relative mb-[clamp(8px,0.9028vw,13px)] aspect-402/287 w-full overflow-hidden rounded-[clamp(7px,0.6597vw,9.5px)]">
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(min-width: 1024px) 402px, 90vw"
            className="object-cover object-top"
          />
        </div>
      )}

      {quote && <p className={QUOTE_CLASS}>{quote}</p>}
      {description && <p className={DESCRIPTION_CLASS}>{description}</p>}

      {name && (
        <div className="mt-auto pt-[clamp(16px,1.9444vw,28px)]">
          <p className={NAME_CLASS}>{name}</p>
          {role && <p className={`${ROLE_CLASS} ${ROLE_OPACITY[variant]}`}>{role}</p>}
          {tagline && <p className={`${ROLE_CLASS} ${ROLE_OPACITY[variant]}`}>{tagline}</p>}
        </div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const bulletCharRefs = useRef([]);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const treeBranchRef = useRef(null);
  const leafRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Exposed to the JSX buttons below, filled in once the drag setup inside
  // the effect knows the track's real bounds. Kept as a ref (not state)
  // since these are imperative actions, not render data.
  const trackControlsRef = useRef({ next: () => {}, prev: () => {} });

  // Drives the fade-out on the hint copy and the disabled state on the
  // chevrons. Starts "false"/"false" (not at either end, nothing dismissed
  // yet) so the hint and both buttons are visible on first paint.
  const [hasInteracted, setHasInteracted] = useState(false);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false });

  useLayoutEffect(() => {
    const headingChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];
    const descriptionChars = [
      ...descriptionRef.current.querySelectorAll(".typewriter-char"),
    ];
    const bulletChars = bulletCharRefs.current.filter(Boolean);

    let removeResizeListener = () => {};

    const ctx = gsap.context(() => {
      gsap.set(headingChars, { opacity: 0 });
      gsap.set(descriptionChars, { opacity: 0 });
      gsap.set(treeBranchRef.current, { opacity: 0, x: -180 });
      gsap.set(leafRef.current, {
        opacity: 0,
        scale: 0.4,
        x: -170,
        y: -160,
        rotate: 250,
      });

      if (viewportRef.current) gsap.set(viewportRef.current, { opacity: 0, y: 60 });

      let updateScrollState = () => {};

      if (trackRef.current && viewportRef.current) {
        const track = trackRef.current;
        const viewport = viewportRef.current;

        const getBounds = () => {
          const viewportWidth = viewport.getBoundingClientRect().width;
          const trackWidth = track.scrollWidth;
          const restGap = parseFloat(getComputedStyle(track).marginLeft) || 0;
          return { minX: Math.min(0, viewportWidth - trackWidth - restGap), maxX: 0 };
        };

        // Keeps the chevron disabled states and hint visibility in sync
        // with wherever the strip actually is, whether it got there via
        // drag, throw, snap-back, or a button click.
        updateScrollState = () => {
          const bounds = getBounds();
          const x = gsap.getProperty(track, "x");
          setScrollState({
            atStart: x >= bounds.maxX - 1,
            atEnd: x <= bounds.minX + 1,
          });
        };

        gsap.set(track, { x: 0 });

        const [draggable] = Draggable.create(track, {
          type: "x",
          bounds: getBounds(),
          edgeResistance: 0.65,
          inertia: true,
          onDragStart: () => setHasInteracted(true),
          onDrag: updateScrollState,
          onThrowUpdate: updateScrollState,
          onDragEnd: () => {
            const bounds = getBounds();
            const x = gsap.getProperty(track, "x");
            if (x > bounds.maxX || x < bounds.minX) {
              gsap.killTweensOf(track);
              gsap.to(track, {
                x: gsap.utils.clamp(bounds.minX, bounds.maxX, x),
                duration: 0.6,
                ease: "elastic.out(1, 0.75)",
                onUpdate: updateScrollState,
              });
            } else {
              updateScrollState();
            }
          },
        });

        const onResize = () => {
          const bounds = getBounds();
          draggable.applyBounds(bounds);
          gsap.set(track, {
            x: gsap.utils.clamp(bounds.minX, bounds.maxX, gsap.getProperty(track, "x")),
          });
          updateScrollState();
        };
        window.addEventListener("resize", onResize);
        removeResizeListener = () => window.removeEventListener("resize", onResize);

        // Chevron click handler: steps by roughly one card width (card +
        // gap), clamped to the same bounds the drag respects, so buttons
        // and drag never disagree about where the ends are.
        const nudgeTrack = (dir) => {
          const bounds = getBounds();
          const firstCard = track.firstElementChild;
          const gap = parseFloat(getComputedStyle(track).columnGap) || 18;
          const step = (firstCard ? firstCard.getBoundingClientRect().width : 300) + gap;
          const currentX = gsap.getProperty(track, "x");
          const nextX = gsap.utils.clamp(
            bounds.minX,
            bounds.maxX,
            currentX + (dir === "prev" ? step : -step),
          );
          gsap.killTweensOf(track);
          gsap.to(track, {
            x: nextX,
            duration: 0.6,
            ease: "power3.out",
            onUpdate: updateScrollState,
          });
          setHasInteracted(true);
        };

        trackControlsRef.current = {
          next: () => nudgeTrack("next"),
          prev: () => nudgeTrack("prev"),
        };
      }

      const anchorEl = bulletChars[0];
      const anchorLeft = anchorEl.getBoundingClientRect().left;

      gsap.set(bulletChars, {
        opacity: 0,
        x: (_, target) => anchorLeft - target.getBoundingClientRect().left,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(bulletChars, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.032, from: 0 },
      })
        .to(
          headingChars,
          { opacity: 1, duration: 0.01, stagger: 0.02, ease: "none" },
          "-=0.15",
        )
        .to(
          descriptionChars,
          { opacity: 1, duration: 0.01, stagger: 0.012, ease: "none" },
          "-=0.25",
        )
        .to(
          treeBranchRef.current,
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.3",
        );

      if (viewportRef.current) {
        tl.to(
          viewportRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6",
        );
      }

      tl.to(
        leafRef.current,
        {
          opacity: 0.9,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 340,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Discoverability nudge: once everything's settled, tug the strip
      // left and let it spring back. Purely a visual hint that the cards
      // move, doesn't touch scrollState since it always ends back at x: 0.
      if (trackRef.current) {
        tl.to(
          trackRef.current,
          { x: "-=70", duration: 0.5, ease: "power2.out" },
          "+=0.3",
        ).to(trackRef.current, {
          x: "+=70",
          duration: 0.7,
          ease: "elastic.out(1, 0.55)",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      removeResizeListener();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]"
    >
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-90"
      />

      <Image
        ref={treeBranchRef}
        src="/images/Home/tree-branch-small.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute left-[-9%] top-[25%] z-0 w-[20%] max-w-none select-none"
      />

      <Image
        ref={leafRef}
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute bottom-[6%] right-[20%] z-20 w-[7%] select-none"
      />

      <div className="relative z-10 mx-auto max-w-360 px-[clamp(20px,3.1944vw,46px)] text-center">
        <div className="mx-[calc(50%-50vw)] flex w-screen items-center justify-center gap-3 px-2 sm:gap-6">
          <span className="font-anton-sc whitespace-nowrap text-[clamp(60px,14.5833vw,210px)] uppercase leading-none tracking-tight text-white">
            {BULLET_TEXT.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  bulletCharRefs.current[i] = el;
                }}
                className="inline-block opacity-0"
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </div>

        <h2
          ref={headingRef}
          className="mx-auto mt-[clamp(40px,5.5556vw,80px)] max-w-217 font-anton-sc text-[clamp(32px,6.8056vw,98px)] uppercase leading-[1.02] text-white"
        >
          <TypewriterChars text="In Their" />{" "}
          <span className="text-[#ac40ff]">
            <TypewriterChars text="Own Voice." />
          </span>
        </h2>

        <p
          ref={descriptionRef}
          className="mx-auto mt-[clamp(8px,1.1806vw,17px)] font-poppins text-[clamp(15px,1.5278vw,22px)] text-white/60"
        >
          <TypewriterChars text={DESCRIPTION_TEXT} />
        </p>
      </div>

      <div
        ref={viewportRef}
        className="relative z-10 mt-[clamp(40px,4.9306vw,71px)] w-full select-none overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab items-start gap-[clamp(13px,1.2919vw,18.603px)] ml-[clamp(140px,16.5972vw,239px)] active:cursor-grabbing"
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              className="testimonial-marquee-card w-[clamp(230px,30.5736vw,440px)] shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Discoverability row: hint copy + chevron controls. Copy swaps
          between mouse and touch phrasing per breakpoint; buttons stay
          visible everywhere since they're also the accessible fallback
          for anyone who can't or won't drag. */}
      <div className="relative z-10 mx-auto mt-[clamp(20px,2.7778vw,40px)] flex max-w-360 items-center justify-center gap-[clamp(12px,1.6667vw,24px)] px-[clamp(20px,3.1944vw,46px)]">
        <button
  type="button"
  onClick={() => trackControlsRef.current.prev()}
  disabled={scrollState.atStart}
  aria-label="Show previous testimonial"
  className="flex h-[clamp(44px,4.4444vw,64px)] w-[clamp(44px,4.4444vw,64px)] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-[#ac40ff] enabled:hover:text-[#ac40ff]"
>
  <ChevronLeft className="h-[clamp(18px,1.6667vw,24px)] w-[clamp(18px,1.6667vw,24px)]" />
</button>

        <p
          aria-hidden="true"
          className={`font-poppins text-[clamp(11px,0.9722vw,14px)] text-white/50 transition-opacity duration-500 ${
            hasInteracted ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="hidden sm:inline">Drag to explore more stories</span>
          <span className="sm:hidden">Swipe to see more stories</span>
        </p>

        <button
  type="button"
  onClick={() => trackControlsRef.current.next()}
  disabled={scrollState.atEnd}
  aria-label="Show next testimonial"
  className="flex h-[clamp(44px,4.4444vw,64px)] w-[clamp(44px,4.4444vw,64px)] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:border-[#ac40ff] enabled:hover:text-[#ac40ff]"
>
  <ChevronRight className="h-[clamp(18px,1.6667vw,24px)] w-[clamp(18px,1.6667vw,24px)]" />
</button>
      </div>
    </section>
  );
}