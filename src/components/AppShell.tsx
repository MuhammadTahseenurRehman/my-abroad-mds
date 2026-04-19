import { ReactNode, useLayoutEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Globe2, LayoutDashboard, Stethoscope, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/directory", label: "Doctor Directory", icon: Stethoscope },
  { to: "/app/advisor", label: "AI Risk Advisor", icon: Sparkles },
];

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="hidden w-64 flex-col border-r border-border/60 bg-background md:flex">
        <Link to="/" className="flex h-16 items-center gap-2 border-b border-border/60 px-6 font-display text-lg font-semibold text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Globe2 className="h-4 w-4" />
          </span>
          My Abroad Care
        </Link>
        <nav className="flex-1 space-y-1 p-4">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border/60 p-4">
          <p className="mb-2 truncate text-xs text-muted-foreground">{user?.email}</p>
          <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border/60 bg-background px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Globe2 className="h-4 w-4" />
            </span>
            My Abroad Care
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border/60 bg-background px-2 py-2 md:hidden">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
