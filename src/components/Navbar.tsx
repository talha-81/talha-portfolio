import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { navLinks } from "../data/content.ts";
import { ThemeToggle } from "./ThemeToggle.tsx";

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(location.pathname);

  if (openPath !== location.pathname) {
    setOpenPath(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-header backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8 md:h-20">
        <Link to="/" className="shrink-0 font-display text-sm font-bold tracking-[0.2em] text-fg xl:text-base xl:tracking-[0.28em]">
          TALHA
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-3 xl:gap-5 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.end}
              className={({ isActive }) =>
                `relative py-1 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors hover:text-accent xl:text-xs xl:tracking-[0.14em] ${
                  isActive ? "text-accent" : "text-muted"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent" />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden min-h-11 items-center rounded-full bg-accent px-3 text-xs font-semibold text-accent-ink transition hover:-translate-y-0.5 sm:inline-flex xl:px-4 xl:text-sm"
          >
            <span className="xl:hidden">Start</span>
            <span className="hidden xl:inline">Start a project</span>
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] overflow-y-auto bg-ink px-6 py-8 md:top-20 md:h-[calc(100vh-5rem)] lg:hidden"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.end}
                className={({ isActive }) =>
                  `font-display text-4xl font-semibold tracking-tight ${isActive ? "text-accent" : "text-fg"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink"
          >
            Start a project
          </Link>
        </div>
      ) : null}
    </header>
  );
}
