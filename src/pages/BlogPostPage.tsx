import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { BlogBody } from "../components/BlogBody.tsx";
import { StartProjectLink } from "../components/StartProjectLink.tsx";
import { formatDate, neighbors, postBySlug, readingMinutes, tableOfContents, tagLabel } from "../data/blog.ts";
import { primaryBtn, secondaryBtn } from "../lib/styles.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = postBySlug(slug);
  usePageMeta();

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Blog</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-fg">Note not found.</h1>
        <Link to="/blog" className={`${secondaryBtn} mt-8`}>
          Back to the blog
        </Link>
      </div>
    );
  }

  const minutes = readingMinutes(post.body);
  const toc = tableOfContents(post.body);
  const showToc = toc.length >= 3;
  const { newer, older } = neighbors(post.slug);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
          <Link to="/blog" data-mascot-tip="Back to every note." className="text-sm font-semibold text-muted hover:text-accent">
            All notes
          </Link>
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span data-mascot-tip={`This note is tagged ${tagLabel(tag)}.`} className="inline-flex rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-fg">
                  {tagLabel(tag)}
                </span>
              </li>
            ))}
          </ul>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[0.95] font-bold tracking-tight text-balance text-fg">
            {post.title}
          </h1>
          <p className="mt-5 text-sm font-medium text-muted">
            {formatDate(post.date)}
            {post.updated !== post.date ? ` · Updated ${formatDate(post.updated)}` : ""} · {minutes} min read · {post.author}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <img
          src={post.cover}
          alt={`Cover illustration for ${post.title}`}
          width={1200}
          height={675}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="mx-auto aspect-[16/9] w-full max-w-5xl rounded-[28px] border border-line object-cover shadow-[var(--shadow)]"
        />
      </div>

      <div className={`mx-auto grid max-w-6xl gap-12 px-5 pb-8 sm:px-8 ${showToc ? "lg:grid-cols-[220px_minmax(0,1fr)]" : ""}`}>
        {showToc ? (
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">On this page</p>
            <ol className="mt-4 space-y-2">
              {toc.map((item) => (
                <li key={item.id} className={item.depth === 3 ? "pl-3" : ""}>
                  <a
                    href={`#${item.id}`}
                    data-mascot-tip={`Skip down to ${item.text}.`}
                    className="text-sm leading-snug font-medium text-muted hover:text-accent"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <BlogBody markdown={post.body} />
      </div>

      {newer || older ? (
        <nav aria-label="More notes" className="mx-auto grid max-w-3xl gap-4 px-5 py-10 sm:px-8 sm:grid-cols-2">
          {older ? (
            <Link to={`/blog/${older.slug}`} data-mascot-tip={`Older note: ${older.title}.`} className="rounded-[24px] border border-line bg-surface p-5 hover:border-accent">
              <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                <ArrowLeft size={14} /> Older
              </span>
              <span className="mt-2 block font-display text-xl font-semibold text-fg">{older.title}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link to={`/blog/${newer.slug}`} data-mascot-tip={`Newer note: ${newer.title}.`} className="rounded-[24px] border border-line bg-surface p-5 text-right hover:border-accent">
              <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                Newer <ArrowRight size={14} />
              </span>
              <span className="mt-2 block font-display text-xl font-semibold text-fg">{newer.title}</span>
            </Link>
          ) : null}
        </nav>
      ) : null}

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:py-16">
        <div className="gradient-ring relative overflow-hidden rounded-[32px] px-6 py-10 sm:px-10">
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Work together</p>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] font-bold tracking-tight text-fg">
            Want this built for your business?
          </h2>
          <p className="mt-4 text-muted">Tell me which process you want an agent to take on. I work remotely, worldwide.</p>
          <StartProjectLink className={`${primaryBtn} mt-8`}>Start a project</StartProjectLink>
        </div>
      </section>
    </article>
  );
}
