import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, lede, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.92] font-bold tracking-tighter text-fg">
        {title}
      </h2>
      {lede ? (
        <p className={`mt-4 text-base leading-relaxed text-muted sm:text-lg ${centered ? "" : "max-w-2xl"}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
