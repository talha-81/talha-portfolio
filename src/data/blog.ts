export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  cover: string;
  author: string;
  draft: boolean;
  body: string;
  filename: string;
};

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseValue(raw: string) {
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

export function parsePost(raw: string, filename: string): BlogPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename} is missing frontmatter`);
  const data: Record<string, string | boolean | string[]> = {};
  let listKey: string | null = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (line.trim().startsWith("- ")) {
      if (!listKey) throw new Error(`${filename} has a list item without a key`);
      const current = data[listKey];
      const list = Array.isArray(current) ? current : [];
      list.push(unquote(line.trim().slice(2)));
      data[listKey] = list;
      continue;
    }
    const index = line.indexOf(":");
    if (index === -1) throw new Error(`${filename} has a bad frontmatter line: ${line}`);
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    listKey = key;
    data[key] = value === "" ? [] : parseValue(value);
  }
  for (const key of ["title", "slug", "description", "date", "author"] as const) {
    if (typeof data[key] !== "string" || !data[key]) throw new Error(`${filename} is missing ${key}`);
  }
  if (typeof data.draft !== "boolean") throw new Error(`${filename} must set draft: true or draft: false`);
  const updated = typeof data.updated === "string" && data.updated ? data.updated : String(data.date);
  return {
    title: String(data.title),
    slug: String(data.slug),
    description: String(data.description),
    date: String(data.date),
    updated,
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: typeof data.cover === "string" ? data.cover : "",
    author: String(data.author),
    draft: data.draft,
    body: match[2].trim(),
    filename,
  };
}

const files = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true });

function loadPosts() {
  return Object.entries(files)
    .map(([path, raw]) => parsePost(String(raw), path.split("/").pop() ?? path))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function publishedPosts() {
  return loadPosts().filter((post) => !post.draft);
}

export function postBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return publishedPosts().find((post) => post.slug === slug);
}

export function neighbors(slug: string) {
  const posts = publishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 ? posts[index + 1] : undefined,
  };
}

export function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type TocItem = { depth: number; id: string; text: string };

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function tableOfContents(body: string): TocItem[] {
  const seen = new Map<string, number>();
  const items: TocItem[] = [];
  for (const line of body.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[*_`[\]]/g, "").trim();
    let id = slugifyHeading(text) || "section";
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    items.push({ depth: match[1].length, id, text });
  }
  return items;
}

export function tagLabel(tag: string) {
  const words: Record<string, string> = { ai: "AI" };
  return tag
    .split("-")
    .map((word) => words[word] ?? `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
