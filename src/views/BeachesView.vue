<script setup lang="ts">
// Beaches: photo-band header, then an editorial list (no cards): beaches with a photo
// span the full width with an image, the rest flow as text in two columns. The visited
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { beaches } from '@/site/tinos-pages'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)


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
    <header class="relative isolate overflow-hidden bg-ink px-6 py-20 text-center text-white lg:px-10 lg:py-32">
      <img :src="beaches.image" alt="" loading="eager" class="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div class="absolute inset-0 -z-10 bg-black/55"></div>
      <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
      <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.2em] lg:text-6xl">
        {{ page ? pick(page.title) : t('nav.beaches') }}
      </h1>
      <span class="mx-auto mt-8 block h-px w-14 bg-brand"></span>
      <p class="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed lg:text-xl">
        {{ pick(beaches.intro) }}
      </p>
    </header>

    <section class="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-20">
      <ol class="grid gap-x-16 md:grid-cols-2">
        <li
          v-for="(b, i) in beaches.items"
          :id="'b-' + b.id"
          :key="b.id"
          class="scroll-mt-24 border-t border-ink/15 py-7"
          :class="b.image ? 'md:col-span-2 md:grid md:grid-cols-12 md:items-center md:gap-10 md:py-10' : ''"
        >
          <img
            v-if="b.image"
            :src="b.image"
            alt=""
            loading="lazy"
            class="mb-5 aspect-[16/10] w-full object-cover md:col-span-6 md:mb-0"
            :class="i % 2 ? 'md:order-2' : ''"
          />
          <div :class="b.image ? 'md:col-span-6' : ''">
            <div class="flex items-baseline gap-4">
              <span class="display text-2xl font-light text-brand">{{ String(i + 1).padStart(2, '0') }}</span>
              <h2 class="text-xl font-semibold leading-snug">{{ pick(b.title) }}</h2>
            </div>
            <ul v-if="b.tags?.length" class="mt-2 flex flex-wrap gap-x-3 pl-11">
              <li v-for="(tag, ti) in b.tags" :key="ti" class="label-kicker text-brand">{{ pick(tag) }}</li>
            </ul>
            <p class="mt-3 pl-11 font-light leading-relaxed text-ink/80">{{ pick(b.body) }}</p>
          </div>
        </li>
      </ol>
    </section>

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
