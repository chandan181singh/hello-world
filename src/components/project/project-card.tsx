"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/effects/tilt-card";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <TiltCard className="group glow-card glow-card-hover relative h-full overflow-hidden rounded-2xl">
      <div className="noise rounded-2xl" />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
        style={{
          background:
            project.tags.includes("AI/ML")
              ? "radial-gradient(circle, #06b6d4, transparent 70%)"
              : "radial-gradient(circle, #ec4899, transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-display text-xl font-semibold transition-colors group-hover:text-[var(--color-primary)]"
            >
              {project.title}
              <ArrowUpRight className="h-4 w-4 -translate-y-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1" />
            </Link>
            <div className="mt-0.5 font-mono text-xs text-[var(--muted-foreground)]">
              {project.month} {project.year}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)] hover:text-[var(--foreground)]"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="rounded-full p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)] hover:text-[var(--foreground)]"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {project.tagline}
        </p>

        {!compact && project.highlights && project.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-xs text-[var(--muted-foreground)]">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex gap-2">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: "var(--color-cyan)" }}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <Badge key={s} variant="outline" className="text-[10px]">
              {s}
            </Badge>
          ))}
          {project.stack.length > 5 && (
            <Badge variant="outline" className="text-[10px]">
              +{project.stack.length - 5}
            </Badge>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
