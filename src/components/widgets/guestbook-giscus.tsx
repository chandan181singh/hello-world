"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  mapping?: "pathname" | "url" | "title" | "specific";
  term?: string;
};

const GISCUS_CONFIG = {
  repo: "chandan181singh/hello-world-comments" as `${string}/${string}`,
  repoId: "R_kgDOSgOo-g",
  category: "General",
  categoryId: "DIC_kwDOSgOo-s4C9Q5U",
};

export function GuestbookGiscus({ mapping = "specific", term = "guestbook" }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Giscus
      id="comments"
      repo={GISCUS_CONFIG.repo}
      repoId={GISCUS_CONFIG.repoId}
      category={GISCUS_CONFIG.category}
      categoryId={GISCUS_CONFIG.categoryId}
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
