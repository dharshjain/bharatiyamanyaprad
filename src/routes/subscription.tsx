import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CornerFlourish, LotusMark, CarvedBorder, SealSketch } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { bankDetails, contact, subscriptionRates } from "@/data/journal";
import { Download, CreditCard, Landmark, Check, ChevronDown } from "lucide-react";

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

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function CustomSelect({ label, value, options, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col relative">
      <span className="font-serif text-sm font-semibold text-accent-foreground">{label}</span>
      
      {/* Trigger Button (looks like the underlined guideline) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 flex items-center justify-between border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary text-left focus:border-accent transition-colors focus:outline-none"
      >
        <span>{value}</span>
        <ChevronDown className={`size-3.5 text-accent/60 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`} />
      </button>

      {/* Overlay Backdrop to close when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* The Dynamic Historic Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 mt-1 rounded-xl border border-accent/25 p-1.5 shadow-[0_12px_30px_rgba(184,134,11,0.12)] backdrop-blur-md transition-all duration-300 origin-top z-50 ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(180deg, var(--card), var(--background))",
        }}
      >
        {/* Inner double border for historic manuscript look */}
        <div className="absolute inset-1.5 rounded-[8px] border border-accent/15 pointer-events-none" />
        
        {/* Corner flourishes inside the dropdown */}
        <div className="absolute top-2 left-2 size-2 border-t border-l border-accent/35 rounded-tl-sm" />
        <div className="absolute top-2 right-2 size-2 border-t border-r border-accent/35 rounded-tr-sm" />
        <div className="absolute bottom-2 left-2 size-2 border-b border-l border-accent/35 rounded-bl-sm" />
        <div className="absolute bottom-2 right-2 size-2 border-b border-r border-accent/35 rounded-br-sm" />

        <ul className="relative z-10 space-y-0.5 max-h-48 overflow-y-auto py-0.5">
          {options.map((opt, idx) => (
            <li 
              key={opt}
              className={`transition-all duration-200 ${
                isOpen 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-2"
              }`}
              style={{
                transitionDelay: isOpen ? `${idx * 30}ms` : "0ms",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className="group/item flex items-center justify-between w-full rounded-md px-2.5 py-1.5 font-serif text-[0.82rem] text-foreground/85 hover:bg-secondary/40 hover:text-primary transition-all duration-150"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-accent text-[0.55rem] transition-all duration-200 ${
                    value === opt ? "opacity-100 scale-100" : "opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                  }`}>
                    ✦
                  </span>
                  <span>{opt}</span>
                </div>
                {value === opt && (
                  <Check className="size-3 text-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Subscription() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    mobile: "+91",
    type: "Individual",
    period: "Annual",
    payment: "Bank DD",
    bank: "",
    amount: "",
    date: ""
  });

  return (
    <>
      <PageHero
        eyebrow={`ISSN ${contact.issn}`}
        title="Subscription Registry"
        intro="Kindly enter your credentials below to register your subscription. The print issues of Bharatiya Manyaprad shall be dispatched to the registered address."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        
        {/* PARCHMENT MANUSCRIPT FORM */}
        <Reveal>
          <form
            className="relative rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--card), var(--background))",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {/* Double thin border for historic charter look */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] border border-accent/15 pointer-events-none" />
            
            {/* Corner flourishes inside padding */}
            <CornerFlourish className="pointer-events-none absolute top-4 left-4 size-4.5 text-accent/50" />
            <CornerFlourish className="pointer-events-none absolute top-4 right-4 size-4.5 rotate-90 text-accent/50" />
            <CornerFlourish className="pointer-events-none absolute bottom-4 left-4 size-4.5 -rotate-90 text-accent/50" />
            <CornerFlourish className="pointer-events-none absolute bottom-4 right-4 size-4.5 rotate-180 text-accent/50" />

            <div className="relative z-10 space-y-8">
              
              {/* Form Title & Ornate Separator */}
              <div className="text-center">
                <h2 className="font-display text-2xl text-primary tracking-wide">Subscriber Details</h2>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <span className="h-[1px] w-12 bg-accent/25" />
                  <LotusMark className="size-4.5 text-accent/60" />
                  <span className="h-[1px] w-12 bg-accent/25" />
                </div>
              </div>

              {/* Form Rows (Underlined Guidelines) */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="s-name" className="font-serif text-sm font-semibold text-accent-foreground">Name of Subscriber</Label>
                  <input
                    id="s-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="s-email" className="font-serif text-sm font-semibold text-accent-foreground">Email Address</Label>
                  <input
                    id="s-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. scholar@institution.edu"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="s-address" className="font-serif text-sm font-semibold text-accent-foreground">Full Postal Address (for dispatch)</Label>
                <textarea
                  id="s-address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, City, State, ZIP code"
                  className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Label htmlFor="s-country" className="font-serif text-sm font-semibold text-accent-foreground">Country</Label>
                  <input
                    id="s-country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. India, United Kingdom"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="s-mobile" className="font-serif text-sm font-semibold text-accent-foreground">Mobile Contact Number</Label>
                  <input
                    id="s-mobile"
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="Contact number with country code"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Using CustomSelect drop down components */}
              <div className="grid gap-6 sm:grid-cols-3">
                <CustomSelect
                  label="Subscription Type"
                  value={formData.type}
                  options={["Individual", "Institution"]}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                />
                <CustomSelect
                  label="Duration Period"
                  value={formData.period}
                  options={["Annual", "Two years", "Three years"]}
                  onChange={(val) => setFormData({ ...formData, period: val })}
                />
                <CustomSelect
                  label="Payment Method"
                  value={formData.payment}
                  options={["Bank DD", "Multicity cheque", "Direct bank deposit"]}
                  onChange={(val) => setFormData({ ...formData, payment: val })}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                  <Label htmlFor="s-bank" className="font-serif text-sm font-semibold text-accent-foreground">Bank Name</Label>
                  <input
                    id="s-bank"
                    type="text"
                    value={formData.bank}
                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                    placeholder="e.g. State Bank of India"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="s-amount" className="font-serif text-sm font-semibold text-accent-foreground">Amount Transferred</Label>
                  <input
                    id="s-amount"
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g. 600 or 900"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="s-date" className="font-serif text-sm font-semibold text-accent-foreground">Payment Date</Label>
                  <input
                    id="s-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 text-center">
                <Button type="submit" variant="outline" className="engraved w-full sm:w-auto px-10 py-5">
                  Submit Subscription Registry
                </Button>
                
                <div aria-live="polite" className="h-6 mt-4 flex items-center justify-center">
                  {sent && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-serif font-semibold text-accent tracking-wide animate-fade-in">
                      <Check className="size-4" /> Thank you — the editorial office will confirm your subscription receipt.
                    </span>
                  )}
                </div>
              </div>

            </div>
          </form>
        </Reveal>

        {/* LEDGER & RATES RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* ANNUAL RATES TABLE CARD */}
          <Reveal delay={100}>
            <div 
              className="relative rounded-3xl p-6 sm:p-7 border border-accent/20 shadow-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--card), var(--background))",
              }}
            >
              <div className="absolute inset-1.5 rounded-2xl border border-accent/10 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-accent" />
                  <h2 className="font-display text-lg text-primary tracking-wide">Annual Rates</h2>
                </div>

                <CarvedBorder className="opacity-45 my-3" />

                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground">
                      <th className="py-2.5">Region</th>
                      <th className="py-2.5">Individual</th>
                      <th className="py-2.5">Institution</th>
                    </tr>
                  </thead>
                  <tbody className="font-serif text-base">
                    {[subscriptionRates.india, subscriptionRates.overseas].map((r) => (
                      <tr key={r.label} className="border-t border-accent/15">
                        <td className="py-3 font-semibold text-primary">{r.label}</td>
                        <td className="py-3 text-foreground/90">{r.individual}</td>
                        <td className="py-3 text-foreground/90">{r.institution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <CarvedBorder className="opacity-45 my-3 rotate-180" />

                <p className="mt-4 font-serif text-xs leading-relaxed text-muted-foreground/95">
                  Please send the subscription remittance through a bank demand draft (DD) or multicity cheque drawn in favor of Editor, <span className="italic text-primary font-bold">"Bharatiya Manyaprad"</span>, payable at Ahmedabad.
                </p>
              </div>
            </div>
          </Reveal>

          {/* DIRECT BANK DEPOSIT CERTIFICATE */}
          <Reveal delay={160}>
            <div 
              className="relative rounded-3xl p-6 sm:p-7 border border-accent/20 shadow-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--card), var(--background))",
              }}
            >
              <div className="absolute inset-1.5 rounded-2xl border border-accent/10 pointer-events-none" />
              
              {/* Subtle watermark background */}
              <SealSketch className="absolute -right-6 -bottom-6 size-36 text-accent/5 opacity-[0.07] pointer-events-none select-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <Landmark className="size-5 text-accent" />
                  <h2 className="font-display text-lg text-primary tracking-wide">Direct Bank Deposit</h2>
                </div>

                <CarvedBorder className="opacity-45 my-3" />

                <dl className="space-y-3 mt-4 text-sm font-serif">
                  {bankDetails.map((b) => (
                    <div key={b.label} className="flex justify-between items-baseline gap-4 border-b border-accent/10 pb-1.5">
                      <dt className="text-[0.68rem] font-sans tracking-wider uppercase text-accent font-semibold">{b.label}</dt>
                      <dd className="text-right text-[0.92rem] font-medium text-primary font-serif">{b.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 font-serif text-xs leading-relaxed text-muted-foreground/90">
                  You may also download the offline subscription enrollment paper, complete the fields, and dispatch it to our central postal registry.
                </p>

                <Button variant="outline" size="sm" className="engraved mt-5 w-full flex items-center justify-center gap-2">
                  <Download className="size-3.5" /> Download Enrollment Form
                </Button>
              </div>
            </div>
          </Reveal>
          
        </div>
      </section>
    </>
  );
}
