import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Smartphone, Share2, FileText, ShieldCheck, Fingerprint, Check } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  { icon: Smartphone, title: "On-device first", text: "Records live encrypted on your phone. Nothing is stored on our servers without explicit consent." },
  { icon: Lock, title: "End-to-end encryption", text: "Zero-knowledge architecture means even our engineers can't read your data." },
  { icon: Share2, title: "Consent-based sharing", text: "Share specific records with a doctor for a set time. Revoke instantly. Every access is logged." },
  { icon: Fingerprint, title: "Biometric unlock", text: "Face ID, Touch ID, or device PIN gates every read. Multi-device sync uses your master key." },
];

const HealthVault = () => {
  useSEO({
    title: "PIMS Health Vault — Secure medical records for travelers",
    description: "End-to-end encrypted, on-device storage for medical records, prescriptions, and allergies. Consent-based sharing, biometric unlock.",
    path: "/health-vault",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="PIMS Health Vault"
        title={<>Your medical history, <span className="text-primary">in your pocket</span></>}
        description="A privacy-first vault for prescriptions, allergies, immunizations, and records — instantly shareable with any doctor, anywhere."
      />

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }) => (
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
      </section>

      <section className="border-y border-border/60 bg-secondary/30 py-16">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center">
          <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-background to-accent/10 p-10">
            <FileText className="h-10 w-10 text-primary" />
            <h3 className="mt-4 font-display text-xl font-semibold">What you can store</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Prescriptions & active medications",
                "Allergies and adverse reactions",
                "Immunization & vaccine records",
                "Imaging (X-ray, MRI, CT)",
                "Lab results and diagnoses",
                "Insurance cards & emergency contacts",
              ].map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> {f}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Why on-device matters</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-foreground/80">
              <p>
                Most "secure" health record systems are really just databases somewhere in the cloud. A breach exposes everyone.
              </p>
              <p>
                PIMS works the opposite way: your data lives encrypted on your device. When you share with a doctor, they get a one-time, expiring view — and you see exactly what they accessed and when.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero"><Link to="/auth">Create your vault</Link></Button>
              <Button asChild variant="outline"><Link to="/memberships">View plans</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">Built to GDPR & HIPAA standards</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Audit logs, data residency options, and SOC 2 controls. We can support your compliance team's questionnaire.
        </p>
      </section>
    </PublicShell>
  );
};

export default HealthVault;
