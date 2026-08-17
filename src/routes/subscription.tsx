import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CornerFlourish, LotusMark, CarvedBorder, SealSketch } from "@/components/site/ornaments";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { bankDetails, contact, subscriptionRates } from "@/data/journal";
import { Download, CreditCard, Landmark, Check, ChevronDown, Upload, Paperclip, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
      <span className="font-serif text-sm font-semibold text-primary">{label}</span>
      
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
    payment: "Cheque",
    bank: "",
    amount: "",
    date: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      setFileError(null);
      return;
    }
    // Check size: 5MB
    if (selected.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB.");
      setFile(null);
      return;
    }
    // Check type: image or pdf
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];
    if (!validTypes.includes(selected.type)) {
      setFileError("Invalid file type. Only images or PDFs are accepted.");
      setFile(null);
      return;
    }
    setFile(selected);
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileError("Payment receipt file is required.");
      return;
    }

    setUploading(true);
    setFileError(null);
    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `receipt-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("subscriptions")
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public url
      const { data: { publicUrl } } = supabase.storage
        .from("subscriptions")
        .getPublicUrl(fileName);

      // 2. Save subscription details
      const { error: dbError } = await supabase
        .from("subscriptions")
        .insert({
          name: formData.name,
          email: formData.email,
          address: formData.address,
          country: formData.country,
          mobile: formData.mobile,
          type: formData.type,
          period: formData.period,
          payment: formData.payment,
          bank: formData.bank || null,
          amount: formData.amount || null,
          date: formData.date || null,
          receipt_url: publicUrl,
          receipt_name: fileName,
          status: "Pending"
        });

      if (dbError) {
        throw dbError;
      }

      // 3. Send notification email to bhartiyamanyaprad@gmail.com and xavierrodgriues123@gmail.com
      try {
        const formPayload = new URLSearchParams();
        formPayload.append("_subject", `New Subscription Registry: ${formData.name}`);
        formPayload.append("_cc", "xavierrodgriues123@gmail.com");
        formPayload.append("_template", "table");
        formPayload.append("_captcha", "false");
        formPayload.append("Subscriber Name", formData.name);
        formPayload.append("Subscriber Email", formData.email);
        formPayload.append("Mobile Number", formData.mobile);
        formPayload.append("Country", formData.country);
        formPayload.append("Postal Address", formData.address);
        formPayload.append("Subscription Type", formData.type);
        formPayload.append("Duration Period", formData.period);
        formPayload.append("Payment Method", formData.payment);
        formPayload.append("Bank / UPI App", formData.bank || "N/A");
        formPayload.append("Amount Transferred", formData.amount || "N/A");
        formPayload.append("Payment Date", formData.date || "N/A");
        formPayload.append("Receipt File Link", publicUrl);

        // Send to main email
        const req1 = fetch("https://formsubmit.co/ajax/bhartiyamanyaprad@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: formPayload.toString(),
        });

        // Send direct copy to secondary email
        const formPayload2 = new URLSearchParams(formPayload);
        formPayload2.set("_subject", `[Admin Alert] New Subscription: ${formData.name}`);
        formPayload2.delete("_cc");

        const req2 = fetch("https://formsubmit.co/ajax/xavierrodgriues123@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: formPayload2.toString(),
        });

        await Promise.allSettled([req1, req2]);
      } catch (emailErr) {
        console.error("Failed to send subscription notification email:", emailErr);
      }

      setSent(true);
      setFile(null);
      setFormData({
        name: "",
        email: "",
        address: "",
        country: "",
        mobile: "+91",
        type: "Individual",
        period: "Annual",
        payment: "Cheque",
        bank: "",
        amount: "",
        date: ""
      });
    } catch (err: any) {
      setFileError(err.message || "Failed to submit subscription.");
    } finally {
      setUploading(false);
    }
  };

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
            onSubmit={handleSubmit}
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
                  <Label htmlFor="s-name" className="font-serif text-sm font-semibold text-primary">Name of Subscriber</Label>
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
                  <Label htmlFor="s-email" className="font-serif text-sm font-semibold text-primary">Email Address</Label>
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
                <Label htmlFor="s-address" className="font-serif text-sm font-semibold text-primary">Full Postal Address (for dispatch)</Label>
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
                  <Label htmlFor="s-country" className="font-serif text-sm font-semibold text-primary">Country</Label>
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
                  <Label htmlFor="s-mobile" className="font-serif text-sm font-semibold text-primary">Mobile Contact Number</Label>
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
                  options={["Annual", "Three Years"]}
                  onChange={(val) => setFormData({ ...formData, period: val })}
                />
                <CustomSelect
                  label="Payment Method"
                  value={formData.payment}
                  options={["Cheque", "Draft", "NEFT", "UPI"]}
                  onChange={(val) => setFormData({ ...formData, payment: val })}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                  <Label htmlFor="s-bank" className="font-serif text-sm font-semibold text-primary">Bank Name / UPI App</Label>
                  <input
                    id="s-bank"
                    type="text"
                    value={formData.bank}
                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                    placeholder="e.g. State Bank of India or GPay"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="s-amount" className="font-serif text-sm font-semibold text-primary">Amount Transferred</Label>
                  <input
                    id="s-amount"
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g. 600, 1200, 900, 1800"
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary placeholder:text-muted-foreground/35 focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="s-date" className="font-serif text-sm font-semibold text-primary">Payment Date</Label>
                  <input
                    id="s-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 border-0 border-b border-accent/25 bg-transparent rounded-none px-1 py-2 font-serif text-base text-primary focus:border-accent focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              {/* Receipt File Upload Field */}
              <div className="flex flex-col gap-2">
                <Label className="font-serif text-sm font-semibold text-primary">
                  Attach Payment Receipt <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                    file
                      ? "border-accent/60 bg-accent/5"
                      : fileError
                        ? "border-red-500/40 bg-red-500/5"
                        : "border-accent/25 bg-secondary/10 hover:border-accent/40"
                  }`}
                >
                  <input
                    id="receipt-file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    disabled={uploading}
                  />
                  <div className="flex flex-col items-center gap-2">
                    {uploading ? (
                      <Loader2 className="size-8 animate-spin text-accent" />
                    ) : file ? (
                      <Paperclip className="size-8 text-accent animate-pulse" />
                    ) : (
                      <Upload className="size-8 text-accent/60" />
                    )}
                    
                    <div className="font-serif text-sm">
                      {file ? (
                        <span className="font-semibold text-primary">{file.name}</span>
                      ) : (
                        <span className="text-foreground/85">
                          Click or drag receipt file here
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Accepts images (PNG, JPEG, WebP, GIF) or PDFs up to 5MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Button 
                  type="submit" 
                  variant="outline" 
                  className="engraved w-full sm:w-auto px-10 py-5"
                  disabled={uploading}
                >
                  {uploading ? "Submitting..." : "Submit Subscription Registry"}
                </Button>
                
                <div aria-live="polite" className="min-h-6 mt-4 flex flex-col items-center justify-center">
                  {sent ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-serif font-semibold text-accent tracking-wide animate-fade-in">
                      <Check className="size-4" /> Thank you — the editorial office will confirm your subscription receipt.
                    </span>
                  ) : fileError ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-serif font-semibold text-red-500 tracking-wide animate-fade-in">
                      <AlertCircle className="size-4 shrink-0" /> {fileError}
                    </span>
                  ) : null}
                </div>
              </div>

            </div>
          </form>
        </Reveal>

        {/* LEDGER & RATES RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* SUBSCRIPTION RATES TABLE CARD (ANNUAL & THREE YEARS) */}
          <Reveal delay={100}>
            <div 
              className="relative rounded-3xl p-6 sm:p-7 border border-accent/20 shadow-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, var(--card), var(--background))",
              }}
            >
              <div className="absolute inset-1.5 rounded-2xl border border-accent/10 pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-accent" />
                  <h2 className="font-display text-lg text-primary tracking-wide">Subscription Rates</h2>
                </div>

                <CarvedBorder className="opacity-45 my-2" />

                {/* India Rates Table */}
                <div>
                  <h3 className="font-serif text-sm font-bold text-accent mb-2">India (₹)</h3>
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="text-left border-b border-accent/15">
                        <th className="py-2 text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">Period</th>
                        <th className="py-2 text-center text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">Individual / Members</th>
                        <th className="py-2 text-right text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">Institution</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-xs sm:text-sm">
                      <tr className="border-b border-accent/10">
                        <td className="py-2.5 font-semibold text-primary">Annual</td>
                        <td className="py-2.5 text-center font-semibold text-primary font-sans">{subscriptionRates.india.annual.individual}</td>
                        <td className="py-2.5 text-right font-semibold text-primary font-sans">{subscriptionRates.india.annual.institution}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-semibold text-primary">Three Years</td>
                        <td className="py-2.5 text-center font-semibold text-primary font-sans">{subscriptionRates.india.threeYears.individual}</td>
                        <td className="py-2.5 text-right font-semibold text-primary font-sans">{subscriptionRates.india.threeYears.institution}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Overseas Rates Table */}
                <div>
                  <h3 className="font-serif text-sm font-bold text-accent mb-2">Overseas ($)</h3>
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="text-left border-b border-accent/15">
                        <th className="py-2 text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">Period</th>
                        <th className="py-2 text-center text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">Individual / Members</th>
                        <th className="py-2 text-right text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">Institution</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-xs sm:text-sm">
                      <tr className="border-b border-accent/10">
                        <td className="py-2.5 font-semibold text-primary">Annual</td>
                        <td className="py-2.5 text-center font-semibold text-primary font-sans">{subscriptionRates.overseas.annual.individual}</td>
                        <td className="py-2.5 text-right font-semibold text-primary font-sans">{subscriptionRates.overseas.annual.institution}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-semibold text-primary">Three Years</td>
                        <td className="py-2.5 text-center font-semibold text-primary font-sans">{subscriptionRates.overseas.threeYears.individual}</td>
                        <td className="py-2.5 text-right font-semibold text-primary font-sans">{subscriptionRates.overseas.threeYears.institution}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <CarvedBorder className="opacity-45 my-2 rotate-180" />

                <p className="font-serif text-xs sm:text-sm leading-relaxed text-foreground/85">
                  Deposit the subscription fee directly into the <span className="font-bold text-primary">BHARATIYA MANYAPRAD</span> account via bank transfer, DD, or UPI.
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

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <Landmark className="size-5 text-accent" />
                  <h2 className="font-display text-lg text-primary tracking-wide">Direct Bank Deposit</h2>
                </div>

                <CarvedBorder className="opacity-45 my-2" />

                <dl className="space-y-2.5 text-sm font-sans">
                  {bankDetails.map((b) => (
                    <div key={b.label} className="flex justify-between items-baseline gap-4 border-b border-accent/10 pb-1.5">
                      <dt className="text-[0.75rem] font-sans tracking-wider uppercase text-accent font-semibold">{b.label}</dt>
                      <dd className="text-right text-xs sm:text-sm font-semibold text-primary font-sans">{b.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* UPI Highlight Box */}
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-center">
                  <p className="font-sans text-[0.7rem] uppercase tracking-widest text-accent font-bold">UPI Payment Number</p>
                  <p className="mt-1 font-sans text-lg font-extrabold text-primary tracking-wider">
                    9825012985
                  </p>
                  <p className="mt-1 text-[0.75rem] text-muted-foreground">
                    Payments may also be made via UPI to this number
                  </p>
                </div>

                {/* Intimate confirmation note */}
                <div className="rounded-xl border border-accent/15 bg-secondary/30 p-3.5 text-xs font-serif leading-relaxed text-foreground/90">
                  <p className="font-semibold text-accent mb-1">Confirmation Details Note:</p>
                  You are requested to kindly intimate the subscription confirmation details at <span className="font-bold text-primary">+91-7906515851</span> or <a href="mailto:bhartiyamanyaprad@gmail.com" className="font-bold text-accent underline">bhartiyamanyaprad@gmail.com</a>.
                </div>

                <Button variant="outline" size="sm" className="engraved mt-4 w-full flex items-center justify-center gap-2" asChild>
                  <a href="/Subscription Form.pdf" download="Subscription Form.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="size-4 mr-1.5" /> Subscription Form
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
          
        </div>
      </section>
    </>
  );
}
