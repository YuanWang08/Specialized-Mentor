<script setup lang="ts">
import { contact, nav } from '~/data/site'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc, isEn } = useLocalized()
const localePath = useLocalePath()
const year = new Date().getFullYear()

const extraLinks = [
  { key: 'sitemap', to: '/sitemap' },
  { key: 'accessibility', to: '/accessibility' },
]
</script>

<template>
  <footer class="ftr">
    <a id="Z" accesskey="Z" href="#Z" class="sr-only">{{ t('nav.landmarkFoot') }}</a>
    <div class="wrap ftr__inner">
      <div class="ftr__brand">
        <strong>{{ t('site.name') }}</strong>
        <small>{{ t('site.tagline') }}</small>
        <p class="ftr__org">{{ t('site.org') }}</p>
      </div>

      <nav class="ftr__col" :aria-label="t('footer.navLabel')">
        <h2>{{ t('footer.sitemap') }}</h2>
        <ul>
          <li v-for="item in nav.slice(1)" :key="item.to">
            <NuxtLink :to="localePath(item.to)">{{ t(`nav.${item.key}`) }}</NuxtLink>
          </li>
          <li v-for="e in extraLinks" :key="e.to">
            <NuxtLink :to="localePath(e.to)">{{ t(`nav.${e.key}`) }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="ftr__col">
        <h2>{{ t('footer.links') }}</h2>
        <ul>
          <li v-for="l in contact.links" :key="l.href">
            <a :href="(isEn && l.hrefEn) || l.href" target="_blank" rel="noopener">
              {{ tc(l.label) }}<span class="sr-only">{{ t('common.newWindow') }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="ftr__col">
        <h2>{{ t('footer.contact') }}</h2>
        <ul v-if="!contact.pending">
          <li>{{ tc(contact.address) }}</li>
          <li>{{ tc(contact.phone) }}</li>
          <li>{{ tc(contact.email) }}</li>
        </ul>
        <p v-else class="ftr__todo">
          {{ t('footer.contactPending') }}<br />
          <span>{{ t('footer.contactPendingNote') }}</span>
        </p>
      </div>
    </div>

    <div class="ftr__bar">
      <div class="wrap">© {{ year }} {{ t('site.org') }}　{{ t('footer.rights') }}</div>
    </div>
  </footer>
</template>

<style scoped>
.ftr { background: var(--navy-900); color: #cfe0e6; margin-top: 8px; }
.ftr__inner {
  display: grid; gap: 34px 40px; padding-block: 46px 34px;
  grid-template-columns: 1.6fr repeat(3, 1fr);
}
.ftr__brand strong { display: block; font-family: var(--serif); font-size: 19px; color: #fff; }
.ftr__brand small { display: block; margin-top: 5px; font-size: 13px; color: #a4c2cc; letter-spacing: .06em; }
.ftr__org { margin: 16px 0 0; font-size: 13.5px; color: #9dbdc7; }

.ftr__col h2 { font-size: 14.5px; color: #fff; margin-bottom: 13px; font-weight: 500; letter-spacing: .05em; }
.ftr__col ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.ftr__col a, .ftr__col li { font-size: 14px; color: #b7d0d8; }
.ftr__col a:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }

.ftr__todo {
  font-size: 13.5px; color: #8fb2bd; margin: 0;
  border: 1px dashed #37606f; border-radius: 9px; padding: 10px 13px; line-height: 1.7;
}
.ftr__todo span { font-size: 12.5px; color: #a4c2cc; }

.ftr__bar {
  border-top: 1px solid #1d4557; padding-block: 15px;
  font-size: 13px; color: #8fb2bd;
}

@media (max-width: 860px) {
  .ftr__inner { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) {
  .ftr__inner { grid-template-columns: 1fr; gap: 26px; }
}
</style>
