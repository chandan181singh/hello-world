import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { education } from "@/data/education";
import { GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EducationSection() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="School & college, in a nutshell."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.id} delay={i * 0.05}>
            <div className="glow-card glow-card-hover relative h-full rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-[0_8px_24px_-8px_rgba(168,85,247,0.5)]"
                  style={{
                    background:
                      "linear-gradient(135deg,#a855f7,#ec4899 60%,#06b6d4)",
                  }}
                >
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg font-semibold leading-tight">
                    {edu.institution}
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {edu.degree}
                    {edu.field && ` · ${edu.field}`}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {edu.start} – {edu.end}
                    </Badge>
                    {edu.score && <Badge variant="gradient">{edu.score}</Badge>}
                    {edu.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                        <MapPin className="h-3 w-3" /> {edu.location}
                      </span>
                    )}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted-foreground)]">
                      {edu.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full"
                            style={{ background: "var(--color-lime)" }}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
