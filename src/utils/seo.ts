import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

export interface SiteMeta {
  title: string
  description: string
  url: string
  author: {
    name: string
    email?: string
    phone?: string
    location?: string
  }
}

export function canonical(url: string) {
  return url
}

export function pageTitle(base: string, title?: string) {
  return title ? `${title} · ${base}` : base
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return {
    $$render: () => `<script type="application/ld+json">${JSON.stringify(data)}</script>`
  } as unknown as AstroComponentFactory
}

