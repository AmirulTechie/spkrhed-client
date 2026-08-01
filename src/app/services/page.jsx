import ServicesHero from "@/components/services/ServicesHero";
import GrowthEngineSection from "@/components/services/GrowthEngineSection";
import WhyNowClimbSection from "@/components/services/WhyNowClimbSection";
import FoundationAmplifySection from "@/components/services/FoundationAmplifySection";
import PickYourBeanstalkSection from "@/components/services/PickYourBeanstalkSection";

const DESCRIPTION =
  "LinkedIn content and authority, outreach, and pipeline reporting — the growth engine SPKRHED builds and runs for you, end to end.";

export const metadata = {
  title: "Services",
  description: DESCRIPTION,
  openGraph: {
    title: "Services | SPKRHED",
    description: DESCRIPTION,
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