import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { MandalaDivider } from "@/components/site/ornaments";
import { Reveal } from "@/components/site/reveal";
import nalanda from "@/assets/nalanda-illustration.jpg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About the Journal — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Bharatiya Manyaprad is an international journal of Indian studies published under the aegis of Bhartiya Vidya Bhavan and Gujarat University, Ahmedabad.",
      },
      { property: "og:title", content: "About the Journal — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The aims, scope and heritage of Bharatiya Manyaprad, ISSN 2321-8444.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Journal"
        title="A call to bring closer all Indians at one mental meadow"
        intro="Bharatiya Manyaprad reads India's manuscripts, inscriptions and living practices as a single, continuous scholarly tradition."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-foreground/85">
            <p>
              <strong className="font-display text-primary">Bharatiya Manyaprad</strong> is an
              international journal of Indian studies aiming to bring the best of cultural studies
              to a diverse academic and non-academic audience. It features research articles on
              practices and conditions specific to contemporary popular culture, traditions, norms
              and societies, alongside scholarly work on the issues faced by Indians in any part of
              the world.
            </p>
            <p>
              The journal comes under the aegis of Bhartiya Vidya Bhavan and Gujarat University,
              Ahmedabad, and has received financial support from the Indian Council of Historical
              Research (ICHR). It is indexed by Index Copernicus International and included in the
              International E-library, where volumes have been uploaded for open consultation.
            </p>
            <p>
              Though a research journal, it also carries the restlessness of an Indian as she faces
              the society around her. Articles borrow from semiotics, psychoanalysis, queer theory
              and other disciplines associated with cultural studies and critical theory, while
              remaining accessible to a general reader. All articles are published after peer
              review.
            </p>
          </div>
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
                p: "To publish rigorous, readable scholarship on Indian civilisational history and its contemporary life.",
              },
              {
                h: "Scope",
                p: "Manuscript studies, epigraphy, art and archaeology, intellectual history, cultural studies, language and literature.",
              },
              {
                h: "Readership",
                p: "Academics, museum professionals, students and general readers connected to India in any manner.",
              },
              {
                h: "Frequency",
                p: "Annual print edition, with occasional special volumes on themed subjects.",
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
