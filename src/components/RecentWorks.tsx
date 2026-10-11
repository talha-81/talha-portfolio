import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import {
  coursework,
  moreWork,
  profile,
  projects,
  type ListedWork,
} from "../data/content.ts";
import { EASE } from "../lib/motion.ts";
import { Reveal } from "./Reveal.tsx";

function WorkRow({ item }: { item: ListedWork }) {
  return (
    <li className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-4">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00df8f] uppercase">
          {item.meta}
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
          {item.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-[#9ca3af] md:col-span-6">
        {item.description}
      </p>
      <div className="md:col-span-2 md:text-right">
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#00df8f]"
          >
            {item.hrefLabel ?? "Repository"}
            <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className="text-sm text-white/40">No public link</span>
        )}
      </div>
    </li>
  );
}

export function RecentWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = projects[active];
  const count = projects.length;

  if (!project) return null;

  const show = (index: number) => {
    if (index === active) {
      setActive((index + 1) % count);
      return;
    }
    setActive(index);
  };

  return (
    <section id="work" className="scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[#00df8f] uppercase">
                Work
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[0.9] font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl">
                SELECTED
                <span className="block">
                  <span className="text-stroke">WORK</span>
                  <span className="text-[#00df8f]">.</span>
                </span>
              </h2>
            </div>
            <a
              href={profile.repos}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#00df8f] hover:text-[#00df8f]"
            >
              View All Projects
              <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div
              className="relative h-[400px] sm:h-[516px] md:h-[548px]"
              style={{ perspective: 1200 }}
            >
              {projects.map((item, index) => {
                const diff = (index - active + count) % count;
                const depth = Math.min(diff, 3);
                return (
                  <motion.div
                    key={item.title}
                    className="absolute inset-x-0 top-0 h-[288px] sm:h-[400px] md:h-[432px]"
                    style={{ zIndex: count - diff, transformOrigin: "center top" }}
                    animate={{
                      y: depth * 35,
                      scale: 1 - depth * 0.05,
                      rotateX: depth * 2,
                      opacity: diff > 3 ? 0 : 1,
                    }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => show(index)}
                      className={`relative h-full w-full overflow-hidden rounded-[28px] border text-left ${
                        diff === 0
                          ? "border-[#00df8f]/40"
                          : "border-white/10"
                      }`}
                      aria-label={
                        diff === 0
                          ? `Show the next project after ${item.title}`
                          : `Show ${item.title}`
                      }
                    >
                      <img
                        src={item.cover}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1116] via-[#0d1116]/25 to-[#0d1116]/30" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00df8f] uppercase">
                          {item.category}
                        </p>
                        <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Projects">
                {projects.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Show ${item.title}`}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === active
                        ? "w-7 bg-[#00df8f]"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => setActive((index) => (index - 1 + count) % count)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white hover:border-[#00df8f] hover:text-[#00df8f]"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => setActive((index) => (index + 1) % count)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white hover:border-[#00df8f] hover:text-[#00df8f]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <p className="sr-only" aria-live="polite">
              {project.title}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="text-xs font-semibold tracking-[0.28em] text-[#00df8f] uppercase">
                  {project.category}
                </p>
                <h3 className="mt-3 font-display text-4xl leading-[0.95] font-semibold tracking-tight text-white sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-[#9ca3af]">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium tracking-wide text-gray-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0d1116] transition-transform hover:scale-105"
                    >
                      {link.label}
                      <ArrowUpRight size={16} />
                    </a>
                  ))}
                  {project.note ? (
                    <p className="inline-flex items-center gap-2 text-sm text-white/55">
                      <Lock size={15} />
                      {project.note}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="font-display text-sm font-semibold tracking-[0.28em] text-white/70 uppercase">
            More repositories
          </h3>
          <ul className="mt-4 border-t border-white/10">
            {moreWork.map((item) => (
              <WorkRow key={item.title} item={item} />
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-sm font-semibold tracking-[0.28em] text-white/70 uppercase">
            Coursework
          </h3>
          <ul className="mt-4 border-t border-white/10">
            {coursework.map((item) => (
              <WorkRow key={item.title} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
