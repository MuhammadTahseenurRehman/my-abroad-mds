import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Where is my medical data stored?",
    a: "By default your records live encrypted on your device (PIMS 2.0). You can opt to mirror them to your secure My Abroad Care vault, but they are never sold or shared without your explicit, time-bound consent.",
  },
  {
    q: "How does the AI Risk Advisor work?",
    a: "It combines your itinerary, your medical profile, real-time outbreak feeds, climate and altitude data, and local prescription availability to generate a clear, personalized brief — and matches you to providers on your route.",
  },
  {
    q: "Can I use insurance?",
    a: "My Abroad Care is not insurance, but our directory shows which providers accept major international plans. Membership receipts are itemized for easy reimbursement.",
  },
  {
    q: "Is the platform available worldwide?",
    a: "We currently cover 100+ countries with vetted English-speaking providers, with new cities added every week. Telemedicine is available globally.",
  },
  {
    q: "How quickly can a corporate team be onboarded?",
    a: "Most teams are live within 48 hours with SSO, bulk provisioning, and a dedicated success manager.",
  },
];

export const FAQ = () => (
  <section id="faq" className="container py-24">
    <div className="mx-auto max-w-3xl">
      <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-accent">FAQ</p>
      <h2 className="text-center font-display text-4xl font-semibold leading-tight md:text-5xl">
        Questions, answered.
      </h2>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left font-display text-lg font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
