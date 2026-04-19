import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { formatCents } from "@/data/membershipPlans";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { MembershipPlan } from "@/data/membershipPlans";

const guestSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

async function insertMembershipRows(userId: string, items: { plan: MembershipPlan; quantity: number }[]) {
  const rows: { user_id: string; plan_id: string; plan_name: string; price_cents: number; currency: string }[] = [];
  for (const { plan, quantity } of items) {
    for (let i = 0; i < quantity; i++) {
      rows.push({
        user_id: userId,
        plan_id: plan.id,
        plan_name: plan.name,
        price_cents: plan.priceCents,
        currency: "USD",
      });
    }
  }
  const { error } = await supabase.from("user_memberships").insert(rows);
  if (error) throw error;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { items, subtotalCents, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);

  const lineSummary = useMemo(
    () =>
      items.map(({ plan, quantity, lineTotalCents }) => ({
        label: `${plan.name} × ${quantity}`,
        sub: formatCents(lineTotalCents),
      })),
    [items],
  );

  useSEO({
    title: "Checkout — My Abroad Care",
    description: "Complete your membership purchase and create your account in one step.",
    path: "/checkout",
  });

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleGuestSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the terms to continue.");
      return;
    }
    const parsed = guestSchema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your details.");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: { full_name: parsed.data.fullName },
      },
    });
    if (error) {
      setBusy(false);
      toast.error(error.message.includes("registered") ? "This email already has an account. Sign in, then return to your cart." : error.message);
      return;
    }
    const session = data.session;
    const uid = data.user?.id;
    if (!session || !uid) {
      setBusy(false);
      toast.message("Confirm your email if prompted, then sign in and complete checkout from your cart.");
      return;
    }
    try {
      await insertMembershipRows(uid, items);
      clearCart();
      toast.success("Welcome! Your membership is active.");
      navigate("/app", { replace: true });
    } catch (err) {
      setBusy(false);
      toast.error(err instanceof Error ? err.message : "Could not save membership. Contact support.");
    }
  };

  const handleMemberSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !agreed) {
      if (!agreed) toast.error("Please accept the terms to continue.");
      return;
    }
    setBusy(true);
    try {
      await insertMembershipRows(user.id, items);
      clearCart();
      toast.success("Membership added to your account.");
      navigate("/app", { replace: true });
    } catch (err) {
      setBusy(false);
      toast.error(err instanceof Error ? err.message : "Could not save membership.");
    }
  };

  if (authLoading) {
    return (
      <PublicShell>
        <div className="grid min-h-[40vh] place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <PageHero
        eyebrow="Checkout"
        title={<>Complete your <span className="text-primary">purchase</span></>}
        description={
          user
            ? "We’ll add these memberships to your existing account. Review and confirm below."
            : "Create your account with your name, email, and password — your membership activates as soon as checkout completes."
        }
      />

      <section className="container pb-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <Card className="border-border/60 shadow-elegant">
            <CardHeader className="border-b border-border/60 bg-secondary/30">
              <div className="flex items-center gap-2 text-primary">
                <Lock className="h-5 w-5" />
                <CardTitle className="font-display text-xl">{user ? "Confirm" : "Account & billing"}</CardTitle>
              </div>
              <CardDescription>
                {user ? "Signed in as " + user.email : "Your account is created here — no separate signup page required."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {user ? (
                <form onSubmit={handleMemberSubmit} className="space-y-5">
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm">
                    <p className="font-medium text-foreground">Purchasing as</p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on payment method (optional)</Label>
                    <Input id="card-name" autoComplete="cc-name" placeholder="As shown on card" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="card-num">Card number</Label>
                      <Input id="card-num" inputMode="numeric" autoComplete="cc-number" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-exp">Expiry</Label>
                      <Input id="card-exp" autoComplete="cc-exp" placeholder="MM / YY" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms-m" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-1" />
                    <label htmlFor="terms-m" className="text-sm leading-snug text-muted-foreground">
                      I authorize this charge and agree to the membership terms.
                    </label>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                    Complete purchase
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleGuestSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    <p className="text-xs text-muted-foreground">At least 8 characters. Used to sign in to your dashboard.</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="card-name-g">Name on card</Label>
                    <Input id="card-name-g" autoComplete="cc-name" placeholder="Optional for this step" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="card-num-g">Card number</Label>
                      <Input id="card-num-g" inputMode="numeric" autoComplete="cc-number" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-exp-g">Expiry</Label>
                      <Input id="card-exp-g" autoComplete="cc-exp" placeholder="MM / YY" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms-g" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-1" />
                    <label htmlFor="terms-g" className="text-sm leading-snug text-muted-foreground">
                      I authorize this charge, agree to the membership terms, and understand my account will be created with the email and password above.
                    </label>
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                    Pay &amp; create account
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/auth" className="font-medium text-primary underline-offset-4 hover:underline">
                      Sign in
                    </Link>{" "}
                    — your cart will stay in this browser session.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="font-display text-lg">Order summary</CardTitle>
              <CardDescription>Curated Doctor Directory (CDD) included with membership.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                {lineSummary.map((line) => (
                  <li key={line.label} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{line.label}</span>
                    <span className="font-medium tabular-nums">{line.sub}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Total due</span>
                <span className="font-display text-2xl font-semibold tabular-nums">{formatCents(subtotalCents)}</span>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/cart">Edit cart</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
};

export default Checkout;
