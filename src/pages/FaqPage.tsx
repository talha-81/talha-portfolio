import { FaqList } from "../components/FaqList.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { faqs } from "../data/content.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function FaqPage() {
  usePageMeta(
    "FAQ — Talha Arshad",
    "How to start a project, where Talha Arshad works, and what he can build. WhatsApp or Email. No contact form.",
  );

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Before you <span className="text-stroke">write</span>
            <span className="text-accent">.</span>
          </>
        }
        lede={<p>Three answers. The contact buttons are on the next scroll, and in the footer of every page.</p>}
        visual={
          <ul className="space-y-3" aria-hidden="true">
            {faqs.map((item, index) => (
              <li
                key={item.q}
                className="float-slow rounded-[24px] border border-line bg-surface/90 px-5 py-4 shadow-[var(--shadow)]"
                style={{ animationDelay: `${index * 0.4}s`, marginLeft: index === 1 ? "1.5rem" : 0 }}
              >
                <p className="font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">{item.q}</p>
              </li>
            ))}
          </ul>
        }
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <div className="gradient-ring rounded-[32px] px-5 py-2 sm:px-8">
          <FaqList />
        </div>
      </section>

      <PageCta />
    </>
  );
}
