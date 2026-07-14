import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative flex h-screen w-full items-end overflow-hidden bg-black">
      <Image
        src="/images/services/services-banner.png"
        alt=""
        fill
        priority
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

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[40%] bg-linear-to-b from-[#0f0f0f] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-b from-transparent to-[#0f0f0f]"
      />

      <div className="relative z-10 grid w-full grid-cols-1 items-end gap-y-10 px-8 pb-[clamp(24px,3.1944vw,46px)] text-white sm:px-12 lg:grid-cols-[490fr_598fr] lg:gap-x-[clamp(48px,14.4444vw,208px)] lg:px-16">
        <div className="flex flex-col items-start">
          <Image
            src="/images/spkrhed-logo.png"
            alt="SPKRHED"
            width={358}
            height={58}
            className="mb-[clamp(16px,2.2222vw,40px)] h-auto w-[clamp(90px,11.875vw,171px)]"
          />

          <h1 className="font-anton-sc text-[clamp(40px,5.5556vw,80px)] uppercase leading-[0.97]">
            <span className="block text-[#AC40FF]">LINKEDIN-FIRST</span>
            <span className="block">GROWTH AGENCY</span>
          </h1>

          <p className="mt-[clamp(12px,1.6667vw,24px)] font-poppins text-[clamp(16px,1.7361vw,25px)] font-medium uppercase">
            Services &amp; Capabilities
          </p>
        </div>

        <div className="text-right">
          <p className="font-poppins text-[clamp(14px,1.1806vw,17px)] uppercase leading-[1.1]">
            SPKRHED is a LinkedIn-first agency. We turn your profile and
            presence into a system that starts real conversations with the
            right buyers, then back it with calls, email and paid to close
            them. LinkedIn is the front door. Everything else makes sure
            nobody leaves without booking
          </p>

          <p className="mt-[clamp(8px,1.1111vw,16px)] font-poppins text-[clamp(11px,0.8333vw,12px)] italic uppercase leading-[1.1] text-white/60">
            B2B buyers ignore cold calls and delete cold email. But they
            answer the right message from a real person on LinkedIn. Every
            other service we run exists to feed or finish what LinkedIn
            starts.
          </p>
        </div>
      </div>
    </section>
  );
}
