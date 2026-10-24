import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExternalLink, Mail, FileText } from "lucide-react";
import { CornerFlourish, LotusMark, SealSketch, CarvedBorder } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { supabase, type EditorialBoardMember, type EditorialBoardDocument } from "@/lib/supabase";

export const Route = createFileRoute("/editorial-board")({
  component: EditorialBoard,
  head: () => ({
    meta: [
      { title: "Editorial Board — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "The editorial desk of Bharatiya Manyaprad, led by Dr Neerja Gupta, Editor in Chief and Publisher.",
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

const ROLE_LABEL: Record<string, string> = {
  editor_in_chief: "Editor in Chief and Publisher",
  executive_editor: "Executive Editors",
  advisory: "Advisory Board Council",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function EditorialBoard() {
  const [members, setMembers] = useState<EditorialBoardMember[]>([]);
  const [doc, setDoc] = useState<EditorialBoardDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [mRes, dRes] = await Promise.all([
        supabase.from("editorial_board_members").select("*").order("sort_order"),
        supabase.from("editorial_board_document").select("*").limit(1).single(),
      ]);
      if (mRes.data) setMembers(mRes.data as EditorialBoardMember[]);
      if (dRes.data) setDoc(dRes.data as EditorialBoardDocument);
      setLoading(false);
    }
    fetchData();
  }, []);

  const grouped = {
    editor_in_chief: members.filter((m) => m.role === "editor_in_chief"),
    executive_editor: members.filter((m) => m.role === "executive_editor"),
    advisory: members.filter((m) => m.role === "advisory"),
  };

  return (
    <>
      <PageHero
        eyebrow="Journal Custodians"
        title="The Editorial Board"
        intro="The distinguished editorial desk of Bharatiya Manyaprad, drawing cultural and academic leaders from Indian and international universities."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 space-y-12">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-16">
            {/* 1. EDITOR IN CHIEF */}
            {grouped.editor_in_chief.length > 0 &&
              (() => {
                const eic = grouped.editor_in_chief[0];
                if (!eic) return null;
                return (
                  <Reveal delay={100}>
                    <FeaturedMemberCard member={eic} roleLabel="Editor in Chief & Publisher" />
                  </Reveal>
                );
              })()}

            {/* 2. EXECUTIVE EDITORS */}
            {grouped.executive_editor.length > 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <span className="font-display text-xs tracking-[0.2em] text-accent uppercase font-bold">
                    Editorial Desk
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl text-primary tracking-wide mt-1">
                    Executive Editors
                  </h2>
                  <div className="flex items-center justify-center gap-3.5 mt-2">
                    <span className="h-[0.5px] w-12 bg-accent/20" />
                    <LotusMark className="size-4 text-accent/60" />
                    <span className="h-[0.5px] w-12 bg-accent/20" />
                  </div>
                </div>
                <div className="space-y-8">
                  {grouped.executive_editor.map((m, idx) => (
                    <Reveal key={m.id} delay={150 + idx * 80}>
                      <FeaturedMemberCard member={m} roleLabel="Executive Editor" />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ADVISORY BOARD COUNCIL */}
            {grouped.advisory.length > 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <span className="font-display text-xs tracking-[0.2em] text-accent uppercase font-bold">
                    Consultants
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl text-primary tracking-wide mt-1">
                    Advisory Board Council
                  </h2>
                  <div className="flex items-center justify-center gap-3.5 mt-2">
                    <span className="h-[0.5px] w-12 bg-accent/20" />
                    <LotusMark className="size-4 text-accent/60" />
                    <span className="h-[0.5px] w-12 bg-accent/20" />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  {grouped.advisory.map((m, idx) => (
                    <Reveal key={m.id} delay={200 + idx * 50} className="h-full flex flex-col">
                      <AdvisoryMemberCard member={m} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PEER REVIEW STATEMENT IN MANUSCRIPT PLAQUE */}
        <Reveal delay={120}>
          <div
            className="relative rounded-3xl p-6 sm:p-8 border border-accent/20 shadow-md overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--card), var(--background))",
            }}
          >
            <div className="absolute inset-1.5 rounded-2xl border border-accent/10 pointer-events-none" />

            {/* Watermark seal behind description */}
            <SealSketch className="absolute -right-6 -bottom-6 size-36 text-accent/5 opacity-[0.06] pointer-events-none select-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="size-12 rounded-full border border-accent/25 bg-accent/5 flex items-center justify-center text-accent shrink-0 shadow-[0_0_12px_rgba(184,134,11,0.1)]">
                <LotusMark className="size-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-sm tracking-widest text-accent uppercase font-bold text-center sm:text-left">
                  Peer Review Statement
                </h3>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-muted-foreground/90 text-center sm:text-left">
                  Every research article is published after a strict peer-review evaluation by
                  subject specialists drawn from the journal's reviewer panel across Indian and
                  overseas universities. The complete board list is printed in the front matter of
                  each volume; correspondence for the board may be addressed to the central
                  editorial office.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* READ MORE DOCUMENTS ACTION BUTTON */}
        {doc?.file_url && (
          <Reveal delay={200}>
            <div className="text-center pt-4">
              <Button
                variant="outline"
                className="engraved px-8 py-5 rounded-xl border-accent/30"
                asChild
              >
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4 mr-2" /> Read Detailed Editorial Board Document
                </a>
              </Button>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}

function FeaturedMemberCard({
  member,
  roleLabel,
}: {
  member: EditorialBoardMember;
  roleLabel: string;
}) {
  return (
    <div
      className="relative rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-xl overflow-hidden text-center sm:text-left"
      style={{
        background: "linear-gradient(135deg, var(--card), var(--background))",
      }}
    >
      <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] border border-accent/15 pointer-events-none" />
      <CornerFlourish className="pointer-events-none absolute top-4 left-4 size-4.5 text-accent/40" />
      <CornerFlourish className="pointer-events-none absolute top-4 right-4 size-4.5 rotate-90 text-accent/40" />
      <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 size-4.5 -rotate-90 text-accent/40" />
      <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 size-4.5 rotate-180 text-accent/40" />

      {/* Watermark seal */}
      <SealSketch className="absolute -right-8 -bottom-8 size-48 text-accent/5 opacity-[0.04] pointer-events-none select-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 sm:p-4">
        {/* Rectangular Framed Photo or Fallback Badge */}
        {member.photo_url ? (
          <div className="relative size-40 sm:size-52 shrink-0 rounded-2xl border-2 border-accent p-1 bg-background/50 shadow-md overflow-hidden">
            <img
              src={member.photo_url}
              alt={member.name}
              className="size-full rounded-xl object-cover"
            />
          </div>
        ) : (
          <div className="relative grid size-40 sm:size-52 shrink-0 place-items-center rounded-2xl border border-accent/35 bg-accent/5 text-accent font-display text-3xl sm:text-4xl tracking-wider font-semibold shadow-[0_0_20px_rgba(184,134,11,0.12)] select-none">
            <div className="absolute inset-1.5 rounded-xl border border-accent/10 pointer-events-none" />
            <span>{getInitials(member.name)}</span>
          </div>
        )}

        <div className="flex-1 space-y-4">
          <div>
            <span className="font-display text-xs tracking-[0.25em] text-accent uppercase font-bold block mb-1">
              {roleLabel}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-primary tracking-wide">
              {member.name}
            </h2>
            {member.designation && (
              <p className="font-sans text-xs tracking-wide text-accent-foreground font-semibold uppercase mt-1">
                {member.designation}
              </p>
            )}
          </div>

          {member.description && (
            <p className="font-serif text-sm sm:text-base leading-relaxed text-foreground font-semibold">
              "{member.description}"
            </p>
          )}

          {member.email && (
            <p className="pt-2">
              <a
                className="inline-flex items-center gap-2 text-xs font-sans tracking-wider text-accent border border-accent/20 bg-accent/5 rounded-full px-5 py-2 hover:bg-accent/10 transition-colors shadow-sm"
                href={`mailto:${member.email}`}
              >
                <Mail className="size-3.5" />
                {member.email}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function AdvisoryMemberCard({ member }: { member: EditorialBoardMember }) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-accent/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center gap-6 max-w-[290px] w-full min-h-[410px]"
      style={{
        background: "linear-gradient(135deg, var(--card), var(--background))",
      }}
    >
      <div className="absolute inset-2 rounded-[14px] border border-accent/10 pointer-events-none" />
      <CornerFlourish className="pointer-events-none absolute top-3 left-3 size-3.5 text-accent/30" />
      <CornerFlourish className="pointer-events-none absolute top-3 right-3 size-3.5 rotate-90 text-accent/30" />
      <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 size-3.5 -rotate-90 text-accent/30" />
      <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 size-3.5 rotate-180 text-accent/30" />

      {/* Portrait Framed Image */}
      <div className="relative shrink-0">
        {member.photo_url ? (
          <div className="size-36 rounded-xl overflow-hidden border border-accent/25 shadow-md">
            <img src={member.photo_url} alt={member.name} className="size-full object-cover" />
          </div>
        ) : (
          <div className="size-36 rounded-xl bg-accent/5 border border-accent/15 flex flex-col items-center justify-center text-accent select-none shadow-md">
            <span className="font-display text-2xl tracking-wider font-semibold text-accent/80">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between relative z-10 space-y-4">
        <div className="space-y-2">
          <div>
            <span className="font-display text-[0.62rem] tracking-[0.22em] text-accent uppercase font-bold block mb-0.5">
              Advisory Board Member
            </span>
            <h3 className="font-display text-base text-primary tracking-wide leading-snug">
              {member.name}
            </h3>
            {member.designation && (
              <p className="font-sans text-xs tracking-wide text-accent-foreground font-semibold uppercase mt-1">
                {member.designation}
              </p>
            )}
          </div>

          {member.description && (
            <p className="font-serif text-xs sm:text-sm leading-relaxed text-foreground font-semibold">
              {member.description}
            </p>
          )}
        </div>

        {member.email && (
          <div className="pt-2">
            <a
              className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider text-accent border border-accent/20 bg-accent/5 rounded-full px-3.5 py-1 hover:bg-accent/10 transition-colors shadow-sm mx-auto"
              href={`mailto:${member.email}`}
            >
              <Mail className="size-3" />
              {member.email}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
