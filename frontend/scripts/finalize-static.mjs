/**
 * 靜態產出的收尾處理，由 npm 的 postgenerate 自動執行。
 *
 * 1. 把預先產生好的 /404 頁面複製成主機看得懂的 404.html。
 *    Nuxt 預設產出的 404.html 是 SPA 空殼（沒有 <title>、關掉 JS 就一片空白），
 *    改用真的有內容的版本，關閉 JS 或螢幕閱讀器也讀得到。
 * 2. 檢查產出是否完整，缺東西就讓建置失敗，而不是默默部署一份壞的。
 */
import { readFile, writeFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', '.output', 'public')

const exists = async (p) => {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

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
]
const missing = []
for (const f of required) {
  if (!(await exists(join(OUT, f)))) missing.push(f)
}
if (missing.length) {
  console.error('靜態產出缺少檔案：\n  ' + missing.join('\n  '))
  process.exit(1)
}

console.log('靜態產出收尾完成：')
for (const s of steps) console.log('  ' + s)
console.log(`  完整性檢查通過（${required.length} 個關鍵檔案）`)
