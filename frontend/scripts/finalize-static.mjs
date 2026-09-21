/**
 * 靜態產出的收尾處理，由 npm 的 postgenerate 自動執行。
 *
 * 1. 把預先產生好的 /404 頁面複製成主機看得懂的 404.html。
 *    Nuxt 預設產出的 404.html 是 SPA 空殼（沒有 <title>、關掉 JS 就一片空白），
 *    改用真的有內容的版本，關閉 JS 或螢幕閱讀器也讀得到。
 * 2. 產生 sitemap.xml（含中英文對應），並在 robots.txt 註明 sitemap 位置。
 * 3. 檢查產出是否完整，缺東西就讓建置失敗，而不是默默部署一份壞的。
 */
import { readFile, writeFile, access, readdir } from 'node:fs/promises'
import { SITE_URL } from './site-url.mjs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')

const exists = async (p) => {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

/**
 * 找出這次建置實際的產出目錄。
 *
 * nuxt.config 已經把 preset 釘成 static（固定 .output/public），
 * 但這裡仍然做偵測：萬一日後 preset 改了、或某個 CI 環境又自動切換
 * （Cloudflare Pages 會切成 dist），腳本要能跟著走，而不是直接失敗。
 */
async function resolveOutDir() {
  const candidates = [join(ROOT, '.output', 'public'), join(ROOT, 'dist')]
  for (const dir of candidates) {
    if (await exists(join(dir, 'index.html'))) return dir
  }
  throw new Error(
    '找不到靜態產出目錄（試過 .output/public 與 dist）。請確認 npm run generate 有成功產生檔案。',
  )
}

const OUT = await resolveOutDir()

/** 把 <來源>/index.html 複製成 <目標> */
async function promote(fromDir, toFile) {
  const src = join(OUT, fromDir, 'index.html')
  if (!(await exists(src))) {
    throw new Error(`找不到預先產生的頁面：${fromDir}/index.html`)
  }
  const html = await readFile(src, 'utf8')
  if (!html.includes('<title>')) {
    throw new Error(`${fromDir}/index.html 沒有 <title>，可能沒有真的預先渲染`)
  }
  await writeFile(join(OUT, toFile), html)
  return `${fromDir}/index.html → ${toFile}`
}

const steps = []

// 中文 404 當作全站預設；英文版另外放一份（部分主機支援子目錄的 404）
steps.push(await promote('404', '404.html'))
if (await exists(join(OUT, 'en', '404', 'index.html'))) {
  steps.push(await promote(join('en', '404'), join('en', '404.html')))
}

// ---------- sitemap.xml ----------
/** 找出所有預先產生的頁面路徑（有 index.html 的資料夾），排除 404 */
async function collectPaths(dir = OUT, prefix = '') {
  const out = []
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    if (!ent.isDirectory() || ent.name.startsWith('_')) continue
    const sub = `${prefix}/${ent.name}`
    if (await exists(join(dir, ent.name, 'index.html'))) out.push(sub)
    out.push(...(await collectPaths(join(dir, ent.name), sub)))
  }
  return out
}
const all = ['/', ...(await collectPaths())].filter((p) => !/(^|\/)404$/.test(p))
const zhPaths = all.filter((p) => p !== '/en' && !p.startsWith('/en/'))
const enOf = (p) => (p === '/' ? '/en' : `/en${p}`)
const url = (p) => SITE_URL + p
const esc = (s) => s.replace(/&/g, '&amp;')
const entry = (p, zhP) => {
  const alts = all.includes(enOf(zhP))
    ? `\n    <xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="${esc(url(zhP))}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="en" href="${esc(url(enOf(zhP)))}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(url(zhP))}"/>`
    : ''
  return `  <url>\n    <loc>${esc(url(p))}</loc>${alts}\n  </url>`
}
const urls = []
for (const p of zhPaths) {
  urls.push(entry(p, p))
  if (all.includes(enOf(p))) urls.push(entry(enOf(p), p))
}
await writeFile(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls.join('\n') +
    `\n</urlset>\n`,
)
steps.push(`sitemap.xml（${urls.length} 個網址，${SITE_URL}）`)

const robotsPath = join(OUT, 'robots.txt')
let robots = (await exists(robotsPath)) ? await readFile(robotsPath, 'utf8') : 'User-agent: *\nAllow: /\n'
robots = robots.replace(/\n*Sitemap:.*$/gim, '').trimEnd() + `\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
await writeFile(robotsPath, robots)
steps.push('robots.txt 加上 Sitemap 位置')

// 基本完整性檢查：關鍵頁面都要在
const required = [
  'index.html',
  'en/index.html',
  '404.html',
  'about/index.html',
  'books/index.html',
  'gallery/index.html',
  'outstanding/index.html',
  'accessibility/index.html',
  'favicon.svg',
  'favicon.ico',
  'sitemap.xml',
  'images/og-default.jpg',
]
const missing = []
for (const f of required) {
  if (!(await exists(join(OUT, f)))) missing.push(f)
}
if (missing.length) {
  console.error('靜態產出缺少檔案：\n  ' + missing.join('\n  '))
  process.exit(1)
}

console.log(`靜態產出收尾完成（${OUT.replace(ROOT, '.')}）：`)
for (const s of steps) console.log('  ' + s)
console.log(`  完整性檢查通過（${required.length} 個關鍵檔案）`)
