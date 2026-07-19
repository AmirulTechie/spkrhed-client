"use client";

import Image from "next/image";
import useGlassCursor from "@/components/homepage/glass-cursor/useGlassCursor";
import GlassCursor from "@/components/homepage/glass-cursor/GlassCursor";

const preventDrag = (e) => e.preventDefault();

export default function CastleSection() {
  const { sectionRef, lensRef, handlers } = useGlassCursor();

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

      <GlassCursor lensRef={lensRef} />
    </section>
  );
}
