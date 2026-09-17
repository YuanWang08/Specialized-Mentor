import type { L } from './i18n'

export interface Book {
  year: string
  title: L
  subtitle?: L
  author: L
  link?: string
  /** 沒有線上書籍頁面時，改在彈窗中顯示的書籍資訊 */
  details?: {
    /** 出版日期 YYYY-MM-DD */
    date: string
    publisher: L
    intro: L
  }
  cover: string | null
  /**
   * true 表示英文書名為暫譯，非中大出版中心的正式英文書名。
   * 上線前請向出版中心確認，確認後移除此旗標。
   */
  titleEnUnofficial?: boolean
}

/** 優良導師繪本（資料來源：專項導師網頁內容.xlsx／優良導師繪本分頁） */
export const books: Book[] = [
  {
    year: '2025',
    title: { zh: '片片絮語', en: 'A Murmur of Light' },
    subtitle: {
      zh: '2025 中央大學優良導師圖文繪本',
      en: 'NCU Outstanding Advisor Picture Book, 2025',
    },
    author: { zh: '圖文：趙思涵', en: 'Words and pictures: Chao Ssu-han' },
    link: 'https://ncupress.ncu.edu.tw/book_detail/297',
    cover: '/images/books/2025.jpg',
  },
  {
    year: '2024',
    title: { zh: '謝謝溫柔的你', en: 'Thank You for Your Gentleness' },
    subtitle: {
      zh: '2024 中央大學優良導師圖文繪本',
      en: 'NCU Outstanding Advisor Picture Book, 2024',
    },
    author: { zh: '圖文：黃琪紋', en: 'Words and pictures: Huang Chi-wen' },
    link: 'https://ncupress.ncu.edu.tw/book_detail/272',
    cover: '/images/books/2024.jpg',
    titleEnUnofficial: true,
  },
  {
    year: '2023',
    title: { zh: '給親愛的你', en: 'To You, Dear' },
    subtitle: {
      zh: '2023 中央大學優良導師圖文繪本',
      en: 'NCU Outstanding Advisor Picture Book, 2023',
    },
    author: { zh: '圖文：黃琪紋', en: 'Words and pictures: Huang Chi-wen' },
    link: 'https://ncupress.ncu.edu.tw/book_detail/265',
    cover: '/images/books/2023.jpg',
    titleEnUnofficial: true,
  },
  {
    year: '2022',
    title: { zh: '我想對你說', en: 'There Is Something I Want to Tell You' },
    subtitle: {
      zh: '2022 中央大學優良導師圖文繪本',
      en: 'NCU Outstanding Advisor Picture Book, 2022',
    },
    author: { zh: '圖文：黃琪紋', en: 'Words and pictures: Huang Chi-wen' },
    link: 'https://ncupress.ncu.edu.tw/book_detail/283',
    cover: '/images/books/2022.jpg',
    titleEnUnofficial: true,
  },
  {
    year: '2021',
    title: { zh: '我的單程票', en: 'My One-Way Ticket' },
    subtitle: {
      zh: '2021 中央大學優良導師插圖繪本',
      en: 'NCU Outstanding Advisor Illustrated Book, 2021',
    },
    author: { zh: '圖文：林聖凱', en: 'Words and pictures: Lin Sheng-kai' },
    link: 'https://ncupress.ncu.edu.tw/book_detail/244',
    cover: '/images/books/2021.jpg',
    titleEnUnofficial: true,
  },
  {
    year: '2020',
    title: { zh: '最大顆的松果！', en: 'The Biggest Pine Cone!' },
    subtitle: {
      zh: '2020 中央大學優良導師著色繪本',
      en: 'NCU Outstanding Advisor Colouring Book, 2020',
    },
    author: {
      zh: '圖：林聖凱　文：潘丁菡',
      en: 'Pictures: Lin Sheng-kai　Words: Pan Ting-han',
    },
    link: 'https://ncupress.ncu.edu.tw/book_detail/234',
    cover: '/images/books/2020.jpg',
    titleEnUnofficial: true,
  },
  {
    year: '2019',
    title: { zh: '導路', en: 'Guiding the Way' },
    subtitle: {
      zh: '2019 中央大學優良導師群像',
      en: 'Portraits of NCU Outstanding Advisors, 2019',
    },
    author: { zh: '圖文：林聖凱', en: 'Words and pictures: Lin Sheng-kai' },
    // 此書沒有出版中心的線上頁面，改用彈窗顯示書籍資訊
    details: {
      date: '2019-09-01',
      publisher: {
        zh: '國立中央大學諮商輔導中心',
        en: 'Counseling Center, National Central University',
      },
      intro: {
        zh: '邀請電機系畢業校友林聖凱校友擔任主編，希望用繪畫、插文全新的方式拉近師生的距離。透過這本著色書，分享中大優良導師們對導生的關心、傾聽、同理及鼓勵，搭配精美細膩的圖畫，學務處希望能勉勵每一位導師，亦師亦友做學生最堅強的精神支柱。此外，這本書無論是人物或景色都極為傳神，適合每一個人來著色，希望也能夠達到舒壓效果，值得師生珍藏。',
        en: 'Edited by Lin Sheng-kai, an alumnus of the Department of Electrical Engineering, this book sets out to bring teachers and students closer through a new form of drawings and illustrated text. As a colouring book, it shares the care, attentive listening, empathy and encouragement that NCU\'s outstanding advisors offer their students. With its fine, detailed drawings, the Office of Student Affairs hopes to encourage every advisor to be both teacher and friend — the steadiest source of support a student can have. Its people and places are drawn so vividly that anyone can enjoy colouring them in, and we hope it offers a little stress relief too. A book for teachers and students alike to keep.',
      },
    },
    cover: '/images/books/2019.jpg',
    titleEnUnofficial: true,
  },
]
