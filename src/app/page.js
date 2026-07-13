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
    </>
  );
}
