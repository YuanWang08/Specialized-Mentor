import type { L, LP } from './i18n'
import type { MentorTypeId } from './mentorTypes'

export interface Outstanding {
  id: string
  /** 英文姓名為暫譯，上線前需向各位老師確認慣用拼法 */
  name: L
  rank: L
  dept: L
  type: MentorTypeId
  /** 導師心語（20 字內） */
  motto: L
  /** 簡述表心得（500 字以內），各組尚未填寫者為 null */
  reflection: LP | null
  /** 相片路徑，尚未提供者為 null */
  photo: string | null
}

/** 114 學年度傑出專項導師（資料來源：專項導師網頁內容.xlsx／傑出導師分享分頁） */
export const outstanding: Outstanding[] = [
  {
    id: 'xie-jieming',
    name: { zh: '謝介銘', en: 'Hsieh Chieh-ming' },
    rank: { zh: '教授', en: 'Professor' },
    dept: {
      zh: '化學工程與材料工程學系',
      en: 'Department of Chemical and Materials Engineering',
    },
    type: 'dorm',
    motto: {
      zh: '做中學習累積能力，勇於探索成就自我。',
      en: 'Build ability by doing; become yourself by daring to explore.',
    },
    reflection: null,
    photo: '/images/mentors/xie-jieming.jpg',
  },
  {
    id: 'song-yuwen',
    name: { zh: '宋玉雯', en: 'Sung Yu-wen' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: { zh: '中國文學系', en: 'Department of Chinese Literature' },
    type: 'career',
    motto: {
      zh: '為生活努力，懷抱嚮往，勇敢前行。',
      en: 'Work at your life, hold on to what you long for, and go forward.',
    },
    reflection: {
      zh: [
        '除個別諮詢外，老師精心規劃多元且具深度的系列演講，涵蓋影視公關、出版思維、藝術產業與勞工權益等領域。引導學生從人文學科跨域，體會職涯並無標準模板，成功在於逐步建立理解他人與連結世界的能力；同時透過勞權講座剖析當前職場現況，帶領學生掌握非典型勞動下的權益保障與多元發展可能性。',
      ],
      en: [
        'Alongside one-to-one counselling, Professor Sung has built a careful series of in-depth talks spanning film and media public relations, publishing, the arts industries and labour rights. She guides humanities students across disciplinary lines to see that there is no standard template for a career: what matters is the slowly built capacity to understand other people and to connect with the world. Her sessions on labour rights examine the present state of the workplace, helping students grasp both the protections available under non-standard employment and the range of paths open to them.',
      ],
    },
    photo: '/images/mentors/song-yuwen.jpg',
  },
  {
    id: 'gong-cunxiong',
    name: { zh: '龔存雄', en: 'Kung Tsun-hsiung' },
    rank: { zh: '副教授', en: 'Associate Professor' },
    dept: { zh: '電機工程學系', en: 'Department of Electrical Engineering' },
    type: 'career',
    motto: {
      zh: 'AI 時代勇於突破，深耕所學逐夢前行。',
      en: 'In the age of AI, break new ground; go deep in what you study and chase the dream.',
    },
    reflection: {
      zh: [
        '老師提供了近 60 場的個別職涯諮詢，諮詢過程中能依學生個別需求提供適切引導，協助學生釐清生涯方向，並鼓勵參與實務專題、競賽及研究計畫，提升職場競爭力。',
        '老師也在密集諮詢中體會學生對於科技快速更迭的焦慮，故結合自身產業經驗與專業人脈，規劃辦理高品質職涯講座，邀請業界專家分享先進科技與產業發展趨勢，協助學生拓展職涯視野與了解產業需求。',
      ],
      en: [
        'Professor Kung has held close to 60 individual career counselling sessions, tailoring his guidance to what each student needs, helping them clarify the direction they want to take, and encouraging them into hands-on projects, competitions and research work that strengthen their standing in the job market.',
        'Through that intensive counselling he came to understand how anxious students feel about the pace at which technology turns over. Drawing on his own industry experience and professional network, he organised a series of high-quality career talks, inviting specialists from industry to speak on emerging technologies and where their sectors are heading, so that students could widen their view and understand what industry is actually looking for.',
      ],
    },
    photo: '/images/mentors/gong-cunxiong.jpg',
  },
  {
    id: 'han-bowei',
    name: { zh: '韓伯維', en: 'Han Po-wei' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: {
      zh: '資訊工程學系',
      en: 'Department of Computer Science and Information Engineering',
    },
    type: 'service',
    motto: {
      zh: '做中學、學中做，勇於探索，建立自信。',
      en: 'Learn by doing, do by learning; explore boldly and build confidence.',
    },
    reflection: {
      zh: [
        '讓缺乏教學經驗的大一新生，蛻變為能帶領百位中小學生的程式營隊講師，從中教學相長，是課程設計的主軸。本著「做中學，學中做」的核心理念，將課程分為程式營隊與社群推廣雙軌並行，有效擴大了資訊教育的普及及延續性。',
        '在籌備階段，不僅策劃 AWS Cloud AI 與 Godot 遊戲開發等前瞻微課程，更設計了引導式學習單，系統性地協助他們釐清教學目標並優化時間管理。為了服務品質的把關，在營隊正式上陣前，嚴謹地帶領學生進行模擬試教，並給予具體回饋。從爭取外部經費贊助到讓同學們實際站上講台，在老師的陪伴下深化了資訊專業，更學會了換位思考，將生硬的程式碼化為具備溫度的社會貢獻。',
      ],
      en: [
        'Turning first-year students with no teaching experience into instructors capable of leading a coding camp for a hundred schoolchildren — and having them learn as much as they teach — is the spine of this course design. Working from the principle of learning by doing and doing by learning, the course runs on two parallel tracks, coding camps and community outreach, which together widened both the reach and the staying power of computing education.',
        'In preparation, Professor Han not only planned forward-looking short courses on AWS Cloud AI and Godot game development, but also designed guided worksheets that systematically helped students clarify their teaching goals and manage their time. To safeguard the quality of the service, he put students through rigorous mock teaching before the camps opened, giving concrete feedback on each. From securing outside funding to putting students in front of a real class, his accompaniment deepened their technical knowledge and taught them to see through someone else\'s eyes, turning dry code into a contribution with warmth in it.',
      ],
    },
    photo: '/images/mentors/han-bowei.jpg',
  },
  {
    id: 'chen-xiuqi',
    name: { zh: '陳秀琪', en: 'Chen Hsiu-chi' },
    rank: { zh: '教授', en: 'Professor' },
    dept: {
      zh: '客家語文暨社會科學學系',
      en: 'Department of Hakka Language and Social Sciences',
    },
    type: 'service',
    motto: {
      zh: '用良善關懷社會，以熱情服務他人。',
      en: 'Care for society with kindness; serve others with warmth.',
    },
    reflection: null,
    photo: null,
  },
  {
    id: 'cai-xizheng',
    name: { zh: '蔡錫錚', en: 'Tsai Hsi-cheng' },
    rank: { zh: '副教授', en: 'Associate Professor' },
    dept: { zh: '機械工程學系', en: 'Department of Mechanical Engineering' },
    type: 'service',
    motto: {
      zh: '讓專業走入真實，為社會帶來改變。',
      en: 'Let expertise meet the real world, and change something for the better.',
    },
    reflection: null,
    photo: null,
  },
  {
    id: 'wu-xinyi',
    name: { zh: '吳忻怡', en: 'Wu Hsin-i' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: { zh: '通識教育中心', en: 'Center for General Education' },
    type: 'service',
    motto: {
      zh: '在服務中學習，理解彼此、看見他人。',
      en: 'Learn through service: understand one another, and truly see other people.',
    },
    reflection: null,
    photo: null,
  },
  {
    id: 'zheng-yangyi',
    name: { zh: '鄭揚宜', en: 'Cheng Yang-i' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: { zh: '通識教育中心', en: 'Center for General Education' },
    type: 'service',
    motto: {
      zh: '人生苦短，想做的事就勇敢去做。',
      en: 'Life is short. If you want to do it, do it.',
    },
    reflection: null,
    photo: '/images/mentors/zheng-yangyi.jpg',
  },
  {
    id: 'fan-shirong',
    name: { zh: '范世榮', en: 'Fan Shih-jung' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: { zh: '生命科學系', en: 'Department of Life Sciences' },
    type: 'service',
    motto: {
      zh: '在合作服務中成長，成就他人也成就自己。',
      en: 'Grow through serving together; in lifting others you make something of yourself.',
    },
    reflection: {
      zh: [
        '在推動精緻化服務學習的實踐中，以「專業融入 × 社會參與」為核心架構，帶領學生走入偏鄉教育的最前線。以一學年規劃上下學期課程，讓學習設計具有高度的延續性與系統性。在上學期，先透過專業講師授課與偏鄉紀錄片探討，扎實學生的教案設計與國中小校園班級管理能力，更貼近偏鄉學校的需求。',
        '為了讓學生順利轉換為「知識傳遞者」，親自參與各小組的討論，從水火箭、DNA 編繩到細胞黏土，逐一檢視教案的安全性與可行性。進入下學期實地教學時，更引導學生依據偏鄉學童的實際反應進行滾動式修正。面對教學現場的突發狀況，如器材故障或時間延遲，在第一時間輔導學生臨場應變。透過嚴謹的準備歷程及服務後的反思學習，學生不僅反思了城鄉資源落差，更在團隊協作中收穫了滿滿的成就感，完美體現了高等教育的社會實踐價值。',
      ],
      en: [
        'In pursuing a more finely crafted form of service learning, Professor Fan built his course around the pairing of professional knowledge with civic participation, and led students to the front line of education in rural Taiwan. Planning across two semesters gave the design real continuity and structure. In the first semester, specialist lectures and documentaries about rural schooling grounded students in lesson planning and classroom management for primary and junior high pupils, and brought them closer to what rural schools actually need.',
        'To help students make the shift into being the ones who pass knowledge on, he sat in on every group\'s discussions, examining each lesson plan for safety and feasibility — water rockets, DNA braiding, clay cell models, one by one. When the second semester brought them into real classrooms, he guided them to revise as they went, according to how the children actually responded. When something went wrong on the spot — equipment failing, running behind time — he was there to coach them through it. Through that rigorous preparation and the reflection that followed the service, students not only came to see the gap in resources between city and countryside, but found real satisfaction in working as a team: higher education\'s civic purpose, fully realised.',
      ],
    },
    photo: '/images/mentors/fan-shirong.jpg',
  },
  {
    id: 'salone',
    name: { zh: '莎瓏．伊斯哈罕布德', en: 'Salone Ishahavut' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: { zh: '文學院學士班', en: "Bachelor's Program, College of Liberal Arts" },
    type: 'service',
    motto: {
      zh: '傾聽他人故事，也尋找自己想成為的人。',
      en: "Listen to other people's stories, and look for the person you want to become.",
    },
    reflection: {
      zh: [
        '「18 歲的年輕人除了滑手機，還能對什麼充滿熱情？」莎瓏老師以此為學術叩問，推動了一場長達一學年的深度田野調查之旅。為了讓長年埋首書堆的學生真實觸摸社會脈動，老師放手讓學生自主選擇感興趣的田野主題，從本土製琴師、女刀匠、3D 列印創作者到神職人員，展開長期的蹲點與訪談。',
        '採訪過程中，記者深刻感受到老師在「陪伴與賦能」上的用心。她不僅在課堂上傳授田調倫理與敘事技巧，更在下學期的策展階段親力親為。面對學生對實體策展的陌生，老師從展版設計、動線規劃到搬運重物佈展，皆逐一指導並嚴格驗收。這場名為「熱愛研究所」的實體展覽，成功將深度的生命故事帶回校園；老師更引導學生將展板回饋給受訪者，真正落實了服務學習中「互惠與平等」的真諦，讓學生的視野從教室走向了廣闊的社會。',
      ],
      en: [
        '"Besides their phones, what can an 18-year-old still be passionate about?" Professor Salone took that question as her scholarly starting point and set in motion a year-long journey of in-depth fieldwork. To let students who had spent years buried in books feel the actual pulse of society, she let them choose their own subjects, and they settled in for long stretches of observation and interviewing — with a local luthier, a woman bladesmith, a 3D-printing artist, a member of the clergy.',
        "What stands out is the care she put into accompanying students while handing them real power. She taught fieldwork ethics and narrative technique in class, then threw herself into the second semester's exhibition work. Facing students who had never mounted a physical exhibition, she guided them through panel design, visitor flow and the hauling of heavy objects, inspecting each stage rigorously. The resulting exhibition, \"The Institute of Passion,\" brought these deep life stories back onto campus; she then had students return the panels to the people they had interviewed — service learning's principle of reciprocity and equality made real, carrying their view from the classroom out into the wider world.",
      ],
    },
    photo: null,
  },
  {
    id: 'li-shuping',
    name: { zh: '李淑萍', en: 'Li Shu-ping' },
    rank: { zh: '教授', en: 'Professor' },
    dept: { zh: '中國文學系', en: 'Department of Chinese Literature' },
    type: 'club',
    motto: {
      zh: '多方學習、生活實踐，成就不一樣的自己。',
      en: 'Learn widely, live it out, and become someone unlike anyone else.',
    },
    reflection: null,
    photo: '/images/mentors/li-shuping.jpg',
  },
  {
    id: 'yang-shuzhi',
    name: { zh: '楊舒芝', en: 'Yang Shu-chih' },
    rank: { zh: '特聘教授', en: 'Distinguished Professor' },
    dept: { zh: '大氣科學學系', en: 'Department of Atmospheric Sciences' },
    type: 'club',
    motto: {
      zh: '關懷社會、探索自我，將正向力量傳承下去。',
      en: 'Care for society, explore yourself, and pass the good forward.',
    },
    reflection: null,
    photo: '/images/mentors/yang-shuzhi.jpg',
  },
  {
    id: 'zhang-guiling',
    name: { zh: '張桂菱', en: 'Chang Kuei-ling' },
    rank: { zh: '助理教授', en: 'Assistant Professor' },
    dept: { zh: '體育室', en: 'Physical Education Office' },
    type: 'sports',
    motto: {
      zh: '接受外部環境的變動性，保持對生活的韌性。',
      en: 'Accept that the world around you shifts; keep your resilience for living.',
    },
    reflection: {
      zh: [
        '擔任 114 學年度舞蹈校隊指導老師期間，每週固定兩次、每次三小時的訓練，以及寒暑假密集排練，不僅考驗學生的體能與意志力，也考驗學生在作品中如何發揮並展現各自的能力及特長，尤在排練過程間潛移默化學生對作品的表現意識。透過舞蹈訓練，展現對動作技巧的要求，更從學習歷程等細節培養學生的紀律、責任感與團隊默契與向心力。尤在全國學生舞蹈比賽中，連續兩學年度榮獲大專組現代舞丙組優等成績（114 學年度排序前 2），這是學生努力的成果，亦是團隊付出的最佳肯定。',
        '此外，帶領舞蹈校隊參與 114 年度全國大專校院運動會閉幕演出，從排練規劃、隊形調度、演出細節到現場執行，每一環節皆需反覆確認與調整。能夠透過舞蹈展現學校特色與學生自我獨特的能量，不僅提升學生自信心，也增進校園藝文與運動文化的交流。',
        '整體而言，回顧 114 學年度的帶隊歷程，如舞蹈校隊訓練、帶隊參與全國舞蹈比賽，以及賽會演出，又或全大運選手管理等工作中，深刻體會體育教育工作不僅是專業技術與行政的執行，更是一種陪伴、責任與回饋的生命實踐。未來仍期許自己能持續精進專業能力，深化體育教育的整合，提供學生更完善的學習與展演環境，推動校園體育活動之發展，為中大創造更多正向價值與成果。',
      ],
      en: [
        'As coach of the university dance team this year, I held training twice a week, three hours at a time, with intensive rehearsals over the winter and summer breaks. This tested not only the students\' fitness and will, but how each of them brought their own ability and character into the work — and, over the course of rehearsal, quietly shaped their sense of how a piece should be performed. Dance training demands precision of movement, and the details of that process build discipline, responsibility, and the unspoken understanding that holds a team together. At the National Student Dance Competition the team won distinction in the university modern dance division for the second consecutive year, placing in the top two this year: the fruit of the students\' effort, and the best recognition of what the team has given.',
        'The team also performed at the closing ceremony of this year\'s National Intercollegiate Athletic Games. From rehearsal planning and formation changes to the fine points of the performance and its execution on the day, every element had to be checked and adjusted again and again. Being able to show the character of the university and the distinct energy of its students through dance lifts the students\' confidence and enriches the exchange between the arts and sporting life on campus.',
        'Looking back over the year — team training, the national competition, the ceremony performance, managing athletes at the Intercollegiate Games — I have come to feel deeply that work in physical education is not only technical and administrative. It is a practice of accompaniment, responsibility and giving back. I hope to keep refining my professional ability, to deepen how physical education is integrated, to give students a fuller environment in which to learn and perform, and to help campus sport grow and create more of lasting value for NCU.',
      ],
    },
    photo: '/images/mentors/zhang-guiling.jpg',
  },
  {
    id: 'yu-hongqun',
    name: { zh: '余宏群', en: 'Yu Hung-chun' },
    rank: { zh: '講師', en: 'Lecturer' },
    dept: { zh: '體育室', en: 'Physical Education Office' },
    type: 'sports',
    motto: {
      zh: '拳練百遍，身法自現；拳練千遍，其理自見。運動學習如同人生；透過汗與淚的交織，邁向卓越的歷程。',
      en: 'Practise a form a hundred times and the body finds its way; practise it a thousand and the reasoning shows itself. Learning sport is like living a life — the road to excellence is woven from sweat and tears.',
    },
    reflection: {
      zh: [
        '學生參與運動競賽能為校爭光，不只是對教學能力的肯定，更是一份責任與提醒。在體育教學與代表隊訓練的過程中，我深刻體會到，體育課不僅是技能訓練，更是品格教育與態度養成的重要場域。學生在運動中學會合作、面對挫折、建立自信，這些都是影響一生的關鍵能力。',
        '在教學上，我嘗試將傳統的反覆練習，轉化為具挑戰性與趣味性的任務式活動，讓學生在「完成任務」的過程中自然習得動作技能，而非被動地接受指令。當學生因為成功完成挑戰而露出笑容時，我更確信「動機來自參與感與成就感」。此外，我體會到差異化教學也是重要的，讓不同能力的學生都能找到適合自己的參與方式，避免因挫折而失去信心。',
        '回顧自身的教學指導歷程，我也看見自身仍有進步空間。例如如何更有效運用科技輔助教學，提升學生的即時回饋與學習效率，都是我未來努力的方向。未來我將持續以學生為中心，深化教學設計，讓體育課成為學生期待、投入且能帶走一輩子價值的學習經驗。',
      ],
      en: [
        'When students win honour for the university in competition, it is not only a mark of good teaching but a responsibility and a reminder. Teaching physical education and training the varsity squad, I have come to feel deeply that a PE class is not just skills training: it is where character and attitude are formed. In sport students learn to cooperate, to face setbacks, to build confidence — the abilities that shape a whole life.',
        'In my teaching I try to turn traditional repetition into task-based activity with challenge and enjoyment in it, so that students pick up the movement naturally in the course of completing something, rather than passively following instructions. When a student smiles at having met a challenge, I am the more convinced that motivation comes from a sense of taking part and of having achieved something. I have also learned how important differentiated teaching is: students of differing ability each need a way in that suits them, so that frustration does not cost them their confidence.',
        'Looking back at my own teaching, I can see where I still have room to grow — how to use technology more effectively to give students faster feedback and make their learning more efficient, for instance. I intend to keep the student at the centre, to deepen how I design my teaching, and to make the PE class something students look forward to, throw themselves into, and take lasting value away from.',
      ],
    },
    photo: '/images/mentors/yu-hongqun.jpg',
  },
]

export const outstandingById = (id: string) => outstanding.find((m) => m.id === id)
export const outstandingByType = (type: MentorTypeId) => outstanding.filter((m) => m.type === type)
