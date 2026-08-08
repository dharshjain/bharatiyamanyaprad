import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpeg";
import { LotusMark } from "@/components/site/ornaments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Author's", to: "/instructions-to-authors" },
  { label: "Publication", to: "/publication" },
  { label: "Subscription", to: "/subscription" },
  { label: "Responsibilities", to: "/publication-ethics" },
  { label: "Call for Papers", to: "/call-for-papers" },
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Contact", to: "/contact" },
];

const dropdownItems = [
  { label: "Author's Responsibility", to: "/publication-ethics#author" },
  { label: "Editor's Responsibility", to: "/publication-ethics#editor" },
  { label: "Reviewer's Responsibility", to: "/publication-ethics#reviewer" },
  { label: "Bharatiya Manyaprad Responsibility", to: "/publication-ethics#publisher" },
  { label: "Ethics Policy", to: "/publication-ethics#misconduct" },
  { label: "If Ethical Misconduct is detected", to: "/publication-ethics#misconduct" },
  { label: "Further Reading", to: "/publication-ethics#reading" },
];


export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bm-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("bm-theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-accent/30 bg-background/95 backdrop-blur-md shadow-[0_10px_30px_-24px_rgba(75,54,33,0.6)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Bharatiya Manyaprad home">
          <img
            src={logo}
            alt="Bharatiya Manyaprad emblem"
            width={48}
            height={48}
            className="size-10 shrink-0 rounded-full ring-1 ring-accent/40 lg:size-12 object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-semibold tracking-wide text-primary lg:text-lg">
              Bharatiya Manyaprad
            </span>
            <span className="block truncate text-[0.62rem] tracking-[0.22em] uppercase text-muted-foreground">
              International Journal of Indian Studies
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {nav.map((item) => {
              if (item.label === "Responsibilities") {
                return (
                  <div
                    key={item.to}
                    className="relative py-2"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      to={item.to}
                      activeProps={{ className: "text-accent-foreground bg-secondary" }}
                      className="inline-flex items-center gap-1 rounded-md px-2.5 py-2 font-sans text-[0.8rem] font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {item.label}
                      <ChevronDown className={`size-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-accent" : ""}`} />
                    </Link>
                    
                    {/* The Unique Historic Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 rounded-xl border border-accent/25 p-2 shadow-[0_15px_35px_rgba(184,134,11,0.14)] backdrop-blur-md transition-all duration-300 origin-top z-50 ${
                        dropdownOpen 
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
                      <div className="absolute top-2 left-2 size-2.5 border-t border-l border-accent/35 rounded-tl-sm" />
                      <div className="absolute top-2 right-2 size-2.5 border-t border-r border-accent/35 rounded-tr-sm" />
                      <div className="absolute bottom-2 left-2 size-2.5 border-b border-l border-accent/35 rounded-bl-sm" />
                      <div className="absolute bottom-2 right-2 size-2.5 border-b border-r border-accent/35 rounded-br-sm" />

                      <ul className="relative z-10 space-y-0.5 py-1">
                        {dropdownItems.map((sub, idx) => (
                          <li 
                            key={sub.to}
                            className={`transition-all duration-300 ${
                              dropdownOpen 
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 -translate-x-3.5"
                            }`}
                            style={{
                              transitionDelay: dropdownOpen ? `${idx * 45}ms` : "0ms",
                            }}
                          >
                            <Link
                              to={sub.to}
                              className="group/item flex items-center gap-2 rounded-md px-3 py-1.5 font-serif text-[0.82rem] text-foreground/80 hover:bg-secondary/40 hover:text-primary transition-all duration-200"
                            >
                              {/* Small Lotus marker that animates on hover */}
                              <span className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 text-accent text-[0.55rem]">
                                ✦
                              </span>
                              <span className="leading-tight">{sub.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{ className: "text-accent-foreground bg-secondary" }}
                  className="rounded-md px-2.5 py-2 font-sans text-[0.8rem] font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search the archive"
            className="grid size-11 min-h-11 min-w-11 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            <Search className="size-4" />
          </button>
          <button
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light reading mode" : "Switch to dark reading mode"}
            className="grid size-11 min-h-11 min-w-11 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-11 min-h-11 min-w-11 place-items-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-primary xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-accent/25 bg-background/98 px-4 pb-5 backdrop-blur-md xl:hidden animate-fade-in-down"
          aria-label="Mobile"
        >
          <ul className="mx-auto max-w-7xl divide-y divide-border/40">
            {nav.map((item) => {
              if (item.label === "Responsibilities") {
                return (
                  <li key={item.to} className="py-2.5">
                    <span className="block font-serif text-base font-semibold text-primary py-1 mb-1.5">
                      Responsibilities
                    </span>
                    <ul className="pl-3.5 space-y-1.5 border-l border-accent/25">
                      {dropdownItems.map((sub) => (
                        <li key={sub.to}>
                          <Link
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block py-1 font-serif text-sm text-foreground/75 hover:text-primary"
                          >
                            • {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.to} className="py-2.5">
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-base text-foreground/90 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="border-accent/40 bg-card">
          <DialogHeader>
            <DialogTitle className="font-display">Search the archive</DialogTitle>
            <DialogDescription>
              Search across volumes, papers, authors and research categories.
            </DialogDescription>
          </DialogHeader>
          <Input placeholder="e.g. copper plate, Nalanda, manuscript…" aria-label="Search query" />
          <p className="text-xs text-muted-foreground">
            Full-text search of the digitised archive is being catalogued volume by volume.
          </p>
        </DialogContent>
      </Dialog>
    </header>
  );
}
