<script setup lang="ts">
import { mentorTypes } from '~/data/mentorTypes'
import { useLocalized, type LP } from '~/data/i18n'

const { t } = useI18n()
const { t: tc, tAll } = useLocalized()
const localePath = useLocalePath()

useHead({ title: t('nav.about') })

const heading = {
  zh: '設置專項輔導導師，培育學生軟實力',
  en: 'Specialized Mentors, and the Skills That Last',
}

const intro: LP = {
  zh: [
    '本校於 100 學年度起設置「專項輔導導師」制度，讓更多有熱誠的教師關懷、鼓勵學生積極學習，除了具備專業知識與技能，更培養具有生活美學、創意與人文關懷等「軟實力」。',
    '專項輔導導師包括：職涯導師、宿舍導師、服務學習導師、系學會導師及體育導師。為提昇輔導品質及效益，並定期舉辦導師工作坊、交流會及系列專題講座，以提供同學多元的全人教育與環境。',
  ],
  en: [
    'NCU established its specialized mentoring system in the 2011 academic year, bringing more committed teachers into the work of caring for students and encouraging them to learn — so that alongside professional knowledge and skills, students also develop the softer capacities: an eye for how life is lived, creativity, and care for other people.',
    'The system comprises five kinds of mentor: career, residence hall, service learning, student association and physical education. To raise the quality and reach of this guidance, the university regularly holds mentor workshops, exchange meetings and lecture series, giving students a broad and genuinely holistic education.',
  ],
}

const closing: LP = {
  zh: [
    '每年，中央大學各系所推薦約 140 位優秀專項輔導導師，讓頂尖的教育人才走出研究室、走出教室，透過不同的輔導方式，促進學生養成「受用一生」的跨領域軟實力。',
  ],
  en: [
    'Each year NCU departments nominate around 140 outstanding specialized mentors, bringing the university\'s finest educators out of the laboratory and out of the lecture hall. Through these different kinds of guidance, students build the cross-disciplinary skills that will serve them for a lifetime.',
  ],
}
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="ABOUT"
      eyebrow-lang="en"
      :title="tc(heading)"
      :lead="t('about.lead')"
    />

    <section class="section section--white">
      <div class="wrap about">
        <div class="about__lede">
          <p v-for="(p, i) in tAll(intro)" :key="i">{{ p }}</p>
        </div>

        <ol class="chain" :aria-label="t('about.chainLabel')">
          <li
            v-for="(m, i) in mentorTypes"
            :key="m.id"
            :style="{ '--accent': m.color, '--accent-text': m.colorText }"
          >
            <span class="chain__no">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="chain__icon"><AppIcon :name="m.icon" :size="20" /></span>
            <span class="chain__name">{{ tc(m.name) }}</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--tint">
      <div class="wrap">
        <SectionHeading :title="t('about.detailTitle')" />
        <div class="detail">
          <article
            v-for="m in mentorTypes"
            :key="m.id"
            class="detail__item card"
            :style="{ '--accent': m.color, '--accent-text': m.colorText }"
            :id="m.id"
          >
            <header class="detail__head">
              <span class="detail__icon"><AppIcon :name="m.icon" :size="24" /></span>
              <div>
                <h3>{{ tc(m.name) }}</h3>
                <p>{{ tc(m.tagline) }}</p>
              </div>
            </header>
            <p class="detail__body">{{ tc(m.detail) }}</p>
            <footer class="detail__foot">
              <NuxtLink :to="localePath(`/mentors/${m.id}`)" class="btn btn--ghost">
                {{ t('about.typePage', { name: tc(m.name) }) }}
                <AppIcon name="arrow" :size="12" class="btn__arrow" />
              </NuxtLink>
              <a
                v-if="m.link"
                :href="m.link.href"
                target="_blank"
                rel="noopener"
                class="detail__link"
              >
                {{ tc(m.link.label) }}<span class="sr-only">{{ t('common.newWindow') }}</span>
                <AppIcon name="external" :size="13" />
              </a>
            </footer>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--white">
      <div class="wrap">
        <p v-for="(p, i) in tAll(closing)" :key="i" class="closing">{{ p }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about__lede {
  font-size: 16.5px;
  line-height: 2.15;
  color: var(--ink-2);
  max-width: 50em;
  margin-inline: auto;
}

.chain {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  margin-top: 44px;
}
.chain li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 20px 10px;
  border-radius: var(--radius);
  background: var(--cream-2);
  border-top: 3px solid var(--accent);
  text-align: center;
}
.chain__no {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--accent-text);
  font-weight: 700;
}
.chain__icon { color: var(--accent-text); }
.chain__name { font-size: 14.5px; color: var(--navy-800); font-weight: 500; }

.detail { display: grid; gap: 20px; }
.detail__item { padding: 26px 28px; scroll-margin-top: 96px; }
.detail__head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.detail__icon {
  width: 50px;
  height: 50px;
  flex: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #fff;
}
.detail__head h3 { font-size: 19px; color: var(--accent-text); }
.detail__head p { margin: 2px 0 0; font-size: 13.5px; color: var(--ink-3); }
.detail__body { font-size: 15px; line-height: 2.05; color: var(--ink-2); margin-bottom: 18px; }
.detail__foot { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.detail__link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: var(--accent-text);
}

.closing {
  max-width: 46em;
  margin-inline: auto;
  text-align: center;
  font-family: var(--serif);
  font-size: clamp(17px, 2.2vw, 21px);
  line-height: 2.1;
  color: var(--navy-800);
}

@media (max-width: 860px) {
  .chain { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 560px) {
  .chain { grid-template-columns: repeat(2, 1fr); }
  .detail__item { padding: 22px 18px; }
}
</style>
