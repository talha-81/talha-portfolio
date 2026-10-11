import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router";
import { projectTip } from "../data/mascotTips.ts";
import { groupById, type Project } from "../data/projects.ts";
import { ProjectArt } from "./ProjectArt.tsx";

function onSpotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function visualCaption(project: Project) {
  if (!project.cover) return "Illustration of the idea. Not a screenshot of client software.";
  if (project.slug === "vehicle-detection" || project.slug === "image-recognition-projects") {
    return "Sample image from the public repository. Not a client screenshot.";
  }
  return "Cover art. Not a screenshot of client software.";
}

export function VisualCaption({ project }: { project: Project }) {
  return <p className="mt-3 text-sm leading-relaxed text-muted">{visualCaption(project)}</p>;
}

export function ProjectCard({ project }: { project: Project }) {
  const group = groupById(project.group);

  return (
    <article className="h-full">
      <Link
        to={`/projects/${project.slug}`}
        data-mascot-tip={projectTip(project.summary)}
        onMouseMove={onSpotlight}
        className="spotlight group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-accent/50"
      >
        <ProjectCover project={project} />
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">{group.title}</p>
          <h3 className="mt-2 font-display text-2xl leading-tight font-semibold tracking-tight text-balance text-fg">
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

export function ProjectCover({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (project.cover) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-soft">
        <img
          src={project.cover}
          alt={project.coverAlt ?? ""}
          width={640}
          height={360}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
      <ProjectArt slug={project.slug} />
    </div>
  );
}
