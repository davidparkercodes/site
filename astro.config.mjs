import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://davidparkercodes.github.io/site',
  base: '/site',
  integrations: [mdx(), tailwind({ applyBaseStyles: false }), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'synthwave-84',
      themes: {
        light: 'synthwave-84',
        dark: 'synthwave-84'
      }
    }
  }
})

