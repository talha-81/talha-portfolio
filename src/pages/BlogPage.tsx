import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { PageHero } from "../components/PageHero.tsx";
import { formatDate, publishedPosts, readingMinutes, tagLabel } from "../data/blog.ts";
import { usePageMeta } from "../lib/usePageMeta.ts";

export function BlogPage() {
  usePageMeta();
  const posts = publishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes from the <span className="text-stroke">work</span>
            <span className="text-accent">.</span>
          </>
        }
        lede={
          <p>
            Practical writing on AI agents, automation, and the systems I build for clients. Remote, and meant to be useful.
          </p>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        {featured ? (
          <div className="grid gap-8">
            <PostCard post={featured} featured />
            {rest.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-[28px] border border-line bg-surface p-8 shadow-[var(--shadow)]">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">The first note is on the way.</h2>
            <p className="mt-3 max-w-xl text-muted">Published posts will show up here. Drafts stay off the site.</p>
          </div>
        )}
      </section>
    </>
  );
}

function PostCard({
  post,
  featured = false,
}: {
  post: ReturnType<typeof publishedPosts>[number];
  featured?: boolean;
}) {
  const minutes = readingMinutes(post.body);
  return (
    <article className={`overflow-hidden rounded-[28px] border border-line bg-surface shadow-[var(--shadow)] ${featured ? "" : "h-full"}`}>
      <Link
        to={`/blog/${post.slug}`}
        data-mascot-tip={`Open the note: ${post.title}.`}
        className={`group grid h-full ${featured ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""}`}
      >
        <div className={`relative overflow-hidden border-line bg-soft ${featured ? "border-b lg:border-r lg:border-b-0" : "border-b"}`}>
          <img
            src={post.cover}
            alt={`Cover illustration for ${post.title}`}
            width={1200}
            height={675}
            loading={featured ? "eager" : "lazy"}
            decoding={featured ? "sync" : "async"}
            fetchPriority={featured ? "high" : "auto"}
            className="aspect-[16/9] w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            {formatDate(post.date)} · {minutes} min read
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight text-balance text-fg sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{post.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-fg">
                {tagLabel(tag)}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition group-hover:text-accent">
            Read the note
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
