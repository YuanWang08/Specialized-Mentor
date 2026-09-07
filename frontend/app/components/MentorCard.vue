<script setup lang="ts">
import type { Outstanding } from '~/data/outstanding'
import { typeMap } from '~/data/mentorTypes'
import { useLocalized } from '~/data/i18n'

const props = defineProps<{ mentor: Outstanding }>()
const { t: tc } = useLocalized()
const { t } = useI18n()
const localePath = useLocalePath()

const type = computed(() => typeMap[props.mentor.type])
const label = computed(() => {
  const vars = { name: tc(props.mentor.name), rank: tc(props.mentor.rank) }
  return props.mentor.reflection
    ? t('outstanding.readReflectionOf', vars)
    : t('outstanding.viewProfileOf', vars)
})
</script>

<template>
  <article class="mcard card card--hover" :style="{ '--accent': type.colorText }">
    <div class="mcard__photo">
      <img
        v-if="mentor.photo"
        :src="mentor.photo"
        :alt="`${tc(mentor.name)}${t('common.sep')}${tc(mentor.rank)}`"
        loading="lazy"
      />
      <PlaceholderBox
        v-else
        ratio="4 / 5"
        :label="t('common.photoPending')"
        :note="`${tc(mentor.name)}${t('common.sep')}${tc(mentor.rank)}`"
      />
    </div>
    <div class="mcard__body">
      <span class="chip" :class="`chip--${mentor.type}`">{{ tc(type.name) }}</span>
      <h3 class="mcard__name">{{ tc(mentor.name) }}</h3>
      <p class="mcard__dept">{{ tc(mentor.rank) }}{{ t('common.sep') }}{{ tc(mentor.dept) }}</p>
      <blockquote class="mcard__motto">{{ tc(mentor.motto) }}</blockquote>
      <NuxtLink
        :to="localePath(`/outstanding/${mentor.id}`)"
        class="btn btn--ghost mcard__btn"
        :aria-label="label"
      >
        {{ mentor.reflection ? t('outstanding.readReflection') : t('outstanding.viewProfile') }}
        <AppIcon name="arrow" :size="12" class="btn__arrow" />
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.mcard { display: flex; flex-direction: column; overflow: hidden; }
.mcard__photo { background: var(--cream-2); }
.mcard__photo img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center 22%; }
.mcard__body { padding: 16px 18px 20px; display: flex; flex-direction: column; align-items: flex-start; gap: 7px; flex: 1; }
.mcard__name { font-size: 18.5px; color: var(--navy-800); line-height: 1.45; }
.mcard__dept { font-size: 13px; color: var(--ink-3); margin: 0; line-height: 1.7; }
.mcard__motto {
  margin: 4px 0 0; padding: 0 0 0 11px; font-size: 14px; line-height: 1.85; color: var(--ink-2);
  border-left: 3px solid var(--accent);
}
.mcard__btn { margin-top: auto; padding: 8px 16px; font-size: 13.5px; align-self: stretch; justify-content: center; }
</style>
