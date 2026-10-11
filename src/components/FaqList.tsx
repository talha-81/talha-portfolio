import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/content.ts";
import { EASE } from "../lib/motion.ts";

export function FaqList() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {faqs.map((item, index) => {
        const expanded = open === index;
        const panelId = `faq-panel-${index}`;
        return (
          <li key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                data-mascot-tip={item.a}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span className="font-display text-xl font-semibold tracking-tight text-fg">{item.q}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line">
                  {expanded ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
