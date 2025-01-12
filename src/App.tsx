import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Account from "@/pages/Account";
import Projects from "@/pages/Projects";
import DesignStudio from "@/pages/DesignStudio";
import Marketplace from "@/pages/Marketplace";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/settings" element={<Account />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/design-studio" element={<DesignStudio />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
      <Toaster />
      <SonnerToaster position="bottom-right" />
    </Router>
  );
}

export default App;