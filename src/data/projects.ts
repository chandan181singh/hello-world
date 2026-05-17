import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "video-summarization",
    title: "AI Video Summarization",
    tagline:
      "Encoder–decoder with Bahdanau & Luong attention, tuned by PSO, for concise video summaries.",
    description:
      "An AI pipeline that ingests long videos, segments them with KTS, extracts features with ResNet, and generates summaries with a BiLSTM encoder + Bahdanau/Luong attention decoder — selected via a 0/1 knapsack and tuned end-to-end with Particle Swarm Optimization.",
    year: 2024,
    month: "November",
    featured: true,
    tags: ["AI/ML", "PyTorch", "Research"],
    stack: [
      "Python",
      "PyTorch",
      "BiLSTM",
      "Bahdanau Attention",
      "Luong Attention",
      "PSO",
      "KTS",
      "Knapsack",
      "OpenCV",
      "ResNet",
      "NumPy",
      "Pandas",
    ],
    github:
      "https://github.com/chandan181singh/video-summarizer-using-encorder-decoder-and-pso",
    status: "shipped",
    highlights: [
      "Trained and evaluated on SumMe and TVSum benchmarks.",
      "Both Bahdanau and Luong attention implementations for comparison.",
      "0/1 knapsack picks the optimal set of shots under a length budget.",
      "PSO tunes hyperparameters end-to-end to maximize summary F-score.",
      "MIT licensed; full reproducible training pipeline.",
    ],
  },
  {
    slug: "complaint-box",
    title: "Complaint Forum",
    tagline:
      "Full-stack daily-life complaint management for users and administrators — live in production.",
    description:
      "A full-stack web application that lets users file complaints, attach PDFs, track resolution status, and lets admins triage and post solutions. Email verification, password reset, role-based access, and a clean dashboard for both sides.",
    year: 2022,
    month: "November",
    featured: true,
    tags: ["Full Stack", "Web"],
    stack: ["Node.js", "Express", "MongoDB", "JavaScript", "EJS", "CSS", "HTML"],
    github: "https://github.com/chandan181singh/special-giggle",
    live: "https://helping-box.onrender.com/",
    status: "shipped",
    highlights: [
      "Auth: email verification, password reset, role-based admin/user access.",
      "Users can file, edit, delete complaints — even attach PDFs.",
      "Admin dashboard with pending vs total complaint counts.",
      "Admins post solutions; users see status transitions in real time.",
      "Built in a team of 3 — Chandan, Shivam, Shashwat.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
