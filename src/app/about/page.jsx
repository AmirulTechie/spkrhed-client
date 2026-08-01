import AboutHero from "@/components/about/AboutHero";
import MovementSection from "@/components/about/MovementSection";
import OldestGrowthStorySection from "@/components/about/OldestGrowthStorySection";
import FirstStepBannerSection from "@/components/about/FirstStepBannerSection";
import ThreePrinciplesSection from "@/components/about/ThreePrinciplesSection";
import TakeFirstStepSection from "@/components/about/TakeFirstStepSection";

const DESCRIPTION =
  "The story behind SPKRHED: why we swapped agency theater for real conversations, and the principles that guide how we grow companies on LinkedIn.";

export const metadata = {
  title: "About",
  description: DESCRIPTION,
  openGraph: {
    title: "About | SPKRHED",
    description: DESCRIPTION,
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
