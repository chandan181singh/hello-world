import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C++", icon: "cplusplus" },
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "REST APIs", icon: "openapiinitiative" },
      { name: "PyTest", icon: "pytest" },
    ],
  },
  {
    name: "Data & Cloud",
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "SQL", icon: "postgresql" },
      { name: "Linux", icon: "linux" },
      { name: "CI/CD", icon: "githubactions" },
    ],
  },
  {
    name: "ML / AI",
    skills: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "OpenCV", icon: "opencv" },
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "Gerrit", icon: "gerrit" },
      { name: "Jira", icon: "jira" },
      { name: "Confluence", icon: "confluence" },
    ],
  },
  {
    name: "Core CS",
    skills: [
      { name: "Data Structures" },
      { name: "Algorithms" },
      { name: "OOP" },
      { name: "Operating Systems" },
      { name: "DBMS" },
      { name: "Distributed Systems" },
    ],
  },
];

export const interests = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "Web Development",
  "Distributed Systems",
];
