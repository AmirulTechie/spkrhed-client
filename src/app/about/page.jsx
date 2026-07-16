import AboutHero from "@/components/about/AboutHero";
import MovementSection from "@/components/about/MovementSection";
import OldestGrowthStorySection from "@/components/about/OldestGrowthStorySection";
import FirstStepBannerSection from "@/components/about/FirstStepBannerSection";
import ThreePrinciplesSection from "@/components/about/ThreePrinciplesSection";
import TakeFirstStepSection from "@/components/about/TakeFirstStepSection";

export const metadata = {
  title: "About | SPKRHED",
  description:
    "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.",
  openGraph: {
    title: "About | SPKRHED",
    description:
      "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.",
    images: ["/images/about/about-hero.png"],
  },
};

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <MovementSection />
      <OldestGrowthStorySection />
      <FirstStepBannerSection />
      <ThreePrinciplesSection />
      <TakeFirstStepSection />
    </>
  );
};

export default AboutPage;
