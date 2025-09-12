
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, Smartphone, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RechargePlan {
  id: string;
  name: string;
  points: number;
  price: number;
  popular?: boolean;
  savings?: string;
}

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, planName: string) => void;
}

const rechargePlans: RechargePlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    points: 100,
    price: 500,
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    points: 500,
    price: 1200,
    popular: true,
    savings: 'Save ₹1300'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    points: 3000,
    price: 1500,
    savings: 'Save ₹13500'
  }
];

const RechargeModal = ({ isOpen, onClose, onSuccess }: RechargeModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [upiId, setUpiId] = useState('');
  const [paymentStep, setPaymentStep] = useState<'plan' | 'payment' | 'processing' | 'success'>('plan');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const selectedPlanData = rechargePlans.find(plan => plan.id === selectedPlan);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "Choose a recharge plan to continue.",
        variant: "destructive"
      });
      return;
    }
    setPaymentStep('payment');
  };

  const handleUpiPayment = () => {
    if (!upiId.trim()) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setIsProcessing(false);
      
      // Call success callback after a short delay
      setTimeout(() => {
        if (selectedPlanData) {
          onSuccess(selectedPlanData.points, selectedPlanData.name);
        }
        handleClose();
      }, 2000);
    }, 3000);
  };

  const handleClose = () => {
    setSelectedPlan('');
    setUpiId('');
    setPaymentStep('plan');
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Recharge Your Wallet
          </DialogTitle>
        </DialogHeader>

        {paymentStep === 'plan' && (
          <div className="space-y-6">
            <p className="text-center text-gray-600">
              Choose a recharge plan that suits your needs
            </p>
            
            <RadioGroup value={selectedPlan} onValueChange={handlePlanSelect}>
              <div className="grid gap-4">
                {rechargePlans.map((plan) => (
                  <div key={plan.id} className="relative">
                    <Label
                      htmlFor={plan.id}
                      className="cursor-pointer"
                    >
                      <Card className={`transition-all duration-200 hover:shadow-lg ${
                        selectedPlan === plan.id 
                          ? 'ring-2 ring-orange-500 bg-orange-50' 
                          : 'hover:shadow-md'
                      }`}>
                        {plan.popular && (
                          <Badge className="absolute -top-2 left-4 bg-orange-500 text-white">
                            Most Popular
                          </Badge>
                        )}
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <RadioGroupItem value={plan.id} id={plan.id} />
                              <div>
                                <h3 className="text-lg font-semibold">{plan.name}</h3>
                                <p className="text-gray-600">
                                  {plan.points.toLocaleString()} Points
                                </p>
                                {plan.savings && (
                                  <Badge variant="secondary" className="mt-1 text-green-600">
                                    {plan.savings}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-orange-600">
                                ₹{plan.price}
                              </div>
                              <div className="text-sm text-gray-500">
                                ₹{(plan.price / plan.points).toFixed(2)} per point
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <Button 
              onClick={handleProceedToPayment}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg py-6"
              disabled={!selectedPlan}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Payment
            </Button>
          </div>
        )}

        {paymentStep === 'payment' && selectedPlanData && (
          <div className="space-y-6">
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  Selected Plan: {selectedPlanData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-lg">{selectedPlanData.points.toLocaleString()} Points</span>
                  <span className="text-2xl font-bold text-orange-600">₹{selectedPlanData.price}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  UPI Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="upiId">Enter UPI ID</Label>
                  <Input
                    id="upiId"
                    type="text"
                    placeholder="yourname@paytm / yourname@googlepay"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Supported UPI Apps:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Google Pay</Badge>
                    <Badge variant="outline">PhonePe</Badge>
                    <Badge variant="outline">Paytm</Badge>
                    <Badge variant="outline">BHIM</Badge>
                    <Badge variant="outline">Amazon Pay</Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setPaymentStep('plan')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleUpiPayment}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    disabled={!upiId.trim()}
                  >
                    Pay ₹{selectedPlanData.price}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div className="text-center py-12">
            <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold mb-2">Processing Payment...</h3>
            <p className="text-gray-600">Please wait while we process your UPI payment</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              This usually takes 10-30 seconds
            </div>
          </div>
        )}

        {paymentStep === 'success' && selectedPlanData && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-600">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              {selectedPlanData.points.toLocaleString()} points have been added to your wallet
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                Transaction will be visible in your wallet shortly
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RechargeModal;
