import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { groupById, type Project } from "../data/projects.ts";

export function ProjectCard({ project }: { project: Project }) {
  const group = groupById(project.group);

  return (
    <article className="h-full">
      <Link
        to={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-accent/50"
      >
        <ProjectCover project={project} />
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">{group.title}</p>
          <h3 className="mt-2 font-display text-2xl leading-tight font-semibold tracking-tight text-fg">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition group-hover:text-accent">
            View project
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ProjectCover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <div className="relative h-44 overflow-hidden border-b border-line">
        <img src={project.cover} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-44 overflow-hidden border-b border-line bg-soft">
      <div
        aria-hidden="true"
        className="absolute -top-8 -right-8 h-36 w-36 rounded-full bg-accent/20 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <p className="absolute bottom-5 left-5 font-display text-5xl font-semibold tracking-tighter text-accent/80">
        {project.title.slice(0, 1)}
      </p>
    </div>
  );
}
