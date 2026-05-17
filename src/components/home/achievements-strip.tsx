"use client";

import Link from "next/link";
import { ExternalLink, Trophy } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { achievements } from "@/data/achievements";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AchievementsStrip() {
  return (
    <Section
      id="achievements"
      eyebrow="Wins"
      title="A few proud moments."
      description="Numbers are not everything, but a little bit of competitive programming keeps me sharp."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08}>
            <motion.a
              href={a.href ?? "#"}
              target={a.href ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="glow-card glow-card-hover group relative block h-full overflow-hidden rounded-2xl p-6"
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
                style={{
                  background:
                    a.source === "leetcode"
                      ? "radial-gradient(circle, #facc15, transparent 70%)"
                      : "radial-gradient(circle, #a855f7, transparent 70%)",
                }}
              />
              <div className="relative flex items-start gap-4">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-[0_8px_24px_-8px_rgba(168,85,247,0.5)]"
                  style={{
                    background:
                      "linear-gradient(135deg,#a855f7,#ec4899 60%,#06b6d4)",
                  }}
                >
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {a.title}
                    </h3>
                    {a.href && (
                      <ExternalLink className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {a.description}
                  </p>
                  {a.metric && (
                    <Badge variant="gradient" className="mt-3 font-mono">
                      {a.metric}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/achievements">
            See live stats
          </Link>
        </Button>
      </div>
    </Section>
  );
}
