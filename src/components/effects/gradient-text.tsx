import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type GradientTextProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  animated?: boolean;
};

export function GradientText({
  as: Tag = "span",
  className,
  children,
  animated = true,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        animated ? "text-gradient" : "text-gradient-static",
        "inline-block",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
