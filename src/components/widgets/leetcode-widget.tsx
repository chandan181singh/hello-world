"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";

type LeetCodeData = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
};

async function tryEndpoints(username: string): Promise<LeetCodeData | null> {
  // We try multiple community public APIs and adapt their shapes to ours.
  // First one that returns useful data wins. Adding more here = more resilience.
  const sources: Array<() => Promise<LeetCodeData | null>> = [
    async () => {
      const r = await fetch(
        `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      );
      if (!r.ok) return null;
      const d = await r.json();
      if (!d?.totalSolved && !d?.matchedUserStats) return null;
      const easy = d.matchedUserStats?.acSubmissionNum?.find?.(
        (x: { difficulty: string }) => x.difficulty === "Easy",
      );
      const medium = d.matchedUserStats?.acSubmissionNum?.find?.(
        (x: { difficulty: string }) => x.difficulty === "Medium",
      );
      const hard = d.matchedUserStats?.acSubmissionNum?.find?.(
        (x: { difficulty: string }) => x.difficulty === "Hard",
      );
      return {
        totalSolved: d.totalSolved ?? 0,
        totalQuestions: d.totalQuestions ?? 0,
        easySolved: d.easySolved ?? easy?.count ?? 0,
        totalEasy: d.totalEasy ?? 0,
        mediumSolved: d.mediumSolved ?? medium?.count ?? 0,
        totalMedium: d.totalMedium ?? 0,
        hardSolved: d.hardSolved ?? hard?.count ?? 0,
        totalHard: d.totalHard ?? 0,
        acceptanceRate:
          typeof d.acceptanceRate === "number" ? d.acceptanceRate : 0,
        ranking: d.ranking ?? 0,
      };
    },
    async () => {
      const r = await fetch(
        `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
      );
      if (!r.ok) return null;
      const d = await r.json();
      if (!d?.totalSolved) return null;
      return {
        totalSolved: d.totalSolved,
        totalQuestions: d.totalQuestions ?? 0,
        easySolved: d.easySolved ?? 0,
        totalEasy: d.totalEasy ?? 0,
        mediumSolved: d.mediumSolved ?? 0,
        totalMedium: d.totalMedium ?? 0,
        hardSolved: d.hardSolved ?? 0,
        totalHard: d.totalHard ?? 0,
        acceptanceRate: d.acceptanceRate ?? 0,
        ranking: d.ranking ?? 0,
      };
    },
    async () => {
      const r = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`,
      );
      if (!r.ok) return null;
      const d = await r.json();
      if (d?.status === "error" || !d?.totalSolved) return null;
      return d as LeetCodeData;
    },
  ];

  for (const source of sources) {
    try {
      const result = await source();
      if (result && result.totalSolved > 0) return result;
    } catch {
      // try next
    }
  }
  return null;
}

export function LeetCodeWidget({ username }: { username: string }) {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    tryEndpoints(username)
      .then((d) => {
        if (cancelled) return;
        if (d) setData(d);
        else setError("Stats temporarily unavailable.");
      })
      .catch(() => !cancelled && setError("Stats temporarily unavailable."));
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
          background: "radial-gradient(circle, #facc15, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
              <Trophy className="h-3.5 w-3.5 text-[#facc15]" />
              LeetCode
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
              @{username}
            </h3>
          </div>
          <a
            href={`https://leetcode.com/u/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-primary)_10%,transparent)] hover:text-[var(--foreground)]"
            aria-label="Open profile"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {error && (
          <>
            <div className="mt-6 flex items-baseline gap-2">
              <div className="font-display text-5xl font-bold text-gradient-static">
                1871
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">
                contest rating
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#facc15" }}
              />
              Knight · Top 5% globally
            </div>
            <p className="mt-4 text-xs text-[var(--muted-foreground)]">
              Live stats temporarily unavailable. Click the profile link above
              for the latest numbers.
            </p>
          </>
        )}

        {!error && !data && (
          <div className="mt-6 animate-pulse space-y-3">
            <div className="h-10 w-32 rounded bg-[var(--muted)]" />
            <div className="h-3 w-full rounded bg-[var(--muted)]" />
            <div className="h-3 w-3/4 rounded bg-[var(--muted)]" />
          </div>
        )}

        {data && (
          <>
            <div className="mt-6 flex items-baseline gap-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-5xl font-bold text-gradient-static"
              >
                {data.totalSolved}
              </motion.div>
              <div className="text-sm text-[var(--muted-foreground)]">
                / {data.totalQuestions} solved
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
              <div>
                Acceptance:{" "}
                <span className="font-mono text-[var(--foreground)]">
                  {data.acceptanceRate?.toFixed?.(1) ?? data.acceptanceRate}%
                </span>
              </div>
              <div>
                Global Rank:{" "}
                <span className="font-mono text-[var(--foreground)]">
                  #{data.ranking?.toLocaleString?.()}
                </span>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              <Bar
                label="Easy"
                color="#16a34a"
                solved={data.easySolved}
                total={data.totalEasy}
              />
              <Bar
                label="Medium"
                color="#facc15"
                solved={data.mediumSolved}
                total={data.totalMedium}
              />
              <Bar
                label="Hard"
                color="#ef4444"
                solved={data.hardSolved}
                total={data.totalHard}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Bar({
  label,
  color,
  solved,
  total,
}: {
  label: string;
  color: string;
  solved: number;
  total: number;
}) {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span style={{ color }}>{label}</span>
        <span className="font-mono text-[var(--muted-foreground)]">
          {solved} / {total}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--muted)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="h-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
