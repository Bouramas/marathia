<script setup lang="ts">
// Tinos at a glance: typographic header with a tall arched image, three alternating
// image/text sections, and a closing band linking to attractions, beaches, gastrotourism.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { tinos } from '@/site/tinos-pages'
import DotSeparator from '@/components/DotSeparator.vue'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

const num = (i: number) => String(i + 1).padStart(2, '0')

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.tinos'),
    description: pick(tinos.lead),
    image: tinos.image,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <header class="bg-cream">
      <div class="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10 lg:py-14">
        <div>
          <p class="label-kicker mb-5 text-brand">{{ pick(tinos.heading) }}</p>
          <h1 class="display text-3xl tracking-[0.08em] sm:text-4xl md:tracking-[0.18em] lg:text-5xl">
            {{ page ? pick(page.title) : t('nav.tinos') }}
          </h1>
          <span class="mt-6 block h-px w-14 bg-brand"></span>
          <p class="mt-6 max-w-xl text-lg font-light leading-relaxed text-ink/85 lg:text-xl">
            {{ pick(tinos.lead) }}
          </p>
        </div>
        <div class="mx-auto w-full max-w-[320px] overflow-hidden rounded-t-[999px] rounded-b-sm lg:max-w-[400px]">
          <img :src="tinos.image" alt="" loading="eager" class="aspect-[3/4] w-full object-cover" />
        </div>
      </div>
    </header>

    <section v-for="(s, i) in tinos.sections" :key="s.id" :class="i % 2 === 1 ? 'bg-cream' : ''">
      <div class="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
          <span class="display text-5xl font-light leading-none text-brand">{{ num(i) }}</span>
          <h2 class="display mt-4 text-2xl tracking-[0.08em] sm:text-3xl md:tracking-[0.15em]">{{ pick(s.title) }}</h2>
          <span class="my-6 block h-px w-14 bg-brand"></span>
          <p class="leading-relaxed text-ink/80">{{ pick(s.body) }}</p>
        </div>
        <figure class="overflow-hidden rounded-sm" :class="i % 2 === 1 ? 'lg:order-1' : ''">
          <img
            :src="s.image"
            alt=""
            loading="lazy"
            class="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105"
          />
        </figure>
      </div>
    </section>

    <DotSeparator />

    <section class="pb-16 lg:pb-24">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p class="label-kicker mb-6 text-brand">{{ t('tinos.explore') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <BaseButton v-for="l in tinos.links" :key="l.key" :to="pathForKey(l.key, locale) || '#'" variant="outline">
            {{ pick(l.label) }}
          </BaseButton>
        </div>
      </div>
    </section>
  </article>
</template>
