import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/publication-ethics")({
  component: Ethics,
  head: () => ({
    meta: [
      { title: "Publication Ethics — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Editorial standards, peer review integrity, plagiarism policy and authorship ethics observed by Bharatiya Manyaprad.",
      },
      { property: "og:title", content: "Publication Ethics — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The ethical standards governing review and publication at the journal.",
      },
      { property: "og:url", content: "/publication-ethics" },
    ],
    links: [{ rel: "canonical", href: "/publication-ethics" }],
  }),
});

const policies = [
  {
    h: "Peer review integrity",
    p: "Every research article is reviewed double-blind by two specialists. Reviewers with an institutional or personal conflict must recuse themselves before reading the manuscript.",
  },
  {
    h: "Originality and plagiarism",
    p: "Submissions must be original and unpublished. All manuscripts are screened for textual overlap; substantiated plagiarism results in immediate rejection and notification of the author's institution.",
  },
  {
    h: "Authorship",
    p: "Authorship is reserved for those who made a substantive intellectual contribution. Ghost, gift and guest authorship are not accepted. Contribution statements are requested for multi-author papers.",
  },
  {
    h: "Sources and permissions",
    p: "Authors must secure permissions for images of manuscripts, inscriptions and museum objects, and must acknowledge custodial institutions and communities appropriately.",
  },
  {
    h: "Corrections and retraction",
    p: "Errors of fact are corrected in the following volume with a signed erratum. Retraction is reserved for serious research misconduct and is announced in print and online.",
  },
  {
    h: "Complaints",
    p: "Concerns regarding editorial conduct may be addressed to the Editor-in-Chief and are answered within thirty days.",
  },
];

function Ethics() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Publication Ethics"
        intro="Scholarship on heritage material carries a duty of care — to the sources, to the custodians and to the reader."
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
