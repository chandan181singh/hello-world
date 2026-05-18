import Link from "next/link";
import { Github, Linkedin, Mail, Code2, Trophy, Lock } from "lucide-react";
import { site, socials, navLinks } from "@/data/site";
import { withBase } from "@/lib/utils";

const platformIcon = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  leetcode: Code2,
  codechef: Trophy,
  twitter: Github,
  phone: Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-[var(--border)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-primary) 50%, transparent) 30%, color-mix(in oklab, var(--color-accent) 50%, transparent) 70%, transparent)",
        }}
      />
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-lg font-bold text-gradient-static">
              {site.name}
            </div>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
              {site.tagline}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)]">
              Navigate
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)]">
              Elsewhere
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = platformIcon[s.platform] ?? Github;
                return (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] transition-all hover:scale-110 hover:text-[var(--foreground)] hover:shadow-[0_0_18px_-4px_rgba(168,85,247,0.6)]"
                      aria-label={s.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted-foreground)] md:flex-row md:items-center">
          <p>
            © {year} {site.name}. Built with Next.js & shipped from GitHub.
          </p>
          <div className="flex items-center gap-4 font-mono">
            <a
              href={withBase("/admin/")}
              className="inline-flex items-center gap-1 opacity-60 transition-opacity hover:opacity-100"
              aria-label="Admin"
              title="Admin (authorized users only)"
            >
              <Lock className="h-3 w-3" />
              <span>admin</span>
            </a>
            <p>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-lime)] align-middle" />{" "}
              available for cool projects
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
