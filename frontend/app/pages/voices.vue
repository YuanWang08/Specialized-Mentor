<script setup lang="ts">
import { mentorTypes, type MentorTypeId } from '~/data/mentorTypes'
import { publishedTestimonials } from '~/data/testimonials'

const { t } = useI18n()

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
      :lead="t('voices.lead')"
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

@media (max-width: 860px) { .qlist { columns: 1; } }
</style>
