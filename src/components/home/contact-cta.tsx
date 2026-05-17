"use client";

import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { site, socials } from "@/data/site";
import { Magnetic } from "@/components/effects/magnetic";
import { toast } from "sonner";

export function ContactCTA() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Let's build something."
      description="Working on something interesting, hiring, or just want to chat about distributed systems and ML? My inbox is open."
    >
      <Reveal>
        <div className="glow-card relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div className="noise rounded-3xl" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              background:
                "radial-gradient(800px circle at 0% 0%, color-mix(in oklab, #a855f7 35%, transparent), transparent 60%), radial-gradient(800px circle at 100% 100%, color-mix(in oklab, #06b6d4 35%, transparent), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
                Drop me a line
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block font-display text-2xl font-bold tracking-tight md:text-4xl text-gradient-static"
              >
                {site.email}
              </a>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(site.email);
                    toast.success("Email copied to clipboard");
                  }}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
                <span className="opacity-50">·</span>
                <span className="font-mono">{site.phone}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={0.3}>
                <Button asChild size="lg">
                  <a href={`mailto:${site.email}`}>
                    <Mail className="h-4 w-4" />
                    Email me
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={socials.find((s) => s.platform === "linkedin")?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
