<script setup lang="ts">
import { mentorTypes, type MentorTypeId } from '~/data/mentorTypes'
import { photos, photosByType } from '~/data/gallery'

const { t } = useI18n()

usePageSeo(() => ({ title: t('gallery.title'), description: t('gallery.lead') }))

const filter = ref<MentorTypeId | 'all'>('all')
const shown = computed(() => (filter.value === 'all' ? photos : photosByType(filter.value)))
const countOf = (id: MentorTypeId) => photosByType(id).length
const counts = computed(() => Object.fromEntries(mentorTypes.map((m) => [m.id, countOf(m.id)])))

const route = useRoute()
onMounted(() => {
  const h = route.hash.replace('#', '') as MentorTypeId
  if (mentorTypes.some((m) => m.id === h)) filter.value = h
})
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="GALLERY"
      eyebrow-lang="en"
      :title="t('gallery.title')"
      :lead="t('gallery.lead')"
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
      </div>
    </section>
  </div>
</template>

