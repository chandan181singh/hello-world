"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { skillCategories } from "@/data/skills";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Stack"
      title="Tools I reach for daily."
      description="A mix of systems, web, and ML. I'm a generalist who loves shipping reliable software."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.05}>
            <div className="glow-card glow-card-hover relative h-full rounded-2xl p-6">
              <div className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {cat.name}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s, idx) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                  >
                    <Badge variant="outline" className="border-[var(--border)]">
                      {s.icon && (
                        <img
                          alt=""
                          aria-hidden
                          src={`https://cdn.simpleicons.org/${s.icon}/a855f7`}
                          className="mr-1.5 h-3.5 w-3.5"
                          loading="lazy"
                        />
                      )}
                      {s.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
