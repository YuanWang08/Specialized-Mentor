<script setup lang="ts">
import { mentorTypes, type MentorTypeId } from '~/data/mentorTypes'
import { outstanding } from '~/data/outstanding'
import { resultsYear } from '~/data/results'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()
const localePath = useLocalePath()

const year = computed(() => tc(resultsYear))
useHead(() => ({ title: t('outstanding.title', { year: year.value }) }))

const filter = ref<MentorTypeId | 'all'>('all')
const shown = computed(() =>
  filter.value === 'all' ? outstanding : outstanding.filter((m) => m.type === filter.value),
)
const countOf = (id: MentorTypeId) => outstanding.filter((m) => m.type === id).length
const counts = computed(() => Object.fromEntries(mentorTypes.map((m) => [m.id, countOf(m.id)])))
const withReflection = computed(() => outstanding.filter((m) => m.reflection).length)
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="OUTSTANDING MENTORS"
      eyebrow-lang="en"
      :title="t('outstanding.title', { year })"
      :lead="t('outstanding.lead', { n: outstanding.length })"
    />

    <section class="section section--white">
      <div class="wrap">
        <div class="bar">
          <FilterTabs
            v-model="filter"
            :counts="counts"
            :total="outstanding.length"
            :label="t('outstanding.filterLabel')"
            :unit="t('units.person')"
          />
          <p class="bar__note">
            {{ t('outstanding.collected', { n: withReflection, total: outstanding.length }) }}
          </p>
        </div>

        <h2 class="sr-only">{{ t('outstanding.listHeading') }}</h2>
        <ul class="grid-4">
          <li v-for="m in shown" :key="m.id"><MentorCard :mentor="m" /></li>
        </ul>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap cta">
        <div>
          <h2>{{ t('outstanding.ctaTitle') }}</h2>
          <p>{{ t('outstanding.ctaBody') }}</p>
        </div>
        <NuxtLink :to="localePath('/voices')" class="btn btn--solid">
          {{ t('outstanding.ctaBtn') }} <AppIcon name="arrow" :size="13" class="btn__arrow" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.bar__note { margin: 4px 0 28px; font-size: 13px; color: var(--ink-3); }

.grid-4 { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.cta h2 { font-family: var(--serif); font-size: 22px; color: var(--navy-800); }
.cta p { margin: 6px 0 0; font-size: 14.5px; color: var(--ink-2); }

@media (max-width: 1080px) { .grid-4 { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .grid-4 { grid-template-columns: repeat(2, 1fr); gap: 14px; } }

/* 英文卡片在 2 欄下會過窄，最窄的螢幕改單欄 */
@media (max-width: 430px) {
  .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
</style>
