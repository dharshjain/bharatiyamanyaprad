import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { MandalaDivider } from "@/components/site/ornaments";
import { Reveal } from "@/components/site/reveal";
import nalanda from "@/assets/nalanda-illustration.jpg";
import { aboutParagraphs, heritageNote, notices } from "@/data/journal";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About the Journal — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Bharatiya Manyaprad is an International Journal of Indian Studies published under the aegis of Bhartiya Vidya Bhawan and Gujarat University, Ahmedabad, with support from ICHR.",
      },
      { property: "og:title", content: "About the Journal — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The aims, scope and heritage of Bharatiya Manyaprad, ISSN 2321-8444.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Bharatiya Manyaprad"
        title="A call to bring closer all Indians at one mental meadow"
        intro="An International Journal of Indian Studies for residents, NRIs and PIOs alike — certain issues touch all of them with the same concern."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-foreground/85">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>{heritageNote}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-10 space-y-3">
            {notices.map((n) => (
              <li
                key={n}
                className="border-l-2 border-accent/50 pl-4 font-serif text-lg leading-relaxed text-foreground/85"
              >
                {n}
              </li>
            ))}
          </ul>
        </Reveal>


        <MandalaDivider className="my-14" />

        <Reveal>
          <img
            src={nalanda}
            alt="Archaeological illustration of ancient Nalanda ruins"
            width={1408}
            height={912}
            loading="lazy"
            className="w-full rounded-lg stone-frame"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              {
                h: "Aims",
                p: "To bring the best of cultural studies to a diverse academic and non-academic audience.",
              },
              {
                h: "Scope",
                p: "Socio-cultural-psycho issues faced by Indians throughout the world, including India, and books for review.",
              },
              {
                h: "Recognition",
                p: "Peer-reviewed and enlisted in the UGC CARE List; financially assisted by ICHR, New Delhi.",
              },
              {
                h: "Publisher",
                p: "Started by Bharatiya Vidya Bhavan's Ahmedabad Kendra; under the aegis of Gujarat University, Ahmedabad.",
              },

            ].map((b) => (
              <div key={b.h} className="archive-card p-7">
                <h2 className="font-display text-lg text-primary">{b.h}</h2>
                <p className="mt-2 font-serif text-base text-foreground/80">{b.p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
