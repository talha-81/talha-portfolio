import { ProjectCard } from "../components/ProjectCard.tsx";
import { groups, projectsInGroup } from "../data/projects.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function ProjectsPage() {
  useDocumentTitle("Projects — Talha Arshad");

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Projects</p>
      <h1 className="mt-3 max-w-3xl font-display text-[clamp(3rem,7vw,5.4rem)] leading-[0.9] font-bold tracking-tighter text-fg">
        Work you can <span className="text-stroke">open</span>
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Web systems, AI products, machine learning, and data work. Public repositories are linked on the project page. Client systems are not.
      </p>

      <div className="mt-16 space-y-16">
        {groups.map((group) => (
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
    </div>
  );
}
