import { z, defineCollection } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional()
  })
})

export const collections = { articles }

