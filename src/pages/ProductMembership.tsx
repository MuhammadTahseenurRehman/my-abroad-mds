import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { useSEO } from "@/hooks/useSEO";
import { getPlanById } from "@/data/membershipPlans";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ProductMembership = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { setQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const plan = getPlanById(planId);

  useSEO({
    title: plan ? `${plan.name} — My Abroad Care` : "Membership — My Abroad Care",
    description: plan?.description ?? "Membership plans for travel health and the Curated Doctor Directory.",
    path: plan ? `/product/${plan.id}` : "/memberships",
  });

  if (!plan) {
    return (
      <PublicShell>
        <div className="container py-24 text-center">
          <h1 className="font-display text-2xl font-semibold">Plan not found</h1>
          <p className="mt-2 text-muted-foreground">This membership is not available.</p>
          <Button asChild className="mt-6">
            <Link to="/memberships">Back to memberships</Link>
          </Button>
        </div>
      </PublicShell>
    );
  }

  const handleAddToCart = () => {
    setQuantity(plan.id, qty);
    toast.success("Added to cart", { description: `${plan.name} × ${qty}` });
    navigate("/cart");
  };

  return (
    <PublicShell>
      <div className="border-b border-border/60 bg-secondary/30">
        <div className="container py-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/memberships" className="hover:text-foreground">
            Memberships
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{plan.name}</span>
        </div>
      </div>

      <section className="container py-12 md:py-16">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Membership</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">{plan.name}</h1>
            <p className="mt-4 text-lg italic text-muted-foreground">{plan.description}</p>

            <ul className="mt-8 space-y-3 text-foreground">
              {plan.detailBullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-border/60 bg-card/50 p-6">
              <h2 className="font-display text-lg font-semibold">Who it&apos;s for</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{plan.audience}</p>
            </div>
          </div>

          <Card className="border-border/60 shadow-elegant lg:sticky lg:top-24">
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-display text-3xl font-semibold">{plan.price}</p>
                <p className="text-sm text-muted-foreground">
                  Duration: <span className="text-foreground">{plan.durationLabel}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Coverage: <span className="text-foreground">{plan.coverage}</span>
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{qty}</span>
                  <Button type="button" variant="outline" size="icon" className="h-9 w-9" onClick={() => setQty((q) => q + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button type="button" variant="hero" size="lg" className="w-full gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/memberships">Browse all plans</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicShell>
  );
};

export default ProductMembership;
