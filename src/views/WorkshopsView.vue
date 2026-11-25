<script setup lang="ts">
// Workshops for professionals: cream header (type + kitchen photo), five numbered philosophy
// cards, a parallax kitchen photo band, a dark "how it works" block with facts, and a contact strip.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { workshops } from '@/site/services-pages'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import DotSeparator from '@/components/DotSeparator.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

const num = (i: number) => String(i + 1).padStart(2, '0')

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : '',
    description: pick(workshops.seoDescription),
    image: workshops.headerImage.src,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header: type left, arched kitchen photo right -->
    <header class="bg-cream">
      <div class="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10 lg:py-14">
        <div>
          <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
          <h1 class="display text-3xl tracking-[0.08em] sm:text-4xl md:tracking-[0.18em] lg:text-5xl">
            {{ page ? pick(page.title) : '' }}
          </h1>
          <span class="mt-6 block h-px w-14 bg-brand"></span>
          <p class="mt-6 max-w-xl text-base font-light leading-relaxed text-ink/85 lg:text-lg">
            {{ pick(workshops.intro) }}
          </p>
        </div>
        <div class="relative mx-auto w-full max-w-[320px] lg:max-w-[400px]">
          <div
            aria-hidden="true"
            class="absolute -right-4 top-4 h-full w-full rounded-sm border border-brand/60 sm:-right-6 sm:top-6"
          ></div>
          <div class="relative overflow-hidden rounded-sm">
            <img
              :src="workshops.headerImage.src"
              :alt="pick(workshops.headerImage.alt)"
              :width="workshops.headerImage.w"
              :height="workshops.headerImage.h"
              loading="eager"
              class="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Philosophy cards -->
    <section class="py-10 lg:py-14">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionTitle :title="t('svc.basis')" />
        <p class="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-ink/80">{{ pick(workshops.basis) }}</p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          <div
            v-for="(p, i) in workshops.principles"
            :key="i"
            class="group flex flex-row items-start gap-4 border border-brand/30 bg-white p-4 transition-colors duration-300 hover:border-brand sm:flex-col sm:gap-0 sm:p-6"
          >
            <span class="display block w-9 shrink-0 text-2xl font-light leading-none text-brand sm:w-auto sm:text-3xl">{{ num(i) }}</span>
            <span class="my-4 hidden h-px w-9 bg-rule transition-all duration-500 group-hover:w-16 group-hover:bg-brand sm:block"></span>
            <div class="min-w-0 flex-1">
              <p class="text-base font-light leading-snug">{{ pick(p) }}</p>
              <RouterLink
                v-if="workshops.principleLinks[i] && pathForKey(workshops.principleLinks[i].key, locale)"
                :to="pathForKey(workshops.principleLinks[i].key, locale)!"
                class="label-kicker mt-3 block text-xs text-brand hover:underline sm:mt-4"
              >
                {{ pick(workshops.principleLinks[i].label) }} →
              </RouterLink>
            </div>
          </div>
        </div>

        <p class="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-ink/80">{{ pick(workshops.sustainability) }}</p>
      </div>
    </section>

    <!-- Kitchen photo band: parallax (fixed background) on lg+, static crop on touch/small screens -->
    <div
      role="img"
      :aria-label="pick(workshops.bandImage.alt)"
      class="h-64 w-full bg-cover bg-[70%_50%] sm:h-72 lg:h-96 lg:bg-fixed"
      :style="{ backgroundImage: `url(${workshops.bandImage.src})` }"
    ></div>

    <!-- How it works + facts -->
    <section class="bg-ink px-6 py-14 text-white lg:px-10 lg:py-20">
      <div class="mx-auto max-w-4xl text-center">
        <p class="label-kicker mb-3 text-brand">{{ t('svc.how') }}</p>
        <p class="text-xl font-light leading-relaxed sm:text-2xl lg:text-3xl lg:leading-relaxed">
          {{ pick(workshops.process) }}
        </p>
      </div>
      <dl class="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-y-8">
        <div
          v-for="f in workshops.facts"
          :key="f.value"
          class="text-center first:border-r first:border-brand/30"
        >
          <dt class="display text-5xl font-light leading-none text-brand lg:text-6xl">{{ f.value }}</dt>
          <dd class="label-kicker mt-4 text-xs text-white/70">{{ pick(f.label) }}</dd>
        </div>
      </dl>
      <div class="mx-auto mt-12 max-w-2xl text-center">
        <p class="label-kicker mb-2 text-brand">{{ t('svc.when') }}</p>
        <p class="text-white/80">{{ pick(workshops.seasons) }}</p>
      </div>
    </section>

    <DotSeparator />

    <!-- Contact -->
    <section class="pb-16 lg:pb-24">
      <div class="mx-auto max-w-3xl rounded-3xl bg-cream px-6 py-10 text-center lg:px-10 lg:py-14">
        <p class="label-kicker mb-3 text-brand">{{ t('svc.register') }}</p>
        <a :href="`mailto:${workshops.email}`" class="text-xl font-semibold hover:text-brand sm:text-2xl">
          {{ workshops.email }}
        </a>
        <div class="mt-8">
          <BaseButton :href="`mailto:${workshops.email}`">{{ t('svc.writeUs') }}</BaseButton>
        </div>
      </div>
    </section>
  </article>
</template>
