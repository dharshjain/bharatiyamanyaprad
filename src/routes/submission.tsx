import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/submission")({
  component: Submission,
  head: () => ({
    meta: [
      { title: "Submit a Paper — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Submit original research to Bharatiya Manyaprad. Review the five-step publication workflow and send your manuscript to the editorial desk.",
      },
      { property: "og:title", content: "Submit a Paper — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The publication workflow and submission desk of the journal.",
      },
      { property: "og:url", content: "/submission" },
    ],
    links: [{ rel: "canonical", href: "/submission" }],
  }),
});

const steps = [
  { title: "Submit", body: "Send your manuscript, abstract and author note to the editorial desk." },
  { title: "Review", body: "Two subject specialists assess the paper under double-blind review." },
  { title: "Revision", body: "Reviewer comments are shared; revisions are due within four weeks." },
  { title: "Acceptance", body: "The board confirms acceptance and licensing arrangements." },
  { title: "Publication", body: "The paper is typeset for the print edition, indexed and archived." },
];

function Submission() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Submission"
        title="From manuscript to print"
        intro="A transparent, unhurried process. Every paper is read twice by specialists before it reaches the compositor."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="relative border-l border-accent/40 pl-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} as="li">
              <div className="relative pb-10">
                <span className="absolute top-1.5 -left-[2.31rem] grid size-6 place-items-center rounded-full border border-accent bg-background font-display text-[0.65rem] text-accent">
                  {i + 1}
                </span>
                <h2 className="font-display text-xl text-primary">{s.title}</h2>
                <p className="mt-2 font-serif text-lg text-foreground/80">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <form
            className="archive-card paper-grain mt-6 space-y-5 p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="font-display text-2xl text-primary">Submission desk</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="sub-name">Full name</Label>
                <Input id="sub-name" required className="mt-2 bg-card" />
              </div>
              <div>
                <Label htmlFor="sub-email">Email</Label>
                <Input id="sub-email" type="email" required className="mt-2 bg-card" />
              </div>
            </div>
            <div>
              <Label htmlFor="sub-affiliation">Institutional affiliation</Label>
              <Input id="sub-affiliation" className="mt-2 bg-card" />
            </div>
            <div>
              <Label htmlFor="sub-title">Paper title</Label>
              <Input id="sub-title" required className="mt-2 bg-card" />
            </div>
            <div>
              <Label htmlFor="sub-abstract">Abstract (max 250 words)</Label>
              <Textarea id="sub-abstract" rows={6} required className="mt-2 bg-card" />
            </div>
            <Button type="submit" variant="outline" className="engraved">
              Send to the editorial desk
            </Button>
            <p aria-live="polite" className="h-5 text-sm text-terracotta">
              {sent ? "Received — the editorial desk will write to you shortly." : ""}
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
