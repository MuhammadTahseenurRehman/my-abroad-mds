import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, email, topic, message } = await req.json();

    if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return json({ error: "Invalid name" }, 400);
    }
    if (typeof email !== "string" || !isEmail(email) || email.length > 255) {
      return json({ error: "Invalid email" }, 400);
    }
    if (typeof message !== "string" || message.trim().length < 10 || message.length > 2000) {
      return json({ error: "Invalid message" }, 400);
    }
    if (topic && (typeof topic !== "string" || topic.length > 60)) {
      return json({ error: "Invalid topic" }, 400);
    }

    // Log the submission. Wire up a real notification channel later
    // (Lovable transactional email, Slack, CRM, etc.).
    console.log("Contact form submission", {
      name: name.trim(),
      email: email.trim(),
      topic: topic?.trim() ?? null,
      message: message.trim().slice(0, 200) + (message.length > 200 ? "…" : ""),
      received_at: new Date().toISOString(),
    });

    return json({ ok: true });
  } catch (e) {
    console.error("contact-submit error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
