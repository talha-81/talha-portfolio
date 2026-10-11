import type { ReactNode } from "react";

export function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <ul className={`flex w-max gap-3 py-2 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {loop.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="gradient-ring rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-fg"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarqueeRow({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}
