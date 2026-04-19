import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, BarChart3, Shield, Globe2 } from "lucide-react";

const points = [
  { icon: BarChart3, title: "Anonymized analytics", body: "Aggregated risk dashboards across regions, departments, and trip types." },
  { icon: Shield, title: "Duty-of-care ready", body: "GDPR / HIPAA aligned, SSO, audit logs, and 24/7 emergency escalation." },
  { icon: Globe2, title: "Bulk licensing", body: "Provision hundreds of employees in minutes with one-click membership assignment." },
];

export const Corporate = () => (
  <section id="corporate" className="container py-24">
    <div className="grid gap-12 rounded-[2.5rem] border border-border bg-gradient-card p-8 shadow-soft lg:grid-cols-[1fr_1.1fr] lg:p-14">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 text-primary" /> For business
        </span>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">
          Protect every employee, everywhere they go.
        </h2>
        <p className="mt-5 max-w-md text-muted-foreground">
          From small teams sending consultants abroad to multinationals managing global mobility —
          My Abroad Care gives HR, mobility, and security teams a single source of truth.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Talk to sales</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/corporate-solutions">Corporate solutions</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {points.map((p) => (
          <div key={p.title} className="flex gap-4 rounded-2xl bg-background/70 p-5">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-primary text-primary-foreground">
              <p.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
