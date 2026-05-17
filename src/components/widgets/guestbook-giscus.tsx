"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  mapping?: "pathname" | "url" | "title" | "specific";
  term?: string;
};

/**
 * Guestbook / comments powered by Giscus (GitHub Discussions).
 *
 * To finish setup:
 *   1. Go to https://giscus.app and select Chandan's repo (e.g. chandan181singh/portfolio-comments).
 *   2. Enable Discussions on that repo and install the Giscus app.
 *   3. Copy the data-repo-id, data-category, data-category-id values it generates.
 *   4. Add them to .env.local as NEXT_PUBLIC_GISCUS_REPO_ID etc. (defaults below are placeholders).
 *
 * The widget gracefully shows a setup hint while env vars are missing.
 */
export function GuestbookGiscus({ mapping = "specific", term = "guestbook" }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` | undefined;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] p-6 text-sm text-[var(--muted-foreground)]">
        <p>
          The guestbook is powered by{" "}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gradient-static underline underline-offset-4"
          >
            Giscus
          </a>{" "}
          (GitHub Discussions). Add the following env vars in{" "}
          <code className="font-mono text-xs">.env.local</code> to activate it:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-[var(--muted)] p-3 font-mono text-[11px]">
          NEXT_PUBLIC_GISCUS_REPO=owner/repo{"\n"}
          NEXT_PUBLIC_GISCUS_REPO_ID=R_xxx{"\n"}
          NEXT_PUBLIC_GISCUS_CATEGORY=General{"\n"}
          NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxx
        </pre>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <Giscus
      id="comments"
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "light" ? "light" : "dark_dimmed"}
      lang="en"
      loading="lazy"
    />
  );
}
