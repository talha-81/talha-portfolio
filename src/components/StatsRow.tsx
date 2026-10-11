import { stats } from "../data/stats.ts";
import { CountUp } from "./CountUp.tsx";

type Stat = {
  value: string;
  label: string;
};

export function StatsRow({ className = "" }: { className?: string }) {
  const items: Stat[] = [
    { value: stats.yearsExperience, label: "Years of experience" },
    { value: String(stats.projectsDelivered), label: "Projects delivered" },
  ];

  if (stats.satisfiedClients != null) {
    items.push({ value: String(stats.satisfiedClients), label: "Satisfied clients" });
  }

  return (
    <dl className={`grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 ${items.length > 2 ? "lg:grid-cols-3" : ""} ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="bg-surface px-5 py-5 sm:px-6">
          <dt className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{item.label}</dt>
          <dd className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            <CountUp value={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
