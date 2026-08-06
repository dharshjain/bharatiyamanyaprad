import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Download, Quote, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MandalaDivider } from "@/components/site/ornaments";
import { currentIssue } from "@/data/journal";

export const Route = createFileRoute("/papers/$slug")({
  loader: ({ params }) => {
    const paper = currentIssue.papers.find((p) => p.slug === params.slug);
    if (!paper) throw notFound();
    return paper;
  },
  component: PaperPage,
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Research Paper"} — Bharatiya Manyaprad` },
      {
        name: "description",
        content: loaderData?.abstract ?? "A peer-reviewed paper in Bharatiya Manyaprad.",
      },
      { property: "og:title", content: loaderData?.title ?? "Research Paper" },
      { property: "og:description", content: loaderData?.abstract ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/papers/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/papers/${params.slug}` }],
  }),
});

const sections = [
  { id: "abstract", label: "Abstract" },
  { id: "introduction", label: "Introduction" },
  { id: "sources", label: "Sources and Method" },
  { id: "discussion", label: "Discussion" },
  { id: "references", label: "References" },
];

function PaperPage() {
  const paper = Route.useLoaderData();
  const related = currentIssue.papers.filter((p) => p.slug !== paper.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{paper.category}</p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-primary sm:text-4xl">
          {paper.title}
        </h1>
        <p className="mt-4 font-serif text-lg text-foreground/80">{paper.authors.join(" · ")}</p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span>
            {currentIssue.volume} · {currentIssue.year}
          </span>
          <span>pp. {paper.pages}</span>
          <span>DOI {paper.doi}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> 14 min read
          </span>
        </p>
        <MandalaDivider className="mt-8" />
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="Table of contents" className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="eyebrow">Contents</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-muted-foreground transition-colors hover:text-terracotta"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            <Button variant="outline" size="sm" className="engraved justify-start">
              <Download className="size-3.5" /> Download PDF
            </Button>
            <Button variant="ghost" size="sm" className="justify-start text-terracotta">
              <Quote className="size-3.5" /> Cite this paper
            </Button>
            <Button variant="ghost" size="sm" className="justify-start text-terracotta">
              <Share2 className="size-3.5" /> Share
            </Button>
          </div>
        </nav>

        <div className="mx-auto max-w-2xl font-serif text-lg leading-[1.85] text-foreground/88">
          <section id="abstract" className="archive-card paper-grain p-7">
            <h2 className="font-display text-lg text-primary">Abstract</h2>
            <p className="mt-3">{paper.abstract}</p>
          </section>

          <section id="introduction" className="mt-10">
            <h2 className="font-display text-2xl text-primary">Introduction</h2>
            <p className="mt-4">
              The archive with which this paper begins is not a building but a habit: the persistent
              Indian practice of copying, annotating and re-reading. Where a Western record often
              privileges the singular original, the Indic tradition treats the copy as an act of
              scholarship in its own right, each folio carrying the intelligence of its scribe.
            </p>
            <p className="mt-4">
              Reading such material demands attention to the physical object as much as to the text.
              A margin, a repaired leaf, an interpolated verse — each is evidence of use, and use is
              the historian&apos;s subject.
            </p>
          </section>

          <section id="sources" className="mt-10">
            <h2 className="font-display text-2xl text-primary">Sources and Method</h2>
            <p className="mt-4">
              Materials examined here were consulted in institutional collections across Gujarat,
              Maharashtra and Tamil Nadu, supplemented by digitised surrogates held in the
              International E-library. Dating follows palaeographic convention, with colophon
              readings cross-checked against published epigraphic corpora.
            </p>
            <blockquote className="mt-6 border-l-2 border-accent/60 pl-5 text-foreground/75 italic">
              The manuscript is not a container of the text. It is a record of everyone who has ever
              needed the text.
            </blockquote>
          </section>

          <section id="discussion" className="mt-10">
            <h2 className="font-display text-2xl text-primary">Discussion</h2>
            <p className="mt-4">
              Taken together, the evidence suggests a scholarly economy far more distributed than
              the court-centred models still dominant in survey literature. Patronage flowed through
              mercantile guilds, temple trusts and household libraries as readily as through kings.
            </p>
            <p className="mt-4">
              The consequence for present-day archiving is practical: digitisation programmes that
              privilege famous collections will reproduce precisely the distortion this material
              corrects.
            </p>
          </section>

          <section id="references" className="mt-10">
            <h2 className="font-display text-2xl text-primary">References</h2>
            <ol className="mt-4 space-y-3 text-base text-muted-foreground">
              <li>Sircar, D. C. Indian Epigraphy. Delhi: Motilal Banarsidass.</li>
              <li>Salomon, R. Indian Epigraphy: A Guide to the Study of Inscriptions.</li>
              <li>Pollock, S. The Language of the Gods in the World of Men.</li>
              <li>Dandekar, R. N. Vedic Bibliography, vols. I–V.</li>
            </ol>
          </section>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-center font-display text-2xl text-primary">Related papers</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                to="/papers/$slug"
                params={{ slug: p.slug }}
                className="archive-card block h-full p-6"
              >
                <p className="eyebrow">{p.category}</p>
                <h3 className="mt-2 font-display text-base leading-snug text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.authors.join(", ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
