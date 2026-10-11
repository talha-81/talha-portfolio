import { createPortal } from "react-dom";
import { WhatsAppIcon } from "./BrandIcons.tsx";
import { WhatsAppChoice } from "./WhatsAppChoice.tsx";

export function WhatsAppButton() {
  return createPortal(
    <WhatsAppChoice
      prefer="above"
      ariaLabel="Chat on WhatsApp"
      className="group pointer-events-auto fixed bottom-4 left-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow)] transition hover:-translate-y-0.5"
    >
      {({ open }) => (
        <>
          <WhatsAppIcon className="h-7 w-7" />
          {open ? null : (
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-0 mb-2 hidden translate-y-1 rounded-full bg-surface px-3 py-1 text-xs font-semibold whitespace-nowrap text-fg opacity-0 shadow-[var(--shadow)] transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:block"
            >
              Chat on WhatsApp
            </span>
          )}
        </>
      )}
    </WhatsAppChoice>,
    document.body,
  );
}
