import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Globe2, Loader2 } from "lucide-react";

const credSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/app", { replace: true });
  }, [user, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message.includes("Invalid") ? "Invalid email or password." : error.message);
      return;
    }
    navigate("/app", { replace: true });
  };

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/app`,
    });
    if (error) {
      setBusy(false);
      toast.error(error.message ?? "Could not sign in with Google");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-secondary via-background to-background px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2 font-display text-2xl font-semibold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Globe2 className="h-5 w-5" />
          </span>
          My Abroad Care
        </Link>
        <Card className="border-border/60 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Sign in</CardTitle>
            <CardDescription>
              New accounts are created when you{" "}
              <Link to="/memberships" className="font-medium text-primary underline-offset-4 hover:underline">
                purchase a membership
              </Link>{" "}
              — add to cart, then checkout with your name, email, and password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-in">Email</Label>
                <Input id="email-in" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw-in">Password</Label>
                <Input id="pw-in" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign in
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={busy}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                <path fill="#4285F4" d="M21.6 12.227c0-.71-.064-1.392-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.227c1.886-1.737 2.986-4.295 2.986-7.351z" />
                <path fill="#34A853" d="M12 22c2.7 0 4.964-.895 6.614-2.422l-3.227-2.51c-.895.6-2.04.954-3.387.954-2.604 0-4.81-1.76-5.598-4.123H3.064v2.59A9.997 9.997 0 0 0 12 22z" />
                <path fill="#FBBC05" d="M6.402 13.9A6.005 6.005 0 0 1 6.09 12c0-.66.114-1.302.313-1.9V7.51H3.064A9.997 9.997 0 0 0 2 12c0 1.614.387 3.14 1.064 4.49l3.338-2.59z" />
                <path fill="#EA4335" d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.864-2.864C16.96 3.043 14.696 2 12 2A9.997 9.997 0 0 0 3.064 7.51l3.338 2.59C7.19 7.736 9.396 5.977 12 5.977z" />
              </svg>
              Continue with Google
            </Button>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to our terms and privacy policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
