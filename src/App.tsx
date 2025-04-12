
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Threats from "./pages/Threats";
import Intelligence from "./pages/Intelligence";
import Assets from "./pages/Assets";
import Vulnerabilities from "./pages/Vulnerabilities";
import Adversaries from "./pages/Adversaries";
import Automation from "./pages/Automation";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/threats" element={<Threats />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/adversaries" element={<Adversaries />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
