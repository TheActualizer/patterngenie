import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import DesignStudio from "./pages/DesignStudio";
import Marketplace from "./pages/Marketplace";
import AuthPage from "./pages/Auth";
import Account from "./pages/Account";
import Projects from "./pages/Projects";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/design-studio" element={<DesignStudio />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/projects" element={<Projects />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;