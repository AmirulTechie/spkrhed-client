import Image from "next/image";

export default function CastleSection() {
  return (
    <section
      id="castle"
      className="relative mt-[clamp(16px,2.5694vw,37px)] aspect-1440/824 w-full overflow-hidden rounded-[clamp(24px,3.4722vw,50px)]"
    >
      <Image
        src="/images/Home/castle-in-clouds.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
    </section>
  );
}
