
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Settings, LogOut, User, Plus, Wallet, Building, TrendingUp, BarChart3 } from "lucide-react";
import VendorLayout from "@/components/vendor/VendorLayout";
import ListedProperties from "@/components/vendor/ListedProperties";
import VendorProfile from "@/components/vendor/VendorProfile";
import VendorWallet from "@/components/vendor/VendorWallet";

interface VendorData {
  isLoggedIn: boolean;
  email: string;
  fullName: string;
  role: string;
}

const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState<VendorData | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Checking vendor authentication...');
    const storedData = localStorage.getItem("vendor_auth");
    
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        console.log('Found vendor data:', parsed);
        
        if (parsed.isLoggedIn && parsed.role === "vendor") {
          setVendorData(parsed);
          console.log('Vendor authenticated successfully');
        } else {
          console.log('Invalid vendor data, redirecting to login');
          navigate("/vendor/login");
        }
      } catch (error) {
        console.error('Error parsing vendor data:', error);
        navigate("/vendor/login");
      }
    } else {
      console.log('No vendor data found, redirecting to login');
      navigate("/vendor/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out vendor...');
    localStorage.removeItem("vendor_auth");
    navigate("/");
  };

  if (!vendorData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading vendor dashboard...</p>
      </div>
    );
  }

  const properties = JSON.parse(localStorage.getItem('vendor_properties') || '[]');

  const menuItems = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-500",
      description: "Overview & Analytics"
    },
    {
      value: "wallet",
      label: "Wallet",
      icon: Wallet,
      gradient: "from-green-500 to-emerald-500",
      description: "Manage Finances"
    },
    {
      value: "properties",
      label: "Properties",
      icon: Building,
      gradient: "from-blue-500 to-cyan-500",
      description: "Your Listings"
    },
    {
      value: "profile",
      label: "Profile",
      icon: User,
      gradient: "from-orange-500 to-red-500",
      description: "Account Settings"
    }
  ];

  return (
    <VendorLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Modern Sidebar */}
            <div className="w-full lg:w-80">
              {/* User Profile Card */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    <User size={28} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{vendorData.fullName}</h2>
                  <p className="text-white/80 text-sm mb-4">{vendorData.email}</p>
                  <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <Home size={16} />
                    <span className="text-sm font-medium">Vendor Panel</span>
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
                    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                      <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                        <p className="text-white/80">Track your property business performance</p>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
                              <Building size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Total Properties</h3>
                              <p className="text-gray-600 text-sm">Listed Properties</p>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-blue-600 mb-2">{properties.length}</div>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <TrendingUp size={16} />
                            <span>Active Listings</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl text-white">
                              <Plus size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                              <p className="text-gray-600 text-sm">Manage Properties</p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => navigate('/list-property')}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Plus className="mr-2" size={18} />
                            Add New Property
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="wallet" className="w-full">
                  <VendorWallet />
                </TabsContent>

                <TabsContent value="properties" className="w-full">
                  <ListedProperties />
                </TabsContent>

                <TabsContent value="profile" className="w-full">
                  <VendorProfile vendorData={vendorData} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
