import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Download } from "lucide-react";
import cover from "@/assets/issue-cover.jpg";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { currentIssue } from "@/data/journal";

export const Route = createFileRoute("/current-issue")({
  component: CurrentIssue,
  head: () => ({
    meta: [
      { title: `Current Issue ${currentIssue.volume} — Bharatiya Manyaprad` },
      {
        name: "description",
        content: `Table of contents for Bharatiya Manyaprad ${currentIssue.volume}, ${currentIssue.month} ${currentIssue.year}: five peer-reviewed studies in Indian studies.`,
      },
      { property: "og:title", content: `Current Issue ${currentIssue.volume} — Bharatiya Manyaprad` },
      {
        property: "og:description",
        content: "Read the table of contents, abstracts and DOIs of the current volume.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/current-issue" },
    ],
    links: [{ rel: "canonical", href: "/current-issue" }],
  }),
});

function CurrentIssue() {
  return (
    <>
      <PageHero
        eyebrow={`${currentIssue.volume} · ${currentIssue.month} ${currentIssue.year}`}
        title="Current Issue"
        intro="Five peer-reviewed studies on scribal culture, epigraphic power, monastic pedagogy, museum display and diasporic memory."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <img
              src={cover}
              alt={`Cover of Bharatiya Manyaprad ${currentIssue.volume}`}
              width={912}
              height={1200}
              loading="lazy"
              className="w-full rounded-lg stone-frame"
            />
            <dl className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between gap-4">
                <dt>Volume</dt>
                <dd className="text-foreground">{currentIssue.volume}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Issue</dt>
                <dd className="text-foreground">{currentIssue.number}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Published</dt>
                <dd className="text-foreground">
                  {currentIssue.month} {currentIssue.year}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>ISSN</dt>
                <dd className="text-foreground">2321-8444</dd>
              </div>
            </dl>
            <Button variant="outline" className="engraved mt-6 w-full">
              <Download className="size-4" /> Download full issue
            </Button>
          </div>
        </Reveal>

        <div>
          <h2 className="font-display text-2xl text-primary">Table of Contents</h2>
          <ol className="mt-6 space-y-5">
            {currentIssue.papers.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70} as="li">
                <article className="archive-card p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="eyebrow">{p.category}</p>
                    <p className="text-xs text-muted-foreground">pp. {p.pages}</p>
                  </div>
                  <h3 className="mt-2 font-display text-xl leading-snug text-primary">
                    <Link
                      to="/papers/$slug"
                      params={{ slug: p.slug }}
                      className="hover:text-terracotta"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.authors.join(" · ")}</p>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/80">
                    {p.abstract}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button asChild size="sm" variant="outline" className="engraved">
                      <Link to="/papers/$slug" params={{ slug: p.slug }}>
                        <BookOpen className="size-3.5" /> Read online
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-terracotta hover:text-terracotta">
                      <Download className="size-3.5" /> PDF
                    </Button>
                    <span className="text-xs text-muted-foreground">DOI {p.doi}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
