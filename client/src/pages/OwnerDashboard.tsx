import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Settings, LogOut, User, Plus, Wallet, Building, TrendingUp, BarChart3, Coins, Calendar, Eye, Star, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import OwnerProfile from "@/components/owner/OwnerProfile";
import { useAppDispatch } from "@/store/hooks/redux";
import { logout } from "@/store/slices/auth.slice";
interface OwnerData {
  isLoggedIn: boolean;
  email: string;
  fullName: string;
  role: string;
  coins: number;
}
const OwnerDashboard = () => {
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('Checking owner authentication...');
    const storedData = localStorage.getItem("owner_auth");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        console.log('Found owner data:', parsed);
        if (parsed.isLoggedIn && parsed.role === "owner") {
          setOwnerData(parsed);
          console.log('Owner authenticated successfully');
        } else {
          console.log('Invalid owner data, redirecting to home');
          navigate("/");
        }
      } catch (error) {
        console.error('Error parsing owner data:', error);
        navigate("/");
      }
    } else {
      console.log('No owner data found, redirecting to home');
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    console.log('Logging out owner...');
    dispatch(logout())
    localStorage.removeItem("owner_auth");
    navigate("/");
  };
  if (!ownerData) {
    return <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading owner dashboard...</p>
      </div>;
  }
  const properties = JSON.parse(localStorage.getItem('owner_properties') || '[]');

  return <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-slate-50 to-blue-100/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/10 rounded-full"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-4xl font-bold mb-2">Welcome back, {ownerData.fullName}!</h1>
                  <p className="text-blue-100 text-lg">Manage your property business with ease</p>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                      <Building size={20} />
                      <span className="font-medium">{properties.length} Properties</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                      <Coins size={20} />
                      <span className="font-medium">{ownerData.coins} Coins</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button onClick={() => navigate('/list-property')} className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="mr-2" size={18} />
                    Add New Property
                  </Button>
                  <Button onClick={handleLogout} variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-lg rounded-2xl p-2 border border-blue-100 px-[7px] py-0 my-[15px] mx-[5px]">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-semibold transition-all duration-300 py-[8px] my-0 mx-[2px] px-[20px]">
                <BarChart3 size={18} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-semibold transition-all duration-300">
                <Building size={18} />
                Properties
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white font-semibold transition-all duration-300">
                <User size={18} />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Total Properties</p>
                        <p className="text-3xl font-bold text-blue-800">{properties.length}</p>
                      </div>
                      <div className="p-3 bg-blue-600 rounded-xl">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Active Listings</p>
                        <p className="text-3xl font-bold text-green-800">{properties.length}</p>
                      </div>
                      <div className="p-3 bg-green-600 rounded-xl">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">Total Views</p>
                        <p className="text-3xl font-bold text-purple-800">2,340</p>
                      </div>
                      <div className="p-3 bg-purple-600 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Coins Balance</p>
                        <p className="text-3xl font-bold text-gray-800">{ownerData.coins}</p>
                      </div>
                      <div className="p-3 bg-gray-600 rounded-xl">
                        <Coins className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Property listing viewed 15 times today</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">New inquiry received for luxury apartment</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Profile updated successfully</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button onClick={() => navigate('/list-property')} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl">
                        <Plus className="mr-2" size={18} />
                        List New Property
                      </Button>
                      <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl">
                        <Eye className="mr-2" size={18} />
                        View Analytics
                      </Button>
                      <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl">
                        <Settings className="mr-2" size={18} />
                        Account Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="w-full">
              <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Building className="w-6 h-6" />
                      Your Properties
                    </span>
                    <Button onClick={() => navigate('/list-property')} className="bg-white text-indigo-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold">
                      <Plus className="mr-2" size={16} />
                      Add Property
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-indigo-100">
                    Manage all your property listings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {properties.length === 0 ? <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building className="w-12 h-12 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">No Properties Listed</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Start growing your property business by adding your first listing
                      </p>
                      <Button onClick={() => navigate('/list-property')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Plus className="mr-2" size={18} />
                        List Your First Property
                      </Button>
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {properties.map((property: any, index: number) => <Card key={index} className="border border-blue-100 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{property.title}</h4>
                            <p className="text-gray-600 mb-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              {property.location}
                            </p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                              ₹{property.price}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="w-full">
              <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                <OwnerProfile ownerData={ownerData} />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>;
};
export default OwnerDashboard;