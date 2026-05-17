export type Link = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "leetcode"
  | "codechef"
  | "email"
  | "phone";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  handle?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "internship" | "contract" | "open-source";
  location?: string;
  start: string;
  end: string | "Present";
  url?: string;
  highlights: string[];
  stack?: string[];
  logo?: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end: string;
  score?: string;
  location?: string;
  highlights?: string[];
};

export type SkillCategory = {
  name: string;
  skills: { name: string; icon?: string }[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: number;
  month: string;
  featured?: boolean;
  tags: string[];
  stack: string[];
  github?: string;
  live?: string;
  image?: string;
  status: "shipped" | "wip" | "archived";
  highlights?: string[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  source: "leetcode" | "codechef" | "hackathon" | "other";
  href?: string;
  icon?: string;
  metric?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  readingTime?: number;
};
