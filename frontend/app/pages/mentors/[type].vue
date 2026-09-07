<script setup lang="ts">
import { mentorTypes, typeMap, type MentorTypeId } from '~/data/mentorTypes'
import { outstandingByType } from '~/data/outstanding'
import { publishedTestimonials } from '~/data/testimonials'
import { photosByType, galleryTarget } from '~/data/gallery'
import { results, resultsYear } from '~/data/results'
import { useLocalized } from '~/data/i18n'

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
</script>

<template>
  <div class="page">
    <PageHero
      :eyebrow="tc(type.tagline)"
      :title="name"
      :accent="type.color"
      :accent-text="type.colorText"
    >
      <p class="lead">{{ tc(type.intro) }}</p>
      <a
        v-if="type.link"
        :href="type.link.href"
        target="_blank"
        rel="noopener"
        class="btn btn--ghost hero-link"
      >
        {{ tc(type.link.label) }}<span class="sr-only">{{ t('common.newWindow') }}</span>
        <AppIcon name="external" :size="13" />
      </a>
    </PageHero>

    <!-- 計畫說明 -->
    <section class="section section--white">
      <div
        class="wrap two"
        :style="{ '--accent': type.color, '--accent-text': type.colorText }"
      >
        <div class="two__main">
          <h2 class="blk-title">{{ t('mentors.aboutType', { name }) }}</h2>
          <p class="blk-body">{{ tc(type.detail) }}</p>
        </div>
        <aside v-if="result" class="two__side card">
          <h3>{{ t('mentors.yearResults', { year }) }}</h3>
          <ul>
            <li v-for="(s, i) in result.stats" :key="i">
              <strong>{{ s.value }}</strong><em>{{ tc(s.unit) }}</em>
              <span>{{ tc(s.label) }}</span>
            </li>
          </ul>
          <NuxtLink :to="localePath('/results')" class="two__more">
            {{ t('mentors.fullResults') }} <AppIcon name="arrow" :size="12" />
          </NuxtLink>
        </aside>
      </div>
    </section>

    <!-- 傑出導師 -->
    <section v-if="mentors.length" class="section section--tint">
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

    <!-- 學生回饋 -->
    <section class="section section--white">
      <div class="wrap">
        <SectionHeading :title="t('voices.title')" />
        <ul v-if="quotes.length" class="grid-2">
          <li v-for="q in quotes" :key="q.id"><TestimonialCard :item="q" clamp /></li>
        </ul>
        <p v-else class="ph--inline">{{ t('mentors.noVoices', { name }) }}</p>
        <div v-if="quotes.length" class="sec-more">
          <NuxtLink :to="localePath('/voices')" class="btn btn--ghost">
            {{ t('mentors.readAllVoices') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 活動花絮 -->
    <section class="section section--tint">
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
    <section class="section section--white">
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
.lead { margin: 14px 0 0; max-width: 46em; font-size: 15.5px; line-height: 2; color: var(--ink-2); }
.hero-link { margin-top: 18px; }

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

/* 英文卡片在 2 欄下會過窄，最窄的螢幕改單欄 */
@media (max-width: 430px) {
  .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
</style>
