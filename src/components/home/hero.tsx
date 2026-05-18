"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/effects/gradient-text";
import { Magnetic } from "@/components/effects/magnetic";
import { site, socials } from "@/data/site";
import { fireConfetti } from "@/components/effects/confetti";
import { Github, Linkedin, Mail } from "lucide-react";
import { withBase } from "@/lib/utils";

const social = {
  github: socials.find((s) => s.platform === "github")!,
  linkedin: socials.find((s) => s.platform === "linkedin")!,
  email: socials.find((s) => s.platform === "email")!,
};

const ROLES = [
  "Software Engineer",
  "Distributed Systems Enthusiast",
  "Competitive Programmer",
  "ML Tinkerer",
  "MNNIT Alum",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-28 md:pb-32">
      <div className="container-page">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="gap-1.5 py-1 pl-2 pr-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-lime)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-lime)]" />
                </span>
                <span className="text-xs">
                  Currently @ {site.company}
                </span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl"
            >
              Hey, I&apos;m
              <br className="hidden md:block" />{" "}
              <GradientText className="font-display">
                {site.name.split(" ")[0]} {site.name.split(" ")[1]}
              </GradientText>
              <Sparkles
                className="ml-2 inline-block h-7 w-7 text-[var(--color-lime)] md:h-10 md:w-10"
                strokeWidth={1.5}
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-xl text-base text-[var(--muted-foreground)] md:text-lg"
            >
              <Typewriter />
              <p className="mt-3 leading-relaxed">{site.bio}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <Button asChild size="lg" className="group">
                  <Link href="/projects">
                    See my work
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="outline" onClick={() => fireConfetti()}>
                  <a href={withBase(site.resumeUrl)} download>
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </Magnetic>
              <div className="ml-1 flex items-center gap-1.5">
                <SocialIcon href={social.github.href} label="GitHub">
                  <Github className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={social.linkedin.href} label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={social.email.href} label="Email">
                  <Mail className="h-4 w-4" />
                </SocialIcon>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-7 flex items-center gap-2 text-xs text-[var(--muted-foreground)]"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{site.location}</span>
              <span className="opacity-50">·</span>
              <span className="font-mono">{LocalTime()}</span>
            </motion.div>
          </div>

          <HeroAvatar />
        </div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] transition-all hover:scale-110 hover:text-[var(--foreground)] hover:shadow-[0_0_18px_-4px_rgba(168,85,247,0.6)]"
    >
      {children}
    </a>
  );
}

function HeroAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
      className="relative mx-auto hidden w-full max-w-sm md:block"
    >
      <div
        className="absolute inset-0 rounded-[2rem] blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #a855f7, #ec4899, #06b6d4, #84cc16, #a855f7)",
          opacity: 0.35,
          animation: "aurora 18s linear infinite",
        }}
      />
      <div
        className="glow-card relative grid h-full place-items-center overflow-hidden rounded-[2rem] p-6"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--card) 95%, transparent), color-mix(in oklab, var(--card) 100%, transparent))",
        }}
      >
        <div className="noise" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <div
            className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-full ring-4 ring-white/10 shadow-2xl"
            style={{
              boxShadow:
                "0 0 60px -4px rgba(168,85,247,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <Image
              src={withBase("/chandan.png")}
              alt={site.name}
              fill
              priority
              sizes="(min-width: 768px) 260px, 200px"
              className="object-cover"
            />
          </div>
          <div className="mt-5 font-display text-xl font-semibold">
            {site.name}
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            {site.role}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <span className="rounded-full border border-[var(--border)] px-2 py-0.5">
              CSE @ MNNIT
            </span>
            <span className="rounded-full border border-[var(--border)] px-2 py-0.5">
              LC Knight
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Typewriter() {
  return (
    <div className="font-mono text-sm tracking-tight text-[var(--foreground)]/80 md:text-base">
      <span className="text-[var(--color-cyan)]">$</span>{" "}
      <RotatingRoles />
      <span
        className="ml-0.5 inline-block h-4 w-1.5 -translate-y-px translate-x-px align-middle bg-[var(--color-primary)]"
        style={{ animation: "pulse-glow 1.2s steps(2) infinite" }}
      />
    </div>
  );
}

function RotatingRoles() {
  return (
    <span className="relative inline-block min-h-[1.5em] align-baseline">
      <RoleCycle />
    </span>
  );
}

function RoleCycle() {
  const [i, setI] = useStateClient(0);
  useIntervalClient(() => setI((i + 1) % ROLES.length), 2400);
  return (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="text-gradient-static"
    >
      {ROLES[i]}
    </motion.span>
  );
}

function LocalTime() {
  const [time, setTime] = useStateClient<string>(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }),
  );
  useIntervalClient(() => {
    setTime(
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }),
    );
  }, 30_000);
  return `${time} IST`;
}

import { useEffect, useState } from "react";
function useStateClient<T>(initial: T) {
  return useState<T>(initial);
}
function useIntervalClient(fn: () => void, ms: number) {
  useEffect(() => {
    const id = setInterval(fn, ms);
    return () => clearInterval(id);
  }, [fn, ms]);
}
