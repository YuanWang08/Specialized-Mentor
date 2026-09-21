/**
 * 每一頁的標題與搜尋／分享資訊。
 *
 * - title：頁面標題（會套上「｜站名」）；傳 null 表示首頁，直接用站名。
 * - description：搜尋結果與 LINE／Facebook 分享卡片上的摘要，大多直接沿用頁首的導言。
 * - image：分享預覽圖（站內路徑），未指定時用預設的校園主視覺。
 * - noindex：404 等不該被搜尋引擎收錄的頁面。
 *
 * canonical 與中英文 hreflang 由 @nuxtjs/i18n 在 app.vue 產生（baseUrl 設在 nuxt.config）。
 */
interface PageSeo {
  title: string | null
  description: string
  image?: string | null
  noindex?: boolean
}

const DEFAULT_IMAGE = '/images/og-default.jpg'

export function usePageSeo(get: () => PageSeo) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const base = String(useRuntimeConfig().public.siteUrl || '').replace(/\/+$/, '')
  const abs = (path: string) => base + path

  const fullTitle = () => {
    const title = get().title
    return title ? `${title}｜${t('site.name')}` : t('site.name')
  }
  const description = () => get().description.replace(/\s+/g, ' ').trim()
  const image = () => abs(get().image || DEFAULT_IMAGE)

  useHead(() => {
    const title = get().title
    return title === null ? { title: null, titleTemplate: () => t('site.name') } : { title }
  })

  useSeoMeta({
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: () => t('site.name'),
    ogLocale: () => (locale.value === 'en' ? 'en_US' : 'zh_TW'),
    ogUrl: () => abs(route.path),
    ogImage: image,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image,
    robots: () => (get().noindex ? 'noindex, follow' : 'index, follow'),
  })
}
