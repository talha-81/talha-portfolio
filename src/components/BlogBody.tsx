import type { Components } from "react-markdown";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import { slugifyHeading } from "../data/blog.ts";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function Heading({ depth, children }: { depth: 2 | 3; children?: ReactNode }) {
  const Tag = depth === 2 ? "h2" : "h3";
  const id = slugifyHeading(textOf(children)) || "section";
  return (
    <Tag id={id} className="scroll-mt-28">
      <a href={`#${id}`} className="heading-anchor" data-mascot-tip={`Jump to ${textOf(children)}.`}>
        {children}
      </a>
    </Tag>
  );
}

const components: Components = {
  h1: ({ children }) => <h2 className="scroll-mt-28">{children}</h2>,
  h2: ({ children }) => <Heading depth={2}>{children}</Heading>,
  h3: ({ children }) => <Heading depth={3}>{children}</Heading>,
  a: ({ href, children }) => {
    const external = Boolean(href?.startsWith("http"));
    return (
      <a href={href} rel={external ? "noreferrer noopener" : undefined} target={external ? "_blank" : undefined}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => (
    <img src={src} alt={alt ?? ""} width={1200} height={675} loading="lazy" decoding="async" />
  ),
  pre: ({ children }) => <pre>{children}</pre>,
  code: ({ className, children }) => {
    const text = String(children).replace(/\n$/, "");
    const language = /language-([\w-]+)/.exec(className ?? "")?.[1];
    if (!language) return <code>{text}</code>;
    const highlighted = hljs.getLanguage(language)
      ? hljs.highlight(text, { language }).value
      : text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    return <code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: highlighted }} />;
  },
};

export function BlogBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
