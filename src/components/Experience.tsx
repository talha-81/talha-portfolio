import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { roles } from "../data/content.ts";
import { EASE } from "../lib/motion.ts";
import { Reveal } from "./Reveal.tsx";

export function Experience() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.28em] text-[#00df8f] uppercase">
            Path
          </p>
          <h2 className="mt-4 text-center font-display text-4xl leading-[0.9] font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl">
            PROFESSIONAL
            <span className="block">
              <span className="text-stroke">EXPERIENCE</span>
              <span className="text-[#00df8f]">.</span>
            </span>
          </h2>
        </Reveal>

        <ul className="mt-14 border-t border-white/10">
          {roles.map((role, index) => {
            const expanded = open === index;
            const panelId = `role-panel-${index}`;
            return (
              <motion.li
                key={role.summary}
                className="border-b border-white/10"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: EASE }}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="w-8 shrink-0 font-display text-sm font-semibold text-[#00df8f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl leading-none font-semibold tracking-tight text-white uppercase sm:text-4xl">
                      {role.title}
                    </span>
                    <span className="mt-2 block text-sm text-[#9ca3af]">
                      {role.summary}
                    </span>
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white">
                    {expanded ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pr-2 pb-8 pl-12 sm:pr-16">
                        <p className="text-white">
                          {role.orgHref ? (
                            <a
                              href={role.orgHref}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="underline decoration-white/20 underline-offset-4 hover:text-[#00df8f]"
                            >
                              {role.org}
                            </a>
                          ) : (
                            role.org
                          )}
                        </p>
                        <p className="mt-1 text-sm text-[#9ca3af]">{role.meta}</p>
                        {role.note ? (
                          <p className="mt-3 text-sm text-white/80">{role.note}</p>
                        ) : null}
                        <ul className="mt-4 space-y-3">
                          {role.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-3 text-sm leading-relaxed text-[#9ca3af]"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00df8f]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
