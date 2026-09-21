<script setup lang="ts">
import { contact } from '~/data/site'
import { useLocalized, type L, type LP } from '~/data/i18n'

const { t } = useI18n()
const { t: tc, tAll } = useLocalized()

useHead({ title: t('nav.accessibility') })

const lead: L = {
  zh: '本網站依無障礙網頁規範 AA 等級設計，致力讓所有使用者都能順利取得資訊。',
  en: 'This site is designed to meet the AA level of the web accessibility guidelines, so that everyone can get at the information it holds.',
}

const keysTitle: L = { zh: '快速鍵（定位點）', en: 'Access Keys' }
const keysIntro: L = {
  zh: '本網站設置三個快速鍵定位點。Windows 使用者請按 Alt 加上對應字母，macOS 使用者請按 Ctrl ＋ Option 加上對應字母；部分瀏覽器需再按 Enter 才會跳轉。',
  en: 'Three access keys are provided. On Windows press Alt plus the letter; on macOS press Ctrl + Option plus the letter. Some browsers require you to press Enter afterwards.',
}

const keys: { key: string; label: L; desc: L }[] = [
  {
    key: 'U',
    label: { zh: '上方導覽區', en: 'Top navigation' },
    desc: { zh: '網站標題與主選單。', en: 'The site title and main menu.' },
  },
  {
    key: 'C',
    label: { zh: '中央內容區', en: 'Main content' },
    desc: {
      zh: '本頁的主要內容，也是預設的閱讀起點。',
      en: 'The main content of the page, and the default place to start reading.',
    },
  },
  {
    key: 'Z',
    label: { zh: '頁尾資訊區', en: 'Footer' },
    desc: {
      zh: '網站導覽、相關連結與聯絡資訊。',
      en: 'Site map, related links and contact details.',
    },
  },
]

const measuresTitle: L = { zh: '無障礙設計措施', en: 'Accessibility Measures' }

const measures: { title: L; body: L }[] = [
  {
    title: { zh: '鍵盤可完整操作', en: 'Fully operable by keyboard' },
    body: {
      zh: '所有連結、按鈕與篩選功能都能以 Tab 鍵瀏覽、Enter 或空白鍵啟動，聚焦位置有明顯的外框標示。照片放大檢視可用左右方向鍵切換、Esc 鍵關閉，開啟期間焦點會鎖定在對話框內，關閉後回到原本的位置。',
      en: 'Every link, button and filter can be reached with the Tab key and activated with Enter or Space, and the focused element is clearly outlined. In the photo viewer, the arrow keys move between images and Esc closes it; while it is open focus stays within the dialog, and on closing it returns to where it was.',
    },
  },
  {
    title: { zh: '色彩對比', en: 'Colour contrast' },
    body: {
      zh: '內文與背景的對比度均達 4.5:1 以上，大型標題與圖示等非文字元素達 3:1 以上，符合 AA 等級。資訊不單以顏色呈現，導師類別同時以文字標籤標示。',
      en: 'Body text meets a contrast ratio of at least 4.5:1 against its background, and non-text elements such as icons and rules at least 3:1, meeting the AA level. No information is carried by colour alone: mentor programs are also labelled in words.',
    },
  },
  {
    title: { zh: '圖片替代文字', en: 'Alternative text for images' },
    body: {
      zh: '所有具資訊性的圖片皆有替代文字；純裝飾的圖示以 aria-hidden 標記，不會干擾螢幕閱讀器的閱讀順序。尚未提供的圖片以文字說明目前狀態。',
      en: 'Every image that carries information has alternative text; purely decorative icons are marked aria-hidden so they do not interrupt a screen reader. Images not yet supplied are described in words rather than left blank.',
    },
  },
  {
    title: { zh: '語意結構', en: 'Semantic structure' },
    body: {
      zh: '每頁只有一個主標題，其下依層級使用次標題，並使用 header、nav、main、footer 等地標元素，方便螢幕閱讀器使用者跳躍瀏覽。',
      en: 'Each page has a single main heading with sub-headings nested in order beneath it, and uses header, nav, main and footer landmarks so that screen reader users can move around the page quickly.',
    },
  },
  {
    title: { zh: '連結敘述明確', en: 'Meaningful link text' },
    body: {
      zh: '重複出現的按鈕（例如「閱讀心得」）都補上完整的替代敘述，單獨聆聽時仍可分辨指向哪一位導師。會另開新視窗的連結會事先告知。',
      en: 'Buttons that repeat across the page (such as "Read reflection") carry a fuller description, so that heard on their own it is clear which mentor they refer to. Links that open a new window say so in advance.',
    },
  },
  {
    title: { zh: '雙語版本', en: 'Two languages' },
    body: {
      zh: '本網站提供中文與英文版本，可於頁首右上角切換。頁面的語言標記會隨之更新，螢幕閱讀器會以正確的語音朗讀。',
      en: 'The site is available in Chinese and English, switchable from the top right of the page. The page language attribute updates with it, so screen readers use the correct pronunciation.',
    },
  },
  {
    title: { zh: '尊重動態偏好', en: 'Respecting motion preferences' },
    body: {
      zh: '系統設定為減少動態效果時，網站會自動關閉所有轉場與捲動動畫。網站沒有自動播放、閃爍或會自動更新的內容。',
      en: 'When the operating system is set to reduce motion, all transitions and scrolling animations are switched off. Nothing on this site auto-plays, flashes or refreshes on its own.',
    },
  },
]

const limitsTitle: L = { zh: '已知限制', en: 'Known Limitations' }
const limits: LP = {
  zh: [
    '部分單元的照片與文字內容仍在陸續補齊，網站上會以明確的文字說明目前狀態，不會以空白或無意義的佔位符呈現。',
    '英文版的部分繪本書名為暫譯，正式名稱確認後將更新。',
    '頁尾的聯絡資訊尚待主管單位正式確認。',
  ],
  en: [
    'Photographs and text for some sections are still being collected. Where content is not yet available the site says so in words, rather than leaving a blank or a meaningless placeholder.',
    'In the English version, some picture book titles are provisional translations, and will be updated once the official forms are confirmed.',
    'The contact details in the footer are awaiting formal confirmation from the responsible office.',
  ],
}

const contactTitle: L = { zh: '問題回報', en: 'Reporting a Problem' }
const contactBody: L = {
  zh: '若您在使用本網站時遇到無障礙相關的困難，歡迎與我們聯繫，我們會儘速改善。',
  en: 'If you meet any accessibility difficulty using this site, please get in touch and we will put it right as soon as we can.',
}
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="ACCESSIBILITY"
      eyebrow-lang="en"
      :title="t('nav.accessibility')"
      :lead="tc(lead)"
    />

    <section class="section section--white">
      <div class="wrap doc">
        <h2 class="doc__h2">{{ tc(keysTitle) }}</h2>
        <p>{{ tc(keysIntro) }}</p>
        <ul class="keys">
          <li v-for="k in keys" :key="k.key">
            <span class="keys__k"><kbd>Alt</kbd> ＋ <kbd>{{ k.key }}</kbd></span>
            <span class="keys__t"><strong>{{ tc(k.label) }}</strong>{{ tc(k.desc) }}</span>
          </li>
        </ul>

        <h2 class="doc__h2">{{ tc(measuresTitle) }}</h2>
        <dl class="measures">
          <template v-for="m in measures" :key="m.title.zh">
            <dt>{{ tc(m.title) }}</dt>
            <dd>{{ tc(m.body) }}</dd>
          </template>
        </dl>

        <h2 class="doc__h2">{{ tc(limitsTitle) }}</h2>
        <ul class="limits">
          <li v-for="(l, i) in tAll(limits)" :key="i">{{ l }}</li>
        </ul>

        <h2 class="doc__h2">{{ tc(contactTitle) }}</h2>
        <p>{{ tc(contactBody) }}</p>
        <ul class="limits">
          <li>{{ t('site.org') }}{{ t('common.sep') }}{{ tc(contact.unit) }}</li>
          <li>{{ t('footer.address') }}{{ t('common.sep') }}{{ tc(contact.address) }}</li>
          <li>
            {{ t('footer.phone') }}{{ t('common.sep') }}
            <a :href="contact.phoneHref">{{ tc(contact.phone) }}</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.doc { max-width: 780px; margin-inline: auto; }
.doc__h2 {
  font-family: var(--serif);
  font-size: 21px;
  color: var(--navy-800);
  margin: 40px 0 14px;
  padding-left: 13px;
  border-left: 4px solid var(--navy-600);
}
.doc__h2:first-child { margin-top: 0; }
.doc p { font-size: 15.5px; line-height: 2.1; color: var(--ink-2); }

kbd {
  display: inline-block;
  min-width: 1.6em;
  text-align: center;
  background: #fff;
  border: 1px solid var(--line);
  border-bottom-width: 2px;
  border-radius: 5px;
  padding: 1px 6px;
  font-family: var(--sans);
  font-size: 12.5px;
  color: var(--navy-800);
}

.keys { list-style: none; display: grid; gap: 12px; margin: 18px 0 0; }
.keys li {
  display: flex;
  gap: 18px;
  align-items: baseline;
  flex-wrap: wrap;
  background: var(--cream-2);
  border-radius: 10px;
  padding: 13px 18px;
}
.keys__k { flex: none; white-space: nowrap; }
.keys__t { font-size: 14.5px; color: var(--ink-2); }
.keys__t strong { color: var(--navy-800); margin-right: 8px; }

.measures { margin: 0; }
.measures dt {
  font-weight: 700;
  color: var(--navy-800);
  font-size: 15.5px;
  margin-top: 20px;
}
.measures dd {
  margin: 6px 0 0;
  font-size: 15px;
  line-height: 2.05;
  color: var(--ink-2);
}

.limits { list-style: none; display: grid; gap: 10px; }
.limits li {
  font-size: 15px;
  line-height: 2;
  color: var(--ink-2);
  padding-left: 16px;
  position: relative;
}
.limits li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.85em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--navy-600);
}
</style>
