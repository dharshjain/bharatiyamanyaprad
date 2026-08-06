import { createFileRoute } from "@tanstack/react-router";
import { Grid2X2, List } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { archives } from "@/data/journal";

export const Route = createFileRoute("/archives")({
  component: Archives,
  head: () => ({
    meta: [
      { title: "Archives — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Browse eleven volumes of Bharatiya Manyaprad from 2013 onwards by year and volume, in timeline, grid or list view.",
      },
      { property: "og:title", content: "Archives — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The complete digitised record of the International Journal of Indian Studies.",
      },
      { property: "og:url", content: "/archives" },
    ],
    links: [{ rel: "canonical", href: "/archives" }],
  }),
});

function Archives() {
  const [decade, setDecade] = useState<"all" | "2020s" | "2010s">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      archives.filter((a) =>
        decade === "all" ? true : decade === "2020s" ? a.year >= 2020 : a.year < 2020,
      ),
    [decade],
  );

  return (
    <>
      <PageHero
        eyebrow="Archive Explorer"
        title="Eleven volumes since 2013"
        intro="Every issue of Bharatiya Manyaprad, catalogued by volume and year — a continuous record of Indian studies scholarship."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 flex-wrap gap-2" role="group" aria-label="Filter by decade">
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
          <div className="flex shrink-0 gap-1" role="group" aria-label="Change layout">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              aria-label="Grid view"
              className="min-h-11 min-w-11"
              onClick={() => setView("grid")}
            >
              <Grid2X2 className="size-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              aria-label="List view"
              className="min-h-11 min-w-11"
              onClick={() => setView("list")}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>

        <ul
          className={
            view === "grid"
              ? "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-10 divide-y divide-border border-y border-border"
          }
        >
          {filtered.map((a, i) => (
            <Reveal key={`${a.volume}-${a.year}`} delay={i * 60} as="li">
              {view === "grid" ? (
                <article className="archive-card paper-grain h-full p-7">
                  <p className="eyebrow">{a.month}</p>
                  <h2 className="mt-2 font-display text-2xl text-primary">{a.volume}</h2>
                  <p className="mt-1 font-serif text-lg text-foreground/80">{a.year}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{a.papers} papers</p>
                  <Button variant="outline" size="sm" className="engraved mt-5">
                    View contents
                  </Button>
                </article>
              ) : (
                <article className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-lg text-primary">
                      {a.volume} · {a.year}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {a.month} · {a.papers} papers
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 text-terracotta">
                    View contents
                  </Button>
                </article>
              )}
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
