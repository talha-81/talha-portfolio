import { Link } from "react-router";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { ExperienceList } from "../components/ExperienceList.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { StatsRow } from "../components/StatsRow.tsx";
import {
  aiWorkflowLine,
  availability,
  certifications,
  processSteps,
  services,
  whatsappHref,
} from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function AboutPage() {
  useDocumentTitle("About — Talha Arshad");

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-fg uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {availability}
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,7vw,5.6rem)] leading-[0.9] font-bold tracking-tighter text-fg">
        Software for <span className="text-stroke">clients</span>
        <span className="text-accent">.</span>
      </h1>
      <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
        <p>
          I&apos;m a software engineer with 5+ years of experience designing and developing scalable web applications and software solutions. The work covers full-stack development, backend APIs, databases, AI, and data-driven products.
        </p>
        <p>
          I use React.js, .NET Core, SQL, and Python for interfaces, backend services, and AI features.
        </p>
        <p>
          I work remotely with clients anywhere in the world, across time zones, and I&apos;m available 24/7.
        </p>
        <p className="font-medium text-fg">{aiWorkflowLine}</p>
      </div>
      <div className="mt-6">
        <AiToolChips />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => celebrateZoru()}
          className={primaryBtn}
        >
          Start a project
        </a>
        <Link to="/projects" className={secondaryBtn}>
          View projects
        </Link>
      </div>

      <StatsRow className="mt-12 max-w-3xl" />

      <section className="mt-20">
        <SectionHeading eyebrow="Services" title="What I can take on." />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.title} className="rounded-[28px] border border-line bg-surface p-6">
              <h2 className="font-display text-xl font-semibold tracking-tight text-fg">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow="How I work" title="A short path." lede={aiWorkflowLine} />
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <li key={step.title} className="rounded-[28px] border border-line bg-surface p-6">
              <p className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-fg">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow="Experience" title="Roles." />
        <div className="mt-8">
          <ExperienceList />
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow="Licenses and certifications" title="Credentials." />
        <ul className="mt-8 border-t border-line">
          {certifications.map((item) => (
            <li
              key={`${item.name}-${item.issuer}`}
              className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
            >
              <div>
                <p className="font-medium text-fg">{item.name}</p>
                <p className="mt-1 text-sm text-muted">{item.issuer}</p>
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{item.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
