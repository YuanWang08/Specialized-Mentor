<script setup lang="ts">
import { mentorTypes } from '~/data/mentorTypes'
import { outstanding } from '~/data/outstanding'
import { photos } from '~/data/gallery'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc } = useLocalized()
const localePath = useLocalePath()

useHead({ title: t('mentors.title') })

const countMentors = (id: string) => outstanding.filter((m) => m.type === id).length
const countPhotos = (id: string) => photos.filter((p) => p.type === id).length
</script>

<template>
  <div class="page">
    <PageHero
      eyebrow="MENTORS"
      eyebrow-lang="en"
      :title="t('mentors.title')"
      :lead="t('mentors.lead')"
    />

    <section class="section section--white">
      <div class="wrap">
        <ul class="list">
          <li
            v-for="m in mentorTypes"
            :key="m.id"
            class="card card--hover row"
            :style="{ '--accent': m.color, '--accent-text': m.colorText }"
          >
            <NuxtLink :to="localePath(`/mentors/${m.id}`)" class="row__link">
              <span class="row__icon"><AppIcon :name="m.icon" :size="30" /></span>
              <div class="row__main">
                <h2 class="row__name">{{ tc(m.name) }}</h2>
                <p class="row__tagline">{{ tc(m.tagline) }}</p>
                <p class="row__intro">{{ tc(m.intro) }}</p>
              </div>
              <div class="row__meta">
                <span class="row__stat">
                  <strong>{{ m.highlight.value }}</strong><em>{{ tc(m.highlight.unit) }}</em>
                  <small>{{ tc(m.highlight.label) }}</small>
                </span>
                <span class="row__tags">
                  <span>{{ t('mentors.outstandingCount', { n: countMentors(m.id) }) }}</span>
                  <span>{{ t('mentors.photoCount', { n: countPhotos(m.id) }) }}</span>
                </span>
                <span class="row__go">
                  {{ t('mentors.enter') }} <AppIcon name="arrow" :size="12" />
                </span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.list { list-style: none; display: grid; gap: 18px; }
.row { overflow: hidden; }
.row__link {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 250px;
  gap: 24px;
  align-items: center;
  padding: 26px 28px;
  color: var(--ink);
  border-left: 4px solid var(--accent);
}
.row__icon {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #fff;
  flex: none;
}
.row__name { font-size: 21px; color: var(--accent-text); }
.row__tagline { margin: 4px 0 8px; font-size: 14.5px; color: var(--ink-2); }
.row__intro {
  margin: 0;
  font-size: 13.5px;
  color: var(--ink-3);
  line-height: 1.9;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.row__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  text-align: right;
}
.row__stat { display: flex; align-items: baseline; flex-wrap: wrap; justify-content: flex-end; gap: 3px; }
.row__stat strong { font-size: 27px; color: var(--navy-800); }
.row__stat em { font-style: normal; font-size: 13px; color: var(--ink-2); }
.row__stat small { width: 100%; font-size: 12px; color: var(--ink-3); }
.row__tags { display: flex; gap: 10px; font-size: 12.5px; color: var(--ink-3); flex-wrap: wrap; justify-content: flex-end; }
.row__go { font-size: 13.5px; color: var(--accent-text); display: inline-flex; align-items: center; gap: 4px; }

@media (max-width: 900px) {
  .row__link { grid-template-columns: auto minmax(0, 1fr); padding: 22px 20px; gap: 16px; }
  .row__meta {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    flex-wrap: wrap;
    border-top: 1px solid var(--line);
    padding-top: 14px;
  }
  .row__stat { justify-content: flex-start; }
  .row__stat small { width: auto; }
  .row__tags { justify-content: flex-start; }
}
@media (max-width: 520px) {
  .row__icon { width: 52px; height: 52px; }
  .row__name { font-size: 18px; }
  .row__tags { flex-basis: 100%; }
}
</style>
