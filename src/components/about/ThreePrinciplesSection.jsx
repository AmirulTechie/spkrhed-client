import Image from "next/image";

const CARD_TITLE_CLASS =
  "font-poppins text-[clamp(24px,3.75vw,54px)] font-semibold uppercase leading-[0.93] text-white";
const CARD_BODY_CLASS =
  "font-poppins text-[clamp(9px,0.7639vw,11px)] uppercase leading-[1.09] text-white/50";
const CARD_QUOTE_CLASS =
  "font-poppins text-[clamp(13px,1.25vw,18px)] font-medium uppercase leading-[1.22] text-white";
const CARD_ATTRIBUTION_CLASS =
  "font-poppins text-[clamp(13px,1.3194vw,19px)] uppercase leading-[1.16] text-white/60";
const NUMBER_CLASS =
  "absolute pointer-events-none select-none bg-linear-to-b from-[rgba(255,255,255,0.12)] to-transparent bg-clip-text font-anton-sc text-[clamp(76px,18.4722vw,266px)] leading-none text-transparent";

const PRINCIPLES = [
  {
    id: "conscious-collaboration",
    digits: "01",
    align: "left",
    box: { left: "47.29%", top: "29.24%", width: "43.75%", height: "21.92%" },
    numberBox: { left: "20.21%", top: "34.92%" },
    title: { left: "49.93%", top: "30.89%", width: "31.39%" },
    body: { left: "49.93%", top: "37.48%", width: "34.58%" },
    quote: { left: "49.93%", top: "41.03%", width: "38.47%" },
    attribution: { left: "49.93%", top: "48.17%" },
    titleText: "Conscious Collaboration",
    bodyText:
      "At SPKRHED, we treat active listening as a superpower. Understanding you, your buyer and your market is the cornerstone of every strategic decision we make and every word we send in your name.",
    quoteText:
      "“To learn through listening, practice it naively and actively. Naively means that you listen openly, ready to learn something. Listening actively means acknowledging what you hear and acting accordingly.”",
    attributionText: "Betsy Sanders, Nordstrom",
  },
  {
    id: "purposeful-process",
    digits: "02",
    align: "right",
    box: { left: "9.58%", top: "53.66%", width: "43.75%", height: "21.92%" },
    numberBox: { left: "57.01%", top: "59.34%" },
    title: { left: "18.61%", top: "55.98%", width: "31.39%" },
    body: { left: "15.42%", top: "62.58%", width: "34.58%" },
    quote: { left: "11.53%", top: "66.12%", width: "38.47%" },
    attribution: { left: "40.28%", top: "71.92%" },
    titleText: "Purposeful Process",
    bodyText:
      "We carry your message with exacting detail and deploy every tool in our arsenal to land it. Your core principles and your company culture are the foundation we build on, never an afterthought.",
    quoteText:
      "“It’s only when companies are clear about their purpose, have clearly communicated it, and are understood by the team that they can achieve both unity of effort and distributed decision-making.”",
    attributionText: "Marc Koehler",
  },
  {
    id: "exceeded-expectations",
    digits: "03",
    align: "left",
    box: { left: "47.29%", top: "78.08%", width: "43.75%", height: "21.92%" },
    numberBox: { left: "14.375%", top: "83.76%" },
    title: { left: "49.93%", top: "81.07%", width: "31.39%" },
    body: { left: "49.93%", top: "87.67%", width: "34.58%" },
    quote: { left: "49.93%", top: "91.21%", width: "38.47%" },
    attribution: { left: "49.93%", top: "95.66%" },
    titleText: "Exceeded Expectations",
    bodyText:
      "Your complete satisfaction is our first priority. In a world where attention is the whole game, we would rather build something genuinely worth talking about than shout about something that is not.",
    quoteText:
      "“In the old world, you devoted 30% of your time to building a great service and 70% of your time to shouting about it. In the new world, that inverts.”",
    attributionText: "Jeff Bezos",
  },
];

export default function ThreePrinciplesSection() {
  const newLocal = "block  w-[824px] h-36 bg-gradient-to-r from-purple-500 to-stone-950/0";
  return (
    <section className="relative aspect-1440/1638 w-full overflow-hidden bg-black">
      <div className="absolute left-[39.9%] top-[0.98%] size-[clamp(8px,0.9028vw,13px)]">
        <Image src="/images/about/holds-together-icon.png" alt="" fill className="object-contain" />
      </div>
      <p className="absolute left-[40.22%] top-0 whitespace-nowrap font-poppins text-[clamp(16px,2.0833vw,30px)] font-medium uppercase leading-[normal] text-[rgba(122,122,122,0.4)]">
        What holds it together
      </p>

      <p className="absolute left-[17.08%] top-[3.36%] w-[65.9%] text-center font-anton-sc text-[clamp(40px,9.7222vw,140px)] uppercase leading-none text-white flex flex-col justify-center items-center">
        <span className="block">Three principles.</span>
        <span className={newLocal}>No exceptions.</span>
      </p>

      <p className="absolute left-[32%] top-[17.06%] max-w-175.75 text-center font-poppins text-[clamp(14px,1.6667vw,24px)] uppercase leading-none text-white">
        Everything we do runs through these. They are how the movement keeps
        its promise, on every account, every day.
      </p>

      {PRINCIPLES.map((principle) => (
        <div key={principle.id}>
          <div
            aria-hidden
            className="absolute rounded-[25px] border border-[#353535]"
            style={principle.box}
          />

          <p aria-hidden className={NUMBER_CLASS} style={principle.numberBox}>
            {principle.digits}
          </p>

          <p
            className={`absolute ${CARD_TITLE_CLASS} ${
              principle.align === "right" ? "text-right" : "text-left"
            }`}
            style={principle.title}
          >
            {principle.titleText}
          </p>

          <p
            className={`absolute ${CARD_BODY_CLASS} ${
              principle.align === "right" ? "text-right" : "text-left"
            }`}
            style={principle.body}
          >
            {principle.bodyText}
          </p>

          <p
            className={`absolute ${CARD_QUOTE_CLASS} ${
              principle.align === "right" ? "text-right" : "text-left"
            }`}
            style={principle.quote}
          >
            {principle.quoteText}
          </p>

          <p
            className={`absolute whitespace-nowrap ${CARD_ATTRIBUTION_CLASS} ${
              principle.align === "right" ? "text-right" : "text-left"
            }`}
            style={principle.attribution}
          >
            {principle.attributionText}
          </p>
        </div>
      ))}
    </section>
  );
}
