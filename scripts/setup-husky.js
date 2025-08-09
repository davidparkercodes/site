import fs from 'node:fs'
import path from 'node:path'

function ensure(file, content) {
  const dir = path.dirname(file)
  fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(file)) fs.writeFileSync(file, content)
}

ensure('.husky/commit-msg', 'npx --no -- commitlint --edit "$1"\n')
fs.chmodSync('.husky/commit-msg', 0o755)

ensure('.husky/pre-commit', 'npx --no -- lint-staged\n')
fs.chmodSync('.husky/pre-commit', 0o755)

