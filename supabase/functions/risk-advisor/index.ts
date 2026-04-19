import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a senior international travel medicine physician.
Given a trip brief (destination, dates, traveler profile, conditions, medications), produce a concise, accurate, destination-specific health risk report.
- Use real, current public-health knowledge (CDC, WHO, IAMAT) for the destination.
- Tailor advice to the traveler's conditions and medications when provided.
- Be specific (name diseases, vaccine names, drug classes, real local emergency numbers).
- Never diagnose. Recommend consulting a physician for any prescription.
- Keep summaries under 600 characters.
Always call the "return_risk_report" tool to return the structured report.`;

const tool = {
  type: "function",
  function: {
    name: "return_risk_report",
    description: "Return a structured travel-health risk report.",
    parameters: {
      type: "object",
      properties: {
        summary: { type: "string", description: "2-4 sentence overview tailored to the trip and traveler." },
        overall_risk: { type: "string", enum: ["low", "moderate", "high"] },
        vaccinations: { type: "array", items: { type: "string" }, description: "Recommended vaccines for this destination/traveler." },
        medications: { type: "array", items: { type: "string" }, description: "Suggested OTC or prescription items to bring (with dosage when relevant)." },
        health_risks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              severity: { type: "string", enum: ["low", "moderate", "high"] },
              advice: { type: "string" },
            },
            required: ["name", "severity", "advice"],
            additionalProperties: false,
          },
        },
        emergency: {
          type: "object",
          properties: {
            local_number: { type: "string", description: "Real local emergency number (e.g. 112, 911, 119)." },
            nearest_care: { type: "string", description: "Brief note on accessing international-standard care in the destination." },
          },
          required: ["local_number", "nearest_care"],
          additionalProperties: false,
        },
        recommendations: { type: "array", items: { type: "string" }, description: "Practical pre-trip and on-the-ground recommendations." },
      },
      required: ["summary", "overall_risk", "vaccinations", "medications", "health_risks", "emergency", "recommendations"],
      additionalProperties: false,
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { destination, startDate, endDate, travelerType, conditions, medications, notes } = body ?? {};

    if (typeof destination !== "string" || destination.trim().length < 2) {
      return new Response(JSON.stringify({ error: "Destination is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = [
      `Destination: ${destination}`,
      startDate && endDate ? `Travel dates: ${startDate} to ${endDate}` : null,
      travelerType ? `Traveler type: ${travelerType}` : null,
      conditions ? `Pre-existing conditions: ${conditions}` : "Pre-existing conditions: none reported",
      medications ? `Current medications: ${medications}` : "Current medications: none reported",
      notes ? `Additional notes: ${notes}` : null,
    ].filter(Boolean).join("\n");

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "return_risk_report" } },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Settings → Workspace → Usage." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await aiRes.json();
    const args = json?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) {
      console.error("No tool call in response", JSON.stringify(json).slice(0, 500));
      return new Response(JSON.stringify({ error: "AI did not return a structured report" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = JSON.parse(args);
    return new Response(JSON.stringify(parsed), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("risk-advisor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
