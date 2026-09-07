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
  to: string
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
]

// TODO 待補：徐姐提供正式聯絡資訊後替換，並把 pending 改為 false
export const contact = {
  pending: true,
  address: { zh: '（地址待補）', en: '(address pending)' } satisfies L,
  phone: { zh: '（電話待補）', en: '(telephone pending)' } satisfies L,
  email: { zh: '（Email 待補）', en: '(email pending)' } satisfies L,
  links: [
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
