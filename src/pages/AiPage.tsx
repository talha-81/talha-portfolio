import { Link } from "react-router";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { aiWorkflowLine, availability, whatsappHref } from "../data/content.ts";
import { projectsInGroup } from "../data/projects.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { useDocumentTitle } from "../lib/useDocumentTitle.ts";

export function AiPage() {
  useDocumentTitle("AI — Talha Arshad");
  const aiProjects = projectsInGroup("ai");
  const mlProjects = projectsInGroup("ml");

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">AI</p>
      <h1 className="mt-3 max-w-4xl font-display text-[clamp(3rem,7vw,5.4rem)] leading-[0.9] font-bold tracking-tighter text-fg">
        Chatbots, agents, <span className="text-stroke">automation</span>
        <span className="text-accent">.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        AI products for clients: chatbots, MCP tools that read a live database, voice and call agents, lead generation, and WhatsApp automation. {availability}
      </p>
      <p className="mt-3 text-sm font-medium text-fg">{aiWorkflowLine}</p>
      <div className="mt-4">
        <AiToolChips />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => celebrateZoru()}
          className={primaryBtn}
        >
          Start an AI project
        </a>
        <Link to="/skills" className={secondaryBtn}>
          Skills
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">AI products</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          WhatsApp automation links its public n8n and FastAPI repositories. The other products on this page are not linked to a public repository.
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">
              Machine learning and deep learning
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Public computer-vision and machine-learning work: OpenCV detection, Keras and TensorFlow image models, and classical ML notebooks.
            </p>
          </div>
          <Link to="/projects" className={`${secondaryBtn} w-fit`}>
            All projects
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {mlProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
