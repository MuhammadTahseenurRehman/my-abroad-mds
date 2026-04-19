import { PublicShell } from "@/components/PublicShell";
import { PageHero } from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
};

const posts: Post[] = [
  { slug: "1", title: "Traveling with diabetes: a country-by-country prep guide", excerpt: "How to plan insulin storage, time zone dosing, and emergency carb sources for 12 popular destinations.", category: "Chronic care", readTime: "8 min", date: "Apr 12, 2026" },
  { slug: "2", title: "What every digital nomad should pack in a medical kit", excerpt: "From basic OTC meds to that one prescription you'll regret forgetting — built with travel medicine doctors.", category: "Nomads", readTime: "5 min", date: "Apr 5, 2026" },
  { slug: "3", title: "Dengue is rising: 2026 outbreak update for SE Asia & LATAM", excerpt: "Where new outbreaks are happening, prevention basics, and when to seek care abroad.", category: "Outbreak", readTime: "6 min", date: "Mar 28, 2026" },
  { slug: "4", title: "How to find a great pediatrician on vacation", excerpt: "A 7-step checklist parents can use anywhere in the world — even at 2am.", category: "Family", readTime: "4 min", date: "Mar 20, 2026" },
  { slug: "5", title: "AI in travel medicine: hype vs. what actually helps", excerpt: "We dug into the research on LLM-assisted symptom triage and pre-trip risk scoring.", category: "AI", readTime: "10 min", date: "Mar 14, 2026" },
  { slug: "6", title: "Telemedicine across borders: the legal grey zones", excerpt: "Can your home doctor legally consult you while you're abroad? It depends — here's how.", category: "Policy", readTime: "7 min", date: "Mar 7, 2026" },
];

const Blog = () => {
  useSEO({
    title: "Blog — Travel health insights from GlobalCare",
    description: "Practical guides, outbreak updates, and policy explainers for travelers, families, and corporate mobility teams.",
    path: "/blog",
  });

  return (
    <PublicShell>
      <PageHero
        eyebrow="Blog"
        title={<>Travel health, <span className="text-primary">explained well</span></>}
        description="Field-tested guides written with travel medicine doctors and our community of nomads, families, and expats."
      />

      <section className="container py-16">
        <article className="mb-10 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="grid md:grid-cols-2">
            <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent/15 md:aspect-auto" aria-hidden />
            <div className="p-8 md:p-10">
              <Badge variant="secondary">Featured</Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">{posts[0].title}</h2>
              <p className="mt-3 text-muted-foreground">{posts[0].excerpt}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{posts[0].date} · {posts[0].readTime} read</p>
            </div>
          </div>
        </article>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((p) => (
            <Card key={p.slug} className="group cursor-pointer border-border/60 transition-shadow hover:shadow-elegant">
              <div className="aspect-[16/10] overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/10 to-accent/10" aria-hidden />
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">{p.category}</Badge>
                  <span className="text-xs text-muted-foreground">{p.readTime}</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="text-xs text-muted-foreground">{p.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicShell>
  );
};

export default Blog;
