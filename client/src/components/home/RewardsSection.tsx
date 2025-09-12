
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, TrendingUp, Gift, Coins, Shield, Award, Star, Zap, Crown } from "lucide-react";

const RewardsSection = () => {
  const rewardCards = [
    {
      icon: Users,
      title: "Registration Bonus",
      coins: 100,
      description: "Get 100 coins for successful registration on our platform",
      gradient: "from-blue-500 to-blue-600",
      animation: "hover:rotate-3"
    },
    {
      icon: Building2,
      title: "Property Listing",
      coins: 250,
      description: "Earn 250 coins for each verified property listing",
      gradient: "from-blue-600 to-blue-700",
      animation: "hover:-rotate-2"
    },
    {
      icon: TrendingUp,
      title: "Successful Deal",
      coins: 500,
      description: "Get 500 coins for successful property transactions",
      gradient: "from-blue-700 to-blue-800",
      animation: "hover:rotate-1"
    },
    {
      icon: Gift,
      title: "Referral Bonus",
      coins: 150,
      description: "Earn 150 coins for each successful referral",
      gradient: "from-blue-800 to-blue-900",
      animation: "hover:-rotate-3"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Premium Listings",
      description: "Use coins to feature your property listings at the top",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    },
    {
      icon: Award,
      title: "Exclusive Access",
      description: "Get early access to premium properties and deals",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    },
    {
      icon: Gift,
      title: "Redeem Rewards",
      description: "Convert coins to cash rewards and vouchers",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50/40 via-white to-blue-100/30 relative overflow-hidden" aria-label="Bhada.in Rewards and Coin System - Earn While You Search">
      {/* Mobile-optimized Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-bl from-blue-200/20 via-blue-300/20 to-blue-400/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-gradient-to-tr from-blue-200/20 to-blue-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-blue-200 shadow-lg">
            <Coins className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce" />
            <span>Earn & Redeem</span>
            <Star className="w-2 h-2 sm:w-3 sm:h-3 animate-pulse" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">Rewards</span> & Coin System
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Earn coins for every action on our platform and unlock exclusive benefits, rewards, and premium features in Indian real estate.
          </p>
        </div>

        {/* Mobile-responsive Reward Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
          {rewardCards.map((reward, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${reward.gradient} text-white border-0 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 ${reward.animation} group relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="article"
              aria-label={`${reward.title}: Earn ${reward.coins} coins`}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-white/30 rounded-full transform translate-x-8 sm:translate-x-12 -translate-y-8 sm:-translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-white/20 rounded-full transform -translate-x-6 sm:-translate-x-8 translate-y-6 sm:translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <CardContent className="p-3 sm:p-4 md:p-6 text-center relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <reward.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:animate-pulse" />
                </div>
                
                <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3">{reward.title}</h3>
                
                <div className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 flex items-center justify-center gap-1">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
                  <span className="group-hover:scale-110 transition-transform duration-300">{reward.coins}</span>
                </div>
                
                <p className="text-blue-100 leading-relaxed text-xs sm:text-sm">{reward.description}</p>

                {/* Floating Elements */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile-optimized "What can you do with coins?" Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-blue-200 shadow-lg">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 animate-bounce" />
            <span>What can you do with coins?</span>
            <Zap className="w-2 h-2 sm:w-3 sm:h-3 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {benefits.map((benefit, index) => (
            <article 
              key={index}
              className={`group p-3 sm:p-4 md:p-6 ${benefit.bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-white/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 ${benefit.hoverColor} relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.2}s` }}
              role="article"
              aria-label={`${benefit.title}: ${benefit.description}`}
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 rounded-full transform translate-x-8 sm:translate-x-12 -translate-y-8 sm:-translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${benefit.color} bg-white rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
                </div>
                
                <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base group-hover:text-base sm:group-hover:text-lg transition-all duration-300">{benefit.title}</h4>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{benefit.description}</p>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 ${benefit.color.replace('text-', 'bg-').replace('-600', '-400')} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl sm:rounded-2xl`}></div>
            </article>
          ))}
        </div>

        {/* Mobile-optimized Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer group relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <Coins className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
              </div>
              
              <div className="text-left">
                <div className="font-bold text-sm sm:text-base md:text-lg">Start Earning Coins Today!</div>
                <div className="text-blue-100 text-xs sm:text-sm">Join our rewards program and unlock exclusive benefits</div>
              </div>
              
              <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
