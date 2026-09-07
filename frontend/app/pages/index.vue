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
useHead({ title: null, titleTemplate: () => `${t('site.name')}｜${t('site.org')}` })

const featuredMentors = computed(() => outstanding.filter((m) => m.photo).slice(0, 8))
const featuredQuotes = computed(() => publishedTestimonials.slice(0, 3))
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
          <h1 class="hero__title">{{ tc(site.heroTitle) }}</h1>
          <p class="hero__lead">{{ tc(site.heroLead) }}</p>
          <NuxtLink :to="localePath('/about')" class="btn btn--solid">
            {{ t('home.heroCta') }} <AppIcon name="arrow" :size="13" class="btn__arrow" />
          </NuxtLink>
        </div>
        <div class="hero__media">
          <PlaceholderBox
            ratio="4 / 3"
            :label="t('home.heroPlaceholder')"
            :note="t('home.heroPlaceholderNote')"
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
        <ul class="grid-3">
          <li v-for="q in featuredQuotes" :key="q.id"><TestimonialCard :item="q" clamp /></li>
        </ul>
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
          :sub="t('home.outstandingSub', { year, n: outstanding.length })"
        />
        <ul class="grid-4">
          <li v-for="m in featuredMentors" :key="m.id"><MentorCard :mentor="m" /></li>
        </ul>
        <div class="sec-more">
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
  .grid-3 { grid-template-columns: 1fr; }
  .duo { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 640px) {
  .grid-5,
  .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .stats { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .stats__label { grid-column: span 2; }
  .stats__value { font-size: 25px; }
}

/* 英文卡片在 2 欄下會過窄，最窄的螢幕改單欄 */
@media (max-width: 430px) {
  .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
</style>
