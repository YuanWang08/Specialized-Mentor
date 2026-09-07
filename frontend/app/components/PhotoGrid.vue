<script setup lang="ts">
import type { Photo } from '~/data/gallery'
import { typeMap } from '~/data/mentorTypes'
import { useLocalized } from '~/data/i18n'

const props = defineProps<{ photos: Photo[]; showType?: boolean }>()
const { t: tc } = useLocalized()
const { t } = useI18n()

/** 中文在姓名後加「老師」，英文不加（頭銜已在他處說明） */
const teacherOf = (p: Photo) =>
  p.teacher ? tc(p.teacher) + t('gallery.teacherSuffix') : ''
const active = ref<number | null>(null)

const dialog = ref<HTMLElement | null>(null)
/** 開燈箱前記住焦點在哪，關閉時還回去（WCAG 2.4.3 焦點順序） */
let lastFocused: HTMLElement | null = null

const open = (i: number) => {
  lastFocused = (import.meta.client ? (document.activeElement as HTMLElement) : null)
  active.value = i
}
const close = () => {
  active.value = null
  nextTick(() => lastFocused?.focus())
}
const step = (d: number) => {
  if (active.value === null) return
  active.value = (active.value + d + props.photos.length) % props.photos.length
}

/** 目前放大中的照片，避免在模板裡寫 photos[active]! 這種非空斷言 */
const shot = computed(() => (active.value === null ? null : props.photos[active.value] ?? null))

const caption = (p: Photo) =>
  [tc(p.title), p.date, teacherOf(p)].filter(Boolean).join(' · ')

/** 把 Tab 鍵鎖在對話框內，避免焦點跑到被遮住的頁面上 */
const trap = (e: KeyboardEvent) => {
  const root = dialog.value
  if (!root) return
  const items = [...root.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')]
  if (!items.length) return
  const first = items[0]!
  const last = items[items.length - 1]!
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

const onKey = (e: KeyboardEvent) => {
  if (active.value === null) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'Tab') trap(e)
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (import.meta.client) document.body.style.overflow = ''
})

watch(active, (v) => {
  if (!import.meta.client) return
  document.body.style.overflow = v === null ? '' : 'hidden'
  if (v !== null) nextTick(() => dialog.value?.querySelector<HTMLElement>('button')?.focus())
})
</script>

<template>
  <div>
    <ul class="pg">
      <li v-for="(p, i) in photos" :key="p.id" class="pg__item">
        <button
          type="button"
          class="pg__btn card card--hover"
          :aria-label="t('gallery.zoom', { caption: caption(p) })"
          @click="open(i)"
        >
          <!-- 按鈕本身已具名（放大檢視：標題…），下方也有可見標題，此處圖片視為裝飾，
               避免螢幕閱讀器把同一句話唸三次 -->
          <img :src="p.src" alt="" :width="p.w" :height="p.h" loading="lazy" />
          <span class="pg__cap">
            <span v-if="showType" class="chip" :class="`chip--${p.type}`">
              {{ tc(typeMap[p.type].name) }}
            </span>
            <strong>{{ tc(p.title) }}</strong>
            <span v-if="p.date || p.teacher" class="pg__meta">
              {{ p.date }}<template v-if="p.date && p.teacher"> ｜ </template>
              <template v-if="p.teacher">{{ teacherOf(p) }}</template>
            </span>
          </span>
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <div
        v-if="active !== null"
        ref="dialog"
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="t('gallery.dialogLabel')"
        @click.self="close"
      >
        <button type="button" class="lb__x" :aria-label="t('gallery.closeDialog')" @click="close">
          <AppIcon name="close" :size="26" />
        </button>
        <button type="button" class="lb__nav lb__nav--prev" :aria-label="t('gallery.prevPhoto')" @click="step(-1)">
          <AppIcon name="arrow" :size="26" style="transform: rotate(180deg)" />
        </button>
        <figure v-if="shot" class="lb__fig">
          <img :src="shot.src" :alt="tc(shot.title)" />
          <figcaption>
            <strong>{{ tc(shot.title) }}</strong>
            <span>
              <template v-if="shot.date">{{ shot.date }}</template>
              <template v-if="shot.teacher">　{{ teacherOf(shot) }}</template>
              　{{ t('gallery.position', { i: (active ?? 0) + 1, n: photos.length }) }}
            </span>
          </figcaption>
        </figure>
        <button type="button" class="lb__nav lb__nav--next" :aria-label="t('gallery.nextPhoto')" @click="step(1)">
          <AppIcon name="arrow" :size="26" />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.pg {
  list-style: none;
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fill, minmax(min(238px, 100%), 1fr));
}
.pg__btn {
  width: 100%;
  padding: 0;
  border: 1px solid var(--line);
  background: #fff;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  font: inherit;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pg__btn img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; background: var(--cream-2); }
.pg__cap { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 5px; align-items: flex-start; }
.pg__cap strong { font-size: 14.5px; font-weight: 500; color: var(--navy-800); line-height: 1.6; }
.pg__meta { font-size: 12.5px; color: var(--ink-3); }

.lb {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(8, 28, 37, 0.95);
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  padding: 24px 8px;
}
.lb__fig { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 14px; min-width: 0; }
.lb__fig img { max-width: 100%; max-height: 78vh; object-fit: contain; border-radius: 8px; }
.lb__fig figcaption { text-align: center; color: #eaf2f5; display: flex; flex-direction: column; gap: 4px; }
.lb__fig strong { font-size: 16px; font-weight: 500; }
.lb__fig span { font-size: 13px; color: #a9c6d0; }
.lb__x { position: absolute; top: 18px; right: 20px; }
.lb__x,
.lb__nav {
  background: rgba(255, 255, 255, 0.14);
  border: none;
  color: #fff;
  cursor: pointer;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: background 0.15s ease;
}
.lb__x:hover,
.lb__nav:hover { background: rgba(255, 255, 255, 0.28); }
.lb__x:focus-visible,
.lb__nav:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
.lb__nav--prev { justify-self: start; }
.lb__nav--next { justify-self: end; }

@media (max-width: 640px) {
  .pg { grid-template-columns: repeat(auto-fill, minmax(min(150px, 100%), 1fr)); gap: 12px; }
  .pg__cap { padding: 10px; }
  .lb { grid-template-columns: 44px 1fr 44px; }
  .lb__x,
  .lb__nav { width: 38px; height: 38px; }
}
</style>
