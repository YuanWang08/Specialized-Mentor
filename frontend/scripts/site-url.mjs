/**
 * 網站的正式網址（結尾不加斜線）。
 *
 * 用在：canonical／hreflang 的絕對網址、社群分享預覽（og:url、og:image）、sitemap.xml、robots.txt。
 * 換成學校網域時只要改這一行，或在建置環境設定 NUXT_PUBLIC_SITE_URL 覆蓋。
 */
export const SITE_URL = (process.env.NUXT_PUBLIC_SITE_URL || 'https://specialized-mentor.pages.dev').replace(/\/+$/, '')
