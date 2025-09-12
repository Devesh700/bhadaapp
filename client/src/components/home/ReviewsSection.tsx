
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart, ThumbsUp, CheckCircle } from "lucide-react";

// Enhanced reviews data with SEO content
const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Property Owner",
    rating: 5,
    comment: "Excellent platform! Listed my property and got genuine buyers within a week. The verification process is very thorough and professional.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    location: "Mumbai",
    verified: true,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Tenant",
    rating: 5,
    comment: "Found my dream apartment through Bhada.in. The search filters are amazing and all properties are verified. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b665?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    location: "Bangalore",
    verified: true,
    gradient: "from-blue-600 to-blue-700"
  },
  {
    id: 3,
    name: "Arjun Mehta",
    role: "Buyer",
    rating: 4,
    comment: "Great experience buying my first home. The team was very supportive and the process was transparent throughout the journey.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    location: "Delhi",
    verified: true,
    gradient: "from-blue-700 to-blue-800"
  }
];

const ReviewsSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/40 relative overflow-hidden" aria-label="Customer Reviews and Testimonials - Real Experiences">
      {/* Mobile-optimized Background Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] bg-gradient-to-br from-blue-200/20 via-blue-300/20 to-blue-400/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] bg-gradient-to-tl from-blue-200/20 via-blue-300/20 to-blue-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-blue-200 shadow-lg animate-bounce">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse text-blue-500" />
            <span>Customer Love</span>
            <ThumbsUp className="w-2 h-2 sm:w-3 sm:h-3 animate-bounce" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            What Our <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">Customers</span> Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real feedback from property owners, tenants, and buyers who have experienced our platform and found their perfect homes across India.
          </p>
        </div>

        {/* Mobile-responsive Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {reviews.map((review, index) => (
            <Card 
              key={review.id}
              className="bg-white/95 backdrop-blur-md border border-blue-100/60 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 hover:rotate-1 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
              role="article"
              aria-label={`Customer review by ${review.name} from ${review.location}`}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardContent className="p-3 sm:p-4 md:p-6 relative z-10">
                {/* Mobile-optimized User Info */}
                <div className="flex items-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={review.avatar} 
                      alt={`${review.name} profile picture`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 ring-blue-200"
                      loading="lazy"
                    />
                    {review.verified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-600 font-medium">{review.role}</p>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
                
                {/* Mobile-optimized Rating Display */}
                <div className="flex items-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < review.rating 
                          ? 'text-blue-400 fill-blue-400' 
                          : 'text-gray-300'
                      } group-hover:animate-pulse transition-colors duration-300`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-gray-600">({review.rating}.0)</span>
                </div>
                
                {/* Mobile-optimized Quote */}
                <div className="relative mb-3 sm:mb-4">
                  <Quote className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-200 absolute -top-1 sm:-top-2 -left-1 sm:-left-2 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <p className="text-gray-700 italic pl-4 sm:pl-5 md:pl-6 leading-relaxed text-xs sm:text-sm group-hover:text-gray-800 transition-colors duration-300">
                    "{review.comment}"
                  </p>
                </div>

                {/* Floating Heart Animation */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile-optimized Overall Rating Display */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-center relative z-10">
              <div className="text-2xl sm:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">4.8</div>
              <div className="flex items-center justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200 fill-blue-200 group-hover:animate-pulse" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <div className="text-blue-100 text-xs font-medium">Average Rating</div>
            </div>
            
            <div className="text-left relative z-10">
              <div className="font-bold text-sm sm:text-base md:text-lg mb-1">Excellent Rating</div>
              <div className="text-blue-100 text-xs sm:text-sm">Based on 15,000+ verified reviews</div>
              <div className="text-blue-200 text-xs mt-1 hidden sm:block">From real customers across India</div>
            </div>
            
            <div className="relative z-10">
              <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:animate-bounce" />
            </div>
          </div>
        </div>

        {/* Mobile-responsive Customer Stats */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { number: "15K+", label: "Reviews", icon: Star, ariaLabel: "15,000+ customer reviews" },
            { number: "98%", label: "Satisfaction", icon: Heart, ariaLabel: "98% customer satisfaction rate" },
            { number: "25K+", label: "Happy Customers", icon: ThumbsUp, ariaLabel: "25,000+ happy customers" },
            { number: "4.8", label: "Average Rating", icon: CheckCircle, ariaLabel: "4.8 out of 5 average rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-all duration-300" role="article" aria-label={stat.ariaLabel}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-xs font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
