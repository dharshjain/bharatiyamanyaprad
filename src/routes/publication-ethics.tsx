import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { CarvedBorder, LotusMark } from "@/components/site/ornaments";
import { ShieldCheck, BookOpen, AlertTriangle, Scale, BookMarked, UserCheck } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/publication-ethics")({
  component: Responsibilities,
  head: () => ({
    meta: [
      { title: "Responsibilities — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Responsibilities of authors, reviewers, editors, and publisher. Understand peer review criteria, ethical conduct guidelines, and conflict disclosure policies.",
      },
      { property: "og:title", content: "Responsibilities — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "Author, Editor, Reviewer, and Publisher ethics guidelines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/publication-ethics" },
    ],
    links: [{ rel: "canonical", href: "/publication-ethics" }],
  }),
});

const sectionData = [
  {
    id: "author",
    num: "०१",
    title: "Author's Responsibilities",
    subtitle: "Duties of authors submitting manuscripts for review & publication",
    icon: UserCheck,
    points: [
      "Ensure original, fully referenced work is submitted, ensuring all co-authors are represented accurately. The submission must be exclusive and not under consideration elsewhere.",
      "Provide accurate contact details for a designated corresponding author, who is fully responsible for authorship and all communication regarding ethical status and originality.",
      "Openly disclose the source of all data and third-party material, including previously unpublished work by the authors. Avoid anything that compromises originality.",
      "Identify third-party material and obtain written permission for re-use from the copyright holders prior to submission or final acceptance.",
      "Openly disclose any conflict of interest (e.g. if publication benefits a company or services in which you have a vested interest).",
      "Sign a copyright assignment form upon acceptance, empowering the publisher to coordinate distribution.",
      "Expect the editor to scan submissions using advanced plagiarism detection software to check originality before peer review.",
      "Fully cooperate with requests for source data, proof of authorship, or originality checks in a timely manner.",
      "Comply with investigations if the editor and publisher are dissatisfied with explanations or evidence provided.",
      "Expect transparency, efficiency, and respect from the publisher and editorial office throughout the process.",
      "Remain in active, responsive communication with the publisher and editor.",
      "Submit corrigenda in a timely and responsible fashion when errors are discovered.",
      "Cooperate fully with the publication of errata or retractions if work is found to be misleading or unethical.",
      "Maintain professional communication with all co-authors and editorial staff.",
    ],
  },
  {
    id: "editor",
    num: "०२",
    title: "Editor's Responsibilities",
    subtitle: "Code of conduct for journal editors and editorial board",
    icon: ShieldCheck,
    points: [
      "Read and understand COPE guidelines and Bharatiya Manyaprad's ethics policies, adhering to them during all editorial processes.",
      "Protect the journal's reputation by only publishing content of the highest academic quality and relevance.",
      "Carry out thorough, objective, and confidential peer review in compliance with ethical policies.",
      "Detail and justify any article types that do not undergo peer review (e.g. editorials, opinion briefs).",
      "Provide a transparent review and publication process, showing full respect and care to all authors.",
      "Provide constructive advice, clear decisions, and regular updates to authors during submissions.",
      "Allow authors the right to appeal editorial decisions under a structured process.",
      "Only accept papers based on merit, originality, quality, and scientific relevance.",
      "Support authors in queries concerning originality, requesting publisher support when necessary.",
      "Advise the publisher of any third-party material used where sufficient clearance has not been proven.",
      "Be prepared to publish corrections, corrigenda, errata, or retract articles deemed unethical, misleading, or damaging.",
      "Maintain active, helpful communication with both authors and publisher.",
    ],
  },
  {
    id: "reviewer",
    num: "०३",
    title: "Reviewer's Responsibilities",
    subtitle: "Guidelines for experts conducting confidential peer reviews",
    icon: Scale,
    points: [
      "Adhere to the policy of confidential peer review, keeping identities hidden and protecting unpublished text from distribution.",
      "Only accept invitations to review manuscripts that align with your specific expertise and specialty.",
      "Review submitted work in a responsible, impartial, objective, and timely manner.",
      "Report any suspected ethical misconduct or plagiarism detected during evaluation.",
      "Avoid the use of unnecessarily inflammatory, hostile, or offensive language in appraisals.",
      "Accept the commitment to review revised versions of the work and provide follow-up advice if requested.",
      "Seek immediate advice from the editor if anything remains unclear at the time of invitation.",
      "Maintain professional communication with the editorial desk throughout the process.",
    ],
  },
  {
    id: "publisher",
    num: "०४",
    title: "Bharatiya Manyaprad Responsibilities",
    subtitle: "Ethical commitments and standards upheld by the publisher",
    icon: BookOpen,
    points: [
      "Protect the journal's reputation by only publishing content of the highest quality in a timely, responsible manner.",
      "Provide detailed information regarding publication ethics and emphasize prevention over detection of misconduct.",
      "Uphold ethics policies by keeping offices, editorial staff, and partners fully updated on evolving industry standards.",
      "Request proof of data originality and accuracy from corresponding authors whenever necessary.",
      "Use professional plagiarism detection software at any stage of the submission and review process.",
      "Provide a transparent submission process, offering detailed, dedicated author instructions and style guides.",
      "Investigate thoroughly any detected or reported ethical misconduct (including redundant publication, data fabrication, or authorship disputes).",
      "Correct substantive errors in Advance Online Publications (AOP) quickly, publishing dated correction statements.",
      "Retract articles immediately if they are found to be unethical, misleading, or academically damaging.",
      "Publish errata, corrigenda, and retractions in an open-access online format and in print in a timely manner.",
      "Maintain strong, ethical communication with editors, authors, reviewers, and indexing partners.",
    ],
  },
];

function Responsibilities() {
  // Listen to hash changes and scroll to target section offset correctly
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Run after mount/render is complete to allow DOM element detection
    const timer = setTimeout(handleHashScroll, 200);
    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Policy Guidelines"
        title="Publication Ethics"
        intro="The custody of civilisation demands rigorous standards. Below is our code of conduct for Authors, Editors, Reviewers, and the Publisher."
      />

      <div className="relative border-b border-accent/20 bg-background/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            {/* STICKY HISTORIC PLACARD SIDE NAV */}
            <aside className="hidden lg:block">
              <div
                className="sticky top-28 rounded-2xl p-6 border border-accent/20 shadow-md relative"
                style={{
                  background: "linear-gradient(135deg, var(--card), var(--background))",
                }}
              >
                <div className="absolute inset-1.5 rounded-xl border border-accent/10 pointer-events-none" />
                <p className="font-display text-[0.68rem] tracking-wider uppercase text-terracotta mb-4">
                  Index of Duties
                </p>
                <nav className="relative z-10 space-y-1">
                  {sectionData.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-serif text-[0.9rem] text-foreground/80 hover:bg-secondary/40 hover:text-primary transition-all"
                      >
                        <span className="text-accent group-hover:scale-110 transition-transform">
                          <Icon className="size-4" />
                        </span>
                        <span>{sec.title.split(" ")[0]}'s Duties</span>
                      </a>
                    );
                  })}
                  <a
                    href="#misconduct"
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-serif text-[0.9rem] text-foreground/80 hover:bg-secondary/40 hover:text-primary transition-all"
                  >
                    <span className="text-accent">
                      <AlertTriangle className="size-4" />
                    </span>
                    <span>Misconduct</span>
                  </a>
                  <a
                    href="#reading"
                    className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-serif text-[0.9rem] text-foreground/80 hover:bg-secondary/40 hover:text-primary transition-all"
                  >
                    <span className="text-accent">
                      <BookMarked className="size-4" />
                    </span>
                    <span>Further Reading</span>
                  </a>
                </nav>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="space-y-12">
              {sectionData.map((sec, secIdx) => {
                const Icon = sec.icon;
                return (
                  <Reveal key={sec.id} delay={secIdx * 100}>
                    <section
                      id={sec.id}
                      className="relative rounded-3xl p-6 sm:p-10 border border-accent/20 shadow-xl overflow-hidden scroll-mt-28"
                      style={{
                        background: "linear-gradient(135deg, var(--card), var(--background))",
                      }}
                    >
                      {/* Historic border styling inside card */}
                      <div className="absolute inset-2.5 rounded-[22px] border border-accent/10 pointer-events-none" />

                      {/* Chapter Counter background marker */}
                      <div className="absolute top-4 right-6 font-display text-4xl text-accent/15 select-none font-bold">
                        {sec.num}
                      </div>

                      <div className="relative z-10">
                        {/* Section Header */}
                        <div className="mb-8 flex items-start gap-4">
                          <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                            <Icon className="size-6" />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl text-primary tracking-wide">
                              {sec.title}
                            </h2>
                            <p className="font-serif text-sm text-foreground/75 mt-0.5">
                              {sec.subtitle}
                            </p>
                          </div>
                        </div>

                        <CarvedBorder className="opacity-55 my-4" />

                        {/* List Points styled elegantly as ancient book lines */}
                        <ul className="space-y-4 font-serif text-base leading-relaxed text-foreground/90 mt-6">
                          {sec.points.map((p, pIdx) => {
                            // Extract first few words to bold them dynamically
                            const words = p.split(" ");
                            const prefix = words.slice(0, 3).join(" ");
                            const suffix = words.slice(3).join(" ");
                            return (
                              <li key={pIdx} className="flex items-start gap-3 pl-1 group/item">
                                <span className="text-accent mt-1.5 text-[0.65rem] shrink-0 group-hover/item:scale-125 transition-transform">
                                  ✦
                                </span>
                                <span>
                                  <strong className="text-primary font-semibold font-serif mr-1">
                                    {prefix}
                                  </strong>
                                  {suffix}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </section>
                  </Reveal>
                );
              })}

              {/* MISCONDUCT SECTION */}
              <Reveal delay={250}>
                <section
                  id="misconduct"
                  className="relative rounded-3xl p-6 sm:p-10 border border-accent/20 shadow-xl overflow-hidden scroll-mt-28"
                  style={{
                    background: "linear-gradient(135deg, var(--card), var(--background))",
                  }}
                >
                  <div className="absolute inset-2.5 rounded-[22px] border border-accent/10 pointer-events-none" />
                  <div className="absolute top-4 right-6 font-display text-4xl text-accent/15 select-none font-bold">
                    ०५
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                        <AlertTriangle className="size-6" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl text-primary tracking-wide">
                          What happens if ethical misconduct is detected
                        </h2>
                        <p className="font-serif text-sm text-foreground/75 mt-0.5">
                          Protocols and investigations for suspected integrity violations
                        </p>
                      </div>
                    </div>

                    <CarvedBorder className="opacity-55 my-4" />

                    <div className="mt-6 space-y-5 font-serif text-[1.05rem] leading-relaxed text-foreground/85">
                      <p>
                        If ethical misconduct is suspected in work submitted to any of our journals,{" "}
                        <span className="font-serif font-bold text-primary">
                          Palgrave Macmillan
                        </span>{" "}
                        works closely with the editor(s) to ensure that a fair and transparent
                        investigation of the matter is carried out.
                      </p>
                      <p>
                        We take all instances of misconduct very seriously and will investigate each
                        with care and attention, providing full support to the editor. Consequences
                        for misconduct are as varied as the misconduct itself, and are determined on
                        a case-by-case basis. In all cases, the author will be given the opportunity
                        to provide an explanation for the misconduct. An editorial decision will
                        only be made once the investigation is completed.
                      </p>
                      <p>
                        In most cases, we accept that the incorrect use of third party material is
                        frequently a result of human error, or a misunderstanding of publication
                        ethics. This is why we actively encourage authors to read our ethics policy
                        and guidance on using third party material before submitting, to avoid these
                        mistakes. In those cases where more serious misconduct is detected,
                        consequences are proportionately more serious.{" "}
                        <span className="font-serif font-semibold text-primary">
                          Bharatiya Manyaprad
                        </span>{" "}
                        reserves the right to request any and all information from the author
                        concerning the creation of the work, to verify its originality. If no such
                        evidence is provided or no satisfactory explanation given, then we may ban
                        the author(s) from resubmitting to the journal for a determined period. In
                        extreme cases, we may take the matter to the author's institution for their
                        attention.
                      </p>
                      <p>
                        If ethical misconduct is discovered in content that has already been
                        published, we may publish a statement of concern whilst the work is
                        investigated. If we deem it necessary, the paper may be retracted with a
                        statement of explanation. Other consequences may include a submissions ban
                        for any or all authors, and contacting the relevant institution(s).
                      </p>
                    </div>
                  </div>
                </section>
              </Reveal>

              {/* FURTHER READING SECTION */}
              <Reveal delay={300}>
                <section
                  id="reading"
                  className="relative rounded-3xl p-6 sm:p-10 border border-accent/20 shadow-xl overflow-hidden scroll-mt-28"
                  style={{
                    background: "linear-gradient(135deg, var(--card), var(--background))",
                  }}
                >
                  <div className="absolute inset-2.5 rounded-[22px] border border-accent/10 pointer-events-none" />
                  <div className="absolute top-4 right-6 font-display text-4xl text-accent/15 select-none font-bold">
                    ०६
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                        <BookMarked className="size-6" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl text-primary tracking-wide">
                          Further Reading &amp; External Policies
                        </h2>
                        <p className="font-serif text-sm text-foreground/75 mt-0.5">
                          International academic reference frameworks and guidelines
                        </p>
                      </div>
                    </div>

                    <CarvedBorder className="opacity-55 my-4" />

                    <div className="mt-6 font-serif text-[1.05rem] leading-relaxed text-foreground/85">
                      <p>
                        This policy owes its content in no small part to Bharatiya Manyaprad’s
                        membership to ISSN Paris, whose guidelines and codes of conduct are
                        available at{" "}
                        <a
                          href="https://www.publicationethics.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-accent font-sans text-sm font-semibold"
                        >
                          www.publicationethics.org
                        </a>
                        . Bharatiya Manyaprad have also accessed and learned from the existing
                        policies of other publishers and leading experts as well as open access
                        articles that detail and define ethical misconduct.
                      </p>

                      <div className="mt-8 space-y-3.5 border-t border-accent/15 pt-6">
                        <p className="font-display text-xs tracking-wider uppercase text-terracotta">
                          Resources &amp; Citations
                        </p>

                        <div className="flex flex-col gap-3 font-serif">
                          <a
                            href="http://www.nature.com/authors/policies/publication.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-foreground/90 hover:text-accent group"
                          >
                            <span className="text-[0.65rem] text-accent">✦</span>
                            <span className="underline">Nature's Publication Ethics</span>
                          </a>

                          <a
                            href="http://www.ingentaconnect.com/content/alpsp/lp/2010/00000023/00000004/art00002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-foreground/90 hover:text-accent group"
                          >
                            <span className="text-[0.65rem] text-accent">✦</span>
                            <span className="underline">
                              'Plagiarism and the law', Joss Saunders, Learned Publishing (2010)
                            </span>
                          </a>

                          <div className="inline-flex items-center gap-2 text-foreground/75">
                            <span className="text-[0.65rem] text-accent">✦</span>
                            <span>iThenticate Plagiarism Resources</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
