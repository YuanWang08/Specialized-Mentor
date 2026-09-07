<script setup lang="ts">
/** 錯誤畫面的共用內容，由 error.vue（SSR 錯誤）與 pages/404.vue（靜態預先產生）共用 */
const props = defineProps<{ statusCode: number; statusMessage?: string }>()
const { t } = useI18n()
const localePath = useLocalePath()

const title = computed(() =>
  props.statusCode === 404 ? t('error.notFound') : props.statusMessage || t('error.generic'),
)
</script>

<template>
  <div class="err__main wrap">
    <p class="err__code" aria-hidden="true">{{ statusCode }}</p>
    <h1 class="err__title">{{ title }}</h1>
    <p class="err__lead">{{ t('error.lead') }}</p>
    <div class="err__acts">
      <NuxtLink :to="localePath('/')" class="btn btn--solid">{{ t('error.home') }}</NuxtLink>
      <NuxtLink :to="localePath('/mentors')" class="btn btn--ghost">{{ t('error.mentors') }}</NuxtLink>
      <NuxtLink :to="localePath('/outstanding')" class="btn btn--ghost">
        {{ t('error.outstanding') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/sitemap')" class="btn btn--ghost">{{ t('nav.sitemap') }}</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.err__main { flex: 1; text-align: center; padding-block: 90px 110px; }
.err__code {
  font-family: var(--serif);
  font-size: 76px;
  /* 不用 opacity 調淡：那會讓對比只剩約 1.9。改用實色，對 cream 底 3.29:1，
     符合大字級（≥24px）3:1 的門檻。 */
  color: #5b93a8;
  margin: 0;
  line-height: 1;
}
.err__title { font-family: var(--serif); font-size: clamp(24px, 3.4vw, 32px); color: var(--navy-800); margin-top: 14px; }
.err__lead { margin: 14px 0 28px; color: var(--ink-2); }
.err__acts { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
</style>
