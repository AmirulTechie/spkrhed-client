import Image from "next/image";

const CARD_BASE =
  "flex flex-col overflow-hidden rounded-[clamp(9px,0.86vw,12px)] p-[clamp(20px,2.3611vw,34px)]";

const QUOTE_CLASS =
  "font-poppins text-[clamp(15px,1.4583vw,21px)] font-semibold leading-[1.1]";
const NAME_CLASS = "font-poppins text-[clamp(12px,0.9722vw,14px)] font-medium leading-[1.1]";
const ROLE_CLASS = "font-poppins text-[clamp(11px,0.9028vw,13px)] leading-[1.1]";

function MudCityLogo({ className }) {
  return (
    <svg viewBox="0 0 57.0252 9.67682" className={className} aria-hidden="true">
      <path
        d="M51.6148 1.14572V6.02285H53.1496C54.2812 6.02285 54.9168 4.8926 54.9168 3.70042C54.9168 2.32244 54.0797 1.14572 52.576 1.14572H51.6148ZM51.6148 6.17767V9.52198H51.2738C50.6382 9.52198 49.9096 9.39811 49.9096 8.45366V0.990905H52.5605C55.3819 0.990905 56.7771 2.36888 56.7771 3.70042C56.7771 4.73777 55.9865 5.74416 54.5138 6.0693C54.9634 6.10026 55.2424 6.31702 55.5214 6.81247L57.0252 9.52198H56.0485C55.3354 9.52198 54.9323 9.19685 54.6533 8.73236L53.5681 6.85892C53.2271 6.28605 53.1341 6.17767 52.576 6.17767H51.6148ZM48.8089 0.990905V2.5392C48.4679 1.85795 48.0028 1.14572 46.7936 1.14572H46.1115V9.52198H45.7705C45.1349 9.52198 44.4063 9.39811 44.4063 8.45366V1.14572H43.7242C42.515 1.14572 42.0499 1.85795 41.7089 2.5392V0.990905H48.8089ZM38.9185 5.10934L34.9189 5.12484V9.52198H34.5778C33.9422 9.52198 33.2136 9.39811 33.2136 8.45366V0.990905H33.5547C34.1903 0.990905 34.9189 1.09927 34.9189 2.05921V4.97L38.9185 4.95453V0.990905H39.2595C39.8951 0.975423 40.6237 1.09927 40.6237 2.05921V9.52198H40.2982C39.6471 9.52198 38.9185 9.39811 38.9185 8.45366V5.10934ZM28.1986 9.52198L31.7952 0H31.9657L28.3692 9.52198H28.1986ZM23.2302 1.14572H22.0055V9.36714H23.2302C24.6409 9.36714 25.571 7.23052 25.571 5.24871C25.5555 3.26689 24.6254 1.14572 23.2302 1.14572ZM20.3157 0.990905H23.2302C26.0206 0.990905 27.4158 3.03465 27.4313 5.24871C27.4313 7.46276 26.0361 9.52198 23.2302 9.52198H20.3002L20.3157 0.990905ZM16.4789 9.52198C17.9361 9.52198 18.8973 8.84073 18.8973 6.56474V0.990905H19.0523V6.56474C19.0523 8.91814 18.0912 9.67682 16.3859 9.67682C13.6265 9.67682 12.7119 8.59301 12.7119 6.37895V0.990905H13.0684C13.704 0.990905 14.4171 1.09927 14.4171 2.05921V6.37895C14.4171 8.51559 14.9442 9.52198 16.4789 9.52198ZM9.37886 1.90439L11.9368 9.52198H10.9136C10.2005 9.52198 10.061 9.27425 9.82844 8.593L7.84415 2.64756L6.1234 8.25237L6.66596 9.52198H5.72032C5.00722 9.52198 4.69719 9.30522 4.43365 8.65494L2.01528 2.63209L0.155009 9.52198L0 9.53746L1.89128 2.36888L1.20918 0.990905H2.26332C2.99193 0.990905 3.30198 1.20766 3.55001 1.85794L6.03039 8.05111L8.1852 0.990905H8.30922C9.02233 1.00639 9.14633 1.23863 9.37886 1.90439Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FintekLogo({ className }) {
  return (
    <svg viewBox="0 0 51.7776 9.2433" className={className} aria-hidden="true">
      <path
        d="M43.3676 0H45.7162V4.90035H46.3131L48.367 2.69406H51.3048L48.1965 5.7055L51.7776 9.11946H48.6229L46.3207 6.55704H45.724V9.11946H43.3754V0H43.3676ZM39.3835 5.0397L39.3525 4.83071C39.3137 4.62169 39.213 4.45137 39.0503 4.34299C38.8875 4.21913 38.6704 4.16491 38.3836 4.16491L37.4768 4.13396C37.1357 4.13396 36.8412 4.14168 36.6086 4.16491C36.2753 4.16491 36.0118 4.24236 35.818 4.39719C35.6242 4.55202 35.5312 4.76875 35.5312 5.04744H39.3835V5.0397ZM35.6009 6.67318C35.6009 7.15315 35.8103 7.45505 36.2288 7.57892C36.5156 7.65633 36.9186 7.69501 37.4224 7.69501C37.593 7.69501 37.7713 7.69501 37.9573 7.69501C38.1433 7.69501 38.3449 7.67955 38.5619 7.67181C38.7867 7.67181 38.9727 7.60989 39.1045 7.49377C39.2362 7.37765 39.3292 7.19956 39.3757 6.97506H41.7244V7.09895C41.7244 7.56344 41.5926 7.96598 41.329 8.29887C41.0733 8.63949 40.7323 8.864 40.3059 8.98787C40.0346 9.06528 39.6548 9.13495 39.1664 9.17365C38.6781 9.21236 38.0968 9.2433 37.4147 9.2433C36.6938 9.2433 36.0583 9.20462 35.5157 9.12721C34.322 8.96464 33.6167 8.3608 33.3841 7.33118C33.3376 7.12216 33.3066 6.91315 33.2756 6.70413C33.2523 6.48737 33.2369 6.26286 33.2369 6.02288C33.2369 5.38808 33.2911 4.85391 33.3919 4.42039C33.5314 3.80881 33.8182 3.36755 34.26 3.11208C34.5546 2.94951 34.9653 2.81791 35.4847 2.73276C36.004 2.6476 36.6551 2.60117 37.438 2.60117C38.5929 2.60117 39.4068 2.65533 39.8718 2.76371C40.8097 2.95724 41.3755 3.47592 41.577 4.312C41.6158 4.47457 41.6469 4.61394 41.6624 4.72232C41.6779 4.82296 41.6856 4.95456 41.6856 5.10939L41.7244 5.89903V6.42545H35.5854V6.68863L35.6009 6.67318ZM25.7493 2.69406V1.19996H28.0979V2.69406H31.8339V4.35074H28.0979V6.61123C28.0979 6.90541 28.1521 7.10666 28.2606 7.21504C28.3691 7.32342 28.5706 7.37763 28.8807 7.37763L29.3303 7.35438C29.5086 7.35438 29.6481 7.29245 29.7489 7.16085C29.8574 7.0215 29.9116 6.83572 29.9116 6.59574L29.9427 6.30156H32.1052V6.66543C32.1052 7.09895 32.0587 7.46277 31.9657 7.74921C31.7797 8.3453 31.3843 8.77108 30.7798 9.01107C30.3844 9.1659 29.7953 9.2356 29.0047 9.2356C27.1599 9.2356 26.1136 8.83301 25.8733 8.03564L25.819 7.78795C25.7958 7.68731 25.7803 7.5789 25.7725 7.46277C25.7648 7.33891 25.757 7.2383 25.757 7.15315V4.36619H24.5013V2.70951H25.757L25.7493 2.69406ZM17.1997 2.69406V4.18815C17.2307 4.07977 17.254 4.01783 17.2617 3.98687C17.2695 3.9559 17.2928 3.90944 17.3315 3.83203C17.5253 3.32109 17.8896 2.97275 18.4244 2.78695C18.6104 2.72502 18.8275 2.67082 19.0833 2.63211C19.3391 2.59341 19.6336 2.57792 19.9746 2.57792C21.2768 2.57792 22.1915 2.84887 22.7263 3.39851C23.0364 3.72365 23.2457 4.16493 23.3464 4.72232C23.3774 4.90811 23.4007 5.10937 23.4162 5.33387C23.4317 5.55838 23.4394 5.8448 23.4394 6.19316V9.10396H21.0908V6.10802C21.0908 5.46548 20.959 5.03973 20.6878 4.83071C20.4165 4.62169 19.9747 4.52103 19.3546 4.52103C18.4942 4.52103 17.9283 4.65264 17.657 4.9081C17.347 5.21776 17.192 5.68999 17.192 6.30931V9.10396H14.8434V2.67856H17.192L17.1997 2.69406ZM13.1692 0V1.80377H10.7043V0H13.1692ZM13.1149 2.69406V9.11946H10.7663V2.69406H13.1149ZM9.51057 0.0387451V2.15215H2.76712V3.89398H9.13853V6.00738H2.76712V9.11171H0V0.0309961H9.51833L9.51057 0.0387451Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 53 53" className={className} aria-hidden="true">
      <path
        d="M23.8145 15.2626C21.1516 13.5681 17.667 15.4809 17.667 18.6373V34.9806C17.667 38.1369 21.1516 40.0498 23.8145 38.3552L36.6556 30.1836C39.1256 28.6118 39.1256 25.0061 36.6556 23.4343L23.8145 15.2626Z"
        fill="currentColor"
      />
    </svg>
  );
}

const TESTIMONIALS = [
  {
    id: "zarar",
    left: "16.6%",
    variant: "light",
    quote:
      "“Speakerhead doesn't sell you content or outreach. They sell you a pipeline. Different game entirely.”",
    name: "Zarar Alie",
    role: "Co-Founder",
    logo: <MudCityLogo className="h-auto w-[clamp(40px,3.9583vw,57px)] text-[#101010]" />,
  },
  {
    id: "mark",
    left: "48.46%",
    variant: "video",
    quote:
      "“First month I stopped checking my inbox in panic. By month three I was turning prospects away. This is a different game.”",
    name: "Mark Allen",
    role: "Founder · B2B SaaS",
    thumbnail: "/images/Home/mark-allen-client.png",
    logo: <FintekLogo className="h-auto w-[clamp(36px,3.5972vw,52px)] text-[#2F2F2F]" />,
  },
  {
    id: "marco",
    left: "80.33%",
    variant: "dark",
    quote:
      "“Speakerhead doesn't sell you content or outreach. They sell you a pipeline. Different game entirely.”",
    name: "Marco Sung Jr.",
    role: "Managing Partner · Consulting",
  },
];

const VARIANT_CLASSES = {
  light: "bg-[#D9D9D9]/81 text-black",
  video: "bg-[#AC40FF] text-black",
  dark: "border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl backdrop-saturate-150",
};

const ROLE_OPACITY = {
  light: "text-black/70",
  video: "text-black/70",
  dark: "text-white/70",
};

const VARIANT_ASPECT = {
  light: "lg:aspect-440/324",
  video: "lg:aspect-440/521",
  dark: "lg:aspect-440/324",
};

function TestimonialCard({ testimonial, className = "", style }) {
  const { variant, quote, name, role, logo, thumbnail } = testimonial;

  return (
    <div
      style={style}
      className={`${CARD_BASE} ${VARIANT_ASPECT[variant]} ${VARIANT_CLASSES[variant]} ${className}`}
      data-testimonial={testimonial.id}
    >
      {variant === "video" && (
        <div className="relative mb-[clamp(8px,0.9028vw,13px)] aspect-402/287 w-full overflow-hidden rounded-[clamp(7px,0.6597vw,9.5px)]">
          <Image src={thumbnail} alt={name} fill className="object-cover" />
          <span className="absolute inset-0 m-auto flex h-[clamp(40px,4.7917vw,69px)] w-[clamp(40px,4.7917vw,69px)] items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
            <PlayIcon className="h-[clamp(30px,3.6806vw,53px)] w-[clamp(30px,3.6806vw,53px)] translate-x-[6%] text-white" />
          </span>
        </div>
      )}

      <p className={QUOTE_CLASS}>{quote}</p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-[clamp(16px,1.9444vw,28px)]">
        <div>
          <p className={NAME_CLASS}>{name}</p>
          <p className={`${ROLE_CLASS} ${ROLE_OPACITY[variant]}`}>{role}</p>
        </div>
        {logo}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-[clamp(64px,9.7222vw,140px)]">
      <Image
        src="/images/Home/small-spots.png"
        alt=""
        width={2880}
        height={1596}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-90"
      />

      <Image
        src="/images/Home/tree-branch-1.png"
        alt=""
        width={1615}
        height={2396}
        className="pointer-events-none absolute -left-[30%] top-[8%] z-0 w-[40%] max-w-none select-none rotate-30 "
      />

      <Image
        src="/images/Home/leaf.png"
        alt=""
        width={200}
        height={148}
        className="pointer-events-none absolute bottom-[6%] right-[20%] z-20 w-[7%] rotate-340 select-none opacity-90"
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
          <span className="font-poppins text-[clamp(20px,2.6389vw,38px)] font-semibold uppercase text-[#b7b7b7]">
            Testimonials
          </span>
        </div>

        <h2 className="mx-auto mt-[clamp(16px,1.875vw,27px)] max-w-217 font-anton-sc text-[clamp(32px,6.8056vw,98px)] uppercase leading-[1.02] text-white">
          In Their <span className="text-[#ac40ff]">Own Voice.</span>
        </h2>

        <p className="mx-auto mt-[clamp(8px,1.1806vw,17px)] max-w-176 font-poppins text-[clamp(15px,1.5278vw,22px)] text-white/60">
          Founders, agencies, and enterprise teams who joined the movement.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-[clamp(40px,4.9306vw,71px)] hidden aspect-1440/521 w-full max-w-360 lg:block">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            className="absolute top-0 w-[clamp(230px,30.5736vw,440px)]"
            style={{ left: testimonial.left }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-10 flex max-w-160 flex-col gap-6 px-[clamp(20px,3.1944vw,46px)] lg:hidden">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} className="w-full" />
        ))}
      </div>
    </section>
  );
}
