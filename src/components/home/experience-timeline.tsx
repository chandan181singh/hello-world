"use client";

import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { experiences } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { Building2, ExternalLink } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      eyebrow="Journey"
      title="Where I've shipped things."
      description="From validation intern to full-time engineer in twelve months — here is the path."
    >
      <ol className="relative ml-3 border-l border-dashed border-[var(--border)] pl-8">
        {experiences.map((exp, i) => (
          <li key={exp.id} className="relative mb-12 last:mb-0">
            <Reveal delay={i * 0.05}>
              <span
                className="absolute -left-[42px] flex h-7 w-7 items-center justify-center rounded-full text-white shadow-[0_0_18px_-2px_rgba(168,85,247,0.55)]"
                style={{
                  background:
                    "linear-gradient(135deg,#a855f7,#ec4899 60%,#06b6d4)",
                }}
              >
                <Building2 className="h-3.5 w-3.5" />
              </span>
              <div className="glow-card glow-card-hover relative rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
                      {exp.role}
                      {exp.url && (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--muted-foreground)] hover:text-[var(--color-primary)]"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      <span className="text-gradient-static font-medium">
                        {exp.company}
                      </span>
                      {exp.location && (
                        <>
                          <span className="mx-1.5 opacity-50">·</span>
                          {exp.location}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="gradient" className="capitalize">
                      {exp.type.replace("-", " ")}
                    </Badge>
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">
                      {exp.start} – {exp.end}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {exp.highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--color-cyan)" }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {exp.stack && exp.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
