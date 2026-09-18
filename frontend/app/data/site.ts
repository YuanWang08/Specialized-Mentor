import type { L } from './i18n'

/** 站名、副標與機關名放在 i18n/locales，這裡只留內容型文案。 */
export const site = {
  year: { zh: '114 學年度', en: '2025–26' } satisfies L,
  heroTitle: {
    zh: '多元專項輔導導師\n成果網',
    en: 'Specialized\nMentoring Programs',
  } satisfies L,
  heroLead: {
    zh: '結合宿舍、職涯、服務學習、系學會及體育導師，建構學生多元支持網絡，陪伴學生探索自我、連結社會、實踐夢想。',
    en: 'Residence hall, career, service learning, student association and physical education mentors together build a network of support around each student — helping them explore who they are, connect with society, and pursue what they set out to do.',
  } satisfies L,
}

export interface NavItem {
  key: string
  /** 站內路徑 */
  to?: string
  /** 站外網址（另開新視窗）；與 to 擇一 */
  href?: string
  children?: { key: string; to: string }[]
}

/** 導覽列。label 走 i18n 的 nav.* 鍵值。 */
export const nav: NavItem[] = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  {
    key: 'mentors',
    to: '/mentors',
    children: [
      { key: 'dorm', to: '/mentors/dorm' },
      { key: 'career', to: '/mentors/career' },
      { key: 'service', to: '/mentors/service' },
      { key: 'club', to: '/mentors/club' },
      { key: 'sports', to: '/mentors/sports' },
    ],
  },
  { key: 'results', to: '/results' },
  { key: 'outstanding', to: '/outstanding' },
  { key: 'books', to: '/books' },
  { key: 'gallery', to: '/gallery' },
  // 原本的 /system 頁已停用（檔案改名為 pages/-system.vue 保留），改連到諮商中心的導師專區
  { key: 'system', href: 'https://love.adm.ncu.edu.tw/NCU_counsel/mentorship-system' },
]

/**
 * 頁尾聯絡資訊。
 *
 * 內容由使用者於 2026-09-07 提供，但當時的說法是「據我所知可能可以用」，
 * 尚未經徐姐或諮商中心正式確認。上線前請核對：主管單位、郵遞區號、分機、隱私權政策網址。
 */
export const contact = {
  /**
   * 內容是否已經正式確認。畫面上不再顯示提示（依使用者要求移除），
   * 這個旗標留作團隊的待辦註記：向諮商中心確認過就改成 false。
   */
  unconfirmed: true,
  unit: {
    zh: '學務處諮商中心',
    en: 'Counseling Center, Office of Student Affairs',
  } satisfies L,
  address: {
    zh: '(320017) 桃園市中壢區中大路 300 號',
    en: 'No. 300, Zhongda Rd., Zhongli Dist., Taoyuan City 320017, Taiwan',
  } satisfies L,
  phone: {
    zh: '(03) 422-7151 分機 57261',
    en: '+886-3-422-7151 ext. 57261',
  } satisfies L,
  /** 供 tel: 連結使用，只留數字與必要符號 */
  phoneHref: 'tel:+886-3-4227151,57261',
  privacy: {
    label: { zh: '隱私權政策聲明', en: 'Privacy Policy' } satisfies L,
    href: 'https://www.cc.ncu.edu.tw/p/412-1033-159.php',
  },
  links: [
    {
      label: { zh: '中央大學學務處', en: 'NCU Office of Student Affairs' } satisfies L,
      href: 'https://osa.ncu.edu.tw/index.php',
    },
    {
      label: { zh: '中央大學首頁', en: 'NCU Home' } satisfies L,
      href: 'https://www.ncu.edu.tw/',
      hrefEn: 'https://www.ncu.edu.tw/en',
    },
    {
      label: { zh: '職涯輔導諮詢系統', en: 'Career Counselling System' } satisfies L,
      href: 'https://consulting.careercenter.ncu.edu.tw/',
    },
    {
      label: { zh: '中央大學出版中心', en: 'NCU Press' } satisfies L,
      href: 'https://ncupress.ncu.edu.tw/',
    },
  ],
}
