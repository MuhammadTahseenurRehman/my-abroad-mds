import { Globe2 } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border bg-secondary/40">
    <div className="container grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
      <div>
        <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Globe2 className="h-4 w-4" />
          </span>
          GlobalCare
        </a>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Healthcare abroad, powered by intelligence. Prepare smarter, travel safer.
        </p>
      </div>
      <FooterCol title="Platform" items={["Doctor Directory", "PIMS Vault", "Telemedicine", "AI Advisor"]} />
      <FooterCol title="Company" items={["About", "Blog", "Press", "Partners"]} />
      <FooterCol title="Legal" items={["Privacy", "Terms", "GDPR", "HIPAA"]} />
    </div>
    <div className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} GlobalCare Abroad. All rights reserved.</p>
        <p>Built for the next generation of global healthcare.</p>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((i) => (
        <li key={i}>
          <a href="#" className="transition-colors hover:text-foreground">{i}</a>
        </li>
      ))}
    </ul>
  </div>
);
