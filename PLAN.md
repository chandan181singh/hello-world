# Chandan Kumar — Personal Portfolio Website Plan

> A scalable, modern, vibrant personal website built to host on GitHub Pages.

---

## 1. Goals

- **Professional**: Showcase Chandan's journey (MNNIT → Marvell SWE), projects, and competitive programming.
- **Modern & Vibrant**: Playful, gradient-rich, animated — inspired by [joshwcomeau.com](https://www.joshwcomeau.com/) — without feeling generic or boring.
- **Scalable**: Add new projects, blog posts, or sections with minimal code churn (data-driven + MDX content).
- **Fast**: GitHub Pages CDN delivery, static export, < 100KB initial JS where possible.
- **Flexible**: Single source of truth in typed config files. New section = new component + data entry.
- **Free forever**: No paid hosting, no paid backend. Free 3rd-party services for dynamic features.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Industry-standard React framework, excellent DX, SSG via `output: 'export'`, native MDX, image optimization. |
| Language | **TypeScript (strict)** | Type-safety = scalability. Resume/project data is typed; no broken builds. |
| Styling | **Tailwind CSS v4** | Utility-first, tiny bundle, easy theming via CSS variables, dark mode out of the box. |
| Components | **shadcn/ui** | Unstyled accessible primitives we own — copy/paste, not a black-box dep. |
| Animation | **Framer Motion** | Industry standard for React animations. Magnetic buttons, page transitions, scroll reveals. |
| Icons | **lucide-react** + **simple-icons** | Lucide for UI, simple-icons for brand/tech logos. |
| Content | **MDX** (via `@next/mdx` + `gray-matter` + `rehype-pretty-code`) | Write blog posts & project case studies in Markdown with React components. |
| Theme | **next-themes** | Persistent dark/light mode without flash. |
| Comments / Guestbook | **Giscus** (GitHub Discussions) | Free, no backend, owned by user. Perfect for static sites. |
| LeetCode stats | `leetcode-stats-api` (community public API) | Client-side fetch, cacheable, no backend. |
| GitHub stats | `github-readme-stats` SVG + direct GitHub REST API | Live contributions/repos, no auth needed for public data. |
| Deployment | **GitHub Pages** via **GitHub Actions** | Primary host. Also includes Vercel config as fallback option. |
| Analytics | **Umami** (self-hostable, free) OR Plausible script (privacy-first) | Optional, add later. |

### Why GitHub Pages over Vercel for this site

User concern: "Vercel feels slow." Reality is that Vercel's edge network is very fast, but:

1. **Static export = instant**. We're using `output: 'export'` so the output is plain HTML/CSS/JS. GitHub Pages serves these from their CDN. No server cold-start, no SSR latency. First-byte time globally is excellent.
2. **No backend needed**. Every dynamic feature (guestbook, comments, LeetCode/GitHub stats) is handled by free external services or client-side fetches.
3. **Scalability**: GitHub Pages auto-scales infinitely. No bandwidth limits for normal portfolio traffic.
4. **One workflow**: Push to `main` → GitHub Action builds Next.js → deploys to Pages. Done.

We'll keep the Next.js config compatible with Vercel as well, so if you ever want SSR-only features (real-time data, auth, server actions), one-click migration works.

---

## 3. Design System — "Aurora Tape"

A vibrant but cohesive palette inspired by aurora skies and synthwave, with sophisticated balance.

### Color Tokens (CSS variables)

```
--background       Deep ink #0A0A0F        |  Warm cream #FAFAF9
--foreground       Off-white #F5F5F4       |  Ink #1C1917
--muted            Slate gray #71717A      |  Stone gray #78716C
--primary          Electric violet #A855F7
--accent           Hot pink #EC4899
--cyan             Bright cyan #06B6D4
--lime             Easter-egg lime #84CC16  (used sparingly for delight)
--border           rgba(violet, 0.15)
```

### Typography

- **Display**: `Cal Sans` (or Geist Sans bold) — for h1/hero
- **Sans**: `Geist Sans` — body
- **Mono**: `Geist Mono` / `JetBrains Mono` — code & terminal accents

### Signature visual elements

- Gradient text highlights on key phrases (violet → pink → cyan animated gradient)
- Animated aurora blob background (CSS + Framer Motion)
- Spotlight cursor follower (lime accent)
- Magnetic hover buttons
- Glassmorphism cards with subtle border glow
- Section dividers using gradient lines
- Micro-confetti on key interactions (resume download, contact submit)

---

## 4. Site Architecture (Routes)

```
/                       → Home (hero + about + skills + featured projects + experience + contact)
/about                  → Long-form about page
/projects               → All projects (with filtering by tag)
/projects/[slug]        → Project case study (MDX)
/blog                   → Blog list with reading time
/blog/[slug]            → Blog post (MDX, with TOC & Giscus comments)
/achievements           → LeetCode + CodeChef + GitHub stats live widgets
/guestbook              → Visitor messages (Giscus)
/uses                   → My tools/setup ("uses" page — popular in dev portfolios)
/resume                 → Inline resume viewer + download
/404                    → Custom 404 with animation
```

---

## 5. Folder Structure

```
my-website/
├── .github/workflows/deploy.yml       # GitHub Pages deploy
├── public/
│   ├── resume.pdf
│   ├── og/                            # OpenGraph images per route
│   ├── icons/                         # Favicons, app icons
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (theme, fonts, navigation, cursor)
│   │   ├── page.tsx                   # Home
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── guestbook/page.tsx
│   │   ├── uses/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                        # shadcn primitives (button, card, badge, dialog…)
│   │   ├── layout/
│   │   │   ├── navigation.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── command-palette.tsx    # ⌘K navigation
│   │   ├── effects/
│   │   │   ├── aurora-background.tsx
│   │   │   ├── cursor-follower.tsx
│   │   │   ├── magnetic.tsx           # <Magnetic /> wrapper
│   │   │   ├── scroll-progress.tsx
│   │   │   ├── reveal.tsx             # <Reveal /> on scroll
│   │   │   ├── gradient-text.tsx
│   │   │   ├── tilt-card.tsx
│   │   │   └── confetti.tsx
│   │   ├── home/
│   │   │   ├── hero.tsx               # Big intro + animated CTA
│   │   │   ├── about-snippet.tsx
│   │   │   ├── skills.tsx             # Animated tech grid
│   │   │   ├── experience-timeline.tsx
│   │   │   ├── education.tsx
│   │   │   ├── featured-projects.tsx
│   │   │   ├── achievements-strip.tsx
│   │   │   ├── stats-bento.tsx        # Bento grid: GitHub, LeetCode, location, etc.
│   │   │   └── contact-cta.tsx
│   │   ├── project/
│   │   │   ├── project-card.tsx
│   │   │   └── project-filter.tsx
│   │   ├── blog/
│   │   │   ├── post-card.tsx
│   │   │   ├── toc.tsx
│   │   │   └── mdx-components.tsx
│   │   └── widgets/
│   │       ├── leetcode-widget.tsx
│   │       ├── github-contributions.tsx
│   │       └── now-section.tsx        # "What I'm doing now"
│   ├── content/
│   │   ├── projects/
│   │   │   ├── complaint-box.mdx
│   │   │   └── video-summarization.mdx
│   │   └── blog/
│   │       └── hello-world.mdx
│   ├── data/
│   │   ├── site.ts                    # Single source of truth: name, links, meta
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── projects.ts                # Front-matter + featured order
│   │   ├── skills.ts
│   │   └── achievements.ts
│   ├── lib/
│   │   ├── utils.ts                   # cn(), formatDate, slugify
│   │   ├── mdx.ts                     # MDX loading helpers
│   │   └── analytics.ts
│   └── types/
│       └── index.ts
├── next.config.ts                     # output: 'export', basePath, MDX
├── tailwind.config.ts                 # design tokens
├── tsconfig.json
├── package.json
├── README.md                          # How to run, customize, deploy
└── PLAN.md                            # This file
```

---

## 6. Feature Checklist

### Core (v1 — shipping now)
- [x] Hero with animated gradient name & typewriter tagline
- [x] About snippet with mission statement
- [x] Skills grid with animated tech icons
- [x] Experience timeline (Marvell, future entries)
- [x] Education cards (MNNIT, school)
- [x] Featured projects (3 cards on home)
- [x] All projects page with tag filtering
- [x] Project case study pages (MDX, fully customizable)
- [x] Achievements page (LeetCode, CodeChef, GitHub live stats)
- [x] Blog system (MDX, TOC, reading time, Giscus comments)
- [x] Guestbook (Giscus)
- [x] Uses page (tools, editor, hardware)
- [x] Resume page + PDF download with confetti
- [x] Contact CTA with social links
- [x] Dark / Light theme toggle (default: dark)
- [x] Command palette (⌘K / Ctrl+K navigation)
- [x] Custom cursor follower
- [x] Scroll progress bar
- [x] Page transition animations
- [x] Aurora animated background
- [x] Magnetic buttons
- [x] Tilt-on-hover project cards
- [x] Glassmorphism stat cards (bento grid)
- [x] Confetti on resume download
- [x] Reveal-on-scroll animations
- [x] Animated 404 page
- [x] SEO: per-page metadata, OG images, sitemap, robots
- [x] Mobile-responsive (tested 320 → 4K)
- [x] Accessible (semantic HTML, focus rings, reduced-motion respect)

### v2 (post-launch — easy to add)
- [ ] Newsletter signup (Buttondown / Resend)
- [ ] Spotify "Now Playing" widget
- [ ] Photography / gallery page
- [ ] Talks & speaking section
- [ ] Testimonials
- [ ] Multi-language (i18n)
- [ ] PWA / installable
- [ ] Reading list page (books I'm reading)

---

## 7. Content Sourced from Resume

Will be wired into `src/data/*.ts`:

- **Name**: Chandan Kumar
- **Tagline**: Software Engineer @ Marvell · CSE @ MNNIT Allahabad · LeetCode Knight
- **Email**: chandan181singh@gmail.com
- **Phone**: +91-6204355528
- **GitHub**: https://github.com/chandan181singh
- **LinkedIn**: https://linkedin.com/in/chandan181
- **Education**:
  - MNNIT Allahabad — B.Tech CSE (2021–2025), CPI 8.23
  - St John Senior Secondary, Dumraon — Class 12 CBSE (2018–2020), 92.2%
- **Experience**:
  - **Marvell Technology** — Software Engineer (Intern → Full-Time, May 2024 – June 2024, Jan 2025 – Present)
- **Projects**:
  - **Complaint Box** (Nov 2022) — Full-stack daily-life complaint mgmt (Node, Mongo, EJS)
  - **Video Summarization** (Nov 2024) — BiLSTM + Luong attention + PSO (Python, PyTorch)
- **Skills**: C++, Python, Node.js, Express, REST, SQL, MongoDB, Git, Linux, CI/CD, Jira, Confluence, Gerrit, PyTorch, OpenCV, LSTM/BiLSTM
- **Achievements**:
  - LeetCode Knight (Top 5%, Rating 1871)
  - CodeChef Starters 88 — Global Rank 468
- **Interests**: DSA, ML, Web Dev

---

## 8. Deployment Strategy

### GitHub Pages (Primary)

1. Repo: `chandan181singh/chandan181singh.github.io` → auto-deploys to `https://chandan181singh.github.io`
   OR: existing repo with `gh-pages` branch.
2. `next.config.ts`: `output: 'export'`, `images.unoptimized: true`, conditional `basePath`.
3. `.github/workflows/deploy.yml`: on push to `main` → install → build → upload artifact → deploy.
4. Custom domain (optional): `CNAME` file in `public/`.

### Vercel (Optional one-click fallback)

- Repo already configured. Push → import to Vercel → done. No code changes needed.

---

## 9. Scalability Rules (the rationale)

1. **Data over markup**. Adding a new project = add object to `data/projects.ts` + optional MDX file. No JSX edits.
2. **MDX for long-form**. Blog posts and case studies are Markdown — non-technical edits are trivial.
3. **Typed config**. All data files export typed objects; broken builds catch typos before deploy.
4. **Composable components**. Effects like `<Magnetic>`, `<Reveal>`, `<TiltCard>` wrap any child — drop them anywhere.
5. **Tailwind tokens**. Color/spacing changes update everywhere via CSS variables — instant rebrand possible.
6. **No vendor lock-in**. shadcn components are owned (not imported), MDX is standard, deployment works on any static host.

---

## 10. Build Order

1. Plan saved ✅
2. Scaffold Next.js project + dependencies
3. Tailwind config + design tokens + globals
4. Data files (single source of truth from resume)
5. Layout: navigation, footer, theme, aurora background, cursor
6. Effects library (Magnetic, Reveal, GradientText, TiltCard, Confetti)
7. Home page sections (hero → about → skills → experience → projects → contact)
8. Projects page + case study pages
9. Achievements page (widgets)
10. Blog system
11. Guestbook + Uses + Resume pages
12. Command palette + scroll progress + page transitions
13. SEO (metadata, sitemap, OG images)
14. GitHub Actions deploy + README
15. Verify production build locally

---
