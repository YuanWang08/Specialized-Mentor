<script setup lang="ts">
import { books } from '~/data/books'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()

useHead({ title: t('books.title') })
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
              <a
                v-if="b.link"
                :href="b.link"
                target="_blank"
                rel="noopener"
                class="btn btn--ghost bk__btn"
                :aria-label="t('books.goToBookOf', { title: tc(b.title) })"
              >
                {{ t('books.goToBook') }} <AppIcon name="external" :size="13" />
              </a>
              <span v-else class="bk__none">{{ t('books.noPage') }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
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
</style>
