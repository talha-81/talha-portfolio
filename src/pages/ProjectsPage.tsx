import { useState } from "react";
import { Marquee } from "../components/Marquee.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { ProjectCard, ProjectCover } from "../components/ProjectCard.tsx";
import { groups, homeProjects, projects, projectsInGroup, type GroupId } from "../data/projects.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

type Filter = "all" | GroupId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...groups.map((group) => ({ id: group.id, label: group.title })),
];

function ProjectStack() {
  const cards = homeProjects();
  const priorityIndex = cards.findIndex((project) => project.cover);
  return (
    <div className="relative mx-auto h-72 w-full max-w-md sm:h-80" aria-hidden="true">
      {cards.map((project, index) => (
        <div
          key={project.slug}
          className="absolute left-1/2 w-[82%] overflow-hidden rounded-[24px] border border-line bg-surface shadow-[var(--shadow)]"
          style={{
            top: `${index * 26}px`,
            zIndex: 10 - index,
            transform: `translateX(-50%) rotate(${index === 0 ? -7 : index === 1 ? 5 : -2}deg)`,
          }}
        >
          <ProjectCover project={project} priority={index === priorityIndex} />
        </div>
      ))}
    </div>
  );
}

export function ProjectsPage() {
  usePageMeta();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? groups : groups.filter((group) => group.id === filter);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Work you can <span className="text-stroke">open</span>
            <span className="text-accent">.</span>
          </>
        }
        lede={
          <p>
            Web systems, AI products, machine learning, and data work. Public repositories are linked on the project page. Client systems are not.
          </p>
        }
        visual={
          <div className="space-y-6">
            <ProjectStack />
            <Marquee items={projects.map((project) => project.title)} />
          </div>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                data-mascot-tip={item.id === "all" ? "Show every project." : `Show the ${item.label.toLowerCase()} projects.`}
                onClick={() => setFilter(item.id)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${
                  active ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-fg hover:border-accent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 space-y-16">
          {visible.map((group) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <h2 id={`group-${group.id}`} className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                {group.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{group.lede}</p>
              <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projectsInGroup(group.id).map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <PageCta title="Have a system like one of these?" />
    </>
  );
}
