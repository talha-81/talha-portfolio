import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getThemeSnapshot, saveTheme, subscribeTheme } from "../lib/theme.ts";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "dark" as const);
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-soft text-fg transition hover:border-accent hover:text-accent"
      data-mascot-tip="Switch between light and dark mode."
      aria-label={next === "light" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "light"}
      onClick={() => saveTheme(next)}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
