import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lede,
  visual,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  visual?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden border-b border-line ${className}`}>
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="glow-pulse pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[12%] h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:py-20 ${
          visual ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,7vw,5.5rem)] leading-[0.88] font-bold tracking-tighter text-balance text-fg">
            {title}
          </h1>
          {lede ? <div className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{lede}</div> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {visual ? <div className="min-w-0">{visual}</div> : null}
      </div>
    </section>
  );
}
