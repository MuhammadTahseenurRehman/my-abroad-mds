import { motion } from "framer-motion";
import { Sparkles, MapPin, Pill, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIShowcase = () => (
  <section className="relative overflow-hidden bg-primary text-primary-foreground">
    <div className="absolute inset-0 -z-0 opacity-30 [background:radial-gradient(800px_400px_at_20%_10%,hsl(var(--primary-glow)/0.6),transparent_60%),radial-gradient(600px_300px_at_90%_90%,hsl(var(--accent)/0.4),transparent_60%)]" />
    <div className="container relative grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
          <Sparkles className="h-4 w-4" /> AI Risk Advisor
        </p>
        <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          One brief. Three clinics. A plan you can trust.
        </h2>
        <p className="mt-5 max-w-lg text-primary-foreground/80">
          Tell us where you're going, who's traveling, and what conditions matter. The advisor
          cross-references local outbreaks, your medications, climate, and altitude — and
          returns a clear plan in seconds.
        </p>
        <ul className="mt-7 space-y-3 text-sm">
          {[
            "Pre-travel checklist tailored to your itinerary",
            "Specialist matches near each stop on your route",
            "Drug-availability and prescription-equivalent guidance",
            "Escalation path to live doctor in one tap",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-accent" />
              <span className="text-primary-foreground/90">{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-3">
          <Button variant="accent" size="lg">Try the advisor</Button>
          <Button variant="ghostOnDark" size="lg">Watch demo</Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md shadow-elegant">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Trip brief</p>
            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">Live</span>
          </div>
          <h3 className="mt-2 font-display text-2xl">Lisbon → Marrakech, 9 days</h3>

          <div className="mt-5 grid gap-3">
            <Card icon={MapPin} title="Risk score" value="Low" detail="Stable conditions, low altitude, no active outbreaks." />
            <Card icon={Pill} title="Your meds" value="2 covered" detail="Metformin available at FarmaSaude (Lisbon) & Pharmacie Atlas (Marrakech)." />
            <Card icon={ShieldCheck} title="Recommended consult" value="Dr. M. Mendes" detail="English-speaking GP · video · 14:30 today" cta />
          </div>
        </div>
        <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 animate-pulse-ring rounded-full bg-accent/40" />
      </motion.div>
    </div>
  </section>
);

const Card = ({
  icon: Icon, title, value, detail, cta,
}: { icon: React.ElementType; title: string; value: string; detail: string; cta?: boolean }) => (
  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-primary/40 p-4">
    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent/15 text-accent">
      <Icon className="h-5 w-5" />
    </span>
    <div className="flex-1">
      <p className="text-xs uppercase tracking-wide text-primary-foreground/60">{title}</p>
      <p className="font-display text-lg">{value}</p>
      <p className="text-sm text-primary-foreground/70">{detail}</p>
    </div>
    {cta && (
      <button className="self-center rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-transform hover:scale-105">
        Book
      </button>
    )}
  </div>
);
