<script setup lang="ts">
defineProps<{
  title: string
  lead?: string
  /** 裝飾用鮮豔色 */
  accent?: string
  /** 文字用加深色 */
  accentText?: string
  eyebrow?: string
  /** eyebrow 是英文時標記語言，螢幕閱讀器才會用英文發音 */
  eyebrowLang?: string
}>()
</script>

<template>
  <section
    class="phero"
    :style="{
      ...(accent ? { '--accent': accent } : {}),
      ...(accentText ? { '--accent-text': accentText } : {}),
    }"
  >
    <div class="wrap">
      <p v-if="eyebrow" class="phero__eyebrow" :lang="eyebrowLang || undefined">{{ eyebrow }}</p>
      <div v-if="$slots.action" class="phero__head">
        <h1 class="phero__title">{{ title }}</h1>
        <div class="phero__action"><slot name="action" /></div>
      </div>
      <h1 v-else class="phero__title">{{ title }}</h1>
      <p v-if="lead" class="phero__lead">{{ lead }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.phero {
  --accent: var(--navy-600);
  --accent-text: var(--navy-700);
  background: linear-gradient(150deg, #f3efe6 0%, #eaf2f3 100%);
  border-bottom: 1px solid var(--line);
  padding-block: 46px 44px;
  position: relative;
}
.phero::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: var(--accent);
}
.phero__eyebrow {
  margin: 0 0 8px;
  font-size: 13px;
  letter-spacing: 0.14em;
  color: var(--accent-text);
  font-weight: 500;
}
.phero__title {
  font-family: var(--serif);
  font-size: clamp(26px, 3.6vw, 38px);
  color: var(--navy-800);
}
.phero__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px 24px;
}
.phero__action { flex: none; }
.phero__lead {
  margin: 14px 0 0;
  max-width: 46em;
  font-size: 15.5px;
  line-height: 2;
  color: var(--ink-2);
}
</style>
