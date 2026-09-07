<script setup lang="ts">
import { contact, nav } from '~/data/site'
import { useLocalized } from '~/data/i18n'

const { t } = useI18n()
const { t: tc, isEn } = useLocalized()
const localePath = useLocalePath()
const year = new Date().getFullYear()

/** 底部列的工具類連結（網站導覽、無障礙聲明），與隱私權政策並排 */
const utilityLinks = [
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
        <p class="ftr__org">{{ t('site.org') }}　{{ tc(contact.unit) }}</p>
      </div>

      <nav class="ftr__col" :aria-label="t('footer.navLabel')">
        <h2>{{ t('footer.sitemap') }}</h2>
        <ul>
          <li v-for="item in nav.slice(1)" :key="item.to">
            <NuxtLink :to="localePath(item.to)">{{ t(`nav.${item.key}`) }}</NuxtLink>
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
        <address class="ftr__contact">
          <span class="ftr__label">{{ t('footer.address') }}</span>
          <span>{{ tc(contact.address) }}</span>
          <span class="ftr__label">{{ t('footer.phone') }}</span>
          <a :href="contact.phoneHref">{{ tc(contact.phone) }}</a>
        </address>
      </div>
    </div>

    <div class="ftr__bar">
      <div class="wrap ftr__bar-inner">
        <p class="ftr__copy">
          © {{ year }} {{ t('site.org') }}　{{ tc(contact.unit) }}　{{ t('footer.rights') }}
        </p>
        <nav class="ftr__utils" :aria-label="t('footer.utilsLabel')">
          <NuxtLink v-for="u in utilityLinks" :key="u.to" :to="localePath(u.to)">
            {{ t(`nav.${u.key}`) }}
          </NuxtLink>
          <a :href="contact.privacy.href" target="_blank" rel="noopener">
            {{ tc(contact.privacy.label) }}<span class="sr-only">{{ t('common.newWindow') }}</span>
            <AppIcon name="external" :size="13" />
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ftr { background: var(--navy-900); color: #cfe0e6; margin-top: 8px; }
.ftr__inner {
  display: grid; gap: 34px 40px; padding-block: 46px 34px;
  grid-template-columns: 1.5fr 1fr 1fr 1.25fr;
}
.ftr__brand strong { display: block; font-family: var(--serif); font-size: 19px; color: #fff; }
.ftr__brand small { display: block; margin-top: 5px; font-size: 13px; color: #a4c2cc; letter-spacing: .06em; }
.ftr__org { margin: 16px 0 0; font-size: 13.5px; color: #9dbdc7; line-height: 1.8; }

.ftr__col h2 { font-size: 14.5px; color: #fff; margin-bottom: 13px; font-weight: 500; letter-spacing: .05em; }
.ftr__col ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.ftr__col a, .ftr__col li { font-size: 14px; color: #b7d0d8; }
.ftr__col a:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }

.ftr__contact {
  font-style: normal;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 8px 12px;
  font-size: 14px;
  line-height: 1.8;
  color: #b7d0d8;
}
.ftr__label { color: #8fb2bd; white-space: nowrap; }
.ftr__contact a { color: #b7d0d8; }
.ftr__contact a:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }

.ftr__bar { border-top: 1px solid #1d4557; padding-block: 15px; }
.ftr__bar-inner {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px 24px; flex-wrap: wrap;
}
.ftr__copy { margin: 0; font-size: 13px; color: #8fb2bd; }
.ftr__utils { display: flex; align-items: center; gap: 8px 20px; flex-wrap: wrap; }
.ftr__utils a {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; color: #b7d0d8; white-space: nowrap;
}
.ftr__utils a:hover { color: #fff; text-decoration: underline; text-underline-offset: 3px; }

@media (max-width: 1000px) {
  .ftr__inner { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .ftr__inner { grid-template-columns: 1fr; gap: 26px; }
  .ftr__contact { grid-template-columns: 1fr; gap: 2px; }
  .ftr__label { margin-top: 6px; }
}
</style>
