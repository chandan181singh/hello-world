import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "./section";
import { Reveal } from "@/components/effects/reveal";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project/project-card";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Things I've built lately."
      description="A small slice. Each card opens into a longer case study."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/projects">
            See all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
