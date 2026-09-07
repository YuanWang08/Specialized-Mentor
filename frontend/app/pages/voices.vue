<script setup lang="ts">
import { mentorTypes, typeMap, type MentorTypeId } from '~/data/mentorTypes'
import { publishedTestimonials, testimonialGaps } from '~/data/testimonials'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()

useHead({ title: t('voices.title') })

const filter = ref<MentorTypeId | 'all'>('all')
const shown = computed(() =>
  filter.value === 'all'
    ? publishedTestimonials
    : publishedTestimonials.filter((q) => q.type === filter.value),
)
const countOf = (id: MentorTypeId) => publishedTestimonials.filter((q) => q.type === id).length
const counts = computed(() => Object.fromEntries(mentorTypes.map((m) => [m.id, countOf(m.id)])))
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="STUDENT VOICES"
      eyebrow-lang="en"
      :title="t('voices.title')"
      :lead="t('voices.lead', { n: publishedTestimonials.length })"
    />

    <section class="section section--white">
      <div class="wrap">
        <FilterTabs
          v-model="filter"
          :counts="counts"
          :total="publishedTestimonials.length"
          :label="t('voices.filterLabel')"
          :unit="t('units.entry')"
        />

        <h2 class="sr-only">{{ t('voices.listHeading') }}</h2>
        <ul v-if="shown.length" class="qlist">
          <li v-for="q in shown" :key="q.id"><TestimonialCard :item="q" /></li>
        </ul>
        <p v-else class="ph--inline">{{ t('voices.empty') }}</p>

        <div v-if="testimonialGaps.length" class="gap">
          <h2><AppIcon name="quote" :size="17" /> {{ t('voices.gapTitle') }}</h2>
          <p>{{ t('voices.gapBody') }}</p>
          <ul>
            <li v-for="g in testimonialGaps" :key="g">
              <span class="chip" :class="`chip--${g}`">{{ tc(typeMap[g].name) }}</span>
            </li>
          </ul>
          <p class="gap__rule">{{ t('voices.gapRule') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.qlist {
  list-style: none;
  columns: 2;
  column-gap: 20px;
}
.qlist li { break-inside: avoid; margin-bottom: 20px; }

.gap {
  margin-top: 34px;
  padding: 22px 24px;
  border: 1.5px dashed #cfc4b1;
  border-radius: var(--radius);
  background: var(--cream-2);
}
.gap h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 15.5px;
  color: var(--navy-800);
  margin-bottom: 10px;
}
.gap p { font-size: 14px; color: var(--ink-2); margin-bottom: 12px; }
.gap ul { list-style: none; display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.gap__rule { margin: 0; font-size: 13px; color: var(--ink-3); }

@media (max-width: 860px) { .qlist { columns: 1; } }
</style>
