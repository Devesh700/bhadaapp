
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowUp, ArrowDown, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RechargeModal from './RechargeModal';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

const VendorWallet = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load wallet data from localStorage
    const savedBalance = localStorage.getItem('vendor_wallet_balance');
    const savedTransactions = localStorage.getItem('vendor_wallet_transactions');
    
    if (savedBalance) {
      setWalletBalance(parseInt(savedBalance));
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Initialize with some sample transactions
      const initialTransactions: Transaction[] = [
        {
          id: 't1',
          type: 'credit',
          amount: 500,
          description: 'Welcome bonus',
          date: new Date().toISOString()
        }
      ];
      setTransactions(initialTransactions);
      localStorage.setItem('vendor_wallet_transactions', JSON.stringify(initialTransactions));
      setWalletBalance(500);
      localStorage.setItem('vendor_wallet_balance', '500');
    }
  }, []);

  const handleRechargeSuccess = (amount: number, planName: string) => {
    const newBalance = walletBalance + amount;
    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      type: 'credit',
      amount,
      description: `Wallet recharge - ${planName}`,
      date: new Date().toISOString()
    };

    setWalletBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    
    localStorage.setItem('vendor_wallet_balance', newBalance.toString());
    localStorage.setItem('vendor_wallet_transactions', JSON.stringify([newTransaction, ...transactions]));
    
    setShowRechargeModal(false);
    toast({
      title: "Recharge Successful!",
      description: `Your wallet has been recharged with ${amount} points.`,
    });
  };

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wallet size={24} />
          Vendor Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="balance" className="flex items-center gap-2">
              <Wallet size={16} />
              Balance
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <ArrowUp size={16} />
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balance">
            <div className="space-y-6">
              {/* Wallet Balance Card */}
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl font-bold text-orange-600 mb-2">
                    {walletBalance.toLocaleString()}
                  </div>
                  <p className="text-orange-700 text-lg mb-4">Points Available</p>
                  <Button 
                    onClick={() => setShowRechargeModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Recharge Wallet
                  </Button>
                </CardContent>
              </Card>

              {/* Usage Information */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">How to Use Your Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Property Listing</p>
                        <p className="text-sm text-gray-600">100 points per listing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Featured Listing</p>
                        <p className="text-sm text-gray-600">200 points per month</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Premium Photos</p>
                        <p className="text-sm text-gray-600">50 points per photo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Contact Leads</p>
                        <p className="text-sm text-gray-600">25 points per contact</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No transactions yet</p>
                  ) : (
                    transactions.map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'credit' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? 
                              <ArrowUp size={16} /> : 
                              <ArrowDown size={16} />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} points
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>

      <RechargeModal 
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        onSuccess={handleRechargeSuccess}
      />
    </>
  );
};

export default VendorWallet;
