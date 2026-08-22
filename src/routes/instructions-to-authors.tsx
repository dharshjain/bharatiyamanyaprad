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
    h: "Language and length",
    items: [
      "Language: English; Sanskrit or Hindi text may be supplemented as citations.",
      "Submissions of not less than 3500 words.",
      "12 pages maximum, 6 pages minimum.",
    ],
  },
  {
    h: "Page setup",
    items: [
      "Paper size A4, Times New Roman 12 pt, 1.5 line spacing.",
      'Margins 1" on right, top and bottom, and 1.5" on left.',
      "Title of the article: caps, bold, centered, 14 pt. Text justified.",
    ],
  },
  {
    h: "Style and referencing",
    items: [
      "Submissions should follow APA Style guidelines.",
      "References: authors ordered alphabetically.",
      "Titles of books in italics; titles of articles quoted.",
    ],
  },
  {
    h: "Files and declarations",
    items: [
      "Articles as MS Word documents, sent as .rtf attachment via email to the editors.",
      "First name, last name, institutional affiliation with full address and e-mail.",
      'Declaration of "Not published before" and an undertaking of originality.',
    ],
  },
];

function Authors() {
  return (
    <>
      <PageHero
        eyebrow="Author's"
        title="Notes for the contributors"
        intro="Article submissions should be preceded by a short personal and professional brief, and must meet the editing requirements below."
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
