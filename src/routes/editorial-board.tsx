import { createFileRoute } from "@tanstack/react-router";
import { CornerFlourish, LotusMark } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { board } from "@/data/journal";

export const Route = createFileRoute("/editorial-board")({
  component: EditorialBoard,
  head: () => ({
    meta: [
      { title: "Editorial Board — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "The scholars who steward Bharatiya Manyaprad: editors and board members in epigraphy, manuscript studies, art history and cultural studies.",
      },
      { property: "og:title", content: "Editorial Board — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "Editors and board members of the International Journal of Indian Studies.",
      },
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
        title="Scholars who steward the record"
        intro="Peer review at Bharatiya Manyaprad is carried by specialists in epigraphy, manuscriptology, art history and cultural theory."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((m, i) => (
            <Reveal key={m.name} delay={i * 70} as="li">
              <article className="museum-frame paper-grain relative h-full p-8 text-center">
                <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
                <CornerFlourish className="pointer-events-none absolute top-2 right-2 size-4 rotate-90 text-accent/60" />
                <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
                <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 size-4 -rotate-90 text-accent/60" />
                <LotusMark className="mx-auto size-7 text-accent/70" />
                <div className="mx-auto mt-4 grid size-24 place-items-center rounded-full bg-secondary ring-1 ring-accent/50 ring-offset-4 ring-offset-card">
                  <span className="font-display text-2xl text-primary">
                    {m.name
                      .split(" ")
                      .slice(-2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-lg text-primary">{m.name}</h2>
                <p className="plaque eyebrow mt-2">{m.role}</p>
                <p className="mt-3 font-serif text-base leading-relaxed text-foreground/80">
                  {m.institution}
                </p>
                <ul className="mt-5 flex flex-wrap justify-center gap-2">
                  {m.interests.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-accent/40 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
