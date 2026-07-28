"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { BLOCK_COLS, BLOCK_ROWS, COLUMNS, COLUMN_SPEEDS } from "./mosaicPattern";

gsap.registerPlugin(Draggable, InertiaPlugin, Observer);

const GAP = 12;
const MIN_TILE_UNIT = 240;
const MAX_TILE_UNIT = 420;
const LERP = 0.12;

// Mirrors a clamp(240px, 22vw, 420px) — kept as a plain JS function (rather
// than a CSS custom property) because the wrap-around math below needs the
// resolved pixel value synchronously, and unregistered CSS custom properties
// don't resolve clamp() through getComputedStyle().
function getTileUnit(viewportWidth) {
  return Math.min(MAX_TILE_UNIT, Math.max(MIN_TILE_UNIT, viewportWidth * 0.22));
}

function MosaicTile({ tile, col, left, top, width, height }) {
  const { project } = tile;

  return (
    <Link
      href={`/work/${project.slug}`}
      data-col={col}
      draggable={false}
      className="group absolute block select-none overflow-hidden rounded-[20px]"
      style={{ left, top, width, height }}
    >
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        draggable={false}
        sizes="(min-width: 1024px) 30vw, 60vw"
        className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </Link>
  );
}

function CursorLabel({ innerRef }) {
  return (
    <div
      ref={innerRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/90 px-5 py-2.5 font-poppins text-[11px] font-semibold uppercase tracking-widest text-black opacity-0 backdrop-blur-sm"
    >
      Scroll or Click
    </div>
  );
}

export default function WorkGrid() {
  const sectionRef = useRef(null);
  const proxyRef = useRef(null);
  const draggableRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const [tileUnit, setTileUnit] = useState(320);
  const [copies, setCopies] = useState({ x: 3, y: 3 });

  useLayoutEffect(() => {
    function measure() {
      const section = sectionRef.current;
      if (!section) return;

      const unit = getTileUnit(window.innerWidth);
      const blockWidth = unit * BLOCK_COLS;
      const blockHeight = unit * BLOCK_ROWS;
      const rect = section.getBoundingClientRect();

      setTileUnit(unit);
      setCopies({
        x: Math.ceil(rect.width / blockWidth) + 2,
        y: Math.ceil(rect.height / blockHeight) + 2,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Cursor-following "Scroll or Click" pill — a lightly-lagged follow (via
  // quickTo) rather than a 1:1 snap to the pointer, shown only while
  // hovering the canvas.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = cursorLabelRef.current;
    if (!section || !label) return;

    const xTo = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3" });

    function handleMove(e) {
      const rect = section.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    }
    function handleEnter(e) {
      handleMove(e);
      gsap.to(label, { opacity: 1, duration: 0.25, ease: "power2.out" });
    }
    function handleLeave() {
      gsap.to(label, { opacity: 0, duration: 0.2, ease: "power2.out" });
    }

    section.addEventListener("pointermove", handleMove);
    section.addEventListener("pointerenter", handleEnter);
    section.addEventListener("pointerleave", handleLeave);
    return () => {
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerenter", handleEnter);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const proxy = proxyRef.current;
    if (!section || !proxy) return;

    const blockWidth = tileUnit * BLOCK_COLS;
    const blockHeight = tileUnit * BLOCK_ROWS;
    // Ranges are centered on 0 (not [-blockWidth, 0]) because `current`
    // starts at exactly 0: a one-sided range starting at its own edge means
    // the very first bit of positive movement overflows and wraps almost a
    // full block, producing a huge visible jump instead of a smooth pan.
    const wrapX = gsap.utils.wrap(-blockWidth / 2, blockWidth / 2);
    const wrapY = gsap.utils.wrap(-blockHeight / 2, blockHeight / 2);

    const columnEls = COLUMN_SPEEDS.map((_, col) =>
      section.querySelectorAll(`[data-col="${col}"]`),
    );

    // Horizontal drag/wheel input moves every column together (that's what
    // reveals more columns); vertical input is scaled per column by
    // COLUMN_SPEEDS before being applied, so the columns drift past each
    // other instead of moving in lockstep — the nicolaromei-style parallax.
    // `current` is what's actually rendered each frame; `target` is where a
    // wheel gesture wants it to end up. While a real drag/throw is active,
    // Draggable already provides its own (inertia) motion, so we just mirror
    // its tracked x/y 1:1; otherwise `current` eases toward `target`.
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const [draggable] = Draggable.create(proxy, {
      trigger: section,
      type: "x,y",
      inertia: true,
      dragClickables: true,
      allowNativeTouchScrolling: false,
      // The proxy's own x/y only ever move when it's actually dragged, so
      // after a wheel gesture has carried `current` somewhere else, the
      // proxy is left stale. Re-baseline it to `current` on every new press
      // (and resync the Draggable instance via update()) so the drag
      // continues from where the visuals actually are instead of snapping
      // back to wherever the proxy last was.
      onPress() {
        gsap.set(proxy, { x: current.x, y: current.y });
        this.update();
      },
    });
    draggableRef.current = draggable;

    const observer = Observer.create({
      target: section,
      type: "wheel",
      preventDefault: true,
      onChange: (self) => {
        target.x -= self.deltaX;
        target.y -= self.deltaY;
      },
    });

    // Wrapping only happens here, at the final render step — a jump of
    // exactly one block is invisible since every block is pixel-identical,
    // so it reads as an endless smooth pan/parallax instead of a snap.
    function tick() {
      const d = draggableRef.current;
      if (!d) return;

      if (d.isPressed || d.isThrowing) {
        current.x = d.x;
        current.y = d.y;
        target.x = d.x;
        target.y = d.y;
      } else {
        current.x = gsap.utils.interpolate(current.x, target.x, LERP);
        current.y = gsap.utils.interpolate(current.y, target.y, LERP);
      }

      const x = wrapX(current.x);
      columnEls.forEach((els, col) => {
        gsap.set(els, { x, y: wrapY(current.y * COLUMN_SPEEDS[col]) });
      });
    }
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      draggable.kill();
      observer.kill();
    };
  }, [tileUnit, copies]);

  return (
    <section
      ref={sectionRef}
      data-lenis-prevent
      className="relative h-dvh w-full touch-none overflow-hidden bg-black"
    >
      <div ref={proxyRef} className="pointer-events-none absolute h-px w-px opacity-0" />

      {Array.from({ length: copies.x }).map((_, copyX) =>
        COLUMNS.map((tiles, col) =>
          Array.from({ length: copies.y }).map((_, copyY) =>
            tiles.map((tile, i) => (
              <MosaicTile
                key={`${copyX}-${col}-${copyY}-${i}`}
                tile={tile}
                col={col}
                left={(copyX * BLOCK_COLS + col) * tileUnit + GAP / 2}
                top={(copyY * BLOCK_ROWS + tile.row) * tileUnit + GAP / 2}
                width={tileUnit - GAP}
                height={tile.rowSpan * tileUnit - GAP}
              />
            )),
          ),
        ),
      )}

      <CursorLabel innerRef={cursorLabelRef} />
    </section>
  );
}
