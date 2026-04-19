import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Users, Calendar, Globe2, Check } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Users, title: "International patient leads", text: "Get matched with travelers actively searching for English-speaking doctors in your city." },
  { icon: Calendar, title: "Modern booking tools", text: "Optional telemedicine integration so patients can book and consult directly through My Abroad Care." },
  { icon: Globe2, title: "Global visibility", text: "Featured placement across 100+ country guides and AI-generated travel recommendations." },
];

const ForDoctors = () => {
  useSEO({
    title: "For Doctors — Partner with My Abroad Care Abroad",
    description: "Join a curated global network of English-speaking physicians and clinics. Free directory listing, optional telemedicine bookings, and patient leads.",
    path: "/for-doctors",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="For Doctors & Clinics"
        title={<>Care for the world's <span className="text-primary">most informed travelers</span></>}
        description="Join My Abroad Care's curated network of English-speaking clinicians and reach engaged international patients in your city."
      />

      <section className="container grid gap-6 py-16 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
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

      <section className="border-t border-border/60 bg-secondary/30 py-16">
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">How partnership works</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Apply", "Submit your practice details and credentials. We verify within 5 business days."],
                ["Onboard", "Build your profile, set languages, insurance, and consultation options."],
                ["Receive patients", "Start receiving qualified international patient introductions immediately."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{t}</h3>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Card className="border-border/60">
            <CardContent className="space-y-5 p-6">
              <Stethoscope className="h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-semibold">What you get — free</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Directory listing in 100+ country search",
                  "Verified-clinician badge",
                  "Patient inquiry inbox",
                  "Optional telemedicine booking widget",
                  "Quarterly insights on traveler demographics",
                ].map((f) => (
                  <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> {f}</li>
                ))}
              </ul>
              <Button asChild variant="hero" className="w-full">
                <Link to="/contact">Apply to join</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
};

export default ForDoctors;
