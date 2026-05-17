import { cn } from "@/lib/utils";
import { GradientText } from "@/components/effects/gradient-text";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Section header uses a CSS-based fade-up animation (not IntersectionObserver),
 * so it shows immediately on first paint without depending on JS timing.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="container-page">
        <div className="section-header-reveal mb-12 flex flex-col items-start gap-3">
          {eyebrow && (
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1 w-8 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg,#a855f7,#ec4899 50%,#06b6d4)",
                }}
              />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
                {eyebrow}
              </span>
            </div>
          )}
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {typeof title === "string" ? (
              <>
                {title.split(" ").slice(0, -1).join(" ")}{" "}
                <GradientText animated={false}>
                  {title.split(" ").slice(-1).join(" ")}
                </GradientText>
              </>
            ) : (
              title
            )}
          </h2>
          {description && (
            <p className="max-w-2xl text-base text-[var(--muted-foreground)] md:text-lg">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
