import { Link } from "react-router";
import { secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function NotFoundPage() {
  useDocumentTitle("Page not found — Talha Arshad");

  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-fg">That page is not here.</h1>
      <Link to="/" className={`${secondaryBtn} mt-8`}>
        Back home
      </Link>
    </div>
  );
}
