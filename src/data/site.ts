import type { SocialLink, Link } from "@/types";

export const site = {
  name: "Chandan Kumar",
  shortName: "Chandan",
  initials: "CK",
  role: "Software Engineer",
  company: "Marvell Technology",
  location: "India",
  tagline: "Building reliable systems, one test at a time.",
  bio: "Software Engineer at Marvell Technology working on distributed storage validation. CSE grad from MNNIT Allahabad. I love turning gnarly systems problems into clean automation, and I sneak in some ML on the side.",
  email: "chandan181singh@gmail.com",
  phone: "+91-6204355528",
  url: "https://chandan181singh.github.io/hello-world",
  ogImage: "/og/default.png",
  resumeUrl: "/resume.pdf",
  keywords: [
    "Chandan Kumar",
    "Software Engineer",
    "Marvell Technology",
    "MNNIT Allahabad",
    "Python",
    "C++",
    "Distributed Systems",
    "PyTest",
    "Machine Learning",
    "LeetCode Knight",
    "Portfolio",
  ],
} as const;

export const socials: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/chandan181singh",
    handle: "@chandan181singh",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/chandan181",
    handle: "in/chandan181",
  },
  {
    platform: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/_chandan181_/",
    handle: "_chandan181_",
  },
  {
    platform: "codechef",
    label: "CodeChef",
    href: "https://www.codechef.com/users/chandan181",
    handle: "chandan181",
  },
  {
    platform: "email",
    label: "Email",
    href: "mailto:chandan181singh@gmail.com",
    handle: "chandan181singh@gmail.com",
  },
];

export const navLinks: Link[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Achievements", href: "/achievements" },
  { label: "Uses", href: "/uses" },
  { label: "Guestbook", href: "/guestbook" },
];
