import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { publishedPosts } from "./read-blog.mjs";

const site = "https://talha-ai.netlify.app";
const posts = publishedPosts();

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function rfc822(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toUTCString();
}

const items = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site}/blog/${post.slug}</link>
      <guid>${site}/blog/${post.slug}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Talha Arshad</title>
    <link>${site}/blog</link>
    <description>Notes on AI agents, automation, and remote software work by Talha Arshad.</description>
${items}
  </channel>
</rss>
`;

const targets = [join(process.cwd(), "public/rss.xml"), join(process.cwd(), "public/blog/rss.xml")];
for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, xml);
}
console.log(`Wrote RSS feeds (${posts.length} items)`);
