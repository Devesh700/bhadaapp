
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface VendorLayoutProps {
  children: ReactNode;
}

const VendorLayout = ({ children }: VendorLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/vendor/dashboard" className="text-2xl font-bold hover:scale-105 transition-transform">
              <span className="text-blue-600">Bhada</span>
              <span className="text-orange-500">.in</span>
              <span className="text-sm text-gray-600 ml-2 bg-gradient-to-r from-blue-100 to-orange-100 px-3 py-1 rounded-full">
                Vendor Panel
              </span>
            </Link>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 underline hover:bg-blue-50 px-3 py-2 rounded-lg transition-all"
            >
              Back to Main Site
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default VendorLayout;
