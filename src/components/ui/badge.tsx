import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[color-mix(in_oklab,var(--color-primary)_15%,transparent)] text-[var(--foreground)]",
        outline:
          "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
        gradient:
          "border-transparent text-white bg-[linear-gradient(120deg,#a855f7,#ec4899_50%,#06b6d4)]",
        ghost:
          "border-transparent bg-transparent text-[var(--muted-foreground)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
