
import { Toaster } from "@/components/ui/toaster";

import { lazy } from "react";
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
import PropertyListing from "./pages/PropertyListing";
import VendorAuth from "./pages/VendorAuth";
import OwnerDashboard from "./pages/OwnerDashboard";
import PropertyView from "./pages/PropertyView";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/auth/AuthModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <AuthModal/>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties/rent" element={<RentalProperties />} />
            <Route path="/properties/sale" element={<SaleProperties />} />
            <Route path="/properties/:type/:id" element={<PropertyView />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-property" element={<PropertyListing />} />
            <Route path="/vendor/login" element={<VendorAuth />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
