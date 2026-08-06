import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.asset.json";
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
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Current Issue", to: "/current-issue" },
  { label: "Archives", to: "/archives" },
  { label: "Ethics", to: "/publication-ethics" },
  { label: "For Authors", to: "/instructions-to-authors" },
  { label: "Submission", to: "/submission" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);

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
            src={logo.url}
            alt="Bharatiya Manyaprad emblem"
            width={48}
            height={48}
            className="size-10 shrink-0 rounded-full ring-1 ring-accent/40 lg:size-12"
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
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-accent-foreground bg-secondary" }}
                className="rounded-md px-2.5 py-2 font-sans text-[0.8rem] font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
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
          className="border-t border-accent/25 bg-background/98 px-4 pb-5 backdrop-blur-md xl:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto max-w-7xl">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3 font-serif text-lg text-foreground/90"
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
