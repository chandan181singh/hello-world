# Chandan Kumar — Portfolio

> A scalable, modern, vibrant personal site. Built with Next.js 15, Tailwind v4, Framer Motion, and MDX. Statically exported and served from GitHub Pages.

[![Deploy to GitHub Pages](https://img.shields.io/badge/deploy-GitHub_Pages-A855F7?style=flat-square&logo=github)](#deployment) [![Made with Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## Tech stack

- **Next.js 15** App Router + static export (`output: 'export'`)
- **TypeScript** (strict)
- **Tailwind CSS v4** with custom design tokens ("Aurora Tape" palette)
- **Framer Motion** for page transitions, parallax cursor, scroll reveals, magnetic buttons
- **MDX** + `next-mdx-remote` for blog & project case studies
- **Giscus** for the guestbook + post comments (GitHub Discussions-backed, zero backend)
- **Live widgets** for LeetCode & GitHub stats (public APIs, client-side)
- **shadcn-style** UI primitives (owned, not vendored)
- **Sonner** for toasts, **canvas-confetti** for celebrations
- **cmdk** for the ⌘K command palette

## Features

- Animated aurora gradient background that follows the cursor
- Decorative glowing ring that trails the cursor (native cursor stays for zero lag)
- Page transition animations between routes
- Scroll progress indicator
- Command palette (⌘K / Ctrl+K)
- Dark / light theme with smooth toggle
- Hero with rotating-roles typewriter
- Bento grid stats snapshot
- Skills grid with simple-icons logos
- Experience timeline
- Project case studies (MDX)
- Live LeetCode & GitHub stat widgets
- MDX blog with reading time & TOC-ready
- Guestbook & per-post comments (Giscus)
- Uses page
- Resume page with confetti download
- Animated 404
- SEO: per-page metadata, OG image, sitemap, robots

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
```

## Customizing — where to edit what

All content lives in `src/data/` as typed config:

| File | What's inside |
|---|---|
| `src/data/site.ts` | Name, role, email, socials, nav links |
| `src/data/experience.ts` | Work history (timeline) |
| `src/data/education.ts` | Schools / colleges |
| `src/data/skills.ts` | Tech stack grid |
| `src/data/projects.ts` | Project metadata + featured order |
| `src/data/achievements.ts` | Trophies / awards |

Long-form content lives in `src/content/`:

- `src/content/projects/<slug>.mdx` — project case studies
- `src/content/blog/<slug>.mdx` — blog posts

To **add a project**: drop an object into `src/data/projects.ts`, optionally create a matching `.mdx` in `src/content/projects/`.

To **add a blog post**: just create `src/content/blog/my-post.mdx` with frontmatter.

To **change the color palette**: edit the CSS variables in `src/app/globals.css` (look for `--color-primary` etc.). They cascade through the whole site.

## Guestbook & Comments (Giscus)

The guestbook and blog post comments are powered by [Giscus](https://giscus.app) — a GitHub Discussions-backed comment system with zero backend. The config is hardcoded in `src/components/widgets/guestbook-giscus.tsx` pointing to [`chandan181singh/hello-world-comments`](https://github.com/chandan181singh/hello-world-comments).

To use your own repo:

1. Create a public repo and enable Discussions on it.
2. Install the [Giscus GitHub App](https://github.com/apps/giscus) on that repo.
3. Go to [giscus.app](https://giscus.app), select your repo, and copy the generated values.
4. Update the `GISCUS_CONFIG` object in `src/components/widgets/guestbook-giscus.tsx`.

## Deployment

### GitHub Pages (recommended, primary)

1. Push this repo to GitHub.
2. In repo **Settings → Pages**: set "Build and deployment" → Source to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` will build on every push to `main`.

**If using a *user* repo (`<user>.github.io`):** leave `NEXT_PUBLIC_BASE_PATH` empty.

**If using a *project* repo (`github.com/<user>/portfolio`):** edit the workflow and set:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: "/portfolio"   # match your repo name
```

so assets resolve under the sub-path.

### Vercel (optional)

Push to GitHub → Import in Vercel → done. No code changes needed; Vercel handles everything automatically.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serve a production build |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── app/                  # Next.js routes (App Router)
├── components/
│   ├── ui/               # Button, Card, Badge primitives
│   ├── layout/           # Nav, footer, theme, command palette, shell
│   ├── effects/          # Aurora bg, cursor, magnetic, reveal, tilt, confetti
│   ├── home/             # Home page sections
│   ├── project/          # Project card + filter
│   ├── blog/             # Blog rendering (MDX components, post card)
│   └── widgets/          # LeetCode / GitHub / Giscus widgets
├── content/              # MDX (projects + blog)
├── data/                 # Typed site config (source of truth)
├── lib/                  # Utilities (mdx loader, cn, formatDate)
└── types/                # Shared TypeScript types
```

## License

MIT — fork it, remix it, make it yours.
