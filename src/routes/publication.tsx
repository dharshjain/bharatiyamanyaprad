import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CornerFlourish, LotusMark, MajesticLotus } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { supabase, type Publication } from "@/lib/supabase";
import { publications as staticPublications } from "@/data/journal";
import heritageLotus from "@/assets/heritage-lotus.png";

export const Route = createFileRoute("/publication")({
  component: Publication,
  head: () => ({
    meta: [
      { title: "Publication — Bharatiya Manyaprad Volumes" },
      {
        name: "description",
        content:
          "Download published volumes of Bharatiya Manyaprad, from the inaugural International Journal of Indian Studies June 2013 to Vol XI May 2024.",
      },
      { property: "og:title", content: "Publication — Bharatiya Manyaprad Volumes" },
      {
        property: "og:description",
        content: "All published volumes of the International Journal of Indian Studies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/publication" },
    ],
    links: [{ rel: "canonical", href: "/publication" }],
  }),
});

function Publication() {
  const [decade, setDecade] = useState<"all" | "2020s" | "2010s">("all");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("sort_order");
      if (data && !error) {
        setPublications(data as Publication[]);
      } else {
        // Fallback to static data
        setPublications(
          staticPublications.map((p, i) => ({
            id: String(i),
            title: p.title,
            volume: p.volume,
            period: p.period,
            year: p.year,
            pdf_url: null,
            pdf_name: null,
            sort_order: i,
            created_at: "",
            updated_at: "",
          })),
        );
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = useMemo(
    () =>
      publications.filter((p) =>
        decade === "all" ? true : decade === "2020s" ? p.year >= 2020 : p.year < 2020,
      ),
    [decade, publications],
  );

  return (
    <>
      <PageHero
        eyebrow="Publication"
        title="Published volumes"
        intro="Every volume of Bharatiya Manyaprad since 2013, available to read and download."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by decade">
          {(["all", "2020s", "2010s"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDecade(d)}
              aria-pressed={decade === d}
              className={`min-h-11 rounded-md border px-4 text-sm transition-colors ${
                decade === d
                  ? "border-accent bg-secondary text-primary"
                  : "border-border text-muted-foreground hover:border-accent/60"
              }`}
            >
              {d === "all" ? "All years" : d}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 60} as="li">
                <article 
                  className="relative rounded-3xl p-6 pt-16 hover:translate-y-[-6px] hover:shadow-[0_20px_40px_rgba(184,134,11,0.12)] transition-all duration-500 flex flex-col justify-between h-full group text-center border border-accent/25 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--card), var(--background))",
                  }}
                >
                  {/* Double thin border for historic charter look */}
                  <div className="absolute inset-2 rounded-[22px] border border-accent/15 pointer-events-none" />
                  
                  {/* Corner flourishes in all four corners */}
                  <CornerFlourish className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-accent/40" />
                  <CornerFlourish className="pointer-events-none absolute top-3.5 right-3.5 size-4 rotate-90 text-accent/40" />
                  <CornerFlourish className="pointer-events-none absolute bottom-3.5 left-3.5 size-4 -rotate-90 text-accent/40" />
                  <CornerFlourish className="pointer-events-none absolute bottom-3.5 right-3.5 size-4 rotate-180 text-accent/40" />

                  {/* Period heading - top-left */}
                  <div className="absolute top-5 left-7 flex flex-col items-start gap-0.5">
                    <span className="font-display text-[0.68rem] tracking-[0.18em] uppercase text-accent-foreground font-semibold">
                      {p.period}
                    </span>
                    <div className="flex items-center gap-1 opacity-45">
                      <span className="h-[0.5px] w-3.5 bg-accent" />
                      <span className="text-[0.4rem] text-accent">✦</span>
                      <span className="h-[0.5px] w-3.5 bg-accent" />
                    </div>
                  </div>

                  {/* Lotus Medallion - top-right */}
                  <div className="absolute top-5 right-7 size-10 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center text-accent/70 shadow-[0_0_12px_rgba(184,134,11,0.08)] hover:scale-105 transition-transform duration-300">
                    <LotusMark className="size-4.5" />
                  </div>

                  {/* Center Glowing Lotus Flower Image */}
                  <div className="flex flex-col items-center pt-4 pb-2">
                    <div className="relative w-40 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full scale-110 pointer-events-none opacity-40 dark:opacity-65" />
                      <img 
                        src={heritageLotus} 
                        alt="Golden Lotus"
                        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 invert hue-rotate-[180deg] brightness-[0.45] contrast-[1.2] dark:invert-0 dark:hue-rotate-0 dark:brightness-100 dark:contrast-100"
                      />
                    </div>
                  </div>

                  {/* Card Info Texts */}
                  <div className="space-y-1">
                    <h3 className="font-display text-xs tracking-[0.22em] text-accent/90 uppercase font-semibold">
                      Bharatiya Manyaprad
                    </h3>
                    
                    <h2 className="font-display text-lg leading-snug text-primary group-hover:text-accent transition-colors duration-300">
                      {p.title}
                    </h2>
                    
                    <p className="font-serif text-sm italic text-foreground/75">
                      {p.volume}
                    </p>
                    
                    <div className="flex items-center justify-center gap-1.5 opacity-45 pt-1">
                      <span className="h-[0.5px] w-5 bg-accent" />
                      <span className="text-[0.4rem] text-accent">✦</span>
                      <span className="h-[0.5px] w-5 bg-accent" />
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="mt-6 z-10">
                    {p.pdf_url ? (
                      <Button variant="outline" size="sm" className="engraved w-full py-5 rounded-xl border-accent/20 hover:border-accent" asChild>
                        <a href={p.pdf_url} target="_blank" rel="noopener noreferrer" download>
                          <Download className="size-3.5 mr-1.5" /> Download volume
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="engraved w-full py-5 rounded-xl border-accent/20" disabled>
                        <Download className="size-3.5 mr-1.5" /> Download volume
                      </Button>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        <p className="mt-10 text-sm text-muted-foreground">
          Volumes have also been uploaded to the International E-library, www.libgenesis.org.
        </p>
      </section>
    </>
  );
}
