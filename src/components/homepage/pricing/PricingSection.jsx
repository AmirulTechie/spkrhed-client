import Image from "next/image";

const TIERS = [
  {
    badge: "SEED",
    name: "SPROUT",
    description: "Founders & consultants planting the first row.",
    features: [
      "Profile transformation & positioning",
      "8 posts / month, fully written",
      "5,000 outbound DMs / month",
      "A/B tested message sequences",
      "~15-20 qualified calls / month target",
      "Monthly performance report",
    ],
    cta: "START GROWING",
    highlight: false,
  },
  {
    badge: "GIANT",
    name: "BEANSTALK",
    description: "Agencies & growing teams ready to scale past referrals.",
    features: [
      "12 posts + 2 carousels / month",
      "10,000 outbound DMs / month",
      "Lead magnet + landing page build",
      "Advanced ICP targeting & segmentation",
      "5-step email nurture sequence",
      "Bi-weekly strategy calls",
      "Full pipeline dashboard",
      "~30-40 qualified calls / month target",
    ],
    cta: "BOOK A CALL",
    highlight: true,
    mostPopular: true,
  },
  {
    badge: "SKY-HIGH",
    name: "GOLDEN GIANT",
    description: "Scale-stage founders ready to make referrals optional.",
    features: [
      "Unlimited content production",
      "Custom outreach volume",
      "Multiple lead magnets + funnels",
      "7-step automated email nurture",
      "Newsletter & thought-leadership ghostwriting",
      "Weekly strategy calls — priority support",
      "Dedicated account strategist",
      "~50-70 qualified calls / month target",
    ],
    cta: "LET'S SCALE",
    highlight: false,
  },
  {
    badge: "CLOUD",
    name: "CLOUD KINGDOM",
    description:
      "Enterprise & PE-backed platforms the seat at the top of the beanstalk.",
    features: [
      "Full Beanstalk System™ deployed end-to-end",
      "Whole executive team LinkedIn presence",
      "AI voice agent & missed-call recovery",
      "Multi-location territory management",
      "Watchtower revenue intelligence",
      "Performance Creative Lab — paid ad assets at tempo",
      "Custom AI operating system",
      "Executive briefing cadence",
    ],
    cta: "BUILD YOUR CASTLE",
    highlight: false,
  },
];

function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.75 8.25L6.75 10.25L11.25 5.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PricingCard({ tier }) {
  const highlight = tier.highlight;

  return (
    // no vertical translate — all four cards share the same top edge, per Figma
    <div className="relative h-full">
      {tier.mostPopular && (
        // Flush against the card top, single line, no gap between tag and card.
        // -top value must equal this element's own rendered height for a seamless join.
        <div className="absolute -top-[clamp(22px,1.8056vw,26px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-t-[10px] bg-[#F0F0EA] px-[clamp(16px,1.3889vw,20px)] py-[clamp(6px,0.4861vw,7px)]">
          <span className="font-poppins text-[clamp(10px,0.9028vw,13px)] font-semibold uppercase leading-none text-[#101010]">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`flex h-full flex-col rounded-[10px] p-[clamp(16px,1.3889vw,20px)] ${
          highlight
            ? "border-[3px] border-[#F0F0EA] bg-[#AC40FF]"
            : "bg-white"
        }`}
      >
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-black px-[clamp(8px,0.6944vw,10px)] py-[clamp(4px,0.3889vw,6px)]">
          <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#AC40FF]" />
          <span
            className={`font-poppins text-[clamp(11px,1.0417vw,15px)] font-semibold leading-none ${
              highlight ? "text-[#AC40FF]" : "text-white"
            }`}
          >
            {tier.badge}
          </span>
        </span>

        <h3 className="mt-[clamp(10px,0.9375vw,13px)] font-anton-sc text-[clamp(20px,1.8056vw,26px)] uppercase leading-[0.97] text-black">
          {tier.name}
        </h3>
        <p className="mt-1 font-poppins text-[12px] leading-[0.97] text-black">
          {tier.description}
        </p>

        <div className="mt-[clamp(10px,0.9028vw,13px)] border-t border-black/15" />

        <ul className="mt-[clamp(20px,2.2222vw,32px)] flex flex-1 flex-col gap-[clamp(12px,1.25vw,18px)]">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <CheckIcon
                className={`mt-0.5 h-[clamp(14px,1.1972vw,17px)] w-[clamp(14px,1.1972vw,17px)] shrink-0 ${
                  highlight ? "text-black" : "text-[#AC40FF]"
                }`}
              />
              <span className="font-poppins text-[clamp(11px,0.8333vw,12px)] font-medium leading-[1.2] text-black/70">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`mt-3 w-full rounded-lg py-[clamp(8px,0.7546vw,11px)] font-poppins text-[clamp(16px,1.6667vw,20px)] font-semibold uppercase cursor-pointer ${
            highlight ? "bg-black text-[#AC40FF]" : "bg-[#AC40FF] text-black"
          }`}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden py-[clamp(64px,9.7222vw,140px)]">
      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -left-120 -top-90 w-[50%] select-none opacity-90 rotate-45"
      />

      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -right-100 -top-60 w-[50%] -scale-x-100 select-none opacity-90"
      />

      <div className="relative mx-auto max-w-325 px-[clamp(24px,5.0694vw,73px)]">
        <h2 className="mx-auto max-w-4xl text-center font-anton-sc text-[clamp(32px,6.25vw,90px)] uppercase leading-[0.97] text-white">
          Pick Your Beanstalk.
        </h2>

        <p className="mx-auto mt-[clamp(16px,1.875vw,27px)] max-w-3xl text-center font-poppins text-[clamp(15px,1.3194vw,19px)] leading-[0.97] text-white">
          Four service tiers, each one a different rung up the beanstalk.
          Every tier ships with content, outreach, and pipeline systems baked
          in — because one without the other leaves money on the table.
        </p>

        {/* mt-top gives room for the "Most Popular" tag that sits above the Beanstalk card */}
        <div className="mt-[clamp(32px,3.2639vw,47px)] grid grid-cols-1 items-stretch gap-[clamp(8px,0.6944vw,10px)] sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}