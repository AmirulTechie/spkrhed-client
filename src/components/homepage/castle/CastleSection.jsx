"use client";

import Image from "next/image";
import useMagnifierCursor from "@/components/homepage/magnifier-cursor/useMagnifierCursor";
import MagnifierLens from "@/components/homepage/magnifier-cursor/MagnifierLens";

const preventDrag = (e) => e.preventDefault();

export default function CastleSection() {
  const { sectionRef, lensRef, panRef, scaleBoxRef, zoom, handlers } =
    useMagnifierCursor();

  return (
    <section
      id="castle"
      ref={sectionRef}
      {...handlers}
      className="relative mt-[clamp(16px,2.5694vw,37px)] aspect-1440/824 w-full select-none overflow-hidden rounded-[clamp(24px,3.4722vw,50px)] md:cursor-none"
    >
      <Image
        src="/images/Home/castle-in-clouds.png"
        alt=""
        fill
        sizes="100vw"
        draggable={false}
        onDragStart={preventDrag}
        className="pointer-events-none object-cover"
      />

      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="100vw"
        draggable={false}
        onDragStart={preventDrag}
        className="pointer-events-none object-cover opacity-20"
      />

      <MagnifierLens
        lensRef={lensRef}
        panRef={panRef}
        scaleBoxRef={scaleBoxRef}
        zoom={zoom}
      >
        <Image
          src="/images/Home/castle-in-clouds.png"
          alt=""
          fill
          sizes="100vw"
          draggable={false}
          className="object-cover"
        />
        <Image
          src="/images/Home/Hero-banner-grids.png"
          alt=""
          fill
          sizes="100vw"
          draggable={false}
          className="object-cover opacity-20"
        />
      </MagnifierLens>
    </section>
  );
}
