import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import logo from "@/assets/logo.jpeg";
import { LotusMark } from "@/components/site/ornaments";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Publication", to: "/publication" },
  { label: "Subscription", to: "/subscription" },
  { label: "Responsibilities", to: "/publication-ethics" },
  { label: "Contact", to: "/contact" },
];

const aboutDropdownItems = [
  { label: "About Us", to: "/about" },
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Call for Papers", to: "/call-for-papers" },
  { label: "Events", to: "/events" },
  { label: "Author's Guidelines", to: "/instructions-to-authors" },
];

const responsibilitiesDropdownItems = [
  { label: "Author's Responsibility", to: "/publication-ethics#author" },
  { label: "Editor's Responsibility", to: "/publication-ethics#editor" },
  { label: "Reviewer's Responsibility", to: "/publication-ethics#reviewer" },
  { label: "Bharatiya Manyaprad Responsibility", to: "/publication-ethics#publisher" },
  { label: "Ethics Policy", to: "/publication-ethics#misconduct" },
  { label: "If Ethical Misconduct is detected", to: "/publication-ethics#misconduct" },
  { label: "Further Reading", to: "/publication-ethics#reading" },
];

export function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dark, setDark] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);

  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const stored = localStorage.getItem("bm-theme");
    const isDark = stored ? stored === "dark" : false;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 24);

      if (openRef.current) {
        setVisible(true);
        lastY = currentY;
        return;
      }

      const threshold = 5;
      if (Math.abs(currentY - lastY) < threshold) {
        return;
      }

      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastY = currentY;
    };

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
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:px-6 sm:gap-4 lg:py-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label="Bharatiya Manyaprad home"
        >
          <img
            src={logo}
            alt="Bharatiya Manyaprad emblem"
            width={64}
            height={64}
            className="size-12 shrink-0 rounded-full ring-1 ring-accent/40 sm:size-14 lg:size-16 object-cover bg-white"
          />
          <span className="min-w-0 flex flex-col justify-center">
            <span className="block font-display text-sm sm:text-base font-semibold tracking-wide text-primary lg:text-lg leading-tight whitespace-nowrap">
              Bharatiya Manyaprad
            </span>
            <span className="block text-[0.52rem] sm:text-[0.62rem] tracking-wider sm:tracking-[0.22em] uppercase text-muted-foreground leading-tight mt-0.5 whitespace-normal">
              International Journal of Indian Studies
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {nav.map((item) => {
              if (item.label === "About") {
                const isAboutActive = [
                  "/about",
                  "/editorial-board",
                  "/call-for-papers",
                  "/events",
                  "/instructions-to-authors",
                ].includes(location.pathname) || location.pathname.startsWith("/events");
                return (
                  <div
                    key={item.to}
                    className="relative py-2"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <Link
                      to={item.to}
                      className={`inline-flex items-center gap-1 px-2.5 py-2 font-sans text-[0.95rem] xl:text-[1rem] font-medium transition-colors hover:text-accent ${
                        isAboutActive ? "text-accent font-semibold" : "text-foreground/85"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${
                          aboutDropdownOpen ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </Link>

                    {/* The Unique Historic Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 lg:w-80 xl:w-96 rounded-xl border border-accent/25 p-2 shadow-[0_15px_35px_rgba(184,134,11,0.14)] backdrop-blur-md transition-all duration-300 origin-top z-50 ${
                        aboutDropdownOpen
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
                        {aboutDropdownItems.map((sub, idx) => (
                          <li
                            key={sub.to}
                            className={`transition-all duration-300 ${
                              aboutDropdownOpen
                                ? "opacity-100 translate-x-0"
                               : "opacity-0 -translate-x-3.5"
                            }`}
                            style={{
                              transitionDelay: aboutDropdownOpen ? `${idx * 45}ms` : "0ms",
                            }}
                          >
                            <Link
                              to={sub.to}
                              className="group/item flex items-center gap-2 rounded-md px-3 py-2 font-serif text-[0.9rem] lg:text-[0.95rem] xl:text-[1rem] text-foreground/80 hover:bg-secondary/40 hover:text-primary transition-all duration-200"
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

              if (item.label === "Responsibilities") {
                return (
                  <div
                    key={item.to}
                    className="relative py-2"
                    onMouseEnter={() => setRespDropdownOpen(true)}
                    onMouseLeave={() => setRespDropdownOpen(false)}
                  >
                    <Link
                      to={item.to}
                      activeProps={{ className: "text-accent font-semibold" }}
                      className="inline-flex items-center gap-1 px-2.5 py-2 font-sans text-[0.95rem] xl:text-[1rem] font-medium text-foreground/85 transition-colors hover:text-accent"
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-300 ${
                          respDropdownOpen ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </Link>

                    {/* The Unique Historic Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 lg:w-80 xl:w-96 rounded-xl border border-accent/25 p-2 shadow-[0_15px_35px_rgba(184,134,11,0.14)] backdrop-blur-md transition-all duration-300 origin-top z-50 ${
                        respDropdownOpen
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
                        {responsibilitiesDropdownItems.map((sub, idx) => (
                          <li
                            key={sub.to}
                            className={`transition-all duration-300 ${
                              respDropdownOpen
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-3.5"
                            }`}
                            style={{
                              transitionDelay: respDropdownOpen ? `${idx * 45}ms` : "0ms",
                            }}
                          >
                            <Link
                              to={sub.to}
                              className="group/item flex items-center gap-2 rounded-md px-3 py-2 font-serif text-[0.9rem] lg:text-[0.95rem] xl:text-[1rem] text-foreground/80 hover:bg-secondary/40 hover:text-primary transition-all duration-200"
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
                  activeProps={{ className: "text-accent font-semibold" }}
                  className="px-2.5 py-2 font-sans text-[0.95rem] xl:text-[1rem] font-medium text-foreground/85 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light reading mode" : "Switch to dark reading mode"}
            className="grid size-9 sm:size-11 place-items-center rounded-md text-foreground/80 transition-colors hover:text-accent"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-9 sm:size-11 place-items-center rounded-md text-foreground/80 transition-colors hover:text-accent xl:hidden"
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
              if (item.label === "About") {
                return (
                  <li key={item.to} className="py-2.5">
                    <span className="block font-serif text-lg font-semibold text-primary py-1 mb-1.5">
                      About
                    </span>
                    <ul className="pl-3.5 space-y-1.5 border-l border-accent/25">
                      {aboutDropdownItems.map((sub) => (
                        <li key={sub.to}>
                          <Link
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 font-serif text-[0.95rem] sm:text-base text-foreground/75 hover:text-primary"
                          >
                            • {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              if (item.label === "Responsibilities") {
                return (
                  <li key={item.to} className="py-2.5">
                    <span className="block font-serif text-lg font-semibold text-primary py-1 mb-1.5">
                      Responsibilities
                    </span>
                    <ul className="pl-3.5 space-y-1.5 border-l border-accent/25">
                      {responsibilitiesDropdownItems.map((sub) => (
                        <li key={sub.to}>
                          <Link
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 font-serif text-[0.95rem] sm:text-base text-foreground/75 hover:text-primary"
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
                    className="block font-serif text-lg text-foreground/90 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

    </header>
  );
}
