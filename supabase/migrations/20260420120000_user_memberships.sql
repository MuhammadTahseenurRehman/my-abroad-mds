-- Purchased memberships linked to auth users (created at checkout or added when signed in)
CREATE TABLE public.user_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_memberships_user_id ON public.user_memberships(user_id);
CREATE INDEX idx_user_memberships_plan_id ON public.user_memberships(plan_id);

ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memberships"
  ON public.user_memberships FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memberships"
  ON public.user_memberships FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
