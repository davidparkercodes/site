import { z } from 'zod'
import fs from 'node:fs'
import path from 'node:path'

const schema = z.object({
  title: z.string().min(1),
})

const arg = process.argv.slice(2).join(' ')
const parsed = schema.safeParse({ title: arg })
if (!parsed.success) {
  console.error('Usage: npm run new:article "My Title"')
  process.exit(1)
}
const title = parsed.data.title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')

const dir = path.join(process.cwd(), 'src', 'content', 'articles')
fs.mkdirSync(dir, { recursive: true })
const file = path.join(dir, `${slug}.mdx`)
if (fs.existsSync(file)) {
  console.error('File already exists:', file)
  process.exit(1)
}
const now = new Date().toISOString()
const fm = `---\ntitle: ${title}\ndescription: ${title}\npubDate: ${now}\ndraft: true\ntags: []\n---\n\n`;
fs.writeFileSync(file, fm)
console.log('Created', file)

