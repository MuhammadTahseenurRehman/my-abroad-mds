import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { Differentiators } from "@/components/landing/Differentiators";
import { AIShowcase } from "@/components/landing/AIShowcase";
import { Modules } from "@/components/landing/Modules";
import { Pricing } from "@/components/landing/Pricing";
import { Corporate } from "@/components/landing/Corporate";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "GlobalCare Abroad — Healthcare for Travelers, Powered by AI";
    const desc = "Vetted doctors in 100+ countries, secure health vault, telemedicine, and AI risk advisor. Prepare smarter, travel safer.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Differentiators />
        <AIShowcase />
        <Modules />
        <Pricing />
        <Corporate />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
