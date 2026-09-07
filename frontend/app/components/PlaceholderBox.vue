<script setup lang="ts">
withDefaults(
  defineProps<{
    /** CSS aspect-ratio，例如 "16 / 9" */
    ratio?: string
    label?: string
    note?: string
    icon?: string
    /** 外層已有可辨識的名稱時設為 true，避免螢幕閱讀器重複朗讀 */
    decorative?: boolean
  }>(),
  { ratio: '16 / 9', label: '素材待補', icon: 'camera' },
)
</script>

<template>
  <div
    class="ph"
    :style="{ aspectRatio: ratio }"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : label"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    <AppIcon :name="icon" :size="30" class="ph__icon" />
    <span>{{ label }}</span>
    <span v-if="note" class="ph__note">{{ note }}</span>
  </div>
</template>
