import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const distDir = join(process.cwd(), "dist");
const template = readFileSync(join(distDir, "index.html"), "utf8");
const cssHref = template.match(/href="(\/assets\/[^"]+\.css)"/)?.[1];
if (!cssHref) throw new Error("Built CSS was not found in dist/index.html");
const css = readFileSync(join(distDir, cssHref), "utf8");
const preload = [...new Set([...css.matchAll(/url\((\/assets\/[^)]+\.woff2)\)/g)].map((match) => match[1]))]
  .filter((href) => /inter-latin-400|outfit-latin-700/.test(href))
  .map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`)
  .join("");

const serverEntry = pathToFileURL(join(process.cwd(), "dist-ssr/entry-server.js")).href;
const { render } = await import(serverEntry);

const source = readFileSync(join(process.cwd(), "src/data/projects.ts"), "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const routes = [
  "/",
  "/about",
  "/services",
  "/projects",
  ...slugs.map((slug) => `/projects/${slug}`),
  "/ai",
  "/skills",
  "/contact",
  "/faq",
  "/404",
];

function escapeText(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

function withHead(html, seo, canonical, jsonLd) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeText(seo.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeText(seo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeText(seo.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeText(seo.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeText(seo.description)}$2`)
    .replace("</head>", `${preload}<script type="application/ld+json">${jsonLd}</script></head>`);
}

for (const route of routes) {
  const isMissing = route === "/404";
  const { html, seo, canonical, jsonLd } = await render(isMissing ? "/does-not-exist" : route);
  const page = withHead(template, seo, isMissing ? "https://talha-ai.netlify.app/" : canonical, jsonLd).replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );
  const relative = isMissing ? "404.html" : route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  const target = join(distDir, relative);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, page);
  console.log("prerendered", relative);
}
