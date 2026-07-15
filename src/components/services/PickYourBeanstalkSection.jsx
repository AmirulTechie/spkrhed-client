import Image from "next/image";

export default function PickYourBeanstalkSection() {
  return (
    <section className="relative min-h-120 overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)] md:h-[clamp(500px,48.4028vw,697px)] md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] bottom-0 flex h-[80vw] w-[55vw] items-center justify-center md:right-auto md:bottom-auto md:left-[28.3868%] md:top-[15.0645%] md:h-[105.8vw] md:w-[71.8194%]"
      >
        <Image
          src="/images/big-branch.png"
          alt=""
          width={2162}
          height={3842}
          className="w-[42vw] max-w-none rotate-[10.64deg] select-none md:w-[54.7917vw]"
        />
      </div>

      {/* Rectangle 164/165 from Figma: fades the branch into black. Drag via top/left to re-align. */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden items-center justify-center md:flex"
        style={{
          top: "17.5036%",
          left: "32.9583%",
          width: "45.2924%",
          height: "25.135%",
        }}
      >
        <div
          className="rotate-[5.45deg]"
          style={{
            width: "43.1675vw",
            height: "24.4429vw",
            background:
              "linear-gradient(180deg, #0f0f0f 0%, rgba(15,15,15,0) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto h-auto max-w-300 px-8 sm:px-12 lg:px-16 md:mx-0 md:h-full md:max-w-none md:px-0">
        <h2 className="text-center font-anton-sc text-[clamp(40px,10.9722vw,158px)] leading-[0.886] uppercase text-white md:absolute md:inset-x-0 md:top-0">
          Pick your Beanstalk.
        </h2>

        <div className="mt-[clamp(24px,4vw,58px)] flex flex-col gap-[clamp(20px,2.5vw,36px)] md:contents">
          <p className="max-w-138.25 font-poppins text-[clamp(14px,1.5972vw,23px)] leading-[1.1] text-white uppercase md:absolute md:top-[23.3859%] md:left-[5%] md:w-[38.4028%] md:max-w-none">
            Not sure which pieces you need? Most clients start with the core
            engine, then add a rung at a time as the pipeline compounds. Book
            a call and we will map the right starting point for you.
          </p>

          <div className="flex items-center gap-2 md:absolute md:top-[38.8809%] md:left-[60.4167%]">
            <span className="font-poppins text-[clamp(14px,1.5972vw,23px)] text-white/25 uppercase">
              Start the climb:
            </span>
            <a
              href="mailto:info@speakerhead.com"
              className="inline-flex items-center rounded-full border border-white px-[clamp(16px,1.1806vw,17px)] py-[clamp(6px,0.3819vw,6px)] font-poppins text-[clamp(14px,1.5972vw,23px)] text-white"
            >
              info@speakerhead.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
