
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import AuthModal from "@/components/auth/AuthModal";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedPropertiesSection from "@/components/home/FeaturedPropertiesSection";
import CitiesSection from "@/components/home/CitiesSection";
import RewardsSection from "@/components/home/RewardsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import { useLoading } from "@/contexts/LoadingContext";
import { useAppDispatch } from "@/store/hooks/redux";
import { showAuthModal } from "@/store/slices/partials.slice";

const Index = () => {
  const dispatch = useAppDispatch();
  // const [showAuthModal, setShowAuthModal] = useState(false);
  const { setIsLoading, setLoadingText } = useLoading();

  useEffect(() => {
    // Show initial loading for home page content
    setIsLoading(true);
    setLoadingText('Loading Bhada.in...');
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsLoading, setLoadingText]);

  return (
    <Layout>
      <div>
        <HeroSection onStartSearch={() => dispatch(showAuthModal())} />
        <FeaturesSection />
        <FeaturedPropertiesSection />
        <CitiesSection />
        <RewardsSection />
        <ReviewsSection />
      </div>

      {/* Auth Modal */}
      {/* <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab="register"
      /> */}
    </Layout>
  );
};

export default Index;
