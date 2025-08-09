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

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    technologies: z.array(z.string()).default([]),
    link: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false)
  })
})

export const collections = { articles, projects }

