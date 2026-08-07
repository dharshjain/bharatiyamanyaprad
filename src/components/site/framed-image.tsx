import type { ReactNode } from "react";
import { CornerFlourish } from "@/components/site/ornaments";

type Tone = "light" | "dark";

/**
 * Museum-style framed image: a carved mount with double gold rule,
 * engraved corner flourishes and an optional brass plaque caption.
 */
export function FramedImage({
  src,
  alt,
  caption,
  meta,
  tone = "light",
  ratio = "square",
  tilt = 0,
  className = "",
  width = 900,
  height = 900,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
  tone?: Tone;
  ratio?: "square" | "portrait" | "landscape" | "auto";
  tilt?: number;
  className?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
}) {
  const aspect =
    ratio === "square"
      ? "aspect-square"
      : ratio === "portrait"
        ? "aspect-[3/4]"
        : ratio === "landscape"
          ? "aspect-[4/3]"
          : "";

  return (
    <figure
      className={`group/frame relative ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <div
        className={`museum-frame relative p-2.5 ${
          tone === "dark" ? "museum-frame-dark" : "paper-grain"
        }`}
      >
        <CornerFlourish className="pointer-events-none absolute top-1 left-1 size-5 text-accent/70" />
        <CornerFlourish className="pointer-events-none absolute top-1 right-1 size-5 rotate-90 text-accent/70" />
        <CornerFlourish className="pointer-events-none absolute right-1 bottom-1 size-5 rotate-180 text-accent/70" />
        <CornerFlourish className="pointer-events-none absolute bottom-1 left-1 size-5 -rotate-90 text-accent/70" />
        <div className="overflow-hidden rounded-[3px] border border-accent/45">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className={`w-full ${aspect} object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/frame:scale-[1.04]`}
          />
        </div>
        {children}
      </div>
      {(caption || meta) && (
        <figcaption className="mt-4 text-center">
          {caption && (
            <span
              className={`plaque font-display text-sm tracking-wide ${
                tone === "dark" ? "text-primary-foreground" : "text-primary"
              }`}
            >
              {caption}
            </span>
          )}
          {meta && (
            <p className="mt-2 text-[0.65rem] tracking-[0.22em] uppercase text-accent">{meta}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
