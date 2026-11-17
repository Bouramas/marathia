<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import DotSeparator from '@/components/DotSeparator.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import BrandMap from '@/components/BrandMap.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = computed(() => pageByKey(route.meta.pageKey as string))

const MAPS_URL = 'https://maps.app.goo.gl/cdfBHxouMkrSds4M6'

useSeo(() => ({
  title: page.value ? pick(page.value.title) : t('nav.contact'),
  description: `${t('contact.addressLine1')}, ${t('contact.addressLine2')} · +30 22830 23249`,
  locale: locale.value,
  path: route.path,
}))
</script>

<template>
  <div>
    <section class="mx-auto max-w-7xl px-6 pt-16 pb-4 lg:px-10 lg:pt-24">
      <SectionTitle :kicker="t('contact.kicker')" :title="t('contact.details')" align="left" :rule="false" />

      <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <!-- Details -->
        <div class="flex flex-col gap-8 bg-cream p-8 lg:p-10">
          <ul class="space-y-6 text-ink/80">
            <li class="flex items-start gap-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" class="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
              <div>
                <p class="label-kicker text-xs tracking-[0.25em] uppercase text-ink/60">{{ t('contact.person') }}</p>
                <p class="mt-1 text-lg">{{ t('contact.personName') }}</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" class="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></svg>
              <div>
                <p class="label-kicker text-xs tracking-[0.25em] uppercase text-ink/60">{{ t('contact.phones') }}</p>
                <p class="mt-1 text-lg"><a href="tel:+302283023249" class="transition-colors hover:text-brand">+30 22830 23249</a></p>
                <p class="text-lg"><a href="tel:+306977657199" class="transition-colors hover:text-brand">+30 697 765 7199</a></p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" class="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
              <div>
                <p class="label-kicker text-xs tracking-[0.25em] uppercase text-ink/60">{{ t('contact.email') }}</p>
                <p class="mt-1 text-lg"><a href="mailto:info@marathiatinos.gr" class="transition-colors hover:text-brand">info@marathiatinos.gr</a></p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              <div>
                <p class="label-kicker text-xs tracking-[0.25em] uppercase text-ink/60">{{ t('contact.address') }}</p>
                <p class="mt-1 text-lg">{{ t('contact.addressLine1') }}</p>
                <p class="text-lg">{{ t('contact.addressLine2') }}</p>
                <a :href="MAPS_URL" target="_blank" rel="noopener noreferrer" class="mt-2 inline-block border-b border-dotted border-ink/40 text-sm transition-colors hover:border-brand hover:text-brand">{{ t('contact.directions') }}</a>
              </div>
            </li>
            <li class="flex items-start gap-4 border-t border-brand/40 pt-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              <div>
                <p class="label-kicker text-xs tracking-[0.25em] uppercase text-ink/60">{{ t('home.hours') }}</p>
                <p class="mt-1 text-lg"><span class="font-semibold">{{ t('contact.restaurant') }}</span> {{ t('contact.restaurantTime') }}</p>
                <p class="text-lg"><span class="font-semibold">{{ t('contact.breakfast') }}</span> {{ t('contact.breakfastTime') }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Map -->
        <BrandMap class="min-h-[360px] lg:min-h-[520px]" />
      </div>
    </section>
    <DotSeparator />
  </div>
</template>
