import type { Metadata } from "next";
import { Section } from "@/components/home/section";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/effects/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on distributed systems, ML, and engineering craft.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Section
      eyebrow="Writing"
      title="Notes from the trenches."
      description="Mostly short essays on distributed systems, ML, and shipping. Occasionally personal."
    >
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center text-[var(--muted-foreground)]">
          No posts yet — first one ships soon.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <PostCard
                slug={p.slug}
                frontmatter={p.frontmatter}
                readingMinutes={p.readingMinutes}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
