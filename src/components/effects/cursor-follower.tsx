"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Decorative glowing ring that trails the cursor.
 * Native cursor remains visible — this is purely cosmetic.
 * Hidden on touch devices and for reduced-motion users.
 */
export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.15 });
  const ringY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.15 });
  const [hovering, setHovering] = useState(false);
  const enabled = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    enabled.current = !reduced && !coarse;
    if (!enabled.current) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const enter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const leave = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, [x, y]);

  if (typeof window !== "undefined") {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: hovering ? 0.5 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="h-7 w-7 rounded-full border"
        style={{
          borderColor: "color-mix(in oklab, var(--color-primary) 50%, transparent)",
          boxShadow:
            "0 0 10px color-mix(in oklab, var(--color-primary) 20%, transparent)",
        }}
      />
    </motion.div>
  );
}
