<script setup lang="ts">
import { mentorTypes, typeMap, type MentorTypeId } from '~/data/mentorTypes'
import { outstandingByType } from '~/data/outstanding'
import { publishedTestimonials } from '~/data/testimonials'
import { photosByType, galleryTarget } from '~/data/gallery'
import { results, resultsYear } from '~/data/results'
import { useLocalized, splitParen } from '~/data/i18n'

const route = useRoute()
const { t } = useI18n()
const { t: tc } = useLocalized()
const localePath = useLocalePath()

const id = computed(() => route.params.type as MentorTypeId)
const type = computed(() => typeMap[id.value])

if (!type.value) {
  throw createError({ statusCode: 404, statusMessage: t('error.noType'), fatal: true })
}

const name = computed(() => tc(type.value.name))
useHead(() => ({ title: name.value }))

const mentors = computed(() => outstandingByType(id.value))
const quotes = computed(() => publishedTestimonials.filter((q) => q.type === id.value))
const pics = computed(() => photosByType(id.value))
const result = computed(() => results.find((r) => r.type === id.value))
const others = computed(() => mentorTypes.filter((m) => m.id !== id.value))
const year = computed(() => tc(resultsYear))

/**
 * 區塊底色白／米交替。傑出導師、學生心得在沒有資料時整段不顯示，
 * 所以依「前面實際顯示了幾段」決定底色，才不會出現兩段同色相連。
 */
const toneAt = (i: number) => (i % 2 ? 'section--tint' : 'section--white')
const idx = computed(() => {
  const mentorsI = 1
  const voicesI = mentorsI + (mentors.value.length ? 1 : 0)
  const galleryI = voicesI + (quotes.value.length ? 1 : 0)
  return { mentors: mentorsI, voices: voicesI, gallery: galleryI, others: galleryI + 1 }
})
</script>

<template>
  <div class="page">
    <PageHero
      :eyebrow="tc(type.tagline)"
      :title="name"
      :accent="type.color"
      :accent-text="type.colorText"
    >
      <template #action>
        <a :href="type.website" target="_blank" rel="noopener" class="btn btn--ghost">
          {{ t('mentors.unitSite') }}<span class="sr-only">{{ t('mentors.unitSiteOf', { name }) }}{{ t('common.newWindow') }}</span>
          <AppIcon name="external" :size="13" />
        </a>
      </template>
      <p class="lead">{{ tc(type.intro) }}</p>
    </PageHero>

    <!-- 計畫說明（傑出導師個人頁的「關於○○導師」按鈕會直接跳到這裡） -->
    <section id="about" class="section section--white about-sec">
      <div
        class="wrap two"
        :style="{ '--accent': type.color, '--accent-text': type.colorText }"
      >
        <div class="two__main">
          <h2 class="blk-title">{{ t('mentors.aboutType', { name }) }}</h2>
          <p class="blk-body">{{ tc(type.detail) }}</p>
          <!-- 競賽榮譽（目前只有體育）：與年度成果頁共用 results.ts 的 awards -->
          <div v-if="result?.awards" class="honors">
            <h3 class="honors__title">
              <AppIcon name="trophy" :size="17" /> {{ t('mentors.honorsTitle') }}
            </h3>
            <ul class="honors__list">
              <li v-for="a in result.awards" :key="a.title.zh">
                <strong>{{ tc(a.title) }}</strong>
                <ul v-if="a.items.length > 1">
                  <li v-for="(it, i) in a.items" :key="i">{{ tc(it) }}</li>
                </ul>
                <span v-else>{{ tc(a.items[0]!) }}</span>
              </li>
            </ul>
          </div>
        </div>
        <aside v-if="result" class="two__side card">
          <h3>{{ t('mentors.yearResults', { year }) }}</h3>
          <ul>
            <li v-for="(s, i) in result.stats" :key="i">
              <strong>{{ s.value }}</strong><em>{{ tc(s.unit) }}</em>
              <span>{{ splitParen(tc(s.label))[0] }}<span class="nowrap">{{ splitParen(tc(s.label))[1] }}</span></span>
            </li>
          </ul>
          <NuxtLink :to="localePath('/results')" class="two__more">
            {{ t('mentors.fullResults') }} <AppIcon name="arrow" :size="12" />
          </NuxtLink>
        </aside>
      </div>
    </section>

    <!-- 傑出導師 -->
    <section v-if="mentors.length" class="section" :class="toneAt(idx.mentors)">
      <div class="wrap">
        <SectionHeading
          :title="t('mentors.outstandingTitle', { year, name })"
          :sub="t('common.count', { n: mentors.length, unit: t('units.person') })"
        />
        <ul class="grid-4">
          <li v-for="m in mentors" :key="m.id"><MentorCard :mentor="m" /></li>
        </ul>
      </div>
    </section>

    <!-- 學生回饋：尚無資料的類別整段隱藏 -->
    <section v-if="quotes.length" class="section" :class="toneAt(idx.voices)">
      <div class="wrap">
        <SectionHeading :title="t('voices.title')" />
        <ul class="quote-grid grid-2">
          <li v-for="q in quotes" :key="q.id"><TestimonialCard :item="q" clamp /></li>
        </ul>
        <div class="sec-more">
          <NuxtLink :to="localePath('/voices')" class="btn btn--ghost">
            {{ t('mentors.readAllVoices') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 活動花絮 -->
    <section class="section" :class="toneAt(idx.gallery)">
      <div class="wrap">
        <SectionHeading
          :title="t('gallery.title')"
          :sub="pics.length ? t('common.count', { n: pics.length, unit: t('units.photo') }) : undefined"
        />
        <PhotoGrid v-if="pics.length" :photos="pics" />
        <p v-else class="ph--inline">
          {{ t('mentors.noPhotos', { name, n: galleryTarget }) }}
        </p>
        <p v-if="pics.length && pics.length < galleryTarget" class="ph--inline note">
          {{ t('mentors.partialPhotos', { n: pics.length, target: galleryTarget }) }}
        </p>
      </div>
    </section>

    <!-- 其他類別 -->
    <section class="section" :class="toneAt(idx.others)">
      <div class="wrap">
        <SectionHeading :title="t('mentors.othersTitle')" />
        <ul class="grid-4">
          <li v-for="o in others" :key="o.id"><MentorTypeCard :type="o" compact /></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-sec { scroll-margin-top: 76px; }
.lead { margin: 14px 0 0; font-size: 15.5px; line-height: 2; color: var(--ink-2); }

.two { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 40px; align-items: start; }
.blk-title {
  font-family: var(--serif);
  font-size: 22px;
  color: var(--navy-800);
  margin-bottom: 14px;
  padding-left: 13px;
  border-left: 4px solid var(--accent);
}
.blk-body { font-size: 15.5px; line-height: 2.15; color: var(--ink-2); margin: 0; }

.honors { margin-top: 22px; padding: 20px 22px; border-radius: var(--radius); background: var(--cream-2); }
.honors__title {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
  font-size: 15.5px;
  color: var(--accent-text);
}
.honors__list { list-style: none; display: grid; gap: 12px; }
.honors__list > li { display: grid; gap: 2px; font-size: 14.5px; line-height: 1.85; color: var(--ink-2); }
.honors__list strong { font-weight: 500; color: var(--navy-800); }
.honors__list ul { list-style: none; display: grid; gap: 2px; }
.honors__list ul li { position: relative; padding-left: 15px; }
.honors__list ul li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.8em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.two__side { padding: 22px 24px; }
.two__side h3 { font-size: 15px; color: var(--navy-800); margin-bottom: 14px; }
.two__side ul { list-style: none; display: grid; gap: 15px; }
.two__side li { display: flex; align-items: baseline; flex-wrap: wrap; gap: 3px; }
.two__side strong { font-size: 25px; color: var(--accent-text); line-height: 1.2; }
.two__side em { font-style: normal; font-size: 13px; color: var(--ink-2); }
.two__side span { width: 100%; font-size: 12.5px; color: var(--ink-3); line-height: 1.65; }
.two__more {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  width: 100%;
  font-size: 13.5px;
  color: var(--accent-text);
}

.grid-4, .grid-2 { list-style: none; display: grid; gap: 20px; }
.grid-4 { grid-template-columns: repeat(4, 1fr); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.note { margin-top: 18px; }

@media (max-width: 1080px) {
  .two { grid-template-columns: 1fr; gap: 28px; }
  .grid-4 { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 800px) { .grid-2 { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
/* 雙欄時項目數為奇數：最後一個置中 */
@media (min-width: 431px) and (max-width: 640px) {
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
