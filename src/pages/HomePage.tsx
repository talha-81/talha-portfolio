import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";
import { Avatar } from "../components/Avatar.tsx";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { FaqList } from "../components/FaqList.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { StatsRow } from "../components/StatsRow.tsx";
import {
  aiWorkflowLine,
  availability,
  processSteps,
  services,
  whatsappHref,
} from "../data/content.ts";
import { featuredProjects, projectsInGroup } from "../data/projects.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function HomePage() {
  useDocumentTitle("Talha Arshad — Software Engineer");
  const reduce = useReducedMotion();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const aiHighlights = projectsInGroup("ai").slice(0, 3);

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
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => celebrateZoru()}
                className={primaryBtn}
              >
                Start a project
                <ArrowUpRight size={18} />
              </a>
              <Link to="/projects" className={secondaryBtn}>
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

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What I <span className="text-stroke">build</span>
              <span className="text-accent">.</span>
            </>
          }
          lede="The same kinds of products already in the project list: web systems, AI, vision, and automation."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="rounded-[28px] border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/50"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-soft">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="AI"
              title={
                <>
                  Agents and <span className="text-stroke">chatbots</span>
                  <span className="text-accent">.</span>
                </>
              }
              lede="Chatbots, voice agents, MCP, and automation for client products."
            />
            <Link to="/ai" className={`${secondaryBtn} w-fit`}>
              AI page
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {aiHighlights.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Work"
            title={
              <>
                Selected <span className="text-stroke">projects</span>
                <span className="text-accent">.</span>
              </>
            }
            lede="A short set from web systems, AI, vision, and data. The full list is on the projects page."
          />
          <Link to="/projects" className={`${secondaryBtn} w-fit`}>
            All projects
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects().map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <SectionHeading
            eyebrow="How I work"
            title={
              <>
                From brief to <span className="text-stroke">shipped</span>
                <span className="text-accent">.</span>
              </>
            }
            lede={aiWorkflowLine}
          />
          <div className="mt-6">
            <AiToolChips />
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-[28px] border border-line bg-surface p-6">
                <p className="font-display text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading eyebrow="FAQ" title="Before you write." />
        <div className="mt-8">
          <FaqList />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 md:pb-28">
        <div className="rounded-[32px] border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Hire me</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl leading-[0.95] font-bold tracking-tight text-fg sm:text-5xl">
            Tell me about the project.
          </h2>
          <p className="mt-4 max-w-xl text-muted">{availability}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => celebrateZoru()}
              className={primaryBtn}
            >
              Start a project
              <ArrowUpRight size={18} />
            </a>
            <Link to="/contact" className={secondaryBtn}>
              Contact page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
