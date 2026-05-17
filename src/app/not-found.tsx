"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/effects/gradient-text";
import { Magnetic } from "@/components/effects/magnetic";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-20">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <h1 className="font-display text-[8rem] font-bold leading-none tracking-tight md:text-[14rem]">
            <GradientText>404</GradientText>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 font-display text-xl text-[var(--foreground)] md:text-2xl"
        >
          Oof — that page wandered off.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 max-w-md text-sm text-[var(--muted-foreground)]"
        >
          The link is broken, the page moved, or you typed an old URL. Let&apos;s
          get you home.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic strength={0.3}>
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Button asChild variant="outline">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                Browse projects
              </Link>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
