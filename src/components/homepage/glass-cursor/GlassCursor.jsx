"use client";

// Crystal-clear glass circle that stands in for the cursor: no blur, just a
// faint tint and a crisp rim with inner/outer shadow for depth, so the
// content behind it stays sharp while it still reads as glass.
export default function GlassCursor({ lensRef }) {
  return (
    <div
      ref={lensRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[clamp(120px,10.4167vw,150px)] w-[clamp(120px,10.4167vw,150px)] rounded-full border border-white/60 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(0,0,0,0.15)] md:block"
    />
  );
}
