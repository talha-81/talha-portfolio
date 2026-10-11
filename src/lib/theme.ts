export const THEME_KEY = "theme";

export type Theme = "light" | "dark";

const THEME_EVENT = "portfolio-theme";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function themeColor(theme: Theme) {
  return theme === "light" ? "#f4f6f3" : "#0d1116";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor(theme));
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function readTheme(): Theme {
  const current = document.documentElement.dataset.theme ?? null;
  if (isTheme(current)) return current;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onMedia = () => {
    if (isTheme(localStorage.getItem(THEME_KEY))) return;
    applyTheme(media.matches ? "light" : "dark");
  };
  media.addEventListener("change", onMedia);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    media.removeEventListener("change", onMedia);
  };
}

export function getThemeSnapshot(): Theme {
  return readTheme();
}
