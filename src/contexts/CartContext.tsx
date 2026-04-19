import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MEMBERSHIP_PLANS, getPlanById, type MembershipPlan } from "@/data/membershipPlans";

const STORAGE_KEY = "mac_cart_v1";

export type CartLine = {
  planId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  items: { plan: MembershipPlan; quantity: number; lineTotalCents: number }[];
  subtotalCents: number;
  addPlan: (planId: string) => void;
  setQuantity: (planId: string, quantity: number) => void;
  removeLine: (planId: string) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadLines(): CartLine[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => typeof l.planId === "string" && l.quantity > 0);
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(() => loadLines());

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addPlan = useCallback((planId: string) => {
    const plan = getPlanById(planId);
    if (!plan) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.planId === planId);
      if (existing) {
        return prev.map((l) => (l.planId === planId ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { planId, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((planId: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.planId !== planId));
      return;
    }
    setLines((prev) => {
      const has = prev.some((l) => l.planId === planId);
      if (!has) return [...prev, { planId, quantity }];
      return prev.map((l) => (l.planId === planId ? { ...l, quantity } : l));
    });
  }, []);

  const removeLine = useCallback((planId: string) => {
    setLines((prev) => prev.filter((l) => l.planId !== planId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const { items, subtotalCents, itemCount } = useMemo(() => {
    let subtotal = 0;
    let count = 0;
    const resolved: { plan: MembershipPlan; quantity: number; lineTotalCents: number }[] = [];
    for (const line of lines) {
      const plan = MEMBERSHIP_PLANS.find((p) => p.id === line.planId);
      if (!plan) continue;
      const lineTotalCents = plan.priceCents * line.quantity;
      subtotal += lineTotalCents;
      count += line.quantity;
      resolved.push({ plan, quantity: line.quantity, lineTotalCents });
    }
    return { items: resolved, subtotalCents: subtotal, itemCount: count };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      items,
      subtotalCents,
      addPlan,
      setQuantity,
      removeLine,
      clearCart,
      itemCount,
    }),
    [lines, items, subtotalCents, addPlan, setQuantity, removeLine, clearCart, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
