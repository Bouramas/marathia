<script setup lang="ts">
// Consulting: dark typographic header, three staggered dish photos, philosophy
// principles, a "tailor made" feature and a contact panel.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { consulting as c } from '@/site/services-pages'
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
    description: pick(c.intro),
    image: c.gallery[0].src,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header: dark, type only -->
    <header class="bg-ink px-6 py-20 text-white lg:px-10 lg:py-28">
      <div class="mx-auto max-w-4xl text-center">
        <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
        <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.2em] lg:text-6xl">
          {{ page ? pick(page.title) : '' }}
        </h1>
        <span class="mx-auto mt-8 mb-10 block h-px w-14 bg-brand"></span>
        <p class="mx-auto max-w-2xl text-xl font-light leading-relaxed sm:text-2xl lg:text-3xl lg:leading-relaxed">
          {{ pick(c.intro) }}
        </p>
      </div>
    </header>

    <!-- Dish gallery (staggered) -->
    <section class="py-10 lg:py-16">
      <div class="mx-auto grid max-w-5xl grid-cols-3 items-start gap-3 px-6 sm:gap-5 lg:px-10">
        <div
          v-for="(img, i) in c.gallery"
          :key="img.src"
          class="overflow-hidden rounded-2xl"
          :class="i === 1 ? 'mt-8 sm:mt-14' : ''"
        >
          <img
            :src="img.src"
            alt=""
            loading="lazy"
            class="w-full object-cover transition duration-700 hover:scale-105"
            :class="img.ratio"
          />
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="bg-cream py-10 lg:py-16">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionTitle :title="t('svc.basis')" />
        <p class="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-ink/80">{{ pick(c.basis) }}</p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          <div
            v-for="(p, i) in c.principles"
            :key="i"
            class="group flex flex-row items-start gap-4 border border-brand/30 bg-white p-4 transition-colors duration-300 hover:border-brand sm:flex-col sm:gap-0 sm:p-6"
          >
            <span class="display block w-9 shrink-0 text-2xl font-light leading-none text-brand sm:w-auto sm:text-3xl">{{ num(i) }}</span>
            <span class="my-4 hidden h-px w-9 bg-rule transition-all duration-500 group-hover:w-16 group-hover:bg-brand sm:block"></span>
            <div class="min-w-0 flex-1">
              <p class="text-base font-light leading-snug">{{ pick(p) }}</p>
              <RouterLink
                v-if="c.principleLinks[i] && pathForKey(c.principleLinks[i].key, locale)"
                :to="pathForKey(c.principleLinks[i].key, locale)!"
                class="label-kicker mt-3 block text-xs text-brand hover:underline sm:mt-4"
              >
                {{ pick(c.principleLinks[i].label) }} →
              </RouterLink>
            </div>
          </div>
        </div>

        <p class="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-ink/80">{{ pick(c.sustainability) }}</p>
      </div>
    </section>

    <!-- Tailor made -->
    <section class="px-6 py-14 text-center lg:px-10 lg:py-20">
      <div class="mx-auto max-w-3xl">
        <p class="label-kicker mb-4 text-brand">{{ pick(c.tailor.kicker) }}</p>
        <span class="mx-auto mb-6 block h-px w-14 bg-brand"></span>
        <p class="text-xl font-light leading-relaxed sm:text-2xl lg:text-3xl lg:leading-relaxed">
          {{ pick(c.tailor.body) }}
        </p>
      </div>
    </section>

    <DotSeparator />

    <!-- Contact -->
    <section class="pb-16 lg:pb-24">
      <div class="mx-auto max-w-3xl rounded-3xl bg-cream px-6 py-10 text-center lg:px-10 lg:py-14">
        <p class="label-kicker mb-3 text-brand">{{ t('svc.contact') }}</p>
        <a :href="`mailto:${c.email}`" class="text-xl font-semibold hover:text-brand sm:text-2xl">{{ c.email }}</a>
        <div class="mt-8">
          <BaseButton :href="`mailto:${c.email}`">{{ t('svc.writeUs') }}</BaseButton>
        </div>
        <div class="mt-10 border-t border-brand/30 pt-6">
          <p class="label-kicker mb-3 text-xs text-ink/60">{{ t('svc.moreServices') }}</p>
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <RouterLink
              v-for="l in c.links"
              :key="l.key"
              :to="pathForKey(l.key, locale) || '#'"
              class="text-brand hover:underline"
            >
              {{ pick(l.label) }} →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
