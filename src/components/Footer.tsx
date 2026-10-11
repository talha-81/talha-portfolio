import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router";
import { aiWorkflowLine, availability, footerLinks, profile, serviceAreas, services } from "../data/content.ts";
import { navTips, serviceTips, startProjectTip } from "../data/mascotTips.ts";
import { ContactButtons } from "./ContactButtons.tsx";

const year = 2026;

const particles = [
  { top: "12%", left: "8%", size: 6, delay: "0s" },
  { top: "22%", left: "72%", size: 4, delay: "1.2s" },
  { top: "38%", left: "46%", size: 5, delay: "0.6s" },
  { top: "8%", left: "88%", size: 7, delay: "1.8s" },
  { top: "58%", left: "18%", size: 4, delay: "0.4s" },
  { top: "48%", left: "92%", size: 5, delay: "1.4s" },
];

function onSpotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="footer-aurora relative overflow-hidden border-t border-line" onMouseMove={onSpotlight}>
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-80" />
      <p
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 font-display text-[clamp(4.5rem,18vw,15rem)] leading-none font-bold tracking-tighter whitespace-nowrap opacity-40 select-none"
      >
        TALHA
      </p>
      {particles.map((dot) => (
        <span
          key={`${dot.top}-${dot.left}`}
          aria-hidden="true"
          className="footer-particle glow-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            animationDelay: dot.delay,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-5 pt-16 sm:px-8 md:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Start</p>
          <h2 className="mt-3 font-display text-[clamp(3rem,8vw,6.4rem)] leading-[0.88] font-bold tracking-tighter text-fg">
            Let&apos;s <span className="text-stroke">build</span> something
            <span className="text-accent">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{availability}</p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/contact"
              data-mascot-tip={startProjectTip}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-ink transition hover:-translate-y-0.5 sm:text-lg"
            >
              Start a project
            </Link>
            <ContactButtons size="lg" labels={["WhatsApp", "Email"]} />
          </div>
        </div>

        <div className="mt-16 grid gap-10 rounded-[32px] border border-line bg-surface/80 p-6 shadow-[var(--shadow)] backdrop-blur-md sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-sm font-bold tracking-[0.28em] text-fg">
              TALHA<span className="text-accent">.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Web applications, management systems, AI products, and automation. {availability}
            </p>
            <p className="mt-3 text-sm font-medium text-fg">{aiWorkflowLine}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <li key={area} tabIndex={0} data-mascot-tip={`${area} is one of the areas I work in.`} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Menu</p>
              <ul className="mt-4 space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} data-mascot-tip={navTips[link.href]} className="text-sm font-medium text-fg hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Services</p>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service.title}>
                    <Link to="/services" data-mascot-tip={serviceTips[service.title]} className="text-sm font-medium text-fg hover:text-accent">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Contact</p>
              <ContactButtons className="mt-4" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 pb-36 text-sm text-muted sm:flex-row sm:items-center sm:justify-between md:pb-44">
          <p>© {year} Talha Arshad. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            data-mascot-tip="Jump back to the top of this page."
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-line bg-surface px-4 text-sm font-semibold text-fg transition hover:-translate-y-0.5 hover:border-accent sm:self-auto"
          >
            Back to top
            <ArrowUp size={16} />
          </button>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
