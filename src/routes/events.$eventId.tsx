import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { EventItem } from "./events";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetail,
  head: ({ params }) => ({
    meta: [{ title: `Event Details — Bharatiya Manyaprad` }],
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
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatFullDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return dateStr;
  }
  const dayName = DAY_NAMES[d.getDay()];
  const dateNum = d.getDate();
  const monthName = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  return `${dayName}, ${monthName} ${dateNum}, ${year}`;
}

const fallbackEvents: EventItem[] = [
  {
    id: "static-1",
    title: "National Seminar on Indian Heritage and Iconography",
    location: "Bhavan's Cultural Hall, Navrangpura, Ahmedabad",
    description:
      "A two-day national colloquium exploring ancient Indian art history, temple architecture, and sculptural traditions. Scholars from central universities and archeological departments will present papers on iconography and manuscript preservation. Sessions cover: Epigraphy and Copper Plate Readings, Temple Geometry and Cosmic Alignments, and Digitisation of Palm Leaf Manuscripts.",
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
      "Gathering global scholars to present research on the propagation of Indic studies, manuscripts, and literature across borders. This international symposium features keynote addresses, roundtable panels, and photo exhibitions. Major focus areas include the influence of Indian ocean trade on cultural assimilation, Sanskrit studies in Southeast Asia, and preserving oral traditions of folklore.",
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
      "Official publication ceremony for the 2026 volume, featuring panel discussions on civilisational studies and historical archives. The editorial desk led by Dr. Neerja Gupta will present key findings from the peer-reviewed papers. A copy of the printed volume will be unveiled, followed by high tea and networking with academic and cultural leaders.",
    event_date: "2026-11-06",
    tags: ["LAUNCH", "PUBLICATION", "ARCHIVE"],
    cover_url: null,
    sort_order: 3,
  },
];

function EventDetail() {
  const { eventId } = Route.useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          // Check fallbacks
          const local = fallbackEvents.find((e) => e.id === eventId);
          setEvent(local || null);
        } else {
          setEvent(data as EventItem);
        }
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
        <h1 className="font-display text-2xl text-primary">Event Not Found</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          The event you are looking for does not exist or has been removed.
        </p>
        <Button asChild variant="outline" className="engraved mt-6">
          <Link to="/events">Back to events</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Event Details"
        title={event.title}
        intro={event.location || "Upcoming event"}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="mb-6">
            <Button asChild variant="ghost" className="hover:text-accent -ml-3">
              <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold">
                <ArrowLeft className="size-4" /> Back to all events
              </Link>
            </Button>
          </div>

          <div
            className="relative rounded-3xl p-6 sm:p-10 border border-accent/25 shadow-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--card), var(--background))",
            }}
          >
            {/* Double thin border for historic scroll look */}
            <div className="absolute inset-2 sm:inset-3.5 rounded-[22px] border border-accent/15 pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Event Image Cover or Stylized Counter badge placeholder */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-accent/20 shadow-md bg-background/50 select-none">
                {event.cover_url ? (
                  <img src={event.cover_url} alt={event.title} className="size-full object-cover" />
                ) : (
                  <div className="size-full bg-secondary/15 flex flex-col items-center justify-center text-accent relative">
                    <div className="absolute inset-2 rounded-xl border border-dashed border-accent/10 pointer-events-none" />
                    <span className="font-display text-7xl sm:text-8xl font-bold tracking-widest opacity-20">
                      BP
                    </span>
                    <span className="absolute bottom-4 font-display text-[0.62rem] tracking-[0.25em] uppercase opacity-45">
                      Bharatiya Manyaprad
                    </span>
                  </div>
                )}
              </div>

              {/* Event Details and Meta */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 border-b border-accent/10 pb-4 text-xs font-sans uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-4 text-accent" />
                    <span>{formatFullDate(event.event_date)}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-6 font-serif text-lg leading-relaxed text-foreground/90 text-justify">
                  {event.description?.split("\n").map((para, i) => (
                    <p key={i} className="indent-4 sm:indent-8">
                      {para}
                    </p>
                  ))}
                </div>

                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-accent/10">
                    {event.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-secondary/40 text-foreground/75 px-3 py-1 rounded text-xs font-sans font-bold uppercase tracking-wider border border-accent/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
