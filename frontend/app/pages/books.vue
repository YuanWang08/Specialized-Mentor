<script setup lang="ts">
import { books, type Book } from '~/data/books'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()

useHead({ title: t('books.title') })

/**
 * 沒有線上書籍頁面的書（目前只有 2019《導路》），按鈕改開彈窗顯示書籍資訊。
 * 用原生 <dialog>.showModal()：瀏覽器內建焦點鎖定、Esc 關閉、關閉後焦點回到按鈕，
 * 背景內容也會自動變成 inert，不必自己實作。
 */
const dialog = ref<HTMLDialogElement | null>(null)
const active = ref<Book | null>(null)

const openDetails = (b: Book) => {
  active.value = b
  nextTick(() => dialog.value?.showModal())
}
const closeDetails = () => dialog.value?.close()
/** 點到彈窗外的半透明背景時關閉（點擊目標會是 dialog 本身） */
const onDialogClick = (e: MouseEvent) => {
  if (e.target === dialog.value) closeDetails()
}
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="PICTURE BOOKS"
      eyebrow-lang="en"
      :title="t('books.title')"
      :lead="t('books.lead')"
    />

    <section class="section section--white">
      <div class="wrap">
        <ul class="shelf">
          <li v-for="b in books" :key="b.year" class="bk card card--hover">
            <div class="bk__cover">
              <img v-if="b.cover" :src="b.cover" :alt="tc(b.title)" loading="lazy" />
              <PlaceholderBox
                v-else
                ratio="3 / 4"
                icon="book"
                :label="t('common.coverPending')"
                :note="b.year"
              />
              <span class="bk__year">{{ b.year }}</span>
            </div>
            <div class="bk__body">
              <h2 class="bk__title">{{ tc(b.title) }}</h2>
              <p v-if="b.subtitle" class="bk__sub">{{ tc(b.subtitle) }}</p>
              <p class="bk__author">{{ tc(b.author) }}</p>
              <!-- 無障礙名稱以可見文字開頭（WCAG 2.5.3），補充說明放在 sr-only -->
              <a
                v-if="b.link"
                :href="b.link"
                target="_blank"
                rel="noopener"
                class="btn btn--ghost bk__btn"
              >
                {{ t('books.goToBook') }}<span class="sr-only">{{ t('books.goToBookOf', { title: tc(b.title) }) }}{{ t('common.newWindow') }}</span>
                <AppIcon name="external" :size="13" />
              </a>
              <button
                v-else-if="b.details"
                type="button"
                class="btn btn--ghost bk__btn"
                aria-haspopup="dialog"
                @click="openDetails(b)"
              >
                {{ t('books.goToBook') }}<span class="sr-only">{{ t('books.detailsOf', { title: tc(b.title) }) }}</span>
                <AppIcon name="book" :size="14" />
              </button>
              <span v-else class="bk__none">{{ t('books.noPage') }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <dialog
      ref="dialog"
      class="bd"
      aria-labelledby="bd-title"
      @click="onDialogClick"
      @close="active = null"
    >
      <div v-if="active" class="bd__panel">
        <button type="button" class="bd__close" :aria-label="t('books.close')" @click="closeDetails">
          <AppIcon name="close" :size="20" />
        </button>
        <div class="bd__cover">
          <img v-if="active.cover" :src="active.cover" alt="" />
        </div>
        <div class="bd__body">
          <span class="bd__year">{{ active.year }}</span>
          <h2 id="bd-title" class="bd__title">{{ tc(active.title) }}</h2>
          <p v-if="active.subtitle" class="bd__sub">{{ tc(active.subtitle) }}</p>
          <dl v-if="active.details" class="bd__meta">
            <div>
              <dt class="sr-only">{{ t('books.author') }}</dt>
              <dd>{{ tc(active.author) }}</dd>
            </div>
            <div>
              <dt>{{ t('books.published') }}</dt>
              <dd><time :datetime="active.details.date">{{ active.details.date }}</time></dd>
            </div>
            <div>
              <dt>{{ t('books.publisher') }}</dt>
              <dd>{{ tc(active.details.publisher) }}</dd>
            </div>
          </dl>
          <h3 v-if="active.details" class="bd__h">{{ t('books.intro') }}</h3>
          <p v-if="active.details" class="bd__intro">{{ tc(active.details.intro) }}</p>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.shelf {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
  gap: 22px;
  margin-top: 28px;
}
.bk { overflow: hidden; display: flex; flex-direction: column; }
.bk__cover {
  position: relative;
  background: #fff;
  border-bottom: 1px solid var(--line);
}
/* 各年度封面比例差很多（平面書封 0.77 到立體書照 1.49）。
   用 object-fit: cover 會把橫幅封面的書名裁掉，改用 contain 完整呈現，
   四周留白由固定的框比例吸收。 */
.bk__cover img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  padding: 14px;
}
.bk__year {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--navy-800);
  color: #fff;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  padding: 3px 11px;
  border-radius: 999px;
}
.bk__body { padding: 16px 18px 20px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
.bk__title { font-family: var(--serif); font-size: 18px; color: var(--navy-800); }
.bk__sub { margin: 0; font-size: 12.5px; color: var(--ink-3); line-height: 1.7; }
.bk__author { margin: 0; font-size: 13px; color: var(--ink-2); }
.bk__btn { margin-top: auto; padding: 8px 14px; font-size: 13.5px; justify-content: center; }
.bk__none { margin-top: auto; font-size: 12.5px; color: var(--ink-3); padding-top: 8px; }
.bk__btn { font-family: inherit; }

/* ===== 書籍資訊彈窗 ===== */
.bd {
  width: min(760px, calc(100% - 32px));
  max-height: calc(100dvh - 48px);
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  background: #fff;
  color: var(--ink);
  box-shadow: 0 24px 70px rgba(12, 47, 61, 0.3);
  overflow: auto;
  overscroll-behavior: contain;
}
.bd::backdrop { background: rgba(12, 47, 61, 0.55); backdrop-filter: blur(3px); }
.bd[open] { animation: bd-in 0.2s ease; }
@keyframes bd-in { from { opacity: 0; transform: translateY(10px) scale(0.98); } }

.bd__panel { position: relative; display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); }
.bd__close {
  position: absolute; top: 12px; right: 12px; z-index: 1;
  display: grid; place-items: center; width: 40px; height: 40px;
  border: 1px solid var(--line); border-radius: 50%;
  background: #fff; color: var(--navy-800); cursor: pointer;
}
.bd__close:hover { border-color: var(--navy-600); color: var(--navy-700); }
.bd__cover {
  display: grid; place-items: center;
  padding: 28px 24px;
  background: var(--cream-2);
  border-right: 1px solid var(--line);
}
.bd__cover img { width: 100%; border-radius: 6px; box-shadow: var(--shadow-md); background: #fff; }
.bd__body { padding: 30px 30px 32px; }
.bd__year {
  display: inline-block; padding: 2px 11px; border-radius: 999px;
  background: var(--navy-800); color: #fff; font-size: 12.5px; letter-spacing: 0.06em;
}
.bd__title { margin-top: 12px; font-family: var(--serif); font-size: 30px; color: var(--navy-800); padding-right: 36px; }
.bd__sub { margin: 4px 0 0; font-size: 14px; color: var(--ink-2); }
.bd__meta {
  margin: 18px 0 0; padding: 14px 0;
  border-block: 1px solid var(--line);
  display: grid; gap: 6px; font-size: 14px;
}
.bd__meta div { display: flex; gap: 12px; }
.bd__meta dt { flex: none; min-width: 4.5em; color: var(--ink-3); }
.bd__meta dd { margin: 0; color: var(--ink); }
.bd__h { margin-top: 18px; font-size: 14.5px; color: var(--navy-800); }
.bd__intro { margin: 6px 0 0; font-size: 14.5px; line-height: 2; color: var(--ink-2); }

@media (min-width: 481px) and (max-width: 680px) {
  .shelf { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  /* 雙欄時項目數為奇數：最後一個置中 */
  .shelf > li:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc((100% - 22px) / 2);
  }
}
@media (max-width: 680px) {
  .bd__panel { grid-template-columns: 1fr; }
  .bd__cover { border-right: none; border-bottom: 1px solid var(--line); padding: 56px 20px 20px; }
  .bd__body { padding: 22px 20px 26px; }
  .bd__title { font-size: 25px; padding-right: 0; }
}
</style>
