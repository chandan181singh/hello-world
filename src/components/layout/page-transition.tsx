"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

/**
 * Enter-only page transition. We deliberately avoid AnimatePresence + `exit`
 * here because under static export the previous tree can unmount before
 * exit completes, occasionally leaving the new page stuck in the exit
 * (blurred) state. Re-mounting on pathname change and animating from
 * blur(6px) → blur(0) gives the same feel and is bulletproof.
 */
export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  );
}
