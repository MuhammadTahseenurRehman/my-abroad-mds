import { Button } from "@/components/ui/button";
import { Globe2, Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#features", label: "Why us" },
  { href: "#modules", label: "Platform" },
  { href: "#pricing", label: "Memberships" },
  { href: "#corporate", label: "For business" },
  { href: "#faq", label: "FAQ" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Globe2 className="h-4 w-4" />
          </span>
          GlobalCare
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button variant="hero" size="sm">Get started</Button>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-md md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <ul className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-secondary"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex gap-2 px-3">
              <Button variant="ghost" size="sm" className="flex-1">Sign in</Button>
              <Button variant="hero" size="sm" className="flex-1">Get started</Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
