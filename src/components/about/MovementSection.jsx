import Image from "next/image";

export default function MovementSection() {
  return (
    <section className="relative overflow-hidden pt-[clamp(12px,2.0833vw,30px)] pb-[clamp(60px,8.3333vw,120px)]">
      <Image
        src="/images/about/spkrhed-bg-wordmark.svg"
        alt=""
        aria-hidden
        width={1441}
        height={235}
        className="pointer-events-none h-auto w-full select-none"
      />

      <div className="relative mt-[clamp(8px,1.3889vw,20px)] px-[clamp(20px,5.0694vw,73px)]">
        <div className="relative mx-auto w-full lg:aspect-1294/1339">
          <div
            aria-hidden
            className="absolute inset-0 z-0 overflow-hidden rounded-[clamp(20px,3.4722vw,50px)] bg-[#f0f0ea]"
            style={{
              backgroundImage:
                "radial-gradient(circle at -8.6% -3.5%, rgba(172,64,255,0.38) 0%, rgba(172,64,255,0.16) 26%, rgba(172,64,255,0) 55%), radial-gradient(circle at 95.6% 97.7%, rgba(172,64,255,0.38) 0%, rgba(172,64,255,0.16) 26%, rgba(172,64,255,0) 55%)",
            }}
          />

          {/* Vine flourishes are desktop-only decoration; on narrow screens they overflow
              the stacked mobile layout awkwardly, so they're hidden below lg. */}
          <div className="pointer-events-none absolute left-[-32%] top-[45%] z-10 hidden w-[50%] rotate-[132.62deg] select-none opacity-95 lg:block">
            <Image
              src="/images/about/tree-vine.png"
              alt=""
              width={1400}
              height={787}
              className="h-auto w-full"
            />
          </div>
          <div className="pointer-events-none absolute right-[-25%] top-[15%] z-10 hidden w-[50%] select-none opacity-95 rotate-110 lg:block">
            <Image
              src="/images/about/tree-vine.png"
              alt=""
              width={1400}
              height={787}
              className="h-auto w-full"
            />
          </div>

          {/* Below lg: normal stacked flow. At lg and up: absolute, percentage-positioned
              to match the Figma desktop frame exactly. */}
          <div className="relative z-20 flex flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:absolute lg:inset-0 lg:block lg:px-0 lg:py-0">
            <p className="text-center font-anton-sc text-[clamp(26px,5.5556vw,80px)] uppercase leading-[1.05] lg:absolute lg:left-[17.70%] lg:top-[7.77%] lg:w-[64.53%] lg:leading-[0.95]">
              <span className="text-[#101010]">We didn&apos;t start an <br /> agency.</span>{" "}
              <span className="text-[#AC40FF]">We started a <br /> movement.</span>
            </p>

            <div
              aria-hidden
              className="hidden opacity-20 lg:absolute lg:left-[23.34%] lg:top-[44.74%] lg:block lg:h-[36.82%] lg:w-[53.25%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 35%, transparent 70%)",
              }}
            />

            <Image
              src="/images/about/tree-log.png"
              alt="A moss-covered log floating above the card, sprouting new growth"
              width={1294}
              height={740}
              className="relative mx-auto h-auto w-full max-w-135 lg:absolute lg:left-0 lg:top-[10.61%] lg:mx-0 lg:max-w-none"
            />

            <h3 className="font-poppins text-[clamp(20px,2.9167vw,42px)] font-bold uppercase leading-[1.05] text-[#101010] lg:absolute lg:left-[5.49%] lg:top-[69.83%] lg:w-[39.95%] lg:max-w-129.25 lg:leading-[0.88]">
              The internet promised connection and delivered noise.
            </h3>

            <div className="flex flex-col gap-8 lg:contents">
              <div className="font-poppins text-[clamp(14px,1.4583vw,21px)] leading-[1.4] text-[#101010] lg:absolute lg:left-[5.49%] lg:top-[79.24%] lg:w-[41.27%] lg:leading-[1.19]">
                <p className="mb-4">
                  Inboxes full of fake personalization. Feeds full of
                  automation pretending to be human. Buyers learned to tune all
                  of it out, and most agencies answered by turning the volume
                  up louder.
                </p>
                <p>
                  We went the other way. Fewer messages, more meaning. We
                  treat every conversation like it belongs to a real person,
                  because it does. We measure success in relationships that
                  compound, not blasts that burn out the moment they land.
                </p>
              </div>

              <p className="font-poppins text-[clamp(14px,1.4583vw,21px)] leading-[1.4] text-black lg:absolute lg:left-[54.10%] lg:top-[79.24%] lg:w-[40.34%] lg:leading-[1.19]">
                This is bigger than any one campaign. Every founder who picks
                up this banner, who chooses the human path over the easy one,
                makes the movement stronger. That is who we build for. That is
                who we are.
              </p>
            </div>

            <div className="mx-auto h-24 w-24 rotate-[-10.5deg] overflow-hidden lg:absolute lg:left-[66.61%] lg:top-[87.38%] lg:mx-0 lg:h-[11.28%] lg:w-[14.37%]">
              <Image
                src="/images/about/leaf.png"
                alt=""
                aria-hidden
                fill
                className="object-cover blur-[1px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
