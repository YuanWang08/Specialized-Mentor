import type { L, LP } from './i18n'
import type { MentorTypeId } from './mentorTypes'

export interface ResultEntry {
  type: MentorTypeId
  /** 成果敘述 */
  body: LP
  /** 關鍵數據 */
  stats: { value: string; unit: L; label: L }[]
  /** 競賽榮譽等條列 */
  awards?: { title: L; items: L[] }[]
}

export const resultsYear: L = { zh: '114 學年度', en: '2025–26' }

/** 年度成果（資料來源：專項導師網頁內容.xlsx／年度成果分頁） */
export const results: ResultEntry[] = [
  {
    type: 'dorm',
    body: {
      zh: [
        '於 114 學年度重新遴選宿舍導師，邀請各學院共 9 位老師擔任宿舍導師，透過手作與演講等活動，讓學生將課堂外知識融入生活累積軟實力。',
      ],
      en: [
        'Residence hall mentors were newly selected this year, with nine teachers invited from across the colleges. Through hands-on workshops and talks, students fold what they learn outside the classroom into daily life and build their softer skills.',
      ],
    },
    stats: [
      {
        value: '9',
        unit: { zh: '位', en: 'mentors' },
        label: { zh: '宿舍導師', en: 'residence hall mentors' },
      },
      {
        value: '22',
        unit: { zh: '場', en: 'lectures' },
        label: { zh: '宿舍導師講座', en: 'residence hall lectures' },
      },
      {
        value: '648',
        unit: { zh: '人次', en: 'attendances' },
        label: { zh: '累計參與', en: 'total attendance' },
      },
    ],
  },
  {
    type: 'career',
    body: {
      zh: [
        '以「培育職場核心能力」、「職場實務探索體驗」、「關鍵就業能力運用」三大主軸推動職涯輔導，涵蓋產業趨勢分析、增能課程、企業參訪、履歷健診與模擬面試。',
      ],
      en: [
        'Career guidance runs along three lines — building core workplace capabilities, hands-on exploration of the workplace, and applying key employability skills — covering industry trend analysis, skills courses, company visits, résumé reviews and mock interviews.',
      ],
    },
    stats: [
      {
        value: '20',
        unit: { zh: '場', en: 'events' },
        label: {
          zh: '產業趨勢與職涯講座（1,188 人次）',
          en: 'industry and career talks (1,188 attendances)',
        },
      },
      {
        value: '7',
        unit: { zh: '場', en: 'events' },
        label: {
          zh: '企業參訪及實務工作坊（205 人次）',
          en: 'company visits and practical workshops (205 attendances)',
        },
      },
      {
        value: '2',
        unit: { zh: '場', en: 'events' },
        label: {
          zh: '履歷健診及模擬面試（80 人次）',
          en: 'résumé reviews and mock interviews (80 attendances)',
        },
      },
    ],
  },
  {
    type: 'service',
    body: {
      zh: ['每學期辦理 2 次的全校服務學習導師交流會議，媒合服務學習課程參與社會實踐服務。'],
      en: [
        'University-wide exchange meetings for service learning mentors are held twice each semester, matching service learning courses with community service opportunities.',
      ],
    },
    stats: [
      {
        value: '4',
        unit: { zh: '次', en: 'meetings' },
        label: { zh: '全校導師交流會議', en: 'university-wide mentor meetings' },
      },
      {
        value: '91',
        unit: { zh: '%', en: '%' },
        label: {
          zh: '課程媒合社會實踐服務',
          en: 'of courses matched to community service',
        },
      },
    ],
  },
  {
    type: 'club',
    body: {
      zh: ['輔導學生課外活動學習，協助系學會活動規劃與行政運行，並蒐集學生對導師指導的滿意度回饋。'],
      en: [
        'Mentors guide extracurricular learning, support student associations in planning activities and running their affairs, and gather student feedback on the guidance they receive.',
      ],
    },
    stats: [
      {
        value: '200',
        unit: { zh: '場', en: 'activities' },
        label: { zh: '課外活動學習輔導', en: 'of extracurricular guidance' },
      },
      {
        value: '8',
        unit: { zh: '分', en: '/ 10' },
        label: {
          zh: '學生滿意度（滿分 10 分）',
          en: 'average student satisfaction',
        },
      },
    ],
  },
  {
    type: 'sports',
    body: {
      zh: ['辦理全校性體育活動，並帶領運動代表隊參與校外競賽，於全國賽事屢獲佳績。'],
      en: [
        'University-wide sporting events are held throughout the year, and varsity squads are led into external competition, taking repeated honours at national level.',
      ],
    },
    stats: [
      {
        value: '11',
        unit: { zh: '場', en: 'events' },
        label: { zh: '全校性體育活動', en: 'university-wide sports events' },
      },
      {
        value: '5,600',
        unit: { zh: '人次', en: 'attendances' },
        label: { zh: '累計參與', en: 'total attendance' },
      },
    ],
  },
]

/** 體育競賽榮譽另外掛，避免 results 陣列過長 */
results[4]!.awards = [
  {
    title: {
      zh: '114 學年度大專籃球聯賽',
      en: 'University Basketball Association, 2025–26',
    },
    items: [
      {
        zh: '公開女二級 第五名',
        en: "Women's Open Division II — 5th place",
      },
    ],
  },
  {
    title: {
      zh: '115 年全國大專校院運動會',
      en: 'National Intercollegiate Athletic Games, 2026',
    },
    items: [
      {
        zh: '游泳 一般女子組 100m 自由式第四名、200m 自由式第六名',
        en: "Swimming, women's general division — 4th in 100 m freestyle, 6th in 200 m freestyle",
      },
      {
        zh: '田徑 一般女子組 三級跳遠第三名、跳遠第七名',
        en: "Athletics, women's general division — 3rd in triple jump, 7th in long jump",
      },
      {
        zh: '田徑 一般男生組 10000 公尺競走第三名、1500 公尺第四名、3000 公尺障礙第四名',
        en: "Athletics, men's general division — 3rd in 10,000 m walk, 4th in 1,500 m, 4th in 3,000 m steeplechase",
      },
      {
        zh: '跆拳道 一般男生組 品勢個人組第一名、對打 58 公斤級第五名',
        en: "Taekwondo, men's general division — 1st in individual poomsae, 5th in sparring (58 kg)",
      },
      {
        zh: '桌球 公開男生組 單打第五名',
        en: "Table tennis, men's open division — 5th in singles",
      },
      {
        zh: '羽球 公開女生組 單打第五名、一般女生組團體第五名',
        en: "Badminton — 5th in women's open singles, 5th in women's general division team event",
      },
      {
        zh: '網球 一般女生組單打第一名、一般男生組團體第五名、軟網男單第一名、男雙第三名、女單第五名、混雙第八名',
        en: "Tennis — 1st in women's general division singles, 5th in men's general division team event; soft tennis — 1st in men's singles, 3rd in men's doubles, 5th in women's singles, 8th in mixed doubles",
      },
    ],
  },
  {
    title: {
      zh: '114 學年度全國學生舞蹈比賽',
      en: 'National Student Dance Competition, 2025–26',
    },
    items: [
      {
        zh: '大專組 現代舞丙組 優等',
        en: 'University division, modern dance Group C — Distinction',
      },
    ],
  },
  {
    title: {
      zh: '114 學年度攀登錦標賽',
      en: 'Climbing Championships, 2025–26',
    },
    items: [
      {
        zh: '先鋒賽 女子組第五名、第七名，男子組第四名、第五名',
        en: "Lead climbing — 5th and 7th in the women's division, 4th and 5th in the men's",
      },
      {
        zh: '速度賽 女子組第一名',
        en: "Speed climbing — 1st in the women's division",
      },
    ],
  },
]

/** 高教深耕計畫指標達成情形（114 年～115 年 5 月，教務處統籌） */
export const kpiPeriod: L = { zh: '114 年～115 年 5 月', en: '2025 – May 2026' }

export const kpiIntro: L = {
  zh: '透過五大專項導師機制，全方位提升學生職涯、服務、生活與健康素養，各項指標皆超標達成。',
  en: 'The five mentoring programs together raise students’ capabilities across career, service, daily life and health. Every target was exceeded.',
}

export const kpis: { type: MentorTypeId; label: L; value: L; rate: number; note: L }[] = [
  {
    type: 'career',
    label: { zh: '職涯增能體驗活動', en: 'Career skills and experience activities' },
    value: { zh: '36 場', en: '36 events' },
    rate: 120,
    note: {
      zh: '有效提升職涯規劃意識',
      en: 'Raised awareness of career planning',
    },
  },
  {
    type: 'service',
    label: { zh: '課程融入專業社會實踐', en: 'Courses embedding professional community service' },
    value: { zh: '95%', en: '95%' },
    rate: 106,
    note: {
      zh: '目標 90%，落實「做中學」核心理念',
      en: 'Target 90%; realising the principle of learning by doing',
    },
  },
  {
    type: 'dorm',
    label: { zh: '宿舍 PBL 講座', en: 'Problem-based learning lectures in residence halls' },
    value: { zh: '28 場', en: '28 lectures' },
    rate: 186,
    note: {
      zh: '深化住宿生問題解決能力',
      en: "Deepened resident students' problem-solving",
    },
  },
  {
    type: 'club',
    label: { zh: '系學會輔導活動', en: 'Student association guidance activities' },
    value: { zh: '242 場', en: '242 activities' },
    rate: 161,
    note: {
      zh: '展現學生自治與領導力',
      en: 'Student self-governance and leadership in evidence',
    },
  },
  {
    type: 'sports',
    label: { zh: '校園運動參與人次', en: 'Attendance at campus sport' },
    value: { zh: '6,000+', en: '6,000+' },
    rate: 150,
    note: {
      zh: '校園運動風氣顯著提升',
      en: 'A marked lift in the culture of sport on campus',
    },
  },
]
