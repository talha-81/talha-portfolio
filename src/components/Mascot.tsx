import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { postBySlug } from "../data/blog.ts";
import { sectionTips } from "../data/mascotTips.ts";
import { projectBySlug } from "../data/projects.ts";
import { MASCOT_CELEBRATE_EVENT, MASCOT_TIP_EVENT } from "../lib/mascot.ts";
import { EASE } from "../lib/motion.ts";
import { useFineHover } from "../lib/useFineHover.ts";

type ActiveTip = { text: string; node: HTMLElement };

function sectionTip(pathname: string) {
  if (pathname.startsWith("/projects/")) {
    const project = projectBySlug(pathname.split("/")[2]);
    return project ? `This is one of mine. ${project.summary}` : sectionTips.projects;
  }
  if (pathname === "/about") return sectionTips.about;
  if (pathname === "/services") return sectionTips.services;
  if (pathname === "/projects") return sectionTips.projects;
  if (pathname === "/ai") return sectionTips.ai;
  if (pathname === "/skills") return sectionTips.skills;
  if (pathname === "/contact") return sectionTips.contact;
  if (pathname === "/faq") return sectionTips.faq;
  if (pathname === "/blog") return sectionTips.blog;
  if (pathname.startsWith("/blog/")) {
    const post = postBySlug(pathname.split("/")[2]);
    return post ? `A note on ${post.title}.` : sectionTips.blog;
  }
  if (pathname === "/") return sectionTips.home;
  return sectionTips.missing;
}

function closestTip(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  if (target.closest("[data-mascot]")) return null;
  return target.closest<HTMLElement>("[data-mascot-tip]");
}

export function Mascot() {
  const reduce = useReducedMotion();
  const fineHover = useFineHover();
  const { pathname } = useLocation();
  const controls = useAnimation();
  const look = useAnimation();
  const tipId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const showTimer = useRef(0);
  const hideTimer = useRef(0);
  const glanceRef = useRef<(node: HTMLElement) => void>(() => {});
  const [pinned, setPinned] = useState(false);
  const [mascotHover, setMascotHover] = useState(false);
  const [suppressHover, setSuppressHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<ActiveTip | null>(null);
  const [forcedTip, setForcedTip] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [bubbleBox, setBubbleBox] = useState<{ left: number; top: number } | null>(null);
  const section = sectionTip(pathname);
  const showingSection = pinned || (fineHover && mascotHover && !suppressHover);
  const text = active?.text ?? forcedTip ?? (showingSection ? section : null);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setActive(null);
    setPinned(false);
    setForcedTip(null);
  }

  useEffect(() => {
    glanceRef.current = (node: HTMLElement) => {
      if (reduce) {
        void look.set({ rotate: 0, x: 0 });
        return;
      }
      const mascot = buttonRef.current?.getBoundingClientRect();
      if (!mascot) return;
      const target = node.getBoundingClientRect();
      const dx = target.left + target.width / 2 - (mascot.left + mascot.width / 2);
      const dy = target.top + target.height / 2 - (mascot.top + mascot.height / 2);
      const lean = Math.max(-18, Math.min(14, dx / 36));
      const nod = dy < -40 ? -7 : 5;
      void look.start({
        rotate: [0, lean * 0.35, lean + nod, lean],
        x: Math.max(-14, Math.min(8, dx / 70)),
        transition: { duration: 0.48, ease: EASE },
      });
    };
  }, [look, reduce]);

  useEffect(() => {
    function canHover() {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    function showTip(node: HTMLElement, delay = 120) {
      const next = node.getAttribute("data-mascot-tip");
      if (!next) return;
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(showTimer.current);
      showTimer.current = window.setTimeout(() => {
        setActive({ text: next, node });
        glanceRef.current(node);
      }, delay);
    }
    function clearTip() {
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setActive(null), 280);
    }
    function onOver(event: PointerEvent) {
      if (!canHover() || event.pointerType === "touch") return;
      const node = closestTip(event.target);
      if (!node) return;
      showTip(node);
    }
    function onOut(event: PointerEvent) {
      if (!canHover() || event.pointerType === "touch") return;
      const node = closestTip(event.target);
      if (!node) return;
      if (event.relatedTarget instanceof Node && node.contains(event.relatedTarget)) return;
      clearTip();
    }
    function onFocusIn(event: FocusEvent) {
      const node = closestTip(event.target);
      if (!node) return;
      showTip(node);
    }
    function onFocusOut(event: FocusEvent) {
      const node = closestTip(event.target);
      if (!node) return;
      if (event.relatedTarget instanceof Node && node.contains(event.relatedTarget)) return;
      clearTip();
    }
    function onPointerDown(event: PointerEvent) {
      if (canHover() && event.pointerType === "mouse") return;
      const node = closestTip(event.target);
      if (!node) return;
      const startX = event.clientX;
      const startY = event.clientY;
      const press = window.setTimeout(() => {
        window.clearTimeout(hideTimer.current);
        const next = node.getAttribute("data-mascot-tip");
        if (!next) return;
        setActive({ text: next, node });
        glanceRef.current(node);
        node.addEventListener(
          "click",
          (clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
          },
          { capture: true, once: true },
        );
      }, 480);
      const cancel = () => window.clearTimeout(press);
      const move = (moveEvent: PointerEvent) => {
        if (Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) > 12) cancel();
      };
      node.addEventListener("pointermove", move);
      node.addEventListener("pointerup", () => {
        cancel();
        node.removeEventListener("pointermove", move);
      }, { once: true });
      node.addEventListener("pointercancel", () => {
        cancel();
        node.removeEventListener("pointermove", move);
      }, { once: true });
    }

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("pointerdown", onPointerDown);
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (!text) return;
    const bubble = bubbleRef.current;
    const mascot = buttonRef.current;
    if (!bubble || !mascot) return;

    function place() {
      if (!bubble || !mascot) return;
      const mr = mascot.getBoundingClientRect();
      const width = bubble.offsetWidth;
      const height = bubble.offsetHeight;
      const target = active?.node.isConnected ? active.node.getBoundingClientRect() : null;
      let left = mr.right - width;
      let top = mr.top - height - 12;
      const hits = (x: number, y: number) =>
        Boolean(target && x < target.right && x + width > target.left && y < target.bottom && y + height > target.top);
      if (top < 8 || hits(left, top)) {
        left = mr.left - width - 12;
        top = Math.min(mr.bottom - height, window.innerHeight - height - 8);
      }
      if (hits(left, top) && target) {
        left = target.left + target.width / 2 - width / 2;
        top = target.top - height - 12;
        if (top < 8) top = target.bottom + 12;
      }
      left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - height - 8));
      setBubbleBox({ left, top });
    }

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [text, active]);

  useEffect(() => {
    if (!active) {
      void look.start({ rotate: 0, x: 0, transition: { duration: reduce ? 0 : 0.3, ease: EASE } });
    }
  }, [active, look, reduce]);

  useEffect(() => {
    // The portal mounts one commit after hydration. Starting the spring before
    // that leaves the mascot stuck on its initial opacity of 0.
    if (!mounted) return;
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
  }, [controls, mounted, reduce]);

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
    window.addEventListener(MASCOT_CELEBRATE_EVENT, onCelebrate);
    const onTip = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail) return;
      setForcedTip(detail);
      setPinned(true);
      setActive(null);
      setSuppressHover(false);
    };
    window.addEventListener(MASCOT_TIP_EVENT, onTip);
    return () => {
      window.removeEventListener(MASCOT_CELEBRATE_EVENT, onCelebrate);
      window.removeEventListener(MASCOT_TIP_EVENT, onTip);
    };
  }, [controls, reduce]);

  useEffect(() => {
    if (!text) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPinned(false);
      setActive(null);
      setForcedTip(null);
      setSuppressHover(true);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [text]);

  function onMascotClick() {
    if (text && !active) {
      setPinned(false);
      setForcedTip(null);
      setSuppressHover(true);
      return;
    }
    setActive(null);
    setPinned(true);
    setSuppressHover(false);
  }

  const bubble = (
    <AnimatePresence>
      {text ? (
        <motion.div
          key="mascot-tip"
          ref={bubbleRef}
          id={tipId}
          role="tooltip"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2, ease: EASE }}
          style={bubbleBox ? { left: bubbleBox.left, top: bubbleBox.top } : { left: -9999, top: 0 }}
          className="pointer-events-none fixed z-[45] w-[min(16rem,calc(100vw-7.5rem))] rounded-2xl border border-line bg-surface p-3 text-left shadow-[var(--shadow)]"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">Talha</p>
          <p className="mt-1.5 text-sm leading-relaxed text-fg">{text}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(
    <>
      {bubble}
      <div
        data-mascot="mascot"
        data-reduced={reduce ? "true" : "false"}
        className="pointer-events-none fixed right-3 bottom-3 z-40 md:right-5 md:bottom-5"
      >
        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.82, y: 22 }} animate={controls}>
          <motion.div animate={look}>
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
                aria-expanded={Boolean(text)}
                aria-describedby={text ? tipId : undefined}
                aria-label={text ? "Close the tip" : "Show Talha's tip"}
                whileHover={reduce || !fineHover ? undefined : { rotate: [0, -7, 6, -2, 0] }}
                transition={{ duration: 0.42 }}
                onMouseEnter={() => {
                  if (!fineHover) return;
                  setMascotHover(true);
                  setSuppressHover(false);
                }}
                onMouseLeave={() => {
                  setMascotHover(false);
                  setSuppressHover(false);
                }}
                onClick={onMascotClick}
              >
                <picture>
                  <source srcSet="/mascot/mascot-chibi-512.webp" type="image/webp" />
                  <img
                    src="/mascot/mascot-chibi.png"
                    alt="Talha Arshad illustrated as a chibi with green hair"
                    loading="lazy"
                    width={323}
                    height={512}
                    draggable={false}
                    className="mascot-shadow h-20 w-auto select-none md:h-[132px]"
                  />
                </picture>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>,
    document.body,
  );
}
