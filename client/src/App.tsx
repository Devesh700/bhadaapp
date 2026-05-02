
import { Toaster } from "@/components/ui/toaster";

import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "@/contexts/LoadingContext";
import Index from "./pages/Index";
import RentalProperties from "./pages/RentalProperties";
import SaleProperties from "./pages/SaleProperties";
import Wallet from "./pages/Wallet";
import Auth from "./pages/auth/Auth";
// import Dashboard from "./pages/Dashboard";
const Dashboard = lazy(()=>import ("./pages/dashboard/Dashboard"))
import VendorAuth from "./pages/VendorAuth";
import OwnerDashboard from "./pages/OwnerDashboard";  
import PropertyView from "./pages/property-view/PropertyView";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/auth/AuthModal";
import CreatePropertyWizard from "./pages/dashboard/components/vendor/CreatePropertyWizard";
import Properties from "./pages/properties/PropertyListing";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <AuthModal/>
          <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-slate-600">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:type"  element = {<Properties/>}/>
              {/* <Route path="/properties/rent" element={<RentalProperties />} />
              <Route path="/properties/sale" element={<SaleProperties />} /> */}
              <Route path="/properties/:type/:id" element={<PropertyView />} />
              {/* <Route path="/properties/:id" element={<PropertyViewPage.default />} /> */}
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/list-property"
                element={
                  // <RoleProtectedRoute allowedRoles={["vendor"]}>
                    <CreatePropertyWizard />
                  // </RoleProtectedRoute>
                }
              />
              <Route
                path="/create-property"
                element={
                  // <RoleProtectedRoute allowedRoles={["vendor"]}>
                    <CreatePropertyWizard />
                  // </RoleProtectedRoute>
                }
              />
              <Route path="/vendor/login" element={<VendorAuth />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
