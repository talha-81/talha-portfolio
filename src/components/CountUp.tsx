import { useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduce !== false) return;

    const match = /^(\d+)(.*)$/.exec(value);
    if (!match) {
      node.textContent = value;
      return;
    }

    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - progress) ** 3;
      node.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, value]);

  return <span ref={ref}>{value}</span>;
}
