import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  topic: z.string().max(60).optional(),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(2000),
});

const Contact = () => {
  useSEO({
    title: "Contact — My Abroad Care Abroad",
    description: "Get in touch with the My Abroad Care team. Sales, partnerships, doctor onboarding, and support inquiries welcome.",
    path: "/contact",
  });

  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.functions.invoke("contact-submit", { body: parsed.data });
      if (error) throw error;
      setSent(true);
      setForm({ name: "", email: "", topic: "", message: "" });
      toast.success("Thanks! We'll get back to you within 1 business day.");
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PublicShell>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="text-primary">talk</span></>}
        description="Sales, partnerships, doctor onboarding, support — pick the topic and we'll route your message to the right person."
      />

      <section className="container grid gap-8 py-16 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Card className="border-border/60">
            <CardContent className="space-y-2 p-6">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">hello@My Abroad Careabroad.com</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="space-y-2 p-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Support</h3>
              <p className="text-sm text-muted-foreground">In-app chat for members, 24/7. Average response under 5 minutes.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60 lg:col-span-2">
          <CardContent className="p-6 md:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="font-display text-2xl font-semibold">Message sent!</h3>
                <p className="max-w-md text-muted-foreground">Thanks for reaching out. We'll get back to you within 1 business day.</p>
                <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={form.name} onChange={update("name")} required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={update("email")} required maxLength={255} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic (optional)</Label>
                  <Input id="topic" placeholder="Sales, partnership, support…" value={form.topic} onChange={update("topic")} maxLength={60} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg">Message</Label>
                  <Textarea id="msg" rows={6} value={form.message} onChange={update("message")} required maxLength={2000} />
                </div>
                <Button type="submit" variant="hero" disabled={busy} className="w-full sm:w-auto">
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </PublicShell>
  );
};

export default Contact;
