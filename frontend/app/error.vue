<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
const { t } = useI18n()
useHead({
  title: props.error.statusCode === 404 ? t('error.notFound') : String(props.error.statusCode),
})
</script>

<template>
  <div class="err">
    <SiteHeader />
    <main id="main" class="err__main-wrap">
      <ErrorView :status-code="error.statusCode" :status-message="error.statusMessage" />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.err { display: flex; flex-direction: column; min-height: 100vh; }
.err__main-wrap { flex: 1; display: flex; flex-direction: column; }
</style>
