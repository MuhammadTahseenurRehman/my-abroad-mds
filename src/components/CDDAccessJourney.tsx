import { Link } from "react-router-dom";
import { BadgeCheck, CreditCard, LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: 1,
    title: "Choose a membership",
    body: "Compare all six plans on Memberships, open a product page, and review coverage for your trip style.",
    icon: Sparkles,
    href: "/memberships",
    linkLabel: "View memberships",
  },
  {
    step: 2,
    title: "Add to cart",
    body: "Pick quantity, add to cart, and review your selections on the cart page before you pay.",
    icon: CreditCard,
    href: "/cart",
    linkLabel: "Open cart",
  },
  {
    step: 3,
    title: "Checkout & account",
    body: "Pay at checkout. New members enter name, email, and password — your account is created there (no separate signup).",
    icon: BadgeCheck,
    href: "/checkout",
    linkLabel: "Checkout",
  },
  {
    step: 4,
    title: "Dashboard & CDD",
    body: "After purchase you land in the app. Open Doctor Directory for the full Curated Doctor Directory.",
    icon: LayoutDashboard,
    href: "/app/directory",
    linkLabel: "Doctor Directory",
  },
];

export const CDDAccessJourney = ({ className }: { className?: string }) => (
  <section className={cn("relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.06]", className)}>
    <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
    <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

    <div className="relative px-6 py-10 md:px-10 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Curated Doctor Directory</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Membership unlocks the <span className="text-primary">full CDD</span>
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Purchase any membership through cart checkout. Your account is created at checkout; then sign in anytime to access the directory and your benefits.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.step}
            className="relative flex flex-col rounded-2xl border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur-sm transition-shadow hover:shadow-elegant"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                {s.step}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            <Button asChild variant="link" className="mt-4 h-auto justify-start px-0 text-primary">
              <Link to={s.href}>{s.linkLabel} →</Link>
            </Button>
          </li>
        ))}
      </ol>

      <div className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="hero" size="lg">
          <Link to="/memberships">Browse memberships</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/product/everywhere-year">View a plan (example)</Link>
        </Button>
      </div>
    </div>
  </section>
);
