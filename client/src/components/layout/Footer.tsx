
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight font-display">Bhada.in</h3>
                <p className="text-sm text-blue-300 font-medium">India's Premier Property Platform</p>
              </div>
            </div>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Your trusted partner in finding the perfect property. We revolutionize property rentals and sales across India with our cutting-edge platform and verified listings.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-100">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-blue-200 hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link to="/properties/rent" className="text-blue-200 hover:text-blue-300 transition-colors">Properties for Rent</Link></li>
              <li><Link to="/properties/sale" className="text-blue-200 hover:text-blue-300 transition-colors">Properties for Sale</Link></li>
              <li><Link to="/list-property" className="text-blue-200 hover:text-blue-300 transition-colors">List Your Property</Link></li>
              <li><Link to="/wallet" className="text-blue-200 hover:text-blue-300 transition-colors">Wallet</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-100">Property Types</h3>
            <ul className="space-y-3">
              <li><Link to="/properties/rent/residential" className="text-blue-200 hover:text-blue-300 transition-colors">Residential Houses</Link></li>
              <li><Link to="/properties/rent/commercial" className="text-blue-200 hover:text-blue-300 transition-colors">Commercial Shops</Link></li>
              <li><Link to="/properties/rent/short-term" className="text-blue-200 hover:text-blue-300 transition-colors">Short-term Spaces</Link></li>
              <li><Link to="/properties/sale/land" className="text-blue-200 hover:text-blue-300 transition-colors">Land for Sale</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-100">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Bhada Headquarters</p>
                  <p className="text-blue-200">Mumbai, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <a href="tel:+918888888888" className="text-blue-200 hover:text-blue-300 transition-colors">
                  +91 8888888888
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <a href="mailto:info@bhada.in" className="text-blue-200 hover:text-blue-300 transition-colors">
                  info@bhada.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Bhada.in. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link to="/privacy-policy" className="text-blue-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-blue-300 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-blue-300 hover:text-white text-sm transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
