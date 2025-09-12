
import { Search, Users, Award, Shield, Zap, Heart } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/40 relative overflow-hidden" aria-label="Why Choose Bhada.in - Our Key Features">
      {/* Mobile-optimized Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-gradient-to-tl from-blue-300/30 to-blue-400/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-5 border border-blue-200">
            <Zap className="w-3 h-3" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Bhada</span><span className="text-blue-500">.in</span>?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We provide a comprehensive platform that makes property search and management simple, efficient, and delightful for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Smart Search Feature */}
          <article className="group relative" role="article" aria-labelledby="smart-search-title">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-blue-100/60 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105">
              <div className="relative mb-4 sm:mb-5 md:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>
              <h3 id="smart-search-title" className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">Smart Property Search</h3>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                Advanced AI-powered filters and machine learning recommendations to find exactly what you're looking for with precision across India.
              </p>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>AI Powered Search</span>
                </div>
              </div>
            </div>
          </article>

          {/* Trusted Community Feature */}
          <article className="group relative" role="article" aria-labelledby="trusted-community-title">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-blue-100/60 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105">
              <div className="relative mb-4 sm:mb-5 md:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Shield className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>
              <h3 id="trusted-community-title" className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">Trusted Community</h3>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                Connect with verified property owners and trusted real estate professionals in our secure ecosystem across all major Indian cities.
              </p>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>100% Verified Users</span>
                </div>
              </div>
            </div>
          </article>

          {/* Best Deals Feature */}
          <article className="group relative" role="article" aria-labelledby="best-deals-title">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-blue-800/20 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-blue-100/60 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105">
              <div className="relative mb-4 sm:mb-5 md:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>
              <h3 id="best-deals-title" className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">Best Property Deals</h3>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                Get exclusive access to premium properties and the most competitive deals in the Indian real estate market before anyone else.
              </p>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-xs">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Exclusive Access</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Mobile-responsive Additional Features */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { icon: Shield, title: "24/7 Support", desc: "Round-the-clock assistance", ariaLabel: "24/7 customer support available" },
            { icon: Zap, title: "Quick Verification", desc: "Instant property validation", ariaLabel: "Fast property verification process" },
            { icon: Heart, title: "Customer First", desc: "Your satisfaction matters", ariaLabel: "Customer satisfaction is our priority" },
            { icon: Award, title: "Award Winning", desc: "Industry recognized platform", ariaLabel: "Award-winning real estate platform" }
          ].map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-all duration-300" role="article" aria-label={feature.ariaLabel}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1 text-xs sm:text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
