import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { Avatar } from "../components/Avatar.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { ServiceMark } from "../components/ServiceMark.tsx";
import { SpotlightCard } from "../components/SpotlightCard.tsx";
import { StatsRow } from "../components/StatsRow.tsx";
import { WhatsAppChoice } from "../components/WhatsAppChoice.tsx";
import { aiWorkflowLine, availability, services } from "../data/content.ts";
import { serviceTips, startProjectTip } from "../data/mascotTips.ts";
import { homeProjects } from "../data/projects.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function HomePage() {
  usePageMeta(
    "Talha Arshad — Software Engineer",
    "Talha Arshad is a software engineer in Pakistan. He builds web applications, management systems, AI products, and automation for clients worldwide. Available remotely, 24/7.",
  );
  const reduce = useReducedMotion();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const teaser = services.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18vw] leading-none font-bold tracking-tighter whitespace-nowrap text-fg opacity-[0.04] select-none"
        >
          TALHA
        </p>
        <div className="pointer-events-none absolute top-24 right-[8%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-16">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-fg uppercase"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
              {availability}
            </motion.p>

            <motion.h1
              className="mt-6 font-display text-[clamp(3rem,8vw,6.2rem)] leading-[0.88] font-bold tracking-tighter text-fg"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <span className="block">SCALABLE</span>
              <span className="block">
                <span className="text-stroke">SOLUTIONS</span>
                <span className="text-accent">.</span>
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              I design and build web applications, management systems, APIs, and AI products for clients anywhere in the world.
            </motion.p>
            <p className="mt-3 text-sm font-medium text-fg">{aiWorkflowLine}</p>
            <div className="mt-4">
              <AiToolChips />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppChoice className={primaryBtn} tip={startProjectTip}>
                Start a project
                <ArrowUpRight size={18} />
              </WhatsAppChoice>
              <Link to="/projects" data-mascot-tip="Open the full project list." className={secondaryBtn}>
                View projects
              </Link>
            </div>

            <StatsRow className="mt-10" />
          </div>

          <div ref={constraintsRef} className="relative flex min-h-[520px] items-center justify-center lg:min-h-[560px]">
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                drag
                dragElastic={0.18}
                dragConstraints={constraintsRef}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                data-mascot-tip="That's me. You can drag the badge."
                className="relative cursor-grab active:cursor-grabbing"
              >
                <div aria-hidden="true" className="absolute -top-28 left-1/2 h-28 w-5 -translate-x-1/2">
                  <div className="mx-auto h-full w-3 rounded-sm bg-gradient-to-b from-accent/30 via-surface to-surface" />
                  <div className="absolute bottom-0 left-1/2 h-4 w-8 -translate-x-1/2 rounded-[4px] border border-line bg-surface" />
                </div>
                <article className="relative h-[430px] w-[270px] overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow)] sm:h-[470px] sm:w-[300px]">
                  <div
                    aria-hidden="true"
                    className="absolute top-4 left-1/2 z-20 h-4 w-10 -translate-x-1/2 rounded-full border border-line bg-ink"
                  />
                  <Avatar />
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/85 to-transparent px-6 pt-24 pb-7">
                    <p className="font-display text-4xl font-semibold tracking-tight text-white">
                      Talha
                      <span className="text-accent">.</span>
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                      Software Engineer
                    </p>
                  </div>
                </article>
              </motion.div>
            </motion.div>
            <p className="absolute bottom-2 text-xs tracking-[0.16em] text-muted uppercase">Drag the badge</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                What I <span className="text-stroke">build</span>
                <span className="text-accent">.</span>
              </>
            }
            lede="Web systems, AI products, and automation. The full set lives on the services page."
          />
          <Link to="/services" data-mascot-tip="See the full list of what I build." className={`${secondaryBtn} w-fit`}>
            All services
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {teaser.map((service, index) => (
            <li key={service.title}>
              <Reveal delay={index * 0.06}>
                <SpotlightCard className="h-full p-6" tip={serviceTips[service.title]}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                    <ServiceMark title={service.title} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-soft">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Work"
              title={
                <>
                  Featured <span className="text-stroke">projects</span>
                  <span className="text-accent">.</span>
                </>
              }
              lede="A ticketing system, an MCP chatbot, and vehicle detection. The rest of the work is one page away."
            />
            <Link to="/projects" data-mascot-tip="Open every project, not just these three." className={`${secondaryBtn} w-fit`}>
              All projects
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeProjects().map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta />
    </>
  );
}
