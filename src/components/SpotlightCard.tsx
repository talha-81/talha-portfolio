import type { MouseEvent, ReactNode } from "react";

function onSpotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function SpotlightCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`spotlight overflow-hidden rounded-[28px] border border-line bg-surface ${className}`}
      onMouseMove={onSpotlight}
    >
      {children}
    </div>
  );
}
