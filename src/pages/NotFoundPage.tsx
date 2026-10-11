import { Link } from "react-router";
import { PageCta } from "../components/PageCta.tsx";
import { navLinks } from "../data/content.ts";
import { navTips } from "../data/mascotTips.ts";
import { secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function NotFoundPage() {
  usePageMeta(
    "Page not found — Talha Arshad",
    "That page is not on Talha Arshad's site. Head back to the work, services, or contact buttons.",
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[28vw] leading-none font-bold tracking-tighter text-stroke opacity-40 select-none"
        >
          404
        </p>
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">404</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.9] font-bold tracking-tighter text-fg">
            That page is <span className="text-stroke">not here</span>
            <span className="text-accent">.</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" data-mascot-tip={navTips["/"]} className={secondaryBtn}>
              Back home
            </Link>
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link key={link.href} to={link.href} data-mascot-tip={navTips[link.href]} className={secondaryBtn}>
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
      <PageCta title="Or start a project instead." />
    </>
  );
}