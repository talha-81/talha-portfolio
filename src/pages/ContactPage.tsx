import { ContactButtons } from "../components/ContactButtons.tsx";
import { ContactForm } from "../components/ContactForm.tsx";
import { availability } from "../data/content.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function ContactPage() {
  usePageMeta(
    "Contact — Talha Arshad",
    "Send Talha Arshad a project note, or reach him on WhatsApp, Email, GitHub, or LinkedIn. Available worldwide, remote, 24/7.",
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
            Send a message and I&apos;ll get back to you. WhatsApp, Email, GitHub, and LinkedIn are here as well. I work remotely, worldwide, 24/7.
          </p>
          <ContactButtons size="lg" className="mt-10" />
        </div>
      </section>

      <section id="contact-form" className="relative scroll-mt-24 overflow-hidden border-b border-line md:scroll-mt-28">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] md:py-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Message</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Contact Talha Arshad</h2>
            <p className="mt-3 max-w-xl text-muted">Tell me about the project. I&apos;ll reply from the email you leave.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <aside className="rounded-[32px] border border-line bg-surface/80 p-6 shadow-[var(--shadow)] lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-semibold text-fg">Or reach me directly</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">WhatsApp, Email, GitHub, and LinkedIn stay open if you&apos;d rather not use the form.</p>
            <ContactButtons className="mt-6" />
          </aside>
        </div>
      </section>
    </>
  );
}
