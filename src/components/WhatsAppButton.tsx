import { createPortal } from "react-dom";
import { whatsappHref } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { WhatsAppIcon } from "./BrandIcons.tsx";

export function WhatsAppButton() {
  return createPortal(
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => celebrateZoru()}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="group pointer-events-auto fixed bottom-4 left-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow)] transition hover:-translate-y-0.5"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 mb-2 hidden translate-y-1 rounded-full bg-surface px-3 py-1 text-xs font-semibold whitespace-nowrap text-fg opacity-0 shadow-[var(--shadow)] transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:block"
      >
        Chat on WhatsApp
      </span>
    </a>,
    document.body,
  );
}
