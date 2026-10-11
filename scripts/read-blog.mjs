import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function unquote(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseValue(raw) {
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (raw.startsWith("[") && raw.endsWith("]")) {
    return raw
      .slice(1, -1)
      .split(",")
      .map((item) => unquote(item))
      .filter(Boolean);
  }
  return unquote(raw);
}

export function parsePost(raw, filename) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename} is missing frontmatter`);
  const data = {};
  let listKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (line.trim().startsWith("- ")) {
      if (!listKey) throw new Error(`${filename} has a list item without a key`);
      if (!Array.isArray(data[listKey])) data[listKey] = [];
      data[listKey].push(unquote(line.trim().slice(2)));
      continue;
    }
    const index = line.indexOf(":");
    if (index === -1) throw new Error(`${filename} has a bad frontmatter line: ${line}`);
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    listKey = key;
    data[key] = value === "" ? [] : parseValue(value);
  }
  for (const key of ["title", "slug", "description", "date", "author"]) {
    if (typeof data[key] !== "string" || !data[key]) throw new Error(`${filename} is missing ${key}`);
  }
  if (typeof data.draft !== "boolean") throw new Error(`${filename} must set draft: true or draft: false`);
  if (data.author !== "Talha Arshad") throw new Error(`${filename} author must be Talha Arshad`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`${filename} date must be YYYY-MM-DD`);
  const updated = typeof data.updated === "string" && data.updated ? data.updated : data.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated)) throw new Error(`${filename} updated must be YYYY-MM-DD`);
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const cover = typeof data.cover === "string" ? data.cover : "";
  if (!data.draft && !cover.startsWith("/")) throw new Error(`${filename} needs a cover path`);
  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    date: data.date,
    updated,
    tags,
    cover,
    author: data.author,
    draft: data.draft,
    body: match[2].trim(),
    filename,
  };
}

export function allPosts() {
  const dir = join(process.cwd(), "src/content/blog");
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => parsePost(readFileSync(join(dir, name), "utf8"), name))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function publishedPosts() {
  return allPosts().filter((post) => !post.draft);
}
