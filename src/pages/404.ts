import type { APIRoute } from 'astro'

export const GET: APIRoute = () => new Response(undefined, { status: 404 })

