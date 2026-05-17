"use client";

import { motion } from "framer-motion";
import { type PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}>;

/**
 * Soft-reveal wrapper that fades + slides + un-blurs content into view.
 *
 * Uses Framer's `whileInView` so elements already in the viewport on mount
 * animate in immediately (no IntersectionObserver-timing surprises).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.01, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
}
