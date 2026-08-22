import { createFileRoute, Link, Outlet, useMatch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { supabase } from "@/lib/supabase";

export type EventItem = {
  id: string;
  title: string;
  location: string | null;
  description: string | null;
  event_date: string;
  tags: string[] | null;
  cover_url: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export const Route = createFileRoute("/events")({
  component: EventsList,
  head: () => ({
    meta: [
      { title: "News & Events — Bharatiya Manyaprad" },
      {
        name: "description",
        content:
          "Stay updated with academic conferences, journal launches, and cultural symposiums organized under Bharatiya Manyaprad.",
      },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
});

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function parseEventDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return { month: "Upcoming", dayOfWeek: "EVENT", dateNumber: "--", year: 2026 };
  }
  return {
    month: MONTH_NAMES[d.getMonth()] || "Upcoming",
    dayOfWeek: DAY_NAMES[d.getDay()] || "EVENT",
    dateNumber: String(d.getDate()).padStart(2, "0"),
    year: d.getFullYear(),
  };
}

// Fallback static events list in case database is empty or connection fails
const fallbackEvents: EventItem[] = [
  {
    id: "static-1",
    title: "National Seminar on Indian Heritage and Iconography",
    location: "Bhavan's Cultural Hall, Navrangpura, Ahmedabad",
    description:
      "A two-day national colloquium exploring ancient Indian art history, temple architecture, and sculptural traditions.",
    event_date: "2026-11-04",
    tags: ["SEMINAR", "HISTORY", "ICONOGRAPHY"],
    cover_url: null,
    sort_order: 1,
  },
  {
    id: "static-2",
    title: "International Symposium on Diaspora & Indian Culture",
    location: "Sanchi University of Buddhist-Indic Studies, MP",
    description:
      "Gathering global scholars to present research on the propagation of Indic studies, manuscripts, and literature across borders.",
    event_date: "2026-11-05",
    tags: ["SYMPOSIUM", "DIASPORA", "LITERATURE"],
    cover_url: null,
    sort_order: 2,
  },
  {
    id: "static-3",
    title: "Launch of Bharatiya Manyaprad Volume XII",
    location: "Gujarat University Assembly Hall, Ahmedabad",
    description:
      "Official publication ceremony for the 2026 volume, featuring panel discussions on civilisational studies and historical archives.",
    event_date: "2026-11-06",
    tags: ["LAUNCH", "PUBLICATION", "ARCHIVE"],
    cover_url: null,
    sort_order: 3,
  },
];

function EventsList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true })
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          // Fall back to static events if table is empty or doesn't exist
          setEvents(fallbackEvents);
        } else {
          setEvents(data as EventItem[]);
        }
        setLoading(false);
      });
  }, []);

  // Group events by Month and Year (e.g. "November 2026")
  const groupedEvents: Record<string, EventItem[]> = {};
  events.forEach((ev) => {
    const { month, year } = parseEventDate(ev.event_date);
    const groupKey = `${month} ${year}`;
    if (!groupedEvents[groupKey]) {
      groupedEvents[groupKey] = [];
    }
    groupedEvents[groupKey].push(ev);
  });

  // Check if a child route (e.g. /events/$eventId) is active
  const childMatch = useMatch({ from: "/events/$eventId", shouldThrow: false });

  // If a child route is matched, render only the child via Outlet
  if (childMatch) {
    return <Outlet />;
  }

  return (
    <>
      <PageHero
        eyebrow="Announcements"
        title="News & Events"
        intro="Explore academic seminars, symposia, journal launches, and historical colloquiums hosted under the aegis of Bharatiya Manyaprad."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-16">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-16 font-serif text-lg text-muted-foreground italic">
            No upcoming events listed at this time.
          </div>
        ) : (
          Object.entries(groupedEvents).map(([monthGroup, list]) => (
            <div key={monthGroup} className="space-y-6">
              {/* Month Header Section */}
              <div className="border-b border-accent/25 pb-2 mb-8">
                <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest rounded-sm shadow-sm select-none">
                  {monthGroup}
                </span>
              </div>

              {/* Event Listings */}
              <div className="divide-y divide-accent/15">
                {list.map((ev, idx) => {
                  const { dayOfWeek, dateNumber } = parseEventDate(ev.event_date);
                  return (
                    <Reveal key={ev.id} delay={idx * 60}>
                      <Link
                        to="/events/$eventId"
                        params={{ eventId: ev.id }}
                        className="group flex flex-col sm:flex-row items-stretch gap-6 py-8 hover:bg-secondary/15 px-4 rounded-2xl transition-all duration-300"
                      >
                        {/* 1. Date Plaque */}
                        <div className="flex sm:flex-col items-center justify-center shrink-0 w-20 text-center sm:border-r border-accent/20 sm:pr-6 gap-2 sm:gap-0">
                          <span className="font-sans text-[0.68rem] tracking-wider text-muted-foreground uppercase font-bold">
                            {dayOfWeek}
                          </span>
                          <span className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">
                            {dateNumber}
                          </span>
                        </div>

                        {/* 2. Image Cover or Dummy Counter Image */}
                        <div className="relative w-full sm:w-44 h-28 shrink-0 rounded-xl overflow-hidden border border-accent/20 shadow-sm bg-background/50 select-none">
                          {ev.cover_url ? (
                            <img
                              src={ev.cover_url}
                              alt={ev.title}
                              className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="size-full bg-secondary/15 flex flex-col items-center justify-center text-accent relative">
                              {/* Thin decorative inner border */}
                              <div className="absolute inset-1.5 rounded-[8px] border border-dashed border-accent/10 pointer-events-none" />
                              <span className="font-display text-4xl sm:text-5xl font-bold tracking-widest opacity-25">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="absolute bottom-2 font-display text-[0.55rem] tracking-[0.2em] uppercase opacity-45">
                                EVENT
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 3. Description & Meta */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-2">
                          <div className="space-y-1.5">
                            <h3 className="font-display text-lg text-primary tracking-wide leading-snug group-hover:text-accent transition-colors">
                              {ev.title}
                            </h3>
                            {ev.location && (
                              <div className="flex items-center gap-1 text-[0.72rem] text-muted-foreground font-sans uppercase tracking-wider">
                                <MapPin className="size-3.5 text-accent shrink-0" />
                                <span className="truncate">{ev.location}</span>
                              </div>
                            )}
                          </div>

                          {ev.description && (
                            <p className="font-serif text-sm text-foreground/80 leading-relaxed line-clamp-2">
                              {ev.description}
                            </p>
                          )}

                          {ev.tags && ev.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {ev.tags.map((t) => (
                                <span
                                  key={t}
                                  className="bg-secondary/40 text-foreground/75 px-2 py-0.5 rounded text-[0.6rem] font-sans font-bold uppercase tracking-wider border border-accent/10"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 4. Arrow Indicator */}
                        <div className="hidden sm:flex items-center justify-center shrink-0 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 pr-2">
                          <ArrowUpRight className="size-6" />
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
