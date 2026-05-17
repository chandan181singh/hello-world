"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 z-[60] h-[3px] w-full origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-cyan) 100%)",
          boxShadow:
            "0 0 12px color-mix(in oklab, var(--color-primary) 50%, transparent)",
        }}
      />
    </motion.div>
  );
}
