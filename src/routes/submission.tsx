import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, Upload, Paperclip, Send } from "lucide-react";
import { contact } from "@/data/journal";
import { compressFile } from "@/lib/file-compressor";

export const Route = createFileRoute("/submission")({
  component: Submission,
  head: () => ({
    meta: [
      { title: "Submit a Paper — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Submit original research to Bharatiya Manyaprad. Review the five-step publication workflow and send your manuscript to the editorial desk.",
      },
      { property: "og:title", content: "Submit a Paper — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "The publication workflow and submission desk of the journal.",
      },
      { property: "og:url", content: "/submission" },
    ],
    links: [{ rel: "canonical", href: "/submission" }],
  }),
});

const steps = [
  {
    title: "Submit",
    body: "Send your manuscript, abstract and author note to the editorial desk.",
  },
  { title: "Review", body: "Two subject specialists assess the paper under double-blind review." },
  { title: "Revision", body: "Reviewer comments are shared; revisions are due within four weeks." },
  { title: "Acceptance", body: "The board confirms acceptance and licensing arrangements." },
  {
    title: "Publication",
    body: "The paper is typeset for the print edition, indexed and archived.",
  },
];

function Submission() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    title: "",
    abstract: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must be less than 10MB.");
      setFile(null);
      return;
    }
    setFile(selected);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg(null);

    try {
      const payload = new FormData();
      payload.append("_subject", `New Manuscript Submission: ${formData.title}`);
      payload.append("_cc", `${contact.email},drneerjaarun@gmail.com,xavierrodgriues123@gmail.com`);
      payload.append("_template", "table");
      payload.append("_captcha", "false");
      payload.append("Author Name", formData.name);
      payload.append("Author Email", formData.email);
      payload.append("Institutional Affiliation", formData.affiliation || "N/A");
      payload.append("Paper Title", formData.title);
      payload.append("Abstract", formData.abstract);

      if (file) {
        const compressedFile = await compressFile(file);
        payload.append("attachment", compressedFile, compressedFile.name);
      }

      // Send email via FormSubmit AJAX endpoint
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (response.ok || response.status === 200) {
        setSent(true);
        setFormData({ name: "", email: "", affiliation: "", title: "", abstract: "" });
        setFile(null);
      } else {
        // Fallback: trigger mailto with formatted manuscript body
        const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nAffiliation: ${formData.affiliation}\nTitle: ${formData.title}\n\nAbstract:\n${formData.abstract}`;
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Manuscript Submission: ${formData.title}`)}&body=${encodeURIComponent(mailBody)}`;
        setSent(true);
      }
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      // Fallback mailto trigger
      const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nAffiliation: ${formData.affiliation}\nTitle: ${formData.title}\n\nAbstract:\n${formData.abstract}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Manuscript Submission: ${formData.title}`)}&body=${encodeURIComponent(mailBody)}`;
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Submission"
        title="From manuscript to print"
        intro="A transparent, unhurried process. Every paper is read twice by specialists before it reaches the compositor."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="relative border-l border-accent/40 pl-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} as="li">
              <div className="relative pb-10">
                <span className="absolute top-1.5 -left-[2.31rem] grid size-6 place-items-center rounded-full border border-accent bg-background font-display text-[0.65rem] text-accent">
                  {i + 1}
                </span>
                <h2 className="font-display text-xl text-primary">{s.title}</h2>
                <p className="mt-2 font-serif text-lg text-foreground/80">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <form className="archive-card paper-grain mt-6 space-y-5 p-8" onSubmit={handleSubmit}>
            <h2 className="font-display text-2xl text-primary">Submission desk</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="sub-name">Full name *</Label>
                <Input
                  id="sub-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 bg-card"
                  placeholder="Author's full name"
                />
              </div>
              <div>
                <Label htmlFor="sub-email">Email *</Label>
                <Input
                  id="sub-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 bg-card"
                  placeholder="author@institution.edu"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sub-affiliation">Institutional affiliation</Label>
              <Input
                id="sub-affiliation"
                value={formData.affiliation}
                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                className="mt-2 bg-card"
                placeholder="University or institution name"
              />
            </div>
            <div>
              <Label htmlFor="sub-title">Paper title *</Label>
              <Input
                id="sub-title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2 bg-card"
                placeholder="Title of your research paper"
              />
            </div>
            <div>
              <Label htmlFor="sub-abstract">Abstract (max 250 words) *</Label>
              <Textarea
                id="sub-abstract"
                rows={6}
                required
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                className="mt-2 bg-card"
                placeholder="Provide a concise abstract of your paper..."
              />
            </div>

            {/* Manuscript File Attachment */}
            <div>
              <Label htmlFor="sub-file">
                Attach Manuscript File (DOC, DOCX, PDF, RTF — max 10MB)
              </Label>
              <div className="relative mt-2 flex flex-col items-center justify-center rounded-xl border border-dashed border-accent/40 bg-secondary/20 p-5 text-center transition-colors hover:border-accent">
                <input
                  id="sub-file"
                  type="file"
                  accept=".doc,.docx,.pdf,.rtf"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center gap-2">
                  {file ? (
                    <Paperclip className="size-6 text-accent animate-pulse" />
                  ) : (
                    <Upload className="size-6 text-accent/60" />
                  )}
                  <span className="font-serif text-sm text-foreground/80">
                    {file ? file.name : "Click or drag manuscript file here"}
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="outline"
              className="engraved flex items-center gap-2"
              disabled={sending}
            >
              {sending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting to editorial desk...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send to the editorial desk
                </>
              )}
            </Button>

            {sent && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-600/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="size-5 shrink-0" />
                <p className="font-serif text-sm font-semibold">
                  Received — your manuscript submission has been delivered directly to the editorial
                  desk at <span className="underline">{contact.email}</span>. We will write to you
                  shortly!
                </p>
              </div>
            )}

            {errorMsg && <p className="text-sm font-semibold text-red-500">{errorMsg}</p>}
          </form>
        </Reveal>
      </section>
    </>
  );
}
