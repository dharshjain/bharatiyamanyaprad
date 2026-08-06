export function MandalaDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="gold-rule w-full max-w-[26rem] flex-1" />
      <svg width="46" height="26" viewBox="0 0 46 26" fill="none" className="shrink-0 text-accent">
        <path
          d="M23 2c3.6 4 5.4 7.6 5.4 11S26.6 20 23 24c-3.6-4-5.4-7.6-5.4-11S19.4 6 23 2Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M23 6c6 0 10 3 12 7-2 4-6 7-12 7S13 17 11 13c2-4 6-7 12-7Z"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.65"
        />
        <circle cx="23" cy="13" r="1.6" fill="currentColor" />
      </svg>
      <span className="gold-rule w-full max-w-[26rem] flex-1" />
    </div>
  );
}

export function CarvedBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        className="h-3 w-full text-accent/55"
        fill="none"
      >
        <pattern id="carve" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 11h12M6 11V5l3-3M6 5 3 2" stroke="currentColor" strokeWidth="0.7" />
        </pattern>
        <rect width="120" height="12" fill="url(#carve)" />
      </svg>
    </div>
  );
}

export function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path
        d="M24 8c4 6 6 11 6 15s-2 9-6 15c-4-6-6-11-6-15s2-9 6-15Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M24 18c7-4 13-4 18-1-2 6-7 11-14 14M24 18c-7-4-13-4-18-1 2 6 7 11 14 14"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.7"
      />
    </svg>
  );
}
