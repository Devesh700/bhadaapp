
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeGenerator = ({ property, isOpen, onClose }: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      // Create property details URL (you can adjust this URL based on your app structure)
      const propertyUrl = `${window.location.origin}/property/${property.id}`;
      
      // Using QR Server API to generate QR code
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(propertyUrl)}`;
      setQrCodeUrl(qrApiUrl);
      
      toast({
        title: "QR Code Generated!",
        description: "Your property QR code is ready to download.",
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return;
    
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${property.propertyTitle.replace(/\s+/g, '_')}_QR_Code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "QR Code Downloaded!",
        description: "You can now print and place it at your property gate.",
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Generate Property QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">{property.propertyTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">
              Generate a QR code for this property that visitors can scan to view details
            </p>
          </div>

          {!qrCodeUrl ? (
            <div className="text-center py-8">
              <Button 
                onClick={generateQRCode} 
                disabled={isGenerating}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                <img 
                  src={qrCodeUrl} 
                  alt="Property QR Code" 
                  className="w-64 h-64"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Scan this QR code to view property details
                </p>
                <Button 
                  onClick={downloadQRCode}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">How to use:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Download and print the QR code</li>
              <li>• Place it at your property gate or entrance</li>
              <li>• Visitors can scan to view property details instantly</li>
              <li>• Great for open houses and property viewings</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeGenerator;
