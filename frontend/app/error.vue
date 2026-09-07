<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: String(props.error.statusCode) })
</script>

<template>
  <div class="err">
    <SiteHeader />
    <main class="err__main wrap">
      <p class="err__code" aria-hidden="true">{{ error.statusCode }}</p>
      <h1 class="err__title">
        {{ error.statusCode === 404 ? t('error.notFound') : error.statusMessage || t('error.generic') }}
      </h1>
      <p class="err__lead">{{ t('error.lead') }}</p>
      <div class="err__acts">
        <NuxtLink :to="localePath('/')" class="btn btn--solid">{{ t('error.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/mentors')" class="btn btn--ghost">{{ t('error.mentors') }}</NuxtLink>
        <NuxtLink :to="localePath('/outstanding')" class="btn btn--ghost">{{ t('error.outstanding') }}</NuxtLink>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.err { display: flex; flex-direction: column; min-height: 100vh; }
.err__main { flex: 1; text-align: center; padding-block: 90px 110px; }
.err__code { font-family: var(--serif); font-size: 76px; color: var(--navy-600); opacity: 0.35; margin: 0; line-height: 1; }
.err__title { font-family: var(--serif); font-size: clamp(24px, 3.4vw, 32px); color: var(--navy-800); margin-top: 14px; }
.err__lead { margin: 14px 0 28px; color: var(--ink-2); }
.err__acts { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
</style>
