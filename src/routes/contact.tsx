import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/data/journal";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Write to the editorial office of Bharatiya Manyaprad in Navarangpura, Ahmedabad — enquiries, subscriptions and submissions.",
      },
      { property: "og:title", content: "Contact — Bharatiya Manyaprad" },
      { property: "og:description", content: "Editorial office details and enquiry form." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = [
      "*New Enquiry — Bharatiya Manyaprad*",
      "",
      `*Name:* ${name.trim()}`,
      `*Email:* ${email.trim()}`,
      `*Message:* ${message.trim()}`,
    ].join("\n");

    const whatsappPhone = "917906515851";
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(formattedMessage)}`;

    window.open(whatsappUrl, "_blank");
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="The editorial office"
        intro="Correspondence on submissions, subscriptions and institutional exchange is welcome."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="archive-card paper-grain h-full p-8">
            <h2 className="font-display text-xl text-primary">{contact.editor}</h2>
            <p className="mt-1 font-serif text-lg text-foreground/80">{contact.designation}</p>
            <address className="mt-6 space-y-3 text-base not-italic text-foreground/85">
              <p className="font-serif leading-relaxed">{contact.address}</p>
              <p className="text-sm text-muted-foreground">Telefax: {contact.telefax}</p>
              <p className="text-sm text-muted-foreground">Phone: {contact.phone}</p>
              <p className="text-sm text-muted-foreground">Mobile / WhatsApp: {contact.mobile}</p>
              <p className="text-sm">
                <a className="text-terracotta hover:underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </p>
              <p className="text-sm text-muted-foreground">{contact.website}</p>
              <p className="text-sm text-muted-foreground">ISSN {contact.issn}</p>
            </address>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form className="archive-card h-full space-y-5 p-8" onSubmit={handleSubmit}>
            <h2 className="font-display text-xl text-primary">Send an enquiry</h2>
            <div>
              <Label htmlFor="c-name">Name</Label>
              <Input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 bg-card"
              />
            </div>
            <div>
              <Label htmlFor="c-email">Email</Label>
              <Input
                id="c-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 bg-card"
              />
            </div>
            <div>
              <Label htmlFor="c-message">Message</Label>
              <Textarea
                id="c-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-2 bg-card"
              />
            </div>
            <Button type="submit" variant="outline" className="engraved flex items-center gap-2">
              <MessageSquare className="size-4 text-emerald-600 dark:text-emerald-400" />
              Send message via WhatsApp
            </Button>
            <p aria-live="polite" className="h-5 text-sm text-terracotta">
              {sent ? "Opening WhatsApp with your message..." : ""}
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
