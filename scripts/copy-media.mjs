// Copy only the uploads referenced by the ported content (scripts/out/used-media.json)
// into public/assets/uploads/, plus the logo and the two PDFs (PDF filenames are
// sanitized to ASCII). Nothing is hotlinked from the old site.
//
//   node scripts/generate-content.mjs   # produces used-media.json
//   node scripts/copy-media.mjs

import { readFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'backup', 'wp_content', 'uploads')
const DEST = join(ROOT, 'public', 'assets', 'uploads')

const used = JSON.parse(readFileSync(join(__dirname, 'out', 'used-media.json'), 'utf8'))

let copied = 0
const missing = []
for (const rel of used) {
  const from = join(SRC, rel)
  const to = join(DEST, rel)
  if (!existsSync(from)) { missing.push(rel); continue }
  mkdirSync(dirname(to), { recursive: true })
  copyFileSync(from, to)
  copied++
}

// Logo
const logoSrc = join(SRC, '2024', '10', 'LOGO_MARATHIA-4.png')
if (existsSync(logoSrc)) {
  mkdirSync(join(ROOT, 'public', 'assets'), { recursive: true })
  copyFileSync(logoSrc, join(ROOT, 'public', 'assets', 'logo.png'))
}

// PDFs (sanitize filenames)
const pdfs = [
  ['2024/12/Menu2024.pdf', 'menu-2024.pdf'],
  ['2025/04/UTF-8Πρόγραμμα-Γαστροτουρισμού-στην-Τήνο.pdf', 'programma-gastrotourismou-tinos.pdf'],
]
mkdirSync(join(ROOT, 'public', 'assets', 'pdf'), { recursive: true })
for (const [rel, out] of pdfs) {
  const from = join(SRC, rel)
  if (existsSync(from)) copyFileSync(from, join(ROOT, 'public', 'assets', 'pdf', out))
  else missing.push(rel)
}

// Home-page hero video (original site) + poster/still images.
const extras = [
  ['2018/08/Sequence-1.mp4', join('video', 'hero.mp4')],
  ['2024/10/061-tripotamos-scaled.jpg', join('hero', 'poster.jpg')],
  ['2024/08/291781471_551038449864577_7823247911095326816_n.jpg', join('hero', 'dining.jpg')],
]
for (const [rel, out] of extras) {
  const from = join(SRC, rel)
  const to = join(ROOT, 'public', 'assets', out)
  if (existsSync(from)) { mkdirSync(dirname(to), { recursive: true }); copyFileSync(from, to) }
  else missing.push(rel)
}

console.log(`Copied ${copied}/${used.length} referenced uploads to public/assets/uploads/`)
if (missing.length) console.log(`Missing (not in backup): ${missing.length}\n  ` + missing.join('\n  '))
