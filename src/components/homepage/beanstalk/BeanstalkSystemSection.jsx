import Image from "next/image";

const CARDS = [
  {
    step: "1. THE LAND OFFER",
    heading: ["THE SOIL TEST:", "DIAGNOSE & PLANT"],
    description:
      "A five-week diagnostic + pilot. We map every leaking dollar in your funnel and ship the first fix live before we invoice. Two systems in production, a CFO-signed baseline, and the green light to climb.",
    layer: "Foundation Layer",
    align: "start",
  },
  {
    step: "2. PIPELINE",
    heading: ["THE BEANSTALK —", "LINKEDIN-LED OUTBOUND"],
    description:
      "Sales Navigator targeting, A/B tested sequences, and personalized outreach at enterprise scale. Up to 10,000 DMs a month going to the exact decision-makers who can pay your invoice — pre-qualified before they ever hit your calendar.",
    layer: "Pipeline Layer",
    align: "end",
  },
  {
    step: "3. AUTHORITY",
    heading: ["GOLDEN HARVEST —", "CONTENT THAT CLOSES"],
    description:
      "Executive LinkedIn content and paid creative at algorithmic tempo. We extract your expertise, frameworks, and insights and turn them into scroll-stopping posts, carousels, and ad creative that warm prospects before the first call.",
    layer: "Pipeline Layer",
    align: "start",
  },
];

function BeanstalkCard({ card }) {
  return (
    <div className="relative w-full max-w-143.75 rounded-[20px] bg-[#D9D9D9]/20 p-[clamp(24px,2.7778vw,40px)] backdrop-blur-sm">
      <span className="inline-flex rounded-[70px] bg-[#AC40FF] px-5 py-2 font-poppins text-[clamp(14px,1.4583vw,21px)] font-medium leading-none text-white">
        {card.step}
      </span>

      <h3 className="mt-[clamp(20px,2.4vw,40px)] font-anton-sc text-[clamp(26px,3.4028vw,49px)] uppercase leading-none text-black">
        {card.heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p className="mt-[clamp(20px,2.4vw,40px)] max-w-md font-poppins text-[clamp(14px,1.1111vw,16px)] font-medium leading-[1.1] text-black">
        {card.description}
      </p>

      <div className="mt-[clamp(20px,2.4vw,40px)] flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-black" />
        <span className="font-poppins text-[clamp(14px,1.1111vw,16px)] font-medium leading-[1.1] text-black">
          {card.layer}
        </span>
      </div>
    </div>
  );
}

export default function BeanstalkSystemSection() {
  return (
    <section className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] overflow-hidden rounded-5xl bg-[#F0F0EA] pb-[clamp(64px,9.7222vw,140px)]">
      <Image
        src="/images/Home/big-branch.png"
        alt=""
        width={2162}
        height={3842}
        className="pointer-events-none absolute left-1/2 top-[clamp(140px,19.4444vw,280px)] z-0 w-[clamp(520px,75.0694vw,1081px)] -translate-x-1/2 select-none opacity-95"
      />
      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute -bottom-87.5 left-1/2 w-[160%] max-w-none -translate-x-1/2 select-none z-9999"
      />

      <h2 className="relative z-10 w-full text-center font-anton-sc text-[clamp(40px,11.5972vw,167px)] uppercase leading-none text-black">
        The Beanstalk System
      </h2>

      <div className="relative z-10 mx-auto max-w-325 px-[clamp(24px,5.5556vw,80px)] text-center">
        <div className="mt-[clamp(24px,3.3333vw,56px)]">
          <p className="font-anton-sc text-[clamp(22px,5.4167vw,78px)] uppercase leading-none text-black">
            Five Plantings. One Unstoppable
          </p>
          <p className="mt-2 whitespace-nowrap font-alex-brush text-[clamp(48px,14.0278vw,202px)] leading-none text-[#AC40FF]">
            Growth Engine.
          </p>
        </div>

        <p className="mx-auto mt-[clamp(24px,3.3333vw,48px)] max-w-[clamp(280px,32.6389vw,470px)] font-poppins text-[clamp(16px,1.8056vw,26px)] font-medium leading-none text-black/70">
          Jack didn&apos;t climb by accident — he planted the right seed in
          the right ground. We do the same for your business on LinkedIn.
        </p>

        <div className="relative z-10 mt-[clamp(48px,6.6667vw,96px)] flex flex-col items-center gap-[clamp(32px,4.4444vw,64px)]">
          {CARDS.map((card, index) => (
            <div
              key={card.step}
              className={`flex w-full ${
                card.align === "end" ? "lg:justify-end" : "lg:justify-start"
              } ${index === 1 ? "lg:-mt-8" : ""}`}
            >
              <BeanstalkCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
