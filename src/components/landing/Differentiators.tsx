import { Brain, Video, Activity, Lock, Languages, Siren, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Brain, title: "AI Health Risk Advisor", body: "Destination + itinerary + your history → a personalized risk report and pre-trip checklist." },
  { icon: Video, title: "Integrated Telemedicine", body: "Book video or audio consults directly with listed doctors. No third-party app, no friction." },
  { icon: Activity, title: "Wearable & EHR Sync", body: "Apple Health, Google Fit, Fitbit. Real-time vitals shared securely with your provider." },
  { icon: Lock, title: "Consent-Based Vault (PIMS 2.0)", body: "Records stay on your device. Share with expiring, audit-proof, blockchain-anchored consent." },
  { icon: Languages, title: "AI Medical Translator", body: "Real-time multilingual translation during consultations. Never lose nuance in your symptoms." },
  { icon: Siren, title: "Predictive Emergency Alerts", body: "Location-aware alerts and one-tap routing to local emergency services." },
  { icon: BarChart3, title: "Corporate Analytics", body: "Anonymized health-risk dashboards for HR, travel managers, and duty-of-care leads." },
];

export const Differentiators = () => (
  <section id="features" className="container py-24">
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">Why GlobalCare</p>
      <h2 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
        The next generation of travel healthcare.
      </h2>
      <p className="mt-4 text-muted-foreground">
        Everything competitors offer — directory, vault, memberships — plus the modern layer
        they're missing: AI, telemedicine, wearables, and enterprise analytics.
      </p>
    </div>

    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <motion.article
          key={it.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
        >
          <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
            <it.icon className="h-5 w-5" />
          </div>
          <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{it.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{it.body}</p>
        </motion.article>
      ))}
    </div>
  </section>
);
