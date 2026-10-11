import {
  AppWindow,
  AudioLines,
  Bot,
  Kanban,
  ScanSearch,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "Web applications": AppWindow,
  "Management systems": Kanban,
  "AI chatbots": Bot,
  "Voice and call agents": AudioLines,
  "Computer vision and machine learning": ScanSearch,
  "APIs and automation": Workflow,
};

export function ServiceMark({ title, className }: { title: string; className?: string }) {
  const Icon = icons[title] ?? AppWindow;
  return <Icon className={className} aria-hidden="true" />;
}
