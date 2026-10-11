import {
  AnimatePresence,
  motion,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { EASE } from "../lib/motion.ts";
import { ZORU_CELEBRATE_EVENT } from "../lib/mascot.ts";

const STORAGE_KEY = "zoru-mascot-hidden";

const TIPS = {
  hero: "Talha builds scalable web apps and works part-time at Nayel Solutions.",
  skills: "Python, React, FastAPI, SQL, and the other tools in Talha's toolkit.",
  projects: "Click the front card to cycle Talha's stack. The final-year repo is private.",
  experience: "Nayel is part-time since May 2021. Talha's Petalnex junior role was full-time.",
  credentials: "Forage, Coursera, and IBM certificates, with the dates from Talha's LinkedIn.",
  contact: "GitHub and LinkedIn are the only ways to reach Talha from this page.",
} as const;

type TipKey = keyof typeof TIPS;

const SECTION_TIPS: { id: string; tip: TipKey }[] = [
  { id: "top", tip: "hero" },
  { id: "about", tip: "skills" },
  { id: "work", tip: "projects" },
  { id: "experience", tip: "experience" },
  { id: "credentials", tip: "credentials" },
  { id: "contact", tip: "contact" },
];

export function ZoruMascot() {
  const reduce = useReducedMotion();
  const controls = useAnimation();
  const tipId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(
    () => window.localStorage.getItem(STORAGE_KEY) === "1",
  );
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState<TipKey>("hero");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (hidden) return;
    if (reduce) {
      void controls.set({ opacity: 1, y: 0, scale: 1, rotate: 0 });
      return;
    }
    void controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 460, damping: 14 },
    });
  }, [controls, hidden, reduce]);

  useEffect(() => {
    const nodes = SECTION_TIPS.map(({ id }) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    );
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        const match = SECTION_TIPS.find((section) => section.id === bestId);
        if (match && bestRatio > 0) setTip(match.tip);
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onCelebrate = () => {
      if (hidden || reduce) return;
      setPaused(true);
      void controls
        .start({
          opacity: 1,
          y: [0, -46, 0],
          rotate: [0, -8, 6, 0],
          scale: [1, 1.08, 1],
          transition: { duration: 0.55, ease: EASE },
        })
        .then(() => setPaused(false));
    };
    window.addEventListener(ZORU_CELEBRATE_EVENT, onCelebrate);
    return () => window.removeEventListener(ZORU_CELEBRATE_EVENT, onCelebrate);
  }, [controls, hidden, reduce]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function persistHidden(next: boolean) {
    setHidden(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    if (next) setOpen(false);
  }

  return (
    <div
      data-mascot="zoru"
      data-reduced={reduce ? "true" : "false"}
      className="pointer-events-none fixed right-3 bottom-3 z-40 flex items-end gap-2 md:right-6 md:bottom-5"
    >
      <button
        type="button"
        className="pointer-events-auto mb-1 rounded-full border border-white/15 bg-[#14181f]/90 px-3 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md hover:border-[#00df8f] hover:text-[#00df8f]"
        aria-pressed={!hidden}
        aria-label={hidden ? "Show Zoru" : "Hide Zoru"}
        onClick={() => persistHidden(!hidden)}
      >
        {hidden ? "Show Zoru" : "Hide Zoru"}
      </button>

      {hidden ? null : (
        <div className="relative">
          <AnimatePresence>
            {open ? (
              <motion.div
                id={tipId}
                role="dialog"
                aria-labelledby={`${tipId}-label`}
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="pointer-events-auto absolute right-0 bottom-full mb-3 w-56 rounded-2xl border border-white/10 bg-[#14181f] p-3 text-left shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
              >
                <p
                  id={`${tipId}-label`}
                  className="text-[11px] font-semibold tracking-[0.18em] text-[#00df8f] uppercase"
                >
                  Zoru
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white" aria-live="polite">
                  {TIPS[tip]}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  className="mt-3 text-xs font-semibold text-[#9ca3af] hover:text-[#00df8f]"
                  onClick={() => {
                    setOpen(false);
                    buttonRef.current?.focus();
                  }}
                >
                  Close tip
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.82, y: 22 }}
            animate={controls}
          >
            <motion.div
              animate={
                reduce || paused
                  ? { y: 0, scale: 1 }
                  : { y: [0, -8, 0], scale: [1, 1.03, 1] }
              }
              transition={
                reduce || paused
                  ? { duration: 0 }
                  : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.55 }
              }
            >
              <motion.button
                ref={buttonRef}
                type="button"
                className="pointer-events-auto block cursor-pointer"
                aria-expanded={open}
                aria-controls={tipId}
                aria-label={open ? "Hide Zoru's tip" : "Show Zoru's tip for this section"}
                whileHover={reduce ? undefined : { rotate: [0, -7, 6, -2, 0] }}
                transition={{ duration: 0.42 }}
                onClick={() => setOpen((value) => !value)}
              >
                <picture>
                  <source srcSet="/mascot/zoru-chibi-512.webp" type="image/webp" />
                  <img
                    src="/mascot/zoru-chibi.png"
                    alt="Zoru, a chibi swordsman with green hair"
                    width={323}
                    height={512}
                    draggable={false}
                    className="h-20 w-auto drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)] select-none md:h-[132px]"
                  />
                </picture>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
