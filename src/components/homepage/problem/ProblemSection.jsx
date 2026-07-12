import Image from "next/image";

export default function ProblemSection() {
  return (
    <section className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] rounded-5xl bg-[#DDDDD5]">
      <div className="relative px-[clamp(32px,5.5556vw,80px)] py-[clamp(40px,6.9444vw,100px)]">
        <Image
          src="/images/Home/leaf.png"
          alt=""
          width={200}
          height={148}
          className="pointer-events-none absolute right-[6%] top-[-3%] w-[clamp(80px,9.2222vw,133px)] -scale-x-100 rotate-150 select-none"
        />
        <Image
          src="/images/Home/leaf.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute left-[15%] top-[55%] w-[10%] rotate-165 select-none"
        />

        <div className="grid grid-cols-1 gap-x-[clamp(32px,3.0556vw,44px)] gap-y-12 lg:grid-cols-[589fr_647fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
              />
              <span className="font-poppins text-[38px] font-semibold uppercase text-[#424242]">
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

            <p className="mt-30 max-w-md font-poppins text-[clamp(15px,1.5278vw,25px)] leading-[0.97] text-black font-medium">
              You&apos;re the strategist, the creator, the sales team, and the
              closer. If you disappear for a week, so does your pipeline.
              That&apos;s not a business — that&apos;s a job you can never
              step away from.
            </p>
          </div>

          <div className="relative aspect-647/566">
            <div className="absolute inset-0 translate-x-[clamp(-5px,0.8333vw,-16px)] translate-y-[clamp(10px,1.3889vw,20px)] rotate-[-1.95deg] rounded-[clamp(16px,1.6667vw,24px)] bg-gray-400/60" />

            <div className="absolute inset-0 flex flex-col rounded-[clamp(16px,1.6667vw,24px)] bg-[#AC40FF] p-[clamp(24px,2.7778vw,48px)]">
              <span className="font-poppins text-[clamp(25px,1.1111vw,30px)] font-semibold uppercase text-white">
                /Problem
              </span>
              <h3 className="mt-3 font-anton-sc text-[60px] uppercase leading-[0.97] text-[#101010]">
                Feast or famine, every quarter
              </h3>
              <p className="mt-8 max-w-md font-poppins text-[20px] font-medium leading-[110%] text-[#101010]">
                One month you&apos;re turning people away. The next,
                you&apos;re refreshing your inbox wondering where everyone
                went.
              </p>

              <div className="mt-auto flex items-end justify-between gap-4">
                <ul className="font-poppins text-[20px] font-semibold leading-[110%] text-[#101010]">
                  <li>Volatility</li>
                  <li>Inconsistency</li>
                  <li>Unpredictable Growth</li>
                  <li>Founder-Led Manual Outreach</li>
                  <li>Single Point of Failure</li>
                </ul>
                <span className="font-anton-sc text-[120px] leading-{110%} text-black">
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