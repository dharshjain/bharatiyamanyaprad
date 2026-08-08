import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import cover from "@/assets/issue-cover.jpg";
import heroBg from "@/assets/hero-manuscript.jpg";
import nalanda from "@/assets/nalanda-illustration.jpg";
import heroPalmLeaf from "@/assets/hero-palm-leaf.png";
import heroScholar from "@/assets/hero-scholar.png";
import heroTempleStone from "@/assets/hero-temple-stone.png";
import heritageElephant from "@/assets/heritage-elephant.png";
import heritageLotus from "@/assets/heritage-lotus.png";
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
  MajesticLotus,
} from "@/components/site/ornaments";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  aboutParagraphs,
  callForPapers,
  contact,
  heritageNote,
  notices as staticNotices,
  publications as staticPublications,
  quickLinks,
} from "@/data/journal";
import { supabase, type NewsEvent, type Publication } from "@/lib/supabase";

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
  const [liveNotices, setLiveNotices] = useState<NewsEvent[]>([]);
  const [livePublications, setLivePublications] = useState<Publication[]>([]);

  useEffect(() => {
    supabase
      .from("news_events")
      .select("*")
      .order("sort_order")
      .then(({ data }) => { if (data) setLiveNotices(data as NewsEvent[]); });
    supabase
      .from("publications")
      .select("*")
      .order("sort_order")
      .then(({ data }) => { if (data) setLivePublications(data as Publication[]); });
  }, []);

  const notices = liveNotices.length > 0
    ? liveNotices.map((n) => n.content)
    : staticNotices;

  const publications = livePublications.length > 0
    ? livePublications
    : staticPublications.map((p, i) => ({
        id: String(i), title: p.title, volume: p.volume,
        period: p.period, year: p.year, pdf_url: null, pdf_name: null,
        sort_order: i, created_at: "", updated_at: "",
      }));

  return (
    <>
      <Hero />
      <Notices notices={notices} />
      <About />
      <Publications publications={publications} />
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

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative">
        {/* Facing majestic heritage elephant illustrations flanking the hero section */}
        {/* Left Elephant: Normal scale to look right toward the text */}
        <img
          src={heritageElephant}
          alt=""
          aria-hidden="true"
          className="absolute right-full top-1/2 -translate-y-1/2 mr-6 h-[400px] w-auto object-contain pointer-events-none select-none z-10 opacity-75 dark:opacity-55 mix-blend-multiply invert hue-rotate-[180deg] brightness-[0.45] contrast-[1.2] dark:mix-blend-screen dark:invert-0 dark:hue-rotate-0 dark:brightness-100 dark:contrast-100 hidden xl:block transition-all duration-300"
        />
        {/* Right Elephant: Flipped scale-x-[-1] to look left toward the text */}
        <img
          src={heritageElephant}
          alt=""
          aria-hidden="true"
          className="absolute left-full top-1/2 -translate-y-1/2 ml-6 h-[400px] w-auto object-contain pointer-events-none select-none z-10 transform scale-x-[-1] opacity-75 dark:opacity-55 mix-blend-multiply invert hue-rotate-[180deg] brightness-[0.45] contrast-[1.2] dark:mix-blend-screen dark:invert-0 dark:hue-rotate-0 dark:brightness-100 dark:contrast-100 hidden xl:block transition-all duration-300"
        />
        <Reveal>
          <p className="text-center font-serif text-base tracking-wide text-terracotta">
            ॥ सबहीं मानप्रद आपहि अमानि ॥ — गोस्वामी तुलसीदास
          </p>
        </Reveal>

        <Reveal delay={100}>
          {/* Hero headline with inline floating images — like the reference screenshot */}
          <h1 className="mt-8 text-center font-display text-[2.4rem] leading-[1.1] tracking-tight text-primary uppercase sm:text-6xl lg:text-[4.8rem]">
            {/* Line 1 with a small floating image */}
            <span className="inline-flex flex-wrap items-center justify-center gap-3">
              <span>Step</span>
              <span
                className="inline-block size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/50 shadow-md sm:size-14 lg:size-16 align-middle"
                style={{ verticalAlign: "middle" }}
              >
                <img
                  src={heroPalmLeaf}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-cover"
                />
              </span>
              <span>Inside India's</span>
            </span>
            <br />
            {/* Line 2 with two flanking images */}
            <span className="inline-flex flex-wrap items-center justify-center gap-3">
              <span
                className="inline-block size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40 shadow-md sm:size-12 lg:size-14 align-middle"
                style={{ verticalAlign: "middle" }}
              >
                <img
                  src={heroTempleStone}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-cover"
                />
              </span>
              <span>Living</span>
              <span
                className="inline-block size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40 shadow-md sm:size-12 lg:size-14 align-middle"
                style={{ verticalAlign: "middle" }}
              >
                <img
                  src={heroScholar}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-cover"
                />
              </span>
              <span>Archive</span>
            </span>
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

function Notices({ notices }: { notices: string[] }) {
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
            <div 
              className="relative rounded-3xl p-6 sm:p-8 border border-accent/25 shadow-lg overflow-hidden mt-8"
              style={{
                background: "linear-gradient(135deg, var(--card), var(--background))",
              }}
            >
              {/* Double thin border for historic scroll look */}
              <div className="absolute inset-2 rounded-[22px] border border-accent/15 pointer-events-none" />
              
              {/* Corner flourishes inside padding */}
              <CornerFlourish className="pointer-events-none absolute top-4 left-4 size-4.5 text-accent/40" />
              <CornerFlourish className="pointer-events-none absolute top-4 right-4 size-4.5 rotate-90 text-accent/40" />
              <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 size-4.5 -rotate-90 text-accent/40" />
              <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 size-4.5 rotate-180 text-accent/40" />

              {/* Faded seal watermark background */}
              <SealSketch className="absolute right-4 bottom-4 size-32 text-accent/5 opacity-[0.05] pointer-events-none select-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2.5">
                  <LotusMark className="size-4.5 text-accent" />
                  <span className="font-display text-xs tracking-wider uppercase text-accent-foreground font-semibold">Civilisational Heritage</span>
                </div>
                
                <p className="font-serif text-base leading-relaxed text-foreground/90 italic">
                  "{heritageNote}"
                </p>
              </div>
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

function Publications({ publications }: { publications: Array<{ id: string; title: string; volume: string; period: string; year: number; pdf_url: string | null }> }) {
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
            <Reveal key={p.id} delay={i * 70} as="li">
              <article 
                className="relative rounded-3xl p-6 pt-16 hover:translate-y-[-6px] hover:shadow-[0_20px_40px_rgba(184,134,11,0.12)] transition-all duration-500 flex flex-col justify-between h-full group text-center border border-accent/25 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--card), var(--background))",
                }}
              >
                {/* Double thin border for historic charter look */}
                <div className="absolute inset-2 rounded-[22px] border border-accent/15 pointer-events-none" />
                
                {/* Corner flourishes in all four corners */}
                <CornerFlourish className="pointer-events-none absolute top-3.5 left-3.5 size-4 text-accent/40" />
                <CornerFlourish className="pointer-events-none absolute top-3.5 right-3.5 size-4 rotate-90 text-accent/40" />
                <CornerFlourish className="pointer-events-none absolute bottom-3.5 left-3.5 size-4 -rotate-90 text-accent/40" />
                <CornerFlourish className="pointer-events-none absolute bottom-3.5 right-3.5 size-4 rotate-180 text-accent/40" />

                {/* Period heading - top-left */}
                <div className="absolute top-5 left-7 flex flex-col items-start gap-0.5">
                  <span className="font-display text-[0.68rem] tracking-[0.18em] uppercase text-accent-foreground font-semibold">
                    {p.period}
                  </span>
                  <div className="flex items-center gap-1 opacity-45">
                    <span className="h-[0.5px] w-3.5 bg-accent" />
                    <span className="text-[0.4rem] text-accent">✦</span>
                    <span className="h-[0.5px] w-3.5 bg-accent" />
                  </div>
                </div>

                {/* Lotus Medallion - top-right */}
                <div className="absolute top-5 right-7 size-10 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center text-accent/70 shadow-[0_0_12px_rgba(184,134,11,0.08)] hover:scale-105 transition-transform duration-300">
                  <LotusMark className="size-4.5" />
                </div>

                {/* Center Glowing Lotus Flower Image */}
                <div className="flex flex-col items-center pt-4 pb-2">
                  <div className="relative w-40 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full scale-110 pointer-events-none opacity-40 dark:opacity-65" />
                    <img 
                      src={heritageLotus} 
                      alt="Golden Lotus"
                      className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply invert hue-rotate-[180deg] brightness-[0.45] contrast-[1.2] dark:mix-blend-screen dark:invert-0 dark:hue-rotate-0 dark:brightness-100 dark:contrast-100"
                    />
                  </div>
                </div>

                {/* Card Info Texts */}
                <div className="space-y-1">
                  <h3 className="font-display text-xs tracking-[0.22em] text-accent/90 uppercase font-semibold">
                    Bharatiya Manyaprad
                  </h3>
                  
                  <h4 className="font-display text-lg leading-snug text-primary group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h4>
                  
                  <p className="font-serif text-sm italic text-foreground/75">
                    {p.volume}
                  </p>
                  
                  <div className="flex items-center justify-center gap-1.5 opacity-45 pt-1">
                    <span className="h-[0.5px] w-5 bg-accent" />
                    <span className="text-[0.4rem] text-accent">✦</span>
                    <span className="h-[0.5px] w-5 bg-accent" />
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-6 z-10">
                  {p.pdf_url ? (
                    <Button variant="outline" size="sm" className="engraved w-full py-5 rounded-xl border-accent/20 hover:border-accent" asChild>
                      <a href={p.pdf_url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="size-3.5 mr-1.5" /> Download volume
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="engraved w-full py-5 rounded-xl border-accent/20" disabled>
                      <Download className="size-3.5 mr-1.5" /> Download volume
                    </Button>
                  )}
                </div>
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
  const [notices, setNotices] = useState<string[]>(staticNotices);
  useEffect(() => {
    supabase
      .from("news_events")
      .select("content")
      .order("sort_order")
      .then(({ data }) => { if (data && data.length > 0) setNotices(data.map((d) => d.content)); });
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 size-[32rem] rounded-full bg-accent/5 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 size-[32rem] rounded-full bg-terracotta/5 opacity-20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Editorial Desk Left Column - Layout in 2x2 Compact Grid */}
          <div className="lg:col-span-6">
            <Reveal>
              <div 
                className="relative rounded-3xl p-6 sm:p-8 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, color-mix(in oklab, var(--card) 60%, transparent), color-mix(in oklab, var(--background) 30%, transparent))",
                  border: "1px solid color-mix(in oklab, var(--accent) 18%, transparent)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Header info */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <PillarSketch className="size-8" />
                  </div>
                  <div>
                    <p className="eyebrow text-terracotta">Desk &amp; Resources</p>
                    <h2 className="font-display text-2xl text-primary tracking-wide">
                      Editorial Desk
                    </h2>
                    <span className="gold-rule mt-2 block w-16" />
                  </div>
                </div>

                <p className="mb-6 font-serif text-sm leading-relaxed text-foreground/75">
                  Access submission templates, author instructions, the editorial board directory, and start review paperwork.
                </p>

                {/* 2x2 Grid of Beautiful Link Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {quickLinks.map((l, index) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="group flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 relative overflow-hidden h-32"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      {/* Hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                      <div className="flex items-center justify-between relative z-10">
                        <span className="grid size-8 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                          <LotusMark className="size-4 animate-[spin_10s_linear_infinite]" />
                        </span>
                        <ArrowRight className="size-4 text-accent/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>

                      <div className="relative z-10 mt-4">
                        <span className="block font-serif text-base font-semibold text-foreground/90 group-hover:text-primary transition-colors">
                          {l.label}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* News & Events Right Column - Compact Scroller */}
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <div 
                className="relative rounded-3xl p-6 sm:p-8 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, color-mix(in oklab, var(--card) 60%, transparent), color-mix(in oklab, var(--background) 30%, transparent))",
                  border: "1px solid color-mix(in oklab, var(--accent) 18%, transparent)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Header Info */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                      <ManuscriptSketch className="size-8" />
                    </div>
                    <div>
                      <p className="eyebrow text-terracotta">Announcements</p>
                      <h2 className="font-display text-2xl text-primary tracking-wide">
                        News &amp; Events
                      </h2>
                      <span className="gold-rule mt-2 block w-16" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-red-950/30 border border-red-500/20 px-3 py-1 text-red-400/90 shadow-[0_0_15px_rgba(239,68,68,0.07)] animate-pulse">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                    <span className="font-sans text-[0.62rem] font-bold tracking-wider uppercase">Live Feed</span>
                  </div>
                </div>

                {/* Inline Styles for Vertical Loop */}
                <style>{`
                  @keyframes marqueeVerticalCompact {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-33.33%); }
                  }
                  .animate-marquee-vertical-compact {
                    animation: marqueeVerticalCompact 25s linear infinite;
                  }
                `}</style>

                {/* Infinite Vertical Scrolling Container */}
                <div className="relative h-[256px] overflow-hidden rounded-2xl bg-black/10 border border-accent/5 p-3">
                  {/* Fade overlays for smooth edge visuals */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background via-background/40 to-transparent z-20" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background via-background/40 to-transparent z-20" />

                  <div className="relative h-full overflow-hidden pl-4">
                    <div className="animate-marquee-vertical-compact hover:[animation-play-state:paused] flex flex-col gap-4 py-2 cursor-pointer">
                      {[...notices, ...notices, ...notices].map((n, idx) => {
                        const originalIdx = idx % notices.length;
                        return (
                          <div key={idx} className="relative group/item z-10">
                            {/* Simple text block inside interactive card */}
                            <div 
                              className="rounded-xl p-4 transition-all duration-300"
                              style={{
                                background: "rgba(255, 255, 255, 0.01)",
                                border: "1px solid rgba(255, 255, 255, 0.02)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="inline-block size-1.5 rounded-full bg-accent" />
                                <span className="font-sans text-[0.58rem] font-semibold uppercase tracking-wider text-accent-foreground">
                                  Update {originalIdx + 1}
                                </span>
                              </div>
                              <p className="font-serif text-[0.88rem] leading-relaxed text-foreground/85">
                                {n}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
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
