import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Calendar, FileText, BookOpen } from "lucide-react";
import { CornerFlourish, MandalaDivider } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { aboutParagraphs, callForPapers, heritageNote } from "@/data/journal";

export const Route = createFileRoute("/call-for-papers")({
  component: CallForPapers,
  head: () => ({
    meta: [
      { title: "Call for Papers 2027 — Annual Vol XIV — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Call for Papers 2027, Annual Vol XIV (ISSN 2321-8444). Submission deadline: October 15th, 2026. Submission requirements, formatting guidelines, and call for books for review.",
      },
      {
        property: "og:title",
        content: "Call for Papers 2027 — Annual Vol XIV — Bharatiya Manyaprad",
      },
      {
        property: "og:description",
        content: "Submission requirements, guidelines, and deadline for Annual Vol XIV 2027.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/call-for-papers" },
    ],
    links: [{ rel: "canonical", href: "/call-for-papers" }],
  }),
});

function CallForPapers() {
  return (
    <>
      <PageHero
        eyebrow={`Call for Papers 2027 · ${callForPapers.volume}`}
        title="International Journal of Indian Studies"
        intro={callForPapers.intro}
      />

      <section className="relative mx-auto max-w-4xl overflow-hidden px-4 py-16 sm:px-6">
        {/* Download PDF & Deadline Banner */}
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 rounded-xl border border-amber-800/20 bg-amber-50/60 p-6 dark:bg-stone-900/40 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                <Calendar className="size-4" />
                <span>Submission Deadline</span>
              </div>
              <p className="font-display text-xl text-primary">{callForPapers.deadline}</p>
              <p className="text-xs text-muted-foreground">
                Annual Vol XIV (2027) · ISSN 2321 – 8444
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href={callForPapers.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="size-4" />
                  <span>Download PDF Document</span>
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="museum-frame paper-grain relative p-8">
            <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
            <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
            <p className="font-serif text-lg leading-relaxed text-foreground/85">{heritageNote}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-14 font-display text-2xl text-primary">About Us</h2>
          <MandalaDivider className="mt-5" />
          <div className="mt-6 space-y-5">
            {aboutParagraphs.map((p, idx) => (
              <p key={idx} className="font-serif text-lg leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="mt-14 font-display text-2xl text-primary">Notes for the Contributors</h2>
          <span className="gold-rule mt-3 block w-16" />
          <p className="mt-5 font-serif text-lg leading-relaxed text-foreground/85">
            {callForPapers.themeNote}
          </p>
          <ul className="mt-6 space-y-3">
            {callForPapers.requirements.map((r, idx) => (
              <li
                key={idx}
                className="border-l-2 border-accent/50 pl-4 font-serif text-lg leading-relaxed text-foreground/85"
              >
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180}>
          <h2 className="mt-14 font-display text-2xl text-primary">Call for Book for Review</h2>
          <span className="gold-rule mt-3 block w-16" />
          <ul className="mt-5 space-y-3">
            {callForPapers.bookReview.map((b, idx) => (
              <li
                key={idx}
                className="border-l-2 border-accent/50 pl-4 font-serif text-lg leading-relaxed text-foreground/85"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="engraved gap-2 h-11 px-5 text-sm font-medium"
            >
              <Link to="/submission">
                <FileText className="size-4 text-accent" />
                <span>Submit Paper / Review</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="engraved gap-2 h-11 px-5 text-sm font-medium"
            >
              <Link to="/instructions-to-authors">
                <BookOpen className="size-4 text-terracotta" />
                <span>Instructions to Authors</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="engraved gap-2 h-11 px-5 text-sm font-medium"
            >
              <a href={callForPapers.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="size-4 text-accent" />
                <span>Official Call for Papers (PDF)</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
