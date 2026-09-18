<script setup lang="ts">
import { site } from '~/data/site'
import { mentorTypes } from '~/data/mentorTypes'
import { outstanding } from '~/data/outstanding'
import { publishedTestimonials } from '~/data/testimonials'
import { books } from '~/data/books'
import { photos } from '~/data/gallery'
import { resultsYear } from '~/data/results'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()
const localePath = useLocalePath()

// 首頁標題直接用站名，不套 titleTemplate
useHead({ title: null, titleTemplate: () => t('site.name') })

const featuredMentors = computed(() => outstanding.filter((m) => m.photo).slice(0, 8))
/**
 * 首頁心得橫向列：各類別輪流挑，避免連續好幾則都是同一類。
 * 只挑內文夠長（≥ 80 字）的，一句話的短評放在大卡片裡會顯得空；最多 12 則。
 */
const QUOTE_MAX = 12
const featuredQuotes = computed(() => {
  const pools = ['service', 'dorm', 'sports', 'career', 'club'].map((type) =>
    publishedTestimonials.filter((q) => q.type === type && q.content.zh.join('').length >= 80),
  )
  const picked: typeof publishedTestimonials = []
  for (let round = 0; picked.length < QUOTE_MAX; round++) {
    const batch = pools.map((p) => p[round]).filter((q) => q !== undefined)
    if (!batch.length) break
    picked.push(...batch.slice(0, QUOTE_MAX - picked.length))
  }
  return picked
})
const featuredPhotos = computed(() => photos.filter((p) => p.date).slice(0, 6))
const featuredBooks = computed(() => books.slice(0, 3))
const year = computed(() => tc(resultsYear))
</script>

<template>
  <div class="page">
    <!-- ===== Hero ===== -->
    <section class="hero">
      <div class="wrap hero__inner">
        <div class="hero__text">
          <h1 class="hero__title">
            <span class="hero__org">{{ t('site.org') }}</span>
            {{ tc(site.heroTitle) }}
          </h1>
          <p class="hero__lead">{{ tc(site.heroLead) }}</p>
          <NuxtLink :to="localePath('/about')" class="btn btn--solid">
            {{ t('home.heroCta') }} <AppIcon name="arrow" :size="13" class="btn__arrow" />
          </NuxtLink>
        </div>
        <!-- 主視覺：一大兩小的固定拼貼（不做輪播，避免自動播放的無障礙問題）。
             大圖描述校園氛圍；兩張小圖是同性質的補充畫面，視為裝飾。 -->
        <div class="hero__media">
          <img
            src="/images/mainpage/hero-1.jpg"
            :alt="t('home.heroAlt')"
            class="hero__img hero__img--main"
            width="1367"
            height="911"
            fetchpriority="high"
          />
          <img
            src="/images/mainpage/hero-2.jpg"
            alt=""
            class="hero__img hero__img--sub"
            width="1367"
            height="911"
          />
          <img
            src="/images/mainpage/hero-3.jpg"
            alt=""
            class="hero__img hero__img--sub"
            width="1367"
            height="911"
          />
        </div>
      </div>
    </section>

    <!-- ===== 五大專項導師 ===== -->
    <section class="section section--white">
      <div class="wrap">
        <SectionHeading :title="t('home.typesTitle')" :sub="t('home.typesSub')" />
        <ul class="grid-5">
          <li v-for="m in mentorTypes" :key="m.id"><MentorTypeCard :type="m" compact /></li>
        </ul>
        <div class="sec-more">
          <NuxtLink :to="localePath('/mentors')" class="btn btn--ghost">
            {{ t('home.typesMore') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== 年度成果亮點 ===== -->
    <section class="section section--tint">
      <div class="wrap">
        <SectionHeading
          :title="t('home.resultsTitle')"
          :sub="t('home.resultsSub', { year })"
        />
        <ul class="stats">
          <li class="stats__label">
            <strong>{{ year }}</strong>
            <span>{{ t('home.resultsLabel') }}</span>
          </li>
          <li
            v-for="m in mentorTypes"
            :key="m.id"
            class="stats__item card"
            :style="{ '--accent': m.color }"
          >
            <span class="stats__icon"><AppIcon :name="m.icon" :size="21" /></span>
            <span class="stats__value">
              {{ m.highlight.value }}<em>{{ tc(m.highlight.unit) }}</em>
            </span>
            <span class="stats__cap">{{ tc(m.highlight.label) }}</span>
          </li>
        </ul>
        <div class="sec-more">
          <NuxtLink :to="localePath('/results')" class="btn btn--ghost">
            {{ t('home.resultsMore') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== 學生心得回饋 ===== -->
    <section class="section section--white">
      <div class="wrap">
        <SectionHeading :title="t('home.voicesTitle')" :sub="t('home.voicesSub')" />
      </div>
      <div class="qwide">
        <QuoteCarousel :items="featuredQuotes" />
      </div>
      <div class="wrap">
        <div class="sec-more">
          <NuxtLink :to="localePath('/voices')" class="btn btn--ghost">
            {{ t('home.voicesMore') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== 傑出導師分享 ===== -->
    <section class="section section--tint">
      <div class="wrap">
        <SectionHeading
          :title="t('home.outstandingTitle')"
          :sub="t('home.outstandingSub', { year })"
        />
        <ul class="grid-4">
          <li v-for="m in featuredMentors" :key="m.id"><MentorCard :mentor="m" /></li>
        </ul>
        <div class="sec-more">
          <p class="ai-note">{{ t('home.photoAiNote') }}</p>
          <NuxtLink :to="localePath('/outstanding')" class="btn btn--ghost">
            {{ t('home.outstandingMore') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== 花絮 + 繪本 ===== -->
    <section class="section section--white">
      <div class="wrap duo">
        <div class="duo__col">
          <SectionHeading :title="t('home.galleryTitle')" />
          <ul class="mini">
            <li v-for="p in featuredPhotos" :key="p.id">
              <NuxtLink
                :to="localePath('/gallery') + `#${p.type}`"
                :aria-label="`${t('home.galleryTitle')}：${tc(p.title)}`"
              >
                <!-- 連結本身已具名，且下方有可見標題，此處圖片視為裝飾 -->
                <img :src="p.src" alt="" loading="lazy" />
                <span>{{ tc(p.title) }}</span>
              </NuxtLink>
            </li>
          </ul>
          <div class="sec-more">
            <NuxtLink :to="localePath('/gallery')" class="btn btn--ghost">
              {{ t('home.galleryMore') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
            </NuxtLink>
          </div>
        </div>

        <div class="duo__col">
          <SectionHeading :title="t('home.booksTitle')" />
          <ul class="mini mini--book">
            <li v-for="b in featuredBooks" :key="b.year">
              <NuxtLink
                :to="localePath('/books')"
                :aria-label="`${t('home.booksTitle')}：${b.year} ${tc(b.title)}`"
              >
                <!-- 連結已具名、下方也有可見書名，此處圖片視為裝飾 -->
                <img v-if="b.cover" :src="b.cover" alt="" class="mini__cover" loading="lazy" />
                <PlaceholderBox
                  v-else
                  ratio="4 / 3"
                  icon="book"
                  :label="t('common.coverPending')"
                  decorative
                />
                <span>{{ b.year }}　{{ tc(b.title) }}</span>
              </NuxtLink>
            </li>
          </ul>
          <div class="sec-more">
            <NuxtLink :to="localePath('/books')" class="btn btn--ghost">
              {{ t('home.booksMore') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero {
  background: linear-gradient(160deg, #f3efe6 0%, #eef4f4 55%, #e7f0f2 100%);
  border-bottom: 1px solid var(--line);
}
.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
  gap: 44px;
  align-items: center;
  padding-block: 62px 66px;
}
.hero__org {
  display: block;
  margin-bottom: 10px;
  font-family: var(--sans);
  font-size: clamp(15px, 1.6vw, 18px);
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--navy-600);
  white-space: normal;
}
.hero__title {
  font-family: var(--serif);
  font-size: clamp(32px, 4.8vw, 52px);
  color: var(--navy-800);
  line-height: 1.28;
  letter-spacing: 0.01em;
  /* 標題斷行由資料檔的換行字元決定，中英文斷行位置不同 */
  white-space: pre-line;
}
.hero__lead {
  margin: 22px 0 30px;
  font-size: 16.5px;
  line-height: 2.05;
  color: var(--ink-2);
  max-width: 34em;
}

/* 主視覺拼貼 */
.hero__media {
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr);
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 12px;
  aspect-ratio: 4 / 3;
}
.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
.hero__img--main { grid-row: 1 / -1; object-position: 58% center; }
.hero__img--sub { border-radius: var(--radius); }

/* 心得輪播：比內文寬，兩側卡片才放得下 */
.qwide { max-width: 1440px; margin-inline: auto; }

/* 導師照片的 AI 生成說明：放在按鈕上方的小字 */
.ai-note { margin: 0 0 10px; font-size: 12.5px; color: var(--ink-3); }

/* 通用格線 */
.grid-5,
.grid-4,
.grid-3 { list-style: none; display: grid; gap: 20px; }
.grid-5 { grid-template-columns: repeat(5, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }

/* 成果數據 */
.stats {
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: 0.82fr repeat(5, 1fr);
}
.stats__label {
  background: var(--navy-800);
  color: #fff;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 22px 12px;
  text-align: center;
}
.stats__label strong { font-family: var(--serif); font-size: 19px; }
.stats__label span { font-size: 13px; color: #a9c9d3; letter-spacing: 0.1em; }
.stats__item {
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
}
.stats__icon { color: var(--accent); }
.stats__value { font-size: 30px; font-weight: 700; color: var(--navy-800); line-height: 1.25; }
.stats__value em {
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  margin-left: 3px;
  color: var(--ink-2);
}
.stats__cap { font-size: 12.5px; color: var(--ink-3); line-height: 1.65; }

/* 雙欄區 */
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; }
.mini { list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.mini a { display: flex; flex-direction: column; gap: 8px; color: var(--ink-2); }
.mini img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--line);
  transition: transform 0.2s ease;
}
.mini a:hover img { transform: translateY(-2px); }
/* 繪本封面比例不一，用 contain 完整顯示，不裁切書名 */
.mini__cover {
  object-fit: contain;
  background: #fff;
  padding: 6px;
}
.mini span {
  font-size: 13px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 1080px) {
  .grid-5 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(3, 1fr); }
  .stats { grid-template-columns: repeat(3, 1fr); }
  .stats__label { grid-column: span 3; flex-direction: row; gap: 10px; padding: 14px; }
}
@media (max-width: 860px) {
  .hero__inner { grid-template-columns: 1fr; padding-block: 44px 48px; gap: 30px; }
  /* 窄螢幕只留大圖，小圖擠在一起反而看不清楚 */
  .hero__media { display: block; aspect-ratio: auto; }
  .hero__img--main { aspect-ratio: 3 / 2; height: auto; }
  .hero__img--sub { display: none; }
  .grid-3 { grid-template-columns: 1fr; }
  .duo { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 640px) {
  .grid-5,
  .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .stats { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .stats__label { grid-column: span 2; }
  .stats__value { font-size: 25px; }
  /* 雙欄時項目數為奇數：最後一個置中 */
  .stats__item:last-child:nth-child(even) {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc((100% - 12px) / 2);
  }
}
@media (min-width: 431px) and (max-width: 640px) {
  .grid-5 > li:last-child:nth-child(odd),
  .grid-4 > li:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc((100% - 14px) / 2);
  }
}

/* 英文卡片在 2 欄下會過窄，最窄的螢幕改單欄 */
@media (max-width: 430px) {
  .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
</style>
