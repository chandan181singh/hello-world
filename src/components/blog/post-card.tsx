import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Frontmatter } from "@/lib/mdx";

export function PostCard({
  slug,
  frontmatter,
  readingMinutes,
}: {
  slug: string;
  frontmatter: Frontmatter;
  readingMinutes: number;
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="glow-card glow-card-hover group block rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
        {frontmatter.date && (
          <time className="font-mono">{formatDate(frontmatter.date)}</time>
        )}
        <span className="opacity-30">·</span>
        <span className="inline-flex items-center gap-1.5 font-mono">
          <Clock className="h-3 w-3" />
          {readingMinutes} min read
        </span>
      </div>
      <h3 className="mt-3 flex items-start gap-1.5 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--color-primary)]">
        {frontmatter.title}
        <ArrowUpRight className="h-5 w-5 -translate-y-1 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-2 group-hover:opacity-100" />
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {frontmatter.description}
      </p>
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
