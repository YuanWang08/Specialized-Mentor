import type { L, LP } from './i18n'
import type { MentorTypeId } from './mentorTypes'

/**
 * 中大導師制度頁（/system）。
 * 資料來源：主管提供的 Google Docs〈國立中央大學「專項輔導導師」，培育學生軟實力〉。
 * 中文照原文，只把文中的學生回饋抽出來做成引言；體育段依文件修訂，刪去逐項賽事名次。
 */

export const systemTitle: L = {
  zh: '國立中央大學「專項輔導導師」，培育學生軟實力',
  en: 'Specialized Mentors at NCU: Cultivating Students\' Soft Skills',
}

export const systemLead: L = {
  zh: '讓頂尖的教育人才走出研究室、走出教室，陪伴學生養成受用一生的跨領域軟實力。',
  en: 'Bringing the university\'s finest educators out of the laboratory and the lecture hall, to help students build cross-disciplinary skills that last a lifetime.',
}

export const systemIntro: LP = {
  zh: [
    '本校於 100 學年度起設置「專項輔導導師」制度，讓更多有熱誠的教師關懷、鼓勵學生積極學習，除了具備專業知識與技能，更培養具有生活美學、創意與人文關懷等「軟實力」。',
    '專項輔導導師包括：職涯導師、宿舍導師、服務學習導師、系學會導師及體育導師，為提昇輔導品質及效益，並定期舉辦導師工作坊、交流會及系列專題講座，以提供同學多元的全人教育與環境。',
  ],
  en: [
    'Since the 2011 academic year, NCU has run a specialized mentoring system that brings more committed teachers into the work of caring for students and encouraging them to learn — so that alongside professional knowledge and skills, students also develop soft skills: an eye for the art of living, creativity, and care for other people.',
    'Specialized mentors comprise career mentors, residence hall mentors, service learning mentors, student association mentors and physical education mentors. To raise the quality and effect of this guidance, the university regularly holds mentor workshops, exchange meetings and lecture series, giving students a varied, holistic education and environment.',
  ],
}

export const systemFacts: { value: L; unit: L; label: L }[] = [
  {
    // 英文讀者不熟民國學年度，改寫成西元
    value: { zh: '100', en: '2011' },
    unit: { zh: '學年度起', en: 'onwards' },
    label: { zh: '設置專項輔導導師制度', en: 'the specialized mentoring system in place' },
  },
  {
    value: { zh: '5', en: '5' },
    unit: { zh: '類', en: 'types' },
    label: { zh: '專項輔導導師', en: 'of specialized mentor' },
  },
  {
    value: { zh: '140', en: '140' },
    unit: { zh: '位', en: 'mentors' },
    label: { zh: '每年各系所推薦', en: 'nominated by departments each year' },
  },
]

export interface SystemChapter {
  type: MentorTypeId
  body: LP
  stats?: { value: string; unit: L; label: L }[]
  /** 流程或核心理念（依序呈現） */
  steps?: { label: L; items: L[] }
  quote?: L
}

export const systemChapters: SystemChapter[] = [
  {
    type: 'career',
    body: {
      zh: [
        '「職涯導師」推動各系所建立職涯輔導特色與策略，使教學方針、職涯重點、產業人才三者相互銜接。各系所皆設有職涯導師，主要任務包含職涯諮詢、實習輔導、職輔活動等，學生每年平均諮詢達到 80～120 人次。',
        '職輔活動方面，與職涯發展中心合作安排講座、參訪、測評、履歷健診、模擬面試等活動，平均每年約 50～70 場，每年累計參加人次約 2,300 人。透過師生對談與互動，幫助莘莘學子建立學習目標、提升學習動力。',
      ],
      en: [
        'Career mentors help each department develop its own approach to career guidance, so that teaching, career priorities and the talent industry needs all connect. Every department has career mentors, whose main work is career counselling, internship guidance and career activities; on average they hold 80 to 120 student consultations a year.',
        'Working with the Career Development Center, they arrange talks, company visits, assessments, résumé reviews and mock interviews — around 50 to 70 events a year, with roughly 2,300 attendances in total. Through conversation and contact with their teachers, students set learning goals and find new motivation to learn.',
      ],
    },
    stats: [
      {
        value: '80–120',
        unit: { zh: '人次', en: 'consultations' },
        label: { zh: '每年學生平均諮詢', en: 'with students each year' },
      },
      {
        value: '50–70',
        unit: { zh: '場', en: 'events' },
        label: { zh: '每年職輔活動', en: 'of career activities each year' },
      },
      {
        value: '2,300',
        unit: { zh: '人次', en: 'attendances' },
        label: { zh: '每年累計參加', en: 'in total each year' },
      },
    ],
  },
  {
    type: 'dorm',
    body: {
      zh: [
        '為讓學生能在校園生活中獲得人文、藝術、品味、創意與永續生活的全人教育學習機會，住宿服務組在學生宿舍交誼廳舉辦科普進宿舍系列座談及人文關懷系列講座，由「宿舍導師」及宿舍幹部共同策劃執行，每年多達 25 場，打破傳統學習框架，將「生活」與「學習」相連，推動住學合一，養成學生們的人文素養能力。',
      ],
      en: [
        'So that students encounter the humanities, the arts, taste, creativity and sustainable living as part of campus life, the Housing Service Section holds science talks and humanities lectures in the residence hall common rooms. Planned and run jointly by residence hall mentors and student hall officers, as many as 25 are held each year. They break out of the conventional classroom, joining living and learning into one and cultivating students\' humanistic literacy.',
      ],
    },
    stats: [
      {
        value: '25',
        unit: { zh: '場', en: 'lectures' },
        label: { zh: '每年宿舍系列講座', en: 'in residence halls each year' },
      },
    ],
    quote: {
      zh: '每次參與宿舍講座都讓我收穫匪淺，啟發了我對跨領域學習的熱忱。',
      en: 'Every hall lecture I attend gives me something. They sparked my enthusiasm for learning across disciplines.',
    },
  },
  {
    type: 'service',
    body: {
      zh: [
        '「服務學習」，就是「服務」與「學習」的相互結合，也就是在「服務」過程中獲得「學習」的效果。服務學習發展中心推動「服務學習導師」以「準備、服務、反思、慶賀」為架構，共同規劃服務學習課程，並透過工作坊、班級合作、社會服務講座提升服務學習課程的品質。',
      ],
      en: [
        'Service learning joins service and learning together: students learn through the very act of serving. The Service Learning Development Center works with service learning mentors to plan courses around a framework of preparation, service, reflection and celebration, and raises course quality through workshops, class partnerships and community service talks.',
      ],
    },
    steps: {
      label: { zh: '服務學習課程架構', en: 'Course framework' },
      items: [
        { zh: '準備', en: 'Preparation' },
        { zh: '服務', en: 'Service' },
        { zh: '反思', en: 'Reflection' },
        { zh: '慶賀', en: 'Celebration' },
      ],
    },
    quote: {
      zh: '導師安排了很多專業領域的社會人士演講，看到他們不斷用專業技能解決社會問題，就會讓工作結合服務貢獻的心持續燃燒熱情。',
      en: 'Our mentor brought in many professionals to speak. Watching them keep using their expertise to solve social problems keeps my passion burning for work that also serves others.',
    },
  },
  {
    type: 'club',
    body: {
      zh: [
        '全校共有 27 個系學會，「系學會導師」適切地給予系學會建議，讓活動愈趨多元精彩，並建立與系所間相互溝通的橋樑，鼓勵學生藉活動培育軟實力，厚植人際溝通能力、領導力、人文關懷素養，培養健全人格的公民。',
        '課外活動組統計系學會導師每年平均指導約 500 個校內外活動，每年社團活動參與學生平均 30,000 人。',
      ],
      en: [
        'NCU has 27 student associations. Student association mentors offer well-judged advice that makes their activities ever more varied and rewarding, and build bridges between the associations and their departments. They encourage students to grow through these activities — strengthening communication, leadership and care for others, and becoming well-rounded citizens.',
        'According to the Extracurricular Activities Section, student association mentors guide around 500 on- and off-campus activities a year, and club activities draw an average of 30,000 student participants each year.',
      ],
    },
    stats: [
      {
        value: '27',
        unit: { zh: '個', en: 'associations' },
        label: { zh: '全校系學會', en: 'across the university' },
      },
      {
        value: '500',
        unit: { zh: '個', en: 'activities' },
        label: { zh: '每年指導校內外活動', en: 'guided each year' },
      },
      {
        value: '30,000',
        unit: { zh: '人', en: 'participants' },
        label: { zh: '每年社團活動參與', en: 'in club activities each year' },
      },
    ],
  },
  {
    type: 'sports',
    body: {
      zh: [
        '體育包含了每個人身體和心理健康狀態的面向，「體育導師」培養學生從事規律運動和團隊合作精神，將運動精神和習慣融入日常生活中，提高學生日後對於終身運動生涯規劃能力。近年來，本校在體育賽事表現成績亮眼，榮獲大專校院多項競賽榮譽。',
      ],
      en: [
        'Physical education touches every aspect of a person\'s physical and mental health. Physical education mentors help students take up regular exercise and a spirit of teamwork, carry sportsmanship and healthy habits into daily life, and learn to plan for a lifetime of sport. In recent years NCU has performed strongly in competition, winning many honours at intercollegiate level.',
      ],
    },
    steps: {
      label: { zh: '培養重點', en: 'What mentors cultivate' },
      items: [
        { zh: '規律運動', en: 'Regular exercise' },
        { zh: '團隊合作', en: 'Teamwork' },
        { zh: '終身運動', en: 'Lifelong sport' },
      ],
    },
  },
]

export const systemClosing: L = {
  zh: '每年，中央大學各系所推薦約 140 位優秀專項輔導導師，讓頂尖的教育人才走出研究室、走出教室，透過不同的輔導方式，促進學生養成「受用一生」的跨領域軟實力。',
  en: 'Each year NCU departments nominate around 140 outstanding specialized mentors, bringing the university\'s finest educators out of the laboratory and out of the classroom. Through these different kinds of guidance, students build cross-disciplinary skills that will serve them for a lifetime.',
}
