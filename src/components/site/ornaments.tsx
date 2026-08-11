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
    <div className={`w-full ${className}`} aria-hidden="true">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
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

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M1 8V1h7" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 12c0-4.4 3.6-8 8-8" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
      <circle cx="4" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}

/* ---- Hand-drawn style heritage sketches (line art) ---- */

export function QuillSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" aria-hidden="true">
      <path
        d="M52 8c-8 6-20 18-28 32C18 50 14 60 12 70l6 6c8-4 16-10 22-18C50 46 54 30 56 12c.2-2-1.6-3.2-4-4Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M44 18C36 28 26 44 18 66" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
      <path d="M12 76 4 90" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 30c4 2 8 2 12 0M28 42c4 2 8 2 12 0" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

export function PillarSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 120" className={className} fill="none" aria-hidden="true">
      <path d="M8 16h32M6 10h36M12 22h24" stroke="currentColor" strokeWidth="1" />
      <path d="M14 22v72M34 22v72M18 22v72M30 22v72" stroke="currentColor" strokeWidth="0.7" opacity="0.75" />
      <path d="M10 94h28l4 8H6l4-8ZM4 110h40M2 116h44" stroke="currentColor" strokeWidth="1" />
      <path d="M18 40h12M18 58h12M18 76h12" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export function ManuscriptSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M10 20c8-6 20-8 32-4 10 3 18 3 28 0 12-4 22-2 32 6-8 12-18 18-30 18-10 0-18-2-28-2s-20 3-28 8c-6-8-8-17-6-26Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M22 26h30M22 34h44M22 42h26M74 30h26M74 38h18" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <circle cx="60" cy="34" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function DiyaSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 64" className={className} fill="none" aria-hidden="true">
      <path d="M36 6c4 6 6 10 6 14s-3 6-6 6-6-2-6-6 2-8 6-14Z" stroke="currentColor" strokeWidth="1" />
      <path d="M8 38c6 10 16 16 28 16s22-6 28-16c-10-3-19-4-28-4s-18 1-28 4Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M14 44c8 3 36 3 44 0" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

export function SealSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <path d="M32 14c5 7 7 13 7 18s-3 9-7 14c-4-5-7-9-7-14s2-11 7-18Z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M6 32h6M52 32h6M32 6v6M32 52v6" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
}

export function MajesticLotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 100" className={className} fill="none" aria-hidden="true">
      {/* Base scrolls */}
      <path
        d="M 80 75 C 65 75, 45 85, 20 80 C 45 78, 55 65, 72 68"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.6"
      />
      <path
        d="M 80 75 C 95 75, 115 85, 140 80 C 115 78, 105 65, 88 68"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.6"
      />
      
      {/* Center Petal */}
      <path
        d="M 80 18 C 76 35, 74 55, 80 74 C 86 55, 84 35, 80 18 Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      
      {/* First Inner Petals */}
      <path
        d="M 80 18 C 70 30, 64 45, 68 62 C 73 54, 76 40, 80 25"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M 80 18 C 90 30, 96 45, 92 62 C 87 54, 84 40, 80 25"
        stroke="currentColor"
        strokeWidth="1.1"
      />

      {/* Second Petal Row */}
      <path
        d="M 80 24 C 62 36, 52 54, 58 71 C 65 60, 70 48, 80 34"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M 80 24 C 98 36, 108 54, 102 71 C 95 60, 90 48, 80 34"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Third Petal Row */}
      <path
        d="M 80 32 C 54 44, 42 62, 48 76 C 58 66, 66 54, 80 44"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.9"
      />
      <path
        d="M 80 32 C 106 44, 118 62, 112 76 C 102 66, 94 54, 80 44"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.9"
      />

      {/* Fourth Outer Flared Petals */}
      <path
        d="M 80 42 C 46 52, 34 68, 38 80 C 52 72, 62 62, 80 54"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <path
        d="M 80 42 C 114 52, 126 68, 122 80 C 108 72, 98 62, 80 54"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      
      {/* Ground droplet details */}
      <circle cx="80" cy="79" r="0.75" fill="currentColor" />
      <circle cx="80" cy="83" r="0.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
