import { services, menuLinks, profile } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons.tsx";
import { Reveal } from "./Reveal.tsx";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/10 pt-24 pb-36 md:pt-32 md:pb-44"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-[25vw] leading-none font-bold tracking-tighter whitespace-nowrap text-white opacity-[0.05] select-none"
      >
        CONTACT
      </p>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-4xl leading-[0.9] font-bold tracking-tighter text-white sm:text-6xl">
              HOW CAN I <span className="text-[#00df8f]">HELP?</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9ca3af]">
              Part-time software engineering at Nayel Solutions, plus web
              applications, APIs, and automation from Petalnex. I&apos;m based
              in Pakistan.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-gray-300"
                >
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => celebrateZoru()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => celebrateZoru()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:border-[#00df8f] hover:text-[#00df8f]"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:justify-items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-white/50 uppercase">
                Menu
              </p>
              <ul className="mt-4 space-y-3">
                {menuLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-gray-300 hover:text-[#00df8f]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-white/50 uppercase">
                Socials
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => celebrateZoru()}
                    className="text-sm font-medium text-gray-300 hover:text-[#00df8f]"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => celebrateZoru()}
                    className="text-sm font-medium text-gray-300 hover:text-[#00df8f]"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Talha Arshad. All rights reserved.</p>
          <p>Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
