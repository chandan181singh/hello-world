import { Reveal } from "@/components/effects/reveal";
import { Section } from "./section";
import { site } from "@/data/site";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Curious engineer, calm under failures."
      description="I work on the edge between reliability and speed. I love writing code that pre-empts the chaos production throws at distributed systems."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Reveal>
          <Card
            kicker="01"
            title="What I do"
            body="At Marvell I design Python-based test frameworks that validate distributed storage systems end-to-end — protocol, firmware, and cloud surfaces."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card
            kicker="02"
            title="How I think"
            body="Take messy real-world systems, build small reliable abstractions, automate the boring stuff, and write so the next person on-call thanks you."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <Card
            kicker="03"
            title="Outside work"
            body={`Sharpening DSA on LeetCode (Knight, top 5%), tinkering with ML, and shipping side projects when inspiration strikes — like ${site.name.split(" ")[0]}'s favorite weekend.`}
          />
        </Reveal>
      </div>
    </Section>
  );
}

function Card({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="glow-card glow-card-hover relative h-full rounded-2xl p-6">
      <div className="noise rounded-2xl" />
      <div className="relative">
        <div className="font-mono text-xs tracking-widest text-[var(--color-cyan)]">
          {kicker}
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {body}
        </p>
      </div>
    </div>
  );
}
