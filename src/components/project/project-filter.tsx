"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCard } from "./project-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [projects, active],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              active === t
                ? "text-white"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
            )}
          >
            {active === t && (
              <motion.span
                layoutId="filter-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(120deg,#a855f7,#ec4899 50%,#06b6d4)",
                }}
              />
            )}
            {active !== t && (
              <span className="absolute inset-0 -z-10 rounded-full border border-[var(--border)]" />
            )}
            {t}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-12 grid place-items-center rounded-2xl border border-dashed border-[var(--border)] p-12 text-center text-sm text-[var(--muted-foreground)]">
          <div>No projects match &quot;{active}&quot;.</div>
          <button
            onClick={() => setActive("All")}
            className="mt-2 text-xs text-[var(--color-primary)] hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}

      <div className="mt-10 text-xs text-[var(--muted-foreground)]">
        Showing {filtered.length} of {projects.length} projects.
        <Badge variant="ghost" className="ml-2">
          More coming soon
        </Badge>
      </div>
    </>
  );
}
