import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { startProjectTip } from "../data/mascotTips.ts";
import { scrollToContactForm } from "../lib/scrollToContactForm.ts";

export function StartProjectLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();

  return (
    <Link
      to="/contact#contact-form"
      data-mascot-tip={startProjectTip}
      className={className}
      onClick={() => {
        if (pathname === "/contact" && hash === "#contact-form") {
          scrollToContactForm(Boolean(reduce));
        }
      }}
    >
      {children}
    </Link>
  );
}
