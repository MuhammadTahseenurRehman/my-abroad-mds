import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="container pb-24">
    <div className="relative overflow-hidden rounded-[2.5rem] border border-transparent bg-gradient-primary px-8 py-16 text-center text-primary-foreground shadow-elegant md:px-16 md:py-24 dark:border-border/60 dark:bg-gradient-to-br dark:from-[hsl(200_43%_10%)] dark:via-[hsl(199_36%_13%)] dark:to-[hsl(200_40%_9%)] dark:text-foreground">
      <span className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl dark:opacity-50" />
      <span className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl dark:opacity-40" />
      <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
        Travel anywhere. Stay covered.
      </h2>
      <p className="relative mx-auto mt-5 max-w-xl text-primary-foreground/80 dark:text-muted-foreground">
        Join thousands of travelers, families, and companies who plan their next trip with confidence.
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="accent" size="lg" className="group">
          <Link to="/memberships">
            View memberships
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button
          asChild
          variant="ghostOnDark"
          size="lg"
          className="dark:border-border/50 dark:bg-background/20 dark:text-foreground dark:hover:bg-background/35"
        >
          <Link to="/contact">Book a demo</Link>
        </Button>
      </div>
    </div>
  </section>
);
