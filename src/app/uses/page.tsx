import type { Metadata } from "next";
import { Section } from "@/components/home/section";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Cpu,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Terminal,
  Wrench,
} from "lucide-react";

const groups = [
  {
    name: "Code & editor",
    icon: Code2,
    items: [
      { label: "VS Code", note: "main editor for everything Python/JS" },
      { label: "Vim", note: "for quick file edits over SSH" },
      { label: "iTerm2 / Warp", note: "terminal" },
      { label: "Theme", note: "One Dark Pro / GitHub Dark" },
      { label: "Font", note: "JetBrains Mono · Geist Mono" },
    ],
  },
  {
    name: "Languages & tools",
    icon: Terminal,
    items: [
      { label: "Python", note: "daily driver — PyTest, asyncio, Paramiko" },
      { label: "C++", note: "competitive programming + systems" },
      { label: "Git", note: "Gerrit at work, GitHub for everything else" },
      { label: "Linux", note: "Ubuntu on most boxes" },
      { label: "Postman", note: "for poking APIs" },
    ],
  },
  {
    name: "Workflow",
    icon: Wrench,
    items: [
      { label: "Jira + Confluence", note: "planning + docs at Marvell" },
      { label: "Notion", note: "personal notes & long-form drafts" },
      { label: "Obsidian", note: "knowledge graph & weekly review" },
      { label: "Raycast", note: "command palette + launcher" },
    ],
  },
  {
    name: "Hardware",
    icon: Cpu,
    items: [
      { label: "Workstation", note: "Linux dev box" },
      { label: "Laptop", note: "for travel + side projects" },
      { label: "Monitor", note: "1440p, second-screen-for-life" },
      { label: "Keyboard", note: "TKL mechanical" },
      { label: "Headphones", note: "noise cancellation for focus" },
    ],
  },
];

const iconMap = {
  Code2,
  Terminal,
  Wrench,
  Cpu,
  Monitor,
  Mouse,
  Keyboard,
  Headphones,
} as const;

export const metadata: Metadata = {
  title: "Uses",
  description: "Software, hardware, and the rest of the kit I rely on.",
};

export default function UsesPage() {
  return (
    <Section
      eyebrow="Setup"
      title="What I use, daily."
      description="A frequently-asked list — what's on the desk, in the editor, and in my muscle memory."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.name} delay={i * 0.05}>
              <div className="glow-card glow-card-hover relative h-full rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl text-white"
                    style={{
                      background:
                        "linear-gradient(135deg,#a855f7,#ec4899 60%,#06b6d4)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {g.name}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {g.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--border)] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-right text-xs text-[var(--muted-foreground)]">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <Badge variant="ghost">last updated · live</Badge>
        <span>—</span>
        <span>this list grows as my setup does.</span>
      </div>
    </Section>
  );
}
