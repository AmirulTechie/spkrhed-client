import Image from "next/image";

export default function MovementSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] pt-[clamp(12px,2.0833vw,30px)] pb-[clamp(60px,8.3333vw,120px)]">
      <Image
        src="/images/about/spkrhed-bg-wordmark.svg"
        alt=""
        aria-hidden
        width={1441}
        height={235}
        className="pointer-events-none h-auto w-full select-none"
      />

      <div className="relative mt-[clamp(8px,1.3889vw,20px)] px-[clamp(20px,5.0694vw,73px)]">
        <div className="relative mx-auto aspect-1294/1339 w-full">
          <div
            aria-hidden
            className="absolute inset-0 z-0 overflow-hidden rounded-[clamp(20px,3.4722vw,50px)] bg-[#f0f0ea]"
            style={{
              backgroundImage:
                "radial-gradient(circle at -8.6% -3.5%, rgba(172,64,255,0.38) 0%, rgba(172,64,255,0.16) 26%, rgba(172,64,255,0) 55%), radial-gradient(circle at 95.6% 97.7%, rgba(172,64,255,0.38) 0%, rgba(172,64,255,0.16) 26%, rgba(172,64,255,0) 55%)",
            }}
          />

          <div className="pointer-events-none absolute left-[-14%] top-[34%] z-10 w-[48%] rotate-[132.62deg] select-none opacity-95">
            <Image
              src="/images/about/tree-vine.png"
              alt=""
              width={1400}
              height={787}
              className="h-auto w-full"
            />
          </div>
          <div className="pointer-events-none absolute right-[-15%] top-[26%] z-10 w-[48%] rotate-[132.62deg] select-none opacity-95">
            <Image
              src="/images/about/tree-vine.png"
              alt=""
              width={1400}
              height={787}
              className="h-auto w-full"
            />
          </div>

          <div className="absolute inset-0 z-20">
            <p className="absolute left-[17.70%] top-[7.77%] w-[64.53%] text-center font-anton-sc text-[clamp(26px,5.5556vw,80px)] uppercase leading-[0.95]">
              <span className="text-[#101010]">We didn&apos;t start an agency.</span>{" "}
              <span className="text-[#AC40FF]">We started a movement.</span>
            </p>

            <div
              aria-hidden
              className="absolute left-[23.34%] top-[44.74%] h-[36.82%] w-[53.25%] opacity-20"
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
              className="absolute left-0 top-[10.61%] h-auto w-full"
            />

            <h3 className="absolute left-[5.49%] top-[69.83%] w-[39.95%] font-poppins text-[clamp(20px,2.9167vw,42px)] font-bold uppercase leading-[0.88] text-[#101010]">
              The internet promised connection and delivered noise.
            </h3>

            <div className="absolute left-[5.49%] top-[79.24%] w-[41.27%] font-poppins text-[clamp(14px,1.4583vw,21px)] leading-[1.19] text-[#101010]">
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

            <p className="absolute left-[54.10%] top-[79.24%] w-[40.34%] font-poppins text-[clamp(14px,1.4583vw,21px)] leading-[1.19] text-black">
              This is bigger than any one campaign. Every founder who picks
              up this banner, who chooses the human path over the easy one,
              makes the movement stronger. That is who we build for. That is
              who we are.
            </p>

            <div className="absolute left-[66.61%] top-[87.38%] h-[11.28%] w-[14.37%] rotate-[-10.5deg] overflow-hidden">
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
