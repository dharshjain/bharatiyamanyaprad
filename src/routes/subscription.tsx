import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CornerFlourish } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bankDetails, contact, subscriptionRates } from "@/data/journal";

export const Route = createFileRoute("/subscription")({
  component: Subscription,
  head: () => ({
    meta: [
      { title: "Subscription — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Subscribe to Bharatiya Manyaprad (ISSN 2321-8444). Annual rates for India and overseas, bank details and the subscription order form.",
      },
      { property: "og:title", content: "Subscription — Bharatiya Manyaprad" },
      {
        property: "og:description",
        content: "Subscription order form, annual rates and bank details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/subscription" },
    ],
    links: [{ rel: "canonical", href: "/subscription" }],
  }),
});

function Subscription() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow={`ISSN ${contact.issn}`}
        title="Subscription order form"
        intro="Kindly acknowledge the receipt of my subscription and send the issue(s) of Bharatiya Manyaprad at the given address."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Reveal>
          <form
            className="archive-card paper-grain space-y-5 p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="font-display text-xl text-primary">Subscriber details</h2>
            <span className="gold-rule block w-16" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-name">Name</Label>
                <Input id="s-name" required className="mt-2 bg-card" />
              </div>
              <div>
                <Label htmlFor="s-email">Email</Label>
                <Input id="s-email" type="email" required className="mt-2 bg-card" />
              </div>
            </div>
            <div>
              <Label htmlFor="s-address">Address</Label>
              <Textarea id="s-address" rows={3} required className="mt-2 bg-card" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-country">Country</Label>
                <Input id="s-country" required className="mt-2 bg-card" />
              </div>
              <div>
                <Label htmlFor="s-mobile">Mobile number</Label>
                <Input id="s-mobile" defaultValue="+91" required className="mt-2 bg-card" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <Label htmlFor="s-type">Type of subscription</Label>
                <select
                  id="s-type"
                  className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
                >
                  <option>Individual</option>
                  <option>Institution</option>
                </select>
              </div>
              <div>
                <Label htmlFor="s-period">Period</Label>
                <select
                  id="s-period"
                  className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
                >
                  <option>Annual</option>
                  <option>Two years</option>
                  <option>Three years</option>
                </select>
              </div>
              <div>
                <Label htmlFor="s-payment">Type of payment</Label>
                <select
                  id="s-payment"
                  className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
                >
                  <option>Bank DD</option>
                  <option>Multicity cheque</option>
                  <option>Direct bank deposit</option>
                </select>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <Label htmlFor="s-bank">Bank name</Label>
                <Input id="s-bank" className="mt-2 bg-card" />
              </div>
              <div>
                <Label htmlFor="s-amount">Amount</Label>
                <Input id="s-amount" className="mt-2 bg-card" />
              </div>
              <div>
                <Label htmlFor="s-date">Date</Label>
                <Input id="s-date" type="date" className="mt-2 bg-card" />
              </div>
            </div>
            <Button type="submit" variant="outline" className="engraved">
              Submit subscription
            </Button>
            <p aria-live="polite" className="h-5 text-sm text-terracotta">
              {sent ? "Thank you — the editorial office will confirm your subscription." : ""}
            </p>
          </form>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={100}>
            <div className="museum-frame paper-grain relative p-7">
              <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-4 text-accent/60" />
              <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-4 rotate-180 text-accent/60" />
              <h2 className="font-display text-lg text-primary">Annual rates</h2>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    <th className="py-2">Region</th>
                    <th className="py-2">Individual</th>
                    <th className="py-2">Institution</th>
                  </tr>
                </thead>
                <tbody className="font-serif text-base">
                  {[subscriptionRates.india, subscriptionRates.overseas].map((r) => (
                    <tr key={r.label} className="border-t border-accent/25">
                      <td className="py-2 text-primary">{r.label}</td>
                      <td className="py-2">{r.individual}</td>
                      <td className="py-2">{r.institution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-muted-foreground">
                Send the subscription through bank DD or multicity cheque drawn in favour of Editor
                &ldquo;Bharatiya Manyaprad&rdquo;, payable at Ahmedabad.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="archive-card p-7">
              <h2 className="font-display text-lg text-primary">Direct bank deposit</h2>
              <dl className="mt-4 space-y-2 text-sm">
                {bankDetails.map((b) => (
                  <div key={b.label} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{b.label}</dt>
                    <dd className="text-right text-foreground">{b.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm text-muted-foreground">
                You may also download the subscription form, fill in the details and send it to our
                postal address.
              </p>
              <Button variant="outline" size="sm" className="engraved mt-4">
                Download subscription form
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
