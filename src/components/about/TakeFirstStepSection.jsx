import Image from "next/image";

export default function TakeFirstStepSection() {
  return (
    <section className="relative aspect-1440/720 w-full overflow-hidden bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "33.3175%",
          top: "32.9167%",
          width: "71.8206%",
          height: "211.6028%",
        }}
      >
        <Image
          src="/images/about/footer-beanstalk-vine.webp"
          alt=""
          fill
          className="select-none object-cover"
        />
      </div>

      {/* Rectangle 164/165 from Figma: fades the vine into black */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "37.8896%",
          top: "35.2778%",
          width: "45.2926%",
          height: "56.8593%",
          background:
            "linear-gradient(180deg, #0f0f0f 0%, rgba(15,15,15,0) 100%)",
        }}
      />

      <h2 className="absolute left-[4.6528%] top-[18.8889%] w-[90.7639%] whitespace-nowrap text-center font-anton-sc text-[clamp(40px,12.1528vw,175px)] uppercase leading-[0.8] text-white">
        Take the first step
      </h2>

      <p className="absolute left-[5.0694%] top-[44.4444%] w-[38.4028%] font-poppins text-[clamp(14px,1.5972vw,23px)] uppercase leading-[1.09] text-white">
        This is a movement, and it has room for you. If you are done being
        just another inbox blast and ready to grow the human way, you already
        know what to do. The work starts here.
      </p>

      <div className="absolute left-[60.4861%] top-[58.75%] flex items-center gap-2">
        <span className="font-poppins text-[clamp(14px,1.5972vw,23px)] uppercase text-white/25">
          Start the climb:
        </span>
        <a
          href="mailto:info@speakerhead.com"
          className="inline-flex items-center rounded-full border border-white px-[clamp(16px,1.1806vw,17px)] py-[clamp(6px,0.3819vw,6px)] font-poppins text-[clamp(14px,1.5972vw,23px)] text-white"
        >
          info@speakerhead.com
        </a>
      </div>
    </section>
  );
}
