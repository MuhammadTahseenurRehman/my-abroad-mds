import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="container pb-24">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary px-8 py-16 text-center text-primary-foreground shadow-elegant md:px-16 md:py-24">
      <span className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
      <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
        Travel anywhere. Stay covered.
      </h2>
      <p className="relative mx-auto mt-5 max-w-xl text-primary-foreground/80">
        Join thousands of travelers, families, and companies who plan their next trip with confidence.
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="accent" size="lg" className="group">
          Create your free account
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button variant="ghostOnDark" size="lg">Book a demo</Button>
      </div>
    </div>
  </section>
);
