<script setup lang="ts">
/**
 * 語言選擇器：平常只顯示一個地球圖示，點開才出現語言清單。
 *
 * 用 aria-haspopup="menu" + role="menu"／role="menuitem" 的選單模式，
 * 鍵盤操作：Enter／空白鍵或方向鍵開啟、上下鍵移動、Esc 關閉並把焦點還給按鈕、Tab 移出時關閉。
 */
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { t } = useI18n()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)

const items = computed(() =>
  (locales.value as any[]).map((l) => ({
    code: l.code as string,
    name: l.name as string,
    language: l.language as string,
    to: switchLocalePath(l.code),
    current: l.code === locale.value,
  })),
)

const currentName = computed(() => items.value.find((i) => i.current)?.name ?? '')

const menuLinks = () =>
  Array.from(root.value?.querySelectorAll<HTMLAnchorElement>('.lang__item') ?? [])

const focusItem = (i: number) => {
  const links = menuLinks()
  if (!links.length) return
  const idx = (i + links.length) % links.length
  links[idx]?.focus()
}

const close = (returnFocus = true) => {
  if (!open.value) return
  open.value = false
  if (returnFocus) nextTick(() => trigger.value?.focus())
}

const toggle = () => {
  open.value = !open.value
  if (open.value) nextTick(() => focusItem(0))
}

const onTriggerKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    open.value = true
    nextTick(() => focusItem(e.key === 'ArrowDown' ? 0 : menuLinks().length - 1))
  }
}

const onMenuKey = (e: KeyboardEvent) => {
  const links = menuLinks()
  const at = links.indexOf(document.activeElement as HTMLAnchorElement)
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusItem(at + 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusItem(at - 1)
  } else if (e.key === 'Home') {
    e.preventDefault()
    focusItem(0)
  } else if (e.key === 'End') {
    e.preventDefault()
    focusItem(links.length - 1)
  }
}

/** 點到元件外面、或焦點移出元件時關閉 */
const onDocPointer = (e: Event) => {
  if (open.value && root.value && !root.value.contains(e.target as Node)) close(false)
}
const onFocusIn = (e: FocusEvent) => {
  if (open.value && root.value && !root.value.contains(e.target as Node)) close(false)
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointer)
  document.addEventListener('focusin', onFocusIn)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer)
  document.removeEventListener('focusin', onFocusIn)
})

const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <div ref="root" class="lang" @keydown="onMenuKey">
    <button
      ref="trigger"
      type="button"
      class="lang__btn"
      :class="{ 'lang__btn--on': open }"
      :aria-label="`${t('lang.label')}（${currentName}）`"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
      @keydown="onTriggerKey"
    >
      <AppIcon name="globe" :size="19" />
    </button>

    <ul v-show="open" class="lang__menu" role="menu" :aria-label="t('lang.label')">
      <li v-for="item in items" :key="item.code" role="none">
        <NuxtLink
          :to="item.to"
          class="lang__item"
          :class="{ 'lang__item--current': item.current }"
          role="menuitem"
          :lang="item.language"
          :hreflang="item.language"
          :aria-current="item.current ? 'true' : undefined"
          @click="close(false)"
        >
          <span>{{ item.name }}</span>
          <AppIcon v-if="item.current" name="check" :size="15" class="lang__tick" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang { position: relative; flex: none; }

.lang__btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: #fff;
  color: var(--navy-800);
  cursor: pointer;
  transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease;
}
.lang__btn:hover,
.lang__btn--on {
  border-color: var(--navy-600);
  color: var(--navy-700);
}

.lang__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 10;
  min-width: 150px;
  padding: 6px;
  list-style: none;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}
.lang__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 14.5px;
  color: var(--ink);
  white-space: nowrap;
}
.lang__item:hover { background: var(--cream-2); color: var(--navy-700); }
.lang__item--current { color: var(--navy-700); font-weight: 500; }
.lang__tick { color: var(--navy-600); flex: none; }

/* 漢堡選單內：語言鈕在選單底部，往「上」且往左展開，
   才不會掉出可捲動的選單面板之外。 */
.lang--in-menu .lang__menu {
  right: auto;
  left: 0;
  top: auto;
  bottom: calc(100% + 8px);
}
</style>
