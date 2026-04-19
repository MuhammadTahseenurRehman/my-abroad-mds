import { Globe2, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

type Item = { label: string; to: string };

const platform: Item[] = [
  { label: "Find Doctors", to: "/find-doctors" },
  { label: "Health Vault", to: "/health-vault" },
  { label: "AI Risk Advisor", to: "/app/advisor" },
  { label: "Memberships", to: "/memberships" },
];

const company: Item[] = [
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Corporate", to: "/corporate-solutions" },
  { label: "For Doctors", to: "/for-doctors" },
  { label: "Contact", to: "/contact" },
];

const legal: Item[] = [
  { label: "Privacy", to: "/contact" },
  { label: "Terms", to: "/contact" },
  { label: "GDPR", to: "/contact" },
  { label: "HIPAA", to: "/contact" },
];

export const Footer = () => (
  <footer className="border-t border-border bg-secondary/40">
    <div className="container grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
      <div>
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Globe2 className="h-4 w-4" />
          </span>
          My Abroad Care
        </Link>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Healthcare abroad, powered by intelligence. Prepare smarter, travel safer.
        </p>
        <div className="mt-5 flex items-center gap-3 text-muted-foreground">
          <a href="#" aria-label="Twitter" className="transition-colors hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          <a href="#" aria-label="Instagram" className="transition-colors hover:text-foreground"><Instagram className="h-4 w-4" /></a>
        </div>
      </div>
      <FooterCol title="Platform" items={platform} />
      <FooterCol title="Company" items={company} />
      <FooterCol title="Legal" items={legal} />
    </div>
    <div className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} My Abroad Care Abroad. All rights reserved.</p>
        <p>Design and development by <span className="text-primary">MTUR</span>.</p>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, items }: { title: string; items: Item[] }) => (
  <div>
    <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((i) => (
        <li key={i.label}>
          <Link to={i.to} className="transition-colors hover:text-foreground">{i.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);
