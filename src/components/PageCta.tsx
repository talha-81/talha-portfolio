import { availability } from "../data/content.ts";
import { ContactButtons } from "./ContactButtons.tsx";

export function PageCta({
  title = "Tell me about the project.",
  text = availability,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <div className="gradient-ring relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Start</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl leading-[0.95] font-bold tracking-tight text-fg sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-muted">{text}</p>
        <ContactButtons className="mt-8" />
      </div>
    </section>
  );
}
