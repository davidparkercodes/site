# david-parker-site

A minimal, extremely fast personal site built with Astro + TypeScript + Tailwind + MDX. Static-first, zero-JS by default with selective islands for interactions. Deployed to GitHub Pages.

- Pages: Home, Articles index, Articles detail, 404
- Features: Dark/light theme toggle, MDX with synthwave dark code theme, JSON-LD, sitemap, robots, canonical tags, structured content collections, copy-to-clipboard for code.

## Scripts
- dev: Start local dev server
- build: Build static site and generate OG images
- preview: Preview the build
- new:article: Scaffold a new MDX article (draft)

## Authoring
MDX files live in content/articles. Use `npm run new:article "My Title"` to create a draft.

## Deployment
Configured for GitHub Pages. On push to main, CI builds and publishes.


