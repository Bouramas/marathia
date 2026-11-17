<script setup lang="ts">
// Workshops for professionals: type-only cream header, five numbered philosophy
// cards, a dark "how it works" block with facts, and a contact strip.
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
    description: pick(workshops.intro),
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header: type only -->
    <header class="bg-cream px-6 py-16 text-center lg:px-10 lg:py-24">
      <div class="mx-auto max-w-3xl">
        <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
        <h1 class="display text-3xl tracking-[0.08em] sm:text-4xl md:tracking-[0.18em] lg:text-5xl">
          {{ page ? pick(page.title) : '' }}
        </h1>
        <span class="mx-auto mt-6 block h-px w-14 bg-brand"></span>
        <p class="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-ink/85 lg:text-lg">
          {{ pick(workshops.intro) }}
        </p>
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
            class="group flex flex-col border border-brand/30 bg-white p-6 transition-colors duration-300 hover:border-brand"
          >
            <span class="display block text-3xl font-light leading-none text-brand">{{ num(i) }}</span>
            <span class="my-4 block h-px w-9 bg-rule transition-all duration-500 group-hover:w-16 group-hover:bg-brand"></span>
            <p class="text-base font-light leading-snug">{{ pick(p) }}</p>
            <RouterLink
              v-if="workshops.principleLinks[i] && pathForKey(workshops.principleLinks[i].key, locale)"
              :to="pathForKey(workshops.principleLinks[i].key, locale)!"
              class="label-kicker mt-4 text-xs text-brand hover:underline"
            >
              {{ pick(workshops.principleLinks[i].label) }} →
            </RouterLink>
          </div>
        </div>

        <p class="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-ink/80">{{ pick(workshops.sustainability) }}</p>
      </div>
    </section>

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
