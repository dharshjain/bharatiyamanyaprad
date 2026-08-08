import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/publication-ethics")({
  component: Responsibilities,
  head: () => ({
    meta: [
      { title: "Responsibilities — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Responsibilities of authors, reviewers and the editorial office of Bharatiya Manyaprad — originality, peer review, book reviews and correspondence.",
      },
      { property: "og:title", content: "Responsibilities — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "Editorial, author and reviewer responsibilities at the journal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/publication-ethics" },
    ],
    links: [{ rel: "canonical", href: "/publication-ethics" }],
  }),
});

const policies = [
  {
    h: "Author responsibilities",
    p: "Every submission must be original and accompanied by a declaration of \u201cNot published before\u201d, along with an undertaking of originality by the author. Authors must supply their full name, institutional affiliation, postal address and e-mail with the manuscript.",
  },
  {
    h: "Peer review",
    p: "Bharatiya Manyaprad is a recognized peer-reviewed journal enlisted in the UGC CARE List. Articles are liable to be published only after peer review by subject specialists.",
  },
  {
    h: "Editorial responsibilities",
    p: "The editorial office acknowledges receipt of submissions, communicates reviewer decisions, and ensures that accepted articles are typeset for the annual print volume and uploaded to the International E-library.",
  },
  {
    h: "Books for review",
    p: "Books are welcome for review. The first reference to the book should include the publisher, place and year of publication, and a first-hand copy should be mailed along with the book review.",
  },
  {
    h: "Scope and accessibility",
    p: "Articles may borrow from semiotics, psychoanalysis, queer theory and other disciplines associated with cultural studies and critical theory, while remaining accessible to a general audience.",
  },
  {
    h: "Correspondence",
    p: "Concerns regarding editorial conduct, subscriptions or submissions may be addressed to the Editor at the Ahmedabad office and are answered by the editorial desk.",
  },
];

function Responsibilities() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Responsibilities"
        intro="Scholarship on Indian civilisation carries a duty of care — to the sources, to the custodians and to the reader."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-6">
          {policies.map((s, i) => (
            <Reveal key={s.h} delay={i * 70}>
              <article className="archive-card p-7">
                <h2 className="font-display text-xl text-primary">{s.h}</h2>
                <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/80">{s.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
