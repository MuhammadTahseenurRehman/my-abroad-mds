import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Loader2, Stethoscope } from "lucide-react";
import { toast } from "sonner";

type Provider = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  country: string;
  languages: string[];
  rating: number;
  review_count: number;
  price_tier: number;
  accepted_insurance: string[];
  latitude: number | null;
  longitude: number | null;
  photo_url: string | null;
  verified: boolean;
};

const Directory = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [insurance, setInsurance] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("3");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("id,name,specialty,city,country,languages,rating,review_count,price_tier,accepted_insurance,latitude,longitude,photo_url,verified")
        .order("rating", { ascending: false });
      if (error) toast.error(error.message);
      setProviders((data ?? []) as Provider[]);
      setLoading(false);
    })();
  }, []);

  const cities = useMemo(() => Array.from(new Set(providers.map((p) => p.city))).sort(), [providers]);
  const specialties = useMemo(() => Array.from(new Set(providers.map((p) => p.specialty))).sort(), [providers]);
  const insurers = useMemo(
    () => Array.from(new Set(providers.flatMap((p) => p.accepted_insurance))).sort(),
    [providers],
  );

  const filtered = providers.filter((p) => {
    if (q && !`${p.name} ${p.specialty} ${p.city} ${p.country}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (city !== "all" && p.city !== city) return false;
    if (specialty !== "all" && p.specialty !== specialty) return false;
    if (insurance !== "all" && !p.accepted_insurance.includes(insurance)) return false;
    if (Number(p.rating) < Number(minRating)) return false;
    if (p.price_tier > Number(maxPrice)) return false;
    return true;
  });

  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Doctor Directory</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          English-speaking doctors and clinics, vetted for international patients.
        </p>
      </header>

      <Card className="mb-6 border-border/60">
        <CardContent className="grid gap-4 p-4 md:grid-cols-6">
          <div className="md:col-span-2">
            <Label htmlFor="search" className="mb-1.5 block">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="search" placeholder="Name, specialty, city…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block">Specialty</Label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All specialties</SelectItem>
                {specialties.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block">Insurance</Label>
            <Select value={insurance} onValueChange={setInsurance}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                {insurers.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="mb-1.5 block">Min rating</Label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block">Max price</Label>
              <Select value={maxPrice} onValueChange={setMaxPrice}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">$</SelectItem>
                  <SelectItem value="2">$$</SelectItem>
                  <SelectItem value="3">$$$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{filtered.length} provider{filtered.length === 1 ? "" : "s"}</p>
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list">
          {loading ? (
            <div className="grid place-items-center py-20 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => <ProviderCard key={p.id} provider={p} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="map">
          <MapView providers={filtered} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EmptyState = () => (
  <Card className="border-dashed border-border/60">
    <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-muted-foreground">
        <Stethoscope className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold">No providers yet</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Either no providers match your filters, or the directory is empty. Add providers from the Cloud dashboard to get started.
      </p>
    </CardContent>
  </Card>
);

const ProviderCard = ({ provider }: { provider: Provider }) => {
  const priceLabel = "$".repeat(provider.price_tier);
  return (
    <Card className="group overflow-hidden border-border/60 transition-shadow hover:shadow-elegant">
      <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/10">
        {provider.photo_url ? (
          <img src={provider.photo_url} alt={provider.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center text-primary/40">
            <Stethoscope className="h-12 w-12" />
          </div>
        )}
      </div>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          </div>
          {provider.verified && <Badge variant="secondary">Verified</Badge>}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {provider.city}, {provider.country}</span>
          <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-current text-accent" /> {Number(provider.rating).toFixed(1)} ({provider.review_count})</span>
          <span className="text-foreground/80">{priceLabel}</span>
        </div>
        {provider.languages.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {provider.languages.slice(0, 3).map((l) => (
              <Badge key={l} variant="outline" className="text-xs">{l}</Badge>
            ))}
          </div>
        )}
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to={`/app/directory/${provider.id}`}>View details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const MapView = ({ providers }: { providers: Provider[] }) => {
  const withCoords = providers.filter((p) => p.latitude != null && p.longitude != null);
  return (
    <Card className="border-border/60">
      <CardContent className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-secondary to-accent/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.15),transparent_60%),radial-gradient(circle_at_70%_60%,hsl(var(--accent)/0.15),transparent_60%)]" />
          {withCoords.length === 0 ? (
            <div className="absolute inset-0 grid place-items-center px-4 text-center">
              <div className="max-w-sm space-y-2">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Map preview. Add latitude and longitude to providers to see them plotted here, or upgrade to interactive Mapbox.
                </p>
              </div>
            </div>
          ) : (
            withCoords.map((p) => {
              const left = ((p.longitude! + 180) / 360) * 100;
              const top = ((90 - p.latitude!) / 180) * 100;
              return (
                <Link
                  key={p.id}
                  to={`/app/directory/${p.id}`}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  title={`${p.name} — ${p.city}`}
                >
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant ring-2 ring-background">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Directory;
