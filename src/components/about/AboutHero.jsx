import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative flex h-screen w-full items-end overflow-hidden bg-black">
      <Image
        src="/images/about/about-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-b from-transparent to-[#0f0f0f]"
      />

      <div className="relative z-10 w-full px-8 pb-[clamp(28px,3.1944vw,46px)] text-white sm:px-12 lg:px-16">
        <p className="mb-[clamp(16px,1.6667vw,24px)] flex items-center gap-[clamp(4px,0.4167vw,6px)] font-poppins text-[clamp(16px,2.0833vw,30px)] font-medium uppercase text-white/30">
          <Image
            src="/images/Home/banner-bullet.png"
            alt=""
            width={13}
            height={13}
            className="h-[clamp(9px,0.9028vw,13px)] w-[clamp(9px,0.9028vw,13px)]"
          />
          Sound familiar?
        </p>

        <Image
          src="/images/about/spkrhed-wordmark.svg"
          alt="SPKRHED"
          width={469}
          height={75}
          className="h-auto w-[clamp(220px,32.5694vw,469px)]"
        />

        <p className="mt-[clamp(12px,1.4583vw,21px)] max-w-150.5 font-poppins text-[clamp(15px,1.5972vw,23px)] leading-[1.124] text-white/60">
          SPKRHED is not another agency. We are a movement to put the human
          back into how companies grow. While the rest of the market drowns
          buyers in bots and cold spam, we are building something rare and
          nearly forgotten. Real people, having real conversations, earning
          real trust. It starts on LinkedIn. It starts with the first
          message. It starts with you.
        </p>
      </div>
    </section>
  );
}
