import { Link } from "react-router";
import { Marquee } from "../components/Marquee.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { ServiceMark } from "../components/ServiceMark.tsx";
import { SpotlightCard } from "../components/SpotlightCard.tsx";
import { processSteps, serviceAreas, services } from "../data/content.ts";
import { serviceTips } from "../data/mascotTips.ts";
import { secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

const spans = [
  "xl:col-span-2 xl:row-span-2",
  "xl:col-span-2",
  "xl:col-span-1",
  "xl:col-span-1",
  "xl:col-span-2",
  "xl:col-span-2",
];

export function ServicesPage() {
  usePageMeta(
    "Services — Talha Arshad",
    "Web applications, management systems, AI chatbots, voice agents, computer vision, machine learning, APIs, and automation. Remote, worldwide, 24/7.",
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="glow-pulse pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Services</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.7rem,7vw,5.5rem)] leading-[0.88] font-bold tracking-tighter text-fg">
            Systems, agents, <span className="text-stroke">automation</span>
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            The same kinds of products already in the project list. Pick a lane, or bring a brief that crosses a few of them.
          </p>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.title} className={spans[index] ?? ""}>
                <Reveal delay={index * 0.04} className="h-full">
                  <SpotlightCard className="flex h-full flex-col p-6 sm:p-7" tip={serviceTips[service.title]}>
                    <span
                      className="float-slow grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent"
                      style={{ animationDelay: `${index * 0.35}s` }}
                    >
                      <ServiceMark title={service.title} className="h-6 w-6" />
                    </span>
                    <p className="mt-6 font-display text-sm font-semibold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.text}</p>
                    {index === 0 ? (
                      <div className="mt-6 grid flex-1 grid-cols-3 content-end gap-2">
                        {["React", "APIs", "Databases"].map((item) => (
                          <p
                            key={item}
                            className="rounded-2xl border border-line bg-soft px-2 py-4 text-center text-xs font-semibold text-fg"
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          eyebrow="How I work"
          title={
            <>
              From brief to <span className="text-stroke">shipped</span>
              <span className="text-accent">.</span>
            </>
          }
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} data-mascot-tip={step.text} tabIndex={0} className="gradient-ring rounded-[28px] p-6 outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <p className="font-display text-4xl font-semibold tracking-tighter text-accent/80">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-fg">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link to="/projects" className={`${secondaryBtn} mt-10`}>
          See the work
        </Link>
      </section>

      <section className="border-y border-line py-10">
        <Marquee items={serviceAreas} />
      </section>

      <PageCta title="Tell me which system you need." />
    </>
  );
}
