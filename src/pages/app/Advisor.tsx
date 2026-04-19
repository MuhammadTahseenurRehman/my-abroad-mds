import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, AlertTriangle, ShieldCheck, Pill, Syringe, MapPin } from "lucide-react";
import { toast } from "sonner";

const tripSchema = z.object({
  destination: z.string().trim().min(2, "Destination is required").max(120),
  startDate: z.string().min(1, "Pick a start date"),
  endDate: z.string().min(1, "Pick an end date"),
  travelerType: z.string().max(60).optional(),
  conditions: z.string().max(500).optional(),
  medications: z.string().max(500).optional(),
  notes: z.string().max(500).optional(),
});

type RiskReport = {
  summary: string;
  overall_risk: "low" | "moderate" | "high";
  vaccinations: string[];
  medications: string[];
  health_risks: { name: string; severity: "low" | "moderate" | "high"; advice: string }[];
  emergency: { local_number: string; nearest_care: string };
  recommendations: string[];
};

const Advisor = () => {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelerType: "",
    conditions: "",
    medications: "",
    notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<RiskReport | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = tripSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    setReport(null);
    try {
      const { data, error } = await supabase.functions.invoke("risk-advisor", { body: parsed.data });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setReport(data as RiskReport);
    } catch (err: any) {
      const msg = err?.message ?? "Could not generate report";
      if (msg.includes("Rate limit") || msg.includes("429")) toast.error("Too many requests. Please wait a moment and try again.");
      else if (msg.includes("Payment") || msg.includes("402")) toast.error("AI credits exhausted. Add credits in Settings → Workspace → Usage.");
      else toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <header className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
          <Sparkles className="h-3.5 w-3.5" /> AI-powered
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">AI Health Risk Advisor</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Tell us about your trip and any pre-existing conditions. We'll generate a personalized risk report with vaccinations, medications, and on-the-ground guidance.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-xl">Trip brief</CardTitle>
            <CardDescription>Not medical advice. For educational purposes only.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dest">Destination</Label>
                <Input id="dest" placeholder="e.g. Bangkok, Thailand" value={form.destination} onChange={update("destination")} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="start">From</Label>
                  <Input id="start" type="date" value={form.startDate} onChange={update("startDate")} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">To</Label>
                  <Input id="end" type="date" value={form.endDate} onChange={update("endDate")} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Traveler type (optional)</Label>
                <Input id="type" placeholder="Solo / family with kids / business" value={form.travelerType} onChange={update("travelerType")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cond">Pre-existing conditions (optional)</Label>
                <Textarea id="cond" placeholder="e.g. Type 2 diabetes, asthma" value={form.conditions} onChange={update("conditions")} maxLength={500} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meds">Medications (optional)</Label>
                <Textarea id="meds" placeholder="e.g. Metformin 500mg, Ventolin inhaler" value={form.medications} onChange={update("medications")} maxLength={500} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Anything else (optional)</Label>
                <Textarea id="notes" placeholder="Activities, allergies, concerns…" value={form.notes} onChange={update("notes")} maxLength={500} />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate report</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {!report && !busy && (
            <Card className="h-full border-dashed border-border/60">
              <CardContent className="flex h-full min-h-[400px] flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">Your report appears here</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Fill in the trip brief and click "Generate report" to get destination-specific health intelligence.
                </p>
              </CardContent>
            </Card>
          )}

          {busy && (
            <Card className="h-full border-border/60">
              <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-3 p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Analyzing destination, climate, and your health profile…</p>
              </CardContent>
            </Card>
          )}

          {report && <ReportView report={report} destination={form.destination} />}
        </div>
      </div>
    </div>
  );
};

const riskColor = {
  low: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  moderate: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  high: "bg-red-500/15 text-red-700 dark:text-red-300",
};

const ReportView = ({ report, destination }: { report: RiskReport; destination: string }) => (
  <div className="space-y-4">
    <Card className="border-border/60">
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Risk report</p>
            <h2 className="font-display text-2xl font-semibold">{destination}</h2>
          </div>
          <Badge className={riskColor[report.overall_risk]}>{report.overall_risk.toUpperCase()} RISK</Badge>
        </div>
        <p className="leading-relaxed text-foreground/90">{report.summary}</p>
      </CardContent>
    </Card>

    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Syringe className="h-4 w-4 text-primary" /> Vaccinations</CardTitle>
        </CardHeader>
        <CardContent>
          {report.vaccinations.length === 0 ? (
            <p className="text-sm text-muted-foreground">None specifically required.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {report.vaccinations.map((v, i) => (
                <li key={i} className="flex gap-2"><span className="text-primary">•</span> {v}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Pill className="h-4 w-4 text-primary" /> Suggested medications</CardTitle>
        </CardHeader>
        <CardContent>
          {report.medications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No specific recommendations.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {report.medications.map((m, i) => (
                <li key={i} className="flex gap-2"><span className="text-primary">•</span> {m}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>

    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-4 w-4 text-accent" /> Health risks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {report.health_risks.map((r, i) => (
          <div key={i} className="rounded-md border border-border/60 bg-secondary/30 p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <h4 className="font-medium">{r.name}</h4>
              <Badge variant="outline" className={riskColor[r.severity]}>{r.severity}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{r.advice}</p>
          </div>
        ))}
      </CardContent>
    </Card>

    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><MapPin className="h-4 w-4 text-primary" /> Emergency info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><span className="text-muted-foreground">Local emergency:</span> <span className="font-medium">{report.emergency.local_number}</span></p>
          <p><span className="text-muted-foreground">Nearest international care:</span> {report.emergency.nearest_care}</p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-4 w-4 text-primary" /> Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-sm">
            {report.recommendations.map((r, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">•</span> {r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>

    <p className="px-2 text-xs text-muted-foreground">
      ⚠️ This AI-generated report is for general guidance only and is not a substitute for professional medical advice. Always consult a qualified physician.
    </p>
  </div>
);

export default Advisor;
