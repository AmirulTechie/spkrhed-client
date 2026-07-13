import Image from "next/image";

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

function ArrowIcon({ className }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5M12 4V11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepCard({ step }) {
  const glass =
    "border border-white/40 bg-[rgba(217,217,217,0.5)] backdrop-blur-md";

  return (
    <div
      className={`relative ${step.offset ? "sm:mt-[clamp(40px,8.3333vw,120px)]" : ""}`}
    >
      <div
        className={`absolute -top-[clamp(10px,1.1111vw,16px)] left-0 h-[clamp(10px,1.1111vw,16px)] w-[45%] rounded-t-[10px] border-b-0 ${glass}`}
      />
      <div
        className={`relative flex aspect-321/353 w-full flex-col rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-[clamp(20px,1.875vw,27px)] ${glass}`}
      >
        <div className="flex items-start justify-between">
          <span className="font-anton-sc text-[clamp(40px,5.5556vw,80px)] leading-[0.8] text-[#101010]">
            {step.number}
          </span>
          <span className="flex h-[clamp(22px,1.8056vw,26px)] w-[clamp(22px,1.8056vw,26px)] shrink-0 items-center justify-center rounded-full bg-[#101010]">
            <ArrowIcon className="h-[clamp(10px,0.8333vw,12px)] w-[clamp(10px,0.8333vw,12px)] text-white" />
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="font-anton-sc text-[clamp(16px,1.3889vw,20px)] uppercase leading-[0.8] text-[#101010]">
            {step.title}
          </h3>
          <p className="mt-2 max-w-52 font-poppins text-[clamp(10px,0.7639vw,11px)] leading-none text-[#101010]">
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
        className="pointer-events-none absolute right-[-10%] top-[30%] z-0 w-[50%] rotate-5 select-none opacity-90"
      />

      <div className="relative z-10 mx-auto max-w-325 px-[clamp(24px,5.5556vw,80px)] text-center">
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

        <div className="relative z-10 mt-[clamp(48px,9.5139vw,137px)] grid grid-cols-1 gap-x-[clamp(12px,1.4583vw,21px)] gap-y-[clamp(40px,4.4444vw,64px)] text-left sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
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
        className="pointer-events-none absolute -bottom-87.5 left-1/2 w-[160%] max-w-none -translate-x-1/2 select-none z-9999"
      />
    </section>
  );
}
