<script setup lang="ts">
import { typeMap } from '~/data/mentorTypes'
import {
  systemTitle,
  systemLead,
  systemIntro,
  systemFacts,
  systemChapters,
  systemClosing,
} from '~/data/system'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc, tAll } = useLocalized()
const localePath = useLocalePath()

useHead({ title: t('nav.system') })

const chapters = systemChapters.map((c) => ({ ...c, meta: typeMap[c.type] }))
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="MENTORING SYSTEM"
      eyebrow-lang="en"
      :title="tc(systemTitle)"
      :lead="tc(systemLead)"
    />

    <!-- ===== 制度緣起 ===== -->
    <section class="section section--white">
      <div class="wrap origin">
        <div class="origin__text">
          <h2 class="origin__title">{{ t('system.originTitle') }}</h2>
          <p v-for="(p, i) in tAll(systemIntro)" :key="i">{{ p }}</p>
        </div>
        <ul class="facts" :aria-label="t('system.factsLabel')">
          <li v-for="(f, i) in systemFacts" :key="i" class="facts__item">
            <span class="facts__value">
              {{ tc(f.value) }}<em v-if="tc(f.unit)">{{ tc(f.unit) }}</em>
            </span>
            <span class="facts__label">{{ tc(f.label) }}</span>
          </li>
        </ul>
      </div>

      <nav class="wrap jump" :aria-label="t('system.jumpLabel')">
        <ol class="jump__list">
          <li v-for="(c, i) in chapters" :key="c.type">
            <a
              :href="`#${c.type}`"
              class="jump__link"
              :style="{ '--accent': c.meta.color, '--accent-text': c.meta.colorText }"
            >
              <span class="jump__no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="jump__icon"><AppIcon :name="c.meta.icon" :size="18" /></span>
              <span class="jump__name">{{ tc(c.meta.name) }}</span>
            </a>
          </li>
        </ol>
      </nav>
    </section>

    <!-- ===== 五類專項導師 ===== -->
    <section class="section section--tint">
      <div class="wrap">
        <SectionHeading :title="t('system.chaptersTitle')" :sub="t('system.chaptersSub')" />

        <div class="chapters">
          <article
            v-for="(c, i) in chapters"
            :id="c.type"
            :key="c.type"
            class="ch card"
            :style="{ '--accent': c.meta.color, '--accent-text': c.meta.colorText, '--soft': `var(--c-${c.type}-soft)` }"
          >
            <header class="ch__side">
              <span class="ch__no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="ch__icon"><AppIcon :name="c.meta.icon" :size="28" /></span>
              <h3 class="ch__name">{{ tc(c.meta.name) }}</h3>
              <p class="ch__tagline">{{ tc(c.meta.tagline) }}</p>
              <NuxtLink :to="localePath(`/mentors/${c.type}`)" class="ch__link">
                {{ t('about.typePage', { name: tc(c.meta.name) }) }}
                <AppIcon name="arrow" :size="12" />
              </NuxtLink>
            </header>

            <div class="ch__main">
              <p v-for="(p, j) in tAll(c.body)" :key="j" class="ch__body">{{ p }}</p>

              <ul v-if="c.stats" class="ch__stats" :class="`ch__stats--${c.stats.length}`">
                <li v-for="(s, j) in c.stats" :key="j">
                  <strong>{{ s.value }}</strong><em>{{ tc(s.unit) }}</em>
                  <span>{{ tc(s.label) }}</span>
                </li>
              </ul>

              <div v-if="c.steps" class="ch__steps">
                <p class="ch__steps-label">{{ tc(c.steps.label) }}</p>
                <ol>
                  <li v-for="(s, j) in c.steps.items" :key="j">
                    <span class="ch__step-no" aria-hidden="true">{{ j + 1 }}</span>
                    {{ tc(s) }}
                  </li>
                </ol>
              </div>

              <figure v-if="c.quote" class="ch__quote">
                <blockquote>
                  <p>{{ tc(c.quote) }}</p>
                </blockquote>
                <figcaption>— {{ t('system.studentSays') }}</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== 結語 ===== -->
    <section class="closing">
      <div class="wrap closing__inner">
        <p class="closing__num" aria-hidden="true">
          140<em>{{ t('system.closingUnit') }}</em>
        </p>
        <p class="closing__text">{{ tc(systemClosing) }}</p>
        <div class="closing__acts">
          <NuxtLink :to="localePath('/outstanding')" class="btn closing__btn">
            {{ t('system.toOutstanding') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
          <NuxtLink :to="localePath('/results')" class="btn closing__btn closing__btn--line">
            {{ t('system.toResults') }} <AppIcon name="arrow" :size="12" class="btn__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== 制度緣起 ===== */
.origin {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 56px;
  align-items: center;
}
.origin__title {
  font-family: var(--serif);
  font-size: 24px;
  color: var(--navy-800);
  margin-bottom: 16px;
  padding-left: 14px;
  border-left: 4px solid var(--navy-600);
}
.origin__text p { font-size: 16px; line-height: 2.15; color: var(--ink-2); }
.origin__text p:last-child { margin-bottom: 0; }

.facts {
  list-style: none;
  display: grid;
  gap: 12px;
}
.facts__item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 18px 22px;
  border-radius: var(--radius);
  background: var(--navy-800);
  color: #fff;
}
.facts__item::after {
  content: '';
  position: absolute;
  right: -26px;
  top: -26px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
}
.facts__item:nth-child(2) { background: var(--navy-700); }
.facts__value { font-size: 34px; font-weight: 700; line-height: 1.2; letter-spacing: 0.01em; }
.facts__value em { font-style: normal; font-size: 14px; font-weight: 500; margin-left: 6px; color: #d3e5eb; }
.facts__label { font-size: 13.5px; color: #c4dbe2; }

/* ===== 快速前往 ===== */
.jump { margin-top: 46px; }
.jump__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}
.jump__link {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-bottom: 3px solid var(--accent);
  border-radius: 12px;
  background: #fff;
  color: var(--navy-800);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.jump__link:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); color: var(--accent-text); }
.jump__no { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--accent-text); }
.jump__icon { color: var(--accent-text); display: flex; flex: none; }
.jump__name { font-size: 14.5px; font-weight: 500; line-height: 1.5; min-width: 0; }

/* ===== 章節 ===== */
.chapters { display: grid; gap: 24px; }
.ch {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  overflow: hidden;
  scroll-margin-top: 96px;
}
.ch__side {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 30px 26px;
  background: var(--soft);
  border-right: 1px solid var(--line);
}
.ch__side::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  background: var(--accent);
}
.ch__no {
  position: absolute;
  top: 14px;
  right: 18px;
  font-family: var(--serif);
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
  opacity: 0.22;
}
.ch__icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  margin-bottom: 8px;
}
.ch__name { font-family: var(--serif); font-size: 22px; color: var(--accent-text); }
.ch__tagline { margin: 0; font-size: 14px; line-height: 1.75; color: var(--ink-2); text-wrap: balance; }
.ch__link {
  margin-top: auto;
  padding-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13.5px;
  color: var(--accent-text);
}
.ch__link:hover { text-decoration: underline; text-underline-offset: 3px; color: var(--accent-text); }

.ch__main { padding: 30px 34px 32px; display: flex; flex-direction: column; gap: 20px; }
.ch__body { margin: 0; font-size: 15.5px; line-height: 2.1; color: var(--ink-2); }
.ch__body + .ch__body { margin-top: -6px; }

.ch__stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(170px, 100%), 1fr));
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
}
.ch__stats--1 { max-width: 260px; }
.ch__stats li {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 2px 5px;
  padding: 14px 18px;
  background: #fff;
  box-shadow: -1px 0 0 var(--line);
}
.ch__stats strong { font-size: 27px; line-height: 1.2; color: var(--accent-text); }
.ch__stats em { font-style: normal; font-size: 13px; color: var(--ink-2); }
.ch__stats span { width: 100%; font-size: 13px; color: var(--ink-3); line-height: 1.6; }

.ch__steps-label { margin: 0 0 10px; font-size: 13.5px; font-weight: 500; color: var(--ink-2); }
.ch__steps ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px 0; }
.ch__steps li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px 7px 8px;
  border-radius: 999px;
  background: var(--soft);
  color: var(--accent-text);
  font-size: 14.5px;
  font-weight: 500;
}
/* 步驟之間的箭頭 */
.ch__steps li + li { margin-left: 28px; position: relative; }
.ch__steps li + li::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  width: 12px;
  height: 12px;
  border-top: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
  transform: translateY(-50%) rotate(45deg);
  opacity: 0.6;
}
.ch__step-no {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--accent-text);
  color: #fff;
  font-size: 12.5px;
}

.ch__quote {
  margin: 0;
  position: relative;
  padding: 18px 22px 16px 58px;
  border-radius: 12px;
  background: var(--cream-2);
}
.ch__quote::before {
  content: '“';
  position: absolute;
  left: 16px;
  top: 2px;
  font-family: Georgia, var(--serif);
  font-size: 58px;
  line-height: 1;
  color: var(--accent);
}
.ch__quote blockquote { margin: 0; }
.ch__quote p { margin: 0; font-family: var(--serif); font-size: 16px; line-height: 1.95; color: var(--navy-800); }
.ch__quote figcaption { margin-top: 6px; font-size: 13px; color: var(--ink-3); }

/* ===== 結語 ===== */
.closing {
  background:
    radial-gradient(circle at 12% 20%, rgba(255, 255, 255, 0.07) 0 120px, transparent 121px),
    radial-gradient(circle at 92% 90%, rgba(255, 255, 255, 0.05) 0 170px, transparent 171px),
    var(--navy-800);
  color: #fff;
  padding-block: 70px;
  /* 頁尾有 8px 的上外距，深色區塊直接接上頁尾，不留白縫 */
  margin-bottom: -8px;
}
.closing__inner { text-align: center; max-width: 900px; }
.closing__num {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(56px, 8vw, 84px);
  font-weight: 700;
  line-height: 1;
  color: #fff;
}
.closing__num em {
  font-style: normal;
  font-family: var(--sans);
  font-size: 18px;
  font-weight: 500;
  margin-left: 8px;
  color: #cfe3e9;
}
.closing__text {
  margin: 22px auto 0;
  max-width: 40em;
  font-family: var(--serif);
  font-size: clamp(16.5px, 2vw, 19.5px);
  line-height: 2.1;
  color: #eaf3f5;
}
.closing__acts { margin-top: 30px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.closing__btn { background: #fff; color: var(--navy-800); }
.closing__btn:hover { background: var(--cream-2); color: var(--navy-800); transform: translateY(-1px); }
.closing__btn--line { background: transparent; color: #fff; border-color: rgba(255, 255, 255, 0.55); }
.closing__btn--line:hover { background: rgba(255, 255, 255, 0.1); color: #fff; border-color: #fff; }

@media (max-width: 1000px) {
  .origin { grid-template-columns: 1fr; gap: 30px; }
  .facts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .jump__list { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .ch { grid-template-columns: 1fr; }
  .ch__side {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 16px;
    row-gap: 2px;
    align-items: center;
    padding: 22px 24px;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
  .ch__side::before { inset: 0 0 auto 0; width: auto; height: 5px; }
  .ch__icon { grid-row: span 2; margin: 0; }
  .ch__name, .ch__tagline { padding-right: 56px; }
  .ch__link { grid-column: 1 / -1; margin-top: 4px; padding-top: 10px; }
}
@media (max-width: 640px) {
  .facts { grid-template-columns: 1fr; }
  .jump__list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  /* 雙欄時項目數為奇數：最後一個置中 */
  .jump__list > li:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc((100% - 12px) / 2);
  }
  .ch__stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ch__stats--1 { grid-template-columns: 1fr; }
  /* 數據表是有框線的整塊，奇數的最後一格改成佔滿整列、內容置中 */
  .ch__stats > li:last-child:nth-child(odd) { grid-column: 1 / -1; justify-content: center; text-align: center; }
  .closing__text { text-align: justify; text-align-last: left; }
  .ch__main { padding: 22px 20px 24px; }
  .ch__side { padding: 20px; }
  .ch__icon { width: 48px; height: 48px; }
  .ch__steps li + li { margin-left: 26px; }
  .ch__quote { padding: 16px 16px 14px 46px; }
  .ch__quote::before { left: 10px; font-size: 48px; }
}
@media (max-width: 400px) {
  .jump__list { grid-template-columns: 1fr; }
  .jump__list > li:last-child:nth-child(odd) { grid-column: auto; width: auto; justify-self: stretch; }
}
</style>
