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

      <div className="relative z-10 mt-[-100] flex w-full max-w-[1800px] flex-col items-center text-center text-white">
        <p className="mb-15 flex items-center gap-3 font-poppins text-[clamp(18px,1.6888vw,32px)] font-semibold uppercase text-white/35">
  <Image
    src="/images/Home/banner-bullet.png"
    alt=""
    width={20}
    height={20}
  />
  This is a movement
</p>

        <div className="flex flex-col items-center">
          <div className="relative w-full h-[calc(2*clamp(48px,6.9444vw,160px))]">
            <div className="absolute top-0 right-[calc(50%+clamp(24px,6.4236vw,130px))] flex flex-col items-start whitespace-nowrap font-anton-sc text-[clamp(48px,6.9444vw,160px)] leading-none">
              <span>WATCH</span>
              <span>PLANT</span>
            </div>
            <div className="absolute top-0 left-[calc(50%+clamp(24px,6.4236vw,130px))] flex flex-col items-start whitespace-nowrap font-anton-sc text-[clamp(48px,6.9444vw,160px)] leading-none">
              <span>THE SEED</span>
              <span>THE CLIENTS</span>
            </div>
          </div>

          <p className="-mt-[clamp(12px,2.2222vw,50px)] font-playwrite-us-trad text-[clamp(40px,5.9028vw,130px)] text-[#AC40FF] z-9999">
            climb to you
          </p>
        </div>
      </div>
    </section>
  );
}
