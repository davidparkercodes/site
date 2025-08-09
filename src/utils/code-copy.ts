export default function enhanceCodeCopy() {
  const blocks = document.querySelectorAll('pre > code')
  blocks.forEach((code) => {
    const pre = code.parentElement
    if (!pre || pre.querySelector('.copy-btn')) return
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'copy-btn'
    btn.textContent = 'copy'
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent || '')
        const prev = btn.textContent
        btn.textContent = 'copied'
        setTimeout(() => (btn.textContent = prev || 'copy'), 1200)
      } catch {}
    })
    pre.appendChild(btn)
  })
}

