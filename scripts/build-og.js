import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import fs from 'node:fs'
import path from 'node:path'

const outDir = path.join(process.cwd(), 'public', 'og')
fs.mkdirSync(outDir, { recursive: true })

const base = ({ title, subtitle }) => ({
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '64px',
      background: 'linear-gradient(135deg, #1a1a2e, #7f5af0)',
      color: '#ffffff',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
    },
    children: [
      { type: 'div', props: { style: { fontSize: 56, fontWeight: 800 }, children: title } },
      subtitle ? { type: 'div', props: { style: { fontSize: 28, opacity: 0.9, marginTop: 12 }, children: subtitle } } : null,
    ],
  },
})

async function renderPng(vnode, file) {
  const fontDir = path.join(process.cwd(), 'public', 'fonts')
  const regular = path.join(fontDir, 'Inter-Regular.woff')
  const bold = path.join(fontDir, 'Inter-Bold.woff')
  const fonts = []
  if (fs.existsSync(regular)) {
    fonts.push({ name: 'Inter', data: fs.readFileSync(regular), weight: 400, style: 'normal' })
  }
  if (fs.existsSync(bold)) {
    fonts.push({ name: 'Inter', data: fs.readFileSync(bold), weight: 800, style: 'normal' })
  }
  if (fonts.length === 0) {
    console.warn('Skipping OG generation: no fonts found in public/fonts')
    return
  }
  const svg = await satori(vnode, { width: 1200, height: 630, fonts })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  const pngData = resvg.render().asPng()
  fs.writeFileSync(file, pngData)
}

async function main() {
  await renderPng(base({ title: 'David Parker', subtitle: 'Articles and engineering notes' }), path.join(outDir, 'home.png'))
  try {
    const { readFileSync, readdirSync } = fs
    const contentDir = path.join(process.cwd(), 'src', 'content', 'articles')
    const files = readdirSync(contentDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    for (const f of files) {
      const raw = readFileSync(path.join(contentDir, f), 'utf8')
      const title = (raw.match(/\ntitle:\s*(.*)\n/)?.[1] || f.replace(/\.(md|mdx)$/,''))
      const slug = f.replace(/\.(md|mdx)$/,'')
      await renderPng(base({ title, subtitle: 'Article' }), path.join(outDir, `${slug}.png`))
    }
  } catch {}
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

