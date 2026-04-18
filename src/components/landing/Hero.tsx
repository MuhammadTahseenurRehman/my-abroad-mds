import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-traveler.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Now with AI Health Risk Advisor
          </span>
          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            Healthcare abroad,
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              powered by intelligence.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Plan smarter. Travel safer. GlobalCare connects you to vetted English-speaking
            doctors in 100+ countries, a private health vault, and on-demand telemedicine —
            all guided by AI built for travelers, expats, and global teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" className="group">
              Start your trip plan
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              See how it works
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> GDPR &amp; HIPAA aligned</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 100+ countries</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> No data on our servers (PIMS 2.0)</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-elegant">
            <img
              src={heroImg}
              alt="Traveler reviewing personalized health risk insights on a phone with a world map behind"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <FloatingCard
            className="absolute -left-4 top-10 hidden md:block"
            title="Risk score"
            value="Low"
            sub="Lisbon, PT · Apr 22"
            tone="ok"
          />
          <FloatingCard
            className="absolute -right-2 bottom-10 hidden md:block"
            title="Next consult"
            value="14:30"
            sub="Dr. Mendes · video"
            tone="accent"
          />
        </motion.div>
      </div>
    </section>
  );
};

const FloatingCard = ({
  title, value, sub, tone, className = "",
}: { title: string; value: string; sub: string; tone: "ok" | "accent"; className?: string }) => (
  <div className={`animate-float-slow rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur ${className}`}>
    <div className="flex items-center gap-3">
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-semibold ${
          tone === "ok" ? "bg-primary/10 text-primary" : "bg-accent/15 text-accent"
        }`}
      >
        {tone === "ok" ? "AI" : "DR"}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
        <p className="font-display text-lg font-semibold leading-tight text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  </div>
);
