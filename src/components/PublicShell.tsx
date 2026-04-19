import { ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

/**
 * Shared shell for all public marketing/info pages.
 * Wraps content with the sticky nav and footer used on the homepage.
 */
export const PublicShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);
