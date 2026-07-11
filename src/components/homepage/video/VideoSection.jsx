import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="bg-[#DDDDD5] rounded-4xl">
      <div className="relative aspect-1440/666 w-full overflow-hidden rounded-t-[clamp(24px,4vw,72px)]">
        <Image
  src="/images/Home/tree-branch-1.png"
  alt=""
  width={1615}
  height={2396}
  className="pointer-events-none absolute left-[-7%] top-[-20%] w-[55%] max-w-none select-none z-30"
/>
<Image
  src="/images/Home/tree-branch-3.png"
  alt=""
  width={1615}
  height={2396}
  className="pointer-events-none absolute left-[-10%] top-[40%] w-[35%] max-w-none select-none z-30"
/>
<Image
  src="/images/Home/tree-branch-2.png"
  alt=""
  width={2507}
  height={1943}
  className="pointer-events-none absolute right-[-32%] top-[-85%] w-[90%] max-w-none select-none z-30"
/>
<Image
  src="/images/Home/tree-branch-1.png"
  alt=""
  width={2507}
  height={1943}
  className="pointer-events-none absolute right-[-16%] top-[-30%] w-[55%] max-w-none select-none z-30"
/>
<Image
  src="/images/Home/cloud.png"
  alt=""
  width={3723}
  height={1164}
  className="pointer-events-none absolute bottom-[-35%] left-1/2 w-[115%] max-w-none -translate-x-1/2 select-none z-999"
/>

<div className="absolute left-1/2 top-1/2 aspect-850/452 w-[59.03%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[clamp(12px,2.2vw,32px)] z-10">
          <Image
            src="/images/Home/home-video-thumbnail.png"
            alt="Watch the story"
            fill
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 h-[clamp(32px,4.4vw,80px)] w-[clamp(32px,4.4vw,80px)] -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/Home/video-play-btn.png"
              alt=""
              fill
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
