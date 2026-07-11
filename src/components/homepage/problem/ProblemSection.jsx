import Image from "next/image";

export default function ProblemSection() {
  return (
    <section className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] rounded-5xl bg-[#DDDDD5]">
      <div className="relative px-[clamp(32px,5.5556vw,80px)] py-[clamp(40px,6.9444vw,100px)]">
        <Image
          src="/images/Home/leaf.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute right-[16%] top-[6%] w-[clamp(48px,4.1667vw,60px)] -scale-x-100 rotate-145 select-none"
        />
        <Image
          src="/images/Home/leaf.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute left-[16%] top-[46%] w-[clamp(36px,3.125vw,45px)] rotate-35 select-none"
        />

        <div className="grid grid-cols-1 gap-x-[clamp(32px,4.4444vw,102px)] gap-y-12 lg:grid-cols-[589fr_641fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
              />
              <span className="font-poppins text-[clamp(16px,2.6389vw,38px)] font-semibold uppercase text-[#424242]">
                Sound familiar?
              </span>
            </div>

            <h2 className="font-anton-sc text-[clamp(32px,6.25vw,90px)] uppercase leading-[0.97] text-black">
              Every client{" "}
              <span className="block">
                you have <span className="text-[#AC40FF]">came</span>
              </span>
              <span className="block text-[#AC40FF]">from you.</span>
            </h2>

            <p className="mt-10 max-w-md font-poppins text-[clamp(15px,1.5278vw,22px)] leading-[0.97] text-[#424242]">
              You&apos;re the strategist, the creator, the sales team, and the
              closer. If you disappear for a week, so does your pipeline.
              That&apos;s not a business — that&apos;s a job you can never
              step away from.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-[clamp(6px,0.8333vw,12px)] translate-y-[clamp(10px,1.3889vw,20px)] rounded-[clamp(16px,1.6667vw,24px)] bg-white shadow-lg" />

            <div className="relative rounded-[clamp(16px,1.6667vw,24px)] bg-[#AC40FF] p-[clamp(24px,2.7778vw,48px)]">
              <span className="font-poppins text-[clamp(12px,1.1111vw,16px)] font-semibold uppercase text-white">
                /Problem
              </span>
              <h3 className="mt-3 font-anton-sc text-[clamp(24px,2.7778vw,40px)] uppercase leading-[1.1] text-black">
                Feast or famine, every quarter
              </h3>
              <p className="mt-4 max-w-sm font-poppins text-[clamp(14px,1.1111vw,18px)] leading-normal text-black/80">
                One month you&apos;re turning people away. The next,
                you&apos;re refreshing your inbox wondering where everyone
                went.
              </p>

              <div className="mt-10 flex items-end justify-between gap-4">
                <ul className="font-poppins text-[clamp(13px,1.0417vw,15px)] font-bold uppercase leading-[1.6] text-black">
                  <li>Volatility</li>
                  <li>Inconsistency</li>
                  <li>Unpredictable Growth</li>
                  <li>Founder-Led Manual Outreach</li>
                  <li>Single Point of Failure</li>
                </ul>
                <span className="font-anton-sc text-[clamp(48px,5.5556vw,80px)] leading-none text-black">
                  01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
