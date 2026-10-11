import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { projectBySlug } from "../data/projects.ts";
import { ZORU_CELEBRATE_EVENT } from "../lib/mascot.ts";
import { EASE } from "../lib/motion.ts";
import { useFineHover } from "../lib/useFineHover.ts";

const TIPS = {
  home: "Talha builds web apps, management systems, and AI products. Available worldwide, remote, 24/7.",
  about: "Five-plus years building software for clients. Remote work, across time zones.",
  projects: "Web systems, AI products, and machine-learning work. Open a card for the details.",
  ai: "Chatbots, MCP tools, voice agents, and automation, built for client products.",
  skills: "Claude, ChatGPT, Cursor, and Codex speed up delivery. The engineering still gets a review.",
  services: "Web systems, chatbots, voice agents, vision, and automation. Tell me which one you need.",
  contact: "Available worldwide, remote, 24/7. Use WhatsApp or Email to start a project.",
  faq: "WhatsApp or Email starts a project. Available worldwide, remote, 24/7.",
} as const;

function tipFor(pathname: string) {
  if (pathname.startsWith("/projects/")) {
    const project = projectBySlug(pathname.split("/")[2]);
    return project?.summary ?? TIPS.projects;
  }
  if (pathname === "/about") return TIPS.about;
  if (pathname === "/projects") return TIPS.projects;
  if (pathname === "/ai") return TIPS.ai;
  if (pathname === "/skills") return TIPS.skills;
  if (pathname === "/services") return TIPS.services;
  if (pathname === "/contact") return TIPS.contact;
  if (pathname === "/faq") return TIPS.faq;
  return TIPS.home;
}

export function ZoruMascot() {
  const reduce = useReducedMotion();
  const fineHover = useFineHover();
  const { pathname } = useLocation();
  const controls = useAnimation();
  const tipId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [suppressHover, setSuppressHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const tip = tipFor(pathname);
  const open = pinned || (fineHover && hovering && !suppressHover);

  useEffect(() => {
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
  }, [controls, reduce]);

  useEffect(() => {
    const onCelebrate = () => {
      if (reduce) return;
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
  }, [controls, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPinned(false);
      setSuppressHover(true);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onClick() {
    if (open) {
      setPinned(false);
      setSuppressHover(true);
      return;
    }
    setPinned(true);
    setSuppressHover(false);
  }

  return createPortal(
    <div
      data-mascot="zoru"
      data-reduced={reduce ? "true" : "false"}
      className="pointer-events-none fixed right-3 bottom-3 z-40 md:right-5 md:bottom-5"
    >
      <div className="relative">
        <AnimatePresence>
          {open ? (
            <motion.div
              id={tipId}
              role="tooltip"
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="pointer-events-none absolute right-0 bottom-full mb-3 w-[min(16rem,calc(100vw-7.5rem))] rounded-2xl border border-line bg-surface p-3 text-left shadow-[var(--shadow)]"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">Zoru</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg">{tip}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.82, y: 22 }} animate={controls}>
          <motion.div
            animate={reduce || paused ? { y: 0, scale: 1 } : { y: [0, -8, 0], scale: [1, 1.03, 1] }}
            transition={
              reduce || paused
                ? { duration: 0 }
                : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.55 }
            }
          >
            <motion.button
              ref={buttonRef}
              type="button"
              className="pointer-events-auto block cursor-pointer rounded-full"
              aria-expanded={open}
              aria-describedby={open ? tipId : undefined}
              aria-label={open ? "Close the tip" : "Show the tip"}
              whileHover={reduce || !fineHover ? undefined : { rotate: [0, -7, 6, -2, 0] }}
              transition={{ duration: 0.42 }}
              onMouseEnter={() => {
                if (!fineHover) return;
                setHovering(true);
                setSuppressHover(false);
              }}
              onMouseLeave={() => {
                setHovering(false);
                setSuppressHover(false);
              }}
              onClick={onClick}
            >
              <picture>
                <source srcSet="/mascot/zoru-chibi-512.webp" type="image/webp" />
                <img
                  src="/mascot/zoru-chibi.png"
                  alt="Zoru, a chibi swordsman with green hair"
                  width={323}
                  height={512}
                  draggable={false}
                  className="zoru-shadow h-20 w-auto select-none md:h-[132px]"
                />
              </picture>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>,
    document.body,
  );
}
