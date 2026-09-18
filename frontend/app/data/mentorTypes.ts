import type { L } from './i18n'

export type MentorTypeId = 'dorm' | 'career' | 'service' | 'club' | 'sports'

export interface MentorType {
  id: MentorTypeId
  name: L
  short: L
  tagline: L
  /** 五大專項導師卡片用（資料來源：專項導師網頁內容.xlsx） */
  intro: L
  /** 計畫介紹全文段落（資料來源：首頁_計畫介紹.docx） */
  detail: L
  /** 裝飾用鮮豔色（非文字，對白底 ≥ 3:1） */
  color: string
  /** 文字／連結／承載白字的底色用（對白底與 -soft 淺底皆 ≥ 4.5:1） */
  colorText: string
  icon: 'home' | 'briefcase' | 'heart' | 'users' | 'run'
  link?: { label: L; href: string }
  /** 負責單位的網站，顯示在該類導師專頁標題右側的「前往單位網站」按鈕 */
  website: string
  /** 114 學年度成果重點（資料來源：年度成果分頁） */
  highlight: { value: string; unit: L; label: L }
}

export const mentorTypes: MentorType[] = [
  {
    id: 'dorm',
    website: 'https://shsd.ncu.edu.tw/',
    name: { zh: '宿舍導師', en: 'Residence Hall Mentors' },
    short: { zh: '宿舍', en: 'Residence' },
    tagline: {
      zh: '讓宿舍成為第二學習場域',
      en: 'Making the residence hall a second place to learn',
    },
    intro: {
      zh: '為讓學生能在校園生活中獲得人文、藝術、品味、創意與永續生活的全人教育學習機會，在學生宿舍交誼廳舉辦科普進宿舍系列座談及人文關懷系列講座，由宿舍導師及宿舍幹部共同策劃執行。',
      en: 'So that students encounter the humanities, the arts, taste, creativity and sustainable living as part of daily campus life, science talks and humanities lectures are held in the residence hall common rooms, planned and run jointly by residence hall mentors and student hall officers.',
    },
    detail: {
      zh: '為讓學生能在校園生活中獲得人文、藝術、品味、創意與永續生活的全人教育學習機會，中央大學住宿服務組在學生宿舍交誼廳舉辦科普進宿舍系列座談及人文關懷系列講座，由「宿舍導師」及宿舍幹部共同策劃執行，每年多達 25 場，打破傳統學習框架，將「生活」與「學習」相連，推動住學合一，養成學生們的人文素養能力。更有同學回饋：「每次參與宿舍講座都讓我收穫匪淺，啟發了我對跨領域學習的熱忱」。',
      en: 'So that students encounter the humanities, the arts, taste, creativity and sustainable living as part of daily campus life, NCU\'s Housing Service Section holds science talks and humanities lectures in the residence hall common rooms. Planned and run jointly by residence hall mentors and student hall officers, as many as 25 are held each year. They break out of the conventional classroom, joining living and learning into one and cultivating students\' humanistic literacy. As one student put it: "Every hall lecture I attend gives me something. They sparked my enthusiasm for learning across disciplines."',
    },
    color: 'var(--c-dorm)',
    colorText: 'var(--c-dorm-text)',
    icon: 'home',
    highlight: {
      value: '796',
      unit: { zh: '人次', en: 'attendances' },
      label: { zh: '宿舍導師講座參與', en: 'at residence hall lectures' },
    },
  },
  {
    id: 'career',
    website: 'https://consulting.careercenter.ncu.edu.tw/',
    name: { zh: '職涯導師', en: 'Career Mentors' },
    short: { zh: '職涯', en: 'Career' },
    tagline: {
      zh: '陪伴與探索點亮職涯路',
      en: 'Company and exploration, lighting the way to a career',
    },
    intro: {
      zh: '跨系所領域的多元導師群，提供職涯諮詢並規劃職涯輔導相關活動。陪伴學生探索特質，開拓視野，提升接軌職場的能力。',
      en: 'A diverse group of mentors from across departments offers career counselling and organises career guidance activities, helping students discover their strengths, widen their horizons, and build the skills to step into the workplace.',
    },
    detail: {
      zh: '本校推動「職涯導師」制度，旨在協助系所依其特色規劃職輔策略，串聯教學目標、職涯發展及產業人才培育需求。導師的核心任務涵蓋職涯諮詢、規劃職涯輔導活動、協助實習輔導，每年平均諮詢量達 150 人次。在活動推動方面，導師與職涯發展中心合作安排講座、參訪、測評、履歷健診、模擬面試等活動，每年累計近百場、逾 2,000 人次參與。藉由師生對談及產業互動，幫助青年學子建立學習目標、提升學習動力。',
      en: 'NCU\'s career mentor system helps each department plan career guidance around its own strengths, linking teaching goals, career development and the talent industry needs. Mentors\' core work covers career counselling, planning career guidance activities and supporting internships, with around 150 consultations a year on average. Working with the Career Development Center, mentors arrange talks, company visits, assessments, résumé reviews and mock interviews — close to a hundred events a year, drawing more than 2,000 attendances. Through conversation between teachers and students and contact with industry, young people set learning goals and find fresh motivation to learn.',
    },
    color: 'var(--c-career)',
    colorText: 'var(--c-career-text)',
    icon: 'briefcase',
    link: {
      label: { zh: '職涯輔導諮詢系統', en: 'Career Counselling System' },
      href: 'https://consulting.careercenter.ncu.edu.tw/',
    },
    highlight: {
      value: '1,988',
      unit: { zh: '人次', en: 'attendances' },
      label: { zh: '職涯活動參與', en: 'at career activities' },
    },
  },
  {
    id: 'service',
    website: 'https://service-learning.ncu.edu.tw/',
    name: { zh: '服務學習導師', en: 'Service Learning Mentors' },
    short: { zh: '服務學習', en: 'Service Learning' },
    tagline: {
      zh: '在服務中培養社會責任',
      en: 'Learning social responsibility through service',
    },
    intro: {
      zh: '定期舉辦導師工作坊，討論及分享課程設計規劃與執行，透過導師間的相互交流，激發更多元的學習課程規劃。',
      en: 'Regular mentor workshops bring teachers together to discuss and share how they design and run their courses, and that exchange between mentors gives rise to a wider range of learning designs.',
    },
    detail: {
      zh: '「服務學習」，就是「服務」與「學習」的相互結合，也就是在「服務」過程中獲得「學習」的效果。中央大學服務學習發展中心推動「服務學習導師」以「準備、服務、反思、慶賀」為架構，共同規劃服務學習課程。並透過工作坊、班級合作、社會服務講座提升服務學習課程的品質。同學對此相當滿意，回饋道：「導師安排了很多專業領域的社會人士演講，看到他們不斷用專業技能解決社會問題，就會讓工作結合服務貢獻的心持續燃燒熱情」。',
      en: 'Service learning joins service and learning together: students learn through the act of serving. NCU\'s Service Learning Development Center works with service learning mentors to design courses around a four-part structure — preparation, service, reflection and celebration — and raises the quality of those courses through workshops, inter-class collaboration and community service lectures. Students respond warmly. As one wrote: "Our mentor invited many professionals to speak. Seeing them solve social problems with their own expertise keeps alive the wish to make my work count for something."',
    },
    color: 'var(--c-service)',
    colorText: 'var(--c-service-text)',
    icon: 'heart',
    highlight: {
      value: '91',
      unit: { zh: '%', en: '%' },
      label: { zh: '課程媒合社會實踐', en: 'of courses matched to community service' },
    },
  },
  {
    id: 'club',
    website: 'https://club.adm.ncu.edu.tw/',
    name: { zh: '系學會導師', en: 'Student Association Mentors' },
    short: { zh: '系學會', en: 'Student Association' },
    tagline: {
      zh: '支持學生自治與領導發展',
      en: 'Supporting student self-governance and leadership',
    },
    intro: {
      zh: '輔導系學會活動規劃與行政運行，使學生與系所間有相互溝通的橋樑，關心系學會之運作，強化師生關係。',
      en: 'Mentors advise student associations on planning activities and running their affairs, forming a bridge between students and their department, taking an interest in how each association works, and strengthening the bond between teachers and students.',
    },
    detail: {
      zh: '中央大學共有 27 個系學會，「系學會導師」適切地給予系學會建議，讓活動愈趨多元精彩，並建立與系所間相互溝通的橋樑，鼓勵學生藉活動培育軟實力，厚植人際溝通能力、領導力、人文關懷素養，培養健全人格的公民。中央大學課外活動組統計系學會導師每年平均指導約 500 個校內外活動，每年社團活動參與學生平均 30,000 人。',
      en: 'NCU has 27 departmental student associations. Their mentors offer advice that makes activities richer and more varied, and act as a bridge to the department. Through running these activities students build the softer skills — communication, leadership, care for others — that make for well-rounded citizens. The Extracurricular Activities Section records that association mentors guide around 500 on- and off-campus activities each year, with average student participation of 30,000.',
    },
    color: 'var(--c-club)',
    colorText: 'var(--c-club-text)',
    icon: 'users',
    highlight: {
      value: '200',
      unit: { zh: '場', en: 'activities' },
      label: { zh: '課外活動學習輔導', en: 'of extracurricular guidance' },
    },
  },
  {
    id: 'sports',
    website: 'https://pe.ncu.edu.tw/',
    name: { zh: '體育導師', en: 'Physical Education Mentors' },
    short: { zh: '體育', en: 'Physical Education' },
    tagline: {
      zh: '培養健康生活與團隊精神',
      en: 'Building healthy habits and a team spirit',
    },
    intro: {
      zh: '由體育室教師擔任，培養個人從事規律運動和團隊合作精神，將運動精神和習慣融入日常生活中，提高學生日後對於終身運動生涯規劃能力，促進學生參與志願服務及具備專業體育志工知能。',
      en: 'Led by teachers from the Physical Education Office, these mentors cultivate regular exercise and a spirit of teamwork, weaving sport into everyday life so that students can plan for a lifetime of activity, and encouraging them to volunteer and to develop the knowledge of a trained sports volunteer.',
    },
    detail: {
      zh: '體育包含了每個人身體和心理健康狀態的面向，「體育導師」培養學生從事規律運動和團隊合作精神，將運動精神和習慣融入日常生活中，提高學生日後對於終身運動生涯規劃能力。近年來，中央大學在體育賽事表現成績亮眼。',
      en: 'Physical education concerns both bodily and mental wellbeing. Physical education mentors cultivate regular exercise and a spirit of teamwork, weaving sport into everyday life so that students can plan for a lifetime of activity. NCU has performed strongly in competition in recent years.',
    },
    color: 'var(--c-sports)',
    colorText: 'var(--c-sports-text)',
    icon: 'run',
    highlight: {
      value: '5,600',
      unit: { zh: '人次', en: 'attendances' },
      label: { zh: '全校體育活動參與', en: 'at university sports events' },
    },
  },
]

export const typeMap = Object.fromEntries(mentorTypes.map((t) => [t.id, t])) as Record<
  MentorTypeId,
  MentorType
>
