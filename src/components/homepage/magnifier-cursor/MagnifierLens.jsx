"use client";

// Renders the glass lens itself. `children` should mirror the section's own
// background <Image>s (same src/props) so the lens shows a true zoomed copy
// of what's beneath the cursor rather than a placeholder crop.
export default function MagnifierLens({ lensRef, panRef, scaleBoxRef, zoom, children }) {
  return (
    <div
      ref={lensRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[clamp(120px,10.4167vw,150px)] w-[clamp(120px,10.4167vw,150px)] overflow-hidden rounded-full border border-white/50 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] md:block"
    >
      <div ref={panRef} className="absolute left-0 top-0">
        <div
          ref={scaleBoxRef}
          className="relative"
          style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}
        >
          {children}
        </div>
      </div>

      {/* Frosted glass sheen sitting on top of the zoomed content, plus a
          faint tint so the lens still reads as glass rather than a raw
          crop of the image. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%), rgba(255,255,255,0.04)",
        }}
      />
    </div>
  );
}
