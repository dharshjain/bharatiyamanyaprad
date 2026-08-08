import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import cover from "@/assets/issue-cover.jpg";
import heroBg from "@/assets/hero-manuscript.jpg";
import nalanda from "@/assets/nalanda-illustration.jpg";
import { FramedImage } from "@/components/site/framed-image";
import {
  CarvedBorder,
  CornerFlourish,
  DiyaSketch,
  LotusMark,
  MandalaDivider,
  ManuscriptSketch,
  PillarSketch,
  QuillSketch,
  SealSketch,
} from "@/components/site/ornaments";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  aboutParagraphs,
  callForPapers,
  contact,
  heritageNote,
  notices,
  publications,
  quickLinks,
} from "@/data/journal";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Bharatiya Manyaprad — International Journal of Indian Studies" },
      {
        name: "description",
        content:
          "Bharatiya Manyaprad, ISSN 2321-8444, is a peer-reviewed International Journal of Indian Studies published from Ahmedabad under the aegis of Bhartiya Vidya Bhawan and Gujarat University.",
      },
      {
        property: "og:title",
        content: "Bharatiya Manyaprad — International Journal of Indian Studies",
      },
      {
        property: "og:description",
        content:
          "A UGC CARE listed peer-reviewed journal of Indian studies, supported by the Indian Council of Historical Research.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <>
      <Hero />
      <Notices />
      <About />
      <Publications />
      <QuickDesk />
      <CallForPapersBand />
      <ContactStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="paper-grain relative isolate overflow-hidden bg-secondary/45 pt-32 pb-16">
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
          <h1 className="mt-8 text-center font-display text-[2.4rem] leading-[1.02] tracking-tight text-primary uppercase sm:text-6xl lg:text-[4.8rem]">
            Bharatiya Manyaprad
          </h1>
          <p className="mt-4 text-center font-display text-base tracking-[0.28em] uppercase text-accent sm:text-lg">
            International Journal of Indian Studies
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-lg leading-relaxed text-foreground/85 sm:text-xl">
            A call to bring closer all Indians at one mental meadow — residents, NRIs and PIOs
            alike. A peer-reviewed, UGC CARE listed journal of cultural studies, published from
            Ahmedabad since 2013.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/publication"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              View Publications
              <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              to="/call-for-papers"
              className="engraved inline-flex items-center rounded-full px-6 py-3 font-sans text-sm font-semibold"
            >
              Call for Papers
            </Link>
          </div>
          <p className="mt-7 text-center text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground">
            ISSN {contact.issn} · Print edition since 2013
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Notices() {
  return (
    <section className="bg-primary py-10 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
        {notices.map((n, i) => (
          <Reveal key={n} delay={i * 90}>
            <div className="flex h-full items-start gap-3 border-l border-accent/50 pl-4">
              <LotusMark className="mt-1 size-5 shrink-0 text-accent" />
              <p className="font-serif text-base leading-relaxed text-primary-foreground/90">{n}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6">
      <QuillSketch className="sketch-float top-8 right-4 h-28 w-20 rotate-12" />
      <Reveal>
        <p className="eyebrow text-center">About the Journal</p>
        <h2 className="mt-3 text-center font-display text-3xl text-primary sm:text-4xl">
          About Bharatiya Manyaprad
        </h2>
        <MandalaDivider className="mt-6" />
      </Reveal>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Reveal delay={100}>
          <div className="space-y-5">
            {aboutParagraphs.map((p) => (
              <p key={p.slice(0, 30)} className="font-serif text-lg leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
            <div className="museum-frame paper-grain relative mt-8 p-7">
              <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
              <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
              <ManuscriptSketch className="h-12 w-20 text-terracotta/80" />
              <p className="mt-4 font-serif text-lg leading-relaxed text-foreground/85">
                {heritageNote}
              </p>
            </div>
            <Button asChild variant="outline" className="engraved mt-2">
              <Link to="/about">Read the full account</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <FramedImage
            src={cover}
            alt="Cover of the latest printed volume of Bharatiya Manyaprad"
            ratio="portrait"
            width={912}
            height={1200}
            caption="Vol. XI · May 2024"
            meta="Latest printed volume"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Publications() {
  return (
    <section className="paper-grain relative overflow-hidden bg-secondary/50 py-20">
      <CarvedBorder />
      <DiyaSketch className="sketch-float top-24 left-6 h-16 w-20 -rotate-6" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Reveal>
          <p className="eyebrow text-center">Publication</p>
          <h2 className="mt-3 text-center font-display text-3xl text-primary sm:text-4xl">
            Volumes available to download
          </h2>
          <MandalaDivider className="mt-6" />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {publications.slice(0, 6).map((p, i) => (
            <Reveal key={p.title} delay={i * 70} as="li">
              <article className="museum-frame paper-grain relative h-full p-7">
                <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
                <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
                <SealSketch className="pointer-events-none absolute -top-4 -right-4 size-24 text-terracotta/15" />
                <p className="eyebrow">{p.period}</p>
                <h3 className="mt-2 font-display text-xl leading-snug text-primary">{p.title}</h3>
                <span className="gold-rule mt-3 block w-16" />
                <Button variant="outline" size="sm" className="engraved mt-5">
                  <Download className="size-3.5" /> Download volume
                </Button>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="engraved">
            <Link to="/publication">See all volumes</Link>
          </Button>
        </div>
      </div>
      <CarvedBorder className="rotate-180" />
    </section>
  );
}

function QuickDesk() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="archive-card paper-grain h-full p-8">
            <PillarSketch className="h-16 w-12 text-terracotta/70" />
            <h2 className="mt-4 font-display text-2xl text-primary">Editorial desk</h2>
            <span className="gold-rule mt-3 block w-16" />
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-2 font-serif text-lg text-primary hover:text-terracotta"
                  >
                    <LotusMark className="size-4 text-accent" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="archive-card paper-grain h-full p-8">
            <h2 className="font-display text-2xl text-primary">News &amp; Events</h2>
            <span className="gold-rule mt-3 block w-16" />
            <ul className="mt-5 space-y-5">
              {notices.map((n) => (
                <li key={n} className="border-l-2 border-accent/50 pl-4">
                  <p className="font-serif text-lg leading-relaxed text-foreground/85">{n}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CallForPapersBand() {
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
          <h2 className="mt-4 font-display text-3xl sm:text-5xl">{callForPapers.volume}</h2>
          <p className="mt-4 font-display text-sm tracking-[0.22em] uppercase text-accent">
            Theme · {callForPapers.theme}
          </p>
          <p className="mt-6 font-serif text-xl leading-relaxed text-primary-foreground/85">
            {callForPapers.themeNote}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/call-for-papers">Read the call</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent/60 bg-transparent text-primary-foreground hover:bg-accent/15"
            >
              <Link to="/submission">Submit review paper</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="museum-frame paper-grain relative p-9 text-center">
          <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
          <CornerFlourish className="pointer-events-none absolute top-2 right-2 size-4 rotate-90 text-accent/60" />
          <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
          <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 size-4 -rotate-90 text-accent/60" />
          <p className="eyebrow">Contact Us</p>
          <h2 className="mt-3 font-display text-2xl text-primary">{contact.editor}</h2>
          <p className="mt-2 font-serif text-lg text-foreground/80">
            Principal, Bhavan&apos;s Arts and Commerce College, Navarangpura, Ahmedabad (Guj) 380009
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <a className="text-terracotta hover:underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            · {contact.mobile}
          </p>
          <Button asChild variant="outline" className="engraved mt-6">
            <Link to="/contact">Full contact details</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
