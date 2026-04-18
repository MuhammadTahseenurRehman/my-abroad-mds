const stats = [
  { v: "100+", l: "Countries covered" },
  { v: "12k+", l: "Vetted providers" },
  { v: "<2 min", l: "To first consult" },
  { v: "99.9%", l: "Uptime SLA" },
];

export const TrustStrip = () => (
  <section aria-label="Platform metrics" className="border-y border-border bg-secondary/40">
    <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l} className="text-center">
          <p className="font-display text-3xl font-semibold text-primary md:text-4xl">{s.v}</p>
          <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
        </div>
      ))}
    </div>
  </section>
);
