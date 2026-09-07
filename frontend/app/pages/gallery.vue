<script setup lang="ts">
import { mentorTypes, type MentorTypeId } from '~/data/mentorTypes'
import { photos, photosByType, galleryTarget } from '~/data/gallery'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()

useHead({ title: t('gallery.title') })

const filter = ref<MentorTypeId | 'all'>('all')
const shown = computed(() => (filter.value === 'all' ? photos : photosByType(filter.value)))
const countOf = (id: MentorTypeId) => photosByType(id).length
const counts = computed(() => Object.fromEntries(mentorTypes.map((m) => [m.id, countOf(m.id)])))

const route = useRoute()
onMounted(() => {
  const h = route.hash.replace('#', '') as MentorTypeId
  if (mentorTypes.some((m) => m.id === h)) filter.value = h
})

const missing = computed(() =>
  mentorTypes.filter((m) => countOf(m.id) < galleryTarget).map((m) => ({ ...m, n: countOf(m.id) })),
)
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="GALLERY"
      eyebrow-lang="en"
      :title="t('gallery.title')"
      :lead="t('gallery.lead', { n: photos.length })"
    />

    <section class="section section--white">
      <div class="wrap">
        <FilterTabs
          v-model="filter"
          :counts="counts"
          :total="photos.length"
          :label="t('gallery.filterLabel')"
          :unit="t('units.photo')"
        />

        <h2 class="sr-only">{{ t('gallery.listHeading') }}</h2>
        <PhotoGrid v-if="shown.length" :photos="shown" :show-type="filter === 'all'" />
        <p v-else class="ph--inline">{{ t('gallery.empty') }}</p>

        <div v-if="missing.length" class="gap">
          <h2><AppIcon name="camera" :size="17" /> {{ t('gallery.gapTitle') }}</h2>
          <p>{{ t('gallery.gapBody') }}</p>
          <ul>
            <li v-for="m in missing" :key="m.id">
              <span class="chip" :class="`chip--${m.id}`">{{ tc(m.name) }}</span>
              {{ t('gallery.gapItem', { n: m.n, missing: galleryTarget - m.n }) }}
            </li>
          </ul>
          <p class="gap__rule">{{ t('gallery.gapRule') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gap {
  margin-top: 40px;
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
.gap ul { list-style: none; display: grid; gap: 8px; margin-bottom: 14px; }
.gap li { font-size: 13.5px; color: var(--ink-2); display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
.gap__rule { margin: 0; font-size: 13px; color: var(--ink-3); }
</style>
