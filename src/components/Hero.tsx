import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Avatar } from "./Avatar.tsx";

const facts = [
  { value: "Pakistan", label: "Based in" },
  { value: "Part-time", label: "Nayel Solutions" },
  { value: "2022–26", label: "Hazara University" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] leading-none font-bold tracking-tighter whitespace-nowrap text-white opacity-[0.035] select-none"
      >
        TALHA
      </p>
      <div className="pointer-events-none absolute top-1/3 right-[8%] h-72 w-72 rounded-full bg-[#00df8f]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-14 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:py-10">
        <div>
          <motion.p
            className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.28em] text-gray-200 uppercase"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00df8f] shadow-[0_0_10px_#00df8f]" />
            Software Engineer
          </motion.p>

          <motion.h1
            className="mt-6 font-display text-[clamp(2.7rem,8vw,6.4rem)] leading-[0.9] font-bold tracking-tighter text-white"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <span className="block">SCALABLE</span>
            <span className="block">
              <span className="text-stroke">SOLUTIONS</span>
              <span className="text-[#00df8f]">.</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-[#9ca3af] sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            I design and develop scalable web applications, from React
            interfaces to APIs, databases, and AI-driven features. I work
            part-time at Nayel Solutions and I am based in Pakistan.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00df8f] to-[#00b373] py-2.5 pr-2.5 pl-6 text-sm font-semibold text-[#06281c] shadow-[0_10px_30px_rgba(0,223,143,0.25)] transition-transform hover:scale-105"
            >
              View My Work
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#06281c]">
                <ArrowUpRight size={18} />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-[#14181f] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#00df8f]/60"
            >
              <span className="h-2 w-2 rounded-full bg-[#00df8f]" />
              Contact Me
            </a>
          </motion.div>

          <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
            {facts.map((fact) => (
              <div key={fact.label} className="px-2 first:pl-0 sm:px-4">
                <p className="font-display text-base font-semibold tracking-tight text-white sm:text-2xl">
                  {fact.value}
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-[0.16em] text-[#9ca3af] uppercase sm:text-xs">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={constraintsRef}
          className="relative flex min-h-[560px] items-center justify-center pt-16 lg:min-h-[520px] lg:pt-8"
        >
          <motion.div
            animate={
              reduce ? undefined : { y: [0, -15, 0], rotateZ: [-1, 1, -1] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <motion.div
              drag
              dragElastic={0.2}
              dragConstraints={constraintsRef}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              <div
                aria-hidden="true"
                className="absolute -top-36 left-1/2 h-36 w-5 -translate-x-1/2"
              >
                <div className="mx-auto h-full w-3 rounded-sm bg-gradient-to-b from-[#243041] via-[#1a222d] to-[#121820] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
                <div className="absolute bottom-0 left-1/2 h-5 w-9 -translate-x-1/2 rounded-[4px] border border-white/20 bg-[#1c2430]" />
              </div>

              <article className="relative h-[430px] w-[270px] overflow-hidden rounded-[28px] border border-white/10 bg-[#14181f] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:h-[480px] sm:w-[300px]">
                <div
                  aria-hidden="true"
                  className="absolute top-4 left-1/2 z-20 h-4 w-10 -translate-x-1/2 rounded-full border border-white/15 bg-[#0d1116]"
                />
                <Avatar />
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/85 to-transparent px-6 pt-24 pb-7">
                  <p className="font-display text-4xl font-semibold tracking-tight text-white">
                    Talha
                    <span className="text-[#00df8f]">.</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-white/75 uppercase">
                    Software Engineer
                  </p>
                </div>
              </article>
            </motion.div>
          </motion.div>
          <p className="absolute bottom-2 text-xs tracking-[0.18em] text-white/35 uppercase">
            Drag the badge
          </p>
        </div>
      </div>
    </section>
  );
}
