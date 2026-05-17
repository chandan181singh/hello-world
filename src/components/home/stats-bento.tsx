"use client";

import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { Code2, Github, MapPin, Trophy, Coffee, BookOpen } from "lucide-react";
import { site } from "@/data/site";

export function StatsBento() {
  return (
    <Section
      id="stats"
      eyebrow="Snapshot"
      title="A quick look at me."
    >
      <div className="grid auto-rows-[8rem] grid-cols-2 gap-4 md:grid-cols-4">
        {/* Big card */}
        <Reveal className="col-span-2 row-span-2 md:col-span-2">
          <BentoCard className="h-full p-6">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
                  Currently
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                  Building reliable
                  <br />
                  storage systems at{" "}
                  <span className="text-gradient-static">{site.company}</span>.
                </h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-lime)]" />
                <span>Open to collaborations & cool side projects</span>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {/* LeetCode */}
        <Reveal delay={0.05}>
          <BentoCard className="h-full p-5">
            <div className="flex h-full flex-col justify-between">
              <Code2 className="h-5 w-5 text-[#facc15]" />
              <div>
                <div className="font-display text-2xl font-bold">1871</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  LeetCode Knight · Top 5%
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {/* GitHub */}
        <Reveal delay={0.1}>
          <BentoCard className="h-full p-5">
            <div className="flex h-full flex-col justify-between">
              <Github className="h-5 w-5" />
              <div>
                <div className="font-display text-lg font-bold">@chandan181singh</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Shipping in public
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {/* Codechef */}
        <Reveal delay={0.15}>
          <BentoCard className="h-full p-5">
            <div className="flex h-full flex-col justify-between">
              <Trophy className="h-5 w-5 text-[var(--color-accent)]" />
              <div>
                <div className="font-display text-2xl font-bold">#468</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  CodeChef Starters 88
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {/* Location */}
        <Reveal delay={0.2}>
          <BentoCard className="h-full p-5">
            <div className="flex h-full flex-col justify-between">
              <MapPin className="h-5 w-5 text-[var(--color-cyan)]" />
              <div>
                <div className="font-display text-base font-semibold">India</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  GMT +5:30
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {/* Coffee */}
        <Reveal delay={0.25}>
          <BentoCard className="h-full p-5">
            <div className="flex h-full flex-col justify-between">
              <Coffee className="h-5 w-5 text-[var(--color-primary)]" />
              <div>
                <div className="font-display text-base font-semibold">Chai mostly</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Fuel of choice
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>

        {/* Reading */}
        <Reveal delay={0.3}>
          <BentoCard className="h-full p-5">
            <div className="flex h-full flex-col justify-between">
              <BookOpen className="h-5 w-5 text-[var(--color-lime)]" />
              <div>
                <div className="font-display text-base font-semibold">DDIA</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Currently reading
                </div>
              </div>
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </Section>
  );
}

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glow-card glow-card-hover relative overflow-hidden rounded-2xl ${className ?? ""}`}
    >
      <div className="noise rounded-2xl" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
