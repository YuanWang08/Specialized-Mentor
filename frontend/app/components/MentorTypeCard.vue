<script setup lang="ts">
import type { MentorType } from '~/data/mentorTypes'
import { useLocalized } from '~/data/i18n'

defineProps<{ type: MentorType; compact?: boolean }>()
const { t: tc } = useLocalized()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(`/mentors/${type.id}`)"
    class="tcard card card--hover"
    :style="{ '--accent': type.color, '--accent-text': type.colorText }"
    :aria-label="`${tc(type.name)}：${tc(type.tagline)}`"
  >
    <span class="tcard__icon"><AppIcon :name="type.icon" :size="30" /></span>
    <h3 class="tcard__name">{{ tc(type.name) }}</h3>
    <p class="tcard__tagline">{{ tc(type.tagline) }}</p>
    <p v-if="!compact" class="tcard__intro">{{ tc(type.intro) }}</p>
    <span class="tcard__more">{{ t('common.learnMore') }} <AppIcon name="arrow" :size="12" /></span>
  </NuxtLink>
</template>

<style scoped>
.tcard {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 30px 22px 24px; color: var(--ink); position: relative; overflow: hidden;
}
.tcard::before {
  content: ''; position: absolute; inset: 0 0 auto; height: 4px; background: var(--accent);
  opacity: 0; transition: opacity .2s ease;
}
.tcard:hover::before { opacity: 1; }
.tcard__icon {
  width: 66px; height: 66px; border-radius: 50%; display: grid; place-items: center;
  background: var(--accent); color: #fff; margin-bottom: 16px;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--accent) 28%, transparent);
}
.tcard__name { font-size: 19px; color: var(--accent-text); margin-bottom: 8px; text-wrap: balance; }
.tcard__tagline {
  font-size: 14.5px; color: var(--ink-2); margin: 0 0 10px; line-height: 1.7;
  /* 標語換行時讓兩行長度平均，避免最後一行只剩一個字（例如「…學習場／域」）。
     不支援的瀏覽器會自動忽略，退回一般斷行。 */
  text-wrap: balance;
}
.tcard__intro {
  font-size: 13.5px; color: var(--ink-3); line-height: 1.85; margin: 0 0 16px;
  display: -webkit-box; -webkit-line-clamp: 4; line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
}
.tcard__more {
  margin-top: auto; display: inline-flex; align-items: center; gap: 5px;
  font-size: 13.5px; color: var(--accent-text);
}
</style>
