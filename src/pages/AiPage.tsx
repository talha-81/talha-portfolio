import { Link } from "react-router";
import { AiToolChips } from "../components/AiToolChips.tsx";
import { PageCta } from "../components/PageCta.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { SpotlightCard } from "../components/SpotlightCard.tsx";
import { aiWorkflowLine, availability } from "../data/content.ts";
import { projectsInGroup } from "../data/projects.ts";
import { secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

const lanes = [
  { title: "Agents", text: "Call and voice agents that book a time or answer a question." },
  { title: "Chatbots", text: "Support, appointments, and chat that can read live data through MCP." },
  { title: "MCP", text: "Servers that pull live data from a database into the conversation." },
  { title: "Automation", text: "n8n workflows, lead generation, and WhatsApp messaging flows." },
  { title: "Vision and ML", text: "OpenCV detection, Keras and TensorFlow image models, and classical ML." },
];

function NeuralStage() {
  return (
    <div className="ai-field relative overflow-hidden rounded-[32px] border border-line p-4 sm:p-6">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" viewBox="0 0 640 420">
        <g stroke="var(--accent)" strokeOpacity="0.45" fill="none">
          <path d="M80 90 C 180 40, 220 160, 320 120 S 460 40, 560 110" />
          <path d="M70 240 C 180 300, 250 160, 340 230 S 480 320, 580 220" />
          <path d="M120 340 C 220 280, 300 360, 420 300" />
        </g>
        {[
          [80, 90],
          [320, 120],
          [560, 110],
          [70, 240],
          [340, 230],
          [580, 220],
          [420, 300],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="var(--accent)" />
        ))}
      </svg>
      <div className="relative grid gap-4">
        <div className="float-slow rounded-[24px] border border-line bg-surface/90 p-4 shadow-[var(--shadow)] backdrop-blur-sm">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">Illustration</p>
          <div className="mt-3 max-w-[80%] rounded-2xl rounded-bl-md bg-soft px-3 py-2 text-sm text-fg">
            Can you book a Thursday slot?
          </div>
          <div className="mt-2 ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3 py-2 text-sm text-accent-ink">
            Thursday at 2pm is open. I can hold it.
          </div>
        </div>
        <div
          className="float-slow rounded-[24px] border border-line bg-surface/90 p-4 shadow-[var(--shadow)] backdrop-blur-sm"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">Voice</p>
          <div className="mt-3 flex h-12 items-end gap-1">
            {[10, 22, 14, 32, 18, 36, 16, 28, 12, 30, 20, 26, 14, 34, 18].map((height, index) => (
              <span
                key={height + index}
                className="w-1.5 rounded-full bg-accent"
                style={{ height, opacity: 0.45 + (index % 4) * 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiPage() {
  usePageMeta(
    "AI — Talha Arshad",
    "Chatbots, MCP tools, voice and call agents, lead generation, and WhatsApp automation, plus public computer-vision and machine-learning work.",
  );
  const aiProjects = projectsInGroup("ai");
  const mlProjects = projectsInGroup("ml");

  return (
    <>
      <PageHero
        className="ai-field"
        eyebrow="AI"
        title={
          <>
            Chatbots, agents, <span className="text-stroke">automation</span>
            <span className="text-accent">.</span>
          </>
        }
        lede={
          <>
            <p>
              AI products for clients: chatbots, MCP tools that read a live database, voice and call agents, lead generation, and WhatsApp automation. {availability}
            </p>
            <p className="mt-3 text-sm font-medium text-fg">{aiWorkflowLine}</p>
          </>
        }
        visual={<NeuralStage />}
      >
        <AiToolChips />
        <Link to="/skills" className={`${secondaryBtn} mt-6`}>
          Skills
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lanes.map((lane) => (
            <li key={lane.title}>
              <SpotlightCard className="h-full p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{lane.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{lane.text}</p>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-soft">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-fg">AI products</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            WhatsApp automation links its public n8n and FastAPI repositories. The other products on this page are not linked to a public repository.
          </p>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiProjects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-fg">
              Machine learning and deep learning
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
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

      <PageCta title="Start an AI project." />
    </>
  );
}
