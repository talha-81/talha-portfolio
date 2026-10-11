export const sectionTips = {
  home: "I build web apps, management systems, and AI products. Available worldwide, remote, 24/7.",
  about: "I've spent five-plus years building software for clients. I work remotely, across time zones.",
  services: "Web systems, chatbots, voice agents, vision, and automation. Tell me which one you need.",
  projects: "These are web systems, AI products, and machine-learning work. Open a card for the details.",
  ai: "I build chatbots, MCP tools, voice agents, and automation for client products.",
  skills: "I use Claude, ChatGPT, Cursor, and Codex to move faster. I still review the code.",
  contact: "I'm available worldwide, remote, 24/7. WhatsApp or Email starts a project.",
  faq: "WhatsApp or Email is how you start a project with me. I'm available worldwide, remote, 24/7.",
  missing: "That page isn't here. Head back to the work, or start a project.",
} as const;

export const navTips: Record<string, string> = {
  "/": "Home. The short version of what I build.",
  "/about": "About the work, the years, and how I deliver.",
  "/services": "The kinds of systems I take on.",
  "/projects": "Work you can open. Public repositories are linked from the project.",
  "/ai": "Chatbots, voice agents, MCP, and automation.",
  "/skills": "The technologies behind the projects.",
  "/contact": "Send a message, or use WhatsApp, Email, GitHub, or LinkedIn.",
  "/faq": "A few answers before you write.",
};

export const serviceTips: Record<string, string> = {
  "Web applications": "I build interfaces and full-stack products with React, APIs, and databases.",
  "Management systems": "I build ticketing, contracts, and training-center systems end to end.",
  "AI chatbots": "I build support bots, booking bots, and chat that reads live data through MCP.",
  "Voice and call agents": "I build call agents that book a time or answer a caller's questions.",
  "Computer vision and machine learning": "I work on detection, image models, and classical machine learning.",
  "APIs and automation": "I build REST APIs, n8n workflows, and WhatsApp messaging flows.",
};

export const statTips: Record<string, string> = {
  "Years of experience": "That's how long I've been building software for clients.",
  "Projects delivered": "That's how many projects I've shipped and show here.",
  "Satisfied clients": "I only show this once I have a real number.",
};

export const contactTips: Record<string, string> = {
  WhatsApp: "Tap to chat on WhatsApp or copy the number.",
  Email: "Email me about a project.",
  GitHub: "Open my public repositories.",
  LinkedIn: "Open my LinkedIn profile.",
};

export const startProjectTip = "Head to my contact page to start your project.";

export function projectTip(summary: string) {
  return `This is one of mine. ${summary}`;
}

export function skillTip(name: string) {
  return `${name} is part of the stack I use.`;
}

export function toolTip(name: string) {
  return `I use ${name} to move faster, and I still review the code.`;
}
