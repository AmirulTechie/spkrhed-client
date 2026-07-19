import Image from "next/image";

function CardBlock({ block }) {
  if (block.aside) {
    return (
      <p className="font-poppins text-[clamp(9px,0.8333vw,12px)] leading-snug lg:leading-tight italic text-white/70 uppercase">
        {block.aside}
      </p>
    );
  }

  return (
    <div>
      <p className="font-poppins text-[clamp(11px,1.0417vw,15px)] leading-snug lg:leading-tight font-bold text-white uppercase">
        {block.label}
      </p>
      <p className="mt-[clamp(6px,0.4167vw,6px)] font-poppins text-[clamp(9px,0.9028vw,13px)] leading-snug lg:leading-tight text-white/70 uppercase">
        {block.detail}
      </p>
    </div>
  );
}

const HEADING_COLOR = {
  purple: "text-[#ac40ff]",
  white: "text-white",
};

export default function EngineCard({
  card,
  cardRef,
  variant = "back",
  className = "",
  style,
}) {
  const isBack = variant === "back";

  const maskStyle = {
    WebkitMaskImage: `url(${card.mask})`,
    maskImage: `url(${card.mask})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };

  return (
    <div
      ref={cardRef}
      className={`absolute rounded-[clamp(18px,2.1875vw,32px)] backdrop-blur-[5.5px] ${className}`}
      style={{ ...maskStyle, ...style }}
    >
      <Image
        src={card.shape}
        alt=""
        aria-hidden
        fill
        unoptimized
        sizes="(min-width: 1024px) 83vw, 90vw"
        className={`pointer-events-none rounded-[clamp(18px,2.1875vw,32px)] select-none ${isBack ? "opacity-20" : "opacity-50"}`}
        style={{ objectFit: "fill" }}
      />

      <div className="relative flex h-full flex-col p-[clamp(26px,3.6111vw,52px)]">
        <p className="font-poppins text-[clamp(11px,1.1111vw,16px)] font-semibold text-white">
          {card.eyebrow}
        </p>

        {/*
          The card's SVG mask cuts a diagonal notch out of the top-right
          corner (roughly the top 19% of height, right 58% of width — see
          foundation-card-mask.svg). A full-width heading's first line sits
          right in that band, so on mobile it needs enough top clearance to
          drop below the notch before going full-width; lg keeps the
          original 50%-width layout, which never reaches the notch.
        */}
        <h3 className="mt-12 max-w-full lg:mt-[clamp(8px,1.25vw,18px)] lg:max-w-[50%] font-anton-sc text-[clamp(24px,3.4722vw,50px)] leading-[1.15] lg:leading-[1.02] uppercase">
          {card.headingLines.map((line, index) => (
            <span
              key={index}
              className={`block ${HEADING_COLOR[line.color]}`}
            >
              {line.text}
            </span>
          ))}
        </h3>

        <p className="mt-[clamp(12px,1.3194vw,19px)] max-w-full lg:max-w-[51.6%] font-poppins text-[clamp(10px,1.0417vw,15px)] leading-relaxed lg:leading-tight text-white uppercase">
          {card.body}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-x-[clamp(24px,3.8889vw,56px)] pt-[clamp(16px,2.2222vw,32px)]">
          {card.columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col justify-end gap-[clamp(10px,1.25vw,18px)]"
            >
              {column.map((block, blockIndex) => (
                <CardBlock key={blockIndex} block={block} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
