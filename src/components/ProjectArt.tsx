import { useId, type ReactElement } from "react";

function Bars({ x, y, count = 18 }: { x: number; y: number; count?: number }) {
  const heights = [14, 32, 20, 46, 28, 52, 24, 40, 18, 48, 30, 22, 44, 16, 36, 26, 50, 20];
  return (
    <g>
      {heights.slice(0, count).map((height, index) => (
        <rect
          key={height + index}
          x={x + index * 12}
          y={y - height}
          width={7}
          height={height}
          rx={3.5}
          fill="var(--accent)"
          opacity={0.35 + (index % 4) * 0.15}
        />
      ))}
    </g>
  );
}

function Tickets() {
  const columns = [
    { x: 36, title: "New", cards: ["Login issue", "Billing"] },
    { x: 230, title: "Active", cards: ["API timeout", "Access"] },
    { x: 424, title: "Done", cards: ["Export", "Search"] },
  ];
  return (
    <g>
      {columns.map((column) => (
        <g key={column.title}>
          <text x={column.x} y={58} fill="var(--muted)" fontSize="13" fontFamily="Outfit, sans-serif">
            {column.title}
          </text>
          {column.cards.map((card, index) => (
            <g key={card}>
              <rect
                x={column.x}
                y={76 + index * 92}
                width={176}
                height={76}
                rx={16}
                fill="var(--bg)"
                stroke="var(--line)"
              />
              <rect x={column.x + 16} y={94 + index * 92} width={72} height={8} rx={4} fill="var(--accent)" />
              <text
                x={column.x + 16}
                y={126 + index * 92}
                fill="var(--fg)"
                fontSize="14"
                fontFamily="Outfit, sans-serif"
              >
                {card}
              </text>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

function Contracts() {
  const nodes = [
    { x: 90, label: "Draft" },
    { x: 230, label: "Review" },
    { x: 370, label: "Active" },
    { x: 510, label: "Expiry" },
  ];
  return (
    <g>
      <line x1="90" y1="168" x2="510" y2="168" stroke="var(--line)" strokeWidth="4" />
      {nodes.map((node, index) => (
        <g key={node.label}>
          <circle cx={node.x} cy="168" r="14" fill={index === 3 ? "var(--accent)" : "var(--bg)"} stroke="var(--accent)" strokeWidth="3" />
          <text x={node.x} y="210" textAnchor="middle" fill="var(--fg)" fontSize="14" fontFamily="Outfit, sans-serif">
            {node.label}
          </text>
        </g>
      ))}
      <rect x="390" y="48" width="196" height="64" rx="16" fill="var(--bg)" stroke="var(--accent)" />
      <text x="410" y="76" fill="var(--accent)" fontSize="13" fontFamily="Outfit, sans-serif">
        Expiry alert
      </text>
      <text x="410" y="96" fill="var(--muted)" fontSize="12" fontFamily="Outfit, sans-serif">
        Notify approver
      </text>
    </g>
  );
}

function CalendarArt() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const marks = new Set([3, 8, 11, 16, 18]);
  return (
    <g>
      <rect x="78" y="40" width="484" height="280" rx="24" fill="var(--bg)" stroke="var(--line)" />
      <text x="104" y="78" fill="var(--fg)" fontSize="18" fontFamily="Outfit, sans-serif">
        Workshops
      </text>
      {days.map((day, index) => (
        <text
          key={day + index}
          x={118 + index * 60}
          y="118"
          textAnchor="middle"
          fill="var(--muted)"
          fontSize="12"
          fontFamily="Outfit, sans-serif"
        >
          {day}
        </text>
      ))}
      {Array.from({ length: 21 }, (_, index) => {
        const col = index % 7;
        const row = Math.floor(index / 7);
        const on = marks.has(index);
        return (
          <rect
            key={index}
            x={96 + col * 60}
            y={136 + row * 48}
            width={40}
            height={32}
            rx={10}
            fill={on ? "var(--accent)" : "var(--soft)"}
          />
        );
      })}
    </g>
  );
}

function ChatPanel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="22" fill="var(--bg)" stroke="var(--line)" />
      <rect x={x + 18} y={y + 28} width={w * 0.62} height="36" rx="14" fill="var(--soft)" />
      <rect x={x + w * 0.28} y={y + 80} width={w * 0.58} height="36" rx="14" fill="var(--accent)" />
      <rect x={x + 18} y={y + 132} width={w * 0.5} height="28" rx="12" fill="var(--soft)" />
    </g>
  );
}

function McpChat() {
  return (
    <g>
      <ChatPanel x={36} y={48} w={300} h={250} />
      <path d="M340 170 C 400 170, 400 120, 460 120" fill="none" stroke="var(--accent)" strokeWidth="3" />
      <ellipse cx="530" cy="108" rx="70" ry="22" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
      <path d="M460 108 v88 c0 16 32 28 70 28 s70-12 70-28 v-88" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
      <ellipse cx="530" cy="196" rx="70" ry="22" fill="none" stroke="var(--accent)" strokeWidth="3" />
      <text x="530" y="248" textAnchor="middle" fill="var(--muted)" fontSize="13" fontFamily="Outfit, sans-serif">
        Live data
      </text>
    </g>
  );
}

function VoiceArt({ label }: { label: string }) {
  return (
    <g>
      <rect x="48" y="70" width="544" height="200" rx="28" fill="var(--bg)" stroke="var(--line)" />
      <Bars x={78} y={196} />
      <rect x="400" y="96" width="160" height="36" rx="18" fill="var(--accent)" />
      <text x="480" y="119" textAnchor="middle" fill="var(--accent-ink)" fontSize="13" fontFamily="Outfit, sans-serif">
        {label}
      </text>
    </g>
  );
}

function AppointmentChat() {
  return (
    <g>
      <ChatPanel x={36} y={54} w={340} h={250} />
      <rect x="400" y="70" width="200" height="210" rx="22" fill="var(--bg)" stroke="var(--line)" />
      <text x="424" y="104" fill="var(--fg)" fontSize="14" fontFamily="Outfit, sans-serif">
        Calendar
      </text>
      {Array.from({ length: 12 }, (_, index) => (
        <rect
          key={index}
          x={424 + (index % 4) * 40}
          y={126 + Math.floor(index / 4) * 40}
          width="28"
          height="26"
          rx="8"
          fill={index === 6 ? "var(--accent)" : "var(--soft)"}
        />
      ))}
    </g>
  );
}

function UniversityCall() {
  return (
    <g>
      <Bars x={56} y={150} count={16} />
      <rect x="300" y="64" width="280" height="78" rx="18" fill="var(--bg)" stroke="var(--line)" />
      <text x="324" y="96" fill="var(--muted)" fontSize="12" fontFamily="Outfit, sans-serif">
        Caller question
      </text>
      <text x="324" y="120" fill="var(--fg)" fontSize="16" fontFamily="Outfit, sans-serif">
        Programs and hours
      </text>
      <rect x="300" y="164" width="280" height="78" rx="18" fill="var(--bg)" stroke="var(--accent)" />
      <text x="324" y="196" fill="var(--accent)" fontSize="12" fontFamily="Outfit, sans-serif">
        Spoken answer
      </text>
      <text x="324" y="220" fill="var(--fg)" fontSize="16" fontFamily="Outfit, sans-serif">
        Routed from the call
      </text>
    </g>
  );
}

function Funnel() {
  return (
    <g>
      <polygon points="80,48 560,48 480,130 160,130" fill="var(--soft)" stroke="var(--line)" />
      <polygon points="160,146 480,146 420,220 220,220" fill="var(--bg)" stroke="var(--accent)" />
      <polygon points="220,236 420,236 360,300 280,300" fill="var(--accent)" />
      <text x="320" y="100" textAnchor="middle" fill="var(--fg)" fontSize="16" fontFamily="Outfit, sans-serif">
        Sources
      </text>
      <text x="320" y="192" textAnchor="middle" fill="var(--fg)" fontSize="16" fontFamily="Outfit, sans-serif">
        Qualify
      </text>
      <text x="320" y="278" textAnchor="middle" fill="var(--accent-ink)" fontSize="14" fontFamily="Outfit, sans-serif">
        Leads
      </text>
    </g>
  );
}

function SupportChat() {
  return (
    <g>
      <ChatPanel x={120} y={40} w={400} h={250} />
      <rect x="168" y="214" width="120" height="32" rx="16" fill="var(--accent)" />
      <text x="228" y="235" textAnchor="middle" fill="var(--accent-ink)" fontSize="13" fontFamily="Outfit, sans-serif">
        Resolved
      </text>
    </g>
  );
}

function Notebook() {
  return (
    <g>
      <rect x="40" y="40" width="270" height="280" rx="20" fill="var(--bg)" stroke="var(--line)" />
      {[0, 1, 2, 3, 4, 5].map((row) => (
        <rect
          key={row}
          x="64"
          y={72 + row * 36}
          width={row % 2 === 0 ? 180 : 120}
          height="12"
          rx="6"
          fill={row === 2 ? "var(--accent)" : "var(--soft)"}
        />
      ))}
      <rect x="340" y="40" width="260" height="280" rx="20" fill="var(--bg)" stroke="var(--line)" />
      <polyline
        points="370,250 410,210 450,220 490,140 530,160 570,90"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
      />
    </g>
  );
}

function StatsArt() {
  const bars = [80, 120, 64, 150, 96, 130];
  return (
    <g>
      <line x1="70" y1="280" x2="580" y2="280" stroke="var(--line)" strokeWidth="2" />
      {bars.map((height, index) => (
        <rect
          key={height}
          x={90 + index * 80}
          y={280 - height}
          width="42"
          height={height}
          rx="10"
          fill={index === 3 ? "var(--accent)" : "var(--soft)"}
          stroke="var(--line)"
        />
      ))}
    </g>
  );
}

function Dashboard() {
  const tiles = [
    { x: 40, label: "Profit" },
    { x: 230, label: "Sales" },
    { x: 420, label: "Region" },
  ];
  return (
    <g>
      {tiles.map((tile) => (
        <g key={tile.label}>
          <rect x={tile.x} y="36" width="176" height="88" rx="18" fill="var(--bg)" stroke="var(--line)" />
          <text x={tile.x + 18} y="72" fill="var(--muted)" fontSize="13" fontFamily="Outfit, sans-serif">
            {tile.label}
          </text>
          <rect x={tile.x + 18} y="88" width="70" height="10" rx="5" fill="var(--accent)" />
        </g>
      ))}
      <rect x="40" y="148" width="560" height="170" rx="22" fill="var(--bg)" stroke="var(--line)" />
      <Bars x={70} y={280} count={16} />
    </g>
  );
}

const scenes: Record<string, () => ReactElement> = {
  "ticketing-management-system": Tickets,
  "contract-management-system": Contracts,
  "training-center-system": CalendarArt,
  "ai-chatbot-with-mcp": McpChat,
  "appointment-booking-call-agent": () => <VoiceArt label="Booking" />,
  "appointment-booking-chatbot": AppointmentChat,
  "university-information-call-agent": UniversityCall,
  "automated-lead-generator": Funnel,
  "customer-service-chatbot": SupportChat,
  "machine-learning-projects": Notebook,
  "statistical-analysis": StatsArt,
  "datastory-dashboard": Dashboard,
};

export function ProjectArt({ slug }: { slug: string }) {
  const rawId = useId().replace(/:/g, "");
  const Scene = scenes[slug] ?? Tickets;

  return (
    <div className="relative h-full w-full bg-soft">
      <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={rawId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="55%" stopColor="var(--surface)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="640" height="360" fill="var(--surface)" />
        <rect width="640" height="360" fill={`url(#${rawId})`} />
        <Scene />
      </svg>
      <span className="absolute top-3 left-3 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
        Illustration
      </span>
    </div>
  );
}
