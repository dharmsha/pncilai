import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Hero/HeroSection';
import OurProduct from '@/components/Products/OurProducts';
import PopupForm from '@/components/Form/PopupForm';
import ProductShowcase from'@/components/Products/ProductShowcase';
import TopDugitalBoard from '@/components/Blog/TopDigitalBoards';
import MissionSection from '@/components/Mission/MissionSection';
import FeatureHighlights from '@/components/Products/FeatureHighlights';
import Calls from '@/components/Call/Calls';
import VoiceSearch from "@/components/VoiceSearch";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ProductShowcase/>
      <VoiceSearch />
      <Calls/>
      <OurProduct />
      <FeatureHighlights/>
      <MissionSection/>
      <TopDugitalBoard/>
       
      <PopupForm />
    </Layout>
  );
}
