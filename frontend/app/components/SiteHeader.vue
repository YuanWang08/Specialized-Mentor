<script setup lang="ts">
import { nav } from '~/data/site'
import { typeMap, type MentorTypeId } from '~/data/mentorTypes'
import { useLocalized } from '~/data/i18n'

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const { t: tc } = useLocalized()
const typeName = (key: string) => tc(typeMap[key as MentorTypeId].name)

const onScroll = () => (scrolled.value = window.scrollY > 8)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => (open.value = false))

/** 比對時去掉語系前綴，讓 /en/mentors 也能正確標示目前頁面 */
const bare = computed(() => route.path.replace(/^\/en(?=\/|$)/, '') || '/')
const isActive = (to: string) => (to === '/' ? bare.value === '/' : bare.value.startsWith(to))
</script>

<template>
  <header class="hdr" :class="{ 'hdr--scrolled': scrolled }">
    <div class="wrap hdr__inner">
      <NuxtLink :to="localePath('/')" class="brand" :aria-label="t('site.backHome')">
        <span class="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="38" height="38">
            <path
              d="M20 34C13 29.5 6.5 24.5 6.5 17.8A6.6 6.6 0 0 1 20 14.4a6.6 6.6 0 0 1 13.5 3.4C33.5 24.5 27 29.5 20 34Z"
              fill="currentColor" opacity=".92"
            />
            <circle cx="14.6" cy="17.4" r="2.5" fill="#fff" />
            <circle cx="25.4" cy="17.4" r="2.5" fill="#fff" />
            <path d="M15 24c1.6 1.6 3.2 2.4 5 2.4s3.4-.8 5-2.4" stroke="#fff" stroke-width="1.7"
              fill="none" stroke-linecap="round" />
          </svg>
        </span>
        <span class="brand__text">
          <!-- 校名在上、站名在下，合起來讀作完整站名 -->
          <small>{{ t('site.org') }}</small>
          <strong>{{ t('site.short') }}</strong>
        </span>
      </NuxtLink>

      <div class="hdr__acts">
        <LangSwitch class="hdr__lang" />
        <button
          type="button"
          class="hdr__toggle"
          :aria-expanded="open"
          aria-controls="site-nav"
          :aria-label="open ? t('nav.close') : t('nav.open')"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="24" />
        </button>
      </div>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': open }" :aria-label="t('nav.menu')">
        <a id="U" accesskey="U" href="#U" class="sr-only">{{ t('nav.landmarkTop') }}</a>
        <ul class="nav__list">
          <li v-for="item in nav" :key="item.key" class="nav__item"
            :class="{ 'nav__item--has-sub': item.children }">
            <a v-if="item.href" :href="item.href" target="_blank" rel="noopener" class="nav__link">
              {{ t(`nav.${item.key}`) }}<span class="sr-only">{{ t('common.newWindow') }}</span>
              <AppIcon name="external" :size="12" class="nav__ext" />
            </a>
            <NuxtLink
              v-else
              :to="localePath(item.to!)"
              class="nav__link"
              :class="{ 'nav__link--active': isActive(item.to!) }"
              :aria-current="isActive(item.to!) ? 'page' : undefined"
            >
              {{ t(`nav.${item.key}`) }}
              <AppIcon v-if="item.children" name="arrow" :size="13" class="nav__caret" />
            </NuxtLink>
            <ul v-if="item.children" class="nav__sub">
              <li v-for="c in item.children" :key="c.to">
                <NuxtLink
                  :to="localePath(c.to)"
                  :aria-current="bare === c.to ? 'page' : undefined"
                >
                  {{ typeName(c.key) }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <LangSwitch class="nav__lang lang--in-menu" />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky; top: 0; z-index: 60;
  background: rgba(255, 255, 255, .94);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid transparent;
  transition: box-shadow .2s ease, border-color .2s ease;
}
.hdr--scrolled { border-bottom-color: var(--line); box-shadow: 0 2px 16px rgba(18, 63, 82, .06); }
/* 頁首用比內文更寬的容器：英文導覽列比中文長得多，1180 放不下。
   高度寫成固定值（不是 min-height），保證中英文在同一寬度下高度完全一致。 */
.hdr__inner {
  display: flex; align-items: center; gap: 18px;
  height: 76px;
  max-width: 1600px;
}

.brand {
  display: flex; align-items: center; gap: 11px; color: var(--navy-800);
  flex: 0 1 auto; min-width: 0;   /* 站名長時可收縮，避免撐爆頁首 */
}
.brand__mark { flex: none; }
.brand__mark { color: var(--navy-700); display: flex; }
.brand__text { display: flex; flex-direction: column; line-height: 1.28; min-width: 0; }
.brand__text strong {
  font-family: var(--serif); font-size: 19px; letter-spacing: .02em;
  overflow-wrap: break-word;
}
.brand__text small { order: -1; font-size: 12px; color: var(--ink-2); font-weight: 500; letter-spacing: .08em; }

.hdr__acts { display: flex; align-items: center; gap: 10px; margin-left: auto; order: 3; }
.hdr__toggle {
  display: none; background: none; border: 1px solid var(--line);
  border-radius: 10px; padding: 7px; color: var(--navy-800); cursor: pointer;
}
.nav__lang { display: none; }

.nav { margin-left: auto; order: 2; }
.nav__list { display: flex; align-items: center; gap: 2px; list-style: none; }
.nav__item { position: relative; }
.nav__link {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 9px 11px; border-radius: 9px;
  font-size: 14.5px; color: var(--ink); white-space: nowrap; transition: all .16s ease;
}
.nav__link:hover { background: var(--cream-2); color: var(--navy-800); }
.nav__link--active { color: var(--navy-700); font-weight: 500; }
.nav__link--active::after {
  content: ''; position: absolute; left: 11px; right: 11px; bottom: 2px;
  height: 2px; border-radius: 2px; background: var(--navy-600);
}
.nav__caret { transform: rotate(90deg); opacity: .55; }
.nav__ext { opacity: .6; }

.nav__sub {
  position: absolute; top: calc(100% + 4px); left: 0; min-width: 210px;
  background: #fff; border: 1px solid var(--line); border-radius: 12px;
  box-shadow: var(--shadow-md); padding: 6px; list-style: none;
  opacity: 0; visibility: hidden; transform: translateY(-6px);
  transition: all .16s ease;
}
.nav__item--has-sub:hover .nav__sub,
.nav__item--has-sub:focus-within .nav__sub { opacity: 1; visibility: visible; transform: none; }
.nav__sub a {
  display: block; padding: 8px 12px; border-radius: 8px; font-size: 14px; color: var(--ink);
}
.nav__sub a:hover { background: var(--cream-2); color: var(--navy-700); }

/* 導覽列加入「中大導師制度」後，英文在 1281–1600px 放不下完整站名＋副標。
   這段寬度兩種語言一起收緊（隱藏副標、縮小字級與間距），維持中英文版面一致。 */
@media (max-width: 1600px) and (min-width: 1281px) {
  .hdr__inner { gap: 14px; }
  .nav__link { padding: 9px 8px; font-size: 14px; }
  .nav__link--active::after { left: 8px; right: 8px; }
  .brand__text strong { font-size: 17px; }
}

/* 斷點兩種語言共用：英文導覽列約需 1273px，故訂在 1280px。
   共用同一個斷點才能保證切換語言時版面模式與高度都不變。 */
@media (max-width: 1280px) {
  .hdr__inner { height: 68px; }
  .hdr__toggle { display: block; }
  .hdr__acts { flex: none; }
  .hdr__lang { display: none; }
  .nav__lang { display: inline-flex; margin: 4px 12px 0; }
  .brand__text strong { font-size: 17px; }
  .brand__text small { font-size: 11.5px; }
  .nav {
    position: absolute; top: 100%; left: 0; right: 0; order: 4;
    background: #fff; border-bottom: 1px solid var(--line);
    box-shadow: var(--shadow-md); max-height: 0; overflow: hidden; transition: max-height .25s ease;
  }
  .nav--open { max-height: 80vh; overflow-y: auto; }
  .nav__list { flex-direction: column; align-items: stretch; gap: 0; padding: 8px 12px 8px; }
  .nav__link { padding: 12px 10px; border-radius: 8px; }
  .nav__link--active::after { display: none; }
  .nav__caret { display: none; }
  .nav__sub {
    position: static; opacity: 1; visibility: visible; transform: none;
    border: none; box-shadow: none; padding: 0 0 6px 14px; min-width: 0;
    border-left: 2px solid var(--line); margin-left: 10px;
  }
  .nav__sub a { padding: 8px 10px; color: var(--ink-2); }
}

@media (max-width: 480px) {
  .hdr__inner { gap: 10px; }
  .brand { gap: 8px; }
  .brand__text strong { font-size: 15.5px; }
  .brand__mark svg { width: 32px; height: 32px; }
}
</style>
