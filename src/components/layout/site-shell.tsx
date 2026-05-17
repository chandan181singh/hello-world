"use client";

import { useState } from "react";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { CommandPalette } from "./command-palette";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { CursorFollower } from "@/components/effects/cursor-follower";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Toaster } from "sonner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <>
      <AuroraBackground />
      <CursorFollower />
      <ScrollProgress />
      <Navigation onCommandOpen={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
      <main className="pt-16">{children}</main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          },
        }}
      />
    </>
  );
}
