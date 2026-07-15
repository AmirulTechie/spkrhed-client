import ServicesHero from "@/components/services/ServicesHero";
import GrowthEngineSection from "@/components/services/GrowthEngineSection";
import WhyNowClimbSection from "@/components/services/WhyNowClimbSection";
import FoundationAmplifySection from "@/components/services/FoundationAmplifySection";
import PickYourBeanstalkSection from "@/components/services/PickYourBeanstalkSection";

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