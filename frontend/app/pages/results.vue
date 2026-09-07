<script setup lang="ts">
import { typeMap } from '~/data/mentorTypes'
import { results, resultsYear, kpis, kpiPeriod, kpiIntro } from '~/data/results'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc, tAll } = useLocalized()
const localePath = useLocalePath()

const year = computed(() => tc(resultsYear))
useHead(() => ({ title: t('results.title', { year: year.value }) }))
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="RESULTS"
      eyebrow-lang="en"
      :title="t('results.title', { year })"
      :lead="t('results.lead')"
    />

    <!-- 各類別成果 -->
    <section class="section section--white">
      <div class="wrap">
        <div class="rlist">
          <article
            v-for="r in results"
            :key="r.type"
            class="rcard card"
            :style="{ '--accent': typeMap[r.type].color, '--accent-text': typeMap[r.type].colorText }"
            :id="r.type"
          >
            <header class="rcard__head">
              <span class="rcard__icon"><AppIcon :name="typeMap[r.type].icon" :size="24" /></span>
              <h2>{{ tc(typeMap[r.type].name) }}</h2>
              <NuxtLink :to="localePath(`/mentors/${r.type}`)" class="rcard__link">
                {{ t('results.typePage') }} <AppIcon name="arrow" :size="12" />
              </NuxtLink>
            </header>

            <ul class="rcard__stats">
              <li v-for="(s, i) in r.stats" :key="i">
                <span class="rcard__val">{{ s.value }}<em>{{ tc(s.unit) }}</em></span>
                <span class="rcard__cap">{{ tc(s.label) }}</span>
              </li>
            </ul>

            <p v-for="(p, i) in tAll(r.body)" :key="i" class="rcard__body">{{ p }}</p>

            <div v-if="r.awards" class="awards">
              <h3><AppIcon name="trophy" :size="17" /> {{ t('results.awards') }}</h3>
              <div class="awards__grid">
                <section v-for="a in r.awards" :key="a.title.zh">
                  <h4>{{ tc(a.title) }}</h4>
                  <ul>
                    <li v-for="(it, i) in a.items" :key="i">{{ tc(it) }}</li>
                  </ul>
                </section>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 深耕指標 -->
    <section class="section section--tint">
      <div class="wrap">
        <SectionHeading
          :title="t('results.kpiTitle')"
          :sub="t('results.kpiSub', { period: tc(kpiPeriod) })"
        />
        <p class="kpi__intro">{{ tc(kpiIntro) }}</p>
        <ul class="kpi">
          <li
            v-for="k in kpis"
            :key="k.label.zh"
            class="kpi__item card"
            :style="{ '--accent': typeMap[k.type].color, '--accent-text': typeMap[k.type].colorText }"
          >
            <div class="kpi__top">
              <span class="chip" :class="`chip--${k.type}`">{{ tc(typeMap[k.type].name) }}</span>
              <span class="kpi__rate">{{ t('results.kpiRate', { n: k.rate }) }}</span>
            </div>
            <p class="kpi__label">{{ tc(k.label) }}</p>
            <p class="kpi__value">{{ tc(k.value) }}</p>
            <div class="kpi__bar" role="img" :aria-label="t('results.kpiBarLabel', { n: k.rate })">
              <span :style="{ width: Math.min(k.rate, 200) / 2 + '%' }" />
            </div>
            <p class="kpi__note">{{ tc(k.note) }}</p>
          </li>
        </ul>
        <p class="kpi__foot">{{ t('results.kpiFoot') }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.rlist { display: grid; gap: 22px; }
.rcard { padding: 28px 30px; scroll-margin-top: 96px; border-top: 4px solid var(--accent); }
.rcard__head {
  display: flex; align-items: center; gap: 13px; margin-bottom: 20px;
  flex-wrap: wrap;   /* 英文類別名稱較長，窄螢幕允許「專頁」連結換行 */
}
.rcard__head h2 { min-width: 0; }
.rcard__icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #fff;
  flex: none;
}
.rcard__head h2 { font-size: 20px; color: var(--accent-text); }
.rcard__link {
  margin-left: auto;
  font-size: 13.5px;
  color: var(--ink-3);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.rcard__link:hover { color: var(--accent-text); }

.rcard__stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 16px;
  padding: 18px 0;
  margin-bottom: 18px;
  border-block: 1px solid var(--line);
}
.rcard__stats li { display: flex; flex-direction: column; gap: 3px; }
.rcard__val { font-size: 30px; font-weight: 700; color: var(--navy-800); line-height: 1.2; }
.rcard__val em { font-style: normal; font-size: 14px; font-weight: 500; color: var(--ink-2); margin-left: 3px; }
.rcard__cap { font-size: 13px; color: var(--ink-3); line-height: 1.7; }
.rcard__body { font-size: 15px; line-height: 2.05; color: var(--ink-2); margin-bottom: 0.9em; }

.awards { margin-top: 22px; padding-top: 20px; border-top: 1px dashed var(--line); }
.awards h3 {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 15px;
  color: var(--accent-text);
  margin-bottom: 16px;
}
.awards__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 18px; }
.awards h4 { font-size: 14px; color: var(--navy-800); margin-bottom: 8px; font-weight: 500; }
.awards ul { list-style: none; display: grid; gap: 6px; }
.awards li {
  font-size: 13.5px;
  color: var(--ink-2);
  line-height: 1.75;
  padding-left: 15px;
  position: relative;
}
.awards li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.6;
}

.kpi__intro {
  max-width: 52em;
  margin: 0 auto 30px;
  text-align: center;
  font-size: 15.5px;
  line-height: 2.05;
  color: var(--ink-2);
}
.kpi { list-style: none; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.kpi__item { padding: 20px 20px 22px; display: flex; flex-direction: column; gap: 7px; }
.kpi__top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.kpi__rate { font-size: 12px; color: var(--accent-text); font-weight: 500; }
.kpi__label { margin: 6px 0 0; font-size: 13.5px; color: var(--ink-3); }
.kpi__value { margin: 0; font-size: 25px; font-weight: 700; color: var(--navy-800); line-height: 1.3; }
.kpi__bar { height: 6px; border-radius: 4px; background: var(--cream-2); overflow: hidden; margin: 4px 0 2px; }
.kpi__bar span { display: block; height: 100%; background: var(--accent); border-radius: 4px; }
.kpi__note { margin: 0; font-size: 12.5px; color: var(--ink-3); line-height: 1.7; }
.kpi__foot { margin: 20px 0 0; text-align: center; font-size: 12.5px; color: var(--ink-3); }

@media (max-width: 1080px) { .kpi { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 700px) {
  .kpi { grid-template-columns: 1fr; }
  .rcard { padding: 22px 18px; }
  .rcard__val { font-size: 26px; }
}
</style>
