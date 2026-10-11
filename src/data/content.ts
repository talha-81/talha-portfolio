export const profile = {
  name: "Talha Arshad",
  title: "Software Engineer",
  location: "Pakistan",
  github: "https://github.com/talha-81",
  linkedin: "https://www.linkedin.com/in/talha-arshad81",
  repos: "https://github.com/talha-81?tab=repositories",
} as const;

const whatsappMessage = "Hi Talha, I'd like to discuss a project.";

export const whatsappHref = `https://wa.me/923400957785?text=${encodeURIComponent(whatsappMessage)}`;

export const emailHref = "mailto:tarshad587@gmail.com";

export const availability = "Available worldwide, remote, 24/7.";

export const aiWorkflowLine = "Fast, high-quality delivery powered by AI tools.";

export const aiTools = ["Claude", "ChatGPT", "Cursor", "Codex"] as const;

export const navLinks = [
  { href: "/", label: "Home", end: true },
  { href: "/about", label: "About", end: false },
  { href: "/services", label: "Services", end: false },
  { href: "/projects", label: "Projects", end: false },
  { href: "/ai", label: "AI", end: false },
  { href: "/skills", label: "Skills", end: false },
  { href: "/contact", label: "Contact", end: false },
] as const;

export const footerLinks = [
  ...navLinks,
  { href: "/faq", label: "FAQ", end: false },
] as const;

export const services = [
  {
    title: "Web applications",
    text: "Interfaces and full-stack products with React, APIs, and databases.",
  },
  {
    title: "Management systems",
    text: "Ticketing, contract handling, and the workshops a training center runs.",
  },
  {
    title: "AI chatbots",
    text: "Customer support, appointment booking, and chatbots that pull live data through MCP.",
  },
  {
    title: "Voice and call agents",
    text: "Call agents that book appointments or answer a caller's questions.",
  },
  {
    title: "Computer vision and machine learning",
    text: "Detection, image classification, and classical machine-learning models.",
  },
  {
    title: "APIs and automation",
    text: "REST APIs, n8n workflows, and automated WhatsApp messaging.",
  },
] as const;

export const serviceAreas = [
  "IT consulting",
  "Custom software development",
  "Business analytics",
  "Web development",
] as const;

export const processSteps = [
  {
    title: "Discover",
    text: "I start from the outcome: who the product is for and what it needs to do.",
  },
  {
    title: "Design",
    text: "I shape the interface, the API, and where a model, agent, or automation fits.",
  },
  {
    title: "Build",
    text: "Fast, high-quality delivery powered by AI tools: Claude, ChatGPT, Cursor, and Codex. I still review the code.",
  },
  {
    title: "Ship",
    text: "I deliver remotely, across time zones, and I am available 24/7 for client work.",
  },
] as const;

export const faqs = [
  {
    q: "How do I start a project?",
    a: "Use the WhatsApp or Email button on the contact page. GitHub and LinkedIn are there too. There is no contact form.",
  },
  {
    q: "Where do you work?",
    a: "Remotely, with clients anywhere in the world, across time zones. Available 24/7.",
  },
  {
    q: "What can you build?",
    a: "Web applications, management systems, AI chatbots and call agents, computer vision, machine learning, APIs, and automation.",
  },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript", "TypeScript", "Tailwind CSS", "Streamlit"],
  },
  {
    title: "Backend",
    skills: ["Python", ".NET Core", "FastAPI", "Flask", "REST APIs"],
  },
  {
    title: "AI, agents, and automation",
    skills: ["AI agents", "Chatbots", "MCP", "Voice agents", "n8n", "Automation"],
  },
  {
    title: "Machine learning and computer vision",
    skills: [
      "Machine learning",
      "Deep learning",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "scikit-learn",
      "Pandas",
      "NLP",
    ],
  },
  {
    title: "Data",
    skills: ["SQL", "PostgreSQL", "Oracle", "Tableau", "Jupyter", "NumPy"],
  },
  {
    title: "Tools",
    skills: ["Docker", "Git", "GitHub"],
  },
] as const;

export type Role = {
  title: string;
  summary: string;
  meta: string;
  points: readonly string[];
};

export const roles: readonly Role[] = [
  {
    title: "Software Engineer",
    summary: "May 2021 – Present · Remote",
    meta: "Remote",
    points: [
      "Architected and developed scalable full-stack applications using React.js and .NET Core, implementing RESTful APIs, modular architecture, and secure backend services.",
      "Designed and integrated AI-driven features and automation systems into enterprise web applications.",
      "Contributed to system design, performance optimization, and deployment pipelines while collaborating in Agile environments to deliver production-grade software solutions.",
    ],
  },
  {
    title: "Junior Web & AI Developer",
    summary: "Full-time · Nov 2025 – Apr 2026 · Hybrid",
    meta: "Full-time · Hybrid",
    points: [
      "Developed and maintained web applications using React.js and FastAPI, including REST APIs for frontend, third-party, and enterprise integrations.",
      "Integrated AI features into applications, such as AI assistants, generative AI tools, and intelligent data processing to enhance user experience.",
      "Built end-to-end automation workflows using n8n and collaborated in Agile teams using Git/GitHub to deliver scalable web and AI solutions.",
    ],
  },
  {
    title: "Web & AI Developer Intern",
    summary: "Feb 2025 – Nov 2025 · On-site",
    meta: "On-site",
    points: [
      "Developed web applications and backend services using FastAPI, SQL, and REST APIs for secure and scalable systems.",
      "Integrated AI capabilities including chatbots, automation workflows, and AI-powered features to improve application functionality.",
      "Built and optimized n8n automation workflows and collaborated with remote teams using GitHub, Slack, and Agile practices.",
    ],
  },
  {
    title: "Data Analyst",
    summary: "Mar 2024 – Apr 2024 · Remote",
    meta: "Remote",
    points: [
      "Conducted data analysis, developed predictive models, optimized data pipelines, and delivered actionable insights using Python, Excel, and visualization tools for AI-driven projects.",
    ],
  },
];

export const certifications = [
  {
    name: "Data Science Job Simulation",
    issuer: "British Airways · Forage",
    date: "Jan 2025",
  },
  {
    name: "Data Analytics and Visualization Job Simulation",
    issuer: "Accenture North America · Forage",
    date: "Aug 2024",
  },
  {
    name: "Data Science Job Simulation",
    issuer: "Standard Bank · Forage",
    date: "Aug 2024",
  },
  {
    name: "Data Visualization with Tableau Specialization",
    issuer: "UC Davis · Coursera",
    date: "Feb 2024",
  },
  {
    name: "Statistics for Data Science with Python",
    issuer: "Coursera · IBM",
    date: "Feb 2024",
  },
  {
    name: "IBM Data Science Specialization",
    issuer: "IBM",
    date: "Nov 2023",
  },
  {
    name: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    date: "Sep 2023",
  },
] as const;
