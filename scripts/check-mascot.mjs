import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import puppeteer from "puppeteer-core";

const dist = join(process.cwd(), "dist");
const chrome =
  process.env.CHROME_PATH ||
  ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find(
    (candidate) => existsSync(candidate),
  );

if (!existsSync(join(dist, "index.html"))) {
  throw new Error("dist/index.html is missing. Run npm run build first.");
}
if (!chrome) throw new Error("Set CHROME_PATH to a Chrome or Chromium binary.");

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function fileFor(urlPath) {
  const raw = decodeURIComponent(urlPath.split("?")[0]);
  const trimmed = raw.length > 1 && raw.endsWith("/") ? raw.slice(0, -1) : raw;
  const safe = normalize(trimmed).replace(/^(\.\.[/\\])+/, "");
  const candidates =
    safe === "/" || safe === ""
      ? [join(dist, "index.html")]
      : [join(dist, safe), join(dist, `${safe}.html`), join(dist, safe, "index.html")];
  return candidates.find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

const server = createServer((req, res) => {
  const file = fileFor(req.url ?? "/");
  if (!file) {
    res.statusCode = 404;
    createReadStream(join(dist, "404.html")).pipe(res);
    return;
  }
  res.setHeader("Content-Type", types[extname(file)] ?? "application/octet-stream");
  createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const routes = ["/", "/about", "/contact", "/projects/vehicle-detection"];
const themes = ["dark", "light"];
const viewports = [
  { name: "desktop", width: 1280, height: 800, isMobile: false, hasTouch: false },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
];

function fail(message) {
  throw new Error(message);
}

async function mascotState(page) {
  return page.evaluate(() => {
    const root = document.querySelector("[data-mascot='mascot']");
    const animated = root?.firstElementChild;
    const img = root?.querySelector("img");
    const rect = img?.getBoundingClientRect();
    const opacity = animated ? Number(getComputedStyle(animated).opacity) : 0;
    const inView = Boolean(
      rect &&
        rect.width > 40 &&
        rect.height > 40 &&
        rect.bottom <= window.innerHeight + 4 &&
        rect.right <= window.innerWidth + 4 &&
        rect.top > window.innerHeight * 0.45,
    );
    return {
      opacity,
      inView,
      theme: document.documentElement.getAttribute("data-theme"),
      alt: img?.alt ?? "",
    };
  });
}

async function waitForMascot(page, label) {
  const started = Date.now();
  let last = await mascotState(page);
  while (Date.now() - started < 2500) {
    last = await mascotState(page);
    if (last.opacity > 0.9 && last.inView) return last;
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  fail(`${label}: mascot not visible (${JSON.stringify(last)})`);
}

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(String(error)));
// This environment's Chrome reports no pointing device, so the site's hover
// check would skip tips. The shim applies only in this test page.
await page.evaluateOnNewDocument(() => {
  const native = window.matchMedia.bind(window);
  const hoverQuery = "(hover: hover) and (pointer: fine)";
  window.matchMedia = (query) => {
    const media = native(query);
    if (query !== hoverQuery) return media;
    return new Proxy(media, {
      get(target, prop) {
        if (prop === "matches") return true;
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
  };
});

for (const viewport of viewports) {
  await page.setViewport(viewport);
  for (const theme of themes) {
    for (const route of routes) {
      await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate((next) => localStorage.setItem("theme", next), theme);
      await page.reload({ waitUntil: "domcontentloaded" });
      const state = await waitForMascot(page, `${viewport.name} ${theme} ${route}`);
      if (state.theme !== theme) fail(`${route} theme is ${state.theme}, expected ${theme}`);
      if (!state.alt.includes("Talha Arshad")) fail(`${route} mascot alt text is missing`);
      console.log("visible", viewport.name, theme, route);
    }
  }
}

await page.setViewport(viewports[0]);
await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
await waitForMascot(page, "home before navigation");
await page.evaluate(() => document.querySelector('a[href="/about"]')?.click());
await page.waitForFunction(() => location.pathname === "/about");
await waitForMascot(page, "about after client navigation");
console.log("visible after client navigation");

await page.hover('nav a[href="/projects"]');
await page.waitForFunction(
  () => {
    const tip = [...document.querySelectorAll('[role="tooltip"]')].find((node) =>
      node.textContent?.includes("Work you can open"),
    );
    return Boolean(tip && Number(getComputedStyle(tip).opacity) > 0.9);
  },
  { timeout: 2000 },
);
console.log("desktop hover tip visible");

await page.setViewport(viewports[1]);
await page.goto(`${origin}/about`, { waitUntil: "domcontentloaded" });
await waitForMascot(page, "mobile about before tap");
await page.click("[data-mascot] button");
await page.waitForFunction(
  () => {
    const tip = [...document.querySelectorAll('[role="tooltip"]')].find((node) =>
      node.textContent?.includes("five-plus years"),
    );
    return Boolean(tip && Number(getComputedStyle(tip).opacity) > 0.9);
  },
  { timeout: 2000 },
);
console.log("mobile section tip visible");

if (errors.length) fail(`page errors:\n${errors.join("\n")}`);

await browser.close();
server.close();
console.log("mascot check passed", origin);
