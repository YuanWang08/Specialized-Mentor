<script setup lang="ts">
import { mentorTypes } from '~/data/mentorTypes'
import { nav } from '~/data/site'
import { outstanding } from '~/data/outstanding'
import { resultsYear } from '~/data/results'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()
const localePath = useLocalePath()

usePageSeo(() => ({ title: t('sitemap.title'), description: t('sitemap.lead') }))

const year = computed(() => tc(resultsYear))

const groups = computed(() => [
  {
    title: t('nav.about'),
    to: '/about',
    desc: t('sitemap.aboutDesc'),
    children: mentorTypes.map((m) => ({ label: tc(m.name), to: `/about#${m.id}` })),
  },
  {
    title: t('nav.mentors'),
    to: '/mentors',
    desc: t('sitemap.mentorsDesc'),
    children: mentorTypes.map((m) => ({ label: tc(m.name), to: `/mentors/${m.id}` })),
  },
  {
    title: t('nav.results'),
    to: '/results',
    desc: t('sitemap.resultsDesc'),
    children: mentorTypes.map((m) => ({
      label: t('sitemap.typeResults', { name: tc(m.name) }),
      to: `/results#${m.id}`,
    })),
  },
  {
    title: t('nav.outstanding'),
    to: '/outstanding',
    desc: t('sitemap.outstandingDesc', { year: year.value, n: outstanding.length }),
    children: outstanding.map((m) => ({
      label: `${tc(m.name)} · ${tc(m.rank)}`,
      to: `/outstanding/${m.id}`,
    })),
  },
  { title: t('nav.books'), to: '/books', desc: t('sitemap.booksDesc'), children: [] },
  {
    title: t('nav.gallery'),
    to: '/gallery',
    desc: t('sitemap.galleryDesc'),
    children: mentorTypes.map((m) => ({
      label: t('sitemap.typeGallery', { name: tc(m.name) }),
      to: `/gallery#${m.id}`,
    })),
  },
  {
    title: t('nav.system'),
    to: '',
    href: nav.find((n) => n.key === 'system')?.href,
    desc: t('sitemap.systemDesc'),
    children: [],
  },
  { title: t('nav.voices'), to: '/voices', desc: t('sitemap.voicesDesc'), children: [] },
  {
    title: t('nav.accessibility'),
    to: '/accessibility',
    desc: t('sitemap.accessibilityDesc'),
    children: [],
  },
])
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="SITEMAP"
      eyebrow-lang="en"
      :title="t('sitemap.title')"
      :lead="t('sitemap.lead')"
    />

    <section class="section section--white">
      <div class="wrap">
        <div class="hint ph--inline">
          <p>{{ t('sitemap.keyHint') }}</p>
          <ul>
            <li><kbd>U</kbd>：{{ t('sitemap.keyU') }}</li>
            <li><kbd>C</kbd>：{{ t('sitemap.keyC') }}</li>
            <li><kbd>Z</kbd>：{{ t('sitemap.keyZ') }}</li>
          </ul>
        </div>

        <ol class="map">
          <li class="map__group">
            <h2><NuxtLink :to="localePath('/')">{{ t('nav.home') }}</NuxtLink></h2>
            <p>{{ t('sitemap.homeDesc') }}</p>
          </li>
          <li v-for="g in groups" :key="g.title" class="map__group">
            <h2>
              <a v-if="g.href" :href="g.href" target="_blank" rel="noopener">
                {{ g.title }}<span class="sr-only">{{ t('common.newWindow') }}</span>
              </a>
              <NuxtLink v-else :to="localePath(g.to)">{{ g.title }}</NuxtLink>
            </h2>
            <p>{{ g.desc }}</p>
            <ul v-if="g.children.length" class="map__sub">
              <li v-for="c in g.children" :key="c.to">
                <NuxtLink :to="localePath(c.to.split('#')[0]) + (c.to.includes('#') ? '#' + c.to.split('#')[1] : '')">
                  {{ c.label }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hint { margin-bottom: 34px; }
.hint p { margin: 0 0 8px; }
.hint ul { list-style: none; display: flex; gap: 20px; flex-wrap: wrap; }
kbd {
  display: inline-block;
  min-width: 1.6em;
  text-align: center;
  background: #fff;
  border: 1px solid var(--line);
  border-bottom-width: 2px;
  border-radius: 5px;
  padding: 1px 6px;
  font-family: var(--sans);
  font-size: 12.5px;
  color: var(--navy-800);
}

.map { list-style: none; display: grid; gap: 20px; }
.map__group {
  border-left: 3px solid var(--navy-600);
  padding: 4px 0 4px 20px;
}
.map__group h2 { font-size: 18px; }
.map__group h2 a { color: var(--navy-800); }
.map__group h2 a:hover { color: var(--navy-600); text-decoration: underline; text-underline-offset: 3px; }
.map__group > p { margin: 5px 0 0; font-size: 14px; color: var(--ink-2); }
.map__sub {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
}
.map__sub a { font-size: 14px; color: var(--navy-700); }
.map__sub a:hover { text-decoration: underline; text-underline-offset: 3px; }
</style>
