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
- **Decap CMS** at `/admin/` — Git-based content management (no DB, no backend)

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

## Editing content — two ways

### A. Admin UI (recommended) ⭐

After the one-time OAuth setup (see `admin-oauth/README.md`), visit:

```
https://chandan181singh.github.io/hello-world/admin/
```

Log in with GitHub. You get form-based editing for **everything**:

- **Site** — name, role, company, bio, contact, profile picture, OG image, SEO keywords
- **Social Links** — add/remove/reorder
- **Navigation** — menu items
- **Projects** — all metadata + featured flag, tags, stack, links, highlights
- **Experience** — work history with bullet points
- **Education** — schools/colleges
- **Skills & Interests** — categories + skills with optional Simple Icons slugs
- **Achievements** — trophies / competitive programming wins
- **Blog Posts** — rich Markdown editor with images, drafts, tags
- **Project Case Studies** — MDX bodies for individual project pages
- **Resume** — upload a new PDF, it replaces the existing one
- **Images** — drag & drop into the Markdown editor; saved to `public/uploads/`

Every save commits to the repo on `main` → GitHub Actions rebuilds → live in ~90s. No database, no backend, no cold starts. **You can edit from your phone.**

### B. Edit the files directly

All content lives in JSON / MDX. The admin UI just edits the same files for you.

| File / Folder | What it controls |
|---|---|
| `src/data/json/site.json` | Profile, contact, SEO |
| `src/data/json/socials.json` | Social links |
| `src/data/json/nav.json` | Top-nav menu |
| `src/data/json/projects.json` | Projects |
| `src/data/json/experiences.json` | Work history |
| `src/data/json/education.json` | Schools / colleges |
| `src/data/json/skills.json` | Skills + interests |
| `src/data/json/achievements.json` | Achievements |
| `src/content/blog/*.mdx` | Blog posts |
| `src/content/projects/*.mdx` | Project case studies |
| `public/resume.pdf` | Resume download |
| `public/uploads/` | Image uploads from the admin UI |

The TypeScript files in `src/data/` are thin wrappers that re-export the JSON — leave them alone unless you're adding a brand-new field.

To **change the color palette**: edit the CSS variables in `src/app/globals.css` (look for `--color-primary` etc.). They cascade through the whole site.

## Admin / CMS setup (one-time, ~15 min)

The admin UI at `/admin/` uses [Decap CMS](https://decapcms.org) with GitHub OAuth. To enable login, you need a tiny OAuth proxy. Full instructions live in `admin-oauth/README.md`. Short version:

1. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps).
2. Deploy the Cloudflare Worker in `admin-oauth/` (free, ~30 lines, zero cold start).
3. Set 2 secrets on the Worker: `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`.
4. Update `public/admin/config.yml`'s `base_url` to your Worker URL.
5. Push. Visit `/admin/`, click "Login with GitHub", you're in.

After that, every save commits to `main`, GitHub Actions deploys, ~90s later the site updates.

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
├── data/
│   ├── json/             # All editable content as JSON (Decap CMS edits here)
│   └── *.ts              # Thin TS wrappers re-exporting the JSON with types
├── lib/                  # Utilities (mdx loader, cn, formatDate)
└── types/                # Shared TypeScript types

public/
├── admin/                # Decap CMS UI (index.html + config.yml)
├── uploads/              # Images uploaded via the admin
└── resume.pdf            # Resume download

admin-oauth/              # Cloudflare Worker that handles GitHub OAuth login
```

## License

MIT — fork it, remix it, make it yours.
