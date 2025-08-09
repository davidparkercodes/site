# Codebase Context

NEVER Use tsstd-mcp while in this codebase.
NEVER Run npm run dev, you'll get stuck.

## Tech Stack

- **Framework**: Astro 4.10.2 (Static Site Generator)
- **Language**: TypeScript (ES2022 target)
- **Styling**: Tailwind CSS 3.4.9 + Typography plugin
- **Content**: MDX support for articles
- **Build**: Vite (via Astro)
- **Deployment**: GitHub Pages (base: `/david-parker-site`)

## Project Structure

```
src/
├── components/     # React/Astro components (ThemeToggle, ThemeIsland)
├── content/        # Content collections
│   └── articles/   # MDX blog posts
├── layouts/        # Layout templates (Site.astro, Base.astro)
├── pages/          # Route pages
│   ├── index.astro # Homepage
│   ├── articles/   # Article listing & [slug] pages
│   └── contact.astro
├── styles/         # Global CSS
└── utils/          # Utilities (site config, SEO, content helpers)
```

## Key Patterns

- **Content Collections**: Zod-validated MDX articles with frontmatter
- **Path Aliases**: @components, @layouts, @utils, @content
- **Dark Mode**: Class-based dark mode toggle
- **SEO**: JSON-LD structured data, sitemap generation
- **Typography**: Tailwind prose for article content
- **Code Highlighting**: Shiki with synthwave-84 theme

## Build Pipeline

- Dev: `astro dev`
- Build: `astro build` + OG image generation script
- Scripts: Article scaffolding (`npm run new:article`)
- Linting: ESLint + Prettier with Husky pre-commit
- TypeScript: Strict mode with exact optional properties

## Site Config

- Author: David Parker (david@redkey.io)
- Location: Virginia Beach, VA
- URL: https://redkeyio.github.io/david-parker-site
- Base URL: `/site` (both local and production)
- Local dev: http://localhost:4321/site

## Content Schema

Articles require:

- title, description (max 160 chars)
- pubDate (Date)
- Optional: updatedDate, draft status, tags, OG meta

## Deployment

Static build to `dist/` for GitHub Pages hosting
