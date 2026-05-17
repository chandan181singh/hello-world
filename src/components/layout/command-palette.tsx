"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Home,
  FolderKanban,
  BookOpen,
  Trophy,
  MessageCircle,
  Wrench,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks, socials } from "@/data/site";

const iconForRoute: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": Home,
  "/projects": FolderKanban,
  "/blog": BookOpen,
  "/achievements": Trophy,
  "/guestbook": MessageCircle,
  "/uses": Wrench,
};

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && (e.target as HTMLElement).tagName === "INPUT") return;
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[20vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl"
        style={{
          boxShadow:
            "0 24px 80px -16px rgba(168,85,247,0.35), 0 8px 32px -8px rgba(0,0,0,0.5)",
        }}
      >
        <Command label="Command palette" className="overflow-hidden rounded-2xl">
          <div className="border-b border-[var(--border)] px-4">
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages, actions, or socials…"
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-foreground)]"
            />
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--muted-foreground)]">
              No results found.
            </Command.Empty>

            <Command.Group heading="Pages" className="text-xs font-semibold text-[var(--muted-foreground)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              {navLinks.map((l) => {
                const Icon = iconForRoute[l.href] ?? Home;
                return (
                  <CmdItem key={l.href} onSelect={() => go(l.href)} icon={Icon}>
                    {l.label}
                  </CmdItem>
                );
              })}
              <CmdItem onSelect={() => go("/resume")} icon={FileText}>
                Resume
              </CmdItem>
            </Command.Group>

            <Command.Group heading="Theme" className="text-xs font-semibold text-[var(--muted-foreground)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              <CmdItem
                onSelect={() => {
                  setTheme("dark");
                  setOpen(false);
                }}
                icon={Moon}
              >
                Switch to Dark
              </CmdItem>
              <CmdItem
                onSelect={() => {
                  setTheme("light");
                  setOpen(false);
                }}
                icon={Sun}
              >
                Switch to Light
              </CmdItem>
            </Command.Group>

            <Command.Group heading="Connect" className="text-xs font-semibold text-[var(--muted-foreground)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              {socials.map((s) => {
                const Icon =
                  socialIcons[s.platform as keyof typeof socialIcons] ?? Github;
                return (
                  <CmdItem
                    key={s.platform}
                    onSelect={() => go(s.href)}
                    icon={Icon}
                  >
                    {s.label}
                  </CmdItem>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
        <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] px-3 py-2 text-[10px] text-[var(--muted-foreground)]">
          <span>
            <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono">↑↓</kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono">↵</kbd>{" "}
            select
          </span>
          <span>
            <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono">esc</kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}

function CmdItem({
  children,
  onSelect,
  icon: Icon,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors data-[selected=true]:bg-[color-mix(in_oklab,var(--color-primary)_15%,transparent)]"
    >
      <Icon className="h-4 w-4 text-[var(--muted-foreground)]" />
      {children}
    </Command.Item>
  );
}
