import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Quote,
} from "lucide-react";
import { useState } from "react";
import heroBg from "@/assets/hero-manuscript.jpg";
import nalanda from "@/assets/nalanda-illustration.jpg";
import cover from "@/assets/issue-cover.jpg";
import palmLeaf from "@/assets/palm-leaf.jpg";
import sculpture from "@/assets/sculpture-head.jpg";
import copperPlate from "@/assets/copper-plate.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MandalaDivider,
  CarvedBorder,
  LotusMark,
  CornerFlourish,
  QuillSketch,
  PillarSketch,
  ManuscriptSketch,
  SealSketch,
  DiyaSketch,
} from "@/components/site/ornaments";
import { FramedImage } from "@/components/site/framed-image";
import { Reveal } from "@/components/site/reveal";
import { archives, board, categories, currentIssue } from "@/data/journal";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bharatiya Manyaprad — International Journal of Indian Studies" },
      {
        name: "description",
        content:
          "Preserving India's scholarly heritage. A peer-reviewed print journal of Indian studies — manuscripts, epigraphy, art, archaeology and cultural history since 2013.",
      },
      {
        property: "og:title",
        content: "Bharatiya Manyaprad — International Journal of Indian Studies",
      },
      {
        property: "og:description",
        content:
          "A peer-reviewed journal of Indian studies: manuscripts, epigraphy, art and cultural history. ISSN 2321-8444.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Collections />
      <Highlights />
      <LatestIssue />
      <FeaturedResearch />
      <Metrics />
      <Timeline />
      <Categories />
      <BoardStrip />
      <CallForPapers />
      <Process />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="paper-grain relative isolate overflow-hidden bg-secondary/45 pt-32 pb-0">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 size-full object-cover opacity-35 dark:opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/55 to-secondary/60" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center font-serif text-base tracking-wide text-terracotta">
            ॥ सबहीं मानप्रद आपहि अमानि ॥ — गोस्वामी तुलसीदास
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-8 text-center font-display text-[2.6rem] leading-[0.98] tracking-tight text-primary uppercase sm:text-6xl lg:text-[5.4rem]">
            <span className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <span>Step</span>
              <img
                src={palmLeaf}
                alt="Palm leaf manuscript folio in Sanskrit"
                width={640}
                height={640}
                className="inline-block size-12 rounded-md object-cover stone-frame sm:size-16 lg:h-20 lg:w-28"
              />
              <span>Inside</span>
              <span>India&apos;s</span>
            </span>
            <span className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <img
                src={sculpture}
                alt="Ancient Indian sandstone sculpture head"
                width={640}
                height={640}
                className="inline-block size-12 rounded-md object-cover stone-frame sm:size-16 lg:h-20 lg:w-24"
              />
              <span>Living Archive</span>
              <span className="font-sans text-xs align-super text-accent">®</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg leading-relaxed text-foreground/85 sm:text-xl">
            Bharatiya Manyaprad is a peer-reviewed international journal of Indian studies, reading
            manuscripts, inscriptions, sculpture and living culture as one continuous archive of
            thought.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center justify-end gap-2 text-right text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground sm:justify-end">
            <span>
              ISSN 2321-8444
              <br />
              Print edition since 2013
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={360}>
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3 pb-10">
          <Link
            to="/archives"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
          >
            Explore the Archive
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
              <ArrowRight className="size-4" />
            </span>
          </Link>
          <Link
            to="/current-issue"
            className="engraved inline-flex items-center rounded-full px-6 py-3 font-sans text-sm font-semibold"
          >
            View Current Issue
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function Marquee() {
  const words = [
    "Manuscripts",
    "Inscriptions",
    "Sculpture",
    "Archaeology",
    "Epigraphy",
    "Ancient Records",
  ];
  return (
    <div className="overflow-hidden bg-primary py-4 text-primary-foreground">
      <div className="flex w-max animate-[bm-marquee_38s_linear_infinite] gap-10 pr-10">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-10">
            {words.map((w) => (
              <span
                key={w}
                className="flex items-center gap-10 font-display text-2xl tracking-wide whitespace-nowrap uppercase sm:text-4xl"
              >
                {w}
                <LotusMark className="size-6 text-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Collections() {
  const items = [
    { img: palmLeaf, title: "Palm Leaf Folios", meta: "Manuscript Studies" },
    { img: copperPlate, title: "Copper Plate Grants", meta: "Epigraphy" },
    { img: sculpture, title: "Sandstone Figures", meta: "Art History" },
    { img: nalanda, title: "Nalanda Ruins", meta: "Archaeology" },
  ];
  return (
    <section className="bg-primary pb-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pt-14 pb-8 sm:flex sm:justify-between">
            <h2 className="font-display text-3xl tracking-wide sm:text-4xl">Archive Collections</h2>
            <Link
              to="/archives"
              className="shrink-0 rounded-full border border-accent/70 px-5 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Browse all
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} as="article">
              <FramedImage
                src={it.img}
                alt={it.title}
                caption={it.title}
                meta={it.meta}
                tone="dark"
                tilt={i % 2 === 0 ? -0.6 : 0.6}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



function Highlights() {
  const items = [
    {
      Sketch: ManuscriptSketch,
      title: "Manuscript Scholarship",
      body: "Palm leaf and paper folios read closely — colophons, scribes and the workshops that copied them.",
    },
    {
      Sketch: SealSketch,
      title: "Epigraphic Record",
      body: "Copper plate grants, stone edicts and seals treated as an administrative literature of early India.",
    },
    {
      Sketch: PillarSketch,
      title: "Art & Monument",
      body: "Temple architecture, sculpture and excavation studied with archaeological precision.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6">
      <QuillSketch className="sketch-float top-6 right-4 h-28 w-20 rotate-12" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 100} as="article">
            <div className="museum-frame paper-grain relative h-full p-8">
              <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
              <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
              <item.Sketch className="h-14 w-20 text-terracotta/80" />
              <h2 className="mt-5 font-display text-xl text-primary">{item.title}</h2>
              <span className="gold-rule mt-3 block w-16" />
              <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/80">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


function LatestIssue() {
  return (
    <section className="paper-grain relative overflow-hidden bg-secondary/50 py-20">
      <CarvedBorder />
      <DiyaSketch className="sketch-float top-24 left-6 h-16 w-20 -rotate-6" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <FramedImage
              src={cover}
              alt={`Cover of Bharatiya Manyaprad ${currentIssue.volume}, ${currentIssue.year}`}
              ratio="portrait"
              width={912}
              height={1200}
              caption={`${currentIssue.volume} · ${currentIssue.year}`}
              meta="Print edition"
            />
            <QuillSketch className="sketch-float -right-6 -bottom-4 h-24 w-16 rotate-[18deg]" />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="eyebrow">Latest Issue</p>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl">
            {currentIssue.volume} · {currentIssue.month} {currentIssue.year}
          </h2>
          <p className="mt-5 font-serif text-xl leading-relaxed text-foreground/85">
            Five peer-reviewed studies on scribal culture, the Deccan copper plate tradition,
            Nalanda&apos;s pedagogy, museum display and diasporic memory.
          </p>
          <ul className="mt-8 space-y-4">
            {currentIssue.papers.slice(0, 3).map((p) => (
              <li key={p.slug} className="border-l-2 border-accent/50 pl-4">
                <Link
                  to="/papers/$slug"
                  params={{ slug: p.slug }}
                  className="font-serif text-lg text-primary hover:text-terracotta"
                >
                  {p.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {p.authors.join(", ")} · pp. {p.pages}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="engraved">
              <Link to="/current-issue">Table of Contents</Link>
            </Button>
            <Button asChild variant="ghost" className="text-terracotta hover:text-terracotta">
              <Link to="/archives">
                Browse all volumes <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
      <CarvedBorder className="rotate-180" />
    </section>
  );
}

function FeaturedResearch() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="eyebrow text-center">Featured Research</p>
        <h2 className="mt-3 text-center font-display text-3xl text-primary sm:text-4xl">
          From the current volume
        </h2>
        <MandalaDivider className="mt-6" />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {currentIssue.papers.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80} as="article">
            <div className="museum-frame paper-grain relative flex h-full flex-col p-7">
              <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
              <CornerFlourish className="pointer-events-none absolute top-2 right-2 size-4 rotate-90 text-accent/60" />
              <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
              <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 size-4 -rotate-90 text-accent/60" />
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{p.category}</p>
                <span className="font-display text-xs text-accent">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg leading-snug text-primary">
                <Link to="/papers/$slug" params={{ slug: p.slug }} className="hover:text-terracotta">
                  {p.title}
                </Link>
              </h3>
              <span className="gold-rule mt-3 block" />
              <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-foreground/80">
                {p.abstract}
              </p>
              <dl className="mt-5 space-y-1 border-t border-accent/25 pt-4 text-xs text-muted-foreground">
                <div className="flex gap-2">
                  <dt className="font-medium">Authors</dt>
                  <dd className="min-w-0 truncate">{p.authors.join(", ")}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">DOI</dt>
                  <dd>{p.doi}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline" className="engraved">
                  <Link to="/papers/$slug" params={{ slug: p.slug }}>
                    <BookOpen className="size-3.5" /> Read online
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="text-terracotta hover:text-terracotta">
                  <Download className="size-3.5" /> PDF
                </Button>
              </div>
            </div>
          </Reveal>

        ))}
      </div>
    </section>
  );
}

function Metrics() {
  const stats = [
    { value: "13", label: "Years in print" },
    { value: "11", label: "Volumes published" },
    { value: "180+", label: "Peer-reviewed papers" },
    { value: "24", label: "Countries of readership" },
  ];
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90}>
            <div className="text-center">
              <p className="font-display text-4xl text-accent sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs tracking-[0.2em] uppercase text-primary-foreground/75">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  const [active, setActive] = useState(0);
  const ordered = [...archives].reverse();
  const selected = ordered[active] ?? ordered[0]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="eyebrow text-center">Archives Timeline</p>
        <h2 className="mt-3 text-center font-display text-3xl text-primary sm:text-4xl">
          Eleven volumes, one continuous record
        </h2>
        <MandalaDivider className="mt-6" />
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-12 overflow-x-auto pb-4">
          <ol className="relative flex min-w-max items-end gap-8 px-2">
            <span
              className="absolute inset-x-0 bottom-8 h-px bg-accent/40"
              aria-hidden="true"
            />
            {ordered.map((a, i) => (
              <li key={`${a.volume}-${a.year}`} className="relative">

                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className="flex min-h-11 flex-col items-center gap-3 px-2"
                  >
                    <span
                      className={`font-display text-sm transition-colors ${
                        active === i ? "text-terracotta" : "text-muted-foreground"
                      }`}
                    >
                      {a.volume}
                    </span>
                    <span
                      className={`size-3 rounded-full border transition-all ${
                        active === i
                          ? "scale-125 border-accent bg-accent"
                          : "border-accent/60 bg-background"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">{a.year}</span>
                  </button>
                </li>
              ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <div className="archive-card paper-grain mx-auto mt-6 max-w-2xl p-8 text-center">
          <p className="eyebrow">{selected.month}</p>
          <h3 className="mt-2 font-display text-2xl text-primary">
            {selected.volume} · {selected.year}
          </h3>
          <p className="mt-3 font-serif text-lg text-foreground/80">
            {selected.papers} peer-reviewed papers catalogued in this volume.
          </p>
          <Button asChild variant="outline" className="engraved mt-6">
            <Link to="/archives">Open in archive explorer</Link>
          </Button>
        </div>
      </Reveal>

    </section>
  );
}

function Categories() {
  return (
    <section className="paper-grain bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Research Categories</p>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl">
            Fields the journal reads across
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <div className="archive-card flex items-start gap-4 p-6">
                <LotusMark className="mt-1 size-6 shrink-0 text-accent" />
                <div className="min-w-0">
                  <h3 className="font-display text-base text-primary">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoardStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="eyebrow text-center">Editorial Board</p>
        <h2 className="mt-3 text-center font-display text-3xl text-primary sm:text-4xl">
          Scholars who steward the record
        </h2>
        <MandalaDivider className="mt-6" />
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {board.slice(0, 3).map((m, i) => (
          <Reveal key={m.name} delay={i * 90}>
            <div className="archive-card p-7 text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary ring-1 ring-accent/50">
                <span className="font-display text-xl text-primary">
                  {m.name
                    .split(" ")
                    .slice(-2)
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg text-primary">{m.name}</h3>
              <p className="eyebrow mt-1">{m.role}</p>
              <p className="mt-3 font-serif text-base text-foreground/80">{m.institution}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline" className="engraved">
          <Link to="/editorial-board">Meet the full board</Link>
        </Button>
      </div>
    </section>
  );
}

function CallForPapers() {
  return (
    <section className="relative isolate overflow-hidden bg-primary py-20 text-primary-foreground">
      <img
        src={nalanda}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1408}
        height={912}
        className="absolute inset-0 -z-10 size-full object-cover opacity-[0.12] mix-blend-screen"
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="eyebrow text-accent">Call for Papers</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl">Volume XII · 2026</h2>
          <p className="mt-6 font-serif text-xl leading-relaxed text-primary-foreground/85">
            We invite original research, review essays and book reviews in Indian studies. Articles
            should surprise and instruct in equal measure, and remain legible to a reader beyond the
            discipline.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/submission">Submit a paper</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent/60 bg-transparent text-primary-foreground hover:bg-accent/15"
            >
              <Link to="/instructions-to-authors">Instructions to authors</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { title: "Submit", body: "Manuscript and abstract received through the submission desk." },
    { title: "Review", body: "Double-blind peer review by two subject specialists." },
    { title: "Revision", body: "Author revisions returned within four weeks." },
    { title: "Acceptance", body: "Editorial board confirms acceptance and licensing." },
    { title: "Publication", body: "Typeset for the print edition and indexed." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="eyebrow text-center">Publication Process</p>
        <h2 className="mt-3 text-center font-display text-3xl text-primary sm:text-4xl">
          From manuscript to print
        </h2>
        <MandalaDivider className="mt-6" />
      </Reveal>
      <ol className="mt-12 grid gap-5 md:grid-cols-5">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 90} as="li">
            <div className="archive-card temple-arch h-full p-6 pt-8 text-center">
              <span className="font-display text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg text-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      quote:
        "A rare journal that treats the inscription and the interview with equal seriousness. Its copper plate scholarship is genuinely field-defining.",
      name: "Prof. Lalita Menon",
      role: "Deccan College, Pune",
    },
    {
      quote:
        "For diaspora scholars, Manyaprad has become the place where questions of memory and civilisation can be asked without apology.",
      name: "Dr. Arun Chandra",
      role: "SOAS, University of London",
    },
  ];
  return (
    <section className="paper-grain bg-secondary/50 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 110}>
            <figure className="archive-card h-full p-8">
              <Quote className="size-6 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 font-serif text-xl leading-relaxed text-foreground/85">
                {q.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                <span className="font-display text-primary">{q.name}</span> · {q.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <Reveal>
        <FileText className="mx-auto size-7 text-accent" aria-hidden="true" />
        <h2 className="mt-4 font-display text-3xl text-primary">Notices from the archive</h2>
        <p className="mt-3 font-serif text-lg text-foreground/80">
          Calls for papers, new volumes and indexing news — a few letters each year, nothing more.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            required
            placeholder="your@institution.edu"
            className="bg-card"
          />
          <Button type="submit" className="engraved" variant="outline">
            Subscribe
          </Button>
        </form>
        <p aria-live="polite" className="mt-3 h-5 text-sm text-terracotta">
          {sent ? "Thank you — your address has been noted." : ""}
        </p>
      </Reveal>
    </section>
  );
}
