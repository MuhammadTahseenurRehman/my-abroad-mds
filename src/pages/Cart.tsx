import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/contexts/CartContext";
import { formatCents } from "@/data/membershipPlans";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const { items, subtotalCents, setQuantity, removeLine } = useCart();

  useSEO({
    title: "Cart — My Abroad Care",
    description: "Review your membership selections and proceed to checkout.",
    path: "/cart",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="Cart"
        title={<>Your <span className="text-primary">membership</span> cart</>}
        description="Review your plans, adjust quantities, and continue to checkout to create your account and activate access."
      />

      <section className="container pb-20">
        {items.length === 0 ? (
          <Card className="mx-auto max-w-lg border-dashed border-border/60">
            <CardContent className="py-14 text-center">
              <p className="font-display text-lg font-semibold">Your cart is empty</p>
              <p className="mt-2 text-sm text-muted-foreground">Choose a membership to get started with the Curated Doctor Directory.</p>
              <Button asChild className="mt-6">
                <Link to="/memberships">Browse memberships</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mx-auto grid max-w-3xl gap-8">
            <ul className="space-y-4">
              {items.map(({ plan, quantity, lineTotalCents }) => (
                <li key={plan.id}>
                  <Card className="border-border/60">
                    <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${plan.id}`} className="font-display text-lg font-semibold text-primary hover:underline">
                          {plan.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {plan.durationLabel} · {plan.coverage} coverage
                        </p>
                        <p className="mt-1 text-sm">{plan.price} each</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                        <div className="flex items-center gap-2">
                          <label className="sr-only" htmlFor={`qty-${plan.id}`}>
                            Quantity
                          </label>
                          <Input
                            id={`qty-${plan.id}`}
                            type="number"
                            min={1}
                            max={99}
                            className="h-9 w-16 text-center"
                            value={quantity}
                            onChange={(e) => {
                              const n = Number.parseInt(e.target.value, 10);
                              if (Number.isFinite(n)) setQuantity(plan.id, Math.min(99, Math.max(1, n)));
                            }}
                          />
                        </div>
                        <p className="min-w-[6rem] text-right font-display font-semibold">{formatCents(lineTotalCents)}</p>
                        <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeLine(plan.id)} aria-label="Remove">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl font-semibold">{formatCents(subtotalCents)}</span>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">Taxes or payment processor fees may apply at checkout where applicable.</p>
                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/checkout">Proceed to checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/memberships">Continue shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </PublicShell>
  );
};

export default Cart;
