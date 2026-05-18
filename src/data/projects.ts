import type { Project } from "@/types";
import data from "./json/projects.json";

export const projects: Project[] = (data.projects ?? []).map((p) => ({
  ...p,
  status: p.status as Project["status"],
  github: p.github || undefined,
  live: p.live || undefined,
  image: p.image || undefined,
}));

export const featuredProjects = projects.filter((p) => p.featured);
