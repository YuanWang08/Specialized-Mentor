/**
 * 內容雙語化的型別與取值工具。
 *
 * 設計取捨：介面字串（按鈕、通用標籤）放在 `i18n/locales/*.json`，由開發者維護；
 * 但**內容**（導師簡介、心得、學生回饋）留在 `app/data/*.ts`，用 { zh, en } 並排。
 * 原因是內容是由校方人員校對的，中英文擺在同一行才看得出哪一句對哪一句、
 * 哪裡還沒翻；拆成兩個 JSON 檔會讓校稿變成在兩個檔案間對行號。
 */

/** 一段雙語文字。en 為 null 表示尚未翻譯，畫面會退回中文並標示。 */
export interface L {
  zh: string
  en: string | null
}

/** 一段雙語段落（每個元素是一個段落）。 */
export interface LP {
  zh: string[]
  en: string[] | null
}

export type LocaleCode = 'zh-TW' | 'en'

const isEn = (locale: string) => locale.startsWith('en')

/** 取單段文字；英文缺漏時回退中文。 */
export function pick(text: L, locale: string): string {
  return isEn(locale) ? text.en ?? text.zh : text.zh
}

/** 取多段文字；英文缺漏時回退中文。 */
export function pickAll(text: LP, locale: string): string[] {
  return isEn(locale) ? text.en ?? text.zh : text.zh
}

/** 該欄位在目前語系下是否為未翻譯的回退內容（用於畫面上標示）。 */
export function isFallback(text: L | LP, locale: string): boolean {
  return isEn(locale) && text.en === null
}

/**
 * 在元件中取用雙語內容：
 *   const { t } = useLocalized()
 *   t(mentor.dept)
 */
export function useLocalized() {
  const { locale } = useI18n()
  return {
    locale,
    t: (text: L) => pick(text, locale.value),
    tAll: (text: LP) => pickAll(text, locale.value),
    fallback: (text: L | LP) => isFallback(text, locale.value),
    isEn: computed(() => isEn(locale.value)),
  }
}
