import type { Metadata } from "next";
import { Section } from "@/components/home/section";
import { projects } from "@/data/projects";
import { ProjectFilter } from "@/components/project/project-filter";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Chandan Kumar.",
};

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Projects"
      title="Things I've built."
      description="Production work, weekend hacks, and the occasional research experiment. Filter by tag below."
    >
      <ProjectFilter projects={projects} />
    </Section>
  );
}
