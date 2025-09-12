import Layout from '@/components/layout/Layout';
import WalletOverview from '@/components/WalletOverview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet as WalletIcon, Gift, Share2, RefreshCw, Mail, Calendar, Check, ArrowRight, Home } from 'lucide-react';

const Wallet = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-r from-bhada-blue to-bhada-blue-light py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Bhada Wallet</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Manage your coins, view transactions, and redeem rewards with Bhada's integrated wallet system
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wallet Overview */}
            <div className="lg:col-span-2">
              <WalletOverview />
            </div>

            {/* Earning Options */}
            <div>
              <Card>
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Earn More Coins</CardTitle>
                  <CardDescription className="text-white/80">
                    Ways to increase your wallet balance
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    <li className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Daily Login</h4>
                          <p className="text-sm text-gray-500">+10 coins every day</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        Claimed
                      </Button>
                    </li>
                    <li className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Share2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Refer Friends</h4>
                          <p className="text-sm text-gray-500">+100 coins per referral</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Refer Now
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                    <li className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Gift className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Complete Profile</h4>
                          <p className="text-sm text-gray-500">+50 coins one-time</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-600">
                        Complete
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                    <li className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <RefreshCw className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Recharge Wallet</h4>
                          <p className="text-sm text-gray-500">Add coins via payment</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-600">
                        Recharge
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Spend Your Coins Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-bhada-blue mb-6">How to Use Your Coins</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="bg-gradient-to-r from-bhada-blue/10 to-bhada-blue/5">
                  <div className="mb-4 p-3 bg-bhada-blue text-white rounded-full w-fit">
                    <WalletIcon className="h-6 w-6" />
                  </div>
                  <CardTitle>Contact Property Owners</CardTitle>
                  <CardDescription>
                    Spend coins to reveal contact information of property owners and agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>50 coins per property owner contact</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Access phone number and email</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Unlimited messaging through platform</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-bhada-blue hover:bg-bhada-blue-light">
                    Browse Properties
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gradient-to-r from-bhada-orange/10 to-bhada-orange/5">
                  <div className="mb-4 p-3 bg-bhada-orange text-white rounded-full w-fit">
                    <Home className="h-6 w-6" />
                  </div>
                  <CardTitle>List Your Properties</CardTitle>
                  <CardDescription>
                    Use coins to list your properties for rent or sale on Bhada.in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>100 coins per property listing</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>30 days active listing period</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Upload up to 10 property photos</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-bhada-orange hover:bg-bhada-orange-light">
                    List Property
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/5">
                  <div className="mb-4 p-3 bg-green-600 text-white rounded-full w-fit">
                    <Check className="h-6 w-6" />
                  </div>
                  <CardTitle>Access Verified Listings</CardTitle>
                  <CardDescription>
                    Spend coins to unlock premium verified property listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>25 coins per verified listing view</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Physically verified properties</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Authentic images and details</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                    View Verified Listings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Wallet;
