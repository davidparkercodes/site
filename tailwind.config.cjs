/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace']
      },
      transitionTimingFunction: {
        crisp: 'cubic-bezier(0.2, 0, 0, 1)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

