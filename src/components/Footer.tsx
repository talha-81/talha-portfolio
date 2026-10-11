import { Link } from "react-router";
import { aiWorkflowLine, availability, footerLinks, profile, serviceAreas } from "../data/content.ts";
import { ContactButtons } from "./ContactButtons.tsx";

const year = 2026;

export function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-28 md:pt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-sm font-bold tracking-[0.28em] text-fg">
              TALHA<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Web applications, management systems, AI products, and automation. {availability}
            </p>
            <p className="mt-3 text-sm font-medium text-fg">{aiWorkflowLine}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <li key={area} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Menu</p>
              <ul className="mt-4 space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm font-medium text-fg hover:text-accent">
                      {link.label}
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

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Talha Arshad. All rights reserved.</p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
