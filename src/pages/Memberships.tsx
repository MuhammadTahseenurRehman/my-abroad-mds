import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { MEMBERSHIP_PLANS } from "@/data/membershipPlans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";

/** Columns follow MEMBERSHIP_PLANS order: Trip Essential → … → Family Circle */
const compareRows: { label: string; v: (boolean | string)[] }[] = [
  { label: "Curated Doctor Directory (CDD)", v: [true, true, true, true, true, true] },
  { label: "PIMS Health Vault", v: [true, true, true, true, true, true] },
  { label: "AI Risk Advisor", v: [true, true, true, true, true, true] },
  { label: "Telemedicine booking assistance", v: [false, false, true, true, true, true] },
  { label: "City coverage (typical)", v: ["5", "15", "10", "10", "Unlimited", "5"] },
  { label: "Concierge / complex care escalation", v: [false, false, false, false, true, false] },
];

const Memberships = () => {
  useSEO({
    title: "Memberships — My Abroad Care Abroad",
    description:
      "Six membership tiers from short trips to family coverage. Add to cart and checkout to create your account and activate access.",
    path: "/memberships",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="Memberships"
        title={<>Find the right plan for <span className="text-primary">healthcare abroad</span></>}
        description="Choose a plan, open its detail page, add to cart, and checkout — your Curated Doctor Directory access is included. New accounts are created at checkout."
      />

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MEMBERSHIP_PLANS.map((p) => (
            <Card key={p.id} className={p.highlight ? "relative border-primary/40 shadow-elegant" : "border-border/60"}>
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
                  {p.period ? <span className="text-sm text-muted-foreground">{p.period}</span> : null}
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.durationLabel} · {p.coverage} coverage
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.audience}</p>
                <ul className="space-y-2 text-sm">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={p.highlight ? "hero" : "outline"} className="w-full">
                  <Link to={`/product/${p.id}`}>{p.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight">Compare plans</h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="p-4 text-left font-medium">Feature</th>
                  {MEMBERSHIP_PLANS.map((p) => (
                    <th key={p.id} className="p-4 text-left font-medium">
                      {p.name}
                    </th>
                  ))}
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
                        ) : (
                          val
                        )}
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
