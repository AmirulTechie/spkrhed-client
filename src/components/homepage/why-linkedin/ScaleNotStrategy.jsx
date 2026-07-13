import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ScaleNotStrategy() {
  return (
    <section className="relative overflow-hidden bg-black py-[clamp(72px,12.5vw,180px)]">
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-70"
      />

      <Image
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute left-[8%] top-[4%] w-[clamp(56px,10.1vw,146px)] -rotate-16 select-none"
      />
      <Image
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute left-[46%] top-[38%] w-[clamp(40px,6.9vw,99px)] rotate-201 opacity-70 blur-[2px] select-none"
      />
      <Image
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute right-[8%] top-[62%] w-[clamp(24px,3.9vw,56px)] rotate-142 select-none"
      />

      <h2 className="relative mx-auto max-w-145 px-6 text-center font-anton-sc text-[clamp(40px,8.4vw,121px)] uppercase leading-none text-white">
        The problem is{" "}
        <span className="inline-flex flex-wrap items-center justify-center gap-x-[0.12em] text-[#AC40FF]">
          <span>{"{"}</span>
          <span>Scale</span>
          <ArrowUpRight
            strokeWidth={3}
            className="inline-block h-[0.72em] w-[0.72em] shrink-0"
          />
          <span>{"},"}</span>
        </span>{" "}
        not strategy.
      </h2>
    </section>
  );
}
