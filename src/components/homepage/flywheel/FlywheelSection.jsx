import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Outbound DM Lands",
    description:
      "Your prospect receives a personalized message. They're curious — so they click your profile.",
    offset: false,
  },
  {
    number: "02",
    title: "Profile Builds Trust",
    description:
      "They see polished positioning, real social proof, and a feed of content that makes them feel they already know you.",
    offset: true,
  },
  {
    number: "03",
    title: "Content Keeps Them Warm",
    description:
      "Even if they're not ready today, they follow. Every post keeps you top of mind until the timing is right.",
    offset: false,
  },
  {
    number: "04",
    title: "Qualified Call Booked",
    description:
      "When they're ready, you're the only name they think of. They book — already pre-sold on your value.",
    offset: true,
  },
];

function StepCard({ step }) {
  return (
    <div
      className={`relative aspect-321/353 w-full bg-[rgba(217,217,217,0.5)] backdrop-blur-md [mask-image:url('/images/Home/flywheel-card-shape.svg')] mask-no-repeat mask-size-[100%_100%] ${step.offset ? "sm:mt-[clamp(38px,8.0556vw,116px)]" : ""}`}
    >
      <div className="flex h-full w-full flex-col pt-[clamp(20px,1.875vw,27px)] pr-[clamp(20px,1.875vw,27px)] pb-[clamp(28px,2.6389vw,38px)] pl-[clamp(20px,1.875vw,27px)]">
        <div className="mr-[clamp(13px,1.3194vw,19px)] flex items-start justify-between">
          <span className="font-anton-sc text-[clamp(40px,5.5556vw,80px)] leading-[0.8] text-[#101010]">
            {step.number}
          </span>
          <ArrowUpRight
            className="mt-[clamp(32px,3.1944vw,46px)] h-8 w-8 shrink-0 text-[#101010]"
          />
        </div>
        <div className="mt-[clamp(9px,0.9028vw,13px)] mr-[clamp(13px,1.3194vw,19px)] border-t border-[#101010]" />

        <div className="mt-auto">
          <h3 className="font-anton-sc text-[clamp(16px,1.3889vw,20px)] uppercase leading-[0.8] text-[#101010]">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[clamp(146px,14.4444vw,208px)] font-poppins text-[clamp(9px,0.6944vw,10px)] leading-none text-[#101010]">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FlywheelSection() {
  return (
    <section className="relative z-10 -mt-[clamp(32px,4.4444vw,64px)] overflow-hidden rounded-5xl bg-[#F0F0EA] pb-[clamp(64px,9.7222vw,140px)] pt-[clamp(48px,6.25vw,90px)]">
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={2162}
        height={3842}
        className="pointer-events-none absolute right-[-8%] top-[15%] z-0 w-[50%] rotate-12 select-none opacity-90"
      />

      <div className="relative z-10 mx-auto max-w-360 px-[clamp(20px,3.1944vw,46px)] text-center">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/images/Home/banner-bullet.png"
            alt=""
            width={20}
            height={20}
            className="h-[clamp(10px,0.8333vw,15px)] w-[clamp(10px,0.8333vw,15px)]"
          />
          <span className="font-poppins text-[clamp(20px,2.6389vw,38px)] font-semibold uppercase text-[#424242]">
            The Flywheel
          </span>
        </div>

        <h2 className="mx-auto mt-[clamp(16px,2.2222vw,32px)] max-w-129.5 font-anton-sc text-[clamp(32px,5.9028vw,85px)] uppercase leading-[1.06] text-black">
          <span className="block">Content Makes</span>
          <span className="block">Outreach Work</span>
          <span className="block">Harder.</span>
        </h2>

        <p className="mx-auto mt-[clamp(-23px,-1.5972vw,-16px)] max-w-197 font-alex-brush text-[clamp(48px,7.2917vw,105px)] leading-[0.8] text-[#AC40FF]">
          <span className="block">Outreach Makes</span>
          <span className="block">Content Close Faster.</span>
        </p>

        <div className="relative z-10 mt-[clamp(48px,9.5139vw,137px)] grid grid-cols-1 gap-x-[clamp(30px,1.4583vw,40px)] gap-y-[clamp(40px,4.4444vw,64px)] text-left sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>

      <Image
        src="/images/Home/cloud.png"
        alt=""
        width={3723}
        height={1164}
        className="pointer-events-none absolute -bottom-120 left-1/2 w-[160%] max-w-none -translate-x-1/2 select-none z-9999 opacity-50"
      />
    </section>
  );
}
