import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/instructions-to-authors")({
  component: Authors,
  head: () => ({
    meta: [
      { title: "Instructions to Authors — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Manuscript preparation, referencing style, length, transliteration and image guidelines for authors submitting to Bharatiya Manyaprad.",
      },
      { property: "og:title", content: "Instructions to Authors — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "How to prepare a manuscript for the International Journal of Indian Studies.",
      },
      { property: "og:url", content: "/instructions-to-authors" },
    ],
    links: [{ rel: "canonical", href: "/instructions-to-authors" }],
  }),
});

const guides = [
  {
    h: "Length and structure",
    items: [
      "Research articles: 5,000–8,000 words including notes.",
      "Review essays: 3,000–4,000 words. Book reviews: 1,200 words.",
      "An abstract of no more than 250 words and five keywords.",
    ],
  },
  {
    h: "Style and referencing",
    items: [
      "Chicago notes-and-bibliography style, endnotes not footnotes.",
      "British spelling; italicise non-English terms on first use only.",
      "IAST transliteration for Sanskrit, Prakrit and Pali.",
    ],
  },
  {
    h: "Images and plates",
    items: [
      "Minimum 300 dpi TIFF or high-quality JPEG, supplied separately.",
      "Captions must name the object, provenance and holding institution.",
      "Written permission from the custodial institution is required.",
    ],
  },
  {
    h: "Files",
    items: [
      "Word or RTF for text; PDF for reference only.",
      "A separate title page carrying author details, for blind review.",
      "Name files as Surname_ShortTitle.",
    ],
  },
];

function Authors() {
  return (
    <>
      <PageHero
        eyebrow="For Authors"
        title="Instructions to Authors"
        intro="Clear prose, verifiable sources and a manuscript prepared for blind review. These conventions keep the record durable."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((g, i) => (
            <Reveal key={g.h} delay={i * 80}>
              <article className="archive-card h-full p-7">
                <h2 className="font-display text-lg text-primary">{g.h}</h2>
                <ul className="mt-3 space-y-2 font-serif text-base leading-relaxed text-foreground/80">
                  {g.items.map((it) => (
                    <li key={it} className="border-l border-accent/40 pl-3">
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="engraved">
              <Link to="/submission">Go to the submission desk</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
