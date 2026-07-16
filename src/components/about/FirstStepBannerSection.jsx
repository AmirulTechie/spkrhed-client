import Image from "next/image";

export default function FirstStepBannerSection() {
  return (
    <section className="relative aspect-1440/825 w-full overflow-hidden">
      <Image
        src="/images/about/first-step-banner.png"
        alt="A lone figure walking toward a beanstalk bridge in a misty forest"
        fill
        className="object-cover"
      />
    
      {/* Full-height overlay: dark at top, fading to transparent by mid/lower banner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #0f0f0f 0%, rgba(15,15,15,0) 100%)",
        }}
      />

      {/* Bottom overlay: transparent to dark, grounding the paragraph copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26.18%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,15,15,0) 0%, #0f0f0f 100%)",
        }}
      />

      <p className="absolute top-[8.48%] left-[37.85%] w-[57.08%] text-right font-anton-sc text-[clamp(26px,5.5556vw,80px)] uppercase leading-none">
        <span className="text-white">A journey of a thousand miles </span>
        <span className="text-[#AC40FF]">begins with the first step.</span>
      </p>

      <p className="absolute top-[78.18%] left-[5.07%] w-[48%] font-poppins text-[clamp(15px,1.5278vw,22px)] leading-[1.18] text-white/70">
        Every client we have ever grown started in exactly one place. One
        profile, rebuilt. One honest message, sent. One conversation that
        became a call, then a contract, then a referral. We are not here to
        sell you a hack that works for a week and costs you your name. We
        build momentum that still pays you back a year from now. The first
        step is always the hardest. We take it with you.
      </p>
    </section>
  );
}
