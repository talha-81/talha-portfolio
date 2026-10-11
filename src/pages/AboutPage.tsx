import { Link } from "react-router";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { ExperienceList } from "../components/ExperienceList.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { SpotlightCard } from "../components/SpotlightCard.tsx";
import { StatsRow } from "../components/StatsRow.tsx";
import { aiWorkflowLine, availability, certifications, processSteps } from "../data/content.ts";
import { secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function AboutPage() {
  usePageMeta(
    "About — Talha Arshad",
    "Talha Arshad is a software engineer with 5+ years building web applications, APIs, AI features, and data products. Available worldwide, remote, 24/7.",
  );

  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Software for <span className="text-stroke">clients</span>
            <span className="text-accent">.</span>
          </>
        }
        lede={
          <p>
            I design and build scalable web applications, management systems, and AI products. {availability}
          </p>
        }
        visual={
          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="hero-grid pointer-events-none absolute -inset-6 rounded-[40px]" />
            <span className="float-slow absolute -top-3 -left-3 h-16 w-16 rounded-2xl border border-accent/40 bg-accent/10" />
            <span className="float-slow absolute -right-2 bottom-10 h-12 w-12 rounded-full border border-line bg-surface" style={{ animationDelay: "1.2s" }} />
            <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface shadow-[var(--shadow)]">
              <img
                src="/avatar/talha.webp"
                alt="Talha Arshad"
                width={1086}
                height={1448}
                decoding="async"
                fetchPriority="high"
                className="aspect-[3/4] w-full object-cover object-[center_18%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-5 pt-16 pb-5">
                <p className="font-display text-3xl font-semibold text-white">
                  Talha<span className="text-accent">.</span>
                </p>
                <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">Software Engineer</p>
              </div>
            </div>
          </div>
        }
      >
        <AiToolChips />
        <Link to="/projects" className={`${secondaryBtn} mt-6`}>
          View projects
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I&apos;m a software engineer with 5+ years of experience designing and developing scalable web applications and software solutions. The work covers full-stack development, backend APIs, databases, AI, and data-driven products.
              </p>
              <p>I use React.js, .NET Core, SQL, and Python for interfaces, backend services, and AI features.</p>
              <p>I work remotely with clients anywhere in the world, across time zones, and I&apos;m available 24/7.</p>
              <p className="font-medium text-fg">{aiWorkflowLine}</p>
            </div>
          </Reveal>
          <StatsRow />
        </div>
      </section>

      <section className="border-y border-line bg-soft">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <SectionHeading eyebrow="How I work" title="A short path." lede={aiWorkflowLine} />
          <ol className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.05}>
                  <SpotlightCard className="h-full p-6">
                    <p className="font-display text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg">{step.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading eyebrow="Experience" title="Roles." />
        <div className="mt-8">
          <ExperienceList />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <SectionHeading eyebrow="Licenses and certifications" title="Credentials." />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {certifications.map((item) => (
              <li key={`${item.name}-${item.issuer}`}>
                <SpotlightCard className="flex h-full flex-col justify-between gap-4 p-6 sm:flex-row sm:items-end">
                  <div>
                    <p className="font-display text-xl font-semibold tracking-tight text-fg">{item.name}</p>
                    <p className="mt-2 text-sm text-muted">{item.issuer}</p>
                  </div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{item.date}</p>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta />
    </>
  );
}
