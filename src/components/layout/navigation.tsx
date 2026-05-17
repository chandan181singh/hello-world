"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Magnetic } from "@/components/effects/magnetic";

type NavigationProps = {
  onCommandOpen?: () => void;
};

export function Navigation({ onCommandOpen }: NavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_75%,transparent)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-lg text-white shadow-[0_4px_12px_-2px_rgba(168,85,247,0.6)]"
              style={{
                background:
                  "linear-gradient(135deg,#a855f7,#ec4899 50%,#06b6d4)",
              }}
            >
              {site.initials}
            </span>
            <span className="hidden text-gradient-static sm:inline">
              {site.shortName}
            </span>
          </Link>
        </Magnetic>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
              )}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="active-nav"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--color-primary)_12%,transparent)]"
                />
              )}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onCommandOpen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCommandOpen}
              className="hidden h-9 gap-2 px-3 md:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="text-xs text-[var(--muted-foreground)]">
                <kbd className="font-mono">⌘K</kbd>
              </span>
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="container-page flex flex-col gap-1 border-t border-[var(--border)] py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-[color-mix(in_oklab,var(--color-primary)_12%,transparent)] text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
