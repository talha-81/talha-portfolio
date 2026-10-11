import { ContactButtons } from "../components/ContactButtons.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { availability } from "../data/content.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function ContactPage() {
  usePageMeta(
    "Contact — Talha Arshad",
    "Start a project with Talha Arshad on WhatsApp or Email. GitHub and LinkedIn are there too. No contact form. Available worldwide, remote, 24/7.",
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="glow-pulse pointer-events-none absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-fg uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            {availability}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.2rem,9vw,7rem)] leading-[0.86] font-bold tracking-tighter text-fg">
            LET&apos;S
            <span className="block">
              <span className="text-stroke">BUILD</span>
              <span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I work remotely with clients anywhere in the world, across time zones. WhatsApp opens a chat with a short project note. Email, GitHub, and LinkedIn are here as well. There is no contact form.
          </p>
          <ContactButtons size="lg" className="mt-10" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:px-8 md:grid-cols-3 md:py-24">
        {[
          { title: "Send a note", text: "Use WhatsApp or Email. Say what you want built." },
          { title: "Shape the work", text: "We line up the outcome, the interface, and where an agent or automation fits." },
          { title: "Build remote", text: "I deliver across time zones and stay available 24/7 for client work." },
        ].map((item, index) => (
          <article key={item.title} tabIndex={0} data-mascot-tip={item.text} className="gradient-ring rounded-[28px] p-6 outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <p className="font-display text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-fg">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      <PageCta title="Ready when you are." />
    </>
  );
}
