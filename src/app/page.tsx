import VideoHero from "@/components/home/VideoHero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProductsCarousel from "@/components/home/FeaturedProductsCarousel";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ShopByCategory from "@/components/home/ShopByCategory";
import SupplyChainTimeline from "@/components/home/SupplyChainTimeline";
import B2BCtaBanner from "@/components/home/B2BCtaBanner";
import LivingTrustTree from "@/components/home/LivingTrustTree";
import MangoSeasonUnlock from "@/components/home/MangoSeasonUnlock";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <VideoHero />
      <TrustBar />
      <WhyChooseSection />
      <ShopByCategory />
      <SupplyChainTimeline />
      <B2BCtaBanner />
      <LivingTrustTree />
      <MangoSeasonUnlock />
    </div>
  );
}
