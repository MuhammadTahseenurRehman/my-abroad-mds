import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const greeting = user?.email?.split("@")[0] ?? "traveler";

  return (
    <div className="container py-10">
      <header className="mb-10">
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Hello, <span className="text-primary">{greeting}</span>
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Your travel-health command center. Find vetted doctors abroad, get an AI-powered risk report for your next trip, and keep your medical info ready.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/60 transition-shadow hover:shadow-elegant">
          <CardHeader>
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Stethoscope className="h-5 w-5" />
            </div>
            <CardTitle className="font-display">Doctor Directory</CardTitle>
            <CardDescription>Search English-speaking doctors by city, specialty, insurance, and price.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/app/directory">Browse providers <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 transition-shadow hover:shadow-elegant">
          <CardHeader>
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <CardTitle className="font-display">AI Risk Advisor</CardTitle>
            <CardDescription>Get a personalized health-risk report for any destination in seconds.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="hero" className="w-full">
              <Link to="/app/advisor">Plan a trip <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-foreground/10">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <CardTitle className="font-display">PIMS Vault</CardTitle>
            <CardDescription>Coming soon: secure on-device storage for medical records and prescriptions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              Coming soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
