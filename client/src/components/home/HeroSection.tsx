import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowRight, Play } from "lucide-react";
import heroBackground from '@/assets/real-estate-hero-bg.jpg';
interface HeroSectionProps {
  onStartSearch: () => void;
}
const HeroSection = ({
  onStartSearch
}: HeroSectionProps) => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Real Estate Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroBackground})`
      }}></div>
        {/* Blue overlay gradient for real estate theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-blue-900/85"></div>
      </div>

      {/* Simplified Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 border-2 border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-16 h-16 border-2 border-white/10 rounded-lg rotate-45 animate-bounce" style={{
        animationDuration: '3s'
      }}></div>
        <div className="absolute bottom-32 left-40 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/10 rounded-lg rotate-12"></div>
        
        {/* Blue glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 blue-glow rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 blue-glow rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Bhada.in Brand Badge */}
          

          {/* Bhada.in Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up font-display">
            Property for Sale & Rent in India
            <span className="block text-transparent bg-gradient-to-r from-blue-200 to-white bg-clip-text mt-2">
              Bhada.in Real Estate
            </span>
          </h1>

          {/* Bhada.in Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
            Find your dream home with Bhada.in - Search houses for sale, apartments for rent, plots, and commercial properties with verified owners and agents
          </p>

          {/* Clean CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{
          animationDelay: '0.6s'
        }}>
            <Button onClick={onStartSearch} size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <Search className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Start Searching
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <Play className="w-5 h-5 mr-3" />
              Watch Demo
            </Button>
          </div>

          {/* Simplified Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{
          animationDelay: '0.9s'
        }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-200 text-sm md:text-base">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-blue-200 text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 text-sm md:text-base">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;