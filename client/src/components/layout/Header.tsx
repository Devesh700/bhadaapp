// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Home, Search, Building2, UserPlus, LogIn, Menu, X } from "lucide-react";
// import AuthModal from "@/components/auth/AuthModal";
// import OwnerLoginModal from "@/components/auth/OwnerLoginModal";

// const Header = () => {
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [showOwnerLogin, setShowOwnerLogin] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleOwnerAccess = () => {
//     const ownerAuth = localStorage.getItem("owner_auth");
//     if (ownerAuth) {
//       const parsed = JSON.parse(ownerAuth);
//       if (parsed.isLoggedIn && parsed.role === "owner") {
//         navigate("/owner/dashboard");
//         return;
//       }
//     }
//     setShowOwnerLogin(true);
//   };

//   return (
//     <>
//       <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-b border-blue-700 shadow-lg sticky top-0 z-50 backdrop-blur-md">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-3 group" style={{ outline: 'none', boxShadow: 'none' }}>
//               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
//                 <Home className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold font-display">
//                 <span className="text-white">Bhada</span>
//                 <span className="text-blue-300">.in</span>
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-10">
//               <Link 
//                 to="/" 
//                 className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
//                 style={{ outline: 'none', boxShadow: 'none' }}
//               >
//                 Home
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               <Link 
//                 to="/properties/rent" 
//                 className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
//                 style={{ outline: 'none', boxShadow: 'none' }}
//               >
//                 Rent
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               <Link 
//                 to="/properties/sale" 
//                 className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
//                 style={{ outline: 'none', boxShadow: 'none' }}
//               >
//                 Buy
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//               <Link 
//                 to="/list-property" 
//                 className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
//                 style={{ outline: 'none', boxShadow: 'none' }}
//               >
//                 List Property
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//             </nav>

//             {/* Desktop Actions */}
//             <div className="hidden md:flex items-center space-x-4">
//               <Button
//                 variant="ghost"
//                 onClick={handleOwnerAccess}
//                 className="text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-200"
//                 style={{ outline: 'none', boxShadow: 'none' }}
//               >
//                 <Building2 className="w-4 h-4 mr-2" />
//                 Owner Panel
//               </Button>
//               <Button
//                 onClick={() => setShowAuthModal(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 style={{ outline: 'none', boxShadow: 'none' }}
//               >
//                 <UserPlus className="w-4 h-4 mr-2" />
//                 Join Us
//               </Button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
//               style={{ outline: 'none', boxShadow: 'none' }}
//             >
//               {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="md:hidden py-4 border-t border-blue-700 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 backdrop-blur-md">
//               <nav className="flex flex-col space-y-3">
//                 <Link 
//                   to="/" 
//                   className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   style={{ outline: 'none', boxShadow: 'none' }}
//                 >
//                   Home
//                 </Link>
//                 <Link 
//                   to="/properties/rent" 
//                   className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   style={{ outline: 'none', boxShadow: 'none' }}
//                 >
//                   Rent
//                 </Link>
//                 <Link 
//                   to="/properties/sale" 
//                   className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   style={{ outline: 'none', boxShadow: 'none' }}
//                 >
//                   Buy
//                 </Link>
//                 <Link 
//                   to="/list-property" 
//                   className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   style={{ outline: 'none', boxShadow: 'none' }}
//                 >
//                   List Property
//                 </Link>
//                 <div className="pt-3 border-t border-blue-700 space-y-3">
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       handleOwnerAccess();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/10"
//                     style={{ outline: 'none', boxShadow: 'none' }}
//                   >
//                     <Building2 className="w-4 h-4 mr-2" />
//                     Owner Panel
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       setShowAuthModal(true);
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                     style={{ outline: 'none', boxShadow: 'none' }}
//                   >
//                     <UserPlus className="w-4 h-4 mr-2" />
//                     Join Us
//                   </Button>
//                 </div>
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Auth Modal */}
//       <AuthModal 
//         isOpen={showAuthModal} 
//         onClose={() => setShowAuthModal(false)} 
//         defaultTab="register"
//       />

//       {/* Owner Login Modal */}
//       <OwnerLoginModal 
//         isOpen={showOwnerLogin} 
//         onClose={() => setShowOwnerLogin(false)} 
//       />
//     </>
//   );
// };

// export default Header;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, Building2, UserPlus, LogIn, Menu, X, LogOut } from "lucide-react";
import OwnerLoginModal from "@/components/auth/OwnerLoginModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { selectIsAuthenticated, selectUser } from "@/store/selectors/auth.selector";
import { logout } from "@/store/slices/auth.slice";
import AuthModal from "../auth/AuthModal";
import { showAuthModal } from "@/store/slices/partials.slice";

const Header = () => {
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOwnerAccess = () => {
    const ownerAuth = localStorage.getItem("token");
    if (user?.role === "admin") {
        navigate("/owner/dashboard");
        return;
    }
    setShowOwnerLogin(true);
  };

  return (
    <>
      <header className="bg-gradient-to-br from-blue-900/85 via-blue-800/90 to-blue-900 border-b border-blue-700 shadow-lg sticky top-1 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" style={{ outline: 'none', boxShadow: 'none' }}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-display">
                <span className="text-white">Bhada</span>
                <span className="text-blue-300">.in</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <Link 
                to="/" 
                className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/properties/rent" 
                className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                Rent
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/properties/sale" 
                className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                Buy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/create-property" 
                className="text-blue-200 hover:text-white font-medium transition-colors duration-200 relative group"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                List Property
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user.role === "admin" &&<Button
                variant="ghost"
                onClick={()=>navigate("/dashboard")}
                className="text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-200"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Owner Panel
              </Button>}
              <Button
                onClick={()=> isAuthenticated ? dispatch(logout()) :dispatch(showAuthModal())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                {isAuthenticated 
                ?<>
                  <LogOut className="w-4 h-4 mr-2"/>
                  logout
                </>  
                :<>
                <UserPlus className="w-4 h-4 mr-2"/>
                Join Us
                </>}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-700 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 backdrop-blur-md">
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  Home
                </Link>
                <Link 
                  to="/properties/rent" 
                  className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  Rent
                </Link>
                <Link 
                  to="/properties/sale" 
                  className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  Buy
                </Link>
                <Link 
                  to="/create-property" 
                  className="text-blue-200 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  List Property
                </Link>
                <div className="pt-3 border-t border-blue-700 space-y-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      // handleOwnerAccess();
                      // setIsMobileMenuOpen(false);
                      navigate("/dashboard")
                    }}
                    className="w-full justify-start text-blue-200 hover:text-white hover:bg-white/10"
                    style={{ outline: 'none', boxShadow: 'none' }}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    // onClick={()=> navigate("/login")}
                    onClick={()=> isAuthenticated ? dispatch(logout()) :dispatch(showAuthModal())}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    style={{ outline: 'none', boxShadow: 'none' }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Us
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {/* <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab="register"
      /> */}

      {/* Owner Login Modal */}
      <OwnerLoginModal 
        isOpen={showOwnerLogin} 
        onClose={() => setShowOwnerLogin(false)} 
      />
    </>
  );
};

export default Header;