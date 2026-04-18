import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Globetrotter",
    price: "$49",
    cadence: "/ 2 weeks",
    desc: "Perfect for a single trip. All essentials, none of the friction.",
    features: ["Doctor directory access", "PIMS 2.0 vault", "AI risk advisor (1 trip)", "Email support"],
    variant: "outline" as const,
  },
  {
    name: "Wanderer Plus",
    price: "$199",
    cadence: "/ year",
    desc: "For digital nomads & frequent travelers who need always-on care.",
    features: ["Everything in Globetrotter", "Unlimited AI advisor", "2 telemedicine consults / month", "Wearable sync", "Priority support"],
    highlight: true,
    variant: "hero" as const,
  },
  {
    name: "Family Voyager",
    price: "$349",
    cadence: "/ year",
    desc: "Up to 5 family members under one secure, shared dashboard.",
    features: ["Everything in Wanderer Plus", "5 member profiles", "Pediatric specialist matching", "Shared trip plans"],
    variant: "outline" as const,
  },
];

export const Pricing = () => (
  <section id="pricing" className="bg-secondary/30 py-24">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">Memberships</p>
        <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          Transparent plans. No surprise consult fees.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Cancel anytime. Student &amp; corporate plans available — see below.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <article
            key={t.name}
            className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
              t.highlight
                ? "border-primary bg-gradient-card shadow-elegant lg:-translate-y-3"
                : "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-elegant"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-soft">
                Most popular
              </span>
            )}
            <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold text-foreground">{t.price}</span>
              <span className="text-sm text-muted-foreground">{t.cadence}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant={t.variant} className="mt-8 w-full">Choose {t.name}</Button>
          </article>
        ))}
      </div>
    </div>
  </section>
);
