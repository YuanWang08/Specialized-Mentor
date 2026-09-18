<script setup lang="ts">
const { t, locale, locales } = useI18n()
const head = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang ?? locale.value },
  link: head.value.link,
  meta: head.value.meta,
  titleTemplate: (title?: string) =>
    title ? `${title}｜${t('site.name')}` : t('site.name'),
}))
</script>

<template>
  <div class="app">
    <!--
      無障礙規範的三個定位點（accesskey）：
        U = 上方導覽區、C = 中央內容區、Z = 頁尾資訊區
      每個定位點都是可聚焦元素，聚焦時 .sr-only 會顯示出來，鍵盤使用者才知道跳到哪一區。
    -->
    <a href="#main" class="sr-only skip">{{ t('nav.skip') }}</a>
    <SiteHeader />
    <main id="main" class="app__main" tabindex="-1">
      <a id="C" accesskey="C" href="#C" class="sr-only">{{ t('nav.landmarkMain') }}</a>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<style>
.app { display: flex; flex-direction: column; min-height: 100vh; }
.app__main { flex: 1; }
.app__main:focus { outline: none; }
.skip:focus, .skip:focus-visible { position: absolute !important; left: 12px; top: 0; z-index: 100; }
</style>
