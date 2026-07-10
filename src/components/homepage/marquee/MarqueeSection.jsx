"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const PHRASES = [
  "Personal Branding",
  "Inbound Funnels",
  "Content Creation",
  "LinkedIn Lead Generation",
];

function Star() {
  return (
    <Image
      src="/images/Home/marquee-star.png"
      alt=""
      width={60}
      height={60}
      className="mx-6 h-6 w-6 shrink-0 sm:mx-8 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
    />
  );
}

function MarqueeRow({ items, direction }) {
  return (
    <Marquee autoFill speed={60} direction={direction} pauseOnHover={true}>
      {items.map((text, index) => (
        <span
          key={`${text}-${index}`}
          className="flex items-center whitespace-nowrap font-anton-sc text-[40px] uppercase leading-none text-white sm:text-[64px] lg:text-[100px]"
        >
          {text}
          <Star />
        </span>
      ))}
    </Marquee>
  );
}

export default function MarqueeSection() {
  const rowTwo = [...PHRASES.slice(1), PHRASES[0]];

  return (
    <section className="overflow-hidden bg-black py-5">
      <MarqueeRow items={PHRASES} direction="left" />
      <MarqueeRow items={rowTwo} direction="right" />
    </section>
  );
}
