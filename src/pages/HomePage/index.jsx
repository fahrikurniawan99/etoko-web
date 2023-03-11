import HeroSection from "./parts/HeroSection";
import ShopByCategory from "./parts/ShopByCategory";
import Story from "./parts/Story";
import OurFeatured from "./parts/OurFeatured";
import FinalStock from "./parts/FinalStock";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ShopByCategory />
      <Story />
      <OurFeatured />
      <FinalStock />
    </>
  );
}
