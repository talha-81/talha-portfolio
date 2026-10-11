import { motion, useReducedMotion } from "framer-motion";
import { certifications } from "../data/content.ts";
import { Reveal } from "./Reveal.tsx";

export function Credentials() {
  const reduce = useReducedMotion();

  return (
    <section id="credentials" className="scroll-mt-28 pb-8">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.28em] text-[#00df8f] uppercase">
            Licenses & certifications
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Credentials
          </h2>
        </Reveal>
        <ul className="mt-8 border-t border-white/10">
          {certifications.map((item, index) => (
            <motion.li
              key={`${item.name}-${item.issuer}`}
              className="grid gap-1 border-b border-white/10 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
            >
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-1 text-sm text-[#9ca3af]">{item.issuer}</p>
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
                {item.date}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
