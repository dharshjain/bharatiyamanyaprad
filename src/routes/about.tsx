import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { MandalaDivider, CornerFlourish, SealSketch } from "@/components/site/ornaments";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About the Journal — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Bharatiya Manyaprad is an International Journal of Indian Studies. Read about our aims, scope, and editorial vision.",
      },
      { property: "og:title", content: "About the Journal — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The aims, scope, and editorial vision of Bharatiya Manyaprad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const aboutParagraphs = [
  "BHARATIYA MANYAPRAD is a call to bring closer all Indians at one mental meadow irrespective of them being Indian residents, NRIs or PIOs. Certain issues touch all of them with same concern.",
  "Bharatiya Manyaprad is a new International Journal of Indian Studies aiming to bring the best of cultural studies to a diverse academic and non-academic audience. We feature research articles and features practices and conditions specific to contemporary popular culture, traditions, norms and societies etc. Bharatiya Manyaprad shall include scholarly articles pertaining to the issues which are faced by Indians in any part of the world including India. It also invites books for review. It's a platform for all those who want to share the issues which need an attention and get the things changed for betterment. In fact it shall culminate into a dialogue bringing in a silent revolution amongst the people who are connected to India in any manner.",
  "Though it is a research journal still it shall include the restlessness of an Indian as s/he faces in the society around the world. It is a multicultural journal inviting articles from all sectors of life. Bharatiya Manyaprad shall contain socio-cultural-psycho issues as faced by Indians throughout the world including India.",
  "Articles should borrow from semiotics, psychoanalysis, queer theory, and other academic disciplines associated with cultural studies and critical theory, while remaining accessible to a general audience. Ideally, articles should surprise and entertain, presenting smart, pithy analysis of familiar subject matter. Articles are liable to be published after peer review.",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Introduction"
        title="About the Journal"
        intro="An International Journal of Indian Studies bridging popular culture, critical theory, and socio-cultural studies of Indian civilization."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal>
          <div
            className="relative rounded-3xl p-6 sm:p-12 border border-accent/25 shadow-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--card), var(--background))",
            }}
          >
            {/* Double thin border for historic scroll look */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] border border-accent/15 pointer-events-none" />

            {/* Corner flourishes inside padding */}
            <CornerFlourish className="pointer-events-none absolute top-4 left-4 size-4.5 text-accent/40" />
            <CornerFlourish className="pointer-events-none absolute top-4 right-4 size-4.5 rotate-90 text-accent/40" />
            <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 size-4.5 -rotate-90 text-accent/40" />
            <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 size-4.5 rotate-180 text-accent/40" />

            <div className="relative z-10 space-y-8">
              {/* Ornate Header */}
              <div className="text-center">
                <h2 className="font-display text-2xl text-primary tracking-wider uppercase">
                  Bharatiya Manyaprad
                </h2>
                <MandalaDivider className="mt-4" />
              </div>

              {/* Core Text Paragraphs */}
              <div className="space-y-6 font-serif text-lg leading-relaxed text-foreground/90">
                {aboutParagraphs.map((p, idx) => (
                  <p key={idx} className="indent-4 sm:indent-8 text-justify">
                    {p}
                  </p>
                ))}
              </div>

              <MandalaDivider className="mt-8 rotate-180" />
            </div>
          </div>
        </Reveal>

        {/* FORM IV DECLARATION OF OWNERSHIP */}
        <Reveal delay={100}>
          <div className="mt-16 text-center">
            <h2 className="font-display text-xl text-primary tracking-widest uppercase">
              Official Declaration
            </h2>
            <div className="flex items-center justify-center gap-3.5 mt-2 mb-8">
              <span className="h-[0.5px] w-8 bg-accent/25" />
              <span className="text-[0.45rem] text-accent">✦</span>
              <span className="h-[0.5px] w-8 bg-accent/25" />
            </div>
          </div>

          <div
            className="relative rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-xl overflow-hidden max-w-3xl mx-auto"
            style={{
              background: "linear-gradient(135deg, var(--card), var(--background))",
            }}
          >
            {/* Double thin border for historic scroll look */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] border border-accent/15 pointer-events-none" />

            {/* Corner flourishes inside padding */}
            <CornerFlourish className="pointer-events-none absolute top-4 left-4 size-4.5 text-accent/40" />
            <CornerFlourish className="pointer-events-none absolute top-4 right-4 size-4.5 rotate-90 text-accent/40" />
            <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 size-4.5 -rotate-90 text-accent/40" />
            <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 size-4.5 rotate-180 text-accent/40" />

            {/* Subtle background watermark */}
            <SealSketch className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-72 text-accent/5 opacity-[0.04] pointer-events-none select-none" />

            <div className="relative z-10 space-y-6">
              {/* Form Heading */}
              <div className="text-center">
                <h3 className="font-display text-lg text-primary tracking-widest uppercase">
                  FORM-IV
                </h3>
                <p className="font-serif text-xs text-muted-foreground/80 italic mt-1.5 leading-relaxed">
                  Statement of ownership and other particulars about the journal to be published
                  under Rule 8 of the Registration of Newspapers (Central) Rules, 1956
                </p>
                <div className="h-[0.5px] w-24 bg-accent/25 mx-auto mt-4" />
              </div>

              {/* Declaration Fields */}
              <div className="space-y-5 font-serif text-sm sm:text-base border-t border-b border-accent/10 py-6">
                {/* Field 1 */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-baseline pb-4 border-b border-accent/5">
                  <span className="font-sans text-[0.7rem] tracking-wider text-accent font-semibold uppercase">
                    1. Place of Publication
                  </span>
                  <span className="text-primary font-medium">
                    Bharatiya Vidya Bhavan, Ahmedabad Kendra
                  </span>
                </div>

                {/* Field 2 */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-baseline pb-4 border-b border-accent/5">
                  <span className="font-sans text-[0.7rem] tracking-wider text-accent font-semibold uppercase">
                    2. Periodicity
                  </span>
                  <span className="text-primary font-medium">Annual</span>
                </div>

                {/* Field 3 */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-baseline pb-4 border-b border-accent/5">
                  <span className="font-sans text-[0.7rem] tracking-wider text-accent font-semibold uppercase">
                    3. Printer's Particulars
                  </span>
                  <div className="space-y-1">
                    <p className="text-primary font-medium">Dr Neerja A Gupta</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-accent">Nationality:</span> Indian
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-accent">Address:</span> II Floor Rituraj Apartment, Opp.
                      Rupal Flats, Nr St. Xavier's Loyola Hall, Navrangpura, Ahmedabad
                    </p>
                  </div>
                </div>

                {/* Field 4 */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-baseline pb-4 border-b border-accent/5">
                  <span className="font-sans text-[0.7rem] tracking-wider text-accent font-semibold uppercase">
                    4. Publisher's Particulars
                  </span>
                  <div className="space-y-1">
                    <p className="text-primary font-medium">Dr Neerja A Gupta</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-accent">Nationality:</span> Indian
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-accent">Address:</span> II Floor Rituraj Apartment, Opp.
                      Rupal Flats, Nr St. Xavier's Loyola Hall, Navrangpura, Ahmedabad
                    </p>
                  </div>
                </div>

                {/* Field 5 */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-baseline pb-4 border-b border-accent/5">
                  <span className="font-sans text-[0.7rem] tracking-wider text-accent font-semibold uppercase">
                    5. Editor's Particulars
                  </span>
                  <div className="space-y-1">
                    <p className="text-primary font-medium">Dr Neerja A Gupta</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-accent">Nationality:</span> Indian
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-accent">Address:</span> II Floor Rituraj Apartment, Opp.
                      Rupal Flats, Nr St. Xavier's Loyola Hall, Navrangpura, Ahmedabad
                    </p>
                  </div>
                </div>

                {/* Field 6 */}
                <div className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-baseline">
                  <span className="font-sans text-[0.7rem] tracking-wider text-accent font-semibold uppercase leading-normal">
                    6. Ownership details
                  </span>
                  <div className="space-y-1">
                    <p className="text-primary font-medium">Nil</p>
                    <p className="text-[0.68rem] text-muted-foreground/80 leading-normal">
                      (Individuals who own the newspaper and partners/shareholders holding more than
                      one percent of the total capital)
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Declaration Statement */}
              <div className="pt-2 space-y-4">
                <p className="font-serif text-sm italic text-center text-foreground/90 leading-relaxed">
                  "I, Neerja A Gupta, hereby declare that the particulars given above are true to
                  the best of my knowledge and belief."
                </p>

                <div className="text-right font-serif pr-4">
                  <p className="text-xs text-accent">Sd./-</p>
                  <p className="text-base text-primary font-bold">Dr. Neerja A Gupta</p>
                  <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                    Publisher &amp; Editor-in-Chief
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
