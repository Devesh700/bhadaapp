
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, ArrowUp, ArrowDown } from 'lucide-react';

// Mock transaction data
const mockTransactions = [
  { id: 't1', type: 'credit', amount: 100, description: 'Sign-up bonus', date: '2023-10-15' },
  { id: 't2', type: 'credit', amount: 50, description: 'Daily login bonus', date: '2023-10-16' },
  { id: 't3', type: 'credit', amount: 200, description: 'Referral bonus', date: '2023-10-18' },
  { id: 't4', type: 'debit', amount: 50, description: 'Contact property owner', date: '2023-10-20' },
  { id: 't5', type: 'debit', amount: 100, description: 'Property listing', date: '2023-10-22' },
];

const WalletOverview = () => {
  const [activeTab, setActiveTab] = useState('balance');
  
  // Calculate total balance
  const totalBalance = mockTransactions.reduce((total, transaction) => {
    return transaction.type === 'credit' 
      ? total + transaction.amount 
      : total - transaction.amount;
  }, 0);

  return (
    <Card className="shadow-property overflow-hidden">
      <CardHeader className="wallet-card-gradient text-white rounded-t-xl">
        <CardTitle className="flex items-center text-2xl font-display">
          <Wallet className="mr-2" />
          Wallet Balance
        </CardTitle>
        <CardDescription className="text-white/80">
          Your current balance and transactions
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="balance" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="balance" className="flex-1">Balance</TabsTrigger>
            <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-4">
          <TabsContent value="balance">
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-bhada-blue mb-2">
                {totalBalance} <span className="text-2xl">coins</span>
              </div>
              <p className="text-gray-500 mb-6">
                Use your coins to contact property owners or list your properties
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg hover-scale">
                  <p className="text-green-700 text-sm font-medium mb-1">Daily Login</p>
                  <p className="text-green-800 font-bold text-xl">+10 coins</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg hover-scale">
                  <p className="text-blue-700 text-sm font-medium mb-1">Referral Bonus</p>
                  <p className="text-blue-800 font-bold text-xl">+100 coins</p>
                </div>
              </div>
              
              <Button className="bg-bhada-orange hover:bg-bhada-orange-light w-full font-medium">
                Recharge Wallet
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <div className="space-y-3 py-2">
              {mockTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} coins
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="bg-gray-50 rounded-b-lg">
        <p className="text-sm text-gray-500 w-full text-center">
          Need help with your wallet? <a href="/support" className="text-bhada-blue hover:underline">Contact Support</a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default WalletOverview;
