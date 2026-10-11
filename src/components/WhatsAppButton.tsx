import { MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { whatsappHref, whatsappNumber } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";

export function WhatsAppButton() {
  return createPortal(
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => celebrateZoru()}
      aria-label={`Start a project on WhatsApp ${whatsappNumber}`}
      className="pointer-events-auto fixed bottom-4 left-4 z-40 inline-flex max-w-[calc(100vw-7.5rem)] items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-ink shadow-[var(--shadow)] transition hover:-translate-y-0.5"
    >
      <MessageCircle size={18} aria-hidden="true" />
      <span className="min-w-0">
        <span className="block leading-none">WhatsApp</span>
        <span className="mt-1 hidden text-[11px] font-medium tracking-wide sm:block">{whatsappNumber}</span>
      </span>
    </a>,
    document.body,
  );
}
