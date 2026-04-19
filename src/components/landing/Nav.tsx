import { Button } from "@/components/ui/button";
import { Globe2, Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/find-doctors", label: "Find Doctors" },
  { to: "/memberships", label: "Memberships" },
  { to: "/health-vault", label: "Health Vault" },
  { to: "/corporate-solutions", label: "Corporate" },
  { to: "/for-doctors", label: "For Doctors" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const useTheme = () => {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  return { isDark, toggle: () => setIsDark((v) => !v) };
};

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Globe2 className="h-4 w-4" />
          </span>
          My Abroad Care
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Shopping cart">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
          <Button asChild variant="hero" size="sm"><Link to="/memberships">Get started</Link></Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <ul className="container flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm",
                    pathname === l.to ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-2 px-3">
              <Button asChild variant="outline" size="sm" className="col-span-2" onClick={() => setOpen(false)}>
                <Link to="/cart">Cart{itemCount > 0 ? ` (${itemCount})` : ""}</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" onClick={() => setOpen(false)}>
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button asChild variant="hero" size="sm" onClick={() => setOpen(false)}>
                <Link to="/memberships">Get started</Link>
              </Button>
            </li>
            <li className="px-3">
              <Button variant="outline" size="sm" className="w-full" onClick={toggle}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? "Light mode" : "Dark mode"}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
