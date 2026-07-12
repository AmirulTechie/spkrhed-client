# Why LinkedIn Section — Design

## Context

Homepage currently renders: `Hero` → `MarqueeSection` → `StatsClientsSection` → `VideoSection` → `ProblemSection`. This spec adds a new section, `WhyLinkedInSection`, directly after `ProblemSection`. It is a full-black statement section built from two visual beats seen in the Figma mock:

1. A "WHY LINKEDIN?" hero statement with a 3-column feature row (bullet label, big heading, "no promotions folder" stat, a numbered circle badge, and a supporting paragraph).
2. A closing punch line: "THE PROBLEM IS { SCALE ↗ }, NOT STRATEGY."

Both share one dark background and one pair of masked tree-branch images (from `public/images/Home/tree-branch-1.png`), so they are built as a single component rather than two.

## Component

`src/components/homepage/why-linkedin/WhyLinkedInSection.jsx`

```
<section bg-black, relative, overflow-hidden>
  <div padded container (clamp-based, matching existing sections)>
    tree-branch-1.png  — absolute, top-left, masked (fades toward bottom)
    tree-branch-1.png mirrored (-scale-x-100) — absolute, top-right, masked
    vignette overlay div — absolute, gradient black→transparent (top to ~60% down),
      z-index above the branches, below the text
    leaf.png × 1–2 — small decorative accents lower in the section (matches
      ProblemSection's leaf treatment), absolute positioned, low opacity

    <div center-aligned text block, z-10>
      bullet (banner-bullet.png) + "WHY LINKEDIN?" label — font-poppins,
        uppercase, small, muted white (text-white/50), tracking-wide
      <h2> — font-anton-sc, uppercase, white, large clamp() size:
        "The only platform where your
         <span className="text-[#AC40FF]">exact buyer</span>
         is already waiting."
    </div>

    <div feature row, 3-col grid on lg (1-col stacked on mobile), z-10>
      left col   — font-poppins, font-bold, uppercase, white:
                   "No promotions folder, no buried requests tab."
      center col — <NumberBadge number="01" />
      right col  — font-poppins, text-white/60:
                   "LinkedIn messages land in your prospect's primary inbox.
                    They see your name, your message, and decide on the spot."
    </div>

    <div closing statement, centered, z-10>
      <h3> — font-anton-sc, uppercase, white:
        "The problem is
         <span className="text-[#AC40FF] inline-flex items-center gap-2">
           {"{"} Scale <ArrowIcon /> {"}"}
         </span>
         , not strategy."
    </div>
  </div>
</section>
```

`src/components/homepage/why-linkedin/NumberBadge.jsx`

- Props: `{ number }` (string/number, e.g. `"01"`)
- Renders a blurred purple glow (`blur-2xl bg-[#AC40FF]/30`, absolutely positioned behind, rounded-full) behind a bordered circle (`border-2 border-[#AC40FF] rounded-full`, black fill) containing the number in `font-anton-sc text-[#AC40FF]`.
- Kept generic/reusable (no hardcoded "01") so a future "02"/"03" numbered block elsewhere on the site can reuse it without rework.

Arrow icon: inline SVG (no new image asset — none exists in `public/images/Home/`), `stroke="currentColor"`, sized via `em`/text-relative units, colored by inheriting the parent's `text-[#AC40FF]`.

## Visual treatment details

- **Per-image mask**: each tree-branch `<Image>` gets `className="... [mask-image:linear-gradient(to_bottom,black_0%,transparent_75%)]"` (Tailwind v4 arbitrary property syntax) so the image's own bottom edge dissolves instead of cutting off hard.
- **Overlay vignette**: a separate `div` (not tied to the images), `bg-gradient-to-b from-black via-black/70 to-transparent`, positioned above the branches in stacking order and below the text — this is the "second screenshot" gradient-rectangle overlay, further blending both branch images into the black section background and preserving heading legibility.
- Both branch images are placed only within the top hero-heading area (matching the mock), not spanning the whole section height.
- Follows existing conventions: `clamp()` for all responsive sizing, `font-anton-sc` for bold display headings, `font-poppins` for body/labels, `#AC40FF` for the purple accent, `next/image` for every image, absolute-positioned decorative images marked `pointer-events-none select-none` and empty `alt=""`.

## Data / copy

Static content, no fetching, no client state. Exact copy (from the mock):

- Eyebrow: "WHY LINKEDIN?"
- Heading: "The only platform where your **exact buyer** is already waiting."
- Left stat: "No promotions folder, no buried requests tab."
- Right paragraph: "LinkedIn messages land in your prospect's primary inbox. They see your name, your message, and decide on the spot."
- Closing: "The problem is **{ Scale ↗ }**, not strategy."

## Integration

Add `import WhyLinkedInSection from "@/components/homepage/why-linkedin/WhyLinkedInSection";` to `src/app/page.js` and render it immediately after `<ProblemSection />`.

## Out of scope

- No animation/GSAP scroll-trigger behavior (mock shows a static composition; can be added later if requested, following the `StatsClientsSection` GSAP pattern).
- No new image assets needed — reuses `tree-branch-1.png`, `banner-bullet.png`, `leaf.png` already in `public/images/Home/`.
- The numbered badge is built generically but no other numbered section is being built in this pass.
