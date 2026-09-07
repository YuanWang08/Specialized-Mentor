<script setup lang="ts">
import type { Testimonial } from '~/data/testimonials'
import { typeMap } from '~/data/mentorTypes'
import { useLocalized } from '~/data/i18n'

const props = defineProps<{ item: Testimonial; clamp?: boolean }>()
const { t: tc, tAll } = useLocalized()
const type = computed(() => typeMap[props.item.type])
</script>

<template>
  <figure class="tq card" :style="{ '--accent': type.colorText }">
    <AppIcon name="quote" :size="26" class="tq__mark" />
    <blockquote class="tq__body" :class="{ 'tq__body--clamp': clamp }">
      <p v-for="(p, i) in tAll(item.content)" :key="i">{{ p }}</p>
    </blockquote>
    <figcaption class="tq__meta">
      <span class="chip" :class="`chip--${item.type}`">{{ tc(type.name) }}</span>
      <span class="tq__who">{{ tc(item.dept) }}　{{ tc(item.grade) }}　{{ tc(item.name) }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.tq { padding: 24px 24px 20px; display: flex; flex-direction: column; gap: 12px; position: relative; }
.tq__mark { color: var(--accent); opacity: .3; flex: none; }
.tq__body { margin: 0; font-size: 14.5px; line-height: 1.95; color: var(--ink-2); }
.tq__body p { margin: 0 0 .85em; }
.tq__body p:last-child { margin-bottom: 0; }
.tq__body--clamp {
  display: -webkit-box; -webkit-line-clamp: 5; line-clamp: 5;
  -webkit-box-orient: vertical; overflow: hidden;
}
.tq__meta {
  margin-top: auto; padding-top: 13px; border-top: 1px solid var(--line);
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
}
.tq__who { font-size: 13px; color: var(--ink-3); }
</style>
