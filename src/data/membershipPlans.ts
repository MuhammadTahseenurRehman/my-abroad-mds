export type MembershipPlan = {
  id: string;
  name: string;
  tag?: string;
  price: string;
  priceCents: number;
  period: string;
  durationLabel: string;
  coverage: string;
  audience: string;
  description: string;
  features: string[];
  detailBullets: string[];
  highlight?: boolean;
  cta: string;
};

/**
 * Six simple, distinct tier names (not copied from competitors).
 * IDs are stable URLs: /product/:id
 */
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "trip-essential",
    name: "Trip Essential",
    price: "$49.00",
    priceCents: 4900,
    period: "",
    durationLabel: "2 weeks",
    coverage: "5 cities",
    audience: "Weekend trips, work travel, and short getaways when you want coverage without complexity.",
    description: "Perfect for a single trip — directory, vault basics, and one AI trip brief.",
    features: [
      "Doctor directory access",
      "PIMS 2.0 vault",
      "AI risk advisor (1 trip)",
      "Email support",
    ],
    detailBullets: [
      "Access up to 5 cities for the length of your short trip.",
      "Help finding English-speaking doctors, clinics, and pharmacies when you need them.",
      "Secure storage for travel health documents in your vault.",
    ],
    cta: "View plan",
  },
  {
    id: "study-compass",
    name: "Study Compass",
    price: "$79.00",
    priceCents: 7900,
    period: "",
    durationLabel: "1 semester",
    coverage: "15 cities",
    audience: "Students abroad who need clear access to care between campus, travel, and breaks.",
    description: "One semester of directory access shaped around study travel patterns.",
    features: [
      "Expanded directory for student routes",
      "Acute-care routing & campus-area focus",
      "Vault + school health checklist",
      "Email support",
    ],
    detailBullets: [
      "Coverage across up to 15 cities for the semester.",
      "Prioritized English-speaking and student-friendly providers.",
      "Vault space for immunizations, prescriptions, and forms.",
    ],
    cta: "View plan",
  },
  {
    id: "flex-month",
    name: "Flex Month",
    price: "$99.00",
    priceCents: 9900,
    period: "",
    durationLabel: "1 month",
    coverage: "10 cities",
    audience: "Multi-stop trips over a few weeks — change plans without losing health support.",
    description: "Flexible monthly access when your itinerary shifts.",
    features: [
      "Full directory within 10 cities / month",
      "Telemedicine booking assistance",
      "Priority email support",
      "AI advisor for the active month",
    ],
    detailBullets: [
      "Use up to 10 cities during your membership month.",
      "Coordination help as destinations change.",
      "Assistance booking telemedicine where available.",
    ],
    tag: "Flexible",
    cta: "View plan",
  },
  {
    id: "everywhere-year",
    name: "Everywhere Year",
    tag: "Most popular",
    price: "$199.00",
    priceCents: 19900,
    period: "/ year",
    durationLabel: "Per year",
    coverage: "10 cities",
    audience: "Frequent travelers and remote workers who want year-round directory and AI support.",
    description: "Always-on care: directory, AI, telemedicine help, and priority support for a full year.",
    features: [
      "Everything in Trip Essential",
      "Unlimited AI advisor",
      "2 telemedicine consults / month (booking help)",
      "Wearable sync",
      "Priority support",
    ],
    detailBullets: [
      "Annual access across up to 10 cities.",
      "Ongoing AI trip briefs whenever you travel.",
      "Hands-on help booking telemedicine where offered.",
      "Priority responses from member support.",
    ],
    highlight: true,
    cta: "View plan",
  },
  {
    id: "elevate-abroad",
    name: "Elevate Abroad",
    price: "$399.00",
    priceCents: 39900,
    period: "/ year",
    durationLabel: "Per year",
    coverage: "Unlimited cities",
    audience: "Long stays, relocation, or ongoing conditions — maximum coverage and escalation.",
    description: "Unlimited city coverage with concierge-style escalation for complex needs.",
    features: [
      "Unlimited directory scope",
      "Chronic-care routing",
      "Concierge escalation",
      "Deep vault & specialist coordination",
    ],
    detailBullets: [
      "No artificial city cap — plan care across your full route.",
      "Support for ongoing treatment and pre-existing conditions.",
      "Escalation to senior navigators when cases are complex.",
    ],
    cta: "View plan",
  },
  {
    id: "family-circle",
    name: "Family Circle",
    price: "$349.00",
    priceCents: 34900,
    period: "/ year",
    durationLabel: "Per year",
    coverage: "5 cities",
    audience: "Families traveling together — one dashboard, pediatric-friendly options, shared planning.",
    description: "Up to five family members under one membership with shared vault and trip profiles.",
    features: [
      "Everything in Everywhere Year",
      "5 member profiles",
      "Pediatric specialist matching",
      "Shared trip plans",
    ],
    detailBullets: [
      "Household coverage for the year across up to 5 cities.",
      "Filters and guidance for child-appropriate care abroad.",
      "Shared vault for guardians and dependents.",
    ],
    cta: "View plan",
  },
];

/** Three plans highlighted on the homepage pricing strip — matches marketing layout. */
export const HOME_PRICING_PLAN_IDS: readonly string[] = ["trip-essential", "everywhere-year", "family-circle"];

export function getPlanById(id: string | null | undefined): MembershipPlan | undefined {
  if (!id) return undefined;
  return MEMBERSHIP_PLANS.find((p) => p.id === id);
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
