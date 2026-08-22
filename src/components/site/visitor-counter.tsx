import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

const BASELINE_COUNT = 30251;
const STORAGE_KEY = "bm_unique_visitor_token";

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(BASELINE_COUNT);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    async function trackVisitor() {
      // 1. Check if user already has a unique visitor token in localStorage
      let hasVisited = false;
      try {
        hasVisited = Boolean(localStorage.getItem(STORAGE_KEY));
      } catch {
        // localStorage might fail in restricted environments
      }

      // 2. Fetch current stat from Supabase
      try {
        const { data, error } = await supabase
          .from("site_stats")
          .select("visitor_count")
          .eq("id", "main")
          .single();

        let currentCount = BASELINE_COUNT;
        if (data && !error) {
          currentCount = Number(data.visitor_count) || BASELINE_COUNT;
        }

        if (!hasVisited) {
          // New unique visitor! Increment counter
          const nextCount = currentCount + 1;
          setVisitorCount(nextCount);
          setIsNewVisitor(true);

          // Save unique visitor token locally so reloads don't re-count this browser
          try {
            const visitorToken = `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
            localStorage.setItem(STORAGE_KEY, visitorToken);
          } catch {
            /* ignore storage errors */
          }

          // Persist increment in Supabase
          if (data) {
            await supabase
              .from("site_stats")
              .update({
                visitor_count: nextCount,
                updated_at: new Date().toISOString(),
              })
              .eq("id", "main");
          } else {
            // First time seeding row in Supabase
            await supabase.from("site_stats").insert({
              id: "main",
              visitor_count: nextCount,
            });
          }
        } else {
          // Returning user: display count without incrementing
          setVisitorCount(currentCount);
        }
      } catch {
        // Fallback if network/Supabase unavailable
        try {
          if (!hasVisited) {
            const localFallback =
              Number(localStorage.getItem("bm_fallback_count")) || BASELINE_COUNT;
            const nextLocal = localFallback + 1;
            localStorage.setItem("bm_fallback_count", String(nextLocal));
            localStorage.setItem(STORAGE_KEY, "v_local");
            setVisitorCount(nextLocal);
          } else {
            const localFallback =
              Number(localStorage.getItem("bm_fallback_count")) || BASELINE_COUNT;
            setVisitorCount(localFallback);
          }
        } catch {
          setVisitorCount(BASELINE_COUNT);
        }
      }
    }

    trackVisitor();
  }, []);

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-amber-600/40 bg-[#fffbeb] text-slate-900 px-4 py-2 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 select-none"
      style={{
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(180, 83, 9, 0.2)",
      }}
      title={
        isNewVisitor
          ? "Welcome! You are counted as a new unique visitor."
          : "Total Unique Website Visitors"
      }
    >
      {/* Dim-and-glow beacon pulse with light-wave rings */}
      <div className="relative flex items-center justify-center size-3.5">
        {/* Outer expanding light wave aura */}
        <span
          className="absolute inset-0 rounded-full bg-amber-600/40 animate-ping"
          style={{ animationDuration: "3s" }}
        />
        {/* Secondary soft pulsing glow ring */}
        <span
          className="absolute -inset-1 rounded-full bg-amber-600/25 animate-pulse"
          style={{ animationDuration: "2s" }}
        />
        {/* Core luminous gold beacon dot */}
        <span className="relative size-2 rounded-full bg-amber-600 shadow-[0_0_8px_#b45309]" />
      </div>

      {/* Mini Light Equalizer / Soundwave Light Bars Effect */}
      <div className="flex items-end gap-0.5 h-3 opacity-90" aria-hidden="true">
        <span
          className="w-0.5 bg-amber-700 rounded-full animate-pulse"
          style={{ height: "60%", animationDuration: "1.2s", animationDelay: "0ms" }}
        />
        <span
          className="w-0.5 bg-amber-700 rounded-full animate-pulse"
          style={{ height: "100%", animationDuration: "1.6s", animationDelay: "200ms" }}
        />
        <span
          className="w-0.5 bg-amber-700 rounded-full animate-pulse"
          style={{ height: "40%", animationDuration: "1.4s", animationDelay: "400ms" }}
        />
      </div>

      {/* Counter label & count */}
      <div className="flex items-center gap-1.5 font-sans text-xs tracking-wide">
        <Users className="size-3.5 text-amber-800 shrink-0 stroke-[2.5]" />
        <span className="text-slate-900 font-extrabold text-xs tracking-wider">Visitors:</span>
        <span className="font-display font-extrabold text-amber-900 text-sm tracking-wider">
          {visitorCount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
