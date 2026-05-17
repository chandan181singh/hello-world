import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "text-white shadow-[0_8px_24px_-8px_rgba(168,85,247,0.6)] hover:shadow-[0_12px_32px_-8px_rgba(236,72,153,0.7)] bg-[linear-gradient(120deg,#a855f7,#ec4899_50%,#06b6d4)] bg-[length:200%_100%] hover:bg-[position:100%_0]",
        outline:
          "border border-[var(--border)] bg-transparent hover:bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] hover:border-[color-mix(in_oklab,var(--color-primary)_45%,transparent)]",
        ghost:
          "hover:bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)]",
        secondary:
          "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[color-mix(in_oklab,var(--color-primary)_10%,var(--muted))]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
