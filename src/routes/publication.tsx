import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { CornerFlourish, SealSketch } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { publications } from "@/data/journal";

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

  const filtered = useMemo(
    () =>
      publications.filter((p) =>
        decade === "all" ? true : decade === "2020s" ? p.year >= 2020 : p.year < 2020,
      ),
    [decade],
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

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} as="li">
              <article className="museum-frame paper-grain relative h-full p-7">
                <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
                <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
                <SealSketch className="pointer-events-none absolute -top-4 -right-4 size-24 text-terracotta/15" />
                <p className="eyebrow">{p.period}</p>
                <h2 className="mt-2 font-display text-xl leading-snug text-primary">{p.title}</h2>
                <p className="mt-2 font-serif text-lg text-foreground/75">{p.volume}</p>
                <span className="gold-rule mt-3 block w-16" />
                <Button variant="outline" size="sm" className="engraved mt-5">
                  <Download className="size-3.5" /> Download
                </Button>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          Volumes have also been uploaded to the International E-library, www.libgenesis.org.
        </p>
      </section>
    </>
  );
}
