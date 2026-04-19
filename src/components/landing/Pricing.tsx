import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HOME_PRICING_PLAN_IDS, getPlanById } from "@/data/membershipPlans";

const homeTiers = HOME_PRICING_PLAN_IDS.map((id) => getPlanById(id)).filter((p): p is NonNullable<ReturnType<typeof getPlanById>> => Boolean(p));

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
        {homeTiers.map((plan) => {
          const cadence = plan.period || ` / ${plan.durationLabel}`;
          const variant = plan.highlight ? ("hero" as const) : ("outline" as const);
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-primary bg-gradient-card shadow-elegant lg:-translate-y-3 dark:border-primary/55 dark:ring-1 dark:ring-primary/25"
                  : "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-elegant"
              }`}
            >
              {plan.tag && plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-soft">
                  {plan.tag}
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold text-foreground">{plan.price.replace(".00", "")}</span>
                <span className="text-sm text-muted-foreground">{cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={variant} className="mt-8 w-full">
                <Link to={`/product/${plan.id}`}>Choose {plan.name}</Link>
              </Button>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Need a different term length?{" "}
        <Link to="/memberships" className="font-medium text-primary underline-offset-4 hover:underline">
          Compare all six plans
        </Link>
      </p>
    </div>
  </section>
);
