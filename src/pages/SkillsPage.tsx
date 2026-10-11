import { useReducedMotion } from "framer-motion";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { Marquee } from "../components/Marquee.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { SpotlightCard } from "../components/SpotlightCard.tsx";
import { aiTools, aiWorkflowLine, availability, skillGroups } from "../data/content.ts";
import { skillTip } from "../data/mascotTips.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

const inner = ["React", "TypeScript", "Python", "FastAPI", ".NET", "SQL"];
const outer = ["MCP", "OpenCV", "n8n", "Docker", "Tableau", "Keras", "Flask", "Git"];

function Ring({
  items,
  radius,
  reverse = false,
  spin,
}: {
  items: readonly string[];
  radius: number;
  reverse?: boolean;
  spin: boolean;
}) {
  return (
    <div className={`absolute inset-0 ${spin ? (reverse ? "orbit-spin-rev" : "orbit-spin") : ""}`}>
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={item}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
            }}
          >
            <span className={`inline-block ${spin ? (reverse ? "counter-spin-rev" : "counter-spin") : ""}`}>
              <span className="inline-flex rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-fg shadow-[var(--shadow)] sm:text-xs">
                {item}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

function OrbitCloud() {
  const reduce = useReducedMotion();
  const spin = reduce === false;

  if (!spin) {
    return (
      <ul className="flex flex-wrap justify-center gap-2">
        {[...inner, ...outer].map((item) => (
          <li key={item} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-fg">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div className="absolute inset-[18%] rounded-full border border-dashed border-accent/40" />
      <div className="absolute inset-[34%] rounded-full border border-dashed border-line" />
      <div className="absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-center font-display text-sm font-semibold text-accent-ink">
        Stack
      </div>
      <Ring items={inner} radius={28} spin={spin} />
      <Ring items={outer} radius={42} reverse spin={spin} />
    </div>
  );
}

export function SkillsPage() {
  usePageMeta(
    "Skills — Talha Arshad",
    "Frontend, backend, AI agents, computer vision, data, and delivery tools used in Talha Arshad's projects. No proficiency scores.",
  );
  const names = skillGroups.flatMap((group) => [...group.skills]);
  const rowA = names.filter((_, index) => index % 2 === 0);
  const rowB = names.filter((_, index) => index % 2 === 1);

  return (
    <>
      <PageHero
        eyebrow="Skills"
        title={
          <>
            The stack behind <span className="text-stroke">the work</span>
            <span className="text-accent">.</span>
          </>
        }
        lede={
          <>
            <p>
              Grouped from the technologies in the projects, the public repositories, and the systems on this site. No proficiency scores.
            </p>
            <p className="mt-3 text-sm font-medium text-fg">{aiWorkflowLine}</p>
            <p className="mt-2 text-sm text-muted">{availability}</p>
          </>
        }
        visual={<OrbitCloud />}
      />

      <section className="border-b border-line py-8">
        <div className="space-y-3">
          <Marquee items={rowA} />
          <Marquee items={[...aiTools]} reverse />
          <Marquee items={rowB} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <SpotlightCard key={group.title} className="p-6 sm:p-8" tip={`The ${group.title.toLowerCase()} tools I work with.`}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{group.title}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    tabIndex={0}
                    data-mascot-tip={skillTip(skill)}
                    className="rounded-full border border-line bg-soft px-3 py-1.5 text-sm text-fg outline-none transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>

        <div className="gradient-ring mt-8 rounded-[28px] p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">AI-accelerated workflow</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            These tools are part of how I build. They are listed as names, not as a claim about speed in hours or days.
          </p>
          <div className="mt-4">
            <AiToolChips label="AI-accelerated workflow tools" />
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
