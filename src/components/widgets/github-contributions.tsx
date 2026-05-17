"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

type RepoStats = {
  public_repos: number;
  followers: number;
  following: number;
  name?: string;
  bio?: string;
  avatar_url?: string;
};

export function GitHubContributions({ username }: { username: string }) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((d) => !cancelled && setStats(d))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div className="glow-card glow-card-hover relative overflow-hidden rounded-2xl p-6">
      <div className="noise rounded-2xl" />
      <div
        aria-hidden
        className="absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #a855f7, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
              <Github className="h-3.5 w-3.5" />
              GitHub
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
              @{username}
            </h3>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)] hover:text-[var(--foreground)]"
            aria-label="Open profile"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {stats && (
          <>
            {stats.bio && (
              <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                {stats.bio}
              </p>
            )}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Stat label="Repos" value={stats.public_repos ?? 0} />
              <Stat label="Followers" value={stats.followers ?? 0} />
              <Stat label="Following" value={stats.following ?? 0} />
            </div>
          </>
        )}

        {!stats && !error && (
          <div className="mt-6 animate-pulse space-y-3">
            <div className="h-10 w-32 rounded bg-[var(--muted)]" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded bg-[var(--muted)]" />
              <div className="h-16 rounded bg-[var(--muted)]" />
              <div className="h-16 rounded bg-[var(--muted)]" />
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
            Contribution graph
          </div>
          {/* GitHub Readme Stats — public service, SVG */}
          <div className="mt-3 overflow-hidden rounded-xl border border-[var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/a855f7/${username}`}
              alt={`${username} contribution chart`}
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[var(--border)] p-3 text-center"
    >
      <div className="font-display text-2xl font-bold text-gradient-static">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
        {label}
      </div>
    </motion.div>
  );
}
