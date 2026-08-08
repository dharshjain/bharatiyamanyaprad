import { createFileRoute, Link } from "@tanstack/react-router";
import { CornerFlourish, MandalaDivider, QuillSketch } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { aboutParagraphs, callForPapers, heritageNote } from "@/data/journal";

export const Route = createFileRoute("/call-for-papers")({
  component: CallForPapers,
  head: () => ({
    meta: [
      { title: "Call for Papers — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Call for Papers, Annual Vol X / No. 1 — theme Azadi Ka Amrit Mahotsav. Submission requirements, formatting guidelines and call for books for review.",
      },
      { property: "og:title", content: "Call for Papers — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "Submission requirements and notes for contributors.",
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
        eyebrow={`Call for Papers · ${callForPapers.volume}`}
        title={`Theme: ${callForPapers.theme}`}
        intro={callForPapers.intro}
      />

      <section className="relative mx-auto max-w-4xl overflow-hidden px-4 py-16 sm:px-6">
        <QuillSketch className="sketch-float top-10 right-2 h-28 w-20 rotate-12" />

        <Reveal>
          <div className="museum-frame paper-grain relative p-8">
            <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
            <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
            <p className="font-serif text-lg leading-relaxed text-foreground/85">{heritageNote}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-14 font-display text-2xl text-primary">About us</h2>
          <MandalaDivider className="mt-5" />
          <div className="mt-6 space-y-5">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)} className="font-serif text-lg leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h2 className="mt-14 font-display text-2xl text-primary">Notes for the contributors</h2>
          <span className="gold-rule mt-3 block w-16" />
          <p className="mt-5 font-serif text-lg leading-relaxed text-foreground/85">
            {callForPapers.themeNote}
          </p>
          <ul className="mt-6 space-y-3">
            {callForPapers.requirements.map((r) => (
              <li
                key={r}
                className="border-l-2 border-accent/50 pl-4 font-serif text-lg leading-relaxed text-foreground/85"
              >
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={180}>
          <h2 className="mt-14 font-display text-2xl text-primary">Call for books for review</h2>
          <span className="gold-rule mt-3 block w-16" />
          <ul className="mt-5 space-y-3">
            {callForPapers.bookReview.map((b) => (
              <li
                key={b}
                className="border-l-2 border-accent/50 pl-4 font-serif text-lg leading-relaxed text-foreground/85"
              >
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="engraved">
              <Link to="/submission">Submit review paper</Link>
            </Button>
            <Button asChild variant="ghost" className="text-terracotta hover:text-terracotta">
              <Link to="/instructions-to-authors">Instructions to authors</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
