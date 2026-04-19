import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
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

const FindDoctors = () => {
  useSEO({
    title: "Find Doctors Abroad — GlobalCare",
    description: "Search English-speaking doctors and clinics in 100+ countries. Filter by city, specialty, insurance, rating, and price.",
    path: "/find-doctors",
  });

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [specialty, setSpecialty] = useState("all");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("providers")
        .select("id,name,specialty,city,country,languages,rating,review_count,price_tier,accepted_insurance,latitude,longitude,photo_url,verified")
        .order("rating", { ascending: false })
        .limit(60);
      if (error) toast.error(error.message);
      setProviders((data ?? []) as Provider[]);
      setLoading(false);
    })();
  }, []);

  const cities = useMemo(() => Array.from(new Set(providers.map((p) => p.city))).sort(), [providers]);
  const specialties = useMemo(() => Array.from(new Set(providers.map((p) => p.specialty))).sort(), [providers]);

  const filtered = providers.filter((p) => {
    if (q && !`${p.name} ${p.specialty} ${p.city} ${p.country}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (city !== "all" && p.city !== city) return false;
    if (specialty !== "all" && p.specialty !== specialty) return false;
    return true;
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="Doctor Directory"
        title={<>Find a doctor, <span className="text-primary">anywhere you go</span></>}
        description="English-speaking physicians, clinics, and hospitals — vetted for international patients."
      />

      <section className="container py-12">
        <Card className="mb-6 border-border/60">
          <CardContent className="grid gap-4 p-4 md:grid-cols-3">
            <div>
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
              <Empty />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <Card key={p.id} className="group overflow-hidden border-border/60 transition-shadow hover:shadow-elegant">
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/10">
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-primary/40">
                        <Stethoscope className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-lg font-semibold">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.specialty}</p>
                      </div>
                      {p.verified && <Badge variant="secondary">Verified</Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.city}, {p.country}</span>
                      <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-current text-accent" /> {Number(p.rating).toFixed(1)}</span>
                      <span>{"$".repeat(p.price_tier)}</span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/auth">Sign in to view details</Link>
                    </Button>
                  </CardContent>
                </Card>)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map">
            <Card className="border-border/60">
              <CardContent className="p-0">
                <div className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-secondary to-accent/5 px-4 text-center">
                  <div className="max-w-sm space-y-2">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive world map with provider pins.
                      <br />
                      <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to view full details and book consultations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Ready to plan a trip?</h2>
          <p className="mt-2 text-muted-foreground">Sign up free to unlock contact details, book telemedicine, and run an AI risk report.</p>
          <Button asChild variant="hero" className="mt-5">
            <Link to="/auth">Create free account</Link>
          </Button>
        </div>
      </section>
    </PublicShell>
  );
};

const Empty = () => (
  <Card className="border-dashed border-border/60">
    <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-muted-foreground">
        <Stethoscope className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold">No providers match those filters</h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Try clearing filters, or check back as we onboard new clinicians weekly.
      </p>
    </CardContent>
  </Card>
);

export default FindDoctors;
