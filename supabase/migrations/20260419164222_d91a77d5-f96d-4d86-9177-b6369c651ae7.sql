CREATE TABLE public.providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT ARRAY['English']::TEXT[],
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  bio TEXT,
  price_tier SMALLINT NOT NULL DEFAULT 2 CHECK (price_tier BETWEEN 1 AND 3),
  rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  review_count INTEGER NOT NULL DEFAULT 0,
  accepted_insurance TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  photo_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_providers_city ON public.providers (city);
CREATE INDEX idx_providers_specialty ON public.providers (specialty);
CREATE INDEX idx_providers_country ON public.providers (country);

ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers are viewable by everyone"
  ON public.providers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert providers"
  ON public.providers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update providers"
  ON public.providers FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete providers"
  ON public.providers FOR DELETE
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();