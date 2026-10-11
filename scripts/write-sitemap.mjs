import { readFileSync, writeFileSync } from "node:fs";

const site = "https://talha-ai.netlify.app";
const source = readFileSync(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

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
  "/contact",
  "/faq",
];

const lastmod = new Date().toISOString().slice(0, 10);
const urls = paths
  .map(
    (path) => `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Wrote public/sitemap.xml (${paths.length} urls, ${lastmod})`);
