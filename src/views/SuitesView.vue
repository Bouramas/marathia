<script setup lang="ts">
// Guesthouse overview: typographic header with an arched photo, the story in two
// columns, a highlights strip, three alternating room rows linking to each room
// type, and a booking call-to-action.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { suites } from '@/site/suites-page'
import DotSeparator from '@/components/DotSeparator.vue'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

const intro = () => pick(suites.intro)
const num = (i: number) => String(i + 1).padStart(2, '0')

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.suites'),
    description: page ? pick(page.seo.description) : '',
    image: suites.image,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header -->
    <header class="bg-cream">
      <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <p class="label-kicker mb-5 text-brand">{{ pick(suites.kicker) }}</p>
          <h1 class="display text-3xl tracking-[0.08em] sm:text-4xl md:tracking-[0.18em] xl:text-5xl xl:tracking-[0.14em]">
            {{ page ? pick(page.title) : t('nav.suites') }}
          </h1>
          <span class="mt-6 block h-px w-14 bg-brand"></span>
          <p class="mt-6 max-w-xl text-lg font-light leading-relaxed text-ink/85 lg:text-xl">{{ intro()[0] }}</p>
        </div>
        <div class="relative mx-auto w-full max-w-[340px] lg:max-w-[400px]">
          <div aria-hidden="true" class="absolute -right-4 top-4 h-full w-full rounded-t-[999px] rounded-b-sm border border-brand/60 sm:-right-6 sm:top-6"></div>
          <div class="relative overflow-hidden rounded-t-[999px] rounded-b-sm">
            <img :src="suites.image" alt="" class="aspect-[3/4] w-full object-cover" />
          </div>
        </div>
      </div>
    </header>

    <!-- Story -->
    <section class="py-14 lg:py-20">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <div class="gap-14 leading-loose text-ink/80 lg:columns-2 lg:[column-rule:1px_solid_rgb(201_161_91/0.45)]">
          <p v-for="p in intro().slice(1)" :key="p" class="mb-6">{{ p }}</p>
        </div>
        <ul class="mt-12 grid grid-cols-2 gap-y-8 border-y border-ink/10 py-8 lg:grid-cols-4">
          <li
            v-for="(h, i) in suites.highlights"
            :key="i"
            class="px-4 text-center lg:border-l lg:border-ink/15 lg:first:border-l-0"
          >
            <p class="display text-xl tracking-[0.1em] text-brand">{{ pick(h.value) }}</p>
            <p class="label-kicker mt-2 text-ink/70">{{ pick(h.label) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <DotSeparator />

    <!-- Rooms -->
    <section class="pt-4 pb-6 lg:pb-10">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p class="label-kicker mb-3 text-brand">{{ pick(suites.roomsKicker) }}</p>
        <h2 class="display text-2xl tracking-[0.1em] sm:text-3xl sm:tracking-[0.14em]">{{ pick(suites.roomsTitle) }}</h2>
      </div>
      <div
        v-for="(r, i) in suites.rooms"
        :key="r.key"
        class="mt-10 py-12 lg:py-16"
        :class="i % 2 === 0 ? 'bg-cream' : ''"
      >
        <div class="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <RouterLink
            :to="pathForKey(r.key, locale) || '#'"
            class="group block overflow-hidden rounded-sm"
            :class="i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
            :aria-label="pick(r.name)"
          >
            <img
              :src="r.image"
              alt=""
              loading="lazy"
              class="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </RouterLink>
          <div class="max-w-xl" :class="i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'">
            <p class="display text-6xl leading-none text-brand/40">{{ num(i) }}</p>
            <h3 class="display mt-4 text-2xl tracking-[0.1em] sm:text-3xl">{{ pick(r.name) }}</h3>
            <p class="label-kicker mt-3 text-brand">{{ pick(r.size) }}</p>
            <span class="my-6 block h-px w-14 bg-brand/60"></span>
            <p class="leading-relaxed text-ink/80">{{ pick(r.body) }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li class="label-kicker rounded-full bg-brand/15 px-3 py-1 text-ink">{{ pick(r.sleeps) }}</li>
              <li class="label-kicker rounded-full bg-brand/15 px-3 py-1 text-ink">{{ pick(r.count) }}</li>
              <li v-for="tag in pick(r.tags)" :key="tag" class="label-kicker rounded-full border border-brand/50 px-3 py-1 text-ink/70">{{ tag }}</li>
            </ul>
            <div class="mt-8">
              <BaseButton :to="pathForKey(r.key, locale) || '#'" variant="outline">{{ pick(suites.view) }} &rarr;</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking CTA -->
    <section class="bg-cream py-16 text-center lg:py-20">
      <div class="mx-auto max-w-2xl px-6">
        <h2 class="display text-2xl tracking-[0.1em] sm:text-3xl">{{ pick(suites.ctaTitle) }}</h2>
        <span class="mx-auto my-6 block h-px w-14 bg-brand"></span>
        <p class="leading-relaxed text-ink/80">{{ pick(suites.ctaBody) }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <BaseButton :to="pathForKey('forma-kratisis-domatiou', locale) || '#'" variant="outline">{{ pick(suites.ctaBook) }}</BaseButton>
          <BaseButton :to="pathForKey('contact-us', locale) || '#'" variant="outline">{{ pick(suites.ctaContact) }}</BaseButton>
        </div>
      </div>
    </section>
  </article>
</template>
