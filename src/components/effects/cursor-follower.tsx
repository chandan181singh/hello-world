"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft glowing dot + ring that follows the cursor.
 * Hidden on touch devices via media query, ignores reduced motion users.
 */
export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 500, damping: 30 });
  const dotY = useSpring(y, { stiffness: 500, damping: 30 });
  const [hovering, setHovering] = useState(false);
  const enabled = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    enabled.current = !reduced && !coarse;
    if (!enabled.current) return;

    document.documentElement.classList.add("cursor-fancy");

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
      document.documentElement.classList.remove("cursor-fancy");
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
    <>
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
            scale: hovering ? 1.8 : 1,
            opacity: hovering ? 0.4 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="h-9 w-9 rounded-full border-2"
          style={{
            borderColor: "color-mix(in oklab, var(--color-primary) 70%, transparent)",
            boxShadow:
              "0 0 18px color-mix(in oklab, var(--color-primary) 45%, transparent)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{
            background: "var(--color-lime)",
            boxShadow: "0 0 12px var(--color-lime)",
          }}
        />
      </motion.div>
    </>
  );
}
