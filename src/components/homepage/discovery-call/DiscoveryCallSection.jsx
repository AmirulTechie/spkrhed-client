import Image from "next/image";

export default function DiscoveryCallSection() {
  return (
    <section
      id="discovery-call"
      className="relative overflow-hidden rounded-[clamp(24px,3.4722vw,50px)] bg-[#c983ff]"
    >
      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute bottom-[-20%] left-1/2 z-2 max-w-none -translate-x-1/2 select-none lg:bottom-[-55%] lg:w-[160%]"
      />

      {/* Desktop — pixel-matched to the Figma canvas (1440x860) */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/Home/golden-duck.png"
          alt=""
          width={1244}
          height={1244}
          className="pointer-events-none absolute left-[60.42%] top-[35%] z-1 w-[43.19%] select-none"
        />

        <Image
          src="/images/Home/bird-group.png"
          alt=""
          width={552}
          height={290}
          className="pointer-events-none absolute left-[10.69%] top-[64.42%] z-10-[19.17%] select-none"
        />

        <div className="relative z-4 mx-auto flex max-w-360 flex-col items-center px-[clamp(20px,3.1944vw,46px)] pb-[clamp(48px,7.6389vw,110px)] pt-[clamp(56px,8.8889vw,128px)] text-center">
          <h2 className="font-anton-sc text-[clamp(32px,6.4583vw,93px)] uppercase leading-[0.96] text-black">
            <span className="block">Every Month</span>
            <span className="block">Without A System Is</span>
            <span className="block">A Month Of Leads</span>
          </h2>

          <p className="-mt-[clamp(16px,2.5694vw,37px)] font-alex-brush text-[clamp(48px,6.5972vw,95px)] leading-[1.1] text-white">
            You&rsquo;ll Never Get Back
          </p>

          <p className="mt-[clamp(16px,2.2222vw,32px)] max-w-121.75 font-poppins text-[clamp(14px,1.3194vw,19px)] font-semibold leading-[110%] text-black/70">
            One call. Within 30 days, your pipeline runs on two channels
            instead of zero. Qualified prospects book calls whether you
            posted today or not.
          </p>

          <button
            type="button"
            className="mt-[clamp(40px,10.625vw,153px)] w-[clamp(260px,26.875vw,387px)] cursor-pointer rounded-lg bg-[#ac40ff] py-[clamp(8px,0.8vw,12px)] font-poppins text-[clamp(16px,1.6667vw,24px)] font-semibold uppercase leading-[1.1] text-[#101010]"
          >
            Book Your Discovery Call
          </button>

          <p className="mt-[clamp(10px,1.1806vw,17px)] font-poppins text-[14px] font-medium text-black/70">
            30-minute call &nbsp;·&nbsp; No pressure &nbsp;·&nbsp; No pitch
            deck &nbsp;·&nbsp; Just honest strategy
          </p>
        </div>
      </div>

      {/* Mobile — same content, simplified stacked layout */}
      <div className="relative z-4 flex flex-col items-center px-6 pb-14 pt-12 text-center lg:hidden">
        <h2 className="font-anton-sc text-[clamp(22px,8.2vw,30px)] uppercase leading-[0.96] text-black">
          <span className="block">Every Month</span>
          <span className="block">Without A System Is</span>
          <span className="block">A Month Of Leads</span>
        </h2>

        <p className="-mt-1 font-alex-brush text-[clamp(26px,9.5vw,34px)] leading-[1.1] text-white">
          You&rsquo;ll Never Get Back
        </p>

        <Image
          src="/images/Home/golden-duck.png"
          alt=""
          width={1244}
          height={1244}
          className="pointer-events-none mt-4 w-36 select-none sm:w-44"
        />

        <p className="mt-4 max-w-sm font-poppins text-[15px] font-semibold leading-snug text-black/70">
          One call. Within 30 days, your pipeline runs on two channels
          instead of zero. Qualified prospects book calls whether you posted
          today or not.
        </p>

        <button
          type="button"
          className="mt-8 w-full max-w-xs cursor-pointer rounded-lg bg-[#ac40ff] py-3 font-poppins text-base font-semibold uppercase leading-[1.1] text-[#101010]"
        >
          Book Your Discovery Call
        </button>

        <p className="mt-3 max-w-xs font-poppins text-xs font-medium leading-normal text-black/70">
          30-minute call &nbsp;·&nbsp; No pressure &nbsp;·&nbsp; No pitch deck
          &nbsp;·&nbsp; Just honest strategy
        </p>
      </div>
    </section>
  );
}
