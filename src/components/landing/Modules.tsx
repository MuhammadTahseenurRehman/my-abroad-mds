import { Search, MapPin, ShieldCheck, Stethoscope, FolderLock, Users } from "lucide-react";

const modules = [
  { icon: Search, title: "Doctor Directory", body: "Search English-speaking providers by city, specialty, insurance, rating. Map &amp; list view.", tag: "Find care" },
  { icon: FolderLock, title: "PIMS 2.0 Vault", body: "On-device encrypted storage for records, prescriptions, allergies. Consent-based sharing.", tag: "Stay in control" },
  { icon: Stethoscope, title: "Telemedicine", body: "Instant or scheduled video / audio consults. Translator &amp; record sync built in.", tag: "Talk now" },
  { icon: MapPin, title: "Travel Risk Map", body: "Live destination intelligence: outbreaks, climate, altitude, prescription availability.", tag: "Plan ahead" },
  { icon: ShieldCheck, title: "Memberships", body: "Personal, family, student, and corporate plans. One-click upgrade, transparent pricing.", tag: "Stay covered" },
  { icon: Users, title: "Provider Network", body: "Clinics &amp; doctors join in minutes, receive qualified leads, no booking fees.", tag: "For providers" },
];

export const Modules = () => (
  <section id="modules" className="container py-24">
    <div className="grid items-end gap-6 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">The platform</p>
        <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
          One dashboard. Every step of the journey.
        </h2>
      </div>
      <p className="text-muted-foreground md:text-lg">
        From the moment you book a flight to the second you land back home — GlobalCare keeps
        your health intelligence ready, private, and one tap away.
      </p>
    </div>

    <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => (
        <article key={m.title} className="group relative bg-background p-7 transition-colors hover:bg-secondary/40">
          <div className="mb-5 flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <m.icon className="h-5 w-5" />
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{m.tag}</span>
          </div>
          <h3 className="mb-2 font-display text-xl font-semibold">{m.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: m.body }} />
        </article>
      ))}
    </div>
  </section>
);
