import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";

type Plan = {
  name: string;
  tag?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Globetrotter Basic",
    price: "$49.99",
    period: "/ 2 weeks",
    description: "Short trips & quick getaways — essential coverage when you need it.",
    features: ["Doctor directory access", "Pre-trip checklist", "Emergency phone numbers", "Email support"],
    cta: "Start short-term",
  },
  {
    name: "Wanderer Plus",
    tag: "Most popular",
    price: "$199",
    period: "/ year",
    description: "For frequent travelers and digital nomads who need year-round peace of mind.",
    features: ["Everything in Basic", "PIMS Health Vault", "AI Risk Advisor", "Telemedicine bookings", "Priority support"],
    highlight: true,
    cta: "Get Wanderer Plus",
  },
  {
    name: "Family Voyager",
    price: "$299",
    period: "/ year",
    description: "Up to 6 family members. Coordinated records, shared trip planning, kid-friendly providers.",
    features: ["Everything in Plus", "Up to 6 members", "Family vault sharing", "Pediatric provider filter"],
    cta: "Protect my family",
  },
  {
    name: "Care Beyond Borders",
    price: "$499",
    period: "/ year",
    description: "Premium tier for chronic-care travelers — concierge support and deeper integration.",
    features: ["Everything in Family", "Concierge consults", "Wearable sync", "Pre-existing condition expert review"],
    cta: "Talk to concierge",
  },
];

const compareRows = [
  { label: "Doctor directory access", v: [true, true, true, true] },
  { label: "PIMS Health Vault", v: [false, true, true, true] },
  { label: "AI Risk Advisor", v: [false, true, true, true] },
  { label: "Telemedicine bookings", v: [false, true, true, true] },
  { label: "Family members", v: ["1", "1", "Up to 6", "Up to 6"] },
  { label: "Concierge support", v: [false, false, false, true] },
  { label: "Wearable & EHR sync", v: [false, false, false, true] },
];

const Memberships = () => {
  useSEO({
    title: "Memberships — GlobalCare Abroad",
    description: "Choose the right plan for your travel: short trips, year-round, family, or premium concierge care. Transparent pricing, cancel anytime.",
    path: "/memberships",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="Memberships"
        title={<>Pick the plan that <span className="text-primary">travels with you</span></>}
        description="From a 2-week getaway to year-round nomad coverage, every plan includes our vetted directory and 24/7 emergency guidance."
      />

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <Card key={p.name} className={p.highlight ? "relative border-primary/40 shadow-elegant" : "border-border/60"}>
              {p.tag && (
                <span className="absolute right-4 top-4 rounded-full bg-gradient-accent px-3 py-1 text-[11px] font-medium text-accent-foreground">
                  {p.tag}
                </span>
              )}
              <CardHeader>
                <CardTitle className="font-display text-xl">{p.name}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <span className="font-display text-3xl font-semibold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> {f}</li>
                  ))}
                </ul>
                <Button asChild variant={p.highlight ? "hero" : "outline"} className="w-full">
                  <Link to="/auth">{p.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight">Compare plans</h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="p-4 text-left font-medium">Feature</th>
                  {plans.map((p) => <th key={p.name} className="p-4 text-left font-medium">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-border/60">
                    <td className="p-4 text-muted-foreground">{row.label}</td>
                    {row.v.map((val, i) => (
                      <td key={i} className="p-4">
                        {typeof val === "boolean" ? (
                          val ? <Check className="h-4 w-4 text-primary" /> : <Minus className="h-4 w-4 text-muted-foreground/50" />
                        ) : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PublicShell>
  );
};

export default Memberships;
