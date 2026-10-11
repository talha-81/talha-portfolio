import { prerender } from "react-dom/static";
import { MemoryRouter } from "react-router";
import App from "./App.tsx";
import { assertPageSeo, pageSeo, structuredData } from "./data/seo.ts";
import { canonicalUrl } from "./lib/site.ts";

async function readStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(merged);
}

export async function render(url: string) {
  assertPageSeo();
  const { prelude } = await prerender(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  );
  const html = await readStream(prelude);
  const pathname = url.split("?")[0] || "/";
  const seo = pageSeo(pathname);
  return {
    html,
    seo,
    canonical: canonicalUrl(pathname),
    jsonLd: JSON.stringify(structuredData(pathname)).replace(/</g, "\\u003c"),
  };
}
