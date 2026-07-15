# Foundation/Amplify Section — Design

## Context

Services page currently renders: `ServicesHero` → `GrowthEngineSection`. This spec adds a new
section, `FoundationAmplifySection`, directly after `GrowthEngineSection`. It is the "Build what
the engine runs on." / "Pour fuel on what already works." card-swap section shown in Figma
(node-ids `2106:250`, `2106:251`, `2106:276`, `2106:285`, `2106:92`, `2106:95`) and the reference
screenshot.

Source of truth pulled from Figma:
- Figma frame is designed at 1440px width. All px-based math below is at that scale; the build
  converts to `clamp(minPx, Xvw, maxPx)` with `Xvw = designPx / 1440 * 100`, following the exact
  convention already used in `GrowthEngineSection.jsx` and `ServicesHero.jsx`.
- Only two unique cards exist in the design: **Foundation** and **Amplify**. The apparent "third"
  card peeking on the left edge is the same Amplify content duplicated at a second position in
  Figma (confirmed via metadata — identical copy, identical vector shape, just repositioned). Per
  user decision, this is built as a genuine 2-card deck; the peek-left sliver always mirrors
  whichever card is currently in the "back" role.

## Component structure

```
src/components/services/FoundationAmplifySection.jsx   — new
src/components/services/EngineCard.jsx                 — new (shared card renderer)
public/images/services/foundation-card-shape.svg       — new (downloaded Figma asset)
public/images/services/amplify-card-shape.svg          — new (downloaded Figma asset)
public/images/services/engine-arrow-icon.svg           — new (downloaded Figma asset)
```

`src/app/services/page.jsx` gets one new import + render line, after `<GrowthEngineSection />`.

## Section shell

```jsx
<section className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
  <Image big-branch.png — absolute, decorative, per screenshot framing (large vine/branch
    art dominating the lower-left of the section, similar scale/placement to how
    tree-branch-1.png is used in GrowthEngineSection) />

  {/* top fade */}
  <div aria-hidden className="absolute inset-x-0 top-0 h-[30%] bg-linear-to-b from-black to-transparent" />
  {/* bottom fade */}
  <div aria-hidden className="absolute inset-x-0 bottom-0 h-[30%] bg-linear-to-b from-transparent to-black" />

  <div className="relative mx-auto max-w-300 px-8 sm:px-12 lg:px-16">
    {/* card stack lives here, see below — it intentionally bleeds past this
        container's edges up to the section's own overflow-hidden boundary */}
  </div>
</section>
```

Uses `/images/big-branch.png` (already in `public/images/`, no new copy needed) per the user's
instruction that this asset is already provided.

## The card shape (glassmorphism + notch)

Both cards share the same silhouette: a rounded rectangle with a diagonal notch cut out of the
top-right corner (the "flag" shape visible in the screenshot). Figma exports this as a flat SVG
path (`fill:#101010` at 50% opacity for the front role / 20% opacity for the back role, plus a
diagonal linear-gradient stroke from `white/32%` to `white/9%`). A flat image alone can't give
real backdrop-blur of the branch photo behind it, so each card is built as layered elements sized
to `absolute inset-0 h-full w-full`, in this stacking order:

1. **Blur layer** — plain div, `backdrop-blur-[5.5px]`, masked to the card's SVG silhouette via
   `mask-image` / `-webkit-mask-image` (`mask-size: 100% 100%`, `mask-repeat: no-repeat`), no
   visible fill of its own (the blur is the only effect it contributes).
2. **Shape layer** — the downloaded SVG rendered as an `<img>` (`preserveAspectRatio="none"`, so
   it stretches non-uniformly to fill the card box exactly as Figma authored it), providing the
   `#101010` tint and the gradient border stroke.
3. **Content layer** — the text, z-index above both.

Two shape SVGs are needed (downloaded once, committed to `public/images/services/`, never
referenced by their expiring `figma.com` asset URL):
- `foundation-card-shape.svg` — viewBox `0 0 1197 513`, fill-opacity `0.5`
- `amplify-card-shape.svg` — viewBox `0 0 1197 441`, fill-opacity `0.2`

Both share the identical top-notch path geometry (corner radius ≈ 31.5px at design scale); only
the overall height and fill-opacity differ. When a card is in the "front" role its fill-opacity
is 0.5 (matches Foundation's current design); in the "back" role (peek-right or peek-left) it's
0.2 (matches Amplify's current design in both duplicate spots). This opacity is driven by role,
not by which card it is — so when Amplify becomes front, it uses opacity 0.5, and Foundation as
back uses 0.2.

## Card content model

Each card keeps its own natural height (Foundation is taller — it has two feature blocks — Amplify
is shorter — one feature block + an aside). Content is data-driven so `EngineCard` can render both
shapes without a rigid identical template:

```js
{
  id: "foundation",
  eyebrow: "FOUNDATION",
  headingLines: [
    { text: "Build what the engine", color: "purple" },
    { text: "runs on.", color: "white" },
  ],
  body: "The engine needs somewhere to send people and something to run on behind the scenes. We build both, so nothing your LinkedIn outreach creates ever gets wasted.",
  columns: [
    [ // left column — two stacked blocks
      { label: "Website Development", detail: "A site built to close, not just sit there. We turn the traffic your LinkedIn presence drives into booked calls, with the funnel wired in from the start." },
      { label: "GHL Handling", detail: "We set up and run your GoHighLevel backend. CRM, pipelines, automations and follow-up, all wired so no lead falls through the cracks." },
    ],
    [ // right column — one block, aligned with the left column's 2nd block
      { label: "Recruitment Landing Pages", detail: "Purpose-built pages for staffing and recruitment firms. Made to convert applicants and client leads on their own, not just look the part." },
    ],
  ],
  heightPx: 513, // design-scale height, drives the clamp()
}
```

```js
{
  id: "amplify",
  eyebrow: "AMPLIFY",
  headingLines: [
    { text: "Pour fuel on what", color: "purple" },
    { text: "already works.", color: "white" },
  ],
  body: "Once the engine proves a message converts organically, paid takes that exact message and puts it in front of more of the right people.",
  columns: [
    [
      { label: "Meta & Cross-Channel Ads", detail: "Facebook and Instagram ads for retargeting and social proof, built to feed the same funnel. Catch the buyers who saw you on LinkedIn everywhere else they scroll." },
    ],
    [
      { aside: "So far the engine fills the top and the foundation holds it. Next we stop the leaks, then layer on the premium plays that pull buyers toward you." },
    ],
  ],
  heightPx: 441,
}
```

`columns` is `[leftColumnBlocks[], rightColumnBlocks[]]`. A block is either a `{label, detail}`
feature pair (`Poppins Bold 15px white uppercase` label / `Poppins Regular 13px white/70%
uppercase` detail) or an `{aside}` italic note (`Poppins Italic 12px white/70% uppercase`) —
`EngineCard` renders whichever shape is present. The right column in the Foundation card is
empty for its first row and only populated at the second row (matches the screenshot's uneven
column start).

Typography tokens (all confirmed from Figma):
- Eyebrow: `font-poppins font-semibold text-[16px] text-white`
- Heading: `font-anton-sc uppercase text-[50px] leading-[51px]`, purple line = `text-[#ac40ff]`,
  white line = `text-white`
- Body: `font-poppins text-[15px] text-white uppercase`
- Feature label: `font-poppins font-bold text-[15px] text-white uppercase`
- Feature detail / aside: `font-poppins text-[13px] text-white/70 uppercase` (aside is `italic
  text-[12px]`)

All px sizes convert to the project's `clamp(minPx, Xvw, maxPx)` pattern at implementation time.

## Layout — the 3-slot fan

The card stack sits inside the section's padded container but is allowed to bleed past it (up to
the section's own `overflow-hidden` edge) — it is **not** clipped by the `max-w-300` container,
only by the outer `<section>`. Slot geometry (percentages relative to full section width, derived
from Figma's absolute coordinates at 1440px design width):

| Slot | left | width | top offset | height |
|---|---|---|---|---|
| Front | 8.19% | 83.13% | 0 | own card height (513 or 441) |
| Peek-right | 72.78% | 83.13% | 0 (top-aligned with front) | own card height |
| Peek-left (back echo) | −32.22% | 83.13% | +72px @1440 scale (bottom-aligns with front's bottom) | own card height |

Front and peek-right share the same top edge; peek-left's bottom edge aligns with front's bottom
edge — this asymmetry is intentional (matches Figma exactly) and is what produces the "unevenly
aligned" premium look the user pointed out.

Because peek-right and peek-left always show the *same* back-card content in this 2-card model,
they render as two positioned copies of one "back" card (mirroring Figma's own `Group 102` /
`Group 103` duplication), while the front card is the other, distinct card.

## Interaction

State: `frontId` (`"foundation" | "amplify"`), starts at `"foundation"`.

Arrow button click toggles `frontId`. Animated with GSAP (matching the existing
`GrowthEngineSection` card-swap technique):
- The current front card animates from the front slot to the peek-right slot position (opacity
  0.5 → 0.2, fill-opacity crossfade included).
- The current back card (already rendered at peek-right) animates from peek-right into the front
  slot (opacity 0.2 → 0.5).
- The peek-left echo cross-fades its content from the old back card to the new back card in
  place (it's a static position swap, not a sliding motion, since only a sliver of it is ever
  visible).

Arrow button: 86px circle (`clamp`-scaled), `bg-[#0F0F0F]/50`, `backdrop-blur-[5.5px]`, containing
the downloaded arrow icon (`engine-arrow-icon.svg`, white fill). Positioned absolute, anchored near
the seam between the front and peek-right cards (left ≈ 92.08% of section width, vertically ≈
52% down the front card's height), `aria-label` describing the swap action, disabled/no-op while
mid-animation (same `animatingRef` guard pattern as `GrowthEngineSection`).

## Out of scope

- No third card content — explicitly a 2-card deck per user decision; if a third pillar is
  designed later, it slots into the same data array and the peek-left echo logic is revisited.
- No scroll-triggered entrance animation — only the arrow-driven swap, matching what's in Figma.
- Reuses the existing `/images/big-branch.png` asset already in the repo; no new background image
  work needed.
