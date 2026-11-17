<script setup lang="ts">
// Our history: typographic header + lead + vertical timeline (alternating cards on a
// gold centre line from lg; single left rail on mobile) + closing services band.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { history } from '@/site/about-pages'
import DotSeparator from '@/components/DotSeparator.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.history'),
    description: pick(history.lead),
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header: left-aligned display title, lead quote beside it -->
    <header class="mx-auto grid max-w-7xl gap-10 px-6 pb-4 pt-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-28">
      <div class="lg:col-span-5">
        <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
        <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.2em] lg:text-6xl">
          {{ page ? pick(page.title) : t('nav.history') }}
        </h1>
        <span class="mt-8 block h-px w-14 bg-brand"></span>
      </div>
      <p class="text-xl font-light leading-relaxed text-ink/85 sm:text-2xl lg:col-span-7 lg:text-[1.75rem] lg:leading-[1.6]">
        {{ pick(history.lead) }}
      </p>
    </header>

    <DotSeparator />

    <!-- Timeline -->
    <section class="bg-cream py-16 lg:py-24">
      <div class="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionTitle :kicker="t('brand')" :title="t('about.timeline')" />

        <ol class="relative mt-12 lg:mt-20">
          <span class="absolute bottom-0 left-[11px] top-2 w-px bg-brand/40 lg:left-1/2" aria-hidden="true"></span>

          <li
            v-for="(m, i) in history.milestones"
            :key="m.id"
            class="relative pb-14 pl-10 last:pb-0 lg:grid lg:grid-cols-2 lg:pb-20 lg:pl-0"
          >
            <span
              class="absolute left-[11px] top-3 h-[13px] w-[13px] -translate-x-1/2 rounded-full border-2 border-brand bg-cream lg:left-1/2"
              aria-hidden="true"
            ></span>

            <div :class="i % 2 === 0 ? 'lg:col-start-1 lg:pr-16' : 'lg:col-start-2 lg:pl-16'">
              <p class="display text-5xl font-light leading-none tracking-[0.04em] text-brand sm:text-6xl">
                {{ pick(m.label) }}
              </p>
              <h3 class="mt-4 text-xl font-semibold leading-snug text-ink sm:text-2xl">{{ pick(m.title) }}</h3>
              <p v-for="(para, pi) in pick(m.body)" :key="pi" class="mt-4 leading-relaxed text-ink/80">
                {{ para }}
              </p>
              <figure v-if="m.image" class="mt-6 overflow-hidden rounded-sm">
                <img
                  :src="m.image"
                  alt=""
                  loading="lazy"
                  class="aspect-[16/10] w-full object-cover transition duration-700 hover:scale-105"
                />
              </figure>
              <div v-if="m.cta" class="mt-6">
                <BaseButton :to="pathForKey(m.cta.key, locale) || '#'" variant="outline">
                  {{ pick(m.cta.label) }}
                </BaseButton>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Closing -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p class="label-kicker mb-3 text-brand">{{ t('about.services') }}</p>
        <p class="text-lg leading-relaxed text-ink/80">{{ pick(history.closing.body) }}</p>
        <p class="mt-5 text-lg leading-relaxed text-ink/80">{{ pick(history.closing.services) }}</p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <BaseButton
            v-for="l in history.closing.links"
            :key="l.key"
            :to="pathForKey(l.key, locale) || '#'"
            variant="outline"
          >
            {{ pick(l.label) }}
          </BaseButton>
        </div>
      </div>
    </section>
  </article>
</template>
