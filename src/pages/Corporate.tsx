import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, BarChart3, Users, Globe2, ShieldCheck, Headset, Check } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Globe2, title: "Global coverage", text: "Deploy in 100+ countries with a single contract and one centralized dashboard." },
  { icon: ShieldCheck, title: "GDPR & HIPAA ready", text: "Anonymized analytics, audit logs, and SSO — built for security teams." },
  { icon: BarChart3, title: "Risk analytics", text: "Aggregated, anonymized health-risk reports across your global workforce." },
  { icon: Headset, title: "24/7 concierge", text: "Dedicated success manager, executive escalations, and bulk telemedicine." },
];

const tiers = [
  { name: "Team", seats: "10–49 seats", price: "$15", per: "/ seat / month", features: ["All Wanderer Plus features", "Admin dashboard", "Bulk invitations", "Email support"] },
  { name: "Business", seats: "50–500 seats", price: "$12", per: "/ seat / month", features: ["Everything in Team", "SSO + SCIM", "Anonymized risk reports", "Dedicated CSM"], highlight: true },
  { name: "Enterprise", seats: "500+ seats", price: "Custom", per: "", features: ["Everything in Business", "Custom SLAs", "Country-specific compliance", "Concierge program"] },
];

const Corporate = () => {
  useSEO({
    title: "Corporate Solutions — GlobalCare for Business",
    description: "Protect your global workforce with travel healthcare, telemedicine, and risk analytics. SSO, SCIM, and country-level compliance.",
    path: "/corporate-solutions",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="For Business"
        title={<>Travel healthcare for your <span className="text-primary">global workforce</span></>}
        description="A duty-of-care platform for companies whose people live, travel, and work across borders."
      />

      <section className="container grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="border-border/60">
            <CardContent className="space-y-3 p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="border-y border-border/60 bg-secondary/30 py-16">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight">Plans built for scale</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <Card key={t.name} className={t.highlight ? "border-primary/40 shadow-elegant" : "border-border/60"}>
                <CardContent className="space-y-5 p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.seats}</p>
                    <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-semibold">{t.price}</span>
                    <span className="text-sm text-muted-foreground">{t.per}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {t.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> {f}</li>)}
                  </ul>
                  <Button asChild variant={t.highlight ? "hero" : "outline"} className="w-full">
                    <Link to="/contact">Talk to sales</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-10 text-center">
          <Building2 className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">Built for HR, security, and benefits teams</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            From a 10-person remote team to 50,000-employee global enterprises — we'll help you roll out in days, not quarters.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero"><Link to="/contact">Book a demo</Link></Button>
            <Button asChild variant="outline"><Link to="/memberships">Compare plans</Link></Button>
          </div>
        </div>
      </section>
    </PublicShell>
  );
};

export default Corporate;
