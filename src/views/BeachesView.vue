<script setup lang="ts">
// Beaches: typographic header (as Attractions), then an editorial list: beaches with a
// photo get a framed feature section, the rest flow as numbered text in two columns.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { beaches, type Entry } from '@/site/tinos-pages'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

const pad = (n: number) => String(n).padStart(2, '0')

type Row = { item: Entry; n: number }
type Segment = { feature?: Row & { flip: boolean }; list?: Row[] }

// Beaches with a photo become their own section; consecutive text-only ones share a list.
const segments: Segment[] = []
let flips = 0
beaches.items.forEach((item, i) => {
  const row = { item, n: i + 1 }
  if (item.image) {
    segments.push({ feature: { ...row, flip: flips++ % 2 === 0 } })
  } else {
    const last = segments[segments.length - 1]
    if (last?.list) last.list.push(row)
    else segments.push({ list: [row] })
  }
})

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.beaches'),
    description: pick(beaches.intro),
    image: beaches.image,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <header class="mx-auto grid max-w-7xl gap-10 px-6 pb-4 pt-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-28">
      <div class="lg:col-span-5">
        <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
        <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.2em] lg:text-6xl">
          {{ page ? pick(page.title) : t('nav.beaches') }}
        </h1>
        <span class="mt-8 block h-px w-14 bg-brand"></span>
      </div>
      <p class="text-xl font-light leading-relaxed text-ink/85 sm:text-2xl lg:col-span-7 lg:text-[1.75rem] lg:leading-[1.6]">
        {{ pick(beaches.intro) }}
      </p>
    </header>

    <template v-for="(seg, si) in segments" :key="si">
      <!-- Beach with a photo: framed image beside the text, alternating sides, on cream -->
      <section
        v-if="seg.feature"
        :id="'b-' + seg.feature.item.id"
        class="scroll-mt-24 bg-cream"
        :class="si ? 'mt-2 lg:mt-4' : 'mt-10 lg:mt-14'"
      >
        <div class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-14">
          <div class="relative lg:col-span-6" :class="seg.feature.flip ? 'lg:order-2' : ''">
            <div
              aria-hidden="true"
              class="absolute top-4 h-full w-full rounded-sm border border-brand/60 sm:top-6"
              :class="seg.feature.flip ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'"
            ></div>
            <figure class="relative overflow-hidden rounded-sm">
              <img :src="seg.feature.item.image" alt="" loading="lazy" class="aspect-[4/3] w-full object-cover" />
            </figure>
          </div>
          <div :class="seg.feature.flip ? 'lg:order-1' : ''" class="lg:col-span-6">
            <p class="display text-7xl font-light leading-none text-brand sm:text-8xl">{{ pad(seg.feature.n) }}</p>
            <h2 class="display mt-6 text-2xl tracking-[0.08em] sm:text-3xl md:tracking-[0.15em]">{{ pick(seg.feature.item.title) }}</h2>
            <span class="my-6 block h-px w-14 bg-brand"></span>
            <ul v-if="seg.feature.item.tags?.length" class="mb-4 flex flex-wrap gap-x-4">
              <li v-for="(tag, ti) in seg.feature.item.tags" :key="ti" class="label-kicker text-brand">{{ pick(tag) }}</li>
            </ul>
            <p class="leading-relaxed text-ink/80">{{ pick(seg.feature.item.body) }}</p>
          </div>
        </div>
      </section>

      <!-- Text-only beaches: numbered typographic list in two columns -->
      <section v-else class="mx-auto max-w-6xl px-6 py-4 lg:px-10 lg:py-6">
        <ol class="grid gap-x-16 md:grid-cols-2">
          <li
            v-for="e in seg.list"
            :id="'b-' + e.item.id"
            :key="e.item.id"
            class="group scroll-mt-24 border-t border-ink/15 py-7"
          >
            <div class="flex items-baseline gap-4">
              <span class="display w-9 shrink-0 text-2xl font-light text-brand">{{ pad(e.n) }}</span>
              <h2 class="text-xl font-semibold leading-snug transition group-hover:text-brand">{{ pick(e.item.title) }}</h2>
            </div>
            <ul v-if="e.item.tags?.length" class="mt-2 flex flex-wrap gap-x-3 pl-[3.25rem]">
              <li v-for="(tag, ti) in e.item.tags" :key="ti" class="label-kicker text-brand">{{ pick(tag) }}</li>
            </ul>
            <p class="mt-3 pl-[3.25rem] font-light leading-relaxed text-ink/80">{{ pick(e.item.body) }}</p>
          </li>
        </ol>
      </section>
    </template>

    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p class="label-kicker mb-6 text-brand">{{ t('tinos.explore') }}</p>
        <BaseButton :to="pathForKey('i-tinos/mi-chasete', locale) || '#'" variant="outline">
          {{ t('nav.attractions') }}
        </BaseButton>
      </div>
    </section>
  </article>
</template>
