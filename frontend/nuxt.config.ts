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
      ],
      link: [
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

  // cssnano 的 postcss-merge-longhand 與 rolldown-vite 不相容（Set.prototype.has 錯誤），
  // 改由 esbuild 壓縮 CSS。
  postcss: { plugins: { cssnano: false } },
  vite: { build: { cssMinify: 'esbuild' } },
})
