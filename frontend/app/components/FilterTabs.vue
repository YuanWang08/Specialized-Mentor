<script setup lang="ts">
import { mentorTypes, type MentorTypeId } from '~/data/mentorTypes'
import { useLocalized } from '~/data/i18n'

/**
 * 類別篩選鈕。
 *
 * 刻意不用 role="tablist"／role="tab"：那組 ARIA 角色要求必須有對應的 tabpanel，
 * 且螢幕閱讀器會唸成「索引標籤 1/6」並期待用左右鍵切換。這裡實際上是「篩選開關」，
 * 所以改用一組 aria-pressed 的切換按鈕，並用 aria-live 播報篩選後的筆數。
 */
const props = defineProps<{
  modelValue: MentorTypeId | 'all'
  /** 各類別的數量，用於顯示與判斷是否為空 */
  counts: Record<string, number>
  total: number
  /** 無障礙說明，例如「依導師類別篩選傑出導師」 */
  label: string
  /** 計數單位，例如「位」「張」「則」 */
  unit: string
}>()

const emit = defineEmits<{ 'update:modelValue': [MentorTypeId | 'all'] }>()
const { t: tc } = useLocalized()
const { t } = useI18n()

/** 數量為 0 的分類不顯示：按了也沒東西，留著只是死按鈕 */
const shownTypes = computed(() => mentorTypes.filter((m) => (props.counts[m.id] ?? 0) > 0))

const current = computed(() => {
  if (props.modelValue === 'all') return t('common.all')
  const found = mentorTypes.find((m) => m.id === props.modelValue)
  return found ? tc(found.name) : ''
})
const shownCount = computed(() =>
  props.modelValue === 'all' ? props.total : props.counts[props.modelValue] ?? 0,
)
</script>

<template>
  <div>
    <div class="tabs" role="group" :aria-label="label">
      <button
        type="button"
        class="tab"
        :class="{ 'tab--on': modelValue === 'all' }"
        :aria-pressed="modelValue === 'all'"
        @click="emit('update:modelValue', 'all')"
      >
        {{ t('common.all') }} <span class="tab__n">{{ total }}</span>
      </button>
      <button
        v-for="m in shownTypes"
        :key="m.id"
        type="button"
        class="tab"
        :class="{ 'tab--on': modelValue === m.id }"
        :style="{ '--accent-text': m.colorText }"
        :aria-pressed="modelValue === m.id"
        @click="emit('update:modelValue', m.id)"
      >
        {{ tc(m.name) }} <span class="tab__n">{{ counts[m.id] || 0 }}</span>
      </button>
    </div>

    <!-- 篩選結果變動時播報給螢幕閱讀器 -->
    <p class="sr-only" role="status" aria-live="polite">
      {{ t('common.showing', { name: current, n: shownCount, unit }) }}
    </p>
  </div>
</template>

<style scoped>
.tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
.tab {
  --accent-text: var(--navy-700);
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 999px;
  padding: 8px 16px;
  font: inherit;
  font-size: 14px;
  color: var(--ink-2);
  cursor: pointer;
  transition: all 0.16s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.tab__n { font-size: 12px; color: var(--ink-3); }
.tab:hover { border-color: var(--accent-text); color: var(--accent-text); }
.tab--on { background: var(--accent-text); border-color: var(--accent-text); color: #fff; }
/* rgba 白會降低對比，改用實色淺藍灰，對加深底色仍有 4.5:1 以上 */
.tab--on .tab__n { color: #e4eef2; }
</style>
