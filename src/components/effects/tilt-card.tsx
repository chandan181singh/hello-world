"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = PropsWithChildren<{
  className?: string;
  max?: number;
  glare?: boolean;
}>;

export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const rotX = useTransform(sy, [0, 1], [max, -max]);
  const rotY = useTransform(sx, [0, 1], [-max, max]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative will-change-transform", className)}
      style={{ transformStyle: "preserve-3d", rotateX: rotX, rotateY: rotY }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${glareX as unknown as string} ${glareY as unknown as string}, rgba(255,255,255,0.18), transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
}
