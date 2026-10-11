import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { whatsappHref, whatsappNumber } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { WhatsAppIcon } from "./BrandIcons.tsx";

const OPEN_EVENT = "wa-choice-open";

type WhatsAppChoiceProps = {
  className: string;
  children: ReactNode | ((state: { open: boolean }) => ReactNode);
  ariaLabel?: string;
  prefer?: "above" | "below";
};

export function WhatsAppChoice({
  className,
  children,
  ariaLabel,
  prefer = "below",
}: WhatsAppChoiceProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);
  const [toast, setToast] = useState<"copied" | "failed" | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const menuId = useId();
  const titleId = useId();

  if (open && openPath !== pathname) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onOther(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail !== menuId) setOpen(false);
    }
    window.addEventListener(OPEN_EVENT, onOther);
    return () => window.removeEventListener(OPEN_EVENT, onOther);
  }, [menuId]);

  useLayoutEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: menuId }));
    const button = buttonRef.current;
    const menu = menuRef.current;
    if (!button || !menu) return;

    function place() {
      if (!button || !menu) return;
      const rect = button.getBoundingClientRect();
      const width = menu.offsetWidth;
      const height = menu.offsetHeight;
      let left = rect.left;
      if (left + width > window.innerWidth - 8) left = window.innerWidth - width - 8;
      if (left < 8) left = 8;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openAbove = prefer === "above" || (spaceBelow < height + 12 && spaceAbove > spaceBelow);
      const top = openAbove ? rect.top - height - 8 : rect.bottom + 8;

      const zoru = document.querySelector("[data-mascot='zoru']");
      if (zoru) {
        const zoruBox = zoru.getBoundingClientRect();
        const overlaps =
          left < zoruBox.right &&
          left + width > zoruBox.left &&
          top < zoruBox.bottom &&
          top + height > zoruBox.top;
        if (overlaps) left = Math.max(8, zoruBox.left - width - 12);
      }

      menu.style.left = `${left}px`;
      menu.style.top = `${Math.max(8, top)}px`;
    }

    place();
    menu.querySelector<HTMLElement>("button")?.focus();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, prefer, menuId]);

  useEffect(() => {
    if (!open) return;

    function onPointer(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if ((event.key === "ArrowDown" || event.key === "ArrowUp") && menuRef.current) {
        event.preventDefault();
        const items = [...menuRef.current.querySelectorAll<HTMLElement>("button")];
        if (items.length === 0) return;
        const index = items.indexOf(document.activeElement as HTMLElement);
        const next = event.key === "ArrowDown" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
        items[next]?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const items = [...menuRef.current.querySelectorAll<HTMLElement>("button")];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !menuRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !menuRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function openChat() {
    celebrateZoru();
    setOpen(false);
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  function copyWithFallback(text: string) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.setAttribute("aria-hidden", "true");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.width = "1px";
    area.style.height = "1px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }

  function showCopied(ok: boolean) {
    setToast(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 1800);
    menuRef.current?.querySelector<HTMLElement>("[data-copy]")?.focus();
  }

  function copyNumber() {
    celebrateZoru();
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(whatsappNumber).then(
        () => showCopied(true),
        () => showCopied(copyWithFallback(whatsappNumber)),
      );
      return;
    }
    showCopied(copyWithFallback(whatsappNumber));
  }

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-whatsapp-popover=""
          className="fixed z-[70] w-[min(16.5rem,calc(100vw-1rem))] rounded-2xl border border-line bg-surface p-2 text-fg shadow-[var(--shadow)]"
        >
          <p id={titleId} className="px-2 pt-1 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            WhatsApp
          </p>
          <p className="px-2 pt-1 pb-2 font-display text-xl font-semibold tracking-tight text-accent">{whatsappNumber}</p>
          <button
            type="button"
            onClick={openChat}
            className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold text-fg hover:bg-soft"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            Open WhatsApp
          </button>
          <button
            type="button"
            data-copy=""
            onClick={copyNumber}
            className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-fg hover:bg-soft"
          >
            Copy number
          </button>
        </div>,
        document.body,
      )
    : null;

  const toastNode = toast
    ? createPortal(
        <p
          role="status"
          className="fixed top-24 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow-[var(--shadow)]"
        >
          {toast === "copied" ? "Copied!" : "Could not copy"}
        </p>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={className}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => {
          setOpenPath(pathname);
          setOpen((value) => !value);
        }}
      >
        {typeof children === "function" ? children({ open }) : children}
      </button>
      {menu}
      {toastNode}
    </>
  );
}
