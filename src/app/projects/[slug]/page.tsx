import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink, Github, Globe } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getMdxBySlug, getAllSlugs } from "@/lib/mdx";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mdxComponents } from "@/components/blog/mdx-components";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const mdx = await getMdxBySlug("projects", slug);

  if (!project) notFound();

  return (
    <article className="container-page py-16 md:py-24">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <header className="mb-12 border-b border-[var(--border)] pb-12">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          <span className="text-gradient-static">{project.title}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
          {project.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <div className="inline-flex items-center gap-1.5 font-mono">
            <Calendar className="h-3.5 w-3.5" />
            {project.month} {project.year}
          </div>
          <span className="opacity-30">·</span>
          <div className="font-mono">Status: {project.status}</div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.github && (
            <Button asChild variant="outline">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Source
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          {project.live && (
            <Button asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                Live demo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </header>

      <div className="grid gap-12 md:grid-cols-[1fr_220px]">
        <div className="prose prose-invert max-w-none">
          {mdx ? (
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
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted-foreground)]">
              Detailed write-up coming soon.
            </div>
          )}
        </div>

        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <div className="glow-card rounded-2xl p-5">
            <div className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
              Tech stack
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Badge key={s} variant="outline" className="text-[10px]">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          {project.highlights && (
            <div className="glow-card rounded-2xl p-5">
              <div className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
                Highlights
              </div>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--color-cyan)" }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
