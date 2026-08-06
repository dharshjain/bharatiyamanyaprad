import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Landmark,
  Quote,
  ScrollText,
  Stamp,
} from "lucide-react";
import { useState } from "react";
import heroBg from "@/assets/hero-manuscript.jpg";
import nalanda from "@/assets/nalanda-illustration.jpg";
import cover from "@/assets/issue-cover.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MandalaDivider, CarvedBorder, LotusMark } from "@/components/site/ornaments";
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
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 size-full object-cover opacity-90 dark:opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      <img
        src={nalanda}
        alt=""
        aria-hidden="true"
        width={1408}
        height={912}
        loading="lazy"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 w-[70%] max-w-4xl opacity-[0.13] mix-blend-multiply dark:opacity-10 dark:mix-blend-screen"
      />

      <div className="mx-auto w-full max-w-5xl px-4 pt-28 pb-20 text-center sm:px-6">
        <Reveal>
          <p className="font-serif text-base tracking-wide text-terracotta">
            ॥ सबहीं मानप्रद आपहि अमानि ॥ — गोस्वामी तुलसीदास
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] text-primary sm:text-6xl lg:text-7xl">
            Preserving India&apos;s
            <br />
            Scholarly Heritage
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <MandalaDivider className="mt-8" />
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg leading-relaxed text-foreground/85 sm:text-2xl">
            Bharatiya Manyaprad is a peer-reviewed international journal of Indian studies, reading
            manuscripts, inscriptions, sculpture and living culture as one continuous archive of
            thought.
          </p>
        </Reveal>
        <Reveal delay={380}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="outline" className="engraved">
              <Link to="/archives">
                Explore Journals <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/current-issue">View Current Issue</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={460}>
          <p className="mt-10 text-xs tracking-[0.24em] uppercase text-muted-foreground">
            ISSN 2321-8444 · Print Edition · Indexed by Index Copernicus International
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    {
      icon: ScrollText,
      title: "Manuscript Scholarship",
      body: "Palm leaf and paper folios read closely — colophons, scribes and the workshops that copied them.",
    },
    {
      icon: Stamp,
      title: "Epigraphic Record",
      body: "Copper plate grants, stone edicts and seals treated as an administrative literature of early India.",
    },
    {
      icon: Landmark,
      title: "Art & Monument",
      body: "Temple architecture, sculpture and excavation studied with archaeological precision.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 100} as="article">
            <div className="archive-card paper-grain h-full p-8">
              <item.icon className="size-7 text-accent" aria-hidden="true" />
              <h2 className="mt-5 font-display text-xl text-primary">{item.title}</h2>
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
    <section className="paper-grain relative bg-secondary/50 py-20">
      <CarvedBorder />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <img
              src={cover}
              alt={`Cover of Bharatiya Manyaprad ${currentIssue.volume}, ${currentIssue.year}`}
              width={912}
              height={1200}
              loading="lazy"
              className="w-full rounded-lg stone-frame"
            />
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
            <div className="archive-card flex h-full flex-col p-7">
              <p className="eyebrow">{p.category}</p>
              <h3 className="mt-3 font-display text-lg leading-snug text-primary">
                <Link to="/papers/$slug" params={{ slug: p.slug }} className="hover:text-terracotta">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 font-serif text-base leading-relaxed text-foreground/80">
                {p.abstract}
              </p>
              <dl className="mt-5 space-y-1 text-xs text-muted-foreground">
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
            {archives
              .slice()
              .reverse()
              .map((a, i) => (
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
          <p className="eyebrow">{[...archives].reverse()[active].month}</p>
          <h3 className="mt-2 font-display text-2xl text-primary">
            {[...archives].reverse()[active].volume} · {[...archives].reverse()[active].year}
          </h3>
          <p className="mt-3 font-serif text-lg text-foreground/80">
            {[...archives].reverse()[active].papers} peer-reviewed papers catalogued in this volume.
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
