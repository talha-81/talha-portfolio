import { Mail } from "lucide-react";
import { emailHref, profile } from "../data/content.ts";
import { celebrateZoru } from "../lib/mascot.ts";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons.tsx";
import { WhatsAppChoice } from "./WhatsAppChoice.tsx";

const channels = [
  {
    label: "WhatsApp",
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

type ChannelLabel = (typeof channels)[number]["label"];

type ContactButtonsProps = {
  size?: "md" | "lg";
  className?: string;
  labels?: readonly ChannelLabel[];
};

export function ContactButtons({ size = "md", className = "", labels }: ContactButtonsProps) {
  const large = size === "lg";
  const visible = labels ? channels.filter((channel) => labels.includes(channel.label)) : channels;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {visible.map((channel) => {
        const Icon = channel.icon;
        const buttonClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 font-semibold transition hover:-translate-y-0.5 ${
          large ? "px-6 py-4 text-base sm:text-lg" : "py-2.5 text-sm"
        } ${channel.tone}`;

        if (!("href" in channel)) {
          return (
            <li key={channel.label} className="min-w-0">
              <WhatsAppChoice className={buttonClass}>
                <Icon className={large ? "h-5 w-5" : "h-4 w-4"} />
                WhatsApp
              </WhatsAppChoice>
            </li>
          );
        }

        return (
          <li key={channel.label} className="min-w-0">
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              onClick={() => celebrateZoru()}
              className={buttonClass}
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
