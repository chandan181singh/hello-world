import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ROOT = process.cwd();

export type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  published?: boolean;
};

export async function getMdxBySlug(
  type: "projects" | "blog",
  slug: string,
): Promise<{ content: string; frontmatter: Frontmatter; readingMinutes: number } | null> {
  const filePath = path.join(ROOT, "src", "content", type, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(raw);
    return {
      content,
      frontmatter: data as Frontmatter,
      readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    };
  } catch {
    return null;
  }
}

export async function getAllSlugs(type: "projects" | "blog"): Promise<string[]> {
  const dir = path.join(ROOT, "src", "content", type);
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<
  Array<{
    slug: string;
    frontmatter: Frontmatter;
    readingMinutes: number;
  }>
> {
  const slugs = await getAllSlugs("blog");
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const data = await getMdxBySlug("blog", slug);
      if (!data) return null;
      return {
        slug,
        frontmatter: data.frontmatter,
        readingMinutes: data.readingMinutes,
      };
    }),
  );
  return posts
    .filter((p): p is NonNullable<typeof p> => p !== null && p.frontmatter.published !== false)
    .sort((a, b) => {
      const da = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
      const db = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
      return db - da;
    });
}
