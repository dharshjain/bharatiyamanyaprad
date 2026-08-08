import { createFileRoute } from "@tanstack/react-router";
import { LotusMark } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { contact } from "@/data/journal";

export const Route = createFileRoute("/editorial-board")({
  component: EditorialBoard,
  head: () => ({
    meta: [
      { title: "Editorial Board — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "The editorial desk of Bharatiya Manyaprad, led by Dr Neerja A Gupta, Vice Chancellor, Sanchi University of Buddhist-Indic Studies.",
      },
      { property: "og:title", content: "Editorial Board — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "Editor and editorial desk of the International Journal of Indian Studies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/editorial-board" },
    ],
    links: [{ rel: "canonical", href: "/editorial-board" }],
  }),
});

function EditorialBoard() {
  return (
    <>
      <PageHero
        eyebrow="Editorial Board"
        title="The editorial desk"
        intro="Bharatiya Manyaprad is edited from Ahmedabad, under the aegis of Bhartiya Vidya Bhawan and Gujarat University."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal>
          <article className="archive-card paper-grain p-8 text-center">
            <div className="mx-auto grid size-24 place-items-center rounded-full bg-secondary ring-1 ring-accent/50">
              <span className="font-display text-2xl text-primary">NG</span>
            </div>
            <h2 className="mt-5 font-display text-2xl text-primary">{contact.editor}</h2>
            <p className="eyebrow mt-2">Editor</p>
            <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/85">
              {contact.designation}
            </p>
            <p className="mt-2 font-serif text-lg leading-relaxed text-foreground/80">
              Principal, Bhavan&apos;s Arts and Commerce College, Navarangpura, Ahmedabad.
            </p>
            <p className="mt-4 text-sm">
              <a className="text-terracotta hover:underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <div className="archive-card mt-8 flex items-start gap-4 p-8">
            <LotusMark className="mt-1 size-6 shrink-0 text-accent" />
            <p className="font-serif text-lg leading-relaxed text-foreground/85">
              Every article is published after peer review by subject specialists drawn from the
              journal&apos;s reviewer panel across Indian and overseas universities. The complete
              board is printed in the front matter of each volume; correspondence for the board may
              be addressed to the editorial office.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
