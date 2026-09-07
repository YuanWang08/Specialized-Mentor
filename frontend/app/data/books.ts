import type { L } from './i18n'

export interface Book {
  year: string
  title: L
  subtitle?: L
  author: L
  link?: string
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
    title: { zh: '為他們點亮一盞燈', en: 'Lighting a Lamp for Them' },
    subtitle: {
      zh: '2019 中央大學傑出與優良教師群像',
      en: "Portraits of NCU's Distinguished and Outstanding Teachers, 2019",
    },
    author: { zh: '圖文：林聖凱', en: 'Words and pictures: Lin Sheng-kai' },
    link: 'https://ncupress.ncu.edu.tw/book_detail/207',
    cover: '/images/books/2019.jpg',
    titleEnUnofficial: true,
  },
]
