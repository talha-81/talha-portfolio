import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { menuLinks, navLinks } from "../data/content.ts";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((node): node is Element => node instanceof Element);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 h-24 border-b transition-colors ${
        scrolled || open
          ? "border-white/10 bg-[#0f1115]/80 backdrop-blur-md"
          : "border-transparent bg-[#0f1115]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-display text-sm font-bold tracking-[0.28em] text-white sm:text-base"
        >
          TALHA
          <span className="text-[#00df8f]">.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-[0.18em] uppercase transition-colors hover:text-[#00df8f] ${
                active === link.href ? "text-[#00df8f]" : "text-gray-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <a
            href="#contact"
            aria-label="Go to contact"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#00df8f] shadow-[0_0_12px_#00df8f]" />
          </a>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-24 h-[calc(100vh-6rem)] overflow-y-auto bg-[#0d1116]/95 px-6 py-8 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col gap-6" aria-label="Mobile">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-semibold tracking-tight text-white"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
