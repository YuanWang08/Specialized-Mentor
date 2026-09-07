import type { L, LP } from './i18n'
import type { MentorTypeId } from './mentorTypes'

export interface Testimonial {
  id: string
  type: MentorTypeId
  dept: L
  grade: L
  /** 學生僅以姓氏具名 */
  name: L
  content: LP
  year: string
  /** true 表示此筆為佔位資料，尚待各組提供 */
  placeholder?: boolean
}

/** 學生心得回饋（資料來源：專項導師網頁內容.xlsx／學生心得回饋分頁） */
export const testimonials: Testimonial[] = [
  {
    id: 't-dorm-01',
    type: 'dorm',
    dept: {
      zh: '資訊工程學系',
      en: 'Department of Computer Science and Information Engineering',
    },
    grade: { zh: '大三', en: 'Third year' },
    name: { zh: '林同學', en: 'Lin' },
    content: {
      zh: ['（宿舍組學生回饋內容待補）'],
      en: ['(Residence hall student reflection pending)'],
    },
    year: '114',
    placeholder: true,
  },
  {
    id: 't-sports-01',
    type: 'sports',
    dept: { zh: '教學評量回饋', en: 'Course evaluation feedback' },
    grade: { zh: '二、三、四年級', en: 'Second, third and fourth year' },
    name: { zh: '修課同學', en: 'Students enrolled in the course' },
    content: {
      zh: [
        '老師真的很用心，天氣超熱還下來跟我們一起跑，然後都會叮囑小心樹根、地滑。我原本就知道這項運動能學到很多，老師分享的相關故事也很有趣讓人印象深刻，能代表台灣比賽更讓我驚艷。老師教得非常好，如果有機會的話，會再次選老師的課。老師教課認真耐心，時常鼓勵同學並進行動作指導。',
      ],
      en: [
        'Our teacher really puts himself into it — even in blazing heat he came down and ran with us, always reminding us to watch out for tree roots and slippery ground. I already knew there was a lot to learn in this sport, and the stories he shared stayed with me; that he has represented Taiwan in competition amazed me. He teaches very well, and I would take his class again given the chance. He is serious and patient, always encouraging us and correcting our form.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-02',
    type: 'sports',
    dept: { zh: '機械工程學系', en: 'Department of Mechanical Engineering' },
    grade: { zh: '大三', en: 'Third year' },
    name: { zh: '洪同學', en: 'Hung' },
    content: {
      zh: [
        '在舞蹈校隊的這段時間裡，老師一直是很重要的存在。除了舞蹈技巧的教導，老師也會陪著我們一起面對每一次練習和比賽。練習的過程中難免會遇到做不好的時候，有時候大家的狀態不好，或是一直達不到老師期待的效果，氣氛也會變得比較低落。但老師不會只是責備我們，而是會耐心地告訴我們問題在哪裡，再陪著我們慢慢調整。',
        '在這段過程中，我也慢慢發現，舞蹈帶給我的不只是站上舞台的成就感。從平常一次次的練習，到最後一起完成比賽，我學會了如何和隊友溝通，也學會在自己累的時候，還是要為團隊多想一點。謝謝老師一路上的陪伴和信任，讓我不只是學會跳舞，也在這個過程中慢慢成為一個更有責任感、更願意為團隊付出的人。',
      ],
      en: [
        'Through my time on the dance team our teacher has been a constant presence. Beyond teaching technique, she has stood with us through every practice and every competition. There are inevitably times in rehearsal when things do not go well — when everyone is off form, or we keep falling short of what she is looking for, and the mood drops. But she never simply scolds us. She patiently shows us where the problem lies, then works through it with us.',
        'Somewhere along the way I realised that what dance gives me is not only the thrill of being on stage. From one rehearsal after another to finishing a competition together, I learned how to talk to my teammates, and learned that even when I am exhausted I should still be thinking of the team. Thank you for staying with us and trusting us — you taught me more than how to dance; over that time I slowly became someone more responsible, more willing to give to the people around me.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-03',
    type: 'sports',
    dept: { zh: '文學院', en: 'College of Liberal Arts' },
    grade: { zh: '大四', en: 'Fourth year' },
    name: { zh: '丘同學', en: 'Chiu' },
    content: {
      zh: [
        '在得知學校有現代舞校隊後，因為之前並沒有舞蹈基礎，所以原本只打算在練習時間旁聽，盡量跟著跳。後來能加入舞蹈校隊算是在我的意料之外，也是我覺得非常幸運的一件事。',
        '從認真跟著動到慢慢嘗試理解動作，思考肢體的發力方式與一些抽象的動態想像，能幫助我更好的理解動作，我才更踏實的感受到自己的進步。這源於老師會用各種不同的辦法讓學生理解動作，包含引導空間延伸的想像、講解肢體發力源頭與末梢的連帶關係、呼吸與音樂律動的緊密聯繫等等。透過這樣的指導與學習環境，能學習到遠不止於舞蹈的許多事物。',
      ],
      en: [
        'When I heard the university had a modern dance team, I had no background in dance at all, so I only meant to sit in on rehearsals and follow along as best I could. Being taken onto the team was not something I expected, and I count it a piece of real luck.',
        'I went from simply following the movements to trying to understand them — thinking about where the power comes from in the body, holding certain abstract images of motion in mind — and that understanding is what let me feel my own progress on solid ground. It comes from the many different ways our teacher finds to make a movement make sense: guiding us to imagine extension through space, explaining how the source of a movement connects to its extremities, showing how breath ties into the rhythm of the music. In this kind of teaching and this kind of environment, you learn far more than dance.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-04',
    type: 'sports',
    dept: { zh: '企業管理學系', en: 'Department of Business Administration' },
    grade: { zh: '大三', en: 'Third year' },
    name: { zh: '蔡同學', en: 'Tsai' },
    content: {
      zh: [
        '加入舞蹈隊後，我覺得自己不只是多了一個跳舞的地方，也多了一群可以一起為同一個目標努力的夥伴。現代舞不像只是把動作跳完而已，而是要思考每一個動作想傳達什麼，所以在練習的過程中，我也慢慢學會用身體表達。',
        '雖然準備比賽的過程真的蠻累的，但一起從一開始慢慢練到最後站上舞台，還是會有一種「我們真的做到了」的感覺。我覺得舞蹈隊對我來說，最大的意義就是讓我在大學生活裡還能繼續做自己喜歡的事情。',
      ],
      en: [
        'Joining the dance team gave me more than somewhere to dance; it gave me a group of people working towards the same thing. Modern dance is not a matter of getting through the movements — you have to think about what each one is meant to say, and over the course of rehearsing I slowly learned to speak with my body.',
        'Preparing for competition is genuinely tiring, but going from those first rehearsals all the way to standing on stage together leaves you with a feeling of: we actually did this. What the team means most to me is that it lets me keep doing something I love while I am at university.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-05',
    type: 'sports',
    dept: {
      zh: '大氣科學學系大氣物理研究所',
      en: 'Graduate Institute of Atmospheric Physics, Department of Atmospheric Sciences',
    },
    grade: { zh: '碩士二年級', en: "Master's, second year" },
    name: { zh: '張同學', en: 'Chang' },
    content: {
      zh: [
        '桂菱老師真的是一個超級厲害又親切的老師！每次排練之前都會有的訓練課中也會依照我們對身體哪些部分認識的不足設計動作，讓我們在訓練時會有類似的動作可以參考連貫。而且老師還會提出非常有用的建議，每次有看不懂的動作能及時詢問，老師也會再三的示範，非常細心也很有耐心，更會提醒我們在那些地方要注意不要受傷。這幾年參加舞蹈校隊訓練、跟著去比賽，雖然訓練完會有點累，但累積下來總是能讓我明顯感受的進步，是一個收穫滿滿快樂和成就感的地方。',
      ],
      en: [
        'Professor Chang is a wonderfully skilled and kind teacher. In the conditioning class before each rehearsal she designs movements around the parts of the body we understand least, so that during training we have related movements to refer back to. Her suggestions are genuinely useful; whenever there is a movement I cannot follow I can ask on the spot, and she will demonstrate it again and again, always attentive and patient, and always reminding us where to be careful not to get hurt. Over these few years of team training and competitions, tiring as it can be, the progress has been unmistakable — it is a place full of happiness and the sense of having achieved something.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-06',
    type: 'sports',
    dept: {
      zh: '資電學士班',
      en: "Bachelor's Program in Information and Electrical Engineering",
    },
    grade: { zh: '大一', en: 'First year' },
    name: { zh: '陳同學', en: 'Chen' },
    content: {
      zh: [
        '參與舞蹈校隊的這段時間，我深刻地感受到老師對教學以及校隊的用心。訓練的時候，老師會考量大家的身體狀況，再慢慢增加難度，也會把希望我們學會的律動、肢體運用、動作和協調，融入暖身或一些小組合裡，讓我們在後面的舞蹈編排和練習可以更順利。',
        '我很喜歡校隊裡大家一起練習、互相鼓勵的感覺。即使我有時因為排課沒辦法參加練習，老師也會調整時間，盡量讓大家都能跟上進度。老師也讓我感覺到校隊不只是學習跳舞的地方，也是一個讓我們一起突破自己、一起成長的團隊。',
      ],
      en: [
        'In my time with the dance team I have felt keenly how much our teacher gives to her teaching and to the team. In training she takes account of how everyone\'s body is holding up before raising the difficulty, and folds the rhythm, movement and coordination she wants us to learn into the warm-up or short combinations, so that the choreography and rehearsal that follow go more smoothly.',
        'I love the feeling of everyone rehearsing together and encouraging one another. Even when my timetable keeps me from a session, she adjusts the schedule so that everyone can keep up. She has made me feel that the team is not only somewhere to learn to dance, but a group in which we push past our own limits and grow together.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-07',
    type: 'sports',
    dept: { zh: '電機工程學系', en: 'Department of Electrical Engineering' },
    grade: { zh: '大三', en: 'Third year' },
    name: { zh: '林同學', en: 'Lin' },
    content: {
      zh: [
        '桂菱老師的現代舞與瑜伽教學很有系統，對於動作上的細節要求，例如呼吸、力量，以及特定動作需要特別感受的身體部位，都會循序漸進地指出，讓我們能逐一練習，不會一開始就因為太多要求而手忙腳亂。針對個人的不足，老師也會耐心提醒，進一步講解並親自示範。',
        '一開始加入校隊時，擔心會與校隊隊員相處不來，但後來發現大家都十分友善、包容。老師除了在舞蹈上給予指導，也很關心大家的日常生活，整個舞蹈校隊就像一個大家庭，而我非常高興能成為其中的一分子。',
      ],
      en: [
        'Professor Chang teaches modern dance and yoga with real system. She points out the fine demands of a movement — the breath, the force, the part of the body you need to feel in a particular position — step by step, so we can work through them one at a time rather than being overwhelmed from the start. Where an individual falls short she gives a patient reminder, explains further, and demonstrates herself.',
        'When I first joined I worried about fitting in with the rest of the team, but everyone turned out to be friendly and welcoming. Beyond guiding our dancing, she takes a real interest in our daily lives. The whole team is like a large family, and I am very glad to be part of it.',
      ],
    },
    year: '114',
  },
  {
    id: 't-sports-08',
    type: 'sports',
    dept: { zh: '工學院學士班', en: "Bachelor's Program, College of Engineering" },
    grade: { zh: '大四', en: 'Fourth year' },
    name: { zh: '陳同學', en: 'Chen' },
    content: {
      zh: [
        '桂菱老師很擅長用引導的方式教導舞蹈動作，也會關心並照顧學生的身心狀態；校隊管理適當，有規則但不會死板，訓練氣氛令人安心。在校隊中學到的不僅是舞步跟肢體技巧，還有根本使用身體的方式、對空間的探索，在訓練不密集時同時能感受自我的流動與釋放。比賽時雖然練習很勞累，花費大量時間與體力，但能跟其他舞隊成員一起比賽很充實，完成一支舞蹈也令人快樂，非常值得。',
      ],
      en: [
        'Professor Chang is skilled at teaching movement by drawing it out of you, and she looks after her students\' physical and mental state. The team is well run — there are rules, but nothing rigid, and the atmosphere in training puts you at ease. What you learn is not only steps and technique but a fundamental way of using the body and of exploring space; in the lighter periods of training you can feel yourself moving and letting go. Competition season is exhausting and takes a great deal of time and energy, but competing alongside the rest of the team is deeply satisfying, and finishing a piece is a joy. It is thoroughly worth it.',
      ],
    },
    year: '114',
  },
]

/** 實際可顯示的回饋（排除佔位資料） */
export const publishedTestimonials = testimonials.filter((t) => !t.placeholder)

/** 尚未收到回饋的導師類別 */
export const testimonialGaps = (['dorm', 'career', 'service', 'club'] as MentorTypeId[]).filter(
  (id) => !publishedTestimonials.some((t) => t.type === id),
)
