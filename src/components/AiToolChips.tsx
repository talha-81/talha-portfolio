import { aiTools } from "../data/content.ts";
import { toolTip } from "../data/mascotTips.ts";

export function AiToolChips({ label = "AI tools" }: { label?: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {aiTools.map((tool) => (
        <li
          key={tool}
          tabIndex={0}
          data-mascot-tip={toolTip(tool)}
          className="rounded-full border border-line bg-soft px-3 py-1.5 text-sm font-medium text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}
