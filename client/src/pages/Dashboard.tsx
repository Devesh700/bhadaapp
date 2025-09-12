
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Settings, LogOut, CreditCard, Calendar, User, Users, Bell, TrendingUp, BarChart3, Search, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { User as IUser } from "@/store/types/auth.type";
import { logout } from "@/store/slices/auth.slice";
import { showAuthModal } from "@/store/slices/partials.slice";

interface UserData {
  isLoggedIn: boolean;
  userType: "user" | "owner" | "admin";
  email: string;
  fullName: string;
  coins: number;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
   
  const {user} = useAppSelector(state=> state.auth)
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    debugger;
    // Get user data from localStorage
    const storedData = localStorage.getItem("token");
    if (user) {
      setUserData(user);
    } else {
      // navigate("/login");
      dispatch(showAuthModal());
      navigate(-1);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const menuItems = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      gradient: "from-teal-500 to-cyan-500",
      description: "Overview & Activity"
    },
    {
      value: "properties",
      label: "Properties",
      icon: Home,
      gradient: "from-emerald-500 to-green-500",
      description: "Find Your Home"
    },
    {
      value: "settings",
      label: "Settings",
      icon: Settings,
      gradient: "from-blue-500 to-indigo-500",
      description: "Account Settings"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Modern Sidebar */}
            <div className="w-full lg:w-80">
              {/* User Profile Card */}
              <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    <User size={28} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                  <p className="text-white/80 text-sm mb-4">{userData.email}</p>
                  <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <CreditCard size={16} />
                    <span className="text-sm font-medium">{userData.wallet.coins} Coins</span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setActiveTab(item.value)}
                    className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                      activeTab === item.value
                        ? 'transform scale-105 shadow-xl'
                        : 'hover:scale-102 hover:shadow-lg'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-${activeTab === item.value ? '100' : '0'} transition-opacity duration-300`}></div>
                    <div className={`relative bg-white/90 backdrop-blur-sm m-0.5 rounded-2xl p-4 transition-all duration-300 ${
                      activeTab === item.value ? 'bg-white/20 text-white' : 'hover:bg-white text-gray-700'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                          activeTab === item.value 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-r ' + item.gradient + ' text-white'
                        }`}>
                          <item.icon size={20} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-black">{item.label}</div>
                          <div className={`text-xs ${activeTab === item.value ? 'text-white/80' : 'text-gray-500'}`}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-102 hover:shadow-lg mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm m-0.5 rounded-2xl p-4 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white text-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white group-hover:bg-white/20 transition-all duration-300">
                        <LogOut size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-black">Logout</div>
                        <div className="text-xs text-gray-500 group-hover:text-white/80">
                          Sign out safely
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="flex-1">
              <Tabs value={activeTab} className="w-full">
                <TabsContent value="dashboard" className="w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                      <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                        <p className="text-white/80">Your property journey starts here</p>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 border border-yellow-200/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white">
                              <CreditCard size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Wallet</h3>
                              <p className="text-gray-600 text-sm">Current Balance</p>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-yellow-600 mb-2">{userData.wallet.coins}</div>
                          <div className="text-sm text-yellow-700">Coins Available</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                              <Calendar size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
                              <p className="text-gray-600 text-sm">Login Streak</p>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-green-600 mb-2">{userData.loginStats.totalLogins}</div>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <TrendingUp size={16} />
                            <span>Day Streak</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                              <Bell size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Alerts</h3>
                              <p className="text-gray-600 text-sm">Notifications</p>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-blue-600 mb-2">{"0"}</div>
                          <div className="text-sm text-blue-600">New Updates</div>
                        </div>
                      </div>

                      {/* Property Interest Section */}
                      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200/50">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                            <Heart size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">Property Interests</h3>
                            <p className="text-gray-600">Properties you've shown interest in</p>
                          </div>
                        </div>
                        
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={24} className="text-white" />
                          </div>
                          <p className="text-gray-500 mb-4">You haven't shown interest in any properties yet.</p>
                          <Button 
                            onClick={() => navigate('/properties/rent')}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Search className="mr-2" size={18} />
                            Browse Properties
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="properties" className="w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Find Properties</h1>
                        <p className="text-white/80">Discover your perfect home</p>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/properties/rent')}>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Home size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Rental Properties</h3>
                            <p className="text-gray-600 mb-4">Find your perfect rental home</p>
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                              Browse Rentals
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/properties/sale')}>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Home size={24} className="text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Properties for Sale</h3>
                            <p className="text-gray-600 mb-4">Find your dream home to buy</p>
                            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                              Browse Sales
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                        <p className="text-white/80">Manage your profile and preferences</p>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Settings size={24} className="text-white" />
                        </div>
                        <p className="text-gray-500">Account settings will be available here.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
