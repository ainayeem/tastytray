import CtaSection from "@/components/modules/home/ctaSection";
import FeatureSection from "@/components/modules/home/featureSection";
import HeroSection from "@/components/modules/home/heroSection";
import PopularMeals from "@/components/modules/home/popularMeals";
import Testimonials from "@/components/modules/home/testimonials";
import WorkSection from "@/components/modules/home/workSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <WorkSection />
      <PopularMeals />
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default HomePage;
