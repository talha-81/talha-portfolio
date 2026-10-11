import { readFileSync, writeFileSync } from "node:fs";
import { publishedPosts } from "./read-blog.mjs";

const site = "https://talha-ai.netlify.app";
const source = readFileSync(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const posts = publishedPosts();

if (slugs.length === 0) {
  throw new Error("No project slugs found for the sitemap.");
}

const paths = [
  "/",
  "/about",
  "/services",
  "/projects",
  ...slugs.map((slug) => `/projects/${slug}`),
  "/ai",
  "/skills",
  "/blog",
  "/contact",
  "/faq",
];

const lastmod = new Date().toISOString().slice(0, 10);
const entries = [
  ...paths.map((path) => ({ loc: path, lastmod: path === "/blog" && posts[0] ? posts[0].updated : lastmod })),
  ...posts.map((post) => ({ loc: `/blog/${post.slug}`, lastmod: post.updated || post.date })),
];
const urls = entries
  .map(
    (entry) => `  <url>
    <loc>${site}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Wrote public/sitemap.xml (${entries.length} urls, ${lastmod})`);
