import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { ProjectCard, ProjectCover } from "../components/ProjectCard.tsx";
import { groupById, projectBySlug, projectsInGroup } from "../data/projects.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function ProjectPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  useDocumentTitle(project ? `${project.title} — Talha Arshad` : "Project — Talha Arshad");

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-fg">Project not found.</h1>
        <Link to="/projects" className={`${secondaryBtn} mt-6`}>
          Back to projects
        </Link>
      </div>
    );
  }

  const group = groupById(project.group);
  const related = projectsInGroup(project.group).filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <Link to="/projects" className="text-sm font-semibold text-muted hover:text-accent">
        All projects
      </Link>
      <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-accent uppercase">{group.title}</p>
      <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] font-bold tracking-tight text-fg">
        {project.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>

      <div className="mt-8 overflow-hidden rounded-[28px] border border-line">
        <ProjectCover project={project} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-fg">About this project</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>
          {project.note ? <p className="mt-4 text-sm text-muted">{project.note}</p> : null}
        </div>
        <aside className="h-fit rounded-[28px] border border-line bg-surface p-6">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Stack and links</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-fg">
                {tag}
              </li>
            ))}
          </ul>
          {project.links.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer noopener" className={primaryBtn}>
                    {link.label}
                    <ArrowUpRight size={16} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">More in {group.title}</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ProjectCard project={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
