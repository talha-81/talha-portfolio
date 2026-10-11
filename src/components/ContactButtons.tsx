import { Mail } from "lucide-react";
import { emailHref, profile, whatsappHref } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons.tsx";

const channels = [
  {
    label: "WhatsApp",
    href: whatsappHref,
    external: true,
    icon: WhatsAppIcon,
    tone: "bg-[#25D366] text-white border-transparent",
  },
  {
    label: "Email",
    href: emailHref,
    external: false,
    icon: Mail,
    tone: "bg-accent text-accent-ink border-transparent",
  },
  {
    label: "GitHub",
    href: profile.github,
    external: true,
    icon: GitHubIcon,
    tone: "bg-surface text-fg border-line",
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    external: true,
    icon: LinkedInIcon,
    tone: "bg-surface text-fg border-line",
  },
] as const;

type ContactButtonsProps = {
  size?: "md" | "lg";
  className?: string;
};

export function ContactButtons({ size = "md", className = "" }: ContactButtonsProps) {
  const large = size === "lg";

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {channels.map((channel) => {
        const Icon = channel.icon;
        return (
          <li key={channel.label} className="min-w-0">
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              onClick={() => celebrateZoru()}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 font-semibold transition hover:-translate-y-0.5 ${
                large ? "px-6 py-4 text-base sm:text-lg" : "py-2.5 text-sm"
              } ${channel.tone}`}
            >
              <Icon className={large ? "h-5 w-5" : "h-4 w-4"} />
              {channel.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
