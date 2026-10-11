import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { whatsappHref, whatsappNumber } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";

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
  const [notice, setNotice] = useState<"copied" | "failed" | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const menuId = useId();

  if (open && openPath !== pathname) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useLayoutEffect(() => {
    if (!open) return;
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
      menu.style.left = `${left}px`;
      if (openAbove) {
        menu.style.top = "auto";
        menu.style.bottom = `${window.innerHeight - rect.top + 8}px`;
      } else {
        menu.style.bottom = "auto";
        menu.style.top = `${rect.bottom + 8}px`;
      }
    }

    place();
    const first = menu.querySelector("button");
    first?.focus();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, prefer]);

  useLayoutEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openChat() {
    celebrateZoru();
    setOpen(false);
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  function markCopied() {
    setNotice("copied");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNotice(null), 1600);
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

  function copyNumber() {
    celebrateZoru();
    const finish = (ok: boolean) => {
      if (ok) markCopied();
      else setNotice("failed");
    };
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(whatsappNumber).then(
        () => finish(true),
        () => finish(copyWithFallback(whatsappNumber)),
      );
      return;
    }
    finish(copyWithFallback(whatsappNumber));
  }

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="WhatsApp"
          className="fixed z-[60] w-56 rounded-2xl border border-line bg-surface p-1.5 shadow-[var(--shadow)]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={openChat}
            className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-fg hover:bg-soft"
          >
            Open WhatsApp chat
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={copyNumber}
            className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-fg hover:bg-soft"
          >
            {notice === "copied" ? "Number copied" : notice === "failed" ? "Could not copy" : "Copy number"}
          </button>
        </div>,
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
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => {
          setOpenPath(pathname);
          setNotice(null);
          setOpen((value) => !value);
        }}
      >
        {typeof children === "function" ? children({ open }) : children}
      </button>
      {menu}
    </>
  );
}
