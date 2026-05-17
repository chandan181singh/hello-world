import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllSlugs, getMdxBySlug } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/blog/mdx-components";
import { GuestbookGiscus } from "@/components/widgets/guestbook-giscus";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const mdx = await getMdxBySlug("blog", slug);
  if (!mdx) return {};
  return {
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const mdx = await getMdxBySlug("blog", slug);
  if (!mdx) notFound();

  return (
    <article className="container-page py-16 md:py-24">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </Link>

      <header className="mb-10 border-b border-[var(--border)] pb-10">
        <div className="flex flex-wrap items-center gap-2">
          {mdx.frontmatter.tags?.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          <span className="text-gradient-static">{mdx.frontmatter.title}</span>
        </h1>
        {mdx.frontmatter.description && (
          <p className="mt-3 text-lg text-[var(--muted-foreground)]">
            {mdx.frontmatter.description}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
          {mdx.frontmatter.date && (
            <div className="inline-flex items-center gap-1.5 font-mono">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(mdx.frontmatter.date)}
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 font-mono">
            <Clock className="h-3.5 w-3.5" />
            {mdx.readingMinutes} min read
          </div>
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={mdx.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <hr className="my-16 border-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--color-primary)_40%,transparent)] to-transparent" />

      <section>
        <h2 className="font-display text-2xl font-semibold">Comments</h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Powered by GitHub Discussions via Giscus.
        </p>
        <div className="mt-6">
          <GuestbookGiscus mapping="pathname" />
        </div>
      </section>
    </article>
  );
}
