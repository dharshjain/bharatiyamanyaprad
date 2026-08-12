import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CornerFlourish } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { supabase, type Publication } from "@/lib/supabase";
import { publications as staticPublications } from "@/data/journal";

export const Route = createFileRoute("/publication")({
  component: PublicationPage,
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

function PublicationPage() {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("publications").select("*").order("sort_order");
      if (data && !error) {
        setPublications(data as Publication[]);
      } else {
        // Fallback to static data
        setPublications(
          staticPublications.map((p, i) => ({
            id: String(i),
            journal_name: p.journal_name || "Bharatiya Manyaprad",
            title: p.title,
            volume: p.volume,
            period: p.period,
            year: p.year,
            issue_no: p.issue_no || null,
            pages: p.pages || null,
            author: p.author || null,
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

  // Derive available years from data, sorted descending
  const availableYears = useMemo(() => {
    const years = [...new Set(publications.map((p) => p.year))];
    return years.sort((a, b) => b - a);
  }, [publications]);

  const filtered = useMemo(
    () =>
      publications.filter((p) =>
        selectedYear === "all" ? true : p.year === selectedYear,
      ),
    [selectedYear, publications],
  );

  return (
    <>
      <PageHero
        eyebrow="Publication"
        title="Published volumes"
        intro="Every volume of Bharatiya Manyaprad since 2013, available to read and download."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* Year Filter Bar */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by year">
          <button
            onClick={() => setSelectedYear("all")}
            aria-pressed={selectedYear === "all"}
            className={`min-h-11 rounded-md border px-4 text-sm transition-colors ${
              selectedYear === "all"
                ? "border-accent bg-secondary text-primary"
                : "border-border text-muted-foreground hover:border-accent/60"
            }`}
          >
            All years
          </button>
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              aria-pressed={selectedYear === year}
              className={`min-h-11 rounded-md border px-4 text-sm transition-colors ${
                selectedYear === year
                  ? "border-accent bg-secondary text-primary"
                  : "border-border text-muted-foreground hover:border-accent/60"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 60} as="li" className="flex">
                <article
                  className="relative rounded-3xl p-6 pt-8 hover:translate-y-[-6px] hover:shadow-[0_20px_40px_rgba(184,134,11,0.12)] transition-all duration-500 flex flex-col w-full group text-center border border-accent/25 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--card), var(--background))",
                    minHeight: "320px",
                  }}
                >
                  {/* Double thin border for historic charter look */}
                  <div className="absolute inset-2 rounded-[22px] border border-accent/15 pointer-events-none" />

                  {/* Corner flourishes in all four corners */}
                  <CornerFlourish className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-accent/40" />
                  <CornerFlourish className="pointer-events-none absolute top-3.5 right-3.5 size-4 rotate-90 text-accent/40" />
                  <CornerFlourish className="pointer-events-none absolute bottom-3.5 left-3.5 size-4 -rotate-90 text-accent/40" />
                  <CornerFlourish className="pointer-events-none absolute bottom-3.5 right-3.5 size-4 rotate-180 text-accent/40" />

                  {/* Card Content — flex-1 pushes button to bottom */}
                  <div className="flex-1 flex flex-col justify-center relative z-10 space-y-3">
                    {/* Journal Name — Top */}
                    <h3 className="font-display text-sm tracking-[0.18em] text-accent/90 uppercase font-semibold truncate">
                      {p.journal_name || "Bharatiya Manyaprad"}
                    </h3>

                    {/* Volume / No. / Year / pp. line */}
                    <p className="font-serif text-sm text-foreground/75 italic truncate">
                      {[
                        p.volume,
                        p.issue_no,
                        String(p.year),
                        p.pages,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>

                    <div className="flex items-center justify-center gap-1.5 opacity-45">
                      <span className="h-[0.5px] w-5 bg-accent" />
                      <span className="text-[0.4rem] text-accent">✦</span>
                      <span className="h-[0.5px] w-5 bg-accent" />
                    </div>

                    {/* Title — clamped to 3 lines max */}
                    <h2 className="font-display text-lg leading-snug text-primary group-hover:text-accent transition-colors duration-300 line-clamp-3">
                      {p.title}
                    </h2>

                    {/* Author — always reserves space */}
                    <p className="font-serif text-sm text-muted-foreground min-h-[1.4em] truncate">
                      {p.author ? `by ${p.author}` : "\u00A0"}
                    </p>
                  </div>

                  {/* Action button — always at bottom */}
                  <div className="mt-auto pt-4 z-10">
                    {p.pdf_url ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="engraved w-full py-5 rounded-xl border-accent/20 hover:border-accent"
                        asChild
                      >
                        <a href={p.pdf_url} target="_blank" rel="noopener noreferrer" download>
                          <Download className="size-3.5 mr-1.5" /> Download PDF
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="engraved w-full py-5 rounded-xl border-accent/20"
                        disabled
                      >
                        <Download className="size-3.5 mr-1.5" /> Download PDF
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
