import ServicesHero from "@/components/services/ServicesHero";
import GrowthEngineSection from "@/components/services/GrowthEngineSection";
import WhyNowClimbSection from "@/components/services/WhyNowClimbSection";
import FoundationAmplifySection from "@/components/services/FoundationAmplifySection";
import PickYourBeanstalkSection from "@/components/services/PickYourBeanstalkSection";

export const metadata = {
  title: "Services | SPKRHED",
  description:
    "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.",
  openGraph: {
    title: "Services | SPKRHED",
    description:
      "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.",
    images: ["/images/services/services-banner.png"],
  },
};


export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <GrowthEngineSection />
      <FoundationAmplifySection />
      <WhyNowClimbSection />
      <PickYourBeanstalkSection />
    </>
  );
}