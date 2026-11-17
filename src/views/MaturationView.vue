<script setup lang="ts">
// Fish maturation: dark typographic header/opener built around "shouldn't fish be
// eaten fresh?", asymmetric 7/5 story rows, lab paragraph + stat row, and a
// book feature card.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { maturation } from '@/site/about-pages'
import DotSeparator from '@/components/DotSeparator.vue'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.fishAging'),
    description: pick(maturation.rows[0].body)[0],
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header + opener: dark, type only -->
    <header class="bg-ink px-6 py-20 text-white lg:px-10 lg:py-32">
      <div class="mx-auto max-w-4xl text-center">
        <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
        <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.2em] lg:text-6xl">
          {{ page ? pick(page.title) : t('nav.fishAging') }}
        </h1>
        <span class="mx-auto mt-8 mb-16 block h-px w-14 bg-brand"></span>
        <p class="mx-auto max-w-2xl leading-relaxed text-white/70">{{ pick(maturation.opener.context) }}</p>
        <p class="mt-8 text-3xl font-light leading-snug sm:text-4xl lg:text-5xl lg:leading-tight">
          {{ pick(maturation.opener.question) }}
        </p>
      </div>
    </header>

    <!-- Story rows (7/5 asymmetric, alternating) -->
    <section
      v-for="(row, i) in maturation.rows"
      :key="row.id"
      class="py-8 lg:py-12"
      :class="i % 2 === 1 ? 'bg-cream' : ''"
    >
      <div class="mx-auto grid max-w-4xl items-center gap-6 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div class="overflow-hidden rounded-3xl lg:col-span-6" :class="i % 2 === 1 ? 'lg:order-2' : ''">
          <img
            :src="row.image"
            alt=""
            loading="lazy"
            class="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105 lg:aspect-[3/2]"
          />
        </div>
        <div class="lg:col-span-6" :class="i % 2 === 1 ? 'lg:order-1' : ''">
          <p class="display mb-2 text-6xl font-light leading-none text-brand/40">{{ String(i + 1).padStart(2, '0') }}</p>
          <p class="label-kicker mb-3 text-brand">{{ pick(row.kicker) }}</p>
          <h2 class="mb-5 text-2xl font-semibold leading-snug sm:text-3xl">{{ pick(row.title) }}</h2>
          <p v-for="(para, pi) in pick(row.body)" :key="pi" class="mb-4 leading-relaxed text-ink/80">{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- Lab + stats -->
    <section class="py-14 lg:py-24" :class="maturation.rows.length % 2 === 1 ? 'bg-cream' : ''">
      <div class="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p class="text-lg leading-relaxed text-ink/80">{{ pick(maturation.lab) }}</p>
      </div>
      <dl class="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-y-10 px-6 lg:mt-20 lg:grid-cols-4 lg:px-10">
        <div
          v-for="s in maturation.stats"
          :key="s.value"
          class="text-center lg:border-l lg:border-brand/30 lg:first:border-l-0"
        >
          <dt class="display text-5xl font-light leading-none text-brand lg:text-6xl">{{ s.value }}</dt>
          <dd class="label-kicker mt-4 text-xs text-ink/70">{{ pick(s.label) }}</dd>
        </div>
      </dl>
    </section>

    <DotSeparator />

    <!-- Book feature -->
    <section class="pb-16 lg:pb-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <div class="grid overflow-hidden rounded-3xl bg-cream lg:grid-cols-2">
          <div class="flex items-center justify-center p-8 lg:p-12">
            <img
              :src="pick(maturation.book.image)"
              :alt="pick(maturation.book.title)"
              loading="lazy"
              class="w-full max-w-xs rounded-lg shadow-xl"
            />
          </div>
          <div class="p-8 lg:p-14">
            <p class="label-kicker mb-3 text-brand">{{ t('about.book') }} · {{ pick(maturation.book.kicker) }}</p>
            <h2 class="mb-6 text-2xl font-semibold leading-snug sm:text-3xl">{{ pick(maturation.book.title) }}</h2>
            <p v-for="(para, pi) in pick(maturation.book.body)" :key="pi" class="mb-4 leading-relaxed text-ink/80">
              {{ para }}
            </p>
            <div class="mt-8">
              <BaseButton href="https://s22.gr/products/marathia1-en">{{ t('about.buyBook') }}</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
