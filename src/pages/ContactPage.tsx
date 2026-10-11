import { ArrowUpRight } from "lucide-react";
import { FaqList } from "../components/FaqList.tsx";
import { GitHubIcon, LinkedInIcon } from "../components/BrandIcons.tsx";
import {
  availability,
  profile,
  whatsappHref,
  whatsappNumber,
} from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function ContactPage() {
  useDocumentTitle("Contact — Talha Arshad");

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-fg uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {availability}
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,7vw,5.6rem)] leading-[0.9] font-bold tracking-tighter text-fg">
        Start a <span className="text-stroke">project</span>
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        I work remotely with clients anywhere in the world, across time zones, and I am available 24/7. WhatsApp is the direct way to reach me. GitHub and LinkedIn are here as well.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => celebrateZoru()}
          className="rounded-[28px] border border-accent bg-accent p-6 text-accent-ink transition hover:-translate-y-1 lg:col-span-1"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase">Primary</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight">WhatsApp</p>
          <p className="mt-2 text-lg font-medium">{whatsappNumber}</p>
          <p className="mt-3 text-sm leading-relaxed">
            Opens a chat with a short note: &quot;Hi Talha, I&apos;d like to discuss a project.&quot;
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Start a project
            <ArrowUpRight size={16} />
          </span>
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => celebrateZoru()}
          className="rounded-[28px] border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent"
        >
          <GitHubIcon className="h-6 w-6" />
          <p className="mt-4 font-display text-2xl font-semibold text-fg">GitHub</p>
          <p className="mt-2 text-sm text-muted">github.com/talha-81</p>
          <span className={`${secondaryBtn} mt-6`}>
            Open GitHub
            <ArrowUpRight size={16} />
          </span>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => celebrateZoru()}
          className="rounded-[28px] border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent"
        >
          <LinkedInIcon className="h-6 w-6" />
          <p className="mt-4 font-display text-2xl font-semibold text-fg">LinkedIn</p>
          <p className="mt-2 text-sm text-muted">talha-arshad81</p>
          <span className={`${secondaryBtn} mt-6`}>
            Open LinkedIn
            <ArrowUpRight size={16} />
          </span>
        </a>
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">Questions</h2>
        <div className="mt-6">
          <FaqList />
        </div>
      </section>
    </div>
  );
}
