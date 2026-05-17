"use client";

import { useEffect, useRef } from "react";

/**
 * A vibrant, animated aurora-like blob background using pure CSS gradients
 * and a few absolutely-positioned floating blobs. Lightweight, no canvas.
 */
export function AuroraBackground() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      ref.current.style.setProperty("--mx", `${x}px`);
      ref.current.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--mx" as string]: "0px", ["--my" as string]: "0px" }}
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div
        className="absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #a855f7 0%, transparent 60%)",
          transform: "translate(var(--mx), var(--my))",
          animation: "aurora 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #ec4899 0%, transparent 60%)",
          transform:
            "translate(calc(var(--mx) * -1), calc(var(--my) * -1))",
          animation: "aurora 26s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #06b6d4 0%, transparent 60%)",
          transform: "translate(calc(var(--mx) * 0.5), calc(var(--my) * 0.5))",
          animation: "aurora 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at center, #84cc16 0%, transparent 70%)",
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
