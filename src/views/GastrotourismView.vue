<script setup lang="ts">
// Gastrotourism: cream header with arched photo, story split, dark mission band,
// wide image + numbered activity cards, audience grid, tips, facts and contact.
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { gastrotourism as g } from '@/site/services-pages'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import DotSeparator from '@/components/DotSeparator.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

// Split a story paragraph around its inline links (see `story.links`).
const storyParts = (text: string, para: number) => {
  const parts: { text: string; to?: string }[] = []
  let rest = text
  for (const l of g.story.links.filter((x) => x.para === para)) {
    const word = pick(l.word)
    const at = rest.indexOf(word)
    if (at < 0) continue
    if (at > 0) parts.push({ text: rest.slice(0, at) })
    parts.push({ text: word, to: pathForKey(l.key, locale.value) || '#' })
    rest = rest.slice(at + word.length)
  }
  parts.push({ text: rest })
  return parts
}

const num = (i: number) => String(i + 1).padStart(2, '0')

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : '',
    description: pick(g.lead),
    image: g.headerImage,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <!-- Header: type left, arched image right -->
    <header class="bg-cream">
      <div class="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10 lg:py-14">
        <div>
          <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
          <h1 class="display text-3xl tracking-[0.08em] sm:text-4xl md:tracking-[0.18em] lg:text-5xl">
            {{ page ? pick(page.title) : '' }}
          </h1>
          <span class="mt-6 block h-px w-14 bg-brand"></span>
          <p class="mt-6 max-w-xl text-base font-light leading-relaxed text-ink/85 lg:text-lg">{{ pick(g.lead) }}</p>
        </div>
        <div class="relative mx-auto w-full max-w-[320px] lg:max-w-[400px]">
          <div
            aria-hidden="true"
            class="absolute -right-4 top-4 h-full w-full rounded-t-[999px] rounded-b-sm border border-brand/60 sm:-right-6 sm:top-6"
          ></div>
          <div class="relative overflow-hidden rounded-t-[999px] rounded-b-sm">
            <img :src="g.headerImage" alt="" loading="eager" class="aspect-[3/4] w-full object-cover" />
          </div>
        </div>
      </div>
    </header>

    <!-- Story -->
    <section class="py-10 lg:py-16">
      <div class="mx-auto grid max-w-5xl items-center gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div class="relative lg:col-span-5">
          <div
            aria-hidden="true"
            class="absolute -left-4 top-4 h-full w-full rounded-sm border border-brand/60 sm:-left-6 sm:top-6"
          ></div>
          <div class="relative overflow-hidden rounded-sm">
            <img
              :src="g.story.image"
              alt=""
              loading="lazy"
              class="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105 lg:aspect-[3/4]"
            />
          </div>
        </div>
        <div class="lg:col-span-7">
          <p v-for="(para, i) in pick(g.story.paragraphs)" :key="i" class="mb-4 leading-relaxed text-ink/80">
            <template v-for="(part, j) in storyParts(para, i)" :key="j">
              <RouterLink v-if="part.to" :to="part.to" class="text-brand underline underline-offset-2 hover:text-ink">{{ part.text }}</RouterLink>
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="bg-ink px-6 py-14 text-white lg:px-10 lg:py-20">
      <div class="mx-auto max-w-4xl text-center">
        <span class="mx-auto mb-6 block h-px w-14 bg-brand"></span>
        <p class="text-xl font-light leading-relaxed sm:text-2xl lg:text-3xl lg:leading-relaxed">
          {{ pick(g.mission.quote) }}
        </p>
        <div class="mx-auto mt-10 max-w-3xl text-left">
          <p v-for="(para, i) in pick(g.mission.body)" :key="i" class="mb-4 leading-relaxed text-white/70">
            {{ para }}
          </p>
        </div>
        <p class="display mt-6 text-2xl tracking-[0.1em] text-brand sm:text-3xl">{{ pick(g.mission.closing) }}</p>
      </div>
    </section>

    <!-- Activities -->
    <section class="py-10 lg:py-16">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionTitle :title="t('svc.activities')" />
        <p class="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-ink/80">{{ pick(g.activitiesIntro) }}</p>

        <div class="relative mb-10">
          <div
            aria-hidden="true"
            class="absolute -right-3 top-3 h-full w-full rounded-sm border border-brand/60 sm:-right-4 sm:top-4"
          ></div>
          <div class="relative overflow-hidden rounded-sm">
            <img :src="g.activitiesImage" alt="" loading="lazy" class="aspect-[16/7] w-full object-cover" />
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:gap-5">
          <div
            v-for="(a, i) in g.activities"
            :key="a.id"
            class="group border border-brand/30 bg-white p-6 transition-colors duration-300 hover:border-brand lg:p-8"
          >
            <span class="display block text-3xl font-light leading-none text-brand">{{ num(i) }}</span>
            <span class="my-4 block h-px w-9 bg-rule transition-all duration-500 group-hover:w-16 group-hover:bg-brand"></span>
            <h3 class="mb-3 text-lg font-semibold leading-snug">{{ pick(a.title) }}</h3>
            <p class="leading-relaxed text-ink/80">{{ pick(a.body) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Audience -->
    <section class="bg-cream py-10 lg:py-16">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionTitle :title="t('svc.audience')" />
        <div class="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(a, i) in g.audience" :key="i" class="border-t border-brand/40 pt-4">
            <h3 class="mb-2 font-semibold leading-snug">{{ pick(a.title) }}</h3>
            <p v-if="pick(a.body)" class="leading-relaxed text-ink/80">{{ pick(a.body) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tips -->
    <section class="py-10 lg:py-16">
      <div class="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionTitle :title="t('svc.tips')" />
        <ul class="mt-6 space-y-4">
          <li v-for="(tip, i) in pick(g.tips)" :key="i" class="flex gap-4 leading-relaxed text-ink/80">
            <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
            <span>{{ tip }}</span>
          </li>
        </ul>
      </div>

      <dl class="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-y-8 px-6 lg:px-10">
        <div
          v-for="f in g.facts"
          :key="f.value"
          class="text-center border-l border-brand/30 first:border-l-0"
        >
          <dt class="display text-4xl font-light leading-none text-brand sm:text-5xl lg:text-6xl">{{ f.value }}</dt>
          <dd class="label-kicker mt-4 text-xs text-ink/70">{{ pick(f.label) }}</dd>
        </div>
      </dl>
      <p class="mt-8 text-center text-ink/80">
        <span class="label-kicker mr-2 text-brand">{{ t('svc.when') }}:</span>{{ pick(g.seasons) }}
      </p>
    </section>

    <DotSeparator />

    <!-- Contact -->
    <section class="pb-16 lg:pb-24">
      <div class="mx-auto max-w-3xl rounded-3xl bg-cream px-6 py-10 text-center lg:px-10 lg:py-14">
        <p class="label-kicker mt-8 mb-3 text-brand">{{ t('svc.register') }}</p>
        <a :href="`mailto:${g.contact.email}`" class="text-lg font-semibold hover:text-brand sm:text-xl">
          {{ g.contact.email }}
        </a>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <BaseButton :href="`mailto:${g.contact.email}`">{{ t('svc.writeUs') }}</BaseButton>
        </div>
      </div>
    </section>
  </article>
</template>
