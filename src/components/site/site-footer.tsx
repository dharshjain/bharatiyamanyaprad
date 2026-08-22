import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { CarvedBorder } from "@/components/site/ornaments";
import { contact } from "@/data/journal";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <CarvedBorder className="rotate-180 bg-primary" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <img
            src={logo}
            alt="Bharatiya Manyaprad emblem"
            width={72}
            height={72}
            loading="lazy"
            className="size-16 rounded-full bg-parchment/90 p-1 ring-1 ring-accent/50 object-cover"
          />
          <p className="mt-4 font-serif text-lg leading-snug">
            An international journal of Indian studies, published in print since 2013 under the
            aegis of Bhartiya Vidya Bhavan and Gujarat University, Ahmedabad.
          </p>
          <p className="mt-3 text-sm text-primary-foreground/70">ISSN {contact.issn}</p>

          {/* Social Links */}
          <div className="mt-4 flex items-center gap-3">
            <a
              href={contact.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/90 transition-all hover:bg-terracotta hover:text-white hover:scale-110"
              aria-label="Facebook Page"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/90 transition-all hover:bg-terracotta hover:text-white hover:scale-110"
              aria-label="Instagram Profile"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Journal">
          <h2 className="eyebrow text-terracotta font-extrabold">Journal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: "About", to: "/about" },
              { label: "Editorial Board", to: "/editorial-board" },
              { label: "Publication", to: "/publication" },
              { label: "Subscription", to: "/subscription" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/85 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Authors">
          <h2 className="eyebrow text-terracotta font-extrabold">Authors</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: "Author's Instructions", to: "/instructions-to-authors" },
              { label: "Responsibilities", to: "/publication-ethics" },
              { label: "Call for Papers", to: "/call-for-papers" },
              { label: "Submit Review Paper", to: "/submission" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/85 hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-terracotta font-extrabold">Indexing &amp; Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
            <li>Index Copernicus International</li>
            <li>International E-library (libgenesis.org)</li>
            <li>Indian Council of Historical Research — supported</li>
          </ul>
          <address className="mt-4 space-y-1 text-sm not-italic text-primary-foreground/85">
            <div>
              Email:{" "}
              <a className="hover:text-accent" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
            <div>Mobile / WhatsApp: {contact.mobile}</div>
            <div>Navarangpura, Ahmedabad (Guj) 380009</div>
          </address>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/65 sm:px-6">
        © {new Date().getFullYear()} Bharatiya Manyaprad · International Journal of Indian Studies ·
        All rights reserved
      </div>
    </footer>
  );
}
