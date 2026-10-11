import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { roles } from "../data/content.ts";
import { EASE } from "../lib/motion.ts";

export function ExperienceList() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {roles.map((role, index) => {
        const expanded = open === index;
        const panelId = `role-panel-${index}`;
        return (
          <li key={role.title} className="border-b border-line">
            <button
              type="button"
              className="flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
              data-mascot-tip={`This role is ${role.title}. ${role.summary}.`}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="w-8 shrink-0 font-display text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-2xl leading-none font-semibold tracking-tight text-fg uppercase sm:text-4xl">
                  {role.title}
                </span>
                <span className="mt-2 block text-sm text-muted">{role.summary}</span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-fg">
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
                    <p className="text-sm text-muted">{role.meta}</p>
                    <ul className="mt-4 space-y-3">
                      {role.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
