import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { PageCta } from "../components/PageCta.tsx";
import { ProjectCard, ProjectCover, VisualCaption } from "../components/ProjectCard.tsx";
import { groupById, projectBySlug, projectsInGroup } from "../data/projects.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function ProjectPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  usePageMeta(
    project ? `${project.title} — Talha Arshad` : "Project not found — Talha Arshad",
    project?.summary ?? "That project is not on this site.",
  );

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Projects</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-fg">Project not found.</h1>
        <Link to="/projects" className={`${secondaryBtn} mt-8`}>
          Back to projects
        </Link>
      </div>
    );
  }

  const group = groupById(project.group);
  const related = projectsInGroup(project.group).filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
          <div className="min-w-0">
            <Link to="/projects" className="text-sm font-semibold text-muted hover:text-accent">
              All projects
            </Link>
            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-accent uppercase">{group.title}</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.92] font-bold tracking-tight text-balance text-fg">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{project.summary}</p>
          </div>
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[28px] border border-line shadow-[var(--shadow)]">
              <ProjectCover project={project} priority />
            </div>
            <VisualCaption project={project} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-20">
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">About this project</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>
          {project.note ? <p className="mt-4 text-sm text-muted">{project.note}</p> : null}
        </div>
        <aside className="gradient-ring h-fit rounded-[28px] p-6">
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
        <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
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

      <PageCta title="Want something in this direction?" />
    </article>
  );
}
