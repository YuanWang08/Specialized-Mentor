<script setup lang="ts">
import { typeMap } from '~/data/mentorTypes'
import { outstanding, outstandingById } from '~/data/outstanding'
import { photosByType } from '~/data/gallery'
import { resultsYear } from '~/data/results'
import { useLocalized } from '~/data/i18n'

const route = useRoute()
const { t } = useI18n()
const { t: tc, tAll } = useLocalized()
const localePath = useLocalePath()

const mentor = computed(() => outstandingById(route.params.id as string))

if (!mentor.value) {
  throw createError({ statusCode: 404, statusMessage: t('error.noMentor'), fatal: true })
}

const type = computed(() => typeMap[mentor.value!.type])
const name = computed(() => tc(mentor.value!.name))
const rank = computed(() => tc(mentor.value!.rank))
const year = computed(() => tc(resultsYear))

usePageSeo(() => ({
  title: `${name.value}${t('common.sep')}${rank.value}`,
  description: t('seo.mentor', {
    name: name.value,
    rank: rank.value,
    dept: tc(mentor.value!.dept),
    type: tc(type.value.name),
    year: year.value,
    motto: tc(mentor.value!.motto),
  }),
  image: mentor.value!.photo,
}))

/** 服務學習組的花絮照片有分老師資料夾，可對應到本人 */
const ownPhotos = computed(() =>
  photosByType(mentor.value!.type).filter(
    (p) => p.teacher && p.teacher.zh.includes(mentor.value!.name.zh),
  ),
)

const siblings = computed(() =>
  outstanding.filter((m) => m.type === mentor.value!.type && m.id !== mentor.value!.id),
)

const idx = computed(() => outstanding.findIndex((m) => m.id === mentor.value!.id))
const prev = computed(() => outstanding[(idx.value - 1 + outstanding.length) % outstanding.length])
const next = computed(() => outstanding[(idx.value + 1) % outstanding.length])
</script>

<template>
  <article
    v-if="mentor"
    :style="{ '--accent': type.color, '--accent-text': type.colorText }"
  >
    <nav class="crumb" :aria-label="t('outstanding.breadcrumb')">
      <div class="wrap">
        <NuxtLink :to="localePath('/outstanding')">{{ t('nav.outstanding') }}</NuxtLink>
        <AppIcon name="arrow" :size="12" />
        <span>{{ name }}</span>
      </div>
    </nav>

    <header class="top">
      <div class="wrap top__inner">
        <div class="top__photo">
          <img v-if="mentor.photo" :src="mentor.photo" :alt="`${name}${t('common.sep')}${rank}`" />
          <p v-if="mentor.photo" class="ai-note">{{ t('home.photoAiNote') }}</p>
          <PlaceholderBox
            v-else
            ratio="4 / 5"
            :label="t('common.photoPending')"
            :note="`${name}${t('common.sep')}${rank}`"
          />
        </div>
        <div class="top__text">
          <span class="chip" :class="`chip--${mentor.type}`">
            {{ t('outstanding.badge', { year, name: tc(type.name) }) }}
          </span>
          <h1 class="top__name">{{ name }}</h1>
          <p class="top__dept">{{ rank }}{{ t('common.sep') }}{{ tc(mentor.dept) }}</p>
          <blockquote class="top__motto">
            <AppIcon name="quote" :size="24" />
            <p>{{ tc(mentor.motto) }}</p>
          </blockquote>
          <NuxtLink :to="localePath(`/mentors/${mentor.type}`) + '#about'" class="btn btn--ghost">
            {{ t('mentors.meet', { name: tc(type.name) }) }}
            <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <section class="section section--white">
      <div class="wrap body">
        <h2 class="blk-title">{{ t('outstanding.reflectionTitle') }}</h2>
        <div v-if="mentor.reflection" class="prose">
          <p v-for="(p, i) in tAll(mentor.reflection)" :key="i">{{ p }}</p>
        </div>
        <p v-else class="ph--inline">{{ t('outstanding.noReflection', { name, rank }) }}</p>
      </div>
    </section>

    <section v-if="ownPhotos.length" class="section section--tint">
      <div class="wrap">
        <SectionHeading
          :title="t('outstanding.ownGallery')"
          :sub="t('outstanding.ownGallerySub', { name, rank })"
        />
        <PhotoGrid :photos="ownPhotos" />
      </div>
    </section>

    <section v-if="siblings.length" class="section section--white">
      <div class="wrap">
        <SectionHeading :title="t('outstanding.siblings', { name: tc(type.name) })" />
        <ul class="sibs">
          <li v-for="s in siblings" :key="s.id"><MentorCard :mentor="s" /></li>
        </ul>
      </div>
    </section>

    <nav class="pager" :aria-label="t('outstanding.pagerLabel')">
      <div class="wrap pager__inner">
        <NuxtLink
          v-if="prev"
          :to="localePath(`/outstanding/${prev.id}`)"
          class="pager__link"
        >
          <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
          <span><small>{{ t('outstanding.prev') }}</small>{{ tc(prev.name) }}</span>
        </NuxtLink>
        <NuxtLink :to="localePath('/outstanding')" class="pager__all">
          {{ t('outstanding.backToList') }}
        </NuxtLink>
        <NuxtLink
          v-if="next"
          :to="localePath(`/outstanding/${next.id}`)"
          class="pager__link pager__link--next"
        >
          <span><small>{{ t('outstanding.next') }}</small>{{ tc(next.name) }}</span>
          <AppIcon name="arrow" :size="14" />
        </NuxtLink>
      </div>
    </nav>
  </article>
</template>

<style scoped>
/* 導師照片為 AI 生成：極小的字、靠右，不搶畫面 */
.ai-note { margin: 6px 0 0; text-align: right; font-size: 11.5px; color: var(--ink-3); }
.crumb { background: var(--cream-2); border-bottom: 1px solid var(--line); }
.crumb .wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-block: 12px;
  font-size: 13.5px;
  color: var(--ink-3);
}
.crumb svg { opacity: 0.5; }

.top {
  background: linear-gradient(150deg, #f3efe6 0%, #eaf2f3 100%);
  border-bottom: 1px solid var(--line);
  border-top: 4px solid var(--accent);
}
.top__inner {
  display: grid;
  grid-template-columns: minmax(0, 268px) minmax(0, 1fr);
  gap: 42px;
  align-items: center;
  padding-block: 44px;
}
.top__photo img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 20%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 5px solid #fff;
}
.top__name {
  font-family: var(--serif);
  font-size: clamp(28px, 4vw, 40px);
  color: var(--navy-800);
  margin: 12px 0 0;
  line-height: 1.35;
}
.top__dept { margin: 8px 0 0; font-size: 14.5px; color: var(--ink-3); line-height: 1.7; }
.top__motto {
  margin: 22px 0;
  padding: 18px 22px;
  background: rgba(255, 255, 255, 0.7);
  border-left: 4px solid var(--accent);
  border-radius: 0 12px 12px 0;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.top__motto svg { color: var(--accent); opacity: 0.4; flex: none; margin-top: 3px; }
.top__motto p {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(16px, 2.2vw, 20px);
  line-height: 1.95;
  color: var(--navy-800);
}

.body { max-width: 780px; margin-inline: auto; }
.blk-title {
  font-family: var(--serif);
  font-size: 22px;
  color: var(--navy-800);
  margin-bottom: 18px;
  padding-left: 13px;
  border-left: 4px solid var(--accent);
}
.prose p {
  font-size: 16px;
  line-height: 2.2;
  color: var(--ink-2);
  margin-bottom: 1.3em;
}

/* 其他傑出導師：張數常不滿一列，改用 flex 置中，與上方置中的標題對齊 */
.sibs { list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
.sibs > li { width: calc((100% - 3 * 20px) / 4); }

.pager { border-top: 1px solid var(--line); background: var(--cream-2); }
.pager__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 22px;
}
.pager__link { display: flex; align-items: center; gap: 10px; color: var(--ink-2); font-size: 14.5px; }
.pager__link--next { text-align: right; }
.pager__link small { display: block; font-size: 12px; color: var(--ink-3); }
.pager__link:hover { color: var(--navy-700); }
.pager__all { font-size: 13.5px; color: var(--ink-3); }

@media (max-width: 860px) {
  .top__inner { grid-template-columns: 1fr; gap: 24px; padding-block: 32px; }
  .top__photo { max-width: 220px; }
  .sibs { gap: 14px; }
  .sibs > li { width: calc((100% - 14px) / 2); }
  .pager__all { display: none; }
}

/* 英文卡片在 2 欄下會過窄，最窄的螢幕改單欄 */
@media (max-width: 430px) {
  .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
  .sibs > li { width: 100%; }
}
</style>
