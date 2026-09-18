import type { L, LP } from './i18n'
import type { MentorTypeId } from './mentorTypes'

export interface Testimonial {
  id: string
  type: MentorTypeId
  dept: L
  grade: L
  /** 學生僅以姓氏具名；原始資料沒有姓名者一律「O同學」 */
  name: L
  content: LP
  year: string
  /** true 表示此筆為佔位資料，尚待各組提供 */
  placeholder?: boolean
}

/**
 * 學生心得回饋（114 學年度，2026-09 更新版）。
 * 中文為學生原文照錄（含原本的用字與標點，不代為修改）；英文為翻譯。
 * 依導師類別排序：宿舍、職涯、服務學習、系學會、體育。
 * 此檔由 scratchpad 的產生腳本輸出，之後可直接手動編輯。
 */
export const testimonials: Testimonial[] = [
  {
    id: "t-dorm-01",
    type: "dorm",
    dept: { zh: "理學院學士班", en: "Bachelor's Program, College of Science" },
    grade: { zh: "大二", en: "Second year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得超級好玩！雖然我串珠串得不太好，長得歪歪的，但是我在聽老師講解蘭嶼過程中，學習到了很多內容，讓我更認識蘭嶼，真的非常好玩！！！我下次一定會繼續參加宿舍活動，很好玩，也可以學到很多知識！！！！！！"],
      en: ["It was so much fun! My beadwork didn't turn out well — it came out all crooked — but listening to the teacher talk about Orchid Island I learned a lot and got to know the island much better. It was really fun!!! I'll definitely keep coming to residence hall events; they're fun and you learn so much!!!"],
    },
    year: '114',
  },
  {
    id: "t-dorm-02",
    type: "dorm",
    dept: { zh: "資訊電機學院學士班", en: "Bachelor's Program, College of Electrical Engineering and Computer Science" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得很棒 學到很多很實用的內容 也獲得很多新知識，甚至在這場活動認識很多新朋友，這場演講對我來說我單純只是知識的獲得 更是獲得好人脈很好的途徑！！非常感謝主辦方辛苦辦理這場精彩又有意義的演講 我受益非常非常多！"],
      en: ["It was great. I learned a lot of genuinely practical things and picked up plenty of new knowledge, and I even made lots of new friends. For me this talk wasn't just about gaining knowledge — it was also a great way to build connections! Many thanks to the organisers for putting on such a rich and meaningful talk. I got so much out of it!"],
    },
    year: '114',
  },
  {
    id: "t-dorm-03",
    type: "dorm",
    dept: { zh: "資工系", en: "Department of Computer Science and Information Engineering" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得這次的講座對我來說很有收穫，因為對我來說也快找工作了，能聽到這些以後關於找工作的資訊對我來說很有用，算是能在面試時能增加自己的軟實力，以後在面試時能夠更加更好闡述自己的想法。"],
      en: ["This talk was really worthwhile for me. I'll be job hunting soon, so hearing this information about finding work was very useful — it adds to my soft skills for interviews and will help me put my ideas across better."],
    },
    year: '114',
  },
  {
    id: "t-dorm-04",
    type: "dorm",
    dept: { zh: "化材系", en: "Department of Chemical and Materials Engineering" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["今天參加了一個手作梭織活動，過程非常有趣也充滿驚喜。老師先介紹梭織的基本工具和步驟，接著帶我們操作，從穿線到織布，每一個細節都需要專注與耐心。起初有點手忙腳亂，但慢慢找到節奏後，看到線條交錯出獨特的花樣，真的很有成就感。整個過程不僅讓我放鬆心情，也體驗到傳統工藝的魅力，親手完成作品的喜悅無可比擬。很開心有這樣的機會參與！希望未來還有機會參加類似得手作活動。"],
      en: ["Today I took part in a hands-on shuttle weaving workshop, and it was great fun and full of surprises. The teacher first introduced the basic tools and steps, then walked us through them — from threading to weaving, every detail took focus and patience. I was a little all over the place at first, but once I found my rhythm and saw the threads cross into a pattern of my own, it was really satisfying. It relaxed me and let me experience the charm of a traditional craft; the joy of finishing something with my own hands is hard to beat. I'm so glad I had the chance, and I hope there'll be more hands-on activities like this."],
    },
    year: '114',
  },
  {
    id: "t-dorm-05",
    type: "dorm",
    dept: { zh: "經濟系", en: "Department of Economics" },
    grade: { zh: "大二", en: "Second year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["老師們都很有耐心的教導 第一次體驗織布 雖然我沒有美感 做的歪歪的 布還是有著自己的風格 當作自己特別的體驗也不錯！我不擅長手藝手工的過程 從國小就很有障礙 但還好這次的體驗容易懂 沒有讓我那麼的手忙腳亂 這布我會一直留著 當作是大學的回憶！"],
      en: ["The teachers were all very patient. It was my first time weaving, and although I have no eye for design and mine came out crooked, the cloth still has its own style — a special experience in its own way! I've never been good with my hands, ever since primary school, but this was easy to follow and I didn't get flustered. I'll keep this cloth as a memory of university!"],
    },
    year: '114',
  },
  {
    id: "t-dorm-06",
    type: "dorm",
    dept: { zh: "機械系", en: "Department of Mechanical Engineering" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["看到講師能夠把實際的風景圖片抽象成意象的色塊組合出的蠟筆，心裡覺得很感動與澎湃。彷彿看的了記憶的實體也是像這樣，把實際的畫面變成了色塊，帶著情感的印象留存。非常驚喜能夠看到他們各個系列的作品，讓我感受到很多美好。"],
      en: ["Seeing the artist turn real landscape photographs into crayons made of abstract blocks of colour moved and stirred me. It felt as if memories themselves might be like that — real scenes turned into blocks of colour, kept as impressions that carry feeling. I was delighted to see each series of their work; it showed me so much that is beautiful."],
    },
    year: '114',
  },
  {
    id: "t-dorm-07",
    type: "dorm",
    dept: { zh: "法文系", en: "Department of French" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["參加之前其實對這個講座沒有抱太大期待，本來以為會是很枯燥無聊的演講，但開場就以桌遊作為整個活動的開始，讓活動豐富度提升了很多。接著後面老師掌握整個講座的速度也很剛好，讓我能一直保持在專注的狀態不會分心。整體內容而言也學到了不少，除了跟騷主題本身以外老師還略略提及了很多關於傳統社會的價值觀、性別觀念、女性主義等值的深思的內容。整個講座結束後，不但不會讓我有浪費了兩個小時聽師長老生常談的感覺，反而讓我覺得過了很充實的兩個小時！也對未來學校會舉辦的其他講座有了期待。"],
      en: ["Before going I didn't expect much — I thought it would be a dry, boring lecture. But it opened with a board game, which made the whole event much richer. After that the speaker paced the talk just right, so I stayed focused throughout. I learned a lot: beyond the topic of stalking itself, the speaker touched on traditional social values, ideas about gender, feminism and other things worth reflecting on. When it ended I didn't feel I'd wasted two hours on well-worn advice — it felt like two very full hours, and I'm now looking forward to the university's other talks."],
    },
    year: '114',
  },
  {
    id: "t-dorm-08",
    type: "dorm",
    dept: { zh: "機械系", en: "Department of Mechanical Engineering" },
    grade: { zh: "大二", en: "Second year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["感受色彩的搭配還有認識到用不同的角度欣賞每一樣東西，像是原本掉落的樹枝和樹葉都是裝飾常用而且很實用的裝飾用品，這次拿到了一株聖誕紅，透過自己親手裝飾，講師也有給予裝飾上的建議和搭配，收穫良多，想再參與更多類似的活動"],
      en: ["I learned about pairing colours and seeing things from different angles — fallen branches and leaves, for example, turn out to be common and very practical decorations. This time I was given a poinsettia to decorate myself, and the instructor offered suggestions on arrangement. I got a lot out of it and would love to join more activities like this."],
    },
    year: '114',
  },
  {
    id: "t-dorm-09",
    type: "dorm",
    dept: { zh: "英文系", en: "Department of English" },
    grade: { zh: "大二", en: "Second year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["認識很多失眠的原因，也有介紹，還有實際教學如何按壓穴位，所以我覺得很不錯。我自己是沒有失眠的問題，但也認識到很多藥材還有養身的方法。我覺得學校的講座可以多辦像今天這樣的中醫講座，讓我們就算因為讀書需要熬夜也可以保養自己的身體。"],
      en: ["I learned about many causes of insomnia, and we were even shown how to press acupoints, which I thought was great. I don't have trouble sleeping myself, but I learned about many herbs and ways of looking after my health. I think the university could hold more traditional Chinese medicine talks like this one, so that even when we have to stay up studying we can take care of our bodies."],
    },
    year: '114',
  },
  {
    id: "t-dorm-10",
    type: "dorm",
    dept: { zh: "中文系", en: "Department of Chinese Literature" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["這次聽完這場講座，讓我學到了很多關於攝影、修圖的一些技巧跟注意的事情，例如攝影師要勇敢點，要能夠引導被攝影者，還有拍照要拍的自然等等，以前對於拍照都是隨隨便便的拍，對於拍照出來的成果也不會在意，但是在聽完此次的講座以後，我也學到了很多相關知識，讓我受益匪淺。"],
      en: ["This talk taught me a lot about photography and photo editing — for instance, that a photographer needs to be bold and guide the subject, and that photos should look natural. I used to take pictures carelessly and didn't care how they came out, but after this talk I've learned a great deal and benefited enormously."],
    },
    year: '114',
  },
  {
    id: "t-dorm-11",
    type: "dorm",
    dept: { zh: "生科系", en: "Department of Life Sciences" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["參加這次的憂鬱症講座後,我對憂鬱症有了更深入的理解。原來情緒低落不是軟弱,而是一種需要被看見與治療的疾病。講者分享了許多案例,也提醒我們要尊重彼此的感受,不要用 「想開一點」去忽略別人的痛苦。最重要的是,憂鬱症並不可怕,只要及早尋求專業協助,就能慢慢走出陰影。這場講座讓我學會更多同理與支持的方法。"],
      en: ["After this talk on depression I understand the illness much more deeply. Feeling low is not weakness; it is a condition that needs to be seen and treated. The speaker shared many cases and reminded us to respect one another's feelings, and not to brush off someone's pain with \"just look on the bright side\". Most importantly, depression isn't something to fear: with professional help sought early, people can gradually find their way out. The talk taught me more ways to show empathy and support."],
    },
    year: '114',
  },
  {
    id: "t-dorm-12",
    type: "dorm",
    dept: { zh: "地科系", en: "Department of Earth Sciences" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["很高興可以參加這次的活動，原本以為是很專業的內容，但老師講的非常的生動有趣，除了天文的東西之外，傳達更多關於怎麼做事情的態度，以及要怎麼面對不喜愛的事物但必須要做下去的方法，因為分享的老師跟我們年紀沒有差到太多，分享很多從學生時期過來的經驗，讓我知道在目前的階段就是要好好的提升自己，讓自己有更多的老本在未來可以當作資源"],
      en: ["I'm really glad I came. I thought the content would be very technical, but the speaker made it lively and fun. Beyond astronomy, they shared a lot about the attitude you bring to your work, and how to keep going with things you don't enjoy but have to do. Since the speaker isn't much older than us, they shared many experiences from their own student days, which showed me that now is the time to build myself up, so I have more to draw on in future."],
    },
    year: '114',
  },
  {
    id: "t-dorm-13",
    type: "dorm",
    dept: { zh: "生科系", en: "Department of Life Sciences" },
    grade: { zh: "大二", en: "Second year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得老師的講座非常的有個人特色之外，在生活的方面及整理的心裡概念有都有不同的說明，讓我對整理的概念有了新的想法。雖然我本人屬於極簡主義的執行者，房間東西不多、也沒有太亂，但我覺得在思考東西的捨離方面，我很喜歡老師的一句話：整理房間、斷捨離就像是執行房間的新陳代謝，沒有持續的斷捨離，東西只會不斷累積。"],
      en: ["The talk had a lot of personal character, and explained both the practical and the psychological sides of tidying, which gave me new ideas about it. I'm something of a minimalist myself — I don't own much and my room isn't messy — but on letting go of things I really liked one line from the speaker: tidying and decluttering are like your room's metabolism; without ongoing decluttering, things just keep piling up."],
    },
    year: '114',
  },
  {
    id: "t-dorm-14",
    type: "dorm",
    dept: { zh: "英文系", en: "Department of English" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["以往我常常會因為壓力大、心情差而購物，堆積了許多物品且不知道該如何有效整理以及和他們情感斷捨離，在聽完講座之後我學習到如何合理分類物品以及有效地整理。這次講座讓我獲益良多，希望未來能有更多類似的講座，能讓我分享給同樣生活雜亂的朋友！"],
      en: ["I used to shop whenever I was stressed or feeling down, and ended up with piles of things I didn't know how to sort or let go of. After the talk I learned how to categorise my belongings sensibly and tidy them effectively. I got a lot out of it and hope there will be more talks like this, so I can share them with friends whose lives are just as cluttered!"],
    },
    year: '114',
  },
  {
    id: "t-dorm-15",
    type: "dorm",
    dept: { zh: "企管系", en: "Department of Business Administration" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["參與插花活動，讓我深刻體會大自然的療癒力量。起初，我笨拙地握著花枝，不知如何搭配，但老師耐心指導，從選材到構圖，每一步都充滿驚喜。花的嬌豔、堅韌，透過剪裁與插置，彷彿訴說生命故事。過程中，手指沾染花汁，心靈卻逐漸平靜，忘卻課業壓力。完成作品時，那份成就感油然而生！插花不僅是藝術，更是修身養性之道。今後，我會多嘗試，讓花朵陪伴日常，增添生活詩意。"],
      en: ["The flower-arranging session let me feel how healing nature can be. At first I held the stems clumsily, unsure how to combine them, but the teacher guided us patiently from choosing materials to composition, and every step was a pleasant surprise. The beauty and resilience of the flowers, trimmed and placed, seemed to tell a story of life. My fingers were stained with sap, but my mind grew calm and I forgot the pressure of coursework. Finishing my arrangement gave a real sense of achievement! Flower arranging is not only an art but a way of cultivating oneself, and I'll keep trying it, letting flowers bring a little poetry to everyday life."],
    },
    year: '114',
  },
  {
    id: "t-dorm-16",
    type: "dorm",
    dept: { zh: "法文系", en: "Department of French" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我是第一次參加宿舍舉辦的活動，上學期看到的時候因為剛好時間衝突到 所以沒有機會，但是這學期報名的這個第一堂課 就讓我收穫良多，這堂花藝課讓我學習到看似簡單的插花其實也是一門學問，花的高低以及插法 都會影響到最終作品的呈現，而每個人做出來的作品都不一樣，看到自己可以在短短的兩小時內做出有如大師的作品，我覺得非常的厲害，也很開心有成功報名到此次的活動，希望下次有機會都還可以在參加！"],
      en: ["This was my first residence hall activity — last semester the timing clashed, so I missed out — but this semester's first session gave me so much. The floral class showed me that arranging flowers, simple as it looks, is a real craft: the heights and the way you place each stem shape the final piece, and everyone's work turned out different. Seeing myself make something that looked like a master's work in just two hours felt amazing, and I'm so glad I got a place. I hope to join again next time!"],
    },
    year: '114',
  },
  {
    id: "t-dorm-17",
    type: "dorm",
    dept: { zh: "地科系", en: "Department of Earth Sciences" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得這次的活動我很喜歡，每次只要有舉辦手作的活動都讓我們收穫滿滿。尤其是今天的老師是花藝相關的，平常如果要去上外面的花藝課堂可能除了需要高昂的花費而且時間上也不方便。今天的老師除了很溫柔，而且都會用教導的方式教我們如何完成這個作品，之後有機會一定又會運用今天所學的花藝來做更多作品。看到作品後真的覺得很有成就感，而且收穫滿滿"],
      en: ["I really enjoyed this activity — hands-on sessions always leave us with so much. Today's teacher works in floristry; taking a floristry class outside would usually be expensive and hard to fit in. She was very gentle and taught us step by step how to complete the piece, and I'll definitely use what I learned to make more arrangements. Seeing the finished work was so satisfying."],
    },
    year: '114',
  },
  {
    id: "t-dorm-18",
    type: "dorm",
    dept: { zh: "應地所", en: "Graduate Institute of Applied Geology" },
    grade: { zh: "博士班", en: "Doctoral student" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["這次參加活動是一次非常療癒且難忘的體驗。從挑選花材開始，我就被不同花卉的質地與色彩吸引，特別是學習如何將乾燥花、蕨類葉片與可愛的公仔進行空間配置，這不僅考驗審美，更需要極大的耐心。在製作過程中，我學會了如何使用熱熔膠固定精細的花朵，並巧妙地纏繞細燈絲，讓整個相框在亮燈後呈現出夢幻的氛圍。看到成品完成的那一刻，心中充滿了成就感，這不僅是一件裝飾品，更是自我情感的抒發"],
      en: ["This was a deeply soothing and memorable experience. From choosing the materials I was drawn to the textures and colours of different flowers, and learning to arrange dried flowers, fern leaves and little figurines in the space took both an eye for design and a great deal of patience. I learned to fix delicate flowers with a hot glue gun and to wind fine fairy lights through the piece, so the whole frame glows dreamily when lit. When it was finished I felt a real sense of achievement — it is not just a decoration, but an expression of my own feelings."],
    },
    year: '114',
  },
  {
    id: "t-dorm-19",
    type: "dorm",
    dept: { zh: "資管系", en: "Department of Information Management" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["透過這次活動，我對原住民文化有更深入的了解，也開始反思這些文化是否正逐漸消失。很感謝老師的用心，讓這些珍貴文化得以被保存並分享給大家。最後的音樂表演非常精彩，讓人印象深刻，也讓我更感受到原住民文化的魅力。相信這場演講能讓更多人關注並支持原住民文化的傳承。"],
      en: ["Through this event I came to understand Indigenous cultures more deeply, and began to wonder whether they are gradually disappearing. I'm grateful to the speaker for their care in preserving these precious cultures and sharing them with us. The musical performance at the end was superb and made the charm of Indigenous culture all the more vivid. I believe this talk will lead more people to notice and support the passing on of Indigenous culture."],
    },
    year: '114',
  },
  {
    id: "t-dorm-20",
    type: "dorm",
    dept: { zh: "機械系", en: "Department of Mechanical Engineering" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得手紋很漂亮，透過這次講座更了解到手紋的意義還有禁忌，還有各種圖騰傳達的語言。我也很認同老師說的她對文化和藝術的定義，這次講座就像是她所說的文化的碰撞，相信我們同一片土地上的人們都能夠互相理解各自的文化，每個文化都很美麗"],
      en: ["The hand tattoos are beautiful. This talk helped me understand their meanings and taboos, and the language carried by different motifs. I also agreed with the speaker's definition of culture and art — the talk itself was, as she put it, a meeting of cultures. I believe people sharing the same land can come to understand one another's cultures, and that every culture is beautiful."],
    },
    year: '114',
  },
  {
    id: "t-dorm-21",
    type: "dorm",
    dept: { zh: "法文系", en: "Department of French" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["老師的講座非常幽默，對於情緒的講解也用了許多簡單易懂的方式告訴我們，原本就對於情緒比較敏感的我，其實很多時候對於許多人的微小情緒都很敏感，這次講座讓我更深刻理解到我應該如何面對這樣的情緒，非常喜歡這次的講座，希望以後可以有更多的機會或是這樣的活動"],
      en: ["The speaker was very funny, and explained emotions in many simple, easy-to-grasp ways. I've always been quite sensitive to emotions, including other people's small shifts in mood, and this talk helped me understand much better how to deal with those feelings. I loved it and hope there will be more opportunities and events like this."],
    },
    year: '114',
  },
  {
    id: "t-dorm-22",
    type: "dorm",
    dept: { zh: "光電系", en: "Department of Optics and Photonics" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得今天的講座很特別，性這件事平常對我來說是一件比較私密的事情，但今天卻可以這樣大方地拿出來討論，也讓大家更了解身體界線是一件很重要的事。而且最後的bingo很好玩很有趣！希望有機會也可以聽到老師參與玫瑰少年作詞的經驗～"],
      en: ["I found today's talk really unusual. Sex has always felt like a private matter to me, but today we could discuss it openly, and everyone came away understanding how important personal boundaries are. The bingo at the end was great fun! I hope some time I get to hear about the speaker's experience writing the lyrics for \"Rose Boy\"."],
    },
    year: '114',
  },
  {
    id: "t-dorm-23",
    type: "dorm",
    dept: { zh: "財金系", en: "Department of Finance" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["今天參加了 Wishlite 韻手作 的工作坊，真的被驚艷到了！沒想到原本灰灰土土的『回收牡蠣殼』，經過處理後竟然能變身成質感這麼好的擴香石。", "這次活動讓我對海洋教育有了全新的認識。比起死板板的課本知識，透過手作體驗，我更深刻體會到『廢棄物再生』的美感與無限可能。這種將永續理念融入日常美學的方式，讓守護海洋不再只是口號，而是一個優雅的生活態度。看著親手完成的作品，聞著淡淡的香氣，心靈也被療癒了，非常有意義！"],
      en: ["Today I joined a Wishlite workshop and was genuinely amazed! I'd never have guessed that dull grey recycled oyster shells could be processed into such high-quality diffuser stones.", "The event gave me a whole new understanding of ocean education. Far more than dry textbook knowledge, making something by hand let me feel the beauty and endless possibilities of turning waste into something new. Bringing sustainability into everyday aesthetics makes protecting the ocean not just a slogan but an elegant way of living. Looking at the piece I made and catching its faint scent was soothing — a truly meaningful afternoon!"],
    },
    year: '114',
  },
  {
    id: "t-dorm-24",
    type: "dorm",
    dept: { zh: "化學系", en: "Department of Chemistry" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["第一次參加這個活動，那時候是在服務櫃台看到這個活動覺得蠻酷的所以參加，結果比我想像的還要好玩，我覺得光那個粉末是牡蠣殼粉末就好酷，我覺得整體的理念也很棒，就能知道說我們做這個不僅可以有很漂亮很香環保的擴香石，還可以降低碳排，給團隊一個大掌聲，我覺得這個環保的理念真的很棒，也很謝謝團隊願意來學校辦這種活動"],
      en: ["It was my first time at this activity — I saw it at the service desk, thought it looked pretty cool and signed up — and it was even more fun than I expected. Just the fact that the powder is ground oyster shell is so cool, and I love the whole idea: we get pretty, fragrant, eco-friendly diffuser stones and cut carbon emissions too. A big round of applause for the team — the environmental idea is great, and thank you for coming to run this at our university."],
    },
    year: '114',
  },
  {
    id: "t-dorm-25",
    type: "dorm",
    dept: { zh: "地科系", en: "Department of Earth Sciences" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["一直以來我都非常喜歡參加學校的宿舍導師講座，尤其是最近有很多手作類的講座。可以在課餘時間做一些手作滿療育的，作為放鬆心情的轉換很不錯。以前也有參加插花跟上學期的石筆海膽吊飾講座，我都非常喜歡，而且作品還能拿回去"],
      en: ["I've always loved the residence hall mentor talks, especially the recent hands-on ones. Making something in my free time is really soothing and a nice way to switch off. I've also been to the flower-arranging session and last semester's sea urchin pendant workshop and loved them both — and you get to take your work home."],
    },
    year: '114',
  },
  {
    id: "t-dorm-26",
    type: "dorm",
    dept: { zh: "資電系", en: "Bachelor's Program in Information and Electrical Engineering" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["這次的獨旅講座讓我印象最深的是，它並不是單純在介紹「去哪裡玩」或「怎麼排行程」，而是讓我重新思考獨自旅行背後的意義。很多時候我們會把旅行想像成要和朋友、家人一起分享才完整，但講座讓我發現，一個人旅行其實也可以是一種很珍貴的自我整理過程"],
      en: ["What struck me most about this talk on solo travel was that it wasn't simply about where to go or how to plan an itinerary; it made me rethink what travelling alone actually means. We often imagine a trip is only complete when shared with friends or family, but the talk showed me that travelling on your own can be a precious way of sorting yourself out."],
    },
    year: '114',
  },
  {
    id: "t-dorm-27",
    type: "dorm",
    dept: { zh: "機械系", en: "Department of Mechanical Engineering" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["看到講師對抗人生中重大困難的心路歷程，還可以勇敢樂觀的走出來真的很不容易，同時也透過這場演講讓我看到人生中各種不同可能性，希望透過講師的故事可以鼓勵到更多身處困境的人，給更多人一些力量。謝謝這次舉辦的演講。"],
      en: ["Hearing how the speaker fought through major hardships in life and still came out brave and optimistic was deeply moving, and the talk showed me how many different possibilities life holds. I hope the speaker's story encourages more people facing difficulties and gives them strength. Thank you for holding this talk."],
    },
    year: '114',
  },
  {
    id: "t-dorm-28",
    type: "dorm",
    dept: { zh: "中文系", en: "Department of Chinese Literature" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["在今天的演講中，我覺得講者在講述自己17歲脊椎受傷及之後洗腎的經歷顯示了他人生的曲折和遇到重重的困難，但是他卻沒有放棄，反而分享了他樂觀看待這一切的豁達心境，也呼籲我們挑戰自己認為不可能的事，並且不要輕易放棄、結束自己的生命，帶給我滿滿的正面能量。"],
      en: ["In today's talk the speaker described injuring his spine at 17 and later going on dialysis — a life full of twists and hardship. Yet he never gave up; instead he shared the open, optimistic outlook with which he views it all, and urged us to take on things we believe impossible, and not to give up easily or end our own lives. It filled me with positive energy."],
    },
    year: '114',
  },
  {
    id: "t-dorm-29",
    type: "dorm",
    dept: { zh: "資工系", en: "Department of Computer Science and Information Engineering" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["我覺得今天的講座對於放鬆身心非常有幫助。毛線球的做法並沒有規定的形式，因此不用怕做錯或進度跟不上，更讓我能專注在自己的作品上，所以我非常喜歡本次講座。"],
      en: ["Today's talk was really helpful for relaxing body and mind. There's no set way to make a yarn ball, so there's no fear of doing it wrong or falling behind, which let me focus on my own piece. I loved this session."],
    },
    year: '114',
  },
  {
    id: "t-dorm-30",
    type: "dorm",
    dept: { zh: "資工系", en: "Department of Computer Science and Information Engineering" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["認識到了自己的情緒以及識別情緒的重要性，透過製作纏繞毛線球，除了學習到如何製作毛線球這個手作小物，聽完前面的介紹再做毛線球，在製作時更能了解自己的感受。謝謝講師這次的分享，也謝謝學校對於各場宿舍講座豐富的活動安排。"],
      en: ["I came to recognise my own emotions and why identifying them matters. Making a wrapped yarn ball taught me a small craft, and doing it after the introduction helped me understand my feelings as I worked. Thank you to the speaker for sharing, and to the university for arranging such a rich programme of residence hall talks."],
    },
    year: '114',
  },
  {
    id: "t-career-01",
    type: "career",
    dept: { zh: "中文系", en: "Department of Chinese Literature" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["體會到職涯沒有標準模板，轉向也是一種勇敢。"],
      en: ["I came to see that a career has no standard template, and that changing direction is also a kind of courage."],
    },
    year: '114',
  },
  {
    id: "t-career-02",
    type: "career",
    dept: { zh: "中文系", en: "Department of Chinese Literature" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["了解在地故事的轉譯力量，打開對影視的想像。"],
      en: ["I learned how local stories can be carried into new forms, and it opened up what I imagine film and television can be."],
    },
    year: '114',
  },
  {
    id: "t-career-03",
    type: "career",
    dept: { zh: "中文系", en: "Department of Chinese Literature" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["認識非典型勞動權益，更有勇氣面對職場挑戰。"],
      en: ["Learning about rights in non-standard employment gave me more courage to face the challenges of the workplace."],
    },
    year: '114',
  },
  {
    id: "t-career-04",
    type: "career",
    dept: { zh: "亞際文化研究國際碩士學位學程", en: "International Master's Program in Inter-Asia Cultural Studies" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["謝謝老師舉辦跨領域的交流，讓異鄉求學的我更有方向感。"],
      en: ["Thank you for organising these cross-disciplinary exchanges — studying far from home, they gave me a clearer sense of direction."],
    },
    year: '114',
  },
  {
    id: "t-career-05",
    type: "career",
    dept: { zh: "遙測科技碩士學位學程", en: "Master's Program in Remote Sensing Science and Technology" },
    grade: { zh: "碩一", en: "Master's, first year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["學長分享暑期海外實習的體驗，讓我很心動"],
      en: ["A senior student's account of a summer internship abroad really got me excited."],
    },
    year: '114',
  },
  {
    id: "t-career-06",
    type: "career",
    dept: { zh: "光電科學與工程學系", en: "Department of Optics and Photonics" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["留學交流會能與學長姐交換資訊，幫助很大。"],
      en: ["The study-abroad exchange let me trade information with senior students, which helped a great deal."],
    },
    year: '114',
  },
  {
    id: "t-career-07",
    type: "career",
    dept: { zh: "電機工程學系", en: "Department of Electrical Engineering" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["一對一諮詢緩解了我的焦慮，清楚未來定位。"],
      en: ["One-to-one counselling eased my anxiety and helped me see where I'm heading."],
    },
    year: '114',
  },
  {
    id: "t-service-01",
    type: "service",
    dept: { zh: "資工系", en: "Department of Computer Science and Information Engineering" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["在導師的悉心引導下，我們將專業程式力轉化為具體的社會回饋，走出螢幕、籌辦面向中小學生的「Python 程式營隊」，體驗到熟悉程式知識並傳授給學員的成就感。更透過 Instagram 社群製作「Python 冷知識」圖文，並在協作中熟練了 GitHub 與 HackMD 等開發協作工具。這門課不僅學到許多專業知識，更在團隊分工與環境維護中，加深了我們身為未來工程師的溝通力與社會責任感。"],
      en: ["Under our mentor's careful guidance we turned our programming skills into something that gives back to society. We stepped away from our screens to run a \"Python Coding Camp\" for primary and secondary school students, and felt the satisfaction of mastering programming knowledge and passing it on. We also created \"Python fun facts\" posts on Instagram, and became fluent with collaboration tools such as GitHub and HackMD. The course not only taught us a great deal, but through sharing out the teamwork and maintaining our environments, deepened our communication skills and sense of social responsibility as future engineers."],
    },
    year: '114',
  },
  {
    id: "t-service-02",
    type: "service",
    dept: { zh: "客家系", en: "Department of Hakka Language and Social Sciences" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["老師規劃讓我們與「陽光基金會」合作推動「臉部平權」倡議企劃，面對緊湊的籌備時程與跨單位的嚴謹要求，坦白說過程充滿挑戰且承擔了不少壓力。但也正是在密集的溝通與分工磨合中，我們學會了如何調配心力、面對突發狀況，並妥善處理與校外非營利組織的合作細節。這門課以高強度的實踐歷程，不僅讓我們深刻認識到臉部平權的重要性，更體會到推動公共議題所需的專業與耐心，是一段歷經磨練後「先苦後甘」的紮實學習。"],
      en: ["Our mentor arranged for us to work with the Sunshine Social Welfare Foundation on an advocacy project for facial equality. With a tight preparation schedule and the exacting demands of working across organisations, the process was honestly full of challenges and pressure. But it was precisely through intensive communication and learning to share the work that we learned to pace ourselves, handle the unexpected, and manage the details of collaborating with an outside non-profit. This demanding, hands-on course showed us why facial equality matters, and how much expertise and patience it takes to advance a public issue — solid learning that was hard going first and rewarding after."],
    },
    year: '114',
  },
  {
    id: "t-service-03",
    type: "service",
    dept: { zh: "社會參與之導航與探索", en: "Course: Navigating and Exploring Social Participation" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["老師規劃食農教育、新住民等多元公共議題讓我們探討，可以在小組工作中學到很多人際公關處理和團隊管理的技能，同時也深入了解母語教育在台灣的現況。從自身科系專業領域學習在延伸跨域學習，不僅加強我的科系專業，也增進我的人際溝通和團隊合作能力。老師也讓我們有機會規劃一個科學營隊，學習籌備符合國小同學的教案，更能滿足服務對象的需求。"],
      en: ["Our mentor set out a range of public issues for us to explore, including food and agricultural education and new immigrants. Working in groups taught me a lot about handling relationships and managing a team, and I also gained a deeper understanding of the state of mother-tongue education in Taiwan. Extending from my own field into cross-disciplinary learning strengthened my major and improved my communication and teamwork. We even had the chance to plan a science camp, learning to prepare lesson plans suited to primary school pupils so as to better meet the needs of those we serve."],
    },
    year: '114',
  },
  {
    id: "t-service-04",
    type: "service",
    dept: { zh: "偏鄉學校科學教案之發想、設計、規劃與執行(一)", en: "Course: Designing and Delivering Science Lessons for Rural Schools (I)" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["在導師循序漸進的指導下，我們從小組討論、編寫實驗到自製教案，親自前往偏鄉國小帶領學童動手做科學，在孩子們專注發光的眼神中體會到教學相長的感動。老師安排專業的教案準備訓練課程，也不時和我們小組討論進度。課程更安排了令人深思的「藻礁保育與珊瑚白化」講座及生態場域參訪，大幅拓寬了我們的視野。整學年的投入不僅增進了教案規劃與跨組溝通能力，更讓我們找回生科人守護生態的熱情初衷。"],
      en: ["With our mentor's step-by-step guidance, we went from group discussions and writing experiments to making our own lesson plans, then travelled to rural primary schools to lead children in hands-on science — and in their bright, focused faces we felt how teaching and learning grow together. Our mentor arranged professional training in lesson preparation and regularly checked our progress with each group. The course also included a thought-provoking talk on algal reef conservation and coral bleaching, and field visits to ecological sites, which greatly broadened our horizons. A full year's commitment not only improved our lesson planning and communication across groups, but brought back the passion that first drew us, as life sciences students, to protecting the natural world."],
    },
    year: '114',
  },
  {
    id: "t-service-05",
    type: "service",
    dept: { zh: "文學院學士班", en: "Bachelor's Program, College of Liberal Arts" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "O同學", en: "Anonymous" },
    content: {
      zh: ["老師的安排比我想像中還要有挑戰，在大家習慣用手機打字、隔著螢幕交流的時代，老師帶我們跨出校園做田野調查，面對面去傾聽陌生人與小眾職人的生命歷程與喜怒哀樂。雖然假日要到處約訪、拍紀錄片，還要從小組討論中一點一滴把展覽生出來，過程真的花了很多心力、超級累，但當最後看見大家的訪談成果在展場完整呈現時，那種自我實現的成就感真的無可取代。謝謝老師帶我們看見社會角落真實的溫度，這是一段很難忘的成長回憶！"],
      en: ["The course was more challenging than I expected. In an age when we're used to typing on our phones and talking through screens, our mentor took us off campus to do fieldwork, listening face to face to the life stories, joys and sorrows of strangers and niche craftspeople. We spent weekends arranging interviews and filming a documentary, and built an exhibition bit by bit out of group discussions — it took a huge amount of effort and was exhausting. But when we finally saw everyone's interviews presented in full at the exhibition, the sense of fulfilment was irreplaceable. Thank you for showing us the real warmth in society's quiet corners; it's a growing experience I won't forget."],
    },
    year: '114',
  },
  {
    id: "t-club-01",
    type: "club",
    dept: { zh: "中文系", en: "Department of Chinese Literature" },
    grade: { zh: "二、三年級", en: "Second and third year" },
    name: { zh: "系學會同學", en: "Student association members" },
    content: {
      zh: ["系學會活動指導老師均知情並會適時給予建議。經常會詳細的討論活動企劃，有活動辦理上的相關問題，老師會給予我們歷屆經驗及主動提供支援和討論管道。"],
      en: ["Our faculty adviser knows about all of the association's activities and offers suggestions at the right moments. We often go through our event plans in detail together, and whenever questions come up in running an event, she shares the experience of previous years and actively offers support and ways to talk things through."],
    },
    year: '114',
  },
  {
    id: "t-club-02",
    type: "club",
    dept: { zh: "大氣系", en: "Department of Atmospheric Sciences" },
    grade: { zh: "二、三年級", en: "Second and third year" },
    name: { zh: "系學會同學", en: "Student association members" },
    content: {
      zh: ["系學會活動指導老師均知情並會適時給予建議。當活動較具風險性時，老師會詳細與我們討論；老師會主動與我們溝通活動內容和經費，並提供協助，很支持我們辦各種類型的活動。"],
      en: ["Our faculty adviser knows about all of the association's activities and offers suggestions at the right moments. When an event carries more risk, the adviser talks it through with us in detail; the adviser also reaches out to discuss event content and budgets, offers help, and strongly supports us in running all kinds of activities."],
    },
    year: '114',
  },
  {
    id: "t-sports-01",
    type: "sports",
    dept: { zh: "教學評量回饋", en: "Course evaluation feedback" },
    grade: { zh: "二、三、四年級", en: "Second, third and fourth year" },
    name: { zh: "修課同學", en: "Students enrolled in the course" },
    content: {
      zh: ["老師真的很用心，天氣超熱還下來跟我們一起跑，然後都會叮囑小心樹根、地滑，連像我原本就知道這項運動能學到很多，老師分享的相關故事也很有趣讓人印象深刻，能代表台灣比賽更讓我驚艷。老師教得非常好，如果有機會的話，會再次選老師的課。老師教課認真耐心，時常鼓勵同學並進行動作指導。"],
      en: ["Our teacher really puts himself into it — even in blazing heat he came down and ran with us, always reminding us to watch out for tree roots and slippery ground. I already knew there was a lot to learn in this sport, and the stories he shared stayed with me; that he has represented Taiwan in competition amazed me. He teaches very well, and I would take his class again given the chance. He is serious and patient, always encouraging us and correcting our form."],
    },
    year: '114',
  },
  {
    id: "t-sports-02",
    type: "sports",
    dept: { zh: "機械工程學系", en: "Department of Mechanical Engineering" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "洪同學", en: "Hung" },
    content: {
      zh: ["在舞蹈校隊的這段時間裡，老師一直是很重要的存在。除了舞蹈技巧的教導，老師也會陪著我們一起面對每一次練習和比賽。練習的過程中難免會遇到做不好的時候，有時候大家的狀態不好，或是一直達不到老師期待的效果，氣氛也會變得比較低落。但老師不會只是責備我們，而是會耐心地告訴我們問題在哪裡，再陪著我們慢慢調整。我也常常協助老師帶著大家練習，這讓我更能感受到老師平常帶領一個團隊的辛苦。很多事情看起來簡單，但真正做起來才發現需要很多耐心，而老師總是願意花時間陪我們把每個細節做好。", "在這段過程中，我也慢慢發現，舞蹈帶給我的不只是站上舞台的成就感。從平常一次次的練習，到最後一起完成比賽，我學會了如何和隊友溝通，也學會在自己累的時候，還是要為團隊多想一點。身為隊長，我不一定每次都能把事情做得很好，但老師總是願意給我機會去嘗試，也會在我不知道該怎麼處理的時候給我建議。現在回頭看，我覺得自己真正得到的，是一群可以一起努力的夥伴，以及一段很珍貴的回憶。謝謝老師一路上的陪伴和信任，讓我不只是學會跳舞，也在這個過程中慢慢成為一個更有責任感、更願意為團隊付出的人。"],
      en: ["Through my time on the dance team our teacher has been a constant presence. Beyond teaching technique, she has stood with us through every practice and every competition. There are inevitably times in rehearsal when things don't go well — when everyone is off form, or we keep falling short of what she is looking for, and the mood drops. But she never simply scolds us. She patiently shows us where the problem lies, then works through it with us. I often help her lead the team's practice too, which lets me feel how hard it is to lead a team day in, day out. Many things look simple, but only when you actually do them do you find how much patience they take — and she is always willing to spend the time getting every detail right with us.", "Somewhere along the way I realised that what dance gives me is not only the thrill of being on stage. From one rehearsal after another to finishing a competition together, I learned how to talk to my teammates, and learned that even when I'm exhausted I should still think of the team. As captain I don't always handle things well, but she always gives me the chance to try, and offers advice when I don't know what to do. Looking back, what I've really gained is a group of people to work hard alongside, and a precious memory. Thank you for staying with us and trusting us — you taught me more than how to dance; over that time I slowly became someone more responsible, more willing to give to the team."],
    },
    year: '114',
  },
  {
    id: "t-sports-03",
    type: "sports",
    dept: { zh: "文學院", en: "College of Liberal Arts" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "丘同學", en: "Chiu" },
    content: {
      zh: ["在得知學校有現代舞校隊後，因為之前並沒有舞蹈基礎，所以原本只打算在練習時間旁聽，盡量跟著跳。後來能加入舞蹈校隊算是在我的意料之外，也是我覺得非常幸運的一件事。", "一開始跟練的時候感覺老師的節奏非常快，一套動作還未熟悉便已經到下一套動作了，不過那時以較為輕鬆的態度去學習，所以還是感受到舞蹈的魅力與有趣佔滿了心情。帶著這份心情與熱愛，使我在校隊裡一待便是兩年，而至後來，從認真跟著動到慢慢嘗試理解動作，思考肢體的發力方式與一些抽象的動態想像，能幫助我更好的理解動作，有別於單純的模仿肢體擺放位置，我才更踏實的感受到自己的進步。這源於老師會用各種不同的辦法讓學生理解動作，包含引導空間延伸的想像、講解肢體發力源頭與末梢的連帶關係、呼吸與音樂律動的緊密聯繫等等。此外，在老師與學生們更加熟悉後，老師也會依學生不同的身體狀態與不同的舞蹈經驗，調整交授的內容，讓學生能朝著自己的目標進步。透過這樣的指導與學習環境，若能認真的對待每一次的練習，自發的吸收話語與示範中的養分，能學習到遠不止於舞蹈的許多事物。"],
      en: ["When I heard the university had a modern dance team, I had no background in dance at all, so I only meant to sit in on rehearsals and follow along as best I could. Being taken onto the team was not something I expected, and I count it a piece of real luck.", "At first the pace felt very fast — we would move on to the next sequence before I had the last one — but I approached it in a relaxed way, so the charm and fun of dance still filled me. Carrying that feeling and love, I stayed on the team for two years. Over time I went from simply following the movements to trying to understand them — thinking about where the power comes from in the body and holding certain abstract images of motion in mind — and, unlike merely copying where the limbs go, that let me feel my own progress on solid ground. It comes from the many ways our teacher finds to make a movement make sense: guiding us to imagine extension through space, explaining how the source of a movement connects to its extremities, showing how breath ties into the rhythm of the music. And as she got to know us, she adjusted what she taught to each student's body and experience, so each of us could progress towards our own goals. In this kind of teaching and environment, if you take every rehearsal seriously and absorb what her words and demonstrations offer, you learn far more than dance."],
    },
    year: '114',
  },
  {
    id: "t-sports-04",
    type: "sports",
    dept: { zh: "企業管理學系", en: "Department of Business Administration" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "蔡同學", en: "Tsai" },
    content: {
      zh: ["加入舞蹈隊後，我覺得自己不只是多了一個跳舞的地方，也多了一群可以一起為同一個目標努力的夥伴。平常上課主要是現代，從基本的動作、身體控制，到音樂的表達，都需要花很多時間練習。現代舞不像只是把動作跳完而已，而是要思考每一個動作想傳達什麼，所以在練習的過程中，我也慢慢學會用身體表達。", "比賽對我來說最大的不同是，比起平常練習，比賽更需要大家一起配合。每個人的動作、力道和情緒都要盡量一致，只要其中一個地方沒有做好，就可能會影響整個畫面。所以比賽前的練習通常都會比較密集，大家也會一直互相提醒、調整。雖然準備比賽的過程真的蠻累的，但一起從一開始慢慢練到最後站上舞台，還是會有一種「我們真的做到了」的感覺。", "我覺得舞蹈隊對我來說，最大的意義就是讓我在大學生活裡還能繼續做自己喜歡的事情。除了跳舞本身，也認識了很多一起練舞、一起比賽的人。"],
      en: ["Joining the dance team gave me more than somewhere to dance; it gave me a group of people working towards the same thing. Our regular classes are mainly modern dance, and everything from basic movement and body control to musical expression takes a lot of practice. Modern dance is not a matter of getting through the movements — you have to think about what each one is meant to say, so over the course of rehearsing I slowly learned to speak with my body.", "What makes competition different for me is that, far more than ordinary practice, it needs everyone working together. Each person's movement, force and emotion has to be as unified as possible; if one part isn't right, it can affect the whole picture. So rehearsals before a competition are usually more intensive, and we keep reminding and adjusting one another. Preparing is genuinely tiring, but going from those first rehearsals all the way to standing on stage together still leaves you feeling: we actually did this.", "What the team means most to me is that it lets me keep doing something I love while I'm at university. Beyond the dancing itself, I've met so many people I rehearse and compete with."],
    },
    year: '114',
  },
  {
    id: "t-sports-05",
    type: "sports",
    dept: { zh: "大氣科學學系大氣物理研究所", en: "Graduate Institute of Atmospheric Physics, Department of Atmospheric Sciences" },
    grade: { zh: "碩士二年級", en: "Master's, second year" },
    name: { zh: "張同學", en: "Chang" },
    content: {
      zh: ["桂菱老師真的是一個超級厲害又親切的老師！每次排練之前都會有的訓練課中也會依照我們對身體哪些部分認識的不足設計動作，讓我們在訓練時會有類似的動作可以參考連貫。而且老師還會提出非常有用的建議，每次有看不懂的動作能及時詢問，老師也會再三的示範，非常細心也很有耐心，更會提醒我們在那些地方要注意不要受傷。這幾年參加舞蹈校訓練、跟著去比賽，雖然訓練完會有點累，但累積下來總是能讓我明顯感受的進步，是一個收穫滿滿快樂和成就感的地方，真的非常感謝桂菱老師的教導！"],
      en: ["Professor Chang is a wonderfully skilled and kind teacher! In the conditioning class before each rehearsal she designs movements around the parts of the body we understand least, so that during training we have related movements to refer back to. Her suggestions are genuinely useful; whenever there's a movement I can't follow I can ask on the spot, and she will demonstrate it again and again, always attentive and patient, and always reminding us where to be careful not to get hurt. Over these few years of team training and competitions, tiring as it can be, the progress has been unmistakable — it's a place full of happiness and the sense of having achieved something. Thank you so much for your teaching, Professor Chang!"],
    },
    year: '114',
  },
  {
    id: "t-sports-06",
    type: "sports",
    dept: { zh: "資電學士班", en: "Bachelor's Program in Information and Electrical Engineering" },
    grade: { zh: "大一", en: "First year" },
    name: { zh: "陳同學", en: "Chen" },
    content: {
      zh: ["參與舞蹈校隊的這段時間，我深刻地感受到老師對教學以及校隊的用心。訓練的時候，老師會考量大家的身體狀況，再慢慢增加難度，也會把希望我們學會的律動、肢體運用、動作和協調，融入暖身或一些小組合裡，讓我們在後面的舞蹈編排和練習可以更順利。", "老師在教動作時，也常常會用一些比喻或親自示範，讓我們更容易理解身體到底要怎麼動、怎麼用力。就算大家有時候做得不太好，老師也不會一直責備，而是鼓勵我們，並告訴我們可以怎麼調整。有時候老師也會故意給我們一些挑戰，例如比較困難的動作、突然加快節奏，甚至讓我們做平常不習慣的另一邊，讓我們學習真的去感受自己的身體。", "我很喜歡校隊裡大家一起練習、互相鼓勵的感覺。即使我有時因為排課沒辦法參加練習，老師也會調整時間，盡量讓大家都能跟上進度。老師也讓我感覺到校隊不只是學習跳舞的地方，也是一個讓我們一起突破自己、一起成長的團隊。"],
      en: ["In my time with the dance team I have felt keenly how much our teacher gives to her teaching and to the team. In training she takes account of how everyone's body is holding up before raising the difficulty, and folds the rhythm, movement and coordination she wants us to learn into the warm-up or short combinations, so that the choreography and rehearsal that follow go more smoothly.", "When teaching movements she often uses metaphors or demonstrates herself, making it easier to understand how the body should move and where to apply force. Even when we don't do well, she doesn't keep scolding us but encourages us and tells us how to adjust. Sometimes she deliberately sets us challenges — harder movements, a sudden change of tempo, or doing the side we're not used to — so we learn to really feel our own bodies.", "I love the feeling of everyone rehearsing together and encouraging one another. Even when my timetable keeps me from a session, she adjusts the schedule so that everyone can keep up. She has made me feel that the team is not only somewhere to learn to dance, but a group in which we push past our limits and grow together."],
    },
    year: '114',
  },
  {
    id: "t-sports-07",
    type: "sports",
    dept: { zh: "電機工程學系", en: "Department of Electrical Engineering" },
    grade: { zh: "大三", en: "Third year" },
    name: { zh: "林同學", en: "Lin" },
    content: {
      zh: ["加入校隊不久，目前還未參加過正式比賽或排練，主要參與二、四晚上的瑜伽與現代舞訓練課程，以及體育課選修的現代舞課。", "桂菱老師的現代舞與瑜伽教學很有系統，對於動作上的細節要求，例如呼吸、力量，以及特定動作需要特別感受的身體部位，都會循序漸進地指出，讓我們能逐一練習，不會一開始就因為太多要求而手忙腳亂。針對個人的不足，老師也會耐心提醒，進一步講解並親自示範。對於每個人的進步或表現優秀之處，老師也不吝給予鼓勵，讓我們更有信心。", "一開始加入校隊時，擔心會與校隊隊員相處不來，但後來發現大家都十分友善、包容，對於舞蹈或校隊相關的疑問，也都願意提醒我。老師除了在舞蹈上給予指導，也很關心大家的日常生活，整個舞蹈校隊就像一個大家庭，而我非常高興能成為其中的一分子。"],
      en: ["I joined the team only recently and haven't yet taken part in a competition or performance rehearsal; so far I attend the yoga and modern dance training on Tuesday and Thursday evenings, as well as the modern dance PE elective.", "Professor Chang teaches modern dance and yoga with real system. She points out the fine demands of a movement — the breath, the force, the part of the body you need to feel in a particular position — step by step, so we can work through them one at a time rather than being overwhelmed from the start. Where an individual falls short she gives a patient reminder, explains further, and demonstrates herself. She is also generous with encouragement whenever someone improves or does well, which gives us more confidence.", "When I first joined I worried about fitting in with the rest of the team, but everyone turned out to be friendly and welcoming, and always willing to help with questions about dance or the team. Beyond guiding our dancing, she takes a real interest in our daily lives. The whole team is like a large family, and I am very glad to be part of it."],
    },
    year: '114',
  },
  {
    id: "t-sports-08",
    type: "sports",
    dept: { zh: "工學院學士班", en: "Bachelor's Program, College of Engineering" },
    grade: { zh: "大四", en: "Fourth year" },
    name: { zh: "陳同學", en: "Chen" },
    content: {
      zh: ["桂菱老師很擅長用引導的方式教導舞蹈動作，也會關心並照顧學生的身心狀態；校隊管理適當，有規則但不會死板，訓練氣氛令人安心。在校隊中學到的不僅是舞步跟肢體技巧，還有根本使用身體的方式、對空間的探索，在訓練不密集時同時能感受自我的流動與釋放。比賽時雖然練習很勞累，花費大量時間與體力，但能跟其他舞隊成員一起比賽很充實，完成一支舞蹈也令人快樂，非常值得。"],
      en: ["Professor Chang is skilled at teaching movement by drawing it out of you, and she looks after her students' physical and mental state. The team is well run — there are rules, but nothing rigid, and the atmosphere in training puts you at ease. What you learn is not only steps and technique but a fundamental way of using the body and of exploring space; in the lighter periods of training you can feel yourself moving and letting go. Competition season is exhausting and takes a great deal of time and energy, but competing alongside the rest of the team is deeply satisfying, and finishing a piece is a joy. It is thoroughly worth it."],
    },
    year: '114',
  },]

/** 實際可顯示的回饋（排除佔位資料） */
export const publishedTestimonials = testimonials.filter((t) => !t.placeholder)

/** 尚未收到回饋的導師類別 */
export const testimonialGaps = (['dorm', 'career', 'service', 'club', 'sports'] as MentorTypeId[]).filter(
  (id) => !publishedTestimonials.some((t) => t.type === id),
)
