import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <Image
        src="/images/Home/hero-banner.jpg"
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

      <Image
        src="/images/Home/small-spots.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-80"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-350 flex-col items-center px-6 text-center text-white">
        <p className="mb-6 font-poppins text-[18px] font-semibold uppercase tracking-[0.15em] text-white/50 sm:text-[24px] lg:text-[32px]">
          This is a movement
        </p>

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-[auto_auto] justify-center gap-x-12 gap-y-0 font-anton-sc text-[48px] leading-none sm:gap-x-22.5 sm:text-[64px] md:text-[80px] lg:gap-x-46.25 lg:text-[100px]">
            <span className="text-left">WATCH</span>
            <span className="text-left">THE SEED</span>
            <span className="text-left">PLANT</span>
            <span className="text-left">THE CLIENTS</span>
          </div>

          <p className="-mt-3 mr-50 font-playwrite-us-trad text-[40px] text-[#AC40FF] sm:-mt-6 sm:text-[56px] md:text-[70px] lg:-mt-8 lg:text-[85px]">
            climb to you
          </p>
        </div>
      </div>
    </section>
  );
}
