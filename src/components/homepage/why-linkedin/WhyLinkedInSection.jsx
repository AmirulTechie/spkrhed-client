import Image from "next/image";

export default function WhyLinkedInSection() {
  return (
    <section className="relative overflow-hidden py-[clamp(64px,9.7222vw,140px)]">
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-80"
      />
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -left-100 -top-120 w-[40%] -scale-x-100 rotate-30 select-none opacity-90"
      />
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -left-70 -top-80 w-[40%] -scale-x-100 rotate-60 select-none opacity-90"
      />
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -right-75 -top-40 w-[40%] -rotate-50 select-none opacity-90"
        
      />
      

      <div className="relative mx-auto max-w-300 px-[clamp(24px,5.5556vw,80px)] text-center">
        <div className="mb-15 mt-20 flex justify-center items-center gap-3">
              <Image
                src="/images/Home/banner-bullet.png"
                alt=""
                width={20}
                height={20}
                className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
              />
              <span className="font-poppins text-[clamp(14px,1.5972vw,23px)] font-semibold uppercase tracking-wide text-[#b7b7b7]">
          Why LinkedIn?
        </span>
            </div>

        <h2 className="mt-6 max-w-201 mx-auto text-center font-anton-sc text-[clamp(28px,4.8611vw,81px)] uppercase leading-[0.97] text-white">
  The only platform where your{" "}
  <span className="text-[#AC40FF] whitespace-nowrap">exact buyer</span> is already
  waiting.
</h2>

        <div className="mt-25 grid grid-cols-1 items-center sm:grid-cols-[1fr_auto_1fr]">
          <p className="font-anton-sc max-w-59.75 ml-auto mr-[clamp(24px,11.1111vw,160px)] text-[clamp(22px,2.7778vw,40px)] uppercase leading-[97%] text-white text-left">
          No promotions folder, no buried requests tab.
          </p>

        <div
        className="flex h-[clamp(100px,14.3056vw,206px)] w-[clamp(100px,14.3056vw,206px)] shrink-0 items-center justify-center rounded-full"
        style={{
          background: "rgba(0, 0, 0, 0.004)",
          boxShadow: "0px 0px 55.6px rgba(172, 64, 255, 0.43), inset 0px 0px 32.9px rgba(172, 64, 255, 0.3)",
    }}
  >
    <span className="font-anton-sc text-[clamp(24px,3.3333vw,48px)] text-[#AC40FF]">
      01
    </span>
  </div>

  <p className="font-poppins ml-[clamp(16px,6.3194vw,91px)] w-full max-w-108.25 text-[clamp(16px,1.6667vw,24px)] font-medium leading-[97%] text-[#b7b7b7] text-left">
  LinkedIn messages land in your prospect&apos;s primary inbox.
  They see your name, your message, and decide on the spot.
</p>
</div>
      </div>
    </section>
  );
}
