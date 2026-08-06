import { createFileRoute } from "@tanstack/react-router";
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
  const [sent, setSent] = useState(false);
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
              <p className="text-sm text-muted-foreground">Mobile: {contact.mobile}</p>
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
          <form
            className="archive-card h-full space-y-5 p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="font-display text-xl text-primary">Send an enquiry</h2>
            <div>
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" required className="mt-2 bg-card" />
            </div>
            <div>
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" required className="mt-2 bg-card" />
            </div>
            <div>
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" rows={6} required className="mt-2 bg-card" />
            </div>
            <Button type="submit" variant="outline" className="engraved">
              Send message
            </Button>
            <p aria-live="polite" className="h-5 text-sm text-terracotta">
              {sent ? "Thank you — we will reply to your message shortly." : ""}
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
