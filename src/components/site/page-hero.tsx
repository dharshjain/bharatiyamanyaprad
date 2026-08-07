import { MandalaDivider, PillarSketch } from "@/components/site/ornaments";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="paper-grain relative overflow-hidden bg-secondary/60 pt-32 pb-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/40" />
      <PillarSketch className="sketch-float top-16 left-6 hidden h-40 w-16 sm:block" />
      <PillarSketch className="sketch-float top-16 right-6 hidden h-40 w-16 sm:block" />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-primary sm:text-5xl">
          {title}
        </h1>
        <MandalaDivider className="mt-6" />
        <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-foreground/85 sm:text-xl">
          {intro}
        </p>
      </div>
    </section>
  );
}
