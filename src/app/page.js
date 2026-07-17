import Hero from "@/components/homepage/hero/Hero";
import MarqueeSection from "@/components/homepage/marquee/MarqueeSection";
import StatsClientsSection from "@/components/homepage/stats-clients/StatsClientsSection";
import VideoSection from "@/components/homepage/video/VideoSection";
import ProblemSection from "@/components/homepage/problem/ProblemSection";
import ScaleNotStrategy from "@/components/homepage/why-linkedin/ScaleNotStrategy";
import WhyLinkedInSection from "@/components/homepage/why-linkedin/WhyLinkedInSection";
import BeanstalkSystemSection from "@/components/homepage/beanstalk/BeanstalkSystemSection";
import ProjectsSection from "@/components/homepage/projects/ProjectsSection";
import PricingSection from "@/components/homepage/pricing/PricingSection";
import FlywheelSection from "@/components/homepage/flywheel/FlywheelSection";
import TestimonialsSection from "@/components/homepage/testimonials/TestimonialsSection";
import DiscoveryCallSection from "@/components/homepage/discovery-call/DiscoveryCallSection";
import CastleSection from "@/components/homepage/castle/CastleSection";

export const metadata = {
  title: "SPKRHED",
  description:
    "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.",
  openGraph: {
    title: "SPKRHED",
    description:
      "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.",
    images: ["/images/Home/hero-banner.png"],
  },
};




export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <StatsClientsSection />
      <VideoSection />
      <ProblemSection />
      <WhyLinkedInSection />
      <ScaleNotStrategy />
      <BeanstalkSystemSection />
      <ProjectsSection />
      <PricingSection />
      <FlywheelSection />
      <TestimonialsSection />
      <DiscoveryCallSection />
      <CastleSection />
    </>
  );
}
