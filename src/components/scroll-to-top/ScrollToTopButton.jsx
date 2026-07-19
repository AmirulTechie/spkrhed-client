"use client";

import { useCallback, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

const SIZE = 56;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const VISIBILITY_THRESHOLD = 400;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);
  const cometRef = useRef(null);

  // Imperative DOM updates on every scroll frame avoid a React re-render per tick.
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
      setVisible(lenis.scroll > VISIBILITY_THRESHOLD);
    },
    [applyProgress]
  );

  const lenis = useLenis();

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

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
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-white/35 hover:bg-black/55 sm:right-8 sm:bottom-8"
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
                filter: "drop-shadow(0 0 6px #AC40FF) drop-shadow(0 0 3px #ffffff)",
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
