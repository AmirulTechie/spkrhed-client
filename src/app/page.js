import Hero from "@/components/homepage/hero/Hero";
import MarqueeSection from "@/components/homepage/marquee/MarqueeSection";
import StatsClientsSection from "@/components/homepage/stats-clients/StatsClientsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <StatsClientsSection />
    </>
  );
}
