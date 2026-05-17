import type { Metadata } from "next";
import { Section } from "@/components/home/section";
import { LeetCodeWidget } from "@/components/widgets/leetcode-widget";
import { GitHubContributions } from "@/components/widgets/github-contributions";
import { Reveal } from "@/components/effects/reveal";
import { achievements } from "@/data/achievements";
import { Badge } from "@/components/ui/badge";
import { Trophy, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Live LeetCode, GitHub, and competitive programming stats.",
};

export default function AchievementsPage() {
  return (
    <Section
      eyebrow="Live Stats"
      title="What I've been up to."
      description="Live data from LeetCode and GitHub — keeps me honest, keeps the algorithms warm."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <LeetCodeWidget username="_chandan181_" />
        </Reveal>
        <Reveal delay={0.1}>
          <GitHubContributions username="chandan181singh" />
        </Reveal>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-display text-2xl font-semibold">
          Highlights
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <a
                href={a.href ?? "#"}
                target={a.href ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glow-card glow-card-hover group flex items-start gap-4 rounded-2xl p-5"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,#a855f7,#ec4899 60%,#06b6d4)",
                  }}
                >
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-display font-semibold">{a.title}</div>
                    {a.href && (
                      <ExternalLink className="h-3.5 w-3.5 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {a.description}
                  </p>
                  {a.metric && (
                    <Badge variant="gradient" className="mt-2 font-mono">
                      {a.metric}
                    </Badge>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
