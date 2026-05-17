import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "marvell-fte",
    company: "Marvell Technology",
    role: "Software Engineer",
    type: "full-time",
    location: "India",
    start: "Jan 2025",
    end: "Present",
    url: "https://www.marvell.com",
    highlights: [
      "Designed and automated scalable Python-based test frameworks using PyTest and Paramiko to validate distributed storage systems, reducing manual validation effort by approximately 90–95%.",
      "Collaborated with cross-functional teams (firmware, systems, cloud) to ensure reliability and performance across NVMe storage, virtualization, and cloud infrastructure.",
      "Owned end-to-end lifecycle of test modules: design → implementation → execution → failure analysis, aligning with operational excellence principles.",
      "Integrated automated test frameworks into internal build and validation pipelines, supporting continuous integration and release workflows.",
      "Investigated and analyzed test failures and system issues to improve stability and prevent regressions.",
    ],
    stack: ["Python", "PyTest", "Paramiko", "NVMe", "Linux", "CI/CD", "Gerrit"],
  },
  {
    id: "marvell-intern",
    company: "Marvell Technology",
    role: "Software Engineer Intern",
    type: "internship",
    location: "India",
    start: "May 2024",
    end: "June 2024",
    url: "https://www.marvell.com",
    highlights: [
      "Built the foundation of Python test automation later scaled to production CI pipelines.",
      "Shadowed senior engineers across firmware and systems to map validation gaps in distributed storage.",
      "Converted the internship into a full-time offer based on impact and ownership shown.",
    ],
    stack: ["Python", "PyTest", "Linux", "Git"],
  },
];
