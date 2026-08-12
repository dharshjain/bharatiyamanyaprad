import { createFileRoute } from "@tanstack/react-router";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CornerFlourish, MajesticLotus } from "@/components/site/ornaments";
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

const ITEMS_PER_PAGE = 6;

function PublicationPage() {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
            cover_url: null,
            cover_name: null,
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

  // Reset page when year changes
  const handleYearChange = (year: number | "all") => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <>
      <PageHero
        eyebrow="Publication"
        title="Published volumes"
        intro="Every volume of Bharatiya Manyaprad since 2013, available to read and download."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {/* Year Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by year">
            <button
              onClick={() => handleYearChange("all")}
              aria-pressed={selectedYear === "all"}
              className={`min-h-10 rounded-md border px-4 text-sm transition-colors ${
                selectedYear === "all"
                  ? "border-accent bg-secondary text-primary font-semibold"
                  : "border-border text-muted-foreground hover:border-accent/60"
              }`}
            >
              All years
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                aria-pressed={selectedYear === year}
                className={`min-h-10 rounded-md border px-4 text-sm transition-colors ${
                  selectedYear === year
                    ? "border-accent bg-secondary text-primary font-semibold"
                    : "border-border text-muted-foreground hover:border-accent/60"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {!loading && filtered.length > 0 && (
            <p className="text-xs text-muted-foreground font-serif">
              Showing <span className="text-accent font-semibold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span>–
              <span className="text-accent font-semibold">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of{" "}
              <span className="text-accent font-semibold">{filtered.length}</span> volumes
            </p>
          )}
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {paginatedItems.map((p, i) => (
                <Reveal key={p.id} delay={i * 60} as="li" className="flex">
                  <PublicationCard publication={p} />
                </Reveal>
              ))}
            </ul>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 min-h-10 rounded-lg border border-accent/25 px-3 py-2 text-xs font-medium text-foreground transition-all hover:border-accent hover:bg-accent/10 disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="size-4" /> Prev
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`size-9 rounded-lg text-xs font-semibold transition-all ${
                        currentPage === pageNum
                          ? "bg-accent text-accent-foreground shadow-[0_0_12px_rgba(184,134,11,0.4)]"
                          : "border border-accent/20 text-muted-foreground hover:border-accent/60 hover:text-foreground"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 min-h-10 rounded-lg border border-accent/25 px-3 py-2 text-xs font-medium text-foreground transition-all hover:border-accent hover:bg-accent/10 disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Next Page"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </>
        )}

        <p className="mt-10 text-sm text-muted-foreground">
          Volumes have also been uploaded to the International E-library, www.libgenesis.org.
        </p>
      </section>
    </>
  );
}

/**
 * Publication card that shows a cover image when available,
 * otherwise falls back to the ornamental default design.
 * Volume metadata is visually prioritised over the title.
 */
export function PublicationCard({ publication: p }: { publication: Publication }) {
  if (p.cover_url) {
    return (
      <article
        className="relative rounded-3xl p-5 pt-6 hover:translate-y-[-6px] hover:shadow-[0_20px_40px_rgba(184,134,11,0.12)] transition-all duration-500 flex flex-col justify-between w-full h-full group text-center border border-accent/25 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--card), var(--background))",
          minHeight: "360px",
        }}
      >
        {/* Double thin border for historic charter look */}
        <div className="absolute inset-2 rounded-[22px] border border-accent/15 pointer-events-none" />

        {/* Corner flourishes in all four corners */}
        <CornerFlourish className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-accent/40" />
        <CornerFlourish className="pointer-events-none absolute top-3.5 right-3.5 size-4 rotate-90 text-accent/40" />
        <CornerFlourish className="pointer-events-none absolute bottom-3.5 left-3.5 size-4 -rotate-90 text-accent/40" />
        <CornerFlourish className="pointer-events-none absolute bottom-3.5 right-3.5 size-4 rotate-180 text-accent/40" />

        {/* Stamp-sized Cover Image */}
        <div className="relative z-10 flex items-center justify-center pt-2 pb-3">
          <div className="relative group-hover:scale-105 transition-transform duration-500">
            <img
              src={p.cover_url}
              alt={`Cover of ${p.volume}`}
              className="max-h-48 w-auto rounded-md shadow-md border border-accent/20 object-contain"
            />
          </div>
        </div>

        {/* Metadata section */}
        <div className="relative z-10 space-y-1 my-2">
          {/* Volume — hero emphasis */}
          <h2 className="font-display text-base leading-snug text-accent font-semibold tracking-wide line-clamp-1">
            {p.volume}
          </h2>

          {/* Title — secondary */}
          <h3 className="font-serif text-xs text-primary/80 line-clamp-2 leading-relaxed">
            {p.title}
          </h3>

          <p className="font-serif text-[0.68rem] text-foreground/50 italic truncate">
            {[p.journal_name || "Bharatiya Manyaprad", p.period]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>

        {/* Download action button — anchored cleanly inside card */}
        <div className="relative z-10 pt-2">
          {p.pdf_url ? (
            <Button
              variant="outline"
              size="sm"
              className="engraved w-full py-4 rounded-xl border-accent/20 hover:border-accent text-xs"
              asChild
            >
              <a href={p.pdf_url} target="_blank" rel="noopener noreferrer" download>
                <Download className="size-3.5 mr-1.5" /> Download volume
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="engraved w-full py-4 rounded-xl border-accent/20 text-xs"
              disabled
            >
              <Download className="size-3.5 mr-1.5" /> Download volume
            </Button>
          )}
        </div>
      </article>
    );
  }

  /* ─── Default ornamental card (no cover image) ────────────── */
  return (
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
        {/* Lotus icon at the top */}
        <MajesticLotus className="mx-auto w-24 h-16 text-accent/50" />

        {/* Journal Name — Top */}
        <h3 className="font-display text-sm tracking-[0.18em] text-accent/90 uppercase font-semibold truncate">
          {p.journal_name || "Bharatiya Manyaprad"}
        </h3>

        {/* Volume — hero emphasis (swapped with title) */}
        <h2 className="font-display text-xl leading-snug text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {p.volume}
        </h2>

        <div className="flex items-center justify-center gap-1.5 opacity-45">
          <span className="h-[0.5px] w-5 bg-accent" />
          <span className="text-[0.4rem] text-accent">✦</span>
          <span className="h-[0.5px] w-5 bg-accent" />
        </div>

        {/* Title — secondary, smaller */}
        <p className="font-serif text-sm text-foreground/75 italic line-clamp-3">
          {p.title}
        </p>

        {/* Volume / No. / Year / pp. meta line */}
        <p className="font-serif text-xs text-foreground/55 truncate">
          {[p.issue_no, String(p.year), p.pages]
            .filter(Boolean)
            .join(", ")}
        </p>

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
              <Download className="size-3.5 mr-1.5" /> Download volume
            </a>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="engraved w-full py-5 rounded-xl border-accent/20"
            disabled
          >
            <Download className="size-3.5 mr-1.5" /> Download volume
          </Button>
        )}
      </div>
    </article>
  );
}

