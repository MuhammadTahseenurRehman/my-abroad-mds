import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Globe2, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Patient-first", text: "Every feature is designed around traveler safety, dignity, and informed choice." },
  { icon: Shield, title: "Privacy-first", text: "Your medical data is yours. End-to-end encryption and consent-based sharing by default." },
  { icon: Globe2, title: "Global reach", text: "100+ countries covered, with local context and English-speaking professionals." },
  { icon: Users, title: "Built with clinicians", text: "Our advisory board includes travel medicine physicians from four continents." },
];

const About = () => {
  useSEO({
    title: "About GlobalCare Abroad — Travel healthcare, reimagined",
    description: "We help travelers, students, families, and corporations access trusted English-speaking healthcare in 100+ countries — with AI-powered preparation tools.",
    path: "/about",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="About us"
        title={<>The world is your home. <span className="text-primary">Healthcare should follow.</span></>}
        description="We're building the global standard for travel healthcare preparedness — combining a vetted doctor network, secure health records, and AI-powered planning."
      />

      <section className="container grid gap-10 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Our story</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-foreground/80">
            <p>
              GlobalCare Abroad started with a simple, stressful experience: a chronic-illness traveler stranded in Bangkok, unable to find an English-speaking specialist or get records to a local doctor.
            </p>
            <p>
              We believe preparation — not panic — is the answer. So we built a platform that helps travelers plan ahead with vetted providers, secure their medical history on-device, and get destination-specific health intelligence powered by AI.
            </p>
            <p>
              Today, members in over 100 countries trust GlobalCare to bridge the gap between their home and wherever life takes them.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary to-accent/10 p-8">
          <h3 className="font-display text-xl font-semibold">Our mission</h3>
          <p className="mt-3 text-foreground/80">
            Make world-class healthcare accessible to anyone, anywhere — before, during, and after travel.
          </p>
          <h3 className="mt-8 font-display text-xl font-semibold">By the numbers</h3>
          <dl className="mt-3 grid grid-cols-2 gap-4">
            {[
              ["100+", "Countries covered"],
              ["10k+", "Travelers protected"],
              ["2,500+", "Vetted clinicians"],
              ["24/7", "Support availability"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-semibold text-primary">{n}</dt>
                <dd className="text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/30 py-16">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight">What we stand for</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
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
          </div>
        </div>
      </section>
    </PublicShell>
  );
};

export default About;
