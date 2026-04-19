import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Star, Phone, Mail, Globe, Stethoscope, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Provider = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  country: string;
  languages: string[];
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  bio: string | null;
  rating: number;
  review_count: number;
  price_tier: number;
  accepted_insurance: string[];
  photo_url: string | null;
  verified: boolean;
};

const ProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase.from("providers").select("*").eq("id", id).maybeSingle();
      if (error) toast.error(error.message);
      setProvider(data as Provider | null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Provider not found</h1>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/app/directory"><ArrowLeft className="h-4 w-4" /> Back to directory</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/app/directory"><ArrowLeft className="h-4 w-4" /> Back</Link>
      </Button>

      <Card className="overflow-hidden border-border/60">
        <div className="aspect-[16/6] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/10">
          {provider.photo_url ? (
            <img src={provider.photo_url} alt={provider.name} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-primary/40">
              <Stethoscope className="h-16 w-16" />
            </div>
          )}
        </div>
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight">{provider.name}</h1>
              <p className="mt-1 text-muted-foreground">{provider.specialty}</p>
            </div>
            {provider.verified && <Badge>Verified</Badge>}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> {provider.city}, {provider.country}</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-current text-accent" /> {Number(provider.rating).toFixed(1)} ({provider.review_count} reviews)</span>
            <span>{"$".repeat(provider.price_tier)}</span>
          </div>

          {provider.bio && <p className="leading-relaxed text-foreground/90">{provider.bio}</p>}

          {provider.languages.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((l) => <Badge key={l} variant="outline">{l}</Badge>)}
              </div>
            </div>
          )}

          {provider.accepted_insurance.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Accepted insurance</h3>
              <div className="flex flex-wrap gap-2">
                {provider.accepted_insurance.map((i) => <Badge key={i} variant="secondary">{i}</Badge>)}
              </div>
            </div>
          )}

          <div className="grid gap-3 border-t border-border/60 pt-6 md:grid-cols-2">
            {provider.address && (
              <Info icon={<MapPin className="h-4 w-4" />} label="Address" value={provider.address} />
            )}
            {provider.phone && (
              <Info icon={<Phone className="h-4 w-4" />} label="Phone" value={provider.phone} href={`tel:${provider.phone}`} />
            )}
            {provider.email && (
              <Info icon={<Mail className="h-4 w-4" />} label="Email" value={provider.email} href={`mailto:${provider.email}`} />
            )}
            {provider.website && (
              <Info icon={<Globe className="h-4 w-4" />} label="Website" value={provider.website} href={provider.website} external />
            )}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border/60 pt-6">
            <Button variant="hero">Request appointment</Button>
            <Button variant="outline">Save to favorites</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Info = ({ icon, label, value, href, external }: { icon: React.ReactNode; label: string; value: string; href?: string; external?: boolean }) => {
  const content = (
    <div className="flex items-start gap-3 rounded-md border border-border/60 bg-secondary/30 p-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="block transition-colors hover:[&>div]:bg-secondary">
        {content}
      </a>
    );
  }
  return content;
};

export default ProviderDetail;
