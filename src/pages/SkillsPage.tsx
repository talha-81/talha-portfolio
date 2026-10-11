import { Link } from "react-router";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { aiWorkflowLine, availability, skillGroups, whatsappHref } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function SkillsPage() {
  useDocumentTitle("Skills — Talha Arshad");

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Skills</p>
      <h1 className="mt-3 max-w-4xl font-display text-[clamp(3rem,7vw,5.4rem)] leading-[0.9] font-bold tracking-tighter text-fg">
        The stack behind <span className="text-stroke">the work</span>
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Grouped from the technologies in the projects, the public repositories, and the systems on this site. No proficiency scores.
      </p>
      <p className="mt-4 text-sm font-medium text-fg">{aiWorkflowLine}</p>
      <p className="mt-2 text-sm text-muted">{availability}</p>

      <section className="mt-10 rounded-[28px] border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">AI-accelerated workflow</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          These tools are part of how I build. They are listed as names, not as a claim about speed in hours or days.
        </p>
        <div className="mt-4">
          <AiToolChips label="AI-accelerated workflow tools" />
        </div>
      </section>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.title} className="rounded-[28px] border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{group.title}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line bg-soft px-3 py-1.5 text-sm text-fg transition hover:border-accent hover:text-accent"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => celebrateZoru()}
          className={primaryBtn}
        >
          Start a project
        </a>
        <Link to="/projects" className={secondaryBtn}>
          See the projects
        </Link>
      </div>
    </div>
  );
}
