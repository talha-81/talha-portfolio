import { publishedPosts, postBySlug as blogPostBySlug } from "./blog.ts";
import { faqs, profile, services, skillGroups } from "./content.ts";
import { projectBySlug, projects } from "./projects.ts";
import { canonicalUrl, OG_IMAGE_URL, SITE_URL } from "../lib/site.ts";

export type PageSeo = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  published?: string;
  modified?: string;
};

const pages: Record<string, PageSeo> = {
  "/": {
    title: "Talha Arshad — Software Engineer & AI Developer (Remote)",
    description:
      "Freelance software engineer and AI developer. I build web apps, chatbots, voice agents, and MCP tools for clients worldwide, remote 24/7.",
  },
  "/about": {
    title: "About Talha Arshad — Remote AI & Web Developer",
    description:
      "About Talha Arshad, a remote full-stack and AI developer with 5+ years building web apps, APIs, chatbots, and automation worldwide.",
  },
  "/services": {
    title: "Services — Remote AI, Web & Automation Developer",
    description:
      "Hire a remote developer for web applications, management systems, AI chatbots, voice agents, computer vision, and automation.",
  },
  "/projects": {
    title: "Projects — Web, AI & ML by Talha Arshad",
    description:
      "Web apps, AI chatbots, voice agents, machine learning, and computer vision projects by Talha Arshad, a remote software engineer.",
  },
  "/ai": {
    title: "AI Developer — Chatbots, Voice Agents & MCP",
    description:
      "AI chatbot and voice agent developer. MCP tools, appointment agents, lead automation, and WhatsApp flows, built remotely.",
  },
  "/skills": {
    title: "Skills — React, Python, AI & Computer Vision",
    description:
      "React, TypeScript, Python, FastAPI, MCP, OpenCV, and machine learning skills behind Talha Arshad's remote client work.",
  },
  "/contact": {
    title: "Contact Talha Arshad — Remote AI Developer",
    description:
      "Contact Talha Arshad, a remote AI and web developer. Send a project note or reach him on WhatsApp, email, GitHub, or LinkedIn.",
  },
  "/faq": {
    title: "FAQ — Hiring a Remote AI & Web Developer",
    description:
      "Answers on hiring Talha Arshad for remote web apps, AI chatbots, voice agents, machine learning, and automation.",
  },
  "/blog": {
    title: "Blog — AI Agents & Automation by Talha Arshad",
    description:
      "Notes on AI agents, automation, and the business processes Talha Arshad builds for clients, remote and worldwide.",
  },
};

const notFound: PageSeo = {
  title: "Page Not Found — Talha Arshad",
  description:
    "That page is not on Talha Arshad's site. Browse his remote web, AI, and machine learning work or start a project.",
};

function clip(value: string, max: number) {
  if (value.length <= max) return value;
  const sliced = value.slice(0, max - 1);
  const word = sliced.lastIndexOf(" ");
  return `${(word > 40 ? sliced.slice(0, word) : sliced).trimEnd()}…`;
}

export function pageSeo(pathname: string): PageSeo {
  const known = pages[pathname];
  if (known) return known;
  if (pathname.startsWith("/blog/")) {
    const post = blogPostBySlug(pathname.split("/")[2]);
    if (!post) return notFound;
    const suffixed = `${post.title} — Talha Arshad`;
    const cover = post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`;
    return {
      title: suffixed.length <= 60 ? suffixed : post.title.length <= 60 ? post.title : clip(post.title, 60),
      description: clip(post.description, 155),
      image: cover,
      type: "article",
      published: post.date,
      modified: post.updated,
    };
  }
  if (pathname.startsWith("/projects/")) {
    const project = projectBySlug(pathname.split("/")[2]);
    if (!project) return notFound;
    const suffixed = `${project.title} — Talha Arshad`;
    return {
      title: suffixed.length <= 60 ? suffixed : clip(project.title, 60),
      description: clip(`${project.summary} Remote work by Talha Arshad, software and AI developer.`, 155),
    };
  }
  return notFound;
}

export function assertPageSeo() {
  const paths = [
    ...Object.keys(pages),
    ...projects.map((project) => `/projects/${project.slug}`),
    ...publishedPosts().map((post) => `/blog/${post.slug}`),
    "/missing",
  ];
  for (const path of paths) {
    const seo = pageSeo(path);
    if (seo.title.length > 60) throw new Error(`${path} title is ${seo.title.length} chars: ${seo.title}`);
    if (seo.description.length > 155) {
      throw new Error(`${path} description is ${seo.description.length} chars: ${seo.description}`);
    }
  }
}

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

/** Skill chips already rendered on the site. Nothing is added beyond that list. */
const knowsAbout = [...new Set(skillGroups.flatMap((group) => [...group.skills]))];

export function structuredData(pathname: string) {
  const url = canonicalUrl(pathname);
  const person = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    jobTitle: ["Software Engineer", "Agentic AI Engineer"],
    hasOccupation: [
      { "@type": "Occupation", name: "Software Engineer" },
      { "@type": "Occupation", name: "Agentic AI Engineer" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Nayel Solutions",
      url: "https://www.nayelsolutions.com/",
    },
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/avatar/talha.webp`,
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    sameAs: ["https://www.linkedin.com/in/talha-arshad81/", "https://github.com/talha-81"],
    knowsAbout,
  };
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: "Talha Arshad",
    url: `${SITE_URL}/`,
    description: pages["/"].description,
    publisher: { "@id": personId },
    about: { "@id": personId },
  };
  const service = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Talha Arshad",
    url: `${SITE_URL}/services`,
    image: OG_IMAGE_URL,
    areaServed: "Worldwide",
    address: { "@type": "PostalAddress", addressCountry: "PK" },
    founder: { "@id": personId },
    makesOffer: services.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: item.title, serviceType: item.title },
    })),
  };
  const graph: Record<string, unknown>[] = [person, website, service];

  const crumbLabels: Record<string, string> = {
    "/about": "About",
    "/services": "Services",
    "/projects": "Projects",
    "/ai": "AI",
    "/skills": "Skills",
    "/contact": "Contact",
    "/faq": "FAQ",
    "/blog": "Blog",
  };
  const project = pathname.startsWith("/projects/") ? projectBySlug(pathname.split("/")[2]) : undefined;
  const blogPost = pathname.startsWith("/blog/") ? blogPostBySlug(pathname.split("/")[2]) : undefined;
  if (pathname !== "/" && (crumbLabels[pathname] || project || blogPost)) {
    const crumbs = [{ name: "Home", path: "/" }];
    if (project && pathname !== "/projects") {
      crumbs.push({ name: "Projects", path: "/projects" });
      crumbs.push({ name: project.title, path: pathname });
    } else if (blogPost) {
      crumbs.push({ name: "Blog", path: "/blog" });
      crumbs.push({ name: blogPost.title, path: pathname });
    } else if (crumbLabels[pathname]) {
      crumbs.push({ name: crumbLabels[pathname], path: pathname });
    }
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: canonicalUrl(crumb.path),
      })),
    });
  }

  if (pathname === "/faq") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (blogPost) {
    const cover = blogPost.cover.startsWith("http") ? blogPost.cover : `${SITE_URL}${blogPost.cover}`;
    graph.push({
      "@type": "BlogPosting",
      headline: blogPost.title,
      description: blogPost.description,
      datePublished: blogPost.date,
      dateModified: blogPost.updated,
      author: { "@id": personId },
      image: cover,
      mainEntityOfPage: url,
    });
  }

  if (pathname.startsWith("/projects/")) {
    const project = projectBySlug(pathname.split("/")[2]);
    if (project) {
      graph.push({
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.summary,
        url,
        applicationCategory: "DeveloperApplication",
        author: { "@id": personId },
        ...(project.cover ? { image: `${SITE_URL}${project.cover}` } : {}),
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
