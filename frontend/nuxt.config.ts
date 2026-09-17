import { mentorTypes } from './app/data/mentorTypes'
import { outstanding } from './app/data/outstanding'

/**
 * 需要預先產生的路由。
 * 爬蟲會跟著頁面上的連結走，但動態路由（/mentors/[type]、/outstanding/[id]）
 * 明確列出來比較保險，日後加了新導師也不會漏掉。
 */
const staticPaths = [
  '/', '/about', '/mentors', '/results', '/outstanding',
  '/books', '/gallery', '/system', '/voices', '/sitemap', '/accessibility',
  // 404 做成真的頁面來預先產生，建置後再複製成 404.html（見 scripts/finalize-static.mjs）
  '/404',
]
const dynamicPaths = [
  ...mentorTypes.map((m) => `/mentors/${m.id}`),
  ...outstanding.map((m) => `/outstanding/${m.id}`),
]
const allPaths = [...staticPaths, ...dynamicPaths]
// 英文版路由（strategy: prefix_except_default，所以中文不加前綴、英文加 /en）
const prerenderRoutes = [...allPaths, ...allPaths.map((p) => `/en${p === '/' ? '' : p}`)]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'zh-TW',
    // 中文不加前綴（/about），英文加（/en/about）
    strategy: 'prefix_except_default',
    locales: [
      { code: 'zh-TW', language: 'zh-Hant-TW', name: '中文', dir: 'ltr', file: 'zh-TW.json' },
      { code: 'en', language: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
    ],
    // 不自動依瀏覽器語言轉址：公部門網站的中文版是主要版本，
    // 自動轉址也會讓使用者失去「我現在在哪個版本」的控制權。
    detectBrowserLanguage: false,
    bundle: { optimizeTranslationDirective: false },
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#123f52' },
      ],
      link: [
        // favicon：SVG 為主（可隨螢幕縮放），.ico 給舊瀏覽器，apple-touch-icon 給 iOS 加到主畫面
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@600;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  /**
   * 全站靜態產出（npm run generate → .output/public）。
   * 網站所有內容都在 app/data 的資料檔裡，沒有任何伺服器端邏輯或即時資料，
   * 因此不需要 SSR runtime；純靜態檔部署到 Cloudflare Pages 最單純也最穩。
   */
  nitro: {
    /**
     * 明確指定 static preset。
     *
     * 不指定的話，Nitro 會偵測 CI 環境自動切換：在 Cloudflare Pages 上會變成
     * cloudflare-pages-static，產出目錄從 .output/public 變成 dist，
     * 於是本機建置成功、雲端卻找不到檔案。釘死 preset 讓兩邊完全一致。
     */
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes,
      failOnError: true,
    },
  },

  // cssnano 的 postcss-merge-longhand 與 rolldown-vite 不相容（Set.prototype.has 錯誤），
  // 改由 esbuild 壓縮 CSS。
  postcss: { plugins: { cssnano: false } },
  vite: { build: { cssMinify: 'esbuild' } },
})
