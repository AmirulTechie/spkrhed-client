"use client";

import { useCallback, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const SIZE = 56;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const VISIBILITY_THRESHOLD = 400;

// ─── Back-to-Work button (work detail pages) ────────────────────────────────

function BackToWorkButton() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  // Mirror the scroll-to-top threshold so both buttons behave identically
  useLenis((lenis) => {
    setVisible(lenis.scroll > VISIBILITY_THRESHOLD);
  }, []);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/work");
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleBack}
          aria-label="Back to Work"
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.96 }}
          className="group fixed right-6 bottom-6 z-50 sm:right-8 sm:bottom-8 cursor-pointer"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Outer glow ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-[3px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle, rgba(172,64,255,0.35) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* Main pill */}
          <span
            className="relative flex items-center gap-3 overflow-hidden rounded-full px-6 py-4 text-white"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(172,64,255,0.12)",
            }}
          >
            {/* Subtle inner shine */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
            />

            {/* Arrow — slides left on hover */}
            <span className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  d="M12.5 4L7 10l5.5 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* Label */}
            <span
              className="relative font-poppins text-[15px] font-semibold uppercase tracking-[0.18em] leading-none"
              style={{ letterSpacing: "0.18em" }}
            >
              Work
            </span>

            {/* Purple accent dot */}
            <span
              aria-hidden
              className="relative h-1.5 w-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
              style={{
                background: "#AC40FF",
                boxShadow: "0 0 8px 2px rgba(172,64,255,0.7)",
              }}
            />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Scroll-to-top button (all other pages) ──────────────────────────────────

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const isWorkDetail = /^\/work\/.+/.test(pathname);

  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);
  const cometRef = useRef(null);

  const applyProgress = useCallback((progress) => {
    if (progressRef.current) {
      progressRef.current.style.strokeDashoffset = String(
        CIRCUMFERENCE * (1 - progress)
      );
    }
    if (cometRef.current) {
      const angle = (progress * 360 - 90) * (Math.PI / 180);
      cometRef.current.setAttribute(
        "cx",
        String(SIZE / 2 + RADIUS * Math.cos(angle))
      );
      cometRef.current.setAttribute(
        "cy",
        String(SIZE / 2 + RADIUS * Math.sin(angle))
      );
      cometRef.current.style.opacity = progress > 0.01 ? "1" : "0";
    }
  }, []);

  useLenis(
    (lenis) => {
      applyProgress(lenis.progress);
      if (!isWorkDetail) {
        setVisible(lenis.scroll > VISIBILITY_THRESHOLD);
      }
    },
    [applyProgress, isWorkDetail]
  );

  const lenis = useLenis();

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  if (isWorkDetail) {
    return <BackToWorkButton />;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-white/35 hover:bg-black/55 sm:right-8 sm:bottom-8 cursor-pointer"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-white/5 to-transparent"
          />

          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="pointer-events-none absolute inset-0"
            style={{ filter: "drop-shadow(0 0 4px rgba(172,64,255,0.55))" }}
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={STROKE}
            />
            <circle
              ref={progressRef}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#AC40FF"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
            <circle
              ref={cometRef}
              r={3}
              fill="#F3E8FF"
              style={{
                opacity: 0,
                filter:
                  "drop-shadow(0 0 6px #AC40FF) drop-shadow(0 0 3px #ffffff)",
                transition: "opacity 0.3s ease",
              }}
            />
          </svg>

          <ArrowUp className="relative h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
