import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

/** Reusable hero header for sub-pages. */
export const PageHero = ({ eyebrow, title, description, align = "center" }: Props) => (
  <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-accent/5">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]" />
    <div className={`container relative py-16 md:py-24 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary ${align === "center" ? "" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h1 className={`font-display text-4xl font-semibold tracking-tight md:text-5xl ${align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
        {title}
      </h1>
      {description && (
        <p className={`mt-4 text-lg text-muted-foreground ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {description}
        </p>
      )}
    </div>
  </section>
);
