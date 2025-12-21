import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { getProperty } from "@/store/thunks/property.thunk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import {
  MapPin, Bed, Bath, Square, Car, Wifi, Shield,
  Dumbbell, Waves, Home, Star, Phone, Mail,
  User, Coins, Lock, Unlock, Eye, Calendar, Heart
} from "lucide-react";
import { selectUser } from "@/store/selectors/auth.selector";
import { getMe } from "@/store/thunks/auth.thunk";

const PropertyView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { selectedProperty: property, loading } = useAppSelector((state) => state.property);
  const user = useAppSelector(selectUser);

  const [contactUnlocked, setContactUnlocked] = useState(false);
  const [userCoins, setUserCoins] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getProperty(id));
    }

    // Fetch user auth info from localStorage
    // const authData = localStorage.getItem("user_auth") || localStorage.getItem("owner_auth");
    // if (authData) {
    //   const userData = JSON.parse(authData);
    //   setUserCoins(userData.coins || 0);
    // }
    if(!user) {
        dispatch(getMe());
    }
  }, [dispatch, id]);

  useEffect( () => {
    if(user?._id === property?.owner?._id) {
        setContactUnlocked(true);
    }
  },[user,property])

  const handleUnlockContact = () => {
    if (user.wallet.coins < 10) {
      toast({
        title: "Insufficient Coins",
        description: "You need at least 10 coins to unlock contact details.",
        variant: "destructive",
      });
      return;
    }

    // Deduct coins in localStorage
    const authData = localStorage.getItem("user_auth") || localStorage.getItem("owner_auth");
    if (authData) {
      const userData = JSON.parse(authData);
      userData.coins = (userData.coins || 0) - 10;

      if (localStorage.getItem("user_auth")) {
        localStorage.setItem("user_auth", JSON.stringify(userData));
      } else {
        localStorage.setItem("owner_auth", JSON.stringify(userData));
      }

      setUserCoins(userData.coins);
      setContactUnlocked(true);

      toast({
        title: "Contact Unlocked!",
        description: "You can now view the owner's contact details.",
      });
    }
  };

  if (loading || !property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading property details...</p>
        </div>
      </Layout>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    "Parking": Car,
    "Wi-Fi": Wifi,
    "Security": Shield,
    "Gym": Dumbbell,
    "Swimming Pool": Waves,
    "Garden": Home
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ← Back to Properties
          </Button>

          {/* Existing UI Template */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden shadow-xl border-0">
                <div className="relative">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-96 object-cover"
                  />
                  <Badge 
                    className={`absolute top-4 left-4 font-medium px-4 py-2 shadow-lg ${
                      property.propertyType === 'rent' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                    }`}
                  >
                    {property.propertyType === 'rent' ? 'For Rent' : 'For Sale'}
                  </Badge>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                    <Eye className="w-4 h-4 inline mr-1" />
                    {property.images.length} Photos
                  </div>
                </div>
              </Card>

              {/* Property Details */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                        {property.title}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="text-lg">{property.location.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ₹{property.price.toLocaleString()}
                      </div>
                      {property.propertyType === 'rent' && (
                        <span className="text-gray-500">/month</span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {property.specifications.bedrooms && (
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <Bed className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="font-bold text-gray-800">{property.specifications.bedrooms}</div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                      </div>
                    )}
                    {property.specifications.bathrooms && (
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <Bath className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="font-bold text-gray-800">{property.specifications.bathrooms}</div>
                        <div className="text-sm text-gray-600">Bathrooms</div>
                      </div>
                    )}
                    {property.specifications.area && (
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                        <Square className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-bold text-gray-800">{property.specifications.area}</div>
                        <div className="text-sm text-gray-600">sq.ft</div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.specifications.amenities.map((amenity, index) => {
                        const IconComponent = amenityIcons[amenity] || Home;
                        return (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-700 font-medium">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Owner Details */}
            <div className="space-y-6">
              {/* User Coins Display */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-6 h-6 text-amber-600" />
                    <span className="text-lg font-bold text-gray-800">Your Coins: {user.wallet.coins}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Details Card */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Property Owner
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{property.owner.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {/* <Star className="w-5 h-5 text-yellow-500 fill-current" /> */}
                      {/* <span className="font-medium text-gray-700">{property.owner.rating}</span> */}
                      {/* <span className="text-gray-500 text-sm">(125 reviews)</span> */}
                    </div>
                  </div>

                  {/* Contact Details - Locked/Unlocked */}
                  <div className="space-y-4">
                    {!contactUnlocked ? (
                      <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <h4 className="font-bold text-gray-800 mb-2">Contact Details Locked</h4>
                        <p className="text-gray-600 text-sm mb-4">
                          Unlock owner's contact details to get in touch
                        </p>
                        <Button
                          onClick={handleUnlockContact}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          Unlock for 10 Coins
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                          <Unlock className="w-5 h-5" />
                          <span className="font-medium">Contact Details Unlocked!</span>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="flex items-center gap-3 mb-3">
                            <Phone className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="text-sm text-gray-600">Phone</div>
                              <div className="font-medium text-gray-800">{property.owner.phone}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="text-sm text-gray-600">Email</div>
                              <div className="font-medium text-gray-800">{property.owner.email}</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Property Posted Date */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Posted 5 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interest Button */}
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Show Interest
              </Button>
            </div>
          </div>
          {/* ... keep the same UI structure from your template ... */}
        </div>
      </div>
    </Layout>
  );
};

export default PropertyView;
