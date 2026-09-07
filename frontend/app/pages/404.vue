<script setup lang="ts">
/**
 * 實際存在的 404 頁面。
 *
 * 靜態部署（Cloudflare Pages）時，主機找不到路徑會直接回傳 404.html。
 * 若只靠 Nuxt 的 SPA fallback，那個檔案是空殼、要等 JS 跑完才有內容，
 * 沒有 <title>、關閉 JS 也是一片空白——對公部門網站的無障礙要求來說不合格。
 * 所以把 404 做成一個真的會被預先產生的頁面，再由建置後處理複製成 404.html。
 */
const { t } = useI18n()
useHead({ title: t('error.notFound') })
</script>

<template>
  <ErrorView :status-code="404" />
</template>
