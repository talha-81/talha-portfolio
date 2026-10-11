import { aiTools } from "../data/content.ts";

export function AiToolChips({ label = "AI tools" }: { label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {aiTools.map((tool) => (
        <li
          key={tool}
          className="rounded-full border border-line bg-soft px-3 py-1.5 text-sm font-medium text-fg"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}
