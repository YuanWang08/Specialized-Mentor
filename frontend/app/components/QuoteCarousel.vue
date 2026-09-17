<script setup lang="ts">
/**
 * 學生心得輪播（手動切換，不自動播放）。
 *
 * 版面：中間一張放大，左右各兩張依序縮小淡出；箭頭在左右兩側，下方圓點可直接跳到某一則。
 * 頭尾相接，可一直往同一方向切換。
 *
 * 無障礙（參考 WAI-ARIA APG 的 Carousel 模式）：
 * - 不自動播放，所以不需要暫停鈕（WCAG 2.2.2）。
 * - 外層 aria-roledescription="輪播"，每張 role="group"＋aria-roledescription="則"。
 * - 只有中間那張對輔助科技開放；兩側縮小的卡片設 aria-hidden（卡片內沒有可聚焦元素，所以安全）。
 *   不用 inert：inert 連滑鼠點擊都會擋掉，點兩側卡片就無法切換。
 * - 切換時以畫面上看不到的 aria-live 區域播報「第幾則」。
 * - 焦點在輪播內時，鍵盤左右鍵可切換；手機可左右滑動。
 */
import type { Testimonial } from '~/data/testimonials'

const props = defineProps<{ items: Testimonial[] }>()
const { t } = useI18n()

const n = computed(() => props.items.length)
const active = ref(0)

/** 第 i 張相對於中間那張的位置：0 是中間，負數在左、正數在右（頭尾相接） */
const offset = (i: number) => {
  let d = (i - active.value + n.value) % n.value
  if (d > n.value / 2) d -= n.value
  return d
}

/**
 * 每一格的縮放與水平位移（以中間卡片寬為 1）。
 * 位移依「前一張的一半＋間距＋這一張的一半」累加，卡片縮小後彼此的間距仍然一致。
 */
const SCALE = [1, 0.88, 0.76]
const GAP = 0.06
const SHIFT = [0, 0.5 + GAP + SCALE[1]! / 2, 0.5 + GAP + SCALE[1]! + GAP + SCALE[2]! / 2]

const slideStyle = (i: number) => {
  const d = offset(i)
  const a = Math.min(Math.abs(d), 3)
  const scale = a <= 2 ? SCALE[a]! : 0.7
  const shift = a <= 2 ? SHIFT[a]! : SHIFT[2]! + 0.5
  return {
    '--x': Math.sign(d) * shift,
    '--s': scale,
    // 看得到的卡片一律不透明：半透明會讓文字對比低於 AA，深度感改靠縮放與舞台邊緣淡出
    '--o': a <= 2 ? 1 : 0,
    '--z': 10 - a,
  }
}

const go = (i: number) => {
  active.value = (i + n.value) % n.value
}
const prev = () => go(active.value - 1)
const next = () => go(active.value + 1)

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  else if (e.key === 'ArrowRight') { e.preventDefault(); next() }
}

/** 手機滑動：水平位移超過 40px 才算切換，避免跟上下捲動搶手勢 */
let startX = 0
let startY = 0
/** 剛滑動過：放開手指時瀏覽器還會補發一次 click，落在旁邊的卡片上會把畫面又切回去，要忽略 */
let swiped = false
const onPointerDown = (e: PointerEvent) => {
  startX = e.clientX
  startY = e.clientY
  swiped = false
}
const onPointerUp = (e: PointerEvent) => {
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    swiped = true;
    (dx < 0 ? next : prev)()
  }
}
const onSlideClick = (i: number) => {
  if (swiped) {
    swiped = false
    return
  }
  if (offset(i) !== 0) go(i)
}
</script>

<template>
  <section
    class="qs"
    aria-roledescription="carousel"
    :aria-label="t('home.voicesCarousel')"
    @keydown="onKey"
  >
    <div class="qs__view">
      <div class="qs__stage" @pointerdown="onPointerDown" @pointerup="onPointerUp">
        <div
          v-for="(q, i) in items"
          :key="q.id"
          class="qs__slide"
          :class="{ 'qs__slide--active': offset(i) === 0, 'qs__slide--far': Math.abs(offset(i)) > 2 }"
          :style="slideStyle(i)"
          role="group"
          :aria-roledescription="t('home.voicesSlide')"
          :aria-label="t('home.voicesGoTo', { i: i + 1, n })"
          :aria-hidden="offset(i) !== 0 ? 'true' : undefined"
          @click="onSlideClick(i)"
        >
          <TestimonialCard :item="q" clamp />
        </div>
      </div>

      <button type="button" class="qs__arrow qs__arrow--prev" :aria-label="t('home.voicesPrev')" @click="prev">
        <AppIcon name="arrow" :size="20" />
      </button>
      <button type="button" class="qs__arrow qs__arrow--next" :aria-label="t('home.voicesNext')" @click="next">
        <AppIcon name="arrow" :size="20" />
      </button>
    </div>

    <div class="qs__dots">
      <button
        v-for="(q, i) in items"
        :key="q.id"
        type="button"
        class="qs__dot"
        :aria-label="t('home.voicesGoTo', { i: i + 1, n })"
        :aria-current="i === active ? 'true' : undefined"
        @click="go(i)"
      >
        <span />
      </button>
    </div>

    <p class="sr-only" aria-live="polite">{{ t('home.voicesGoTo', { i: active + 1, n }) }}</p>
  </section>
</template>

<style scoped>
.qs {
  --w: 330px;   /* 中間卡片寬度，兩側依位置縮小 */
  position: relative;
}

/* 箭頭放在 view 上、不放在 stage 裡：stage 有邊緣淡出遮罩，箭頭放裡面會一起被淡掉 */
.qs__view { position: relative; }

/* 所有卡片疊在同一格：舞台高度自動等於最高那張，不用寫死高度 */
.qs__stage {
  position: relative;
  display: grid;
  justify-items: center;
  align-items: center;
  padding-block: 18px 10px;
  overflow: hidden;
  touch-action: pan-y;
  /* 左右邊緣淡出，被裁切的外側卡片看起來比較自然 */
  mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
}
.qs__slide {
  grid-area: 1 / 1;
  width: var(--w);
  max-width: 100%;
  align-self: stretch;
  transform: translateX(calc(var(--x) * 100%)) scale(var(--s));
  opacity: var(--o);
  z-index: var(--z);
  transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.45s ease;
  cursor: pointer;
  user-select: none;
}
/* 兩格以外的卡片完全隱藏 */
.qs__slide--far { pointer-events: none; }

.qs__slide :deep(.tq) { height: 100%; transition: box-shadow 0.3s ease; }
.qs__slide--active { cursor: default; user-select: text; }
.qs__slide--active :deep(.tq) { box-shadow: var(--shadow-md); border-color: #ddd3c3; }

.qs__arrow {
  position: absolute;
  top: 50%;
  z-index: 20;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  margin-top: -23px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: #fff;
  color: var(--navy-800);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: color 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
}
.qs__arrow:hover { color: var(--navy-700); border-color: var(--navy-600); transform: scale(1.06); }
.qs__arrow--prev { left: 16px; }
.qs__arrow--next { right: 16px; }
.qs__arrow--prev :deep(svg) { transform: rotate(180deg); }

.qs__dots {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 14px;
}
/* 按鈕本身 24×24（觸控範圍），裡面的圓點才是視覺大小 */
.qs__dot {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
.qs__dot span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #c9bfae;
  transition: width 0.25s ease, background 0.25s ease;
}
.qs__dot:hover span { background: var(--navy-600); }
.qs__dot[aria-current='true'] span { width: 22px; background: var(--navy-700); }

@media (max-width: 1000px) {
  .qs { --w: 300px; }
}
/* 手機：中間一張佔大部分寬度，兩側只露出一點邊 */
@media (max-width: 640px) {
  .qs { --w: 76%; }
  .qs__stage { mask-image: none; }
  .qs__arrow { width: 38px; height: 38px; margin-top: -19px; }
  .qs__arrow--prev { left: 0; }
  .qs__arrow--next { right: 0; }
}
</style>
