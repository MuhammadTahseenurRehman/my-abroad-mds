import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppShell } from "@/components/AppShell";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import About from "./pages/About.tsx";
import Memberships from "./pages/Memberships.tsx";
import FindDoctors from "./pages/FindDoctors.tsx";
import CorporatePage from "./pages/Corporate.tsx";
import ForDoctors from "./pages/ForDoctors.tsx";
import HealthVault from "./pages/HealthVault.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import Dashboard from "./pages/app/Dashboard.tsx";
import Directory from "./pages/app/Directory.tsx";
import ProviderDetail from "./pages/app/ProviderDetail.tsx";
import Advisor from "./pages/app/Advisor.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/find-doctors" element={<FindDoctors />} />
            <Route path="/corporate-solutions" element={<CorporatePage />} />
            <Route path="/for-doctors" element={<ForDoctors />} />
            <Route path="/health-vault" element={<HealthVault />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell><Dashboard /></AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/directory"
              element={
                <ProtectedRoute>
                  <AppShell><Directory /></AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/directory/:id"
              element={
                <ProtectedRoute>
                  <AppShell><ProviderDetail /></AppShell>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/advisor"
              element={
                <ProtectedRoute>
                  <AppShell><Advisor /></AppShell>
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
