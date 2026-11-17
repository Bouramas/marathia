<script setup lang="ts">
// Our philosophy: typographic header with a tall arched image, five
// numbered principles (the first featured, four in a grid), a full-bleed
// identity quote over photography, and the awards panel.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { philosophy } from '@/site/about-pages'
import { homeAwards } from '@/site/home-sections'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import AwardsPanel from '@/components/AwardsPanel.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

const num = (i: number) => String(i + 1).padStart(2, '0')

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.philosophy'),
    description: pick(philosophy.intro),
    image: philosophy.image,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header: type left, tall arched image right -->
    <header class="bg-cream">
      <div class="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10 lg:py-14">
        <div>
          <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
          <h1 class="display text-3xl tracking-[0.08em] sm:text-4xl md:tracking-[0.18em] lg:text-5xl">
            {{ page ? pick(page.title) : t('nav.philosophy') }}
          </h1>
          <span class="mt-6 block h-px w-14 bg-brand"></span>
          <p class="mt-6 max-w-xl text-base font-light leading-relaxed text-ink/85 lg:text-lg">
            {{ pick(philosophy.intro) }}
          </p>
        </div>
        <div class="mx-auto w-full max-w-[320px] overflow-hidden rounded-t-[999px] rounded-b-sm lg:max-w-[400px]">
          <img
            :src="philosophy.image"
            alt=""
            loading="eager"
            class="aspect-[3/4] w-full object-cover"
          />
        </div>
      </div>
    </header>

    <!-- Principles -->
    <section class="py-10 lg:py-14">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionTitle :title="t('about.pillars')" />

        <div class="mt-6 grid gap-4 md:grid-cols-2 lg:mt-8 lg:gap-5">
          <!-- Featured first principle -->
          <div
            class="flex flex-col justify-between gap-5 bg-ink p-6 text-white md:col-span-2 lg:flex-row lg:items-center lg:p-8"
          >
            <div class="flex items-center gap-5 lg:gap-8">
              <span class="display text-4xl font-light leading-none text-brand lg:text-5xl">{{ num(0) }}</span>
              <p class="max-w-2xl text-base font-light leading-snug lg:text-lg">
                {{ pick(philosophy.pillars[0].text) }}
              </p>
            </div>
            <div v-if="philosophy.pillars[0].cta" class="shrink-0">
              <BaseButton :to="pathForKey(philosophy.pillars[0].cta.key, locale) || '#'" variant="hero">
                {{ pick(philosophy.pillars[0].cta.label) }}
              </BaseButton>
            </div>
          </div>

          <!-- Remaining four -->
          <div
            v-for="(p, i) in philosophy.pillars.slice(1)"
            :key="i"
            class="group border border-brand/30 bg-white p-6 transition-colors duration-300 hover:border-brand"
          >
            <span class="display block text-3xl font-light leading-none text-brand">{{ num(i + 1) }}</span>
            <span class="my-4 block h-px w-9 bg-rule transition-all duration-500 group-hover:w-16 group-hover:bg-brand"></span>
            <p class="text-base font-light leading-snug">{{ pick(p.text) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Identity quote over photography -->
    <section class="relative isolate overflow-hidden bg-ink px-6 py-16 text-center text-white lg:px-10 lg:py-20">
      <img :src="philosophy.identityImage" alt="" loading="lazy" class="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div class="absolute inset-0 -z-10 bg-black/60"></div>
      <blockquote class="mx-auto max-w-4xl">
        <span class="mx-auto mb-6 block h-px w-14 bg-brand"></span>
        <p class="text-lg font-light leading-relaxed sm:text-xl lg:text-2xl lg:leading-relaxed">
          {{ pick(philosophy.identity) }}
        </p>
      </blockquote>
    </section>

    <!-- Recognition -->
    <section class="pt-10 lg:pt-14">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p class="label-kicker mb-3 text-brand">{{ t('about.recognition') }}</p>
        <p class="text-base leading-relaxed text-ink/80">{{ pick(philosophy.recognition) }}</p>
      </div>
      <AwardsPanel v-if="homeAwards.length" :awards="homeAwards" />
    </section>
  </article>
</template>
