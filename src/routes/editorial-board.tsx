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
          "The editorial desk of Bharatiya Manyaprad, led by Dr Neerja A Gupta, Editor in Chief and Publisher.",
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

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 space-y-12">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-16">
            {(["editor_in_chief", "executive_editor", "advisory"] as const).map((role, sectionIdx) =>
              grouped[role].length > 0 ? (
                <Reveal key={role} delay={sectionIdx * 100}>
                  <div 
                    className="relative rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-xl overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, var(--card), var(--background))",
                    }}
                  >
                    {/* Double thin border for historic charter look */}
                    <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] border border-accent/15 pointer-events-none" />
                    
                    {/* Corner flourishes inside padding */}
                    <CornerFlourish className="pointer-events-none absolute top-4 left-4 size-4.5 text-accent/40" />
                    <CornerFlourish className="pointer-events-none absolute top-4 right-4 size-4.5 rotate-90 text-accent/40" />
                    <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 size-4.5 -rotate-90 text-accent/40" />
                    <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 size-4.5 rotate-180 text-accent/40" />

                    <div className="relative z-10 space-y-8">
                      {/* Section Title & Separator */}
                      <div className="text-center">
                        <span className="font-display text-xs tracking-[0.2em] text-accent uppercase font-bold">Editorial Desk</span>
                        <h2 className="font-display text-xl sm:text-2xl text-primary tracking-wide mt-1">{ROLE_LABEL[role]}</h2>
                        <div className="flex items-center justify-center gap-3.5 mt-2">
                          <span className="h-[0.5px] w-12 bg-accent/20" />
                          <LotusMark className="size-4 text-accent/60" />
                          <span className="h-[0.5px] w-12 bg-accent/20" />
                        </div>
                      </div>

                      {/* Members Grid (Adapts columns based on role importance) */}
                      <div className={`grid gap-8 ${role === "advisory" ? "md:grid-cols-2" : "grid-cols-1"}`}>
                        {grouped[role].map((m) => (
                          <article 
                            key={m.id} 
                            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 p-4 rounded-2xl hover:bg-secondary/20 transition-all duration-300 border border-transparent hover:border-accent/10"
                          >
                            {/* Member Initial Stamp Badge */}
                            <div className="relative grid size-16 shrink-0 place-items-center rounded-full border border-accent/35 bg-accent/5 text-accent font-display text-lg tracking-wider font-semibold shadow-[0_0_15px_rgba(184,134,11,0.08)] ring-4 ring-background select-none">
                              <div className="absolute inset-1 rounded-full border border-accent/10 pointer-events-none" />
                              <span>{getInitials(m.name)}</span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="font-display text-lg text-primary tracking-wide">{m.name}</h3>
                              
                              {m.description && (
                                <p className="mt-1.5 font-serif text-sm leading-relaxed text-foreground/80 italic">
                                  {m.description}
                                </p>
                              )}
                              
                              {m.email && (
                                <p className="mt-3">
                                  <a
                                    className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wide text-accent border border-accent/20 bg-accent/5 rounded-full px-3.5 py-1 hover:bg-accent/10 transition-colors"
                                    href={`mailto:${m.email}`}
                                  >
                                    <Mail className="size-3" />
                                    {m.email}
                                  </a>
                                </p>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ) : null,
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
                <h3 className="font-display text-sm tracking-widest text-accent uppercase font-bold text-center sm:text-left">Peer Review Statement</h3>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-muted-foreground/90 text-center sm:text-left">
                  Every research article is published after a strict peer-review evaluation by subject specialists drawn from the journal's reviewer panel across Indian and overseas universities. The complete board list is printed in the front matter of each volume; correspondence for the board may be addressed to the central editorial office.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* READ MORE DOCUMENTS ACTION BUTTON */}
        {doc?.file_url && (
          <Reveal delay={200}>
            <div className="text-center pt-4">
              <Button variant="outline" className="engraved px-8 py-5 rounded-xl border-accent/30" asChild>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
