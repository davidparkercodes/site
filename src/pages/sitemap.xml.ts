import type { APIContext } from 'astro'

export async function GET({ site, url }: APIContext) {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${new URL('/', site?.toString() || url.origin).toString()}</loc></url>\n  <url><loc>${new URL('/articles', site?.toString() || url.origin).toString()}</loc></url>\n</urlset>`
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}

